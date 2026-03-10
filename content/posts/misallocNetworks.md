---
title: "Macro Lecture Notes | Total Production Networks, plus Distortions"
date: 2026-03-01T15:03:44-06:00
draft: false
---

[Lecture 9](/posts/misallocationwithinsectorsmonopolisticcompetition/) measures misallocation but under a simple market structure (intermediate firms -> final firms -> production). Baqaee and Farhi (2020) extended the analysis to arbitrary production network. With general CRS technology assumption, one can decompose GDP growth into contributions from technology, factor accumulation, and misallocation—all using observable data.

----

## Environment

### Primitives

There are three classes of agents:

- **$N$ producers** (firms), indexed $i = 1, \dots, N$.
- **$F$ primary factors**, indexed $f = 1, \dots, F$, supplied inelastically in quantities $\bar{L}_f > 0$ (exogenous).
- A **representative consumer** and a **final good sector**.

The exogenous objects are: productivities $\{A_i\}_{i=1}^N$, factor endowments $\{\bar{L}_f\}_{f=1}^F$, and functional forms $\{F_i\}_{i=1}^N$, $\mathcal{D}$.

### Firm $i$'s Problem

Each firm $i$ is competitive and chooses output $y_i$ and inputs $\{x_{ij}\}_{j=1}^{N+F}$ (where $j = 1,\dots,N$ indexes intermediate goods and $j = N+1,\dots,N+F$ indexes factors). Technology is CRS and Hicks-neutral:

$$
\begin{aligned}
&\max_{y_i,\, \{x_{ij}\}} \quad p_i y_i - \sum_{j=1}^{N} p_j x_{ij} - \sum_{f=1}^{F} w_f x_{if}\\
& \text{s.t.} \quad y_i = A_i F_i\!\left(\{x_{ij}\}_{j=1}^{N+F}\right)\\
& \qquad \text{$F_i$ is CRS.}
\end{aligned}
$$

*Note*: decreasing returns to scale can be embedded in to a CRS production function via adding an additional fictitous firm-specific factors. But I still find CRS to be quite restrictive an assumption.

### Final Good Sector

A competitive final good sector aggregates firm outputs into GDP $Y$:

$$
\max_{\{c_j\}_{j=1}^N} \quad \mathcal{D}(c_1, \dots, c_N) - \sum_{j=1}^{N} p_j c_j
$$

where $\mathcal{D}$ is CRS. Zero profit implies $Y = \mathcal{D}(c_1, \dots, c_N)$.

### A Representative Consumer

The representative consumer receives all factor income and chooses consumption $C$:

$$
\max_C \quad U(C) \quad \text{s.t.} \quad C = \sum_{f=1}^{F} w_f \bar{L}_f = Y
$$

---

## Hulten's Theorem for CE

A CE is allocations $\bigl\{C, Y, \{c_i, y_i\}_{i=1}^N, \{x_{ij}\}_{i,j}\bigr\}$ and prices $\{p_i\}_{i=1}^N$, $\{w_f\}_{f=1}^F$ such that:

1. All agents optimize.
2. Markets clear:

$$
C = Y, \qquad y_i = c_i + \sum_{j=1}^{N} x_{ji} \;\;\forall\, i, \qquad \bar{L}_f = \sum_{j=1}^{N} x_{jf} \;\;\forall\, f.
$$

*Note on CE*: 

- since all production functions and $\mathcal{D}$ are CRS and firms are competitive, **all firms earn zero profit**: $\pi_i = 0$ for all $i$, and $\Pi = 0$.
- The CE solves the social planner's problem (first welfare theorem applies).

Let $\eta_f = \frac{w_f \bar{L}_f}{Y}$ be factor $f$'s share in GDP. Let $\lambda_i = \frac{p_i y_i}{Y}$ be firm $i$'s sales share (the *Domar weight* of firm $i$)

> **Theorem (Hulten).** *In the competitive network economy:*
>$$
> \frac{\partial \ln Y}{\partial \ln A_k} = \lambda_k, \qquad \frac{\partial \ln Y}{\partial \ln \bar{L}_f} = \eta_f.
> $$
> 

This yields the first-order GDP decomposition that allows us to run regression
$$
d \ln Y = \underbrace{\lambda'(d \ln A)}_{\text{Solow residual}} + \eta'(d \ln \bar{L}).
$$

-----

## Distorted Network Economy

Now allow **arbitrary distortions** (markups, taxes, wedges). Firm $i$ charges markup $\mu_i$ over marginal cost. Then revenue ≠ cost. And revenue-based and cost-based shares diverge. 
$$
\mu_i = \frac{p_i y_i}{\sum_{k=1}^{N+F} p_k x_{ik}} \geq 1.
$$
Define cost-based counterparts of $\lambda_k$ and $\eta_f$:
$$
\tilde{\lambda}_i = \frac{\sum_k p_k x_{ik}}{Y}, \qquad \tilde{\eta}_f = \frac{\text{(cost-based factor share)}}{Y}.
$$

Note: In the efficient economy ($\mu_i = 1$ for all $i$), $\tilde{\lambda} = \lambda$, $\tilde{\eta} = \eta$, $\tilde{\Omega} = \Omega$.

> **Theorem (Baqaee-Farhi).** *In the distorted network economy:*
> $$
> \frac{\partial \ln Y}{\partial \ln A_k} = \tilde{\lambda}_k - \tilde{\eta}' \frac{\partial \ln \eta}{\partial \ln A_k}
> $$
>
> $$
> \frac{\partial \ln Y}{\partial \ln \bar{L}_f} = \tilde{\eta}_f
> $$
>
> $$
> \frac{\partial \ln Y}{\partial \ln \mu_k} = -\tilde{\lambda}_k - \tilde{\eta}' \frac{\partial \ln \eta}{\partial \ln \mu_k}
> $$
>

Essentially, the GDP growth decomposition becomes:
$$
\Delta \ln Y = \underbrace{\tilde{\lambda}'(\Delta \ln A)}_{\text{technology}} + \underbrace{\tilde{\eta}'(\Delta \ln \bar{L})}_{\text{factor supply}} + \underbrace{-\tilde{\lambda}'(\Delta \ln \mu) - \tilde{\eta}'(\Delta \ln \eta)}_{\text{misallocation}}.
$$

Since ($\tilde{\lambda}$, $\tilde{\eta}$, $\mu$) are constructible from cost and revenue data, we can measure how much what contributes to what.

----

## Empirical Application (U.S., 1996–2014)

**Two stylized facts:**

1. The labor share has declined across developed economies since the mid-1990s.
2. Average markups have risen substantially (from ~1.2 to ~1.6, per De Loecker, Eeckhout, and Unger 2019).

**Key finding from the decomposition:** The rise in average markups is driven almost entirely by a **between-firm** reallocation effect—resources shifted toward high-markup firms—not by within-firm markup increases.

**Implication for TFP.** Roughly half of measured TFP growth over this period reflects improved allocative efficiency. High-markup firms (e.g., Amazon) were underproducing relative to the social optimum; their expansion at the expense of high-marginal-cost competitors **reduced** aggregate misallocation, boosting measured TFP even absent technological change.
