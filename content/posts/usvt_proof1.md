---
title: "Proof Sketch of (Adjusted) Lemma 3.5 in Matrix Estimation by USVT (Chatterjee 2015)"
date: 2025-09-16T11:00:34-05:00
draft: false
summary: "Some fun algebraic manipulations."
---

Lemma 3.5 in Chatterjee (2015) is the main engine for proving SVD-is-a-good-estimator property. Here's the OG statement from the paper (for full picture of USVT and its estimation correctness, or details about notations, check [this blog about USVT proof sketch](/posts/usvt_proof/))

> Lemma 3.5 (Chatterjee 2015) Let $A = \sum_{i = 1}^m \sigma_i x_i y_i^T$ be the SVD of $A$. Fix any $\delta > 0$ and define $\hat B$ — an estimator of $B$ using $A$:
> $$
> \hat B := \sum_{i:\sigma_i > (1 + \delta)\Vert A - B\Vert}\sigma_i x_i y_i^T.
> $$
> Then, $B$ and $\hat B$'s (Frobenius) distance can be related with A and B's spectral distance and B's nuclear norm:
> $$
> \Vert \hat B - B\Vert_F \le K(\delta)(\Vert A - B\Vert  \Vert B\Vert_*)^\frac12 \tag{1}
> $$
> where $K(\delta) = (4 + 2\delta)\sqrt{{2}/{\delta}} + \sqrt{2 + \delta}$.

The paper stated the results $(1)$ in Frobenius norm because in the end mean square root error is considered (MSE = Frobenius norm / m*n). However, to further use USVT and prove some results on top of it we generally prefer intermediate results expressed in spectral norm.

> Lemma 3.5.1 (Adapted from Chatterjee 2015) Let $A = \sum_{i = 1}^m \sigma_i x_i y_i^T$ be the SVD of $A$. Fix any $\delta > 0$ and define $\hat B$ — an estimator of $B$ using $A$:
> $$
> \hat B := \sum_{i:\sigma_i > (1 + \delta)\Vert A - B\Vert}\sigma_i x_i y_i^T.
> $$
> Then, $B$ and $\hat B$'s (Frobenius) distance can be related with A and B's spectral distance and B's nuclear norm:
> $$
> \Vert \hat B - B\Vert \le (6 + 3\delta)\Vert A - B\Vert.
> $$

Proof.

Let $B = \sum_{i = 1}^m  \tau_i u_i v_i^T$ be the SVD of B. WLOG assume that $\sigma_i$'s and $\tau_i$'s are arranged in decreasing order. Let
$$
S:=\lbrace i:\sigma_i > (1 + \delta)\|A - B\|).
$$
Define
$$
G :=\sum_{i\in S}\tau_i u_iv_i^T.
$$
By definition of $\hat B$ — using $i\in {S}$ components of $A$ estimated — the largest singular value of $A - \hat B$ is bounded above by $(1 + \delta)\|A - B\|$. Write in  math:
$$
\|A -\hat B\| = \|\sum_{i\in [m]\setminus S}\sigma_i x_iy_i^T\| \le (1 + \delta)\|A - B\|\tag{1}.
$$
On the other hand, by [Theorem 3.1 (from the paper)](/online/perturbation_of_singular_values.jpeg):


$$
\max_{i\in [m]}\|\sigma_i - \tau _i\|\le \|A - B\|.\tag{3}
$$


Consider first $i\notin S$, by $(3)$ and using the fact that $\sigma_i< (1 + \delta)\|A - B\|, \forall i\notin S$,
$$
\tau_i \le \sigma_i + \|A - B\| \le (2 + \delta) \|A - B\|\tag{2}, \forall i\notin S.
$$
Which leads to
$$
\|B - G\| = \|\sum_{i = 1}^m  \tau_i u_i v_i^T -\sum_{i\in S}\tau_i u_iv_i^T\| = \|\sum_{i\notin S}\tau_i u_iv_i^T\|\le \max_{i\notin S}\tau_i\le (2 + \delta)\|A - B\|.\tag{4}
$$
Then consider $i\in S$, by $(3)$, and using the fact that $\sigma_i\ge (1 + \delta)\|A - B\|, \forall i\in S$,
$$
\tau_i \ge \sigma_i - \|A - B\| \ge \delta \|A - B\|
$$
Apply the above and $(1)$ and $(4)$
$$
\|\hat B - G\|\le \|\hat B - A\| + \|A - B\| + \|B - G\| \le (4 + 2\delta)\|A - B\|.
$$
Lastly,
$$
\|\hat B - B\|\le \|\hat B - G\| + \|B - G\|\le (6 + 3\delta )\|A - B\|.
$$
