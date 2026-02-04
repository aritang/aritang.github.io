---
title: "Does supply side or demand side structural change drive growth?"
date: 2026-01-30T10:00:08-06:00
draft: false
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

### Note on consumer's homothetic/nonhomothetic preferences:

Intuitively, we expect people's consumption ratio on different sectors shifts as their income increases — eg the percentage spent on basic food decreases while luxury good consumption increases as income goes up. Concretely, consider a household's (simplified) problem in the following form
$$
\max_{\lbrace c_t\rbrace_{t\in \N}}\sum_{t\in [\N]}\beta^t U(\vec c_t)\quad s.t. \sum_{i}p_{ti}c_{ti}\le B_t, \forall t.
$$
(Note: formally, we write the budget constraint to include capital/investment decisions... but thats another story)
$$
K_{t+1} + \sum_{i=1}^{I} p_{it}C_{it} \leq w_t + (R_t + 1 - \delta)K_t, \forall t.
$$
One can show that, fix $B_t\equiv 1$ let the optimal solution be $ \vec c^\star_t$. If $U(\cdot)$ is homothetic, for any $B_t$, the optimal solution would just be $B_t \vec c_t^\star$. How bubbly an assumption!

A non-homothetic *Stone-Geary* Utility Function doesn't solve the problem either: it's defined by fix constants $ \sum_i \alpha_i = 0$ and $\bar C_i > 0, \forall $i
$$
U(\vec c) = \prod_i (c_i - \bar C_i)^{\alpha_i} \qquad \text{(Stone-Geary)}
$$
Squint your eyes" S-G utility function is close to homothetic as all $c_i$ goes large. Therefore, as income -> infinity, it converge to show property of homothetic preference function where **expenditure share** becomes constant. (Why I'm not surprised). (Detail: take log (so the utility function is $\sum_i \alpha \log(c_i - \bar C_i)$ and easy to take derivative), solve the standard consumer's intratemperal problem, you will see that optimal expenditure share:
$$
\frac{p_i c_i^\star}{B} = \frac{p_i \bar C_i}{B} + \alpha_i(1 - \frac{\sum_i p_i \bar C_i}{B}) \xrightarrow{B\to \infty}\alpha_i.
$$
CLM21' proposed using **Nonhomothetic CES** utility function. Consider $U(\vec C)$ defined as the following:
$$
U(\vec C) := \lbrace U: \sum_{i=1}^{I} \Upsilon_i^{1/\sigma} \left( \frac{C_i}{g(U)^{\varepsilon_i}} \right)^{\frac{\sigma-1}{\sigma}} = 1\rbrace\tag{NH-CES}
$$

where $\sigma \in (0,1) \cup (1,\infty)$, $\varepsilon_i > 0$, $\Upsilon_i > 0$ are fixed constants. $g(\cdot)$ is positive & increasing. And household's utility function is implicitly defined, as follows:


$$
\begin{align}
\max_{\lbrace C_t\rbrace} & \sum_{t=0}^{\infty} \beta^t \frac{U(C_t)^{1 - \theta} - 1}{1 - \theta} \\
s.t. & \  \sum_{i = 1}^I p_{it}C_{it} \le B_t.
\end{align}
$$

Let $\tilde U(\vec C) = \frac{U(\vec C)^{1 - \theta} - 1}{1 - \theta}$ where $U(\vec C)$ is given by (NH-CES). By implicit function theorem, we will have, after a lot of algebra:
$$
\frac{\partial_{C_i}\tilde U}{\partial_{C_j}\tilde U} = (\frac{\Upsilon_i}{\Upsilon_j})^{1/\sigma}(\frac{C_j}{C_i})^{1/\sigma}g(U)^{\frac{(\sigma - 1)}{\sigma}(\epsilon_j - \epsilon_i)}.
$$
First-order condition from consumer's intratemperal optimization ($\frac{\partial_{C_i}\tilde U}{\partial_{C_j}\tilde U}(\vec C) = \frac{p_{i}}{p_{j}}$) gives:
$$
\frac{C_i}{C_j} =\frac{\Upsilon_i}{\Upsilon_j}(\frac{p_j}{p_i})^\sigma g(U)^{(\sigma -1)(\epsilon_i - \epsilon_j)}.
$$
Fix $p_j/p_i$, as $B\to \infty$, $U\to \infty$ (?) and $g(U)\to \infty$ so $C_i/C_j$ will be changing unless $\epsilon_i = \epsilon_j$ or that $g(U)$ converge. Differentiate with respect to $\log g(U)$:
$$
\frac{\partial \log(C_i/C_j)}{\partial \log g(U)} = (\sigma-1)(\varepsilon_i - \varepsilon_j).
$$
This is **constant** in $U$. It doesn't decay.

