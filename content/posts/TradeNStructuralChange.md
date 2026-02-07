---
title: "Trade and Structural Change"
date: 2026-02-04T10:16:25-06:00
draft: false
---

### Motivation

**Paradox:** Standard productivity-based theories (see *[Supply Side Structural Change in Macroeconomics](/structuraltransform/)*) predict that **sectors with higher productivity growth should have declining employment shares**. This is counter-intuitive, and false in reality:

> Japan (1960-1990): Rapid manufacturing productivity growth → *increased* manufacturing GDP share

A lot of empirical evidence (common knowledge...) shows, countries with faster manufacturing TFP growth did *not* experience faster manufacturing employment decline. And cross-country data shows no negative correlation between manufacturing productivity and manufacturing employment. [Source pending]

So another solution is **Trade** — introduces a comparative advantage effect that can reverse the weird productivity-based prediction.

---

## Model

Countries: Home and Foreign (*). Each country has 1 unit of labor. Assume there are three sectors, which:

- Agriculture (A): Tradeable numeraire, endowment $y$ (no production)
- Manufacturing (M): Tradeable, productivity $X_M$ (Home), $X_M^{\star}$ (Foreign)
- Services (S): Non-tradeable, productivity $X_S$ (Home), $X_S^{\star}$ (Foreign)

Country's preference
$$
U = (C_A - \gamma_A)^\alpha \left[\beta_M(C_M - \gamma)^\theta + \beta_S C_S^\theta\right]^{(1-\alpha)/\theta}
$$
**Technology:** Linear in labor
$$
Y_M = X_M L_M, \quad Y_S = X_S L_S
$$
Budget constraint:
$$
C_A + p_M C_M + p_S C_S \leq y + w.
$$
Labor feasibility:
$$
L_M + L_S = 1, \quad L_M^{\star} + L_S^{\star} = 1.
$$

### Equilibrium Conditions

Firm optimality:
$$
p_S = \frac{w}{X_S}, \quad p_M = \frac{w}{X_M}
$$
**Free trade in M and A:**
$$
p_M = p_M^{\star} \implies \frac{w}{X_M} = \frac{w^{\star}}{X_M^{\star}}.
$$
**Market clearing:**

- Global: $C_M + C_M^{\star} = X_M L_M + X_M^{\star} L_M^{\star}$
- Local services: $C_S = X_S L_S$, $C_S^{\star} = X_S^{\star} L_S^{\star}$

### After some algebra:

At equilibrium, employment in manufacturing satisfies

$$
L_M = \frac{\frac{\alpha}{2}\left(1 - \frac{X_M^{\star}}{X_M}\right) + \frac{\gamma}{X_M} + \left(\frac{\beta_M}{\beta_S}\right)^\sigma \left(\frac{X_S}{X_M}\right)^{1-\sigma}}{1 + \left(\frac{\beta_M}{\beta_S}\right)^\sigma \left(\frac{X_S}{X_M}\right)^{1-\sigma}}\tag{$\star$}.
$$

-----

What's left is just to stare at $(\star)$

### Demand-driven case ($\gamma > 0$, $\sigma = 1$):

**Global productivity growth in M:** $\frac{\Delta X_M}{X_M} = \frac{\Delta X_M^{\star}}{X_M^{\star}} > 0$
$$\implies \Delta L_M < 0, \quad \Delta L_M^{\star} < 0$$

**National productivity growth in M:** $\frac{\Delta X_M}{X_M} > 0$, $\frac{\Delta X_M^{\star}}{X_M^{\star}} = 0$
$$\text{sign}[\Delta L_M] = \text{sign}\left[\frac{\alpha}{2} - \frac{\gamma}{X_M^{\star}}\right], \quad \Delta L_M^{\star} < 0$$

**Trade effect:** Comparative advantage can cause $\Delta L_M > 0$ despite productivity gains.

### Supply-driven case ($\gamma = 0$, $\sigma < 1$):

Similar ambiguity arises from competition between:
1. **Relative supply effect:** Higher $X_M$ reduces demand for M labor
2. **Trade effect:** Higher $X_M$ increases comparative advantage in M

Concluding, in other words

1. Productivity gains in manufacturing cause *global* decline in manufacturing employment
2. At the *national* level, trade effects can dominate, leading to *increased* manufacturing employment in countries with higher productivity growth
3. Resolves the Japan puzzle: High manufacturing productivity → comparative advantage → increased manufacturing share