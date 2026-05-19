---
title: "how sleepingbot works 2.0"
date: 2026-05-15T00:00:00+00:00
draft: false
---

Sleepingbot is the chat widget on my homepage. It answers questions about the blog. Here's exactly how it works.

## posts are loaded once at startup

All posts under `content/posts/` plus `about.md` are read from disk into memory when the server starts. They stay there — the bot doesn't go looking for posts mid-conversation. It works from whatever was loaded at deploy time.

## every message triggers two Claude calls

**Stage 1 — post selection.** Before answering anything, the server sends Claude the user's question alongside a plain list of post titles. Claude returns a JSON array of up to 4 titles that are most likely relevant. This call uses 200 tokens max and produces no visible output.

**Stage 2 — answer generation.** The server fetches the full content of those selected posts (up to 4000 characters each), always prepending `about.md`. This context, combined with the system prompt and conversation history, becomes the input for the streamed response.

So the bot never has free-range access to all posts simultaneously — it reads 4–5 targeted posts per turn, selected by title matching.

## conversation history

The frontend keeps a rolling array of up to 16 messages in the browser. On each send, the prior exchanges (everything except the current question and its pending reply) are included in the POST body as `history`. The backend formats them as alternating `user`/`assistant` messages before appending the current question with blog context. Claude sees the whole thread.

When the 16-message cap is hit, the array resets — the bot loses prior context and starts fresh. No accounts, no server-side session storage.

## what the system prompt says

Three things: role (assistant for the blog, not Ariana), grounding (answer only from provided content; offer email if it's not covered), and tone (crisp, no padding, subtly whimsical). That's it. No personality scripts.

## logging

Every question and answer is appended to an in-memory list. A `/digest` endpoint (secret-gated) sends a daily email summary via Resend. Hostile queries — anything matching a keyword list like "ignore your instructions" or "jailbreak" — trigger an immediate alert email and return a one-liner refusal.

## rate limiting

20 requests per 60 seconds, globally across all users. Exceeding it freezes the server for 5 minutes and sends an alert.
