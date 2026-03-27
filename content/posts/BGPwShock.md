---
title: "Macro Lecture Notes | Balanced Growth Path with Risk and Distortions"
date: 2026-03-04T18:49:26-05:00
draft: false
---

## Motivation

In the standard neoclassical model, three return measures coincide:
$$
R^{rf} = \mathbb{E}R^k_{t+1} = MPK.
$$
This is a strong and testable prediction. Empirically, all three diverge and move differently over time. The question is: **what drives the wedges?**

The answer: **risk** drives a wedge between $R^{rf}$ and $\mathbb{E}R^k$; **markups** drive a wedge between $\mathbb{E}R^k$ and $MPK$.

------

## Model

A representative household with CRRA preferences $\mathbb{E}_0\sum_t \beta^t \frac{C_t^{1-\sigma}}{1-\sigma}$, inelastic labor supply $\bar N$.

A continuum of monopolistically competitive firms with technology $y_{i,t} = k_{i,t}^\alpha (Z_t S_t n_{i,t})^{1-\alpha}$, aggregated by competitive final-good firms into
$$
Y_t = \left(\int (y_{i,t})^{\frac{\varepsilon-1}{\varepsilon}}\,\text di\right)^{\frac{\varepsilon}{\varepsilon-1}}.
$$
The intermediate firm faces the isoelastic demand curve implied by this aggregator, and profit maximization gives the constant markup $\mu = \varepsilon/(\varepsilon-1)$.

**Two exogenous processes:**

- Deterministic trend: $Z_{t+1} = (1+g)Z_t$
- Stochastic level: $S_{t+1} = S_t e^{\chi_{t+1}}$, with $\chi_t \overset{i.i.d.}{\sim} \mathcal{N}$, normalized so $\mathbb{E}e^{\chi_{t+1}} = 1$

**Capital accumulation** is hit by the same shock:
$$
K_{t+1} = \bigl((1-\delta)K_t + I_t\bigr)e^{\chi_{t+1}}.
$$
*Note*: Applying the same shock to both TFP and capital quality is the key tractability assumption — it keeps capital-output ratios constant on the BGP.

**Aggregated equilibrium** (6 equations in $\{C_t, Y_t, K_t, I_t, W_t, R_t\}$):

$$
Y_t = K_t^\alpha(Z_t S_t \bar N)^{1-\alpha}, \qquad C_t + I_t = Y_t, \qquad K_{t+1} = ((1-\delta)K_t+I_t)e^{\chi_{t+1}}\\
\mu W_t = (1-\alpha)\frac{Y_t}{\bar N}, \qquad \mu R_t = \alpha\frac{Y_t}{K_t}, \qquad C_t^{-\sigma} = \beta\,\mathbb{E}\!\left[(R_{t+1}+1-\delta)e^{\chi_{t+1}}C_{t+1}^{-\sigma}\right]
$$

Note: homogeneity for all firms provides $Y_t = y_{i, t}$ all the firm's feasibility constraints collapse into one $Y_t = K_t^\alpha(Z_t S_t \bar N)^{1-\alpha}$.

**Risky BGP:** All real variables scale as $X_t = Z_t S_t X^*$; the rental rate $R_t = R^*$ is constant. The stochastic fluctuations wash out in ratios.

---

## Three Return Measures

**SDF on the BGP:** $M_{t,t+1} = \beta(1+g)^{-\sigma}e^{-\sigma\chi_{t+1}}$.

Use the log-normal lemma: $\mathbb{E}e^{a\chi_{t+1}} = \exp\!\left(a(a-1)\frac{\vartheta^2}{2}\right)$.

**1. Risk-free rate** — the return on a bond paying 1 in every state:
$$R^{rf} = \frac{1}{\mathbb{E}[M_{t,t+1}]} = \frac{(1+g)^\sigma}{\beta}\exp\!\left(-\sigma(1+\sigma)\frac{\vartheta^2}{2}\right).$$

**2. Expected return on capital** — capital is risky because its payoff $R^k_{t+1} := (R^*+1-\delta)e^{\chi_{t+1}}$ is stochastic. From the Euler equation $1 = \mathbb{E}[M_{t,t+1}R^k_{t+1}]$:
$$\mathbb{E}R^k_{t+1} = \frac{(1+g)^\sigma}{\beta}\exp\!\left(\sigma(\sigma-1)\frac{\vartheta^2}{2}\right).$$

**3. Marginal product of capital** — capital income as measured in the data includes monopoly rents:
$$MPK := \frac{\Pi_t}{K_t} - \delta = \frac{\mu-1}{\alpha}R^* + \mathbb{E}R^k_{t+1}.$$

---

## The Two Wedges

$$R^{rf} \;\leq\; \mathbb{E}R^k_{t+1} \;\leq\; MPK$$

$$\frac{\mathbb{E}R^k_{t+1}}{R^{rf}} = \exp(\sigma\vartheta^2) > 1 \qquad \text{(risk premium: always positive, rises in } \vartheta^2\text{)}$$

$$MPK - \mathbb{E}R^k_{t+1} = \frac{\mu-1}{\alpha}R^* > 0 \qquad \text{(markup wedge: zero only if } \mu=1\text{)}$$

The risk premium exists because capital co-moves with consumption — it pays poorly precisely when consumption is already low, so investors demand compensation. The markup wedge exists because NIPA capital income includes monopoly rents, which are not a return to investment at the margin.
