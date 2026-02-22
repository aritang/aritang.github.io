---
title: "Coherent/Incoherent Matrix Completion"
date: 2025-07-07T16:16:32+08:00
draft: false
summary: "Incoherence is sufficient for exact matrix completion under random sampling. Coherent matrix can also be accurately recovered if random sampling can be contingent on each entry's local coherence."
---

## Incoherence is sufficient for recovering a matrix

> **Theorem** Matrix $\mathbf A$ has **coherence $\mu$** and rank $r$. There exists universal constant $c, c_1, c_2 > 0$ such that, if each entry of $\mathbf A$ is observed i.i.d. with probability
> $$
> p > c\frac{r \log^2 n}{n}.
> $$
> Then $\mathbf A$ can be recovered from the unique optimal solution of the following optimization w.p. at least $1 - c_1 n^{-c_2}$:
> $$
> \begin{align*}
> \min_{\hat{A}} &\quad  \|\|\hat{A}\|\| \quad \text{(nuclear norm)} \cr
> \text{subject to} & \quad \hat A_{ij} = A_{ij}, \quad \forall (i,j) \in \Omega \text{ (observed set)}
> \end{align*}
> $$

Btw, coherence $\mu$ is defined as

> **Definition** (Coherence.) Assume that matrix $\mathbf A$ is rank $r$ with SVD
> $$
> \mathbf A = U\Sigma V^T
> $$
> so $U\in \R^{n\times r}$ and $V\in \R^{n\times r}$ are orthonormal rectangular matrices (without loss $A$ can be zero-filled to be a square matrix).
>
> **Coherence** of $A$ is defined as the smallest $\mu\in \R$ such that
> $$
> \max_{k= 1, \ldots, n} \|U^T e_k\|^2 \le \mu\frac{r}n, \quad\max_{k= 1, \ldots, n} \|V e_k\|^2 \le \mu\frac{r}n.
> $$

*Note for coherence:*

We first look at the property of coherence number $\mu$ from two extreme examples. 

(i) For any matrix $U$ of rank $r$ with orthonormal columns, the smallest $\mu$ that satisfies $\max_{k= 1, \ldots, n} \|U^T e_k\|^2 \le \mu\frac{r}n$ is $\mu = 1$ — when $U$ consists of vectors $(\frac 1{\sqrt n},\frac 1{\sqrt n}, \ldots, \frac 1{\sqrt n})$.

(ii) On the other hand, the largest coherence of $U$ occurs when $U$ is (part of) an identity matrix — i.e. the $k$th column of $U$ be $u_k = e_k$. Then $\mu = \frac nr$ and it can be proved that this is $\mu$'s upperbound.

The coherence number $\mu$ reflects how *concentrated* matrix $\mathbf A$'s **singular vectors** ($U$, $V$ out of SVD) are. Intuitively, when coherence $\mu$ is high — the singular vectors of $\mathbf A$ are concentrated, then it's like like having a few very important entries in the matrix that determine the rest. Random sampling would likely miss these crucial entries, making it difficult to reconstruct the matrix accurately. So we want ***<u>in</u>**coherence* (low $\mu$).

## Incoherence is not necessarily necessary though for recovering a matrix

Incoherence assumption is required exactly because of uniform sampling. But imagine this — if you have perfect control over which entry of $\mathbf A$ be observed, technically you only need $n\times r$ observations to recover a rank-$r$ matrix.

So it should be imaginable that the incoherent requirement can be relaxed when we have some control over which entry of $\mathbf A$ is observed. One way is, each entry of $\mathbf A$ is observed w.p. w.r.t. their local coherence:

> **Definition** (Local Coherence)
>
> For matrix $\mathbf A$ of $n_1\times n_2$ with SVD $U\Sigma V^T$ and rank $r$, its *local coherences* — $\mu_i$ for any row $i$ and $\nu_i$ for any column $j$ — are defined by
> $$
> \begin{align*}
> \text{row:}\quad & \|\|U^Te_i\|\| = \sqrt{\frac{\mu_i r}{n_1}},\quad  \forall i\in [n_1]\cr
> \text{column:}\quad & \|\|V^Te_i\|\| = \sqrt{\frac{\nu_i r}{n_2}},\quad  \forall j\in [n_2]
> \end{align*}
> $$
> 

And then

> **Theorem (Chen et al. 2014)**
>
> For $n_1\times n_2$ matrix $\mathbf A$ be with local coherence parameters $\lbrace \mu_i, \nu_j \rbrace$. Then exists constant $c', c_1', c_2'$ such that, if each entry $A_{ij}$ are observed independently with probability $p_{ij}$:
> $$
> \begin{align*}
> p_{ij} & \ge \min\lbrace c'\frac{(\mu_i + \nu_j)r\log^2(n_1 + n_2)}{\min(n_1, n_2)}, 1\rbrace\cr
> p_{ij} & \ge \frac{1}{\min(n_1, n_2)^{10}}
> \end{align*}.
> $$
> Then $\mathbf A$ can be recovered from the unique optimal solution of the following optimization w.p. at least $1 - c_1'(n_1 + n_2)^{-c_2'}$ (same from the previous theorem)
> $$
> \begin{align*}
> \min_{\hat{A}} &\quad  \|\|\hat{A}\|\| \quad \text{(nuclear norm)} \cr
> \text{subject to} & \quad \hat A_{ij} = A_{ij}, \quad \forall (i,j) \in \Omega \text{ (observed set)}
> \end{align*}
> $$

Note that, the expected number of observations in this theorem is
$$
\sum_{i, j}p_{ij} \ge c' \frac{r \log^2 (n_1 + n_1)}{\min(n_1, n_2)}\sum_{i, j}(\mu_i + \nu_j).
$$
Because $U, V$ are orthogonal — $\sum_i \mu_i r/n_1 = \sum_j \nu_jr/n_2 = r$, so we further have
$$
\sum_{i, j}p_{ij}\ge 2c'\max(n_1, n_2)r\log^2(n_1 + n_2).
$$
Which match the previous theorem.

### Reference

[1] *Coherent Matrix Completion* Chen et al. ICML 2014

[2] *Lecture 19–20: Matrix Completion* Lecture Note by V. Morgenshtern.
