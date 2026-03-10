---
title: "Macro Lecture Notes | The Real-Business-Cycle (RBC) Model"
date: 2026-03-02T18:08:10-05:00
draft: false
---

Finally! Let's talk about shocks.

## Motivation

U.S. per capita real GDP (in logs) exhibits a clear upward trend over the 20th century. The neoclassical growth model explains this trend well. However, GDP also fluctuates around this trend. The question is: **can the same neoclassical framework, driven solely by productivity shocks, also explain these cyclical fluctuations?**

To isolate cycles, we decompose log GDP into a trend component (extracted via the Hodgkin–Prescott filter or a band-pass filter) and a cyclical component (the residual). The cyclical component reveals the following **stylized facts** from U.S. quarterly data (1947–1995, HP-filtered):

- Output and TFP (the Solow residual) are highly correlated: $\text{corr}(y_t, z_t) \approx 0.8$.
- Output is more volatile than TFP.
- Investment is roughly 3× as volatile as output.
- Consumption of nondurables is roughly 0.5× as volatile as output.
- Total hours worked are roughly as volatile as output.
- Consumption, investment, and hours are all procyclical (positively correlated with output).

The RBC model (Kydland and Prescott, 1982) asks whether a competitive equilibrium of the neoclassical growth model, subject to stochastic TFP, can reproduce these regularities.

## Model Setup

**Time:** Discrete, $t = 0, 1, 2, \dots$, infinite horizon. 

The only source of **randomness** is $\{A_t\}_{t \geq 0}$ that follows

$$\ln A_t = \rho \ln A_{t-1} + \varepsilon_t, \quad \varepsilon_t \sim \text{i.i.d.}\; \mathcal{N}(0, \sigma_\varepsilon^2)$$

A r**epresentative firm** maximizes
$$
\max_{L_t} \; A_t K_t^\alpha L_t^{1-\alpha} - w_t L_t - r_t K_t.
$$
A **representative househol**d owns capital $K_t$ ($K_0$ given), supplies labor $L_t$, and chooses consumption $C_t$. The household solves ()
$$
\begin{aligned}
& \max_{\{C_t, L_t, K_{t+1}\}_{t \geq 0}} \; \mathbb{E}_0 \sum_{t=0}^{\infty} \beta^t \, U(C_t, L_t)\\
& \text{s.t.} \quad C_t + K_{t+1} = w_t L_t + r_t K_t + (1-\delta) K_t, \quad \forall\, t.\\
\end{aligned}
$$
$\alpha, \beta, \delta, \rho, \sigma_\varepsilon$ and the functional form of $U$ are fixed. It's a dynamic programming problem. At each time point, state variables are $(K_t, A_t)$ and decision variables are $C_t$, $L_t$, $K_{t+1}$.

## Equilibrium and Solution to the market

A competitive equilibrium is the sequences of states and price $\{C_t, L_t, K_{t+1}, w_t, r_t, Y_t\}$ such that (i) the household maximizes utility, (ii) the firm maximizes profit, and (iii) markets clear.

*Note*: It seems the model assumes **complete markets** (households can trade state-contingent claims), though with a representative agent this is without loss of generality.

**Key simplification:** By the First Welfare Theorem (complete markets, no externalities, no distortions), the competitive equilibrium is Pareto optimal. We can therefore solve the equivalent social planner's problem:
$$
\begin{aligned}
& \max_{\{C_t, L_t, K_{t+1}\}_{t \geq 0}} \; \mathbb{E}_0 \sum_{t=0}^{\infty} \beta^t \, U(C_t, L_t)\\
& \text{s.t.} \quad C_t + K_{t+1} = A_t K_t^\alpha L_t^{1-\alpha} + (1-\delta) K_t, \quad \forall\, t.\\
& K_0 \text{ given}.
\end{aligned}
$$

### Optimality Conditions

The Euler equation characterizes intertemporal tradeoff:

$$U_C(C_t, L_t) = \beta\, \mathbb{E}_t \Big[ U_C(C_{t+1}, L_{t+1}) \big(\alpha A_{t+1} K_{t+1}^{\alpha-1} L_{t+1}^{1-\alpha} + 1 - \delta \big) \Big].$$

The intratemporal optimality condition characterizes labor–consumption tradeoff:

$$-\frac{U_L(C_t, L_t)}{U_C(C_t, L_t)} = (1-\alpha)\, A_t K_t^\alpha L_t^{-\alpha}.$$

## Where does the shock go?

The stochastic process $\{A_t\}$ enters the model through a single channel: the production function. A positive realization of $\varepsilon_t$ raises $A_t$, which simultaneously increases the marginal product of both capital and labor. The household responds along three margins:

1. **Consumption vs. saving:** Higher $A_t$ raises income. Consumption smoothing (the Euler equation) implies part is consumed today and part is saved (invested), so $K_{t+1}$ rises. Because $A_t$ is persistent ($\rho > 0$), the incentive to invest is amplified.
2. **Labor supply:** Higher $A_t$ raises the wage, inducing substitution toward more labor today (intertemporal substitution of leisure). This amplifies the output response beyond the direct TFP effect.
3. **Investment volatility:** Since consumption is smoothed but output is not, the resource constraint $C_t + I_t = Y_t$ forces investment $I_t := K_{t+1} - (1-\delta)K_t$ to absorb most of the output fluctuation, making it far more volatile than output.

The **propagation mechanism** is capital accumulation: a transient TFP shock raises $K_{t+1}$, which elevates output in subsequent periods even after $A_t$ has partially reverted. This converts serially correlated but short-lived shocks into persistent output dynamics.

> One argument is that, because the equilibrium is Pareto efficient, the model implies business cycle fluctuations are the **optimal response** to real shocks — there is no role for stabilization policy.
