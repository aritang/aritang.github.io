---
title: "Macro Lecture Notes | Wedge Accounting and Intersectoral Distortions"
date: 2026-02-25T10:08:57-06:00
draft: false
---

From the front line of macro class:

## Motivation

Most poor countries remain heavily agricultural yet exhibit low agricultural productivity relative to richer economies. The central question is: **what prevents reallocation of labor from agriculture to manufacturing?**

The class studied Russian industrialization (1880–1940) as a laboratory. Pre-1928: ~80% of labor in agriculture, yet agriculture accounts for less than 50% of value added. Post-1928 under Stalin: 30 percentage points of labor shift to manufacturing in 12 years, accompanied by famine and mass repression.

**Question:** Which distortions quantitatively drove (or impeded) structural transformation?

---

## Model

### Environment

Two sectors: Agriculture (A) and Manufacturing (M). One representative household. Time is discrete, infinite horizon. Each sector produces a distinct consumption good using capital and labor. Manufacturing output can also be invested.

### Household Problem

Households optimizes take prices as given $\{p_{M,t}, p_{A,t}, w_{M,t}, w_{A,t}, r_{M,t}, r_{A,t}\}$ and optimize over consumption and investment $\{C^A_t, C^M_t, K_{t+1}\}$:
$$
\begin{aligned}
& \max_{\{C^A_t, C^M_t, K_{t+1}\}_{t=0}^\infty} \sum_{t=0}^{\infty} \beta^t \frac{U(C^A_t, C^M_t)^{1-\rho} - 1}{1-\rho}\cr
& p_{M,t}C^M_t + p_{A,t}C^A_t + K_{t+1} = p_{M,t}Y^M_t + p_{A,t}Y^A_t + (1-\delta)K_t, \forall t.
\end{aligned}
$$

where the intratemporal aggregator is assumed to have the following parametric form:

$$
U(C^A, C^M) = \left[\sum_{i \in \{A,M\}} \eta_i^{1/\sigma}\left(C^i - \gamma_i\right)^{(\sigma-1)/\sigma}\right]^{\sigma/(\sigma-1)}
$$

**Parameters:** $\beta \in (0,1)$ discount factor; $\rho > 0$ intertemporal elasticity of substitution parameter; $\sigma > 0$ intratemporal elasticity of substitution between goods; $\gamma_i$ subsistence floors (Stone-Geary); $\eta_i$ expenditure weights.

### Firm Problems

Each sector $i \in \{A, M\}$ operates a Cobb-Douglas technology:

$$
Y^i_t = X^i_t (K^i_t)^{\alpha_i}(N^i_t)^{\beta_i}
$$

where $X^i_t$ is exogenous TFP, $\alpha_i + \beta_i \leq 1$.

**Firm $i$ problem:**
$$
\max_{K^i_t,\, N^i_t} \quad p_{i,t} X^i_t (K^i_t)^{\alpha_i}(N^i_t)^{\beta_i} - r_{i,t}K^i_t - w_{i,t}N^i_t
$$

### Feasibility

$$
N^M_t + N^A_t = \bar{N}, \quad K^M_t + K^A_t = K_t
$$

$$
C^M_t + I_t = Y^M_t, \quad C^A_t = Y^A_t, \quad K_{t+1} = (1-\delta)K_t + I_t
$$

-----

## CE and Wedge Accountig

Consider **Competitive equilibrium (CE):** sequences of allocations $\{C^A_t, C^M_t, K^i_t, N^i_t\}$ and prices $\{p_{i,t}, w_{i,t}, r_{i,t}\}$ such that (i) households maximize utility, (ii) firms maximize profits, (iii) all markets clear.

**First Welfare Theorem:** The undistorted CE is Pareto optimal. The optimality conditions in equilibrium satisfy:
$$
\frac{U_{C^M}}{U_{C^A}} \cdot \frac{F^M_N}{F^A_N} = 1, \qquad \frac{U_{C^M}}{U_{C^A}} \cdot \frac{F^M_K}{F^A_K} = 1, \qquad \beta \frac{U_{C^M}(t+1)}{U_{C^M}(t)}\left(1 + F^M_K(t+1) - \delta\right) = 1
$$

These are the benchmark efficiency conditions. Any deviation from unity signals a distortion. I will derive the first condition in detail below.

### Wedge Accounting

Take **any** observed allocation and price sequence — no assumption of competitive behavior required. Define wedges as the deviation from the efficiency conditions:

$$
1 + \tau^W_t \equiv \frac{U_{C^M}(t)}{U_{C^A}(t)} \cdot \frac{F^M_N(t)}{F^A_N(t)}
$$

$$
1 + \tau^R_t \equiv \frac{U_{C^M}(t)}{U_{C^A}(t)} \cdot \frac{F^M_K(t)}{F^A_K(t)}
$$

$$
1 + \tau^K_{t+1} \equiv \beta \frac{U_{C^M}(t+1)}{U_{C^M}(t)}\left(1 + F^M_K(t+1) - \delta\right)
$$

In the undistorted CE: $\tau^W = \tau^R = \tau^K = 0$. Any nonzero wedge represents an implicit tax on cross-sectoral reallocation.

-----

### Example: the $\tau^W$ wedge

First, let's see where the decomposition come from CE conditions. The condition $\frac{U_{C^M}}{U_{C^A}} \cdot \frac{F^M_N}{F^A_N} = 1$ chains three equilibrium conditions.
$$
\begin{aligned}
&\textbf{Household FOC:} & \frac{U_{C^M}}{U_{C^A}} &= \frac{p_{M,t}}{p_{A,t}} \\[10pt]
&\textbf{Firm FOC:} & p_{M,t} F^M_N &= w_{M,t}, \quad p_{A,t} F^A_N = w_{A,t} \\[10pt]
&\textbf{Labor clearing:} & w_{M,t} &= w_{A,t} \\[20pt]
&\textbf{Together:} & \frac{U_{C^M}}{U_{C^A}} \cdot \frac{F^M_N}{F^A_N} &= 
\underbrace{\frac{U_{C^M}/p_{M,t}}{U_{C^A}/p_{A,t}}}_{ =1 \ \text{(household FOC)}} \cdot
\underbrace{\frac{p_{M,t}F^M_N/w_{M,t}}{p_{A,t}F^A_N/w_{A,t}}}_{ =1 \ \text{(firm FOC)}} \cdot
\underbrace{\frac{w_{M,t}}{w_{A,t}}}_{ =1 \ \text{(labor clearing)}} = 1
\end{aligned}
$$

So, we have the following very natural decomposition of the labor $\tau^W$ wedge:
$$
1 + \tau^W_t = \underbrace{\frac{U_{C^M}/p_{M,t}}{U_{C^A}/p_{A,t}}}_{\text{consumption}} \cdot \underbrace{\frac{p_{M,t}F^M_N / w_{M,t}}{p_{A,t}F^A_N / w_{A,t}}}_{\text{production}} \cdot \underbrace{\frac{w_{M,t}}{w_{A,t}}}_{\text{mobility}}
$$

Each component equals 1 in the undistorted CE. When it deviates from 1, the corresponding parts fails:

- Consumption component $\frac{U_{C^M}/p_{M,t}}{U_{C^A}/p_{A,t}}\neq 1$: household MRS does not equal price ratio — rationing or nonefficient pricing.
- Production component $\frac{p_{M,t}F^M_N / w_{M,t}}{p_{A,t}F^A_N / w_{A,t}}\neq 1$: value of marginal product does not equal wage in at least one sector — signals monopoly markups or monopsony power.
- Mobility $w_M/w_A \neq 1$: wages differ across sectors — barriers to labor mobility (e.g., *obschina*, passport system).

Note: rationing is when the state administratively allocates goods to consumers at fixed prices rather than letting supply and demand determine quantities and prices.  *Obschina* (община) is the Russian peasant commune that owns land Tsarist Russia — a peasant who left his village forfeited his share of the communal land and its rents. The passport system is something post 1928 (you know).

Given data on $\{Y^i_t, K^i_t, N^i_t, p_{i,t}, w_{i,t}\}$ from historical sources and calibrated preference/technology parameters, we can directly computes $\{X^M_t, X^A_t, \tau^W_t, \tau^R_t, \tau^K_t\}$ from the wedge definitions.

---

## Findings from data

Note the **production component**:
$$
\text{production component} = \frac{p_{M,t}F^M_N/w_{M,t}}{p_{A,t}F^A_N/w_{A,t}} = \frac{\mu_{M,t}}{\mu_{A,t}}
$$
is the markup of value of marginal product over wage in sector $i$. In a competitive sector this equals 1. A monopolist sets $\mu > 1$ — paying workers less than their marginal revenue product.

---

### Tsarist Russia: 

Let $\mu_{i,t} \equiv p_{i,t}F^i_N/w_{i,t}$ so the **production component**:
$$
\text{production component} = \frac{p_{M,t}F^M_N/w_{M,t}}{p_{A,t}F^A_N/w_{A,t}} = \frac{\mu_{M,t}}{\mu_{A,t}}.
$$
In this time, manufacturing was dominated by cartels and monopolies ($\mu_{M,t} \gg 1$). while agriculture was more competitive with $\mu_{A,t} \approx 1$. Hence the production component $\gg 1$, creating a large $\tau^W$. Workers should have moved to manufacturing but the monopoly rents were not passed through to wages — so the wage signal that should have attracted workers was artificially suppressed.

### Stalin era: 

The state coerced enterprise managers to massively expand output and employment. This is somewhat equivalent to forcing $\mu_{M,t}$ down toward 1 — managers could no longer sustain monopoly markups when the state was demanding maximum production regardless. By 1940, $\mu_{M,t} \approx \mu_{A,t}$, so the production component $\approx 1$.

The decomposition confirms this:

$$\Delta \ln(\text{production component}) = \Delta \ln \mu_{M,t} - \Delta \ln \mu_{A,t}$$

88% of the drop came from $\mu_{M,t}$ falling — non-agricultural markups compressed — not from anything happening to agriculture. So structurally, Stalin's industrialization worked not by making workers more productive but by eliminating the monopoly wedge that had been keeping manufacturing artificially small. The mechanism was coercion rather than competition, which is why it came bundled with collapsing productivity and welfare elsewhere.

---

## Takeaways

The wedge accounting framework is a diagnostic metric. Any allocation can be represented as a CE with implicit taxes equal to the measured wedges. Tsarist Russia's failure to industrialize was primarily a monopoly distortion problem.

Our lecture also features when the paper tries to analyze post-1928 economy. Noting that the wedge accounting framework is built on a neoclassical competitive equilibrium as the benchmark. Post-1928 Soviet Russia violates virtually every assumption of that benchmark. Nevertheless, from the model, it is concluded that ***the Soviet solution eliminated that distortion, but through coercive means that simultaneously destroyed productivity and caused catastrophic human costs.*** The counterfactual — removing entry barriers while preserving market incentives — was the unexplored alternative.