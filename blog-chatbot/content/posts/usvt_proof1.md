---
title: "Proof Sketch of (Adjusted) Lemma 3.5 in Matrix Estimation by USVT (Chatterjee 2015)"
date: 2025-09-16T11:00:34-05:00
draft: false
summary: "Some fun algebraic manipulations."
---

Lemma 3.5 in Chatterjee (2015) is the main engine for proving SVD-is-a-good-estimator property. Here's the OG statement from the paper (for full picture of USVT and its estimation correctness, or details about notations, check [this blog about USVT proof sketch](/posts/usvt_proof/))

> Lemma 3.5 (Chatterjee 2015) Let $A = \sum_{i = 1}^m \sigma_i x_i y_i^T$ be the SVD of $A$. Fix any $\delta > 0$ and define $\hat B$ — an estimator of $B$ using $A$:
> $$
> \hat B := \sum_{i:\sigma_i > (1 + \delta)\Vert  A - B\Vert }\sigma_i x_i y_i^T.
> $$
> Then, $B$ and $\hat B$'s (Frobenius) distance can be related with A and B's spectral distance and B's nuclear norm:
> $$
> \Vert  \hat B - B\Vert _F \le K(\delta)(\Vert  A - B\Vert   \Vert  B\Vert _*)^\frac12 \tag{1}
> $$
> where $K(\delta) = (4 + 2\delta)\sqrt{{2}/{\delta}} + \sqrt{2 + \delta}$.

The paper stated the results $(1)$ in Frobenius norm because in the end mean square root error is considered (MSE = Frobenius norm / m*n). However, to further use USVT and prove some results on top of it we generally prefer intermediate results expressed in spectral norm.

> Lemma 3.5.1 (Adapted from Chatterjee 2015) Let $A = \sum_{i = 1}^m \sigma_i x_i y_i^T$ be the SVD of $A$. Fix any $\delta > 0$ and define $\hat B$ — an estimator of $B$ using $A$:
> $$
> \hat B := \sum_{i:\sigma_i > (1 + \delta)\Vert  A - B\Vert }\sigma_i x_i y_i^T.
> $$
> Then, $B$ and $\hat B$'s (Frobenius) distance can be related with A and B's spectral distance and B's nuclear norm:
> $$
> \Vert  \hat B - B\Vert  \le (6 + 3\delta)\Vert  A - B\Vert .
> $$

Proof.

Let $B = \sum_{i = 1}^m  \tau_i u_i v_i^T$ be the SVD of B. WLOG assume that $\sigma_i$'s and $\tau_i$'s are arranged in decreasing order. Let
$$
S:=\lbrace i:\sigma_i > (1 + \delta)\Vert A - B\Vert ).
$$
Define
$$
G :=\sum_{i\in S}\tau_i u_iv_i^T.
$$
By definition of $\hat B$ — using $i\in {S}$ components of $A$ estimated — the largest singular value of $A - \hat B$ is bounded above by $(1 + \delta)\Vert A - B\Vert $. Write in  math:
$$
\Vert A -\hat B\Vert  = \Vert \sum_{i\in [m]\setminus S}\sigma_i x_iy_i^T\Vert  \le (1 + \delta)\Vert A - B\Vert \tag{1}.
$$
On the other hand, by [Theorem 3.1 (from the paper)](/online/perturbation_of_singular_values.jpeg):


$$
\max_{i\in [m]}\Vert \sigma_i - \tau _i\Vert \le \Vert A - B\Vert .\tag{3}
$$


Consider first $i\notin S$, by $(3)$ and using the fact that $\sigma_i< (1 + \delta)\Vert A - B\Vert , \forall i\notin S$,
$$
\tau_i \le \sigma_i + \Vert A - B\Vert  \le (2 + \delta) \Vert A - B\Vert \tag{2}, \forall i\notin S.
$$
Which leads to
$$
\Vert B - G\Vert  = \Vert \sum_{i = 1}^m  \tau_i u_i v_i^T -\sum_{i\in S}\tau_i u_iv_i^T\Vert  = \Vert \sum_{i\notin S}\tau_i u_iv_i^T\Vert \le \max_{i\notin S}\tau_i\le (2 + \delta)\Vert A - B\Vert .\tag{4}
$$
Then consider $i\in S$, by $(3)$, and using the fact that $\sigma_i\ge (1 + \delta)\Vert A - B\Vert , \forall i\in S$,
$$
\tau_i \ge \sigma_i - \Vert  A - B\Vert  \ge \delta \Vert A - B\Vert 
$$
Apply the above and $(1)$ and $(4)$
$$
\Vert \hat B - G\Vert \le \Vert \hat B - A\Vert  + \Vert A - B\Vert  + \Vert B - G\Vert  \le (4 + 2\delta)\Vert A - B\Vert .
$$
Lastly,
$$
\Vert \hat B - B\Vert \le \Vert \hat B - G\Vert  + \Vert B - G\Vert \le (6 + 3\delta )\Vert A - B\Vert .
$$
