---
title: "Talk Note | A disciplined, testable psychological foundation for beliefs formulation contingent on other stuff"
date: 2026-04-20T14:23:07-05:00
draft: false
---

Professor Shleifer come over to Booth to talk in our Monday macro/intermational economic workshop. He's so popular that we have to move to the largest classroom and it is *filled*.

{{<figure align="center" width="100%" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/shleifer.jpeg" caption="The admin bought enough sandwich for everyone though">}}

> ### The Psychology of Macroeconomic Expectations
>
> **Bordalo, Gennaioli, Lopez de Silanes, Schroeder, Shleifer, van Rooij (2026)**
>
> ###### There's a version online in Booth's website: https://www.chicagobooth.edu/-/media/project/chicago-booth/faculty-and-insights/research-workshops/shleifer.pdf

Behavioral economics and general economic theory have left an open question in modeling: whether *non-domain-specific* (NDS) experiences — a health crisis, a divorce, financial hardship — could causally shift macro beliefs through a psychological, non-informational channel. This paper did the job:

### The Model

The key is two cognitive primitives from psychology:

1. **Selective Recall**. Memory is a database of past experiences $e = (x, v, c)$ — 

    - a realization $x$
    - a valence (emotional charge) $v$, and
    - a context $c$. 

    A cue $q$ triggers retrieval via a similarity function $S(e, q)$. The probability of recalling experience $e$ is:
    $$
    r_e(q, \mathbf{n}) = \frac{S(e,q) \cdot n_e}{\sum_{e'} S(e',q) \cdot n_{e'}}.
    $$

2. **Simulation**. Retrieved experiences are projected into forecasts via a simulation function $\sigma_T(e)$. Crucially, even NDS experiences can be simulated into macro forecasts if they share emotional/contextual similarity with the target. Eg. personal financial distress *feels like* economic hardship, so it helps you *imagine* high inflation — not because it's informative, but because of associative similarity.

Beliefs = retrieval-weighted simulation across experiences. Note how it is context-dependent and manipulable by changing what's top of mind.
$$
\mathbb{E}(\tau | q_T, \mathbf{n}) = \sum_{e \in E} r_e(q_T, \mathbf{n}) \cdot \sigma_T(e).
$$

### The Experiment

Using 4,000+ households in the Dutch National Bank Household Survey (DHS), the authors:

1. **Prime** treated subjects to recall a personal financial or health adversity before eliciting inflation and home-price-growth expectations.
2. **Measure** the full cognitive pipeline: NDS experiences lived, perceived similarity of those experiences to high inflation/HPG, domain-specific backcasts, and stated reasoning for forecasts.

This design is cool and shapr in terms of identification, because priming conveys *zero* macro information — it only changes mental state. The finding is:

- **Experience effects**: Households with NDS experiences more *similar* to high inflation expect higher inflation — driven by similarity structure, not information.
- **Instability**: Primed households expect significantly higher inflation/HPG than control households who lived the *same* adversities but weren't primed. Effect sizes: up to ~1 pp shift in inflation expectations (mean: 5.46%).
- **Context-specificity**: Financial priming produces larger effects than health priming, consistent with financial distress being more similar to inflation.
- **Mechanism confirmed**: Priming shifts both (i) DS backcasts (people recall more bad past inflation) and (ii) reasoning (more personal, emotionally negative narratives) — exactly as the recall + simulation model predicts.

### Macro Implications

**Heterogeneity**: Low-social economic status individuals carry worse NDS databases (in their brain) → systematically more pessimistic → higher MPC → non-trivial allocative consequences.

**Confidence Multiplier**: One agent's spending is a *cue* for another agent. Expansion by some → cues good macro outcomes for others → further optimism and spending → amplification loop. This provides a micro-founded mechanism for demand-driven fluctuations through belief externalities — a formal version of Keynes's animal spirits.

I haven't feel wowed from a talk in a while — might be the sandwich's fault. This is a great idea and great paper!
