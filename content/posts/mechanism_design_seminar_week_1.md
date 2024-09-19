---
title: "mechanism design seminar notes | week 1"
date: 2024-09-13T22:11:43+08:00
draft: false
---

This semester, Professor Hu Fu is offering a mechanism design seminar for senior undergraduates. The course is structured like a graduate-level theory class, without lecture notes or a base textbook.

The mechanism design seminar adopts an algorithmic perspective on economic topics, focusing on:

1. **Combinatorial Auctions**
2. **Optimal Auctions**

I will be updating and sharing my notes here for future reference. Let's dive in.

---

## Combinatorial Auctions: Setup

Consider an auction with:

- **Items**: $m$ distinct items to sell.
- **Agents**: $n$ bidders participating in the auction.

Each agent $ i $ has a valuation function:

$$
v_i: 2^{[m]} \to \mathbb{R}_+,
$$

where $ 2^{[m]} $ is the power set of the item set $ [m] = \lbrace1, 2, \ldots, m\rbrace $.

An **auction outcome** consists of:

- **Allocation**: $ \mathbf{S} = (S_1, S_2, \ldots, S_n) $, where $ S_i \subseteq [m] $ is the set of items allocated to agent $ i $.
- **Payments**: $ \mathbf{p} = (p_1, p_2, \ldots, p_n) $, where $ p_i $ is the amount agent $ i $ pays.

**Feasibility Constraints**:

- **No Overlapping Allocations**: $ S_i \cap S_j = \emptyset $ for all $ i \ne j $.
- **All Items Accounted For**: $ \bigcup_{i=1}^n S_i \subseteq [m] $.

**Agent Utility**: Agents are quasi-linear utility maximizers, aiming to maximize:

$$
u_i(S_i, p_i) = v_i(S_i) - p_i.
$$

**Social Welfare**: The total value derived from the allocation:

$$
\text{SW}(\mathbf{S}) = \sum_{i=1}^n v_i(S_i).
$$

---

## VCG Mechanism

The **Vickrey-Clarke-Groves (VCG) mechanism** is pivotal in mechanism design for achieving efficient and truthful outcomes.

### Allocation

Compute the allocation $ \mathbf{S}^{\text{VCG}} $ that maximizes social welfare:

$$
\mathbf{S}^{\text{VCG}} = \arg\max_{\mathbf{S} \text{ feasible}} \sum_{i=1}^n v_i(S_i).
$$

### Payments

Determine payments to align individual incentives with social welfare maximization:

$$
p_i = \max_{\mathbf{S}_{-i}} \sum_{j \ne i} v_j(S_j) - \sum_{j \ne i} v_j\left(S_j^{\text{VCG}}\right).
$$

**Interpretation**: Each agent pays the externality they impose on others—the difference between the maximum total value others could achieve without them and what others actually achieve in the VCG outcome.

---

## Background

Combinatorial auctions are crucial for allocating public goods and scarce resources, often involving government agencies as auctioneers. Notable applications include spectrum auctions, referred to as "incentive auctions" by President Obama.

Two significant waves in combinatorial auction research:

- **1980s–1990s**: Establishing theoretical foundations and practical mechanisms.
- **2010s**: Advances driven by computational capabilities and algorithmic innovation.

---

## Complexity

The general valuation functions $ v_i $ require specifying values for all $ 2^m $ subsets of items, resulting in exponential input size. Therefore, complexity is typically measured in terms of $ m $ and $ n $, rather than input size.

### Example: Single-Minded Bidders

**Definition**: An agent is *single-minded* if they desire only a specific bundle $ T_i \subseteq [m] $ and value all other bundles at zero:

$$
v_i(S) = 
\begin{cases}
v_i & \text{if } S = T_i, \\
0 & \text{otherwise}.
\end{cases}
$$

**Key Points**:

- **NP-Hardness**: Maximizing social welfare is NP-hard even with single-minded bidders. This can be proved by reducing it to independent set problem.
- **Approximation Algorithms**: Poly-time algorithm does not exist with approximation ratios of $ O(n^{1 - \epsilon}) $ for any $ \epsilon > 0 $. The result comes also from complexity results from independent set.

---

## Walrasian Tatonnement

To begin with, the **Walrasian equilibrium** is a fundamental concept where market prices lead to an efficient allocation of resources without excess supply or demand.

### Walrasian Equilibrium Components

1. **Prices**: A price $ p_j $ for each item $ j \in [m] $.
2. **Allocation**: An assignment $ \mathbf{S} = (S_1, S_2, \ldots, S_n) $ of items to agents.

### Conditions

1. **Utility Maximization**: Each agent $ i $ receives a bundle $ S_i $ that maximizes their utility given the prices:

    $$
    S_i \in \arg\max_{S \subseteq [m]} \left\lbrace v_i(S) - \sum_{j \in S} p_j \right\rbrace.
    $$

2. **Market Clearing**: All items are sold, and supply meets demand—no item is over- or under-demanded.

### Tatonnement Process

*Tatonnement* (French for "groping" or "trial and error") is an iterative procedure to reach a Walrasian equilibrium:

{{<figure align="center" src="/seminars/walrasian_tatonnement.jpeg" caption="caption_text" width="88%">}}

Understanding tatonnement enriches our ability to design mechanisms that are both theoretically sound and practically viable. Spoiler alert: it works for a natural class of so-called '***gross substitutes***' value functions.

---

*That's all for this week's mechanism design seminar. Stay tuned for updates from future lectures.*
