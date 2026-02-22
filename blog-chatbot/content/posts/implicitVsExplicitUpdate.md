---
title: "Implicit vs Explicit Updates"
date: 2026-02-01T16:11:18-06:00
draft: false
---

In heterogeneous agent macroeconomics models, the way to compute (solve) a steady state equilibrium of the market is quite interesting.

Consider a unit mass of agents, whose utility functions are the same $u:\R \to \R$. In a continuous time world, at each ifinisimmo time point they receive (stochastic) income and capital rents from their historial savings, consume and save more (sometimes saved capital are also called as 'assets' that generate returns, but per the no-arbitrage principle, the return of assets and captial rents net capital depreciation should be the same). So it's being abstracted as a stochastic continuous time markov system, the state is the asset that the agent hold, action is consumption, plus random income shocks.

The unit mass of agents are allowed to be heterogeneous ex-post in different saving states and receive different shocks. So the whole system is characterized by the following three equations, compactly, beautifully:

($a$ is asset, $z$ is income, $\lambda_{zz'}$ is Poisson shock rate, $s(a, z) = ra + z - c^\star(a, z)$ is the saving function).
$$
\begin{align*}
\rho v(a,z) &= \max_c \lbrace u(c) + \partial_a v \cdot s(a, z) + \sum_{z'} \lambda_{zz'}[v(a,z') - v(a, z)] \rbrace && \text{(HJB)}\cr
0 &= -\partial_a[s(a,z)  g(a,z)] + \sum_{z'} \left[\lambda_{z'z}  g(a,z') - \lambda_{zz'} g(a,z)\right] && \text{(KFE)} \cr
0 &= \int a  g(a,z)  \ da  dz - \bar{B} &&  \text{(Market Clearing)}
\end{align*}
$$


*Note*: **price** enters implicitly through $s(a, z)$ into the system. So in the market condition, $g(a,z)$ solved from the HJB + KFE, is actually $g(a, z; r)$. $\bar B$ on the other hand is just fixed and given.

### Algorithm

The algorithm idea is very simple: fix $r$, solve HJB to get $v$. Then solve KFE to get $g$. As noted, this gives us $g(\cdot, \cdot; r)$. So finally solvving the market clearing function:
$$
F(r, g(\cdot, \cdot; r)) = 0
$$
to get the right $r$ and corresponding $g$. This pipeline gives us the **steady state equilibrium** of the heterogeneous agent market.

The implicit/explicit update comes solving HJB and KFE. First, say we discretize $v$ and store it as vector, the HJB looks like (use ***upwinding***)
$$
\rho v_{ij} = u(c_{ij}) + \frac{v_{i+1,j} - v_{ij}}{\Delta a_{i+1}} \mathbb{I}^F_{ij} s_{ij} + \frac{v_{ij} - v_{i-1,j}}{\Delta a_i} \mathbb{I}^B_{ij} s_{ij} + \sum_{j' \neq j} \lambda_{jj'}[v_{ij'} - v_{ij}]
$$
In **Matrix form:**
$$
\rho v = u(v) + A(v)v\tag{FP}
$$
where $A = A_s(v) + A_z$ is sparse, with:

- $A_s$: tridiagonal (savings dynamics, depends on $v$ via **upwinding**)
- $A_z$: block structure (Poisson jumps, exogenous)

FP sort of look like a fixed-point. But naive iteration $v^{\ell+1} = \frac{1}{\rho}[u^\ell + A^\ell v^\ell]$ fails because $\frac{1}{\rho} > 1$ typically. So either we do

- Explicit Updating. With update rule:
    $$
    \begin{align*}
    & v^{\ell+1} = \Delta u^\ell + \left[\left(\frac{1}{\Delta} - \rho\right)I + A^\ell\right]\Delta v^\ell\cr
    \Leftrightarrow\ &  \frac{v^{\ell+1} - v^\ell}{\Delta} + \rho v^\ell = u^\ell + A^\ell v^\ell\tag{E2}
    \end{align*}
    $$
    Note: E2 can be interpreted as $-\partial_t v + \rho v = u + Av$.

- Implicit Updating:
    $$
    \begin{align*}
    & \frac{v^{\ell+1} - v^\ell}{\Delta} + \rho v^{\ell+1} = u^\ell + A^\ell v^{\ell+1}\cr
    \Leftrightarrow \ & v^{\ell+1} = \left[\left(\rho + \frac{1}{\Delta}\right)I - A^\ell\right]^{-1}\left(u^\ell + \frac{v^\ell}{\Delta}\right)
    \end{align*}
    $$

### Implicit vs Explicit?

For scalar ODE $\dot{y} = -\alpha y$, solution $y(t) = e^{-\alpha t}$:

|  Method  |                Approximation                 |                Behavior                |
| :------: | :------------------------------------------: | :------------------------------------: |
| Explicit |     $y(\Delta) \approx 1 - \alpha\Delta$     | Linear; diverges if $\alpha\Delta > 1$ |
| Implicit | $y(\Delta) \approx \frac{1}{1+\alpha\Delta}$ |       Hyperbolic; always stable        |

The implicit hyperbolic approximation remains bounded for any $\Delta$, while explicit can explode. So in practice, though explicit updates is slightly easier to implement, implicit updating is unconditionally stable, converges in ~10-50 iterations vs thousands for explicit.
