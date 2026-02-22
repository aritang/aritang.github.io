---
title: "Crowdsourcing and Optimal Market Design"
date: 2025-05-12T23:31:45+08:00
draft: false
---

Thanks to Professor Grant Schoenebeck for pointing me to this awesome paper.

> ### 📄 **Crowdsourcing and Optimal Market Design**
>
> **Bobak Pakzad-Hurson | EC 2022**
>  [Paper Link (ACM)](https://dl.acm.org/doi/10.1145/3490486.3538266) | [Talk on YouTube](https://youtu.be/D7kFEWA_8qs?si=Zair02Y6nO1xGSkn)

In classic mechanism design, we often assume agents know their own preferences precisely. But what if the knowledge is private *and* noisy—say, in job market when schools evaluating graduate students? This paper solved an elegant question: how to crowdsource information under imperfect observations to achieve (almost) optimal allocations—*with only a small punishment*.

The code idea is, a punishment scheme on top of off-the-shelf allocation mechanism. The punishment is kind of like a scoring rule, but more cleverly designed to fit in the market—so that even if agents only imperfectly observe characteristics, the market can still approximate the optimal allocation by combining their reports and punishing outliers.

> “OK, let me get to the punchline.” – the author, helpfully in the talk 😄
>
> ### So here’s the high-level idea of the proposed mechanism:
>
> 1. Solicit reports of agent/object qualities (e.g. workers rating each other).
> 2. Aggregate the reports using a maximum likelihood estimator—i.e. the *wisdom of the crowd*.
> 3. Use a full-information allocation mechanism, pretending this aggregate is ground truth.
> 4. Punish agents whose reports significantly deviate from the crowd.

Under large market assumption, the paper:

(i) **Information Requirements**: It characterizes how many agents need to report in order to approximate the optimal allocation, under very general conditions.

(ii) **Punishment Design**: It constructs a punishment rule to ensure truthful reporting at equilibrium. The key idea:

- If an agent lies to get a better allocation or avoid punishment, it just probably won’t help—with large probability the market's prediction is correct regardless of this one misreporting agent.
- And as one agent’s lie barely affects the crowd estimate—but they *will* be penalized if their report deviates.

It takes two glasses of wine on a lovely Sunday afternoon to wash down all the notations—and turns out to be totally worth it.
