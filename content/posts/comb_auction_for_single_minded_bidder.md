---
title: "Combinatorial Auctions and Single-Minded Bidders"
date: 2024-09-09T10:06:20+08:00
draft: false
---

Here's an interesting problem appeared in the final exam of market mechanism design. And I didn't figure it out during then💔. The original question is from [lecture note of 21 **Algorithmic Game Theory**](https://www.cs.jhu.edu/~mdinitz/classes/AGT/Spring2022/Lectures/Lecture21/lecture21.pdf), instructed by [Michael Dinitz](https://www.cs.jhu.edu/~mdinitz/).

### background

Consider combinatorial auction allocating $m$ items to $n$ players. Outcome is each bidder get a set $S_i\subset [m], \forall i \in [n]$ and they don't overlap.

Valuation: in this question we consider **Single-Minded bidders**. Each player $i$ has a target set $S_i^*\in [m]$ such that
$$
v_i(S) = \begin{cases}
v_i & \text{if }S \subset S_i^*\\
0 & \text{otherwise}
\end{cases}
$$
and the two parameters $(v_i, S_i^*)$ are private.

The mechanism to design is such that, first, sort the bidders so
$$
\frac{b_1}{\sqrt{S_1}}\ge \frac{b_2}{\sqrt{S_2}}\ge \cdots \ge \frac{b_n}{\sqrt{S_n}}
$$
Initially, let all items be unallocated: $M := [m]$. Starting from $i = 1$ to $n$: if $S_i^*\subseteq M$, allocate $S_i^*$ to $i$, and subtract $S_i^*$ from $M$: $M := M\setminus S_i^*$.

So it's basically ordering bidders in $\frac{b_i}{\sqrt{S_i}}$ and let them take their (committed) favourite set themselves.

### problem

- develop payment $p_i$ that is IC

- prove that social welfare $ALG := \sum_i v_i(S^\text{ALG}_i)$ where $S_i^\text{ALG}, i\in [n]$ satisfies
    $$
    ALG \ge \frac1{\sqrt m}OPT
    $$
    where $OPT = \max \sum_i v_i(S_i)$ (optimal social welfare).

#### hint: (i) critical value as payment; (ii) to prove approximation, consider the unlucky folks that should have obtained allocation in OPT but are missed in ALG.
