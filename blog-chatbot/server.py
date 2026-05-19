import os
import smtplib
import resend
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
import anthropic
import datetime
from collections import deque
import time
import glob
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# Email config
MAIL_HOST = "smtp.gmail.com"
MAIL_PORT = 465
resend.api_key = os.environ.get("RESEND_API_KEY", "")
SEND_TO = "ariana_tang@outlook.com"

# Store questions for daily digest
DAILY_QUESTIONS = []

POSTS = []

def load_posts():
    global POSTS
    content_dir = os.path.join(os.path.dirname(__file__), "content")
    
    about_path = os.path.join(content_dir, "about.md")
    if os.path.exists(about_path):
        with open(about_path, "r", encoding="utf-8") as f:
            POSTS.append({"title": "about", "content": f.read()})
    
    for filepath in glob.glob(f"{content_dir}/posts/*.md"):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            title = os.path.basename(filepath).replace(".md", "")
            POSTS.append({"title": title, "content": content})
    
    print(f"Loaded {len(POSTS)} posts")

load_posts()

POST_TITLES = "\n".join([f"- {p['title']}" for p in POSTS])

request_times = deque()
RATE_LIMIT = 20
RATE_WINDOW = 60
freeze_until = 0

HOSTILE_KEYWORDS = [
    "ignore your instructions", "forget your rules", "system prompt",
    "ignore previous", "disregard your", "pretend you are",
    "jailbreak", "bypass", "hack"
]

ABOUT_CONTEXT = """Ariana (Haoyue) Tang is a first-year PhD student at Chicago Booth. 
She researches market design and EconCS. She loves classical music (favorite composer: Tchaikovsky), 
ballet, and plays flute. Her cat is named Tchaikovsky. She was inspired by Professor Alvin Roth 
to start her blog. She is NOT the singer Ariana Grande, though she likes her album Sweetener."""

SYSTEM_PROMPT = """You are a concise assistant that helps visitors navigate Ariana Tang's blog. You are not Ariana.

Note: Ariana is a PhD student at Chicago Booth researching market design — not the singer Ariana Grande.

Answer only from the blog content provided. If it doesn't cover the question, say so and offer her email: ariana_tang@uchicago.edu. A couple of sentences is usually enough. Link to a post when one is relevant. Don't pad.

Be informative but crisp — no yapping. You can be delightful, subtly whimsical, even a little funny. But earn it; don't perform it."""

class Question(BaseModel):
    q: str
    history: list = []

def send_alert(subject, body):
    if not resend.api_key:
        print(f"Email skipped (no API key): {subject}")
        return
    try:
        r = resend.Emails.send({
            "from": "Sleepingbot <onboarding@resend.dev>",
            "to": SEND_TO,
            "subject": f"[Sleepingbot] {subject}",
            "text": body
        })
        print(f"Alert sent: {subject}")
    except Exception as e:
        print(f"Email failed: {e}")

def log_question(q: str, flagged: bool = False, answer: str = ""):
    timestamp = datetime.datetime.now().isoformat()
    flag = "[FLAGGED] " if flagged else ""
    print(f"{timestamp}\t{flag}Q: {q}")
    if answer:
        print(f"{timestamp}\tA: {answer[:100]}...")
    DAILY_QUESTIONS.append({
        "time": timestamp, 
        "question": q, 
        "answer": answer,
        "flagged": flagged
    })
    if flagged:
        send_alert("Hostile query detected", f"Query: {q}")

def is_hostile(q: str) -> bool:
    return any(kw in q.lower() for kw in HOSTILE_KEYWORDS)

def check_rate_limit() -> bool:
    global freeze_until
    now = time.time()
    if now < freeze_until:
        return False
    while request_times and request_times[0] < now - RATE_WINDOW:
        request_times.popleft()
    if len(request_times) >= RATE_LIMIT:
        freeze_until = now + 300
        send_alert("Rate limit triggered", f"More than {RATE_LIMIT} requests in {RATE_WINDOW}s. Frozen for 5 minutes.")
        return False
    request_times.append(now)
    return True

def get_relevant_posts(question: str) -> list:
    about_post = next((p for p in POSTS if p["title"] == "about"), None)
    
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=200,
        messages=[{
            "role": "user",
            "content": f"""You are helping find relevant blog posts for a question about Ariana Tang's blog.

Context: {ABOUT_CONTEXT}

Question from visitor: "{question}"

Available blog post titles:
{POST_TITLES}

Task: Return a JSON array of up to 4 post titles most likely to contain relevant information.
- Match keywords, topics, or themes from the question to post titles
- Consider synonyms and related concepts
- If asking about music → look for posts with music/composer/classical/ballet keywords
- If asking about research → look for posts with econ/market/paper keywords
- If unclear, pick diverse posts that might help

Return ONLY a JSON array, no explanation. Example: ["post-title-1", "post-title-2"]"""
        }]
    )
    
    print(f"Stage 1: {response.content[0].text}")
    
    try:
        titles = json.loads(response.content[0].text)
        relevant = [p for p in POSTS if p["title"] in titles and p["title"] != "about"]
        result = []
        if about_post:
            result.append(about_post)
        result.extend(relevant[:4])
        return result
    except:
        return [about_post] if about_post else []

@app.post("/ask")
def ask(question: Question):
    global freeze_until
    
    if time.time() < freeze_until:
        remaining = int(freeze_until - time.time())
        return JSONResponse({"answer": f"Taking a short break. Back in {remaining} seconds."})
    
    if not check_rate_limit():
        return JSONResponse({"answer": "Too many questions — taking a 5 minute break."})
    
    if is_hostile(question.q):
        log_question(question.q, flagged=True)
        return JSONResponse({"answer": "I'd rather not engage with that."})
    
    log_question(question.q)
    
    relevant_posts = get_relevant_posts(question.q)
    
    context = "\n\n---\n\n".join([f"**{p['title']}**\n{p['content'][:4000]}" for p in relevant_posts])
    
    prompt = f"""Here are relevant posts from Ariana's blog:

{context}

---

A visitor asks: "{question.q}" """

    def generate():
        full_response = []
        claude_messages = [
            {"role": "user" if m["role"] == "user" else "assistant", "content": m["text"]}
            for m in question.history
        ]
        claude_messages.append({"role": "user", "content": prompt})
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=300,
            system=SYSTEM_PROMPT,
            messages=claude_messages
        ) as stream:
            for text in stream.text_stream:
                full_response.append(text)
                yield text
        # Log after streaming completes
        DAILY_QUESTIONS[-1]["answer"] = "".join(full_response)

    return StreamingResponse(generate(), media_type="text/plain")

@app.get("/digest")
def send_digest(secret: str = ""):
    if secret != os.environ.get("DIGEST_SECRET", ""):
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    
    if not DAILY_QUESTIONS:
        send_alert("Daily Digest", "No questions today!")
        return {"message": "No questions today"}
    
    body = f"Daily Digest: {len(DAILY_QUESTIONS)} conversations\n\n"
    body += "=" * 40 + "\n\n"
    for i, q in enumerate(DAILY_QUESTIONS, 1):
        flag = "[FLAGGED] " if q["flagged"] else ""
        body += f"{i}. {flag}Q: {q['question']}\n"
        body += f"   A: {q.get('answer', 'No answer')[:200]}...\n"
        body += f"   ({q['time']})\n\n"
    
    send_alert(f"Daily Digest - {len(DAILY_QUESTIONS)} questions", body)
    
    count = len(DAILY_QUESTIONS)
    DAILY_QUESTIONS.clear()
    
    return {"message": f"Digest sent with {count} questions"}

def send_startup_notification():
    if resend.api_key:
        try:
            timestamp = datetime.datetime.now().isoformat()
            body = f"Sleepingbot deployed successfully at {timestamp}\n\n"
            body += f"Loaded {len(POSTS)} posts\n"
            body += f"Email alerts: Enabled\n"
            body += f"Digest endpoint: Ready"
            send_alert("Deployed Successfully ✓", body)
            print("✓ Startup email sent")
        except Exception as e:
            print(f"✗ Startup email failed: {e}")
    else:
        print("⚠ WARNING: RESEND_API_KEY not set")


send_startup_notification()