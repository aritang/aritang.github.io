---
title: "Eliciting Information with Limited Feedback | Notes from a Talk by Nicolas Lambert"
date: 2025-06-30T10:46:00+08:00
draft: false
summary: "Professor Nicolas Lambert recently gave a talk at SUFE on 'Paying for Estimates Incentives in Statistical Reporting.'"
---

Professor Nicolas Lambert recently gave a talk at SUFE on “Paying for Estimates: Incentives in Statistical Reporting.”

{{<figure align="center" src="/online/elicitability.jpeg" caption="Conference room on the 8th floor — fancy!" width="100%">}}

I don’t think the paper is publicly available yet, but if you’re curious, try googling "Elicitability" along with the authors’ names — you may find what you need.

---

### Classic Scoring Rules: Learning $\theta$ from $\{P_\theta, \theta \in \Theta\}$

Things begin with the standard setup for proper scoring rules (for a foundational overview, see [Gneiting and Raftery (2007)](/posts/scoring_rule_paper/)).

The basic environment involves a principal who wants to learn something about an unknown parameter $\theta$, which indexes a family of distributions $\{P_\theta\}_{\theta \in \Theta}$. The analyst knows more about $\theta$ than the principal does, but no further assumptions are made about her information.

The analyst is asked to report a distribution over $\theta$, denoted as $p$ (following a revelation-principle-type approach). In the classical model, the principal is assumed to observe the realized value of $\theta$ after the report. The analyst is then rewarded via a **proper scoring rule** $S(p, \theta)$, which incentivizes her to truthfully report her beliefs.

### This Paper: When $\theta$ Isn’t Observable

Professor Lambert and his coauthor explore what happens when the principal **can’t** directly observe $\theta$. Instead, the principal receives an outcome $\omega$ from a space $\Omega$, drawn according to some known experiment $\pi(\omega \mid \theta)$. The scoring rule now takes the form $S(p, \omega)$ — still intended to incentivize truthful reporting over $\theta$, but based only on outcome data $\omega$.

For instance, suppose the principal wants to learn the parameters $(\mu, \sigma)$ of a Gaussian distribution. However, after the analyst reports her belief, the principal only observes a single draw from the distribution — not the parameters themselves. How much the principal can infer clearly depends on the informativeness of the observed data.

### Key Results

As you might expect, if the principal’s experiment is too coarse or noisy, it won’t be possible to fully incentivize truth-telling about $\theta$. The paper formalizes this through the concept of ***elicitable partitions***.

> **Definition (Elicitability):** 
> An information partition $\mathcal{P}$ of $\Delta(\Theta)$ is *elicitable* by an experiment $\pi(\omega \mid \theta)$ if there exists a scoring rule $S(p, \omega)$ such that, for any $p, q \in \Delta(\Theta)$:
> $$
> \mathbb{E}_{\omega \sim \pi(\cdot \mid \theta(p))}[S(p, \omega)] \geq \mathbb{E}_{\omega \sim \pi(\cdot \mid \theta(p))}[S(q, \omega)],
> $$
> with strict inequality whenever $p$ and $q$ lie in different parts of the partition $\mathcal{P}$.

The information partition $\mathcal P$ is an abstract way of representing statistics that the principle aims to learn, like means, moments, or event probabilities. This framework views a principal’s goal (e.g. recovering a statistic) as a partition over beliefs about $\theta$. The maximal partition that can be strictly distinguished using the experiment determines what is elicitable. Any coarser partition (i.e., less detailed statistic) is also elicitable, which is formalized in the paper's Theorem 1.

One particularly interesting (though perhaps still informal) result from the talk involves constructing *strictly proper* scoring rules for elicitable partitions. It appears that any such scoring rule can be represented as a **randomized combination** (e.g. a convex mixture) of simpler, proper-but-not-strict rules — each designed to distinguish a specific pair of beliefs $(p, q)$. Combined, they ensure strict separation across the entire partition.

This decomposition is not only elegant but also useful — it suggests a modular way to build proper scoring rules from primitives. (This seems related to Theorem 2, though please check the paper draft for precise statements.)

Other results in the talk include more direct conditions under which certain distributions or statistics are elicitable. For example:

- In linear regression, observing a single data point is sufficient to elicit the full posterior over $(\beta_0, \ldots, \beta_m, \sigma)$.
- For logistic or softmax regression, no finite number of samples is sufficient to elicit even the mean or mode of the parameter.

I like these concrete examples — they show the limits of what can be inferred from limited outcome data, depending on model structure. And it makes people take pictures:

{{<figure align="center" src="/online/elicitable.jpeg" caption="Conference room on the 8th floor — fancy!" width="100%">}}

The last part of the talk introduced an "elicitation order" — a way to compare experiments based on how much they can elicit:

> An experiment $A$ *dominates* experiment $B$ in the sense of elicitation if every information partition elicitable under $B$ is also elicitable under $A$. This defines a quasi-order over experiments, akin to (but distinct from) the Blackwell informativeness order.

This idea seems seminal, especially for those of us thinking about the design of mechanisms or experiments under limited feedback.

I missed a few details near the end — apologies. For those interested, see Section 4 of the [“Elicitability” draft](https://ai.stanford.edu/~nlambert/elicitability.pdf#page=23.78) for more on the comparison of experiments.

### Some Reflections

This is a fascinating and nuanced line of work. Since the paper is still a draft, I’ll avoid making strong claims — but from a uninformed rookie's point of view, it feels like an important contribution to the literature on incentives and information design, as well as fundamentals for informativeness and statistics. I'm looking forward to seeing where it goes next.
