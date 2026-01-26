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
    \Vert A\Vert _2 = \sigma_1=\Vert \sigma\Vert _{\infty}.
    $$

- Frobenius norm
    
    
    $$
    \Vert A \Vert_F = \sqrt{\sum_{i=1}^r \sigma_i^r} = \Vert \sigma\Vert_2
    $$
    
    
- Nuclear norm
    $$
    \Vert A\Vert_* = \sum_{i =1 }^r \sigma_i = \Vert \sigma\Vert_1.
    $$

$\Vert A\Vert_F $'s order will be $O(\sqrt{r} \sigma_{\max})$, and $\Vert A\Vert_*$ will be of $O(r \sigma_{\max})$. Actually


$$
\Vert A\Vert_2^2\le \Vert A\Vert_F^2 \le r\Vert A\Vert_2^2.
$$
Further assuming $|A_{ij}|\le \bar a$ (uniformly bounded) we do have
$$
\Vert A\Vert_F\le \sqrt{mn}\bar a.
$$
