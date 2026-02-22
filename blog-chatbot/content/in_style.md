---
title: "Minimalist and Fancy Hugo Papermod Front Page"
date: 2025-11-17T22:22:27-06:00
draft: false
---

Here's how to make Hugo PaperMod landing page (the main page) minimalistic, yet fancy. Inspired by Apple Tahoe OS's liquid glass aesthetic, on top of PaperMod's minimalistic design, I added (i) round corner for blog post boxes and (ii) interactive color change.

In Hugo, aesthetic configs (e.g. page margins, text box colors) are ultimately controlled by **CSS**. Even better, PaperMod already has a built-in way to add custom CSS without touching the theme files: any CSS one put in
 `assets/css/extended/*.css` in the project gets bundled automatically. So, just create one `assets/css/extended/margins.css` and paste the following CSS configurations (or, DIY yourself):

```css
/* ===========================
   LAYOUT: MAIN CONTENT + NAV
   =========================== */

/* Main content area: center on page and use responsive side margins */
.main {
  max-width: 88rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(2rem, 6vw, 6rem);
  padding-right: clamp(2rem, 6vw, 6rem);
}

/* Top navigation bar: align with main content margins */
.nav {
  max-width: 88rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(2rem, 6vw, 6rem);
  padding-right: clamp(2rem, 6vw, 6rem);
}

/* ===========================
   NAV: LINKS + TITLE EFFECTS
   =========================== */

/* Navigation links (right side): smooth color + glow on hover */
.nav ul li a {
  transition:
    color 0.3s ease,
    text-shadow 0.3s ease;
}

.nav ul li a:hover {
  color: #5A8FE4;  /* soft blue hover color */
  text-shadow: 0 0 2px rgba(192, 192, 192, 0.288);  /* subtle glow */
}

/* Blog title / logo (left side): subtle zoom + color shift on hover */
.nav .logo a {
  transition:
    color 0.36s ease,
    text-shadow 0.2s ease,
    transform 0.22s ease;
}

.nav .logo a:hover {
  color: #5A8FE4;      /* same blue as nav links */
  transform: scale(1.006);  /* tiny zoom for a refined feel */
  /* text-shadow can be re-enabled if you want more glow */
  /* text-shadow: 0 0 3.6px rgba(117, 172, 255, 0.45); */
}

/* ===========================
   POST CARDS: BASE STYLE
   =========================== */

/* Base appearance of each blog post card */
.post-entry {
  /* shape + internal spacing */
  border-radius: 1.6rem;
  padding: 1.44rem 1.6rem; /* top/bottom, left/right */
  margin-bottom: 2rem;     /* spacing between cards */

  /* glassmorphism look */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);

  /* smooth transitions for hover / press / release */
  transition:
    transform 0.25s ease,
    background 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

/* ===========================
   POST CARDS: HOVER (LIGHT)
   =========================== */

/* Hover effect in light mode: soft blue glow + slight lift */
.post-entry:hover {
  background: rgba(255, 255, 255, 0.35); /* still very light, clean */
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 12px 32px rgba(120, 180, 255, 0.18);
  transform: translateY(-2px); /* subtle floating effect */
}

/* ===========================
   POST CARDS: DARK MODE BASE
   =========================== */

/* Base glass look in dark mode */
.dark .post-entry {
  background: rgba(40, 40, 45, 0.35);
  border: 0.24px solid rgba(102, 101, 101, 0.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* Hover in dark mode: cooler blue edge + stronger glow */
.dark .post-entry:hover {
  background: rgba(40, 40, 45, 0.35);
  border-color: rgba(132, 169, 224, 0.45);
  box-shadow: 0 12px 34px rgba(120, 160, 255, 0.25);
  transform: translateY(-2px);
}

/* ===========================
   POST CARDS: CLICK / PRESS
   =========================== */

/* Light mode press: subtle “button press” feedback */
.post-entry:active {
  transform: scale(0.985);  /* slight press down */
  background: rgba(240, 248, 255, 0.55); /* faint blue-white tint */
  border-color: rgba(160, 200, 255, 0.15);
  box-shadow: 0 4px 12px rgba(120, 160, 255, 0.15);

  /* faster transitions for the press itself */
  transition:
    transform 0.08s ease,
    background 0.12s ease;
}

/* Dark mode press: same idea, tuned for dark background */
.dark .post-entry:active {
  transform: scale(0.985);
  background: rgba(70, 90, 120, 0.45);
  border-color: rgba(120, 160, 220, 0.35);
  box-shadow: 0 4px 14px rgba(120, 160, 255, 0.25);
}

```

