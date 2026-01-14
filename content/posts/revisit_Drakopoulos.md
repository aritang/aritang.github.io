---
title: "Summary for Drakopoulos et al (20'MS) | Persuading Customers to Buy Early: The Value of Personalized Information Provisioning"
date: 2024-08-20T06:23:29+09:00
draft: false
tags: ['paper', 'info_design', 'OM']
---

Here's a summary of the paper *Persuading Customers to Buy Early: The Value of Personalized Information Provisioning*, by Kimon Drakopoulos, Shobhit Jai and Ramandeep Randhawa, published online @ Management Science, in 2021.

The paper studies the persuasion and pricing problem for a seller with informational advantage about its inventory level.

Model: a seller sells a single good over two period to unit-demand buyers, out of inventory $Q$. The inventory level might be **low** (type `L`) or **high** (type `H`). The paper takes the assumption that there is a unit mass of buyers, with their private type of valuation for the product distributed according to $v\sim F(\cdot)$. Inventory level `H = 1`, and `L < 1`.

The inventory level is unknown at the start, with the seller knowing more info ahead of the buyers and hence can utilize informational advantage. The timing of the game is as follows:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/info_design/drakopoulos_timeline.jpeg" caption="Timing of the game. Source: the [paper](https://pubsonline.informs.org/doi/abs/10.1287/mnsc.2020.3580).">}}

- To begin with, the seller and buyers enter the market: prior over inventory level $\mathbb P[H] + \mathbb P[L] = 1$ and buyer's 'private' type distribution $v\sim F(\cdot)$ is public knowledge.

- At period `-1`, the seller commit to price $p_1, p_2$ for the two periods, and **information policy $\Sigma$**:
    $$
    \Sigma:\underbrace{ \{H, L\}\times [v]}_\text{inventory and buyer type}\to \mathbb \Delta(S)
    $$

- At period `0`, inventory $Q$ and signal $s$ is realized, buyer does Bayesian updates of their posterior prior of inventory $\mathbb P[\cdot | s]$.

- At period `1, 2`, buyer optimally purchase, under equilibrium. **Tie break at random is demand exceeds supply.**

Note that buyer's action has externality—if a certain portion of buyers purchase, inventory drops and there might be less in the next period. The paper considered Nash Equilibrium as the solution concept for buyer's action—that given a signal and the induced posterior distribution of inventory level $P[Q | s], Q\in \{H, L\}$, buyer's equilibrium response can be characterized by an indifference level $t$—buyers with $v<t$ would wait for second period and risk stock-outs for lower price $p_2$, while buyers with $v> t$ would simply buy at first period and leave.

The seller's policy is to decide price $(p_1, p_2)$ along with persuasion policy $\Sigma$, so as to maximize (ex-ante) expected revenue.

## results

Notations: for convenience, denote as $p^L : =\bar F^{-1}(q_L)$—to be the posted-price threshold at which exactly $L$ (low type inventory) quantity is sold (in a single period selling). Denote $p_m$ the monopoly price: $p^m = \arg\max \bar pF(p)$.

Discuss over the information policy $\Sigma$, we seek to solve for the optimal pricing at both periods:

- ***no information.*** optimal pricing:
    $$
    p_1 = \mathbb P[L] \max\{p^L, p^m \} + \mathbb P[H] p^m\\
    p_2 = p^m
    $$

- ***full public information.*** optimal pricing:
    $$
    p_1 = \max\{p^L, p^m \}\\
    p_2 = p^m
    $$
    **Notably, for both no/full-info policy, under optimal pricing, both Revenue is the same**:
    $$
    \text{Rev} =  \mathbb P[L] \max\{p^L, p^m \} \bar F(\max\{p^L, p^m \}) +  \mathbb P[H] p_2 \bar F(p_2)
    $$

- ***optimal public mechanism:***

    when buyer's valuation distribution $F(\cdot)$ has **non-decreasing hazard rate**, both no/full information policy is opitmal.

    *Remark*: I guess this part has some beautiful maths that might steer future research.

- private infomation mechanism. a direct result is that by using private signal, seller can be strictly better off. optimal pricing is:
    $$
    p_1 = p^L\\
    p_2 \le p^m
    $$
    (the paper gave a closed-form characterization of $p_2$ in its **Mechanism 1**)

    For signaling $\Sigma$, buyers receive private, direct recommendation `buy now`, `buy later` or `NO`.

    - If seller's inventory is `L` (low), the firm signals all buyers with $v\ge p_1$ to purchase on period one. For the rest the firm signals `NO` And everything is bought and done.
    - If seller's inventory is `H`, apart from signaling `buy` to buyer with $v\ge p_1$, the firm signals `wait` to some consumers $v\in [p^m, p_L]$ with certain probability that guarantees IC, while cheat the buyer to buy early sometimes (paying an unnecessary premium $p_1$).

    The optimal mechanism can be visualized as follows:

    {{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/info_design/drakopoulos_opt_signal.jpeg" caption="private signaling optimal mechanism">}}

- later commitment

    When the seller can make the pricing decision contingent on the realized quantity of the inventory, in this case buyers would be able to infer about real inventory level based on the price posted.

    The paper demonstrated that, there is no value in contingent price with inventory level. Specifically, the buyer's ex ante expected revenue equals that under full information.

*omitted discussion:*  The paper has also discussed other variations for the model. About Coarse Private Signaling (when the buyers are only separated into two buckets), Private Disclosure Mechanism that limits signals to credibly verifiable signals, and demand uncertainty.

### reference

[Persuading Customers to Buy Early: The Value of Personalized Information Provisioning](https://pubsonline.informs.org/doi/abs/10.1287/mnsc.2020.3580) Kimon Drakopoulos, Shobhit Jain, and Ramandeep Randhawa Management Science 2021 67:2, 828-853
