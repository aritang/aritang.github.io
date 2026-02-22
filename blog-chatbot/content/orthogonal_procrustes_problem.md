---
title: "The Orthogonal Procrustes Problem"
date: 2025-09-22T22:27:33-05:00
draft: false
---

Given two matrices $A, B$, finding an orthogonal matrix $\Omega\in O(n)$ which most closely maps $A$ to $B$:
$$
\min_{\Omega\in O(n)}\Vert \Omega A - B\Vert_F
$$

###### Note: $O(n)$ means the set of n*n orthogonal matrices. 

> The name **Procrustes** refers to a bandit from Greek mythology who made his victims fit his bed by either stretching their limbs or cutting them off. ([Wikipedia](https://en.wikipedia.org/wiki/Orthogonal_Procrustes_problem))

TL;DR: the optimal solution $\Omega^\star = UV^T$, where $U, V$ are given by taking SVD of $BA^T = U \Sigma V^T$.

Proof.

First decompose the Frobenius norm using $\Vert A\Vert_F^2=\lang A, A\rang_F$, where $\lang \cdot,\ \cdot\rang_F$ is the Frobenius-norm induced inner product:
$$
\begin{align*}
&\quad \ \min_{\Omega\in O(n)} \Vert \Omega A - B\Vert_F^2\cr
& = \lang\Omega A, \Omega A\rang_F + \lang B, B\rang_F - 2\max_{\Omega\in O(n)} \lang \Omega A, B\rang_F.
\end{align*}
$$
And use the fact that $\lang A, A\rang_F =  \text{tr}(A^T A)$:
$$
\begin{align*}
\max_{\Omega\in O(n)} & \quad\  \lang \Omega A, B\rang_F\cr
& = \text{tr} ((\Omega A)^T B)\cr
& = \text{tr} (A^T \Omega^T  B)\cr
& = \text{tr}(\Omega^T BA^T)\cr
& \text{(Take SVD $BA^T= U\Sigma V^T$)}\cr
&= \text{tr}(\Omega^T U\Sigma  V^T) = \text{tr}(V^T\Omega^T U \Sigma) = \text{tr}((U^T\Omega V)^T \Sigma)\cr
& = \lang U^T\Omega V ,\Sigma\rang_F
\end{align*}
$$
$U^T \Omega V$ is also orthogonal. Let $\tilde \Omega := U^T \Omega V$. If $BA^T$ is full rank, $(0)$ is then equivalent to $\max_{\tilde \Omega\in O(n)}\lang \tilde \Omega, \Sigma\rang_F $. This is maximized when $\tilde \Omega^\star = I$, so
$$
U^T \Omega^\star V = \tilde \Omega^\star= I\Rightarrow\Omega^\star = UV^T.
$$
And the proof is complete.
