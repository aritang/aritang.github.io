---
title: "Macro Lecture Note | Stochastic Economies and Basic Asset Pricing"
date: 2026-03-03T18:39:28-05:00
draft: false
---

## Motivation

We want a unified framework to answer two questions in a *stochastic* economy:

1. **How do agents price any asset** (bonds, stocks, firms)?
2. **What objective function should a firm maximize?**

The key insight: under complete markets, Arrow-Debreu prices pin down a unique **stochastic discount factor (SDF)**, which prices every asset via a single formula. In a representative-agent economy, completeness imposes no additional restrictions on allocations (zero net supply clears trivially), but it gives us clean pricing machinery.

## Stochastic Environment

**Primitives.** Time is discrete, $t = 0, 1, 2, \ldots$ A random variable $s_t$ (the "state") summarizes all exogenous shocks at date $t$. The initial state $s_0$ is known.

**Histories.** A history of shocks through date $t$ is the tuple

$$s^t = (s_0, s_1, \ldots, s_t).$$

We write $s^{t+1} \geq s^t$ to mean that $s^t$ is a prefix of $s^{t+1}$ (i.e., the first $t+1$ entries of $s^{t+1}$ coincide with $s^t$).

**Probabilities.** Let $\Pr(s^t)$ denote the unconditional probability of history $s^t$. Conditional probabilities are

$$\Pr(s^{t+1} | s^t) = \frac{\Pr(s^{t+1})}{\Pr(s^t)} \quad \text{if } s^{t+1} \geq s^t, \qquad \Pr(s^{t+1} | s^t) = 0 \quad \text{otherwise}.$$

### Complete Markets Assumption

**Assumption (Complete Markets).** There exist enough securities (in zero net supply) to span every possible realization of shocks.

This means: for any contingent payoff profile across states, there exists a portfolio of traded securities that replicates it exactly.

-----

## Notations:

Write as $e_i(s_t)$ the endowment of consumer $i$ when current shock is $s_t$, which is exogenous (aka fixed given $s_t$). Write as $c_{i,t}(s^t)$ the consumption of $i$ in history $s^t$ — though it's technically a choice variable, it is pinned down given $s^t$ and price. Further:

| Symbol                 | Description                                                  | Determined by      |
| ---------------------- | ------------------------------------------------------------ | ------------------ |
| $e_i(s_t)$             | Endowment of consumer $i$ when current shock is $s_t$        | Fixed (exogenous)  |
| $c_{i,t}(s^t)$         | Consumption of agent $i$ in history $s^t$                    | Choice variable    |
| $B_i^{AD}(s^t)$        | Agent $i$'s holding of Arrow-Debreu security for history $s^t$ | Choice variable    |
| $B_{i,t}(s^{t+1})$     | Agent $i$'s holding of Arrow security for $s^{t+1}$, purchased in $s^t$ | Choice variable    |
| $Q^{AD}(s^t)$          | Price of an Arrow-Debreu security paying \$1 in $s^t$        | Equilibrium object |
| $Q_t(s^{t+1}\mid s^t)$ | Price of an Arrow security paying 1usd in $s^{t+1}$, traded in $s^t$ | Equilibrium object |

---

## Two Market Structures

We consider two equivalent formulations of complete markets. They differ in **when** securities are traded, not in the set of achievable allocations.

### Arrow-Debreu (A-D) Securities

**Definition.** An Arrow-Debreu security $B^{AD}(s^t)$ is a claim that pays **1 if and only if history $s^t$ is realized**, and 0 otherwise. One such security exists for every possible history $s^t$, $t \geq 1$.

**Trading protocol:** All A-D securities are traded **once**, at date 0, at prices $Q^{AD}(s^t)$. After the portfolio is chosen, no further trading occurs; consumption is determined by endowments plus security payoffs.

**Consumer $i$'s problem (A-D):**
$$
\begin{aligned}
& \max_{\{c_{i,t}(s^t)\}} \quad \sum_{t=0}^{\infty} \sum_{s^t} \beta^t \Pr(s^t)\, U_i\!\bigl(c_{i,t}(s^t)\bigr)\\
& \text{s.t.} \quad c_{i, t}(s^t) \le B^{AD}_i(s^t) + e_i(s_t), \forall t\ge 0, s^t.\\
& \qquad \sum_{t=1}^{\infty} \sum_{s^t} Q^{AD}(s^t)B^{AD}_i(s^t) \leq 0.
\end{aligned}
$$
We would normalize $Q^{AD}(s^0) = 1$.

Market clearing (zero net supply):
$$
\sum_{i=1}^{I} B_{i,t}^{AD}(s^t) = 0 \quad \text{for all } s^t.
$$

### Arrow Securities

**Definition.** An Arrow security $B_t(s^{t+1})$ is a claim, traded in history $s^t$, that pays **\$1 if and only if tomorrow's history is $s^{t+1} \geq s^t$**, and \$0 otherwise. One such security exists for every successor history.

**Consumer $i$'s problem (Arrow):**
$$
\begin{aligned}
& \max_{\{c_{i,t}(s^t),\, B_{i,t}(s^{t+1})\}} \quad \sum_{t=0}^{\infty} \sum_{s^t} \beta^t \Pr(s^t)\, U_i\!\bigl(c_{i,t}(s^t)\bigr)\\
& \text{s.t.} \quad c_{i,t}(s^t) + \sum_{s^{t+1} \geq s^t} Q_t(s^{t+1}|s^t)\, B_{i,t}(s^{t+1}) \leq e_i(s_t) + B_{i,t-1}(s^t) \quad \forall s^t.
\end{aligned}
$$
**Market clearing:**

$$\sum_{i=1}^{I} B_{i,t-1}(s^t) = 0 \quad \text{for all } s^t.$$

----

## Equilibrium Prices

The FOC of the A-D problem (with normalization $Q^{AD}(s^0)=1$) gives, for any consumer $i$:

$$Q^{AD}(s^t) = \beta^t \Pr(s^t) \frac{U_{i,c}(s^t)}{U_{i,c}(s_0)}.$$

Note here $U_{i,c}(s^t) \equiv U_i'\!\bigl(c_{i,t}(s^t)\bigr)$. We assume $c_{i, t}(s^t)$ is fixed conditional on $s^t$ realized, which can be obtained from the FOC.

### Arrow Prices

The Euler equation from the sequential Arrow problem gives:

$$Q_t(s^{t+1}|s^t) = \beta\, \Pr(s^{t+1}|s^t) \frac{U_{c,i}(s^{t+1})}{U_{c,i}(s^t)} \quad \text{for all } i.$$

### Equivalence

The A-D price of any history decomposes as the product of one-step Arrow prices along that history:

$$Q^{AD}(s^t) = Q_0(s^1|s^0) \times Q_1(s^2|s^1) \times \cdots \times Q_{t-1}(s^t|s^{t-1}).$$

---

## The Stochastic Discount Factor (SDF)

> **Definition.** The stochastic discount factor between dates $t$ and $t+k$ is
> $$
> M_{t,t+k}(s^{t + l}) := \frac{\beta^k\, U_c(c_{t+k}(s^{t + k}))}{U_c(c_t(s^t))}.
> $$

Note it satisfies the recursion $M_{t,t+k} = M_{t,t+1} \cdot M_{t+1,t+k}$.

---

## Asset Pricing

The central pricing principle under the representative agent complete market assumption: any asset's price equals **the expected discounted value of its payoffs under the SDF**. Below, all expectations $\mathbb{E}_t[\cdot]$ are conditional on history $s^t$.

### One-Period Risk-Free Bond

A bond purchased in $s^t$ that pays \$1 in every $s^{t+1} \geq s^t$. Its price equals the sum of Arrow prices over all continuations:

$$Q_t^{rf} = \sum_{s^{t+1}\geq s^t} Q_t(s^{t+1}|s^t) = \mathbb{E}_t\!\left[\beta \frac{U_{c,t+1}}{U_{c,t}}\right] = \mathbb{E}_t[M_{t,t+1}].$$

The one-period risk-free gross interest rate is $R_t^{rf} = 1 / Q_t^{rf}$.

### Two-Period Risk-Free Bond

A bond purchased in $s^t$ that pays \$1 in every $s^{t+2} \geq s^t$. Replicate by backward induction using Arrow securities:

$$Q_t^{rf,2} = \sum_{s^{t+2}\geq s^t} \Pr(s^{t+2}|s^t) \frac{\beta^2 U_c(s^{t+2})}{U_c(s^t)} = \mathbb{E}_t[M_{t,t+2}] = \mathbb{E}_t\!\left[\frac{\beta^2 U_{c,t+2}}{U_{c,t}}\right].$$

### Stock (Equity Claim on a Dividend Stream)

A firm pays stochastic dividends $\{D_t(s^t)\}$. Its **ex-dividend** price at $s^t$ is:

$$P_t = \mathbb{E}_t\!\left[\sum_{k=1}^{\infty} M_{t,t+k}\, D_{t+k}\right].$$

Equivalently, in recursive form:

$$P_t = \mathbb{E}_t\!\bigl[M_{t,t+1}(P_{t+1} + D_{t+1})\bigr].$$

Defining the gross return $R_{t+1} := (P_{t+1} + D_{t+1})/P_t$, this becomes the **fundamental asset pricing equation**, which must hold for any traded asset under no-arbitrage:

$$1 = \mathbb{E}_t[M_{t,t+1}\, R_{t+1}].$$

---

## Value of the Firm

Using a no-arbitrage argument, one can show that under **complete markets**, because all consumers value dividend streams identically using the same A-D prices, the firm's objective is unambiguous:
$$
\begin{aligned}
& \max_{\{D_t(s^t)\}} \quad \sum_{t=0}^{\infty} \sum_{s^t} Q^{AD}(s^t)\, D_t(s^t)\\
& \text{s.t. technological/resource constraints on } D.
\end{aligned}
$$
**firms maximize the present discounted value of dividends, using Arrow-Debreu prices as discount factors.**
