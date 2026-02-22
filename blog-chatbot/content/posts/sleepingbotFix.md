---
title: "Technical Bug Fix | Sleepingbot Auto Blog Catalogue Sync"
date: 2026-02-24T09:31:25-06:00
draft: false
---

Sleepingbot has a bug that new blog posts in `content/posts` never made into the chatbot's catalogue. Content never synced automatically. The original setup required manually running `sync_content.sh` after every new post. Really?

So I scrapped the GitHub Actions approach entirely and replaced it with a local **git pre-push hook** (`.git/hooks/pre-push`):

```bash
#!/bin/bash
echo "Syncing blog content to chatbot..."
rsync -av --delete content/posts/ blog-chatbot/content/posts/
git add blog-chatbot/content/
git diff --cached --quiet || git commit -m "Auto-sync blog content"
echo "Sync done."
```

This runs silently on every `git push`, syncs the posts, and commits them.
