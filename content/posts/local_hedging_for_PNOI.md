---
title: "Local Hedging Algorithm for PNOI"
date: 2025-07-25T22:59:38+08:00
draft: false
---

Our reading group covered this paper today:

> ## Local hedging approximately *solves* Pandora’s box problems with nonobligatory inspection
>
> Ziv Scully and Laura Doval (2025) | Link: https://arxiv.org/pdf/2410.19011
>
> *Abstract*: We consider search problems with nonobligatory inspection and single-item or combinatorial selection. A decision maker is presented with a number of items, each of which contains an unknown price, and can pay an inspection cost to observe the item's price before selecting it. Under single-item selection, the decision maker must select one item; under combinatorial selection, the decision maker must select a set of items that satisfies certain constraints. In our nonobligatory inspection setting, the decision maker can select items without first inspecting them. It is well-known that search with nonobligatory inspection is harder than the well-studied obligatory inspection case, for which the optimal policy for single-item selection (Weitzman, 1979) and approximation algorithms for combinatorial selection (Singla, 2018) are known.
>
> We introduce a technique, **local hedging**, for constructing policies with good approximation ratios in the nonobligatory inspection setting. Local hedging transforms policies for the obligatory inspection setting into policies for the nonobligatory inspection setting, at the cost of an extra factor in the approximation ratio. The factor is instance-dependent but is at most 4/3. We thus obtain the first approximation algorithms for a variety of combinatorial selection problems, including matroid basis, matching, and facility location.

*Note:* they study the **cost** version of Pandora’s box problems with nonobligatory inspection (eg. every box has a cost, and one is obliged to take a box at the end of the algorithm).

The algorithm is very beautiful, though the proof is fairly nontrivial. I'll write down my understanding of the algorithm here, thanks to the reading group mates hard work:

### The Hedging Algorithms

Consider a general problem instance of the Pandora's Box with Non-Obligatory Inspection. Each box's cost is $X_i$ (an unknown variable, can be learnt by paying $c_i$). The decision maker needs to take one box.

The hedging algorithm works as follows:

For each box, a *hedging probability* $p_i$ is calculated
$$
p_i = \max(\frac{\mu_i - u_i^{rsv}}{\mu_i - u_i^{rsv} + cu_i^{rsv}/\mu_i}, 0)
$$
where $\mu_i = \mathbb E X_i$ and $u_i^{rsv}$ is just the Weitzman index satisfying $\mathbb E[(u^{rsv} - X_i)^+] = c_i$.

With probability $p_i$ (independently), the algorithm would label box $i$ as '**obligatory-inspection**', otherwise as '**non-inspection**'. Then, the algorithm faces an instance of the classic Pandora's Box problem, where each (surrogate) box's value can be viewed as
$$
W^{LH(p)} = \begin{cases}
\max(X_i, u_i^{rsv}) & w.p. \;p_i\cr
\mu & w.p.\; 1 - p_i
\end{cases}
$$
And at last Weitzman's index policy is run.

Notes for the theory results that I get from the reading group today: the 4/3 approximation is proved for each box (then combined), something like this:

{{<figure align="center" src="/online/local_hedging.jpeg" caption="The proof is really pretty. I wish I could fully understand it though but clearly it takes more time..." width="100%">}}
