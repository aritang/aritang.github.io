---
title: "value maximizer's auto bidder"
date: 2023-11-08T23:36:48+08:00
draft: false
summary: Aggarwal (2019)'s WINE paper proposed a LP-based framework for modelling autobidder for value maximizers. But it does not capture value maximizing bidders with budget and ROI constraints.
tags: ["paper"]
---

[Gagan Aggarwal](https://dblp.org/pid/75/3847.html), [Ashwinkumar Badanidiyuru](https://dblp.org/pid/15/2638.html) and [Aranyak Mehta](https://dblp.org/pid/23/6337.html)'s [WINE 2019](https://dblp.org/db/conf/wine/wine2019.html#AggarwalBM19) paper **Autobidding with Constraints** proposed a new framework for modelling the online ads keyword search auction. The core is a pretty general LP optimization problem that capture the high-level constraint of the buyer (advertiser), based on the data known, solve an optimal ads assortment. Like the following:
$$
\begin{align}
\max &\ \sum_i x_iv_i\\
s.t. & \ \sum_i x_i\text{cpc}_i \le B_c  + \sum_i x_i w_{ic}\\
& x_i\in \{0, 1\}
\end{align}
$$
where $c$ is the index for the buyer, $i\in [m]$ is the index for the items. $B$ stands for budget (generally) and $w_{ic}$ and $v_i$ would correspond to weight and value in general.

This framework is "general". It can model budget-constrained optimizer who, as long as his budget is not exceeded, would like to maximize clicks, i.e. $\sum_i x_i$, then by taking $v_i = 1, B_c = \text{budget},w_i = 0$ we obtain the speical case of the above LP tailored for budget-constrained click-count optimizers:
$$
\begin{align}
\max &\ \sum_i x_i\\
s.t. & \ \sum_i x_i \le B_c \\
& x_i\in \{0, 1\}\text{ (or maybe } 0\le x_i\le 1)
\end{align}
$$
And for optimizer with a CPA (cost-per-acquisition) target, let $v_i = \text{cvr}_i$ (convergence rate) and $B = 0$, and take $w_i = T\text{cvr}_i$, the optimization program yields
$$
\begin{align}
\max &\ \sum_i \text{cvr}_i x_i\\
s.t. & \ \frac{\sum_i x_i\text{cpc}_i}{\sum_i x_i \text{cvr}_i} \le T \\
& x_i\in \{0, 1\}\text{ (or maybe } 0\le x_i\le 1)
\end{align}
$$
Cool. But what's for value-maximizer with budget and ROI (return-on-spend) constraint? Say, for some buyer (not necessarily unit-demand), given his valuation on each $i$'s clicks $v_i$, he would like to maximizer total value while subject to budget not being exceeded, and return-on-spend higher than certain threshold, like
$$
\begin{align}
\max &\ \sum_i v_i x_i\\
s.t. & \ \sum_i p_i \le B_c \\
& \tau_c \sum_ip_i\le \sum v_i x_i\\
& x_i\in \{0, 1\}\text{ (or maybe } 0\le x_i\le 1)
\end{align}
$$
The above framework doesn't capture this...right? But value maximizers with ROI are very common in real industry. Hmm, maybe we can do an auto-bidder on this?
