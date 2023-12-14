---
title: "fair division - on picking sequence for chores"
date: 2023-12-14T12:32:20+08:00
draft: false
summary: The talk was on fireeeee. I actually like this work despite being a little bit biased towards the general fair division literature.
---

Today [Xin Huang](https://sites.google.com/view/xinhuang/home) came to ITCS and gave a talk on his paper **[On picking sequence for chores](https://dl.acm.org/doi/abs/10.1145/3580507.3597783)**, which has been accepted at EC'23.

> *ABSTRACT*
>
> We consider the problem of allocating *m* indivisible chores to *n* agents with additive disvaluation (cost) functions. It is easy to show that there are picking sequences that give every agent (that uses the greedy picking strategy) a bundle of chores of disvalue at most twice her share value (maximin share, MMS, for agents of equal entitlement, and anyprice share, APS, for agents of arbitrary entitlement). Aziz, Li and Wu (2022) designed picking sequences that improve this ratio to 5/3 for the case of equal entitlement. We design picking sequences that improve the ratio to 1.733 for the case of arbitrary entitlement, and to 8/5 for the case of equal entitlement. (In fact, computer assisted analysis suggests that the ratio is smaller than 1.543 in the equal entitlement case.) We also prove a lower bound of 3/2 on the obtainable ratio when *n* is sufficiently large.
>
> Our results trivially imply that (for additive valuation over chores) in the arbitrary entitlement case, there always is an allocation that gives every agent at most 1.733*APS*, and in the equal entitlement case, there always is a distribution over allocations that gives every agent at most 1.6*MMS* ex-post, and at most the proportional share ex-ante. Neither of these implications were previously known to hold.
>
> Additional contributions of our work include improved guarantees in the equal entitlement case when *n* is small; introduction of the *chore share* as a convenient proxy to other share notions for chores; introduction of ex-ante notions of envy for risk averse agents, and enhancements to our picking sequences that eliminate such envy.

I've heard people joking about fair division, that there're just a bag of words - "divisible", "envy-freeness", "max-min share", "additive utility" etc etc. You just randomly draw some reasonable combination of these configurations and there'll be a paper. That was fun. Though, I genuinely found today's paper is really interesting and, to be honest, the lecturer conveyed his ideas in a pretty neat and concise way. He even started to draw on whiteboards so as to explain some matters - it requires some courage to dive into details during TCS talks.

There is a notion of "responsibility" (in terms of division of chores), or "entitlement" (in terms of division of goods), where agents with higher responsibility are expected to take upon themselves more of the chores, and they're used interchangeably. We have the entitlement vector $\mathbf b\in \R_+^n, \sum_i b_i = 1$ for the $n$ agents.

> The focus of our work will be a special class of allocation mechanisms, referred to as *picking sequences*. To design a picking sequence for an allocation instance with a set of $n$ agents and a set $m$ items, one only needs to know the entitlement vector $\mathbf b$ but not the cardinal informations - valuations $v_i$ for them.

Picking sequence is essentially a vector $\mathbf \pi = (\pi_1, \pi_2, ..., \pi_m)\in \Pi^m$, where $\Pi$ is the set of identifier for pickers. This allocation mechanism is straightforward that, in the main stage (after picking sequence $\pi$ is given), each agents $\pi_k$ just pick what's left. It's easy to execute, straightforward to understand and even better, agents doesn't have to report their valuation at this stage.

But, though picking sequences are attractive allocation mechanisms, they are not optimal in terms of the guarantees that they offer. For example, there exists instance, under *Eating Mechanism* [Bogomolnaia and Moulin 2001], agents' utility stochastically dominates use of  random order picking sequences.

Huang's paper considered two benchmarks: max-min share (MMS) [Budish 2011] and anyprice share (APS) [Babaioff et al. 2021]. MMS applies to settings when agents have equal entitlement, where APS is a more generalized fairness notion that can be evaluated when agents have heterogeneous entitlement. The paper also introduced another notion of share - *chore share*. It is applicable only for additive disvaluation functions over chores, and serves as a convenient lower bound for the APS.

The algorithm and proof is long, filling a single linespace 30-page paper, hence I plan not to copy it here... But in general, Huang broke down their ideas in a brilliantly concise manner, so that here's the key takeaway. They proved that there **exists** a picking sequence for $n$ agents and arbitrary entitlement $\mathbf b$, where the agents uses the greedy picking strategy, that yields ratio 1.733. The proof is done by, starting from proportional allocation (of chores), refine is towards some ***good*** fractional allocation and finally round it towards integral.

I didn't quite understand completely if the ridge sequence of picking order can be calculated efficiently or only existence is guaranteed. But let's mark it here, and maybe in the future we'll have the opportunity that takes inspire from this problem.

{{<figure align="center" src="/tattooed_heart/rem_bum.jpeg" caption="coolness, i actually liked it, despite fair division really sounds like some cliché idea...">}}
