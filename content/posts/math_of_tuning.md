---
title: "The Approximation of Harmony"
date: 2025-11-02T21:02:48-06:00
draft: false
---

The development of musical scales — how *do re mi* came to sound like *do re mi* — is a beautiful story.

Music theory can seem intimidating (for instance, I probably should have learned tuning theory back in 16 when I was sitting in orchestra), but it’s actually quite straightforward. Imagine you’re a piano designer: you want your instrument to sound nice, but you also don’t want it to have an infinite number of keys.

> **Axiom 1 — Sound nice:** Two notes sound consonant when their frequencies form a ratio of small integers. The simpler the ratio, the more pleasant the sound. For example, a perfectly harmonic octave has a ratio of $2:1$, and a nice fifth has $3:2$.

> **Axiom 2 — Finite keys:** We want a finite set $\mathbf{P}$ of notes (frequencies) that behaves almost like a group: moving up or down by an octave gives the same note, and $\mathbf{P}$ should be closed under transposition by a fifth (multiplying or dividing every frequency by $\frac{3}{2}$).

These two axioms can’t both be perfectly satisfied. The impossibility is quite straightforward: for any base note $t$, the set of all fifth transpositions that still lie within one octave is infinite:
$$
\mathbf P(t) := \lbrace  t':t' = \frac{(3/2)^m}{2^n}, t\in [t, 2t], m, n\in \Z\rbrace.
$$
Historically, three major tuning systems emerged:

{{<figure align="center" src="/art/scales.jpeg" caption="'Sexy,' isn't it" width="100%">}}

The old wisdom of Pythagorean, the ***Pythagorean scale*** is a heuristic that approximates both axioms with 12 notes. The ***just intonation*** system, by contrast, defines notes directly from pure integer ratios, producing the most consonant intervals but requiring many keys to preserve that purity across transpositions.

The problem was beautifully resolved by ***equal temperament*** — divide the octave into 12 equal geometric steps, each raised by $2^{1/12}$. This tuning slightly compromises the purity of individual intervals (for instance, the fifth is $1.4983$ instead of the perfect $1.5$), but the ear hardly minds. In return, we gain a beautifully closed, finite set $\mathbf{P}$ of 12 notes — a workable, nearly symmetric solution.

It took humanity thousands of years to discover this best near-perfect solution of equal temperament — an *approximation of harmony* that satisfies both axioms as closely as possible. And finally, the piano sings brilliantly — and it does so with just 88 keys.

<div style="display: flex; justify-content: center; margin: 1.5em 0;">
  <iframe
    allow="autoplay *; encrypted-media *;"
    frameborder="0"
    height="175"
    style="width:100%; max-width:888px; border-radius:12px; overflow:hidden; background:transparent;"
    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
    src="https://embed.music.apple.com/cn/album/the-well-tempered-clavier-book-i-prelude-no-1-in-c/925090312?i=925090427&l=en-GB">
  </iframe>
</div>


