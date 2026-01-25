import os
import re
import chromadb
from sentence_transformers import SentenceTransformer

CONTENT_DIR = os.path.expanduser("~/aritang.github.io/content/posts")
CHROMA_DIR = "./chroma_db"
CHUNK_SIZE = 500  # words per chunk
CHUNK_OVERLAP = 50  # overlap between chunks

def extract_text(content):
    # Remove frontmatter
    content = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)
    # Remove code blocks
    content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
    # Remove inline code
    content = re.sub(r'`[^`]+`', '', content)
    # Remove links but keep text
    content = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', content)
    # Remove images
    content = re.sub(r'!\[[^\]]*\]\([^)]+\)', '', content)
    return content.strip()

def chunk_text(text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk = ' '.join(words[start:end])
        if chunk:
            chunks.append(chunk)
        start = end - overlap
    return chunks

def load_posts():
    chunks = []
    for filename in os.listdir(CONTENT_DIR):
        if filename.endswith(".md"):
            filepath = os.path.join(CONTENT_DIR, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            text = extract_text(content)
            post_chunks = chunk_text(text)
            for i, chunk in enumerate(post_chunks):
                chunks.append({
                    "id": f"{filename}_{i}",
                    "content": chunk,
                    "source": filename
                })
    return chunks

def main():
    print("Loading embedding model...")
    model = SentenceTransformer("all-MiniLM-L6-v2")
    
    print("Loading and chunking posts...")
    chunks = load_posts()
    print(f"Created {len(chunks)} chunks from posts")
    
    print("Creating vector store...")
    client = chromadb.PersistentClient(path=CHROMA_DIR)
    
    # Clear existing
    try:
        client.delete_collection("blog_posts")
    except:
        pass
    collection = client.create_collection("blog_posts")
    
    print("Indexing chunks...")
    batch_size = 100
    for i in range(0, len(chunks), batch_size):
        batch = chunks[i:i+batch_size]
        embeddings = model.encode([c["content"] for c in batch]).tolist()
        collection.add(
            ids=[c["id"] for c in batch],
            documents=[c["content"] for c in batch],
            metadatas=[{"source": c["source"]} for c in batch],
            embeddings=embeddings
        )
        print(f"  Indexed {min(i+batch_size, len(chunks))}/{len(chunks)}")
    
    print(f"Done. Indexed {len(chunks)} chunks.")

if __name__ == "__main__":
    main()