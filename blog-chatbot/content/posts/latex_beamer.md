---
title: "A pink, minimalistic beamer latex template on overleaf"
date: 2025-06-24T22:36:47+08:00
draft: false
---

I designed a beamer latex template. Here's [the overleaf link](https://www.overleaf.com/read/cxypnbzgjsch#c690f9) and here's [the demo pdf](/files/pink_beamer_demo.pdf).

{{<figure align="center" width="100%" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/wine/pinkBeamerDemo.jpeg" caption="See [the pdf](/files/pink_beamer_demo.pdf) for other pages of the demo.">}}

Design idea:

- Use the **Poppins** typeface — it's a round, sans-serif font. (an open-source substitute for Google's beautiful proprietary font Product Sans). (See [Google Fonts: Poppins](https://fonts.google.com/specimen/Poppins) for details.
- Color: black text with pink accent on light-beige background.
- Minimalistic functions: I disabled navigation toolbar and the page that list references.

Beamer is really useful when one want to make slides **quickly**. It's well-formatted — Latex's automatic spacing frees you from the annoying chore of aligning text boxes. And you can write math-heavy paragraphs easily.

Beamer outputs PDF. In my pov PDF is the best format for presentation. One great advantage is that it preserves fonts, coloring and item locations when shared and viewed on different devices. Slides stored in `.key` (apple's format) or `.ppt` frequently encounter bugs when system environment or software versions change. 

The lack of animation and fancy artwork in beamer-powered PDFs is almost a pro — personally, I find these neither necessary nor sufficient for good presentations, especially academic ones.

Presentation visual aid tools can be somewhat well characterized on a single-dimension spectrum — from minimalist to versatile. There's a tradeoff between minimalistically efficient versus rich in functionality. The intuitive and handy PowerPoint (Microsoft) and Keynotes (Apple) ***balance*** efficiency and functionality, while still maximize both attributes on their Pareto Frontier. They are both with no doubt brilliant product design and deserves to be popular. But Beamer can be useful too, especially if you are old-schooled, write formulas a lot, and have to make slides too frequently...

Btw, recall that beamer is text-based. ChatGPT and associated LLM tools works way more better on texts than graphics — you can tell them to generate beamer code first then use latex to compile slides. But requiring LLM to directly generate slide pictures directly is not that efficient...

