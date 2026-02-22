---
title: "Constant Growth Path in Neoclassical Economic Model"
date: 2026-02-07T13:47:06-06:00
draft: false
---

> All models are wrong, but some are useful. — George E. P. Box

And, some model would have particularly peculiar assumptions that makes them easy and handy.

### Motivation

The neoclassical growth model was designed to explain several facts observed in developed economies over long periods (the "Kaldor facts" from data from the U.S. (1900-2000)):

1. Output per capita grows at roughly constant rate
2. Capital-output, investment-output, and consumption-output ratios are roughly constant
3. Interest rates are roughly constant
4. Factor shares (capital vs labor income) are roughly constant

----

> ## Uzawa's Theorem
>
> Consider $(K_t, L_t, C_t, Y_t)_t$ governed by:
> $$
> \begin{align*}
> &\dot K_t = Y_t - \delta K_t - C_t && \text{ accounting formula}\cr
> & Y(t) = \tilde F(K(t), L(t), \tilde X(t)) && \text{CRS in $(K, L)$ production func.}
> \end{align*}
> $$
> Assume **constant growth rate** respectively in production, capital, labor and consumption:
> $$
> \frac{\dot Y}Y = g_Y,\frac{\dot K}K = g_K, \frac{\dot C}C = g_C, \frac{\dot L}L = n.
> $$
> Then, the above conditions (CRS + constant growth) implies
>
> 1. Balanced growth: $g_Y =g_c = g_K = g$
>
> 2. Labor augmenting technical change: exists CRS $F(K, XL)$ and $\dot X/X = g - n$ such that
>    $$
>    F(K, XL) = \tilde F(K, L, X).
>    $$

Proof sketch

- From $\dot{K} = g_K K$ and accounting: $(g_K + \delta)K = Y - C$
- This gives: $(g_K + \delta)K(0) = e^{(g_Y - g_K)t}Y(0) - e^{(g_C - g_K)t}C(0)$
- Differentiating w.r.t. $t$ and requiring this holds for all $t$ forces $g_Y = g_C = g_K$ This prove 1.
- For 2, write $e^{-g(t-\tau)}Y(t) = \tilde{F}[e^{-g(t-\tau)}K(t), e^{-n(t-\tau)}L(t), \tilde{X}(\tau)]$
- Using CRS and requiring this holds for all $\tau$ yields the labor-augmenting form with $X(t) = e^{(g-n)t}$

Note: here if we further assume (i) constant ratio $K_t/X_tL_t \equiv c$ and (ii) impose firm's zero-profit condition, we will get that price ($w$ or $r$) is also constant.

### What Preference Supports Constant Growth?

CRS + constant growth + constant factor ratio =>  constant interest rate and wage. Now further assume that labor is inelastically supplied, consider a representative households' problem:
$$
\begin{align*}
& \max_{C, K} \int e^{-\rho t}U(C_t)\, \text{d}t\cr
& s.t.\ \dot K_t = wL_t + rK_t - \delta K_t - C_t, \forall t.
\end{align*}
$$
The intertemporal optimal condition (the "Euler" condition) can be derived from the Hamiltonian optimal: 

Let $H(C, K, \lambda) = U(C) - \lambda \dot K$ and sub in the $\dot K = (\cdots)$:
$$
\begin{cases}
\dot \lambda  = \rho \lambda - H_K(C, K, \lambda)&\Rightarrow \dot \lambda = (\rho - r + \delta) \lambda\cr
H_C = 0 & \Rightarrow U'(C) = \lambda
\end{cases}\quad \Rightarrow \frac{U''(c) \dot c}{U'(c)} = \rho - r + \delta.
$$
One preference function that satisfies $\frac{U''(c) \dot c}{U'(c)} = const$ with $\dot c/c = g$ is the Constant Relative Risk Aversion (CRRA) utility, or isoelastic utility:
$$
U(C) = \frac1{1 - \sigma}C^{1 - \sigma}.
$$

### Scaling back to a steady-state neoclassical growth model

The growing representative household's problem, say, **fix $L_t = 1$:**
$$
\begin{align*}
& \max_{C, K} \int e^{-\rho t}U(C_t)\, \text{d}t\cr
& s.t.\ \dot K_t = wL_t + rK_t - \delta K_t - C_t, \forall t.
\end{align*}
$$
Normalize $c_t = C_t/X_t L_t = C_t/X_t$, similarly $k_t = K_t/X_t$. Take
$$
f(k_t) := F(K_t, X_tL_t)\circ K_t(k_t) = F(k_tX_t, X_tL_t)
$$
Take
$$
\tilde \rho = \rho - (1 - \delta)g_x.
$$
Then an *isomorphic* neoclassical growth model appears with steady state $(k^{ss}, c^{ss})$ corresponding to the OG model.
$$
\begin{align*}
& \max_{C, K} \int e^{-\tilde \rho t}U(c_t)\, \text{d}t\cr
& s.t.\ \dot k_t = f(k_t) - \delta k_t - c_t, \forall t.
\end{align*}
$$


