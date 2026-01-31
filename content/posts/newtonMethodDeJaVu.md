---
title: "Implicit Updating of HJB deja-vu de Newton's Method"
date: 2026-01-28T22:27:47-06:00
draft: true
---

Interestingly, when using implicit updating to solve a continuous time system (of a certain structure), it coincide with Newton's Method

## Setup

Consider a household with state $(a, z) \in \mathcal{A} \times \mathcal{Z}$, where $a$ denotes assets and $z$ follows a Poisson process with intensity matrix $\Lambda$.

**Hamilton-Jacobi-Bellman Equation:**
$$
\rho v(a,z) = \max_c \left\{ u(c) + \partial_a v(a,z) \cdot s(a,z) + \sum_{z'} \lambda_{zz'} v(a,z') \right\}
$$
where savings $s(a,z) = ra + wz - c(a,z)$.

**First-Order Condition:** $u'(c) = \partial_a v$, yielding $c = (u')^{-1}(\partial_a v)$.

**Kolmogorov Forward Equation:** The stationary distribution $g(a,z)$ satisfies
$$
0 = -\partial_a[s(a,z) g(a,z)] + \sum_{x} \lambda_{xz} g(a,x)
$$

**Market Clearing:** $F(p, g) = 0$ for price vector $p$.

---

## Discretization

Discretize the state space on grids $\{a_i\}_{i=1}^{N_a}$ and $\{z_j\}_{j=1}^{N_z}$. Stack values into vectors $\mathbf{v}, \mathbf{g} \in \mathbb{R}^{N_a N_z}$.

The discretized HJB (after substituting the FOC) becomes:
$$
\rho \mathbf{v} = \mathbf{u}(\mathbf{v}) + \mathbf{A}(\mathbf{v})\mathbf{v}
$$

where:
- $\mathbf{u}(\mathbf{v})$: utility vector with $u_i = u\left((u')^{-1}(\partial_a v_i)\right)$
- $\mathbf{A}(\mathbf{v}) = \mathbf{A}_s(\mathbf{v}) + \mathbf{A}_z$: transition matrix from upwind finite differences

**Key structure:** $\mathbf{A}$ has negative diagonal, non-negative off-diagonal entries, and rows summing to zero (a valid intensity matrix).

---

## The Envelope Condition Simplification

Define the residual:
$$
\mathbf{F}(\mathbf{v}) \equiv \mathbf{u}(\mathbf{v}) + \mathbf{A}(\mathbf{v})\mathbf{v} - \rho \mathbf{v}
$$

We seek $\mathbf{v}^*$ such that $\mathbf{F}(\mathbf{v}^*) = 0$.

**Claim:** When the envelope condition holds, the Jacobian simplifies to
$$
\nabla \mathbf{F}(\mathbf{v}) = \mathbf{A}(\mathbf{v}) - \rho \mathbf{I}
$$

*Proof sketch:* Differentiate the HJB w.r.t. $a$. The envelope theorem implies that the indirect effect of $\mathbf{v}$ through the optimal policy $c(\mathbf{v})$ vanishes:
$$
\frac{\partial}{\partial v_j}\left[ u(c_i) + A_{ik}v_k \right] = \underbrace{\left(u'(c_i) - \partial_a v_i\right)}_{=0 \text{ by FOC}} \frac{\partial c_i}{\partial v_j} + A_{ij}
$$

Thus $\nabla \mathbf{F} = \mathbf{A} - \rho \mathbf{I}$. $\square$

---

## Newton's Method

Newton's method solves $\mathbf{F}(\mathbf{v}) = 0$ via:
$$
\mathbf{v}^{\ell+1} = \mathbf{v}^\ell - \left[\nabla \mathbf{F}(\mathbf{v}^\ell)\right]^{-1} \mathbf{F}(\mathbf{v}^\ell)
$$

Substituting our Jacobian:
$$
\mathbf{v}^{\ell+1} = \mathbf{v}^\ell - \left(\mathbf{A}^\ell - \rho \mathbf{I}\right)^{-1} \left(\mathbf{u}^\ell + \mathbf{A}^\ell \mathbf{v}^\ell - \rho \mathbf{v}^\ell\right)
$$

where $\mathbf{A}^\ell \equiv \mathbf{A}(\mathbf{v}^\ell)$ and $\mathbf{u}^\ell \equiv \mathbf{u}(\mathbf{v}^\ell)$.

Rearranging:
$$
\boxed{\mathbf{v}^{\ell+1} = \left(\rho \mathbf{I} - \mathbf{A}^\ell\right)^{-1} \mathbf{u}^\ell}
$$

---

## Implicit Updating

The implicit (backward) time-iteration scheme discretizes the time-dependent HJB:
$$
\frac{\mathbf{v}^{\ell+1} - \mathbf{v}^\ell}{\Delta} + \rho \mathbf{v}^{\ell+1} = \mathbf{u}^\ell + \mathbf{A}^\ell \mathbf{v}^{\ell+1}
$$

Solving for $\mathbf{v}^{\ell+1}$:
$$
\left[\left(\rho + \frac{1}{\Delta}\right)\mathbf{I} - \mathbf{A}^\ell\right] \mathbf{v}^{\ell+1} = \mathbf{u}^\ell + \frac{\mathbf{v}^\ell}{\Delta}
$$

---

## Equivalence

**Theorem.** *Implicit updating coincides with Newton's method in the limit $\Delta \to \infty$.*

*Proof:* As $\Delta \to \infty$, we have $1/\Delta \to 0$, so:
$$
\left(\rho \mathbf{I} - \mathbf{A}^\ell\right) \mathbf{v}^{\ell+1} = \mathbf{u}^\ell
$$
which is exactly the Newton update. $\square$

**Interpretation:**
- Finite $\Delta$: partial Newton step with damping factor $\omega = \rho\Delta/(1 + \rho\Delta)$
- $\Delta \to \infty$: full Newton step
- $\Delta \to 0$: explicit method (forward iteration), conditionally stable
