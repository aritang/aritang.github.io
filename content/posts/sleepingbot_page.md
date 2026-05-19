---
title: "sleepingbot gets a dedicated page"
date: 2026-05-16T00:00:00+00:00
draft: false
---

Sleepingbot started as a widget embedded in the homepage. It now has its own page at [/sleepingbot](/sleepingbot). Here's what changed and how it works.

## what's new

The dedicated page is a Hugo layout — `layouts/_default/sleepingbot.html` — activated by a content stub at `content/sleepingbot.md` with `layout: sleepingbot` in the frontmatter. No new section, no new content type.

The homepage widget still exists with a small "open full page →" link in its header.

## the page layout

The chat container is centered, max-width 680px, with a zoom-in animation on load (`scale(0.96) + translateY(12px)` → natural position over 0.35s). No wrapping box — message bubbles float directly on the page background. The message area is taller (520px vs 400px on the homepage widget).

Navigation: "random" was replaced by "sleepingbot" in `config.yml`.

## markdown rendering

Bot responses are now parsed with [marked.js](https://marked.im) before being injected into the DOM. User messages are HTML-escaped. This means the bot can return links, bold text, and lists and they'll render correctly. `<p>` margins inside bubbles are zeroed out so spacing stays tight.

## conversation history

The frontend keeps a rolling array of up to 8 messages. On each send, the prior exchanges are included in the POST body as `history`. The backend formats them as alternating `user`/`assistant` messages before the current question, so the bot has full within-session context.

When the cap is hit, the input locks and a "start fresh" button appears above it. The conversation stays visible until the user explicitly clicks it — nothing is wiped silently.
