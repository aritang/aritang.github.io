---
title: "online learning and multi-armed bandits"
date: 2024-04-13T21:20:21+08:00
draft: false
---

Prof. Yi Xiong's *Frontiers in Management Science* Session covered a crash course on **online learning and multi-armed bandits (MAB)**. A simple way to view MAB is to consider it as a tool to model and study online learning problems. At time $t$, a decision maker chooses an 'action' or ***arm*** $i_t\in \mathcal I$ ($\mathcal I$ is the known set of distributions). The chosen machine returns a random reward $r_t$ following its distribution $Q_t$. Our goal as the octopus is to maximize the expected cumulative rewards $\sum_{t = 1}^T \mathbb E[r_t]$.

The challenge arises because $Q_t$ is unknown. Based on assumptions about the structure of the distributions and given the total period length $T$, the goal is to balance the exploration-exploitation trade-off. First, we learn $Q_t$, then optimize the policy that follows to minimize **regret**:
$$
\mathcal R_T = \sum_{t = 1}^T R^{\pi^*}_t - \sum_{t = 1}^T R^\pi_t
$$
where $R^{\pi^*}$ is the optimal policy of the oracle, knowing all distributions in advance.

There are several variations of the bandit problem:

- **Stochastic Stationary Bandits**: Here, the distributions $Q_t$ are i.i.d. over time and independent of the rewards from playing the other arms. This setting is generally considered the most straightforward.
- **Adversarial Bandits**: Each arm is initially assigned an arbitrary and unknown **sequence** of rewards. This variant is challenging due to the unpredictable nature of the rewards.
- **Nonstationary Bandits**: The rewards are stochastic but change over time, presenting a balance in difficulty between the stochastic and adversarial models.

### Vanilla: Stochastic Bandit

The basic setting of multi-armed bandits (MAB) provides initial insights into the algorithms and objectives of study. Formally:

- **Environment**:
    $$
    \epsilon = \{\nu: (P_a: a\in \mathcal A): P_a \in \mathcal M_a , \forall a\in \mathcal A\}
    $$
    A specific **instance** $\nu$ is defined by $K$ arms with reward distributions represented as $\nu := [P_1, ..., P_K]$.

- In each period $t = 1, 2, ..., T$, an arm $A_t\in [K]$ is pulled and a reward $X_t \sim P_{A_t}$ is collected.

- Historical actions and rewards are recorded as:
    $$
    H_{t - 1} = (A_1, X_1, ..., A_{t - 1}, X_{t - 1})
    $$

- A policy maps the history to the current arm to be pulled:
    $$
    \pi_t: H_{t-1} \to [K]
    $$

Given an instance, the policy executes at each period to choose an arm. The algorithm's goal is to maximize cumulative rewards, while performance is evaluated as regret against an oracle:
$$
R_n(\pi, \nu) = n\mu^*(\nu) - E[\sum_{t =1}^T X_t]
$$
Note that the player knows the environment (the class of reward distributions) but not the actual instance (the specific distributions). Ultimately, our algorithm attempts to optimize for $\min_\pi \max_{\nu \in \epsilon} R_n(\nu, \pi)$.

Typically, we study environments that satisfy the **sub-gaussian** assumption: $\epsilon = \{P_1, ..., P_K, P_i \sim 1-\text{subgaussian}\}$. This means each $P_i$ has tail behavior that is tightly bounded.

The explore-then-commit algorithm uses the early period to explore arms and the rest committing to a learnt best option. Such a simple algorithm achieves a regret bound of $R_T \le O(\sqrt{T})$, which is independent of the instance.

### The Upper Confidence Bound Algorithm

(to be continued tmrw.)
