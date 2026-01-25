import chromadb
from sentence_transformers import SentenceTransformer
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
import anthropic
import datetime
import smtplib
from email.mime.text import MIMEText
from collections import deque
import time
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = SentenceTransformer("all-MiniLM-L6-v2")
chroma = chromadb.PersistentClient(path="./chroma_db")
collection = chroma.get_collection("blog_posts")

# Anthropic client
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "your-api-key-here")
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# Rate limiting
request_times = deque()
RATE_LIMIT = 20
RATE_WINDOW = 60
freeze_until = 0

# Hostility detection
HOSTILE_KEYWORDS = [
    "ignore your instructions", "forget your rules", "system prompt",
    "ignore previous", "disregard your", "pretend you are",
    "jailbreak", "bypass", "hack"
]

# Email config
MAIL_HOST = "smtp.gmail.com"
PORT = 587
SEND_BY = "sleepingbotti@gmail.com"
PASSWORD = os.environ.get("EMAIL_PASSWORD", "your-app-password")
SEND_TO = "ariana_tang@outlook.com"

SYSTEM_PROMPT = """You are Ariana's blog assistant — a dry-witted, intellectual deputy who represents her and her writing.

Rules:
- Answer based only on the provided blog posts.
- Never say anything negative about Ariana or contradict her views.
- Be candid and concise, with a touch of dry humor.
- If you can't find the answer, say "Ariana hasn't written about that — yet."
- Welcome visitors warmly but briefly, e.g. "Ariana writes about..." or "From what Ariana's shared..."
- Keep responses brief — 2-3 sentences max unless more detail is needed.

Speak as if you know her well and are proud to represent her work."""

class Question(BaseModel):
    q: str

def send_alert(subject, body):
    try:
        message = MIMEText(body, "plain", "utf-8")
        message["From"] = SEND_BY
        message["To"] = SEND_TO
        message["Subject"] = f"[ALERT] {subject}"
        smtp = smtplib.SMTP(MAIL_HOST, PORT)
        smtp.ehlo()
        smtp.starttls()
        smtp.login(SEND_BY, PASSWORD)
        smtp.sendmail(SEND_BY, SEND_TO, message.as_string())
        smtp.quit()
    except Exception as e:
        print(f"Alert email failed: {e}")

def log_question(q: str, flagged: bool = False):
    with open("questions.log", "a") as f:
        timestamp = datetime.datetime.now().isoformat()
        flag = "[FLAGGED] " if flagged else ""
        f.write(f"{timestamp}\t{flag}{q}\n")

def is_hostile(q: str) -> bool:
    q_lower = q.lower()
    return any(kw in q_lower for kw in HOSTILE_KEYWORDS)

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
        send_alert("Hostile query detected", f"Query: {question.q}")
        return JSONResponse({"answer": "I'd rather not engage with that."})
    
    log_question(question.q)
    
    q_embedding = model.encode(question.q).tolist()
    results = collection.query(query_embeddings=[q_embedding], n_results=2)
    
    context = "\n\n---\n\n".join(results["documents"][0])
    
    prompt = f"""Based on these blog posts:

{context}

---

Question: {question.q}"""

    def generate():
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=500,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}]
        ) as stream:
            for text in stream.text_stream:
                yield text

    return StreamingResponse(generate(), media_type="text/plain")