---
title: "Supply Side Structural Change in Macroeconomics"
date: 2026-02-05T10:16:52-06:00
draft: false
---

### Motivation

Baumol (1967): Differential productivity growth across sectors drives "uneven growth" and structural transformation. As sectors experience different rates of technological progress, this causes relative prices to change and labor to reallocate. 

Question: Can this supply-side mechanism generate structural change while maintaining balanced growth (Kaldor facts)?

------

## Model

Household utility:
$$
\begin{align*}
&  \int_0^\infty \exp(-\rho t) \frac{c(t)^{1-\theta} - 1}{1-\theta} dt\cr
&s.t. \ \dot K(t) = r(t)K(t) - w(t)\bar L -\sum_{i \in \lbrace A, M, S\rbrace}p^iC^i(t) \ 
\cr
& \text{where, }c(t) = \left(\sum_{i \in \{A,S,M\}} \eta^i C^i(t)^{(\sigma-1)/\sigma}\right)^{\sigma/(\sigma-1)}.
\end{align*}
$$
Note that $\sigma$ represents elasticity of substitution (constant across sectors)

### Technology

For each sector $i$, production is given by the following Cobb-Douglas form. Sector-specific productivity growth rates $g^i$ differ across $i \in \{A,M,S\}$:
$$
\begin{align*}
& Y^i(t) = X^i(t) K^i(t)^\alpha L^i(t)^{1-\alpha},\cr
& {\dot X^i} = g_i{X^i}
\end{align*}
$$
We also assume inelastic labor $\bar{L}$; manufacturing produces capital.

### Market Clearing

For agriculture and service all outputs are consumed. Manufacturing output is split between consumption and investment:
$$
\begin{align*}
& Y^A = C^A, Y^S=C^S\cr
& Y^M = C^M + \dot K + \delta K.
\end{align*}
$$

## Solution

- Intratemporal Optimality
  $$
  \frac{c^i}{c^j} = \left(\frac{\eta^i}{\eta^j}\right)^\sigma \left(\frac{p^i}{p^j}\right)^{-\sigma}.
  $$

- Because all sectors has the same production technology (Cobb-Douglas with identical $\alpha$) and face the same factor prices ($r, w$) in competitive markets, capital-labor ratios equals across sectors. From sectors' FOCs:
  $$
  K^i(t)/L^i(t) = k(t), \forall i.
  $$
  And relative prices reflect relative productivity:
  $$
  \frac{p^i(t)}{p^j(t)} = \frac{X^j(t)}{X^i(t)}.
  $$

- Similarly, from firm's FOC, **labor allocation** satisfies:
  $$
  \frac{L^i(t)}{L^j(t)} = \left(\frac{\eta^i}{\eta^j}\right)^\sigma \left(\frac{X^j(t)}{X^i(t)}\right)^{1-\sigma}
  $$
  So, labor growth rate:
  $$
  \frac{\dot{L}^i(t)}{L^i(t)} - \frac{\dot{L}^j(t)}{L^j(t)} = (1-\sigma)(g^j - g^i).
  $$

### The above implies some weird counter-intuitive facts:

When $\sigma < 1$ (inelastic demand):
- Faster productivity growth → prices fall
- But expenditure shares *increase* (inelastic demand)
- Labor flows *away from* productive sectors
- **Asymptotically**: All labor concentrates in the most stagnant sector

------

Last and least,

## Balanced Growth Path

From $\dot{K} = X^M K^\alpha \bar{L}^{1-\alpha} - \delta K - \sum_i p^i c^i$, the Euler Equation implies
$$
\frac{\partial_t(\sum_i p^i c^i)}{\sum_i p^i c^i} - (1-\theta)\frac{\dot{c}}{c} = \alpha X^M K^{\alpha-1}\bar{L}^{1-\alpha} - \delta - \rho
$$
This implies $\theta = 1$ (log utility) is necessary and sufficient for the model to replicate Kaldor facts (constant $K/Y$, constant growth) with uneven sectoral growth.

### Empirical Evidence

Baumol et al. (1985) documents for US (1947-76):
- Stagnant sectors: 0.64% productivity growth, 27.6% → 41.2% employment share
- Progressive sectors: 2.94% productivity growth, employment share relatively stable
- Confirms $\sigma < 1$: labor flows toward low-productivity sectors

......Fine