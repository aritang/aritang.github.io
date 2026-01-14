---
title: "mechanism design seminar notes | week 4"
date: 2024-10-15T18:31:36+08:00
draft: false
---

## Motivation

Preview from problem set 2, question 4: ([link to original file](https://www.fuhuthu.com/Mechanism24/ps2.pdf))

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/seminars/mechanism_seminar_ps4_e4.jpeg" caption="" width="88%">}}

This gives a reduction: [submodular welfare maximization] <= [maximize a monotone submodular function s.t. matroid constarint].

### Remarks: hardness & approximation of the problem

1. [submodular welfare maximization] >= [maximize a monotone submodular function s.t. matroid constarint] (Is it true though?).
2. maximize monotone submodular function is hard. Because, for instance, one can reduce Partition problem to it.

That's why we started looking at submodular maximization s.t. matroid constraint in last week. To begin with,

1. greedy algorithm yields a $1/2$-approximation
2. for some special cases, for example, uniform-$k$ matrix, greedy yields $(1 - 1/e)$ approximation.

But aside from discrete algorithms, here's another approach:

## making everything continuous

### continuous-ify the set function

For a monotone submodular function $f: 2^{[m]}\to \R_+$, we extend to be able to operate on real numbers:

> **<u>Definition</u>** (The Multilinear Extension) For set function $f:2^{[m]}\to \mathbb R_+$ we extend it to
> $$
> F:[0, 1]^m \to \mathbb R_+,
> $$
> defined as the expected value of $f(S)$ for some $ x\in [0, 1]^m$ where each element $i\in S$ is ***in*** $S$ with probability $x_i$, independently.
>
> For convenience, we'll abuse notation $S$ to be the random variable of the set
> $$
> S\sim x.
> $$
> Therefore,
> $$
> F(y) = \mathbb E_{S\sim x} [f(S)] = \sum_{R\subseteq [m]} f(R) \prod_{i\in R}x_i\prod_{i\notin R}(1 - x_i).
> $$

Some useful properties of $F$:

- First-order derivative:
    $$
    \frac{\partial F}{\partial x_i}(x) = \sum_{R'\subseteq [m]\setminus \lbrace i\rbrace} \prod_{j\in R'}x_j\prod_{j\notin R'}(1 - x_j)f(R').
    $$

- Second-order derivative: for $i\ne j$,
    $$
    \frac{\partial^2 F}{\partial x_i x_j}(x) = \sum_{R'\subseteq [m]\setminus \lbrace i, j\rbrace} \prod_{k\in R'}x_k\prod_{k\notin R'}(1 - x_j)\\
    \quad \quad \times \left(f(R'\cup\lbrace i, j\rbrace) - f(R'\cup\lbrace i\rbrace) - f(R'\cup\lbrace j\rbrace) + f(R')\right)
    $$

Therefore, if $f$ is monotone submodular, $F$ is non-decreasing, and concave along any position line of direction $\mathbf d \ge 0$, and is *convex* along any line of direction $e_i - e_j$.

### continuous-ify the matroid constraint

Given matroid $\mathcal M = (\mathcal U, \mathcal I)$, define polytope $P_\mathcal{M} \subseteq [0, 1]^\mathcal{U}$ such that
$$
P_\mathcal M := \text{Conv}(\mathbb 1_{I} : I\in \mathcal I)\\
\quad \text{where }1_{I}\in \lbrace0, 1\rbrace^\mathcal U, \text{ and }\mathbb 1_{I}(i) := \begin{cases}
1 & \text{if }i\in I\\
0& \text{o.w.}
\end{cases}
$$
And we consider the a continuous greedy process defined on differential equation system:

> For $t\in [0, 1]$, $\vec y(0) = \vec 0$,
>
> - $\vec v(t) = \arg\max_{\vec x\in P_\mathcal M}\vec x \cdot \nabla F(\vec y(t))$,
> - $\vec y'(t) = \vec v(t)$.
>
> Return $\vec y(1)$.

<u>LEMMA</u> $\vec y(1)\in P_\mathcal M$ and $F(\vec y(1))\ge (1 - 1/e)\text{OPT}$.

Proof is nontrivial. I will write about it later, for sure.

Lastly, some remark for the algorithm: implementation is nasty, as

- $\arg\max_{\vec x \in P_\mathcal M}$ is nontrivial.
- $F(\cdot)$ might be complicated to compute. use Monte-Carlo.
- $\vec y(1)$ requires rounding.
