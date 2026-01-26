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
    
    # Load about.md first (important)
    about_path = os.path.join(content_dir, "about.md")
    if os.path.exists(about_path):
        with open(about_path, "r", encoding="utf-8") as f:
            POSTS.append({"title": "about", "content": f.read()})
    
    # Load all posts
    for filepath in glob.glob(f"{content_dir}/posts/*.md"):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            title = os.path.basename(filepath).replace(".md", "")
            POSTS.append({"title": title, "content": content[:1500]})
    
    print(f"Loaded {len(POSTS)} posts")

load_posts()

# About gets full content, posts get truncated summaries
ABOUT_CONTENT = POSTS[0]["content"] if POSTS else ""
BLOG_SUMMARY = "\n\n---\n\n".join([f"**{p['title']}**\n{p['content'][:400]}" for p in POSTS[1:31]])

request_times = deque()
RATE_LIMIT = 20
RATE_WINDOW = 60
freeze_until = 0

HOSTILE_KEYWORDS = [
    "ignore your instructions", "forget your rules", "system prompt",
    "ignore previous", "disregard your", "pretend you are",
    "jailbreak", "bypass", "hack"
]

SYSTEM_PROMPT = """You are Ariana's blog assistant — a dry-witted, intellectual deputy who represents her and her writing.

Rules:
- Answer based only on the provided blog posts.
- Never say anything negative about Ariana or contradict her views.
- Be candid and concise, with a touch of dry humor.
- If you can't find the answer, say "Ariana hasn't written about that — yet."
- Keep responses brief — 2-3 sentences max unless more detail is needed.

Speak as if you know her well and are proud to represent her work."""

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
    
    prompt = f"""About Ariana:

{ABOUT_CONTENT}

---

Blog excerpts:

{BLOG_SUMMARY}

---

Question: {question.q}"""

    def generate():
        with client.messages.stream(
            model="claude-3-haiku-20240307",
            max_tokens=300,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}]
        ) as stream:
            for text in stream.text_stream:
                yield text

    return StreamingResponse(generate(), media_type="text/plain")
