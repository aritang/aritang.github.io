---
title: "Bandit Superprocesses Relaxation and Approximation Algorithm"
date: 2025-07-09T23:35:57+08:00
draft: false
---

Our Beyond-Bayesian-Bandits reading group covered this paper today:

> ## Multitasking: Efficient Optimal Planning for Bandit Superprocesses
>
> Dylan Hadfield-Menell and Stuart Russell. [Link](https://people.csail.mit.edu/dhm/files/bsp_bbvi.pdf to paper) and its [supplementary materials](https://people.csail.mit.edu/dhm/files/bsp_bbvi_supplementary.pdf).
>
> A bandit superprocess is a decision problem composed from multiple independent Markov decision processes (MDPs), coupled only by the constraint that, at each time step, the agent may act in only one of the MDPs. Multitasking problems of this kind are ubiquitous in the real world, yet very little is known about them from a computational viewpoint, beyond the observation that optimal policies for the superprocess may prescribe actions that would be suboptimal for an MDP considered in isolation. (This observation implies that many applications of sequential decision analysis in practice are technically incorrect, since the decision problem being solved is often part of a larger, unstated bandit superprocess.) The paper summarizes the state-of-the art in the theory of bandit superprocesses and contributes **a novel upper bound on the global value function of a bandit superprocess**, defined in terms of a direct relaxation of the arms. The bound is equivalent to an existing bound (the Whittle integral), but is defined constructively, as the value of a related multi-armed bandit. We provide a new method to compute this bound and derive the first practical algorithm to select optimal actions in bandit superprocesses. The algorithm operates by repeatedly establishing dominance relations between actions using upper and lower bounds on action values. Experiments indicate that the algorithm’s run-time compares very favorably to other possible algorithms designed for more general factored MDPs.

I think this paper's math is tough but, hopefully thanks to our reading group's excellent team work it's under control... 
