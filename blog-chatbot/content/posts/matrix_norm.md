---
title: "Matrix Norms"
date: 2025-12-15T11:02:12-06:00
draft: false
---

Whenever I look up matrix norms, I almost inevitably end up on Wikipedia. It’s usually the most reliable reference. Yet I also often find myself baffled by sentences like:

>  *“In mathematics, specifically functional analysis, the Schatten norm (or Schatten–von Neumann norm) arises as a generalization of* $p$*-integrability similar to the trace class norm and the Hilbert–Schmidt norm.”*

?!? This is where the *recursive study* begins: confused by one definition, I open another page to clarify it, only to be met with two more unfamiliar terms, and on and on. This post is an attempt to stop the recursion. Here's a simplified, self-contained guide to matrix norms.

Throughout, I use uppercase letter for matrices, lowercase letter for vectors, $\Vert  \cdot \Vert $ for norms. I sub/super-script the norms to differentiate them, especially for the matrix norms. For vectors, I will use $\Vert x\Vert _p :=(\sum_i|x_i|^p)^{1/p}$ for vector p-norms.

Consider a matrix $A\in \R^{m\times n}$. There are roughly three family of matrix norms. 

## Entry-wise matrix norms

Strech the matrix as vector and apply standard vector norms. Technically you can play with any vector norm. It's pretty straightforward cause it doesn't make use of the matrix's structure.

One example is the **Frobenius norm**:
$$
\Vert A\Vert_F := \sqrt{\sum_{(i, j)\in [m]\times [n]}a_{ij}^2}.
$$

------

## Operator norms

A matrix is essentially a (linear) operator $T:\R^n\to \R^m$ on vector spaces. So we can induce *operator* norms from vector norms. This is often more useful because we use matrices indeed more as operators. 

For $1 \le p\le \infty$:
$$
\Vert A\Vert _{p} := \sup\lbrace \Vert A x\Vert _{p}:\Vert x\Vert _{p} \le 1\rbrace.
$$

- $p = 2$ is the famous **spectral norm** (aka operator norm). It is the largest singular value of $A$:
    $$
    \Vert A\Vert _2 = \max_{\Vert x\Vert _2\le 1}\Vert Ax\Vert _2 = \sigma_\max (A)
    $$

- $p = 1$ is the maximum absolute column 1-norm of the matrix. Denote as $a_i\in \R^m$ the $i$th column of $A$, then
    $$
    \Vert A\Vert _1 = \max_{i\in [n]}\Vert a_i\Vert _1.
    $$

- $p=\infty$ gives the maximum absolute row 1-norm of the matrix. Denote as $\tilde a_j\in \R^j$ the $j$th **row** of $A$, then
    $$
    \Vert A\Vert _\infty = \max_{j\in [m]}\Vert \tilde a_j\Vert _1.
    $$

### Properties: all operator norms are

- *sub-multiplicative*

$$
\Vert AB\Vert _p\le \Vert A\Vert _p \Vert B\Vert _p
$$

- *consistent*
    $$
    \Vert Ax\Vert _p\le \Vert A\Vert _p \Vert x\Vert _p
    $$

*Note*: operator $p$-norm can be genrealized to operator $\alpha, \beta$-norm:
$$
\Vert A\Vert _{\alpha, \beta} := \sup\lbrace \Vert A x\Vert _{\beta}:\Vert x\Vert _{\alpha} \le 1\rbrace.
$$
A generalized version of the *sub-multiplicative* and *consistency* properties applies. See details [here in wikipedia](https://en.wikipedia.org/wiki/Matrix_norm#Matrix_norms_induced_by_vector_%CE%B1-_and_%CE%B2-norms).

------

## Schatten norms

This is something really cool. The *Schatten p-norms* is defined as, for $1 \le p\le \infty$
$$
\Vert A\Vert _{p}^{\mathcal{S}} := \left(\text{Tr}\left[\left(\sqrt{(A^ TA)}\right)^p\right]\right)^{1/p}.
$$
*Note*: The square root $T:= \sqrt{S}$ is defined for any positive-semidefinite matrix $S$, that there is a unique matrix $T$ that is also positive semidefinite, symmetric and $TT= S$. The $p$ in $\left(\sqrt{(A^* A)}\right)^p$ means matrix power.

Here's how to simplify it. Now if $p = 1$, $\text{Tr}(\sqrt{A^TA})$ is exactly the sum of all singular values. For general $0 \le p\le \infty$, notice that when you take a symmetric matrix $(A^TA)^p$, each of its eigenvalues is powered up by individually by $p$. Therefore, denote as $\sigma(A)$ the singular value **vectors** of $A$, then
$$
\Vert A\Vert _{p}^{\mathcal{S}} = \Vert \sigma(A)\Vert _p.
$$

- The Schatten 1-norm is the nuclear norm:
    $$
    \Vert A\Vert _* = \sum_{i = 1}^{\min(m, n)}\sigma_i(A).
    $$

- The Schatten 2-norm is the Frobenius norm.

- The Schatten ∞-norm is the spectral norm.

### Properties of Shatten norms:

- Sub-multiplicativity:
    $$
    \Vert AB\Vert _p^{\mathcal S}\le \Vert A\Vert _p^{\mathcal S} \Vert B\Vert _p^{\mathcal S}.
    $$

- Hölder's inequality applies: for $p, q, r\in [1, \infty]$ such that $1/p + 1/q = 1/r$:
    $$
    \Vert AB\Vert _r^{\mathcal S}\le \Vert A\Vert _p^{\mathcal S} \Vert B\Vert _q^{\mathcal S}.
    $$

- Monotonicity: for $1\le p \le p'\le \infty$
    $$
    \Vert A\Vert _{\infty}^{\mathcal S}\le \Vert A\Vert _{p'}^{\mathcal S}\le \Vert A\Vert _p^{\mathcal S}\le \Vert A\Vert _1^{\mathcal S}.
    $$
    Btw, this implies spectral norm <= frobenius norm <= nuclear norm:
    $$
    \Vert A\Vert _2\le \Vert A\Vert _F\le \Vert A\Vert _*
    $$
    

