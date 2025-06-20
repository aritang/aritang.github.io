---
title: "Cool Paper | Sparse Stochastic Bandits"
date: 2025-06-20T21:32:03+08:00
draft: false
summary: "The visible world is no longer a reality and the unseen world no longer a dream (Kandinsky)"
---

> The visible world is no longer a reality and the unseen world no longer a dream (Kandinsky)

{{<figure align="center" src="/online/kandinsky.jpeg" caption="Circles in a Circle (1923) Vasily Kandinsky" width="100%">}}

In the classical MAB problem, $K$ arms are available to the decision maker who pulls them sequentially. To maximize total reward, UCB algorithms achieves regret which scales linearly with $K$: $O(K\log T)$.

For sparse bandit problem, only $L$ of $K$ arms have positive means, the others' mean are zero or negative. Kwon et al.'s 2017 paper showed regret for all uniformly efficient algorithm is lower-bounded by (let $\Delta := \mu^* - \mu$):
$$
\begin{align*}
& \quad \text{Reg{(T)}}\ge \frac{s}{2\Delta}\log T\cr
&  \text{with }T\to \infty, \frac LK > \frac{\Delta}{\mu^2} + 1, \mu\ge \frac12
\end{align*}
$$
And they introduced `SparseUCB` algorithm that matches this lowerbound:
$$
\text{Reg}(T) \lesssim \frac{s\log T}{2\Delta},
$$
where the notation $\lesssim$ means that the inequality holds up to some universal multiplicative constants and some additive constants.

### The `SparseUCB` algorithm

`SparseUCB` has three phases that it can be in at $t$: denoted as $w(t) \in \lbrace\tau, f, u\rbrace$:

{{<figure align="center" src="/online/sparse_ucb.jpeg" caption="Screenshot from Kwon et al. Section 4.1" width="100%">}}

> Input: total $K$ arms and known quantity of good arms $L$.
>
> - **Phase** $\tau$: Pull every $K$ arms *round-robin* repeatedly until $|\mathcal J(t)|\ge s$.
>
> - **Phase** $f$: If $|\mathcal J(t)| \ge s$ but $|\mathcal K(t)| < s$, pulls any arm in $\mathcal J(t)\setminus \mathcal K(t)$.
>
> Note: phase $f$ can go back to $\tau$. 
>
> At last when we get $|\mathcal K(t)\ge s|$ enter Phase $u$:
>
> - **Phase** $u$: run UCB on $\mathcal K(t)$ arms.

The design idea of `SparseUCB` is to first quickly identify $L$ good arms, then pull them according to UCB rule. The design of the Phase $f$ (termed the force-log phase) is as followed, as explained by the paper

{{<figure align="center" src="/online/sparse_ucb_1.jpeg" caption="One more screenshot from Kwon et al. Section 4.1" width="100%">}}

It guarantees regret (Theorem 2 from Kwon et al (2017)).
$$
\mathbb E[\text{Reg}(T)] \lesssim \log T \sum_{i\in [L]} (\frac1{\Delta_i} + \frac{\Delta_i}{\mu_i^2}).
$$

### Reference

*Sparse Stochastic Bandits* Joon Kwon, Vianney Perchet, Claire Vernade. 2017 COLT.

