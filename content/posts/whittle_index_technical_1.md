---
title: "Whittle index | an example"
date: 2024-06-07T12:29:06+08:00
draft: false
---

Consider the following RMAB problem instance. (For a review of what is an RMAB, check out [here](/posts/whittle_index/)). A platform coordinates a total of $N$ volunteers for various tasks.

At each time point, a task $k$ out of $K$ possible tasks arrives randomly with probability $f_k$, and the platform must decide whom to notify (activate) based on the likelihood of acceptance $p_{k, i}, i\in [N]$ and the potential reward for each volunteer incentivized, exogeneously given as $w_k$. 

Each volunteer can either be active or inactive at a certain time point. Only active volunteers can generate reward when incentivized (aka there's no use in incentivizing an inactive volunteer). Once an active volunteer produces, she instantly becomes inactive and recovers to activity based on specific probabilities $q_i$. As shown in the following diagram:

{{<figure align="center" src="/who_do_we_blame/volunteer_transition.jpeg" caption="the state transitions of volunteers based on actions and associated probabilities. Active volunteers ($s_t = 1$), when no action is taken ($y_t = 0$) remains active. If action is taken ($y_t = 1$), they might generate a reward w.p. $p_i$ and become inactive, or stay active without generating a reward. Inactive volunteer return to activity based on specific probabilities ($q_i$).">}}

The decision maker (in the perspective of the platform) has action space $\mathbf y^t$, where each $y_i^t\in \{0, 1\}, \forall i$ corresponds to whether arm $i$ is being 'pulled' at time step $t$. The platform aims to maximizes averaged reward over the long run:
$$
\max_\pi \lim_{T\to\infty}\mathbb E_{y \sim \pi(\cdot)}\left[\frac1T \sum_{t = 1}^{T} \sum_{i\in [N]}r_i(s_i^t, y_i^t)\right],\quad \text{s.t. }\frac1T\mathbb E[\sum_{i, t}y_i^t]\le B
$$

## calculating Whittle index

For the preceding RMAB problem instance, the optimal policy is an index policy––the optimal decision only needs to consider each volunteer individually (see [here](/posts/whittle_index_technical) for the theoretical analysis).

Consider typical volunteer $i$, alone. Assume now there is a ***subsidy of passivity* $\lambda$** for **not incentivizing her**. Denote $\gamma_i(\lambda)$ as the optimal average reward under this subsidy $\lambda$​. We can write out the Bellman optimality equations:
$$
\begin{align}
\gamma_i(\lambda) + V^k_i(1) & =  \max\{V^k_i(1; y = 1), V^k_i(1; y = 0)\}\cr
\gamma_i(\lambda) + V_i(0) & = \lambda + q_i\mathbb E_\kappa[ V_i^\kappa(1)] + (1 - q_i)V_i(0)\cr 
\text{where }V^k_i(1; y = 1) & = p_{k, i}(w_k + V_i(0)) + (1 - p_{k, i})\mathbb E_\kappa[ V_i^\kappa(1)]
\cr
V^k_i(1; y = 0) & = \lambda + \mathbb E_\kappa[ V_i^\kappa(1)]
\end{align}
$$
where, $V_i^k(s_i^t)$ is the optimal reward function at state $s_i^t$ under task type $k$. Notice that, for $s_i^t = 0$ (when the volunteer is inactive), the optimal policy is to not pulling the arm and just receives subsidy $\lambda$. And type of task $k$ doesn't matter as well, so we drop superscript $k$ anyway.

The above system of equations solve
$$
V_i(0) = \mathbb E_\kappa[ V_i^\kappa(1)] + \frac{\lambda - \gamma_i(\lambda)}{q_i}
$$
and,
$$
\gamma_i(\lambda) + V_i^k(1) =\mathbb E_\kappa[ V_i^\kappa(1)] + \max\{\frac{p_{k, i}(\lambda - \gamma_i(\lambda))}{q_i}, \lambda\}.
$$
Taking expectation again for $k$:
$$
\gamma_i(\lambda) = \mathbb E_k \max\{\frac{p_{k, i}(\lambda - \gamma_i(\lambda))}{q_i}, \lambda\}.
$$
The above one-dimensional fixed point can be pretty much solved efficiently, as does the rest of $V_i^k(1), \forall k\in [K]$. Let
$$
\lambda_i^\star(k) :=\sup_{\lambda} \{\lambda: (\frac{p_{k, i}}{q_i}- 1)\lambda - \frac{p_{k, i}}{q_i}\gamma_i(\lambda)\ge 0\}
$$
and it is the index for volunteer $i$ with task $k$. With the Whittle Index in our hands, we can then apply heuristics as we wishes.
