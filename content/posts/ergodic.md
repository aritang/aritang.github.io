---
title: "Ergodicity of a Stationary Markov Chain"
date: 2026-04-17T11:56:56-05:00
draft: false
---

Erdodic's Wikipedia definition is very general (and confusing) — "time averages equal ensemble averages"? Here's a simplified version for finite-state markov chain:

Let $\{X_k\}_{k \geq 0}$ be a Markov chain on state $S$. Let $\pi\in \Delta(S)$. Let Let transition operatro be $P$, so $\pi^{t + 1} = P \pi^t$.

Define stationary distribution $\bar \pi$ as $X_0 \sim \bar \pi$ where $P\bar\pi = \bar\pi$, the stationary process satisfies
$$
(X_0, X_1, \dots) \overset{d}{=} (X_1, X_2, \dots)
$$

> **Definition.** The stationary process $\{X_k\}$ is **ergodic** if for every bounded function $f: S \to \mathbb{R}$ the following convergence hold a.s.:
> $$ \frac{1}{n}\sum_{k=0}^{n-1} f(X_k) \xrightarrow{a.s.} \mathbb{E}_\pi[f] = \sum_{i \in S} f(i)\,\pi(i).$$

Equivalently

> A stationary Markov chain initialized at $\pi$ is ergodic iff $\pi$ is an extreme point of the convex set of stationary distributions of $P$ — i.e., there do not exist distinct stationary distributions $\pi_1 \neq \pi_2$ and $\alpha \in (0,1)$ such that $\pi = \alpha\pi_1 + (1-\alpha)\pi_2$.

### Eigenvalue characterization for finite state space.

When state space is finite, say $|S| = m$. $P\in \R^{m\times m}$ and its columns sum to 1. $P$ satisfies:

- Eigenvalue 1 always exists (column-stochasticity).
- $|\lambda| \leq 1 $ for all eigenvalues.
- Complex eigenvalues come in conjugate pairs (since $P$ is real).

The number of linearly independent stationary distributions of $P$ equals the geometric multiplicity of eigenvalue 1.

 Hence $\pi$ is the unique stationary distribution (and therefore trivially extremal, so ergodic) iff eigenvalue 1 of $P$ is simple.

### Example

$S = \{0,1,2\}$,

$$
P = \begin{pmatrix} 0.3 & 0.4 & 0.3 \\ 0 & 0 & 1 \\ 0 & 1 & 0 \end{pmatrix}, \qquad \pi = (0,\; 0.5,\; 0.5).
$$
Eigenvalues of $P$: $1, -1, 0.3$. Eigenvalue 1 is simple, so $\pi$ is the unique stationary distribution, hence **ergodic**. 

Note that each sample path is deterministic and periodic: if $X_0 = 1$, the path is $1, 2, 1, 2, \dots$; if $X_0 = 2$, the path is $2, 1, 2, 1, \dots$.

But stationarity still hold because it is a statement about **distributions**, not paths. Since $X_0 \sim (0.5, 0.5)$, at every time $k$ you get $P(X_k = 1) = 0.5$ and $P(X_k = 2) = 0.5$. The joint distribution of any window $(X_k, X_{k+1})$ is also the same for all $k$: each outcome $(1,2)$ and $(2,1)$ has probability $0.5$. So the distributional equality holds.

The randomness that makes stationarity work lives entirely in $X_0$. It's a coin flip that picks between two rigid oscillating paths, and that single coin flip is enough to make all finite-dimensional marginals shift-invariant.