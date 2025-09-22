---
title: "Measuring the Distance of Singular Value Spaces | the Davis-Kahan-Wedin Sin Theta Theorem"
date: 2025-09-21T16:57:12-05:00
draft: false
summary: "bound SVD outcome by their og matrices"
---

### Motivation: non-unique singular vectors

Say you have a matrix $A$, and its perturbed estimation $\hat A$. Take their (economic) singular value decomposition (SVD) respectively
$$
A = U \Sigma V^T,\quad\hat A = \hat U\hat \Sigma\hat V^T.
$$
If $\hat A$ estimates $\hat A$ well, we would expect $U, \hat U$ also be close as well. But uniqueness of the singular vectors in SVD are tricky. $U$ (or $V$) is “unique” only in the sense that its column (or row) span (e.g. the left/right singular subspace) is uniquely determined by $A$:

> - If all singular values are distinct, each column $u_i$ of $U$ (the left singular vectors) is unique **up to a sign**. In other words, if $u_i$ is a singular vector, then so is $-u_i$.
> - If some singular values are repeated, the associated singular subspace (the span of the corresponding columns of $U$) is unique, but the individual basis vectors are not. For example, say a a singular value $\sigma$ has multiplicity $k$, then you can rotate those corresponding $k$ columns of $U$ with any orthogonal transformation and still get a valid a valid SVD.

In other words, SVD's singular vectors are unique in terms of the *subspace* they span. A natural way to measure the distance between subspaces are their *angles:*

> ### Detail: subspace angles
>
> Suppose a subspace is spanned by matrix $M\in \mathbb R^{m\times r}$'s (linearly independent) columns. The orthogonal projection onto this subspace is then
> $$
> P_M = M \left(M^{T} M\right)^{-1}M^{T}.
> $$
> The angle between a vector $x$ and the subspace is defined as
> $$
> \sin \Theta(x, M) := \min_{y\in M}\Vert x - y\Vert_2 =  \Vert (I - P_M)x\Vert_2.
> $$
> Correspondingly, for two subspaces $L$, $M$, their angle are defined as
> $$
> \Vert\sin \Theta (L, M)\Vert := \Vert (I - P_M)P_L\Vert
> $$
> for any unitary invariant norm $\Vert \cdot \Vert$ (e.g. Operator norm, Frobenius norm).

For orthonormal $U$ and $\hat U$ coming out of SVD, their angles are
$$
\Vert \sin \Theta(U, \hat U)\Vert = \Vert(I - UU^T)(\hat UU^T)\Vert.
$$

---

### The Davis-Kahan-Wedin $\sin\Theta$ Theorem

Basically, it bounds $\Vert \sin \Theta(U, \hat U)\Vert$ by $\Vert A  -\hat A \Vert$. Davis and Kahan introduced the bound for Hermitian matrices (1970), Wedin generalized the result to general asymmetric complex matrices (1972).

> **Theorem** (Wedin, 1972)
>
> Let
> $$
> A = U \Sigma V^\top, 
> \quad 
> \hat A = \hat U \hat \Sigma \hat V^\top
> $$
>
> be (***full***) singular value decompositions of $A$ (the “true” matrix) and its perturbation $\hat A$. 
>
> Partition both SVDs:
> $$
> U = \bigl[U_1\quad  U_0\bigr], 
> \quad
> \Sigma = \begin{bmatrix} \Sigma_1 & 0 \cr 0 & \Sigma_0 \end{bmatrix}, 
> \quad
> V = \bigl[V_1 \quad V_0\bigr],
> $$
>
> where $\Sigma_1 \in \mathbb R^{r\times r}$ contains the $r$ singular values of interest.
>
> Do the same for $\hat A$:
>
> $$
> \hat U = \bigl[\hat U_1\quad\hat U_0\bigr], 
> \quad
> \hat \Sigma = \begin{bmatrix} \hat \Sigma_1 & 0 \cr 0 & \hat \Sigma_0 \end{bmatrix}, 
> \quad
> \hat V = \bigl[\hat V_1 \quad \hat V_0\bigr].
> $$
>
> Let
> $$
> \delta := \min\{ \hat\sigma_{\min}(\hat \Sigma_1) - \sigma_{\max}(\Sigma_0),
>                        \sigma_{\min}(\Sigma_1) - \hat\sigma_{\max}(\hat \Sigma_0)\}.
> $$
> (In words: $\delta$ is the distance between the singular values retained in one matrix and the singular values discarded in the other).
>
> And we will have
> $$
> \Vert\sin\Theta(U_1, \hat U_1)\Vert
> \le  \frac{\Vert A - \hat A\Vert}{\delta}
> $$
> similar for $V, \hat V$.

And you can get much better bounds for a little bit more assumptions. For example, when the error $E:= A - \hat A$ are standard Gaussian. Denote as $\sigma_{i}$ the i^th singular value of $A$. Denote as $U_i$ the columns of $U$ corresponding to $i$ largest singular values:

{{<figure align="center" src="/online/ovw_theorem7.jpeg" caption="From O'Rourke, Vu and Wang (2023), coursey to the authors." width="100%">}}

### reference

Davis, Chandler, and W. M. Kahan. “The Rotation of Eigenvectors by a Perturbation. III.” *SIAM Journal on Numerical Analysis* 7, no. 1 (1970): 1–46. http://www.jstor.org/stable/2949580.

Wedin, PÅ. Perturbation bounds in connection with singular value decomposition. *BIT* **12**, 99–111 (1972). https://doi.org/10.1007/BF01932678

O’Rourke, Sean, Van Vu, and Ke Wang. 2018. “Matrices with Gaussian Noise: Optimal Estimates for Singular Subspace Perturbation.” *arXiv* (March), arXiv:1803.00679. https://doi.org/10.48550/arXiv.1803.00679.
