---
title: "Matrix Completion II | Assumptions"
date: 2025-07-06T23:08:59+08:00
draft: false
summary: "Why matrix completion is equivalent to minimizing the recovered matrix's spectral norm."
---

(Before diving in, feel free to checkout a more detailed setup of the problem appears in the previous post for problem context: [Matrix Completion I | the Optimization Formula](/posts/matrix_completion/))

> Beneath the brutally simple engineering result — that singular value decomposition plus nuclear norm minimization can "magically" complete a matrix — lies a set of precise, nontrivial assumptions that make the whole pipeline work.
>
> So, why matrix completion is equivalent to minimizing the recovered matrix's spectral norm?

We aim to recover a full matrix $ A \in \mathbb{R}^{m \times n} $ from partial observations indexed by $ \Omega \subset [m] \times [n] $.

The standard recovery guarantee relies on three key conditions:

1. **Low-rank structure**: The ground truth matrix $ A^\star $ has rank $ r \ll \min(m, n) $.
2. **Random sampling**: Each entry is independently observed with probability $ p > c \cdot \frac{r \log^2 n}{n} $.
3. **Incoherence**: The row and column spaces of $ A^\star $ are not too aligned with the standard basis (i.e., energy is spread across entries).

Condition 1 is standard, mathematically natural way of assuming that the matrix is compressible. Condition 2 ensures sufficient, unbiased sample. Condition 3 — incoherence — is more subtle. It's usually phrased like this:

> Incoherence ensures that the singular vectors of $ A^\star $ are not concentrated on a few coordinates. This prevents large components from being "hidden" in just a few observed entries.

But the role of incoherence is best understood together with the optimization program we actually solve. Recall, we minimize the **nuclear norm** of the reconstructed matrix $ \hat{A} $, subject to agreement with the observed entries:

$$
\begin{align*}
\min_{\hat{A}} &\quad  \|\|\hat{A}\| \|\cr
\text{subject to} & \quad \hat A_{ij} = A_{ij}, \quad \forall (i,j) \in \Omega.
\end{align*}
$$

For this to recover the correct matrix, we need a kind of uniqueness:

> Any matrix $ \hat{A} $ that matches all observed entries and has $ \|\|\hat{A}\|\| < \|\|A^\star\|\| $ **cannot** exist.

That is, $ A^\star $ must be the unique lowest-nuclear-norm matrix consistent with the observed data. Under conditions 1–3 above, this uniqueness holds **with high probability**. 

That's why, recovering the matrix is equivalent to an optimization problem that minimize the fitted matrix's spectral norm.
