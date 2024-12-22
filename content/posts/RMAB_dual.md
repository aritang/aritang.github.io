---
title: "Restless Multi-Armed Bandits | Primal, Dual and Opportunity Costs"
date: 2024-12-22T00:39:38+08:00
draft: false
---

The textbook *Multi-armed Bandit Allocation Indices* by John Gittins, Kevin Glazebrook, Richard Weber has a charming Chapter 6, titled "***Restless bandits and Lagrangian relaxation***". But the authors skipped a step in the prove of how to go from the LP to Dual and to Whittle Index Policy.

Prelims:

> An RMAB (Restless Multi-Armed Bandit) instance is defined through the tuple
> $$
> \lang S, A, r_{i}, \mathcal P_{i} \rang_{i \in [N]}
> $$
> where $S_i $ is the state space, $A_i = \lbrace 0, 1 \rbrace$ the action space, $r_{i}$ and $\mathcal P_{i}$ denote the reward and transition kernels arm $i$. 
>
> Given the budget constraints, the decision make seek the policy $\pi: S \mapsto A$ that maximizes long-term average reward subject to budget constraints: {{<figure align="center" src="/art/rmab_eq_1.jpeg" caption="" width="100%">}}
>
> If the budget constraint is "soft"—i.e. on average the actions don't exceed a given budget:
> $$
> \lim_{T\to \infty} \frac 1T\mathbb E_{a\sim \pi(\cdot)}[\sum_{t = 1}^T\sum_{i \in [N]} a_i^t]\le  B.
> $$

Given an RMAB instance, we can solve the optimal soft-budget policy in the form of the following occupancy-measure LP:
$$
\begin{align*}
    \max_{\mu} \ & \sum_{i\in [N]} \sum_{s_i, a_i} \mu_i(s_i, a_i) r_i(s_i, a_i)\cr
    s.t.\  & \sum_{s_i, a_i} P[s_i\to s_i'| a_i] \mu_i(s_i, a_i)= \sum_{a_i}\mu_i(s_i', a_i), \forall s_i', i\cr
    & \sum_{a_i, s_i}\mu_i(s_i, a_i) = 1, \forall i\in [N]\cr
	& \sum_i \sum_{s_i}\mu_i(s_i, 1)\le B\cr
    & \mu_i(s_i, a_i) \ge 0, \forall i, s_i, a_i.
\end{align*}
$$
Let $V_i(s_i),\nu_i, \rho$ be the dual variables associated with the above three (groups) of constraints. The dual writes:
$$
\begin{align*}
\min_{\nu_i, \rho}& \sum_{i\in [N]} \nu_i + \rho B\cr
\text{subject to:} & \cr
V_i(s_i) + \nu_i & \ge r_i(s_i, a_i) - \mathbb I\lbrace a_i = 1\rbrace \rho + \sum_{s_i'}V_i(s_i')P[s_i\to s_i'\mid a_i],\forall i, s_i\cr
\rho & \ge 0.
\end{align*}
$$
Notice by complementary slackness, we have, for optimal dual solutions $\nu_i^\star, V_i^\star(\cdot)$, if a state $s_i$ is ever visited (i.e. $\mu_i(s_i, 0) + \mu_i(s_i, 1) > 0$), then, either
$$
V_i(s_i) + \nu_i  = r_i(s_i, 1) - \rho + \sum_{s_i'}V_i(s_i')P[s_i\to s_i'\mid a_i=1],
$$
or
$$
V_i(s_i) + \nu_i  = r_i(s_i, 0) + \sum_{s_i'}V_i(s_i')P[s_i\to s_i'\mid a_i = 0].
$$
Which can be written in compact form, but more intuitive:

{{<figure align="center" src="/art/rmab_eq_2.jpeg" caption="" width="88%">}}

I think the intuitive here is beautiful. If you formulate a constrained-resource-allocation-type problem directly as linear programming (or MIP-relaxed), its dual variables often resemble "shadow prices", or, simply, opportunity costs (e.g. try knapsack). It's similar here.

The textbook's section 6.3 breezes past this with, 'It is ***interesting*** to see how (6.6) can be obtained from (6.1)–(6.4)...'

{{<figure align="center" src="/art/RMAB_skip.jpeg" caption="Interesting? Absolutely. Obvious? Oh, totally—if you squint hard enough!" width="100%">}}
