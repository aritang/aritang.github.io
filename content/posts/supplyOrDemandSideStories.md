---
title: "Does supply side or demand side structural change drive growth?"
date: 2026-01-30T10:00:08-06:00
draft: true
---

Our macroeconomic class introduced and discussed this paper, in the middle of a series of discussion on growth studied under the framework of neoclassical growth model. 

Standard approaches to structural change (the shift from agriculture to manufacturing to services as economies develop) have relied on two main mechanisms:

1. **Supply-side stories**: Differential productivity growth across sectors changes relative prices, causing reallocation
2. **Demand-side stories** (Stone-Geary preferences): As income rises, people shift spending toward "luxury" sectors

Both mechanism's intuition feels right. But the demand-side's *Stone-Geary preferences* have income effects that vanish as income grows. It becomes negligible for rich countries. This is empirically problematic—we observe strong income effects on sectoral composition even at high income levels. So, when the theory tells you one thing but the reality tells you another we need a better model to solve the problem:

> ### Structural change with long-run income and price effects
>
> Comin, Lashkari and Mestieri, Econometrica 2021
>
> *ABSTRACT* We present a new multi-sector growth model that features **nonhomothetic, constant elasticity of substitution preferences**, and accommodates long-run demand and supply drivers of structural change for an arbitrary number of sectors. The model is consistent with the decline in agriculture, the hump-shaped evolution of manufacturing, and the rise of services over time. We estimate the demand system derived from the model using household-level data from the United States and India, as well as historical aggregate-level panel data for 39 countries during the postwar period. The estimated model parsimoniously accounts for the broad patterns of sectoral reallocation observed among rich, miracle, and developing economies. Our estimates support the presence of strong nonhomotheticity across time, income levels, and countries. We find that income effects account for the bulk of the within-country evolution of sectoral reallocation.

## Just another (really comprehensive) neoclassical growth model

### Preferences: Nonhomothetic CES for unit period:

$$
F(C) := \lbrace \sum_{i=1}^{I} \Upsilon_i^{1/\sigma} \left( \frac{C_i}{g(U)^{\varepsilon_i}} \right)^{\frac{\sigma-1}{\sigma}} = 1\rbrace
$$

- $\sigma \in (0,1) \cup (1,\infty)$: elasticity of substitution
- $\varepsilon_i > 0$: nonhomotheticity parameter (governs income elasticity)
- $\Upsilon_i > 0$: taste shifters
- $g(\cdot)$: positive, monotonically increasing

**Key property:** Income effects don't vanish as $U \to \infty$:
$$
\frac{\partial \log(C_i/C_j)}{\partial \log g(U)} = (1-\sigma)(\varepsilon_i - \varepsilon_j).
$$

### Household problem:

$$
\begin{align}
\max_{\{C_t, A_{t+1}\}_{t=0}^{\infty}} & \sum_{t=0}^{\infty} \beta^t \frac{F(C_t)^{1 - \theta} - 1}{1 - \theta} \\
\text{s.t.}&\  K_{t+1} + \sum_{i=1}^{I} p_{it}C_{it} \leq w_t + (R_t + 1 - \delta)K_t.
\end{align}
$$

(Note: the paper uses $A_t = K_t$ (asset=capital). The no arbitrage condition ($1 + r_t = R_t + 1 - \delta$) + market clearing gives equivalence. I like it this way, one less notation)

### Firm's problem

Sector $i \in \{0, 1, \ldots, I\}$, perfect competition, sector 0 produces investment goods:
$$
\begin{align}
&\max_{K_{it}, L_{it}} \; p_{it} A_{it} K_{it}^{\alpha_i} L_{it}^{1-\alpha_i} - R_t K_{it} - w_t L_{it}, \forall i.
\end{align}
$$
Productivity $\lbrace A_{it}\rbrace_{i, t}$ is exogenous:
$$
A_{it+1} = (1+\gamma_i)A_{it}, \forall i, t.
$$

### Market clearing:

$$
\sum_{i=0}^{I} K_{it} = K_t, \quad \sum_{i=0}^{I} L_{it} = 1.
$$

