---
title: "Matrix Completion I | The Optimization Formula"
date: 2025-07-03T23:52:29+08:00
draft: false
---

Given a partially observed matrix $ A \in \mathbb{R}^{m \times n} $, where only entries $ A_{ij} $ for $ (i, j) \in \Omega \subseteq [m] \times [n] $ are known, the goal is to recover the missing values and construct a full matrix $ \hat{A} \in \mathbb{R}^{m \times n} $. For example, think of known entries of $A_{ij}$ as observation of $m$ consumers' past ratings on $n$ products. The goal is to make predictions.

We still need more assumptions. A common modeling choice is to assume that $ A $ is **low-rank**, meaning that the ratings can be explained by a small number of latent features. Specifically, we assume each customer $ i $ has a feature vector $ v_i \in \mathbb{R}^r $, and each product $ j $ has a feature vector $ u_j \in \mathbb{R}^r $, such that:
$$
A_{ij} = v_i^\top \Sigma u_j,
$$
where $ \Sigma \in \mathbb{R}^{r \times r} $ is diagonal with nonnegative entries. This corresponds to a matrix factorization of $ A $ with rank at most $ r $.

The matrix completion task can now be posed as a rank minimization problem:
$$
\min_{\hat{A}} \ \mathrm{rank}(\hat{A}) \quad \text{subject to} \quad \hat{A}_{ij} = A_{ij}, \quad \forall (i,j) \in \Omega.
$$
This problem is combinatorial and NP-hard. To make it tractable, we relax rank to a convex surrogate: the **nuclear norm**, defined as the sum of singular values:
$$
\|\hat{A}\|_* = \sum_k \sigma_k(\hat{A}).
$$
This mirrors the standard relaxation of $ \ell_0 $ to $ \ell_1 $ in sparse recovery: rank counts nonzero singular values (non-convex), while the nuclear norm sums them (convex).

The relaxed optimization becomes:
$$
\min_{\hat{A}} \ \|\hat{A}\|_* \quad \text{subject to} \quad \hat{A}_{ij} = A_{ij}, \quad \forall (i,j) \in \Omega.
$$
This is a convex program and can be solved via semidefinite programming or first-order methods. Under suitable conditions (e.g. incoherence, random sampling), it recovers the true low-rank matrix with high probability.

I'll discuss the dual problem and its interpretation in the next post.
