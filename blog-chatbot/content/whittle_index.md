---
title: "RMAB and Whittle index | a modern approach to decision-making"
date: 2024-06-05T23:56:59+08:00
draft: false
---

Decision-making in **dynamic environments over time** presents unique challenges, particularly when the conditions influencing decisions are constantly changing. In such scenarios, traditional decision-making models often fall short. This is where **Restless Multi-Armed Bandits (RMAB)** come into play. The method provides a robust framework for modeling and optimizing decisions over time. Here's a brief introduction of the concept of RMAB and the Whittle Index Policy.

## understanding Restless Multi-Armed Bandits
### what are RMAB?

The **multi-armed bandit problem** is a classic version of the problem of optimal allocation of activity under certainty: simply saying, one has $n$ projects, the state of project $i\in [n]$ being denoted by $x_i(t)$​.

One can operate only one project at once: if one operates project $i$ then one receives reward $g_i(x_i(t))$ in the time-interval $(t, t + 1)$ and the transition $x_i(t)\rightarrow x_i(t + 1)$ follows a Markov rule specific to project $i$. The unused projects neither yield reward nor change state; current states of all projects are known at any time. 

The problem is to so choose the project at each moment that the expected discounted reward over an infinite future is maximal.

**Restless Multi-Armed Bandits** extend this classic multi-armed bandit problem to scenarios where all projects (or, 'arms') evolve over time, regardless of whether they are chosen, and might incur reward regardless of if being activated. Moreover, one might be able to pull $B$ arms at any time. This dynamic nature makes RMAB particularly applicable to real-world decision-making processes, where neglecting any option can still lead to changes in its state.

### example
Consider a platform coordinating volunteers for various tasks, where each volunteer can either be active or inactive at a certain time point. 

Meanwhile, at each time point, a task arrives randomly, and the platform must decide whom to notify (activate) based on the likelihood of acceptance and the potential reward. This setup forms a basic RMAB model, with each volunteer representing an 'arm' of the bandit:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/who_do_we_blame/volunteer_transition.jpeg" caption="the state transitions of volunteers based on actions and associated probabilities. Active volunteers ($s_t = 1$), when no action is taken ($y_t = 0$) remains active. If action is taken ($y_t = 1$), they might generate a reward w.p. $p_i$ and become inactive, or stay active without generating a reward. Inactive volunteer return to activity based on specific probabilities ($q_i$).">}}

The following figure illustrates a typical transition from $t$ to $t + 1$. Decision maker (platform) chooses a subset of volunteers to notify, and the volunteers generate rewards/transition according to their intrinsic probabilities $p_{i, k}, q_i$ and the current type $k$ of the job:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/who_do_we_blame/RMAB_volunteer.jpeg" caption="from $t$ to $t + 1$, the platform's action and associated transitions">}}

- **Green Volunteers ($s_t = 1$)**: Represent active volunteers.
    - When no action is taken ($y_t = 0$), the volunteer remains active in the next period ($s_{t+1} = 1$).
    - When action is taken ($y_t = 1$), with probability $p_i$ a reward is generated and the volunteer transitions to an inactive state ($s_{t+1} = 0$). Otherwise, with probability $1 - p_i$, no reward is generated and the volunteer stays active.
- **Red Volunteers ($s_t = 0$)**: Represent inactive volunteers.
    - Regardless of action ($y_t = 0$), with probability $q_i$ the volunteer returns to active state in the next period ($s_{t+1} = 1$), and with probability $1 - q_i$​ remains inactive.
    - Inactive volunteers generate no rewards.

## the Whittle Index Policy –– explained
### core concept
The Whittle Index Policy assigns an index to each arm based on its current state, where the index almost represents the ***fair price*** for an arm $i$ when it's being at state $x_i$. Denote the index as $w(x_i)$. The index represents a virtual price for the arm, at which we are indifferent between pulling it or not pulling it. The decision-maker then acts on the arms with the highest indices within the constraints of available resources.

A crucial aspect of applying the Whittle Index is the property of indexability, which determines whether an arm's index can be computed consistently as system dynamics evolve. **Indexability** is a property defined for an arm, and serves as the core engine for the Whittle Index Policy (or, more precisely, i'd rather call it as a heuristic).

### theoretical foundations
The seminal paper by Whittle (1988) introduced the index and demonstrated its application under conditions of resource constraints. 

Weber and Weiss (1990) extended this theory, showing that under certain conditions, using the Whittle Index is asymptotically optimal, meaning it performs nearly as well as the best possible policy as the number of arms and resources grows.

The RMAB framework and Whittle Index Policy find applications in various areas, including healthcare, like managing treatment schedules, and in telecommunications, where they allocate bandwidth among competing channels. Each application benefits from the model's ability to handle dynamic environments **efficiently**.

### challenges
Despite its advantages, there is still challenges implementing the Whittle Index Policy in real-world scenarios. The biggest of these is the computational complexity involved in calculating the index for a large number of arms, particularly when the state transitions are complex.

## references
- Whittle, P. (1988). "Restless Bandits: Activity Allocation in a Changing World." *Journal of Applied Probability.*
- Weber, R.R., & Weiss, G. (1990). "On an Index Policy for Restless Bandits." *Journal of Applied Probability.*

Feel free to delve deeper into the mathematical models discussed and explore how they can be tailored to specific applications in your field.