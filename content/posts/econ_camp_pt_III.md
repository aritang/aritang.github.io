---
title: "Booth Econ Camp Class Note Part III"
date: 2025-09-27T17:36:49-05:00
draft: false
---

## Comparisons of Distributions

We study random variables on $\mathbb{R}$ (aka lotteries). Each lottery can be identified with its **cumulative distribution function (cdf)**:

$$
F(z) = \Pr(Z \leq z).
$$

---

## First-Order Stochastic Dominance (FOSD)

> **Definition.** For two distributions characterized by their cdf $F, G$,
> $$
> F \succeq_\text{FOSD} G  \iff \int u(x)  dF(x)  \geq  \int u(x) dG(x), \quad \forall   \text{increasing } u.
> $$
> 

> **Theorem (Characterization of FOSD).**
> $$
> F \succeq_\text{FOSD} G \iff F(x) \leq G(x) \quad \forall x.
>  $$

---

## Second-Order Stochastic Dominance (SOSD)

Now suppose we restrict to increasing and **concave** utility functions,

> **Definition.** For two distributions characterized by their cdf $F, G$,
> $$
> F \succeq_\text{SOSD} G  \iff 
> \int u(x)  dF(x)  \geq  \int u(x)  dG(x)
> \quad \forall   \text{increasing, \textbf{concave} } u.
> $$

> **Theorem (Characterization of SOSD).**
> $$
> F \succeq_\text{SOSD} G
> \quad \iff \quad
> \int_{-\infty}^x F(t) dt  \leq  \int_{-\infty}^x G(t)dt
> \quad \forall x.
> $$
>

There's another weaker characterization for SOSD:

> **Theorem** **(SOSD and mean-preserving spread)** If $F$ and $G$ **have the same mean**, then
> $$
> F \succeq_{\text{SOSD}} G
>  \iff 
> F \text{ is a mean-preserving spread of }G.
> $$

---

## Experiments and Blackwell Dominance

### State-Dependent Utility

Let $\Omega =$ state space, define state-dependent utility function $u : X \times \Omega \to \mathbb{R}$ (utility depends on both action $x$ and state $\omega$). A *belief*, denoted as $\mu$ is a probability distribution $\mu \in \Delta \Omega$. 

An *experiment* $\mathcal{E}$ maps states $\omega \in \Omega$ into signals, which then update beliefs via Bayes’ rule. Take a revelation-principle minset — the formality of signals doesn't really matter, what we care about is whatever affects decision making — hence we want to model **the posterior belief and its ex-ante distribution** induced by the experiment. Denote it as $\lang \mathcal E \mid \mu_0\rang \in \Delta \Delta \Omega$.

> **Proposition**. (Corollary of Bayes's rule) Fix a prior $\mu_0$, for any experiment
> $$
> \mathbb E_{\mu\sim\lang \mathcal E\mid\mu_0\rang}[\mu] = \mu_0.
> $$

> **Definition.** (Blackwell Dominance)
>
> An experiment $\mathcal{E}_1$ **Blackwell dominates** $\mathcal{E}_2$ if, for every prior $\mu_0$, every action set $X$, and every state-dependent utility $u : X \times \Omega \to \mathbb{R}$, we have
>
> {{<figure align="center" src="/online/blackwell_dominance.jpeg" caption="" width="100%">}}

---

### Induced Value Function

Given $\mu$, the decision maker solves

$$
V(\mu)  =  \max_{x \in X}   \mathbb{E}_{\omega \sim \mu}[ u(x,\omega) ].
$$

> **Lemma.** $V(\cdot)$ is **convex** in $\mu$.

---

### Equivalence

> **Claim.** If for some interior prior $\mu_0$ we have $\lang \mathcal E_1 \mid \mu_0 \rang$ $\succeq_{\text{SOSD}} \lang \mathcal{E}_2 \mid \mu_0 \rang$, then for all prior $\mu$,
>
> {{<figure align="center" src="/online/blackwell_dominance_1.jpeg" caption="" width="88%">}}

> **Theorem.** $\mathcal{E}_1$ Blackwell dominates $\mathcal{E}_2$ iff $\lang \mathcal{E}_1 \mid \cdot \rang$ is a mean-preserving spread of $\lang \mathcal{E}_2 \mid \cdot \rang$, which is also equivalent to
>
> {{<figure align="center" src="/online/blackwell_dominance_2.jpeg" caption="" width="88%">}}
