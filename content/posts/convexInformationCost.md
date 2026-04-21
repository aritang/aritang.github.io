---
title: "Notes from (Missed) Theory Seminar | Information Acquisition with f-Divergence Cost by Professor Luciano Pomatto"
date: 2026-04-15T18:07:34-05:00
draft: false
---

 Side Note of Professor Luciano Pomatto from Caltech's Theory Seminar Talk at UChicago.

###### Kudos to Zizhe for the summary. Ben said it was a ***great*** model as it was also well received in the internal student's discussion.

###### **Disclaimer: All intellectual and copy rights belong to the author of the paper. If you like the economic model, make sure to check out [Professor Pomatto's webpage](https://www.its.caltech.edu/~lpomatto/) for the OG paper. All mistakes are mine.**

## Setup

A decision maker acquires information, choose action, and output.

- $\Theta$ — states, with prior $\pi$
- $A$ — actions, with utility $u(a, \theta)$
- **Experiment** $P := (S, \{P_\theta\}_{\theta \in \Theta})$

Decision Maker's Problem (DM) is
$$
\max_{P \in \Delta S^{\Theta}} \sum_{\theta, a} \pi(\theta)\, P_\theta(a)\, u(a, \theta) - C(P)
$$

## f-Divergence

**Definition.** Let $P_1, \ldots, P_n, \alpha$ be probability distributions on $S$. The **f-divergence** between $P_1, \ldots, P_n$ and $\alpha$ is
$$
D_f(P_1, \ldots, P_n \| \alpha) = \sum_{s \in S} \alpha(s)\, f\!\left(\frac{P_1(s)}{\alpha(s)}, \ldots, \frac{P_n(s)}{\alpha(s)}\right)
$$
where $f : \mathbb{R}^n_+ \to \bar{\mathbb{R}}_+$ is convex and $f(\mathbf{1}) = 0$.

## f-Information Cost

**Definition.** The **f-information** of $P \in \Delta S^\Theta$ is $C(P) = \inf_{\alpha \in \Delta S} D_f(P \| \alpha)$.

## Mutual Information (Special Case)

Take $f(t) = t \log t - t + 1$. Then $f(\bar{x}) = \sum_{\theta \in \Theta} \pi(\theta)\, f(x(\theta))$.

The KL divergence expands as $D_{KL}(\beta \| \alpha) = \sum_{s \in S} \alpha(s) \left[\frac{\beta(s)}{\alpha(s)} \log \frac{\beta(s)}{\alpha(s)} - \frac{\beta(s)}{\alpha(s)} + 1\right]$, and for the experiment: $D_{KL}(P \| \alpha) = \sum_{\theta} \pi(\theta)\, D_{KL}(P_\theta \| \alpha)$.

The mutual information cost is $C_{MI}(P) = \inf_{\alpha = P_\pi,\; \alpha \in \Delta(S)} D_{KL}(P \| \alpha)$.

## Fenchel Conjugate

**Definition.** The **Fenchel conjugate** of $f$ is $f^*(x) := \sup_{y \in \mathbb{R}^{\Theta}_+} x(\theta)\, y(\theta) - f(y)$.

## Theorem: Info Acquisition with f-Info Cost

A stochastic choice rule $P := (A, \{P_\theta\}_\theta)$ solves the information acquisition problem **iff** $\exists\; \alpha \in \Delta(A),\; \lambda \in \mathbb{R}^\Theta$ such that:

1. $\forall\, a \in A,\, \theta \in \Theta$: $P_\theta(a) = \alpha(a)\, \nabla_\theta f^*(a\pi - \lambda)$
2. $(\alpha, \lambda)$ solve $V(A) = \max_{\beta \in \Delta(A)} \min_{\mu \in \mathbb{R}^{\Theta}} \sum_a \beta(a)\, f^*(a\pi - \mu) + \sum_\theta \mu(\theta)$