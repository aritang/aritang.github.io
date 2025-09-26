---
title: "Matrix Estimation with Adjustable Sampling Rate"
date: 2025-09-24T20:34:28-05:00
draft: false
---

Here's a very interesting matrix completion method and result, which is a direct corollary from Koltchinskii, Lounici and Tsybakov (2011) paper.

Consider the following matrix estimation problem: for input matrix $A\in \mathbb R^{m_1\times m_2}$, assume $m_1 < m_2$ and $\text{rank}(A)  = r \ll m_2$.

$n$ entries of $A$ are observed at uniformly at random, with independent noise $\epsilon_{ij}$. Denote as $\Omega$ the index set of observed entries of $A$, define the *scaled* observation matrix $Y = [y_{ij}]$ as
$$
y_{ij} = \frac{m_1 m_2}n \begin{cases}
a_{ij} +\epsilon_{ij}  & (i, j) \in \Omega\cr
0 & (i, j)\notin \Omega
\end{cases},\quad (i, j)\in [m_1]\times [m_2].
$$
Let $\lambda = C_* \bar y \sqrt{\frac{\log(m_1+m_2)}{m_1n}}$, where $C_*$ is a large enough constant depend only on attributes of the random noise $\epsilon_{ij}$. Threshold $Y$'s singular values and obtain an estimated $\hat A$ by
$$
\hat A = \sum_{j = 1}^{m_1}\left[\sigma_j(Y) - \frac{\lambda m_1m_2}{2}\right]_+u_j(Y)v_j(Y)^T\tag{1}
$$
(Note: $\hat A$ is the optimal solution to $\min_{X}\Vert X - Y\Vert _F^2 + (\lambda m_1 m_2)\Vert X\Vert _*$)

Then, if $n > m_1\log^3(m_1 + m_2)$, with probability at least $1 - 3/(m_1 + m_2)$,
$$
\Vert \hat A - A\Vert \le C\Vert A\Vert_* \sqrt{m_1 m_2}\sqrt{\frac{m_2 \log(m_1 + m_2)}{n}}.
$$
where, $C$ is a constant independent of $r, n, m_1, m_2$ (Corollary 2, equation 3.10).

### reference

Koltchinskii, Vladimir, Karim Lounici, and Alexandre B. Tsybakov. “NUCLEAR-NORM PENALIZATION AND OPTIMAL RATES FOR NOISY LOW-RANK MATRIX COMPLETION.” *The Annals of Statistics* 39, no. 5 (2011): 2302–29. http://www.jstor.org/stable/41713579.
