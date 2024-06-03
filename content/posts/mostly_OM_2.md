---
title: "Mostly OM diary | Allocating Divisible Resources on Arms with Unknown and Random Rewards"
date: 2024-05-31T08:46:11+08:00
draft: false
---

> speaker: **Ningyuan Chen** | Prof., University of Toronto
>
> related paper: *[Allocating Divisible Resources on Arms with Unknown and Random Rewards](https://arxiv.org/abs/2306.16578)*

## ***TALK ABSTRACT**:* 

We consider a decision maker allocating one unit of renewable and divisible resource in each period on a number of arms. The arms have unknown and random rewards whose means are proportional to the allocated resource and whose variances are proportional to an order b of the allocated resource. In particular, if the decision maker allocates resource $A_i$ to arm $i$ in a period, then the reward $Y_i$ is $Yi(Ai)=A_i\mu_i+A_i^b \xi_i$, where $\mu_i$ is the unknown mean and the noise $\xi_i$ is independent and sub-Gaussian. When the order $b$ ranges from 0 to 1, the framework smoothly bridges the standard stochastic multi-armed bandit and online learning with full feedback. We design two algorithms that attain the optimal gap-dependent and gap-independent regret bounds for $b\in [0,1]$, and demonstrate a phase transition at $b=1/2$. The theoretical results hinge on a novel concentration inequality we have developed that bounds a linear combination of sub-Gaussian random variables whose weights are fractional, adapted to the filtration, and monotonic.
