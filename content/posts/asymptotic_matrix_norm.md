---
title: "Asymptotic Matrix Norms"
date: 2025-12-15T22:21:48-06:00
draft: false
---

For an $m\times n$ matrix $A$ of rank $r \ll \min(m, n)$. $A$ has $r$ positive singular values:
$$
0\le \sigma_r \le \ldots \le \sigma_2 \le \sigma_1.
$$
Denote as $\sigma\in \R^r$ the singular value vector. Its norms would satisfy:

- Spectral norm
    $$
    \|A\|_2 = \sigma_1=\|\sigma\|_{\infty}.
    $$

- Frobenius norm
    $$
    \|A\|_F = \sqrt{\sum_{i=1}^r \sigma_i^r} = \|\sigma\|_2
    $$

- Nuclear norm
    $$
    \|A\|_* = \sum_{i =1 }^r \sigma_i = \|\sigma\|_1.
    $$

$\|A\|_F $'s order will be $O(\sqrt{r} \sigma_{\max})$, and $\|A\|_*$ will be of $O(r\sigma_\max)$. Actually
$$
\|A\|_2^2\le \|A\|_F^2 \le r\|A\|_2^2.
$$
Further assuming $|A_{ij}|\le \bar a$ (uniformly bounded) we do have
$$
\|A\|_F\le \sqrt{mn}\bar a.
$$




