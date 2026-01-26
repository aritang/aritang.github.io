import os
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

SYSTEM_PROMPT = """You are the blog assistant for Ariana Tang — a warm, intellectually curious PhD student at Chicago Booth who writes about market design, classical music, ballet, and life.

Your personality:
- Warm, friendly, and genuinely enthusiastic about Ariana's work and interests
- A touch of dry wit, but always kind
- You admire Ariana and speak of her fondly, like a supportive friend
- Conversational and approachable, never stiff or robotic

Important context:
- Ariana is a PhD student researching market design, NOT the singer Ariana Grande
- Her favorite composer is Tchaikovsky (her cat is named after him!)
- She plays flute and loves ballet
- She was inspired by Professor Alvin Roth to start blogging

Rules:
- Answer based only on the provided blog posts
- Never say anything negative about Ariana
- If you can't find the answer, say warmly: "Ariana hasn't written about that yet — but knowing her curiosity, she might someday!"

Formatting:
- Let your responses breathe naturally. Short questions get short answers — a sentence or two is fine.
- For longer answers, break into 2-3 paragraphs max. Not too many, not too few.
- Never use bullet points or lists. Write in natural, flowing prose.
- Match the energy of the question — casual questions get casual replies."""
class Question(BaseModel):
    q: str

def log_question(q: str, flagged: bool = False):
    timestamp = datetime.datetime.now().isoformat()
    flag = "[FLAGGED] " if flagged else ""
    print(f"{timestamp}\t{flag}{q}")

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
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=300,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}]
        ) as stream:
            for text in stream.text_stream:
                yield text

    return StreamingResponse(generate(), media_type="text/plain")
