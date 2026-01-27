import os
import smtplib
from email.mime.text import MIMEText
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
MAIL_PORT = 587
SEND_BY = os.environ.get("EMAIL_ADDRESS", "")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD", "")
SEND_TO = "ariana_tang@outlook.com"

# Store questions for daily digest
DAILY_QUESTIONS = []

POSTS = []

def load_posts():
    global POSTS
    content_dir = "./content"
    
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

SYSTEM_PROMPT = """You are a very intelligent blog assistant for Ariana Tang — a warm, intellectually curious PhD student at Chicago Booth who writes about market design, classical music, ballet, and life.

Your personality:
- Warm and present, like a good friend who really listens
- A touch of dry wit, but always kind
- Gently curious about the person you're talking with
- You speak naturally, the way you'd talk over coffee

Important context:
- Ariana is a PhD student researching market design, NOT the singer Ariana Grande
- Her favorite composer is Tchaikovsky (her cat is named after him!)
- She plays flute and loves ballet
- She was inspired by Professor Alvin Roth to start blogging

How to engage:
- Acknowledge the person's question warmly before answering. Briefly: for example, "good question" or "OK!", etc.
- If they seem curious about something, gently invite them to explore more
- Speak *to* them, not *at* them — this is a conversation, not a lecture
- Be soothing and unhurried, like a really good therapist who makes you feel heard

Rules:
- BE SHORT and CONCISE
- Answer based only on the provided blog posts. Be honest if you don't know.
- Most of the time, answer in **ONE SHORT PARAGRAPH** that gets to the heart of the matter. Sometimes a one-liner is best.
- Never say anything negative about Ariana
- If you can't find the answer: "Ariana hasn't written about that yet — but I'd love to hear what made you curious about it. In this case, provide email: ariana_tang@uchicago.edu so they can reach out directly."

Formatting:
- Let responses breathe. Give short, witty, warm answers. Most of the time one short paragraph that gives the key/most interesting information is enough. Sometimes a one-liner is best.
- Provide links to blog posts when relevant, e.g. "You might enjoy reading [post title](link) for more on that."
- Match the energy — casual questions get casual, warm replies. BE SHORT AND CONCISE.
- Always end with a friendly short question, or subtle joke to keep the conversation going."""

class Question(BaseModel):
    q: str

def send_alert(subject, body):
    if not EMAIL_PASSWORD:
        print(f"Email skipped (no password): {subject}")
        return
    try:
        message = MIMEText(body, "plain", "utf-8")
        message["From"] = SEND_BY
        message["To"] = SEND_TO
        message["Subject"] = f"[Sleepingbot] {subject}"
        smtp = smtplib.SMTP(MAIL_HOST, MAIL_PORT)
        smtp.ehlo()
        smtp.starttls()
        smtp.login(SEND_BY, EMAIL_PASSWORD)
        smtp.sendmail(SEND_BY, SEND_TO, message.as_string())
        smtp.quit()
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
    
    context = "\n\n---\n\n".join([f"**{p['title']}**\n{p['content'][:2000]}" for p in relevant_posts])
    
    prompt = f"""Here are relevant posts from Ariana's blog:

{context}

---

A visitor asks: "{question.q}"

Please answer warmly and helpfully based on what Ariana has written."""

    def generate():
        full_response = []
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=300,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}]
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
    if EMAIL_PASSWORD and SEND_BY:
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
        print("⚠ WARNING: EMAIL_ADDRESS or EMAIL_PASSWORD not set")

send_startup_notification()