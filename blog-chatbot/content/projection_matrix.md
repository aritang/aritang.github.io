---
title: "Linear Algebra Tip | Projection Matrix on Work"
date: 2025-09-14T14:14:35-05:00
draft: false
---

Professional music critiques rarely poses any aptitude for mathematics. As they like to compare musical processes unintelligible to them with the equally darksome methods of mathematical thinking, especially they **hated algebra**:

> "The science of Mousier Berlioz is a sterile algebra" (P. Scudo, *Critique et Littérature Musicales, Paris, 1852*); "The music of Wagner imposes mental tortures that only algebra has a right to inflict" (Paul de Saint-Victor, *La Presse*, Paris, March 1861); "This theme serves [Ravel] for four movements [of the String Quartet] during which there is about as much emotional nuance as warms a problem in algebra" (New York Tribune, Dec 12, 1906).
>
> Slonimsky, Lexicon of Musical Invective

Have they tried *linear* algebra? Things get better here.

---

**Theorem 3** Let $A\in \R^{m\times r}$ be the left factor in an (economy) SVD, so its columns are orthonormal: $A^{\mathsf T}A=I_r$. Write $\tilde a_i\in\mathbb{R}^r$ for the $i$-th **row** of $A$, $\|\tilde a_i\|\le 1$.

> Proof
>
> **Definition.** A matrix $P$ is a *projection matrix* if (i) $P^2 = P$ (ii) $P$ is symmetric.
>
> **Theorem 1.** If $P$ is a $m\times m$ projection matrix and $\rank{(P)} = r$, $P$ has $r$ eigenvalues equal to $1$ and $m - r$ equal to $0$. (Proof hint: $\forall v, \lambda^2 v = P^2v = Pv = \lambda v \Rightarrow \lambda = 1/0$).
>
> **Theorem 2.** For any projection matrix, $0 \le P_{ii} \le 1, \forall i\in [m]$.
>
> > Proof.
> >
> > Because $P = P^{\mathsf T} = P^2$, for any vector $x$,
> > $$
> > x^{\mathsf T} P x = \|P x\|^2 \;\ge 0 .
> > $$
> > Plug in $e_i$ (the standard basis vector with a 1 in the $i$-th entry), This guarantees that every diagonal entry is **nonnegative**:
> > $$
> > P_{ii} = e_i^{\mathsf T} P e_i \;\ge 0 , \forall i\in [m]
> > $$
> >
> > ------
> >
> > Since $P$'s eigenvalues are either $0$ or $1$ (Theorem 1), its **spectral norm** is at most $1$. Equivalently:
> > $$
> > x^{\mathsf T} P x \;\le\; x^{\mathsf T} x \quad \text{for all } x .
> > $$
> > Again, take $x = e_i$ (the standard basis vector with a 1 in the $i$-th entry). Then
> > $$
> > P_{ii} = e_i^{\mathsf T} P e_i \;\le\; e_i^{\mathsf T} e_i = 1 .
> > $$
>
> Let $P = AA^T$, so $\|\tilde a_i\|^2 = P_{ii} \in [0, 1]$. $P$ is a projection matrix cause $AA^TAA^T = AA^T$ (recall $A$ is column-orthogonal). Apply Theorem 2, the proof is complete.
