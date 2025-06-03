---
title: "Bandit Superprocess Model and Whittle Condition"
date: 2025-06-03T23:16:51+08:00
draft: false
---

In the standard discounted multi‑armed bandit (MAB) with binary “play/rest” decisions, Gittins’ index gives a provably optimal per‑arm priority rule. The derivation hinges on the fact that **activating an arm is a stopping‑time problem**, so each arm can be decoupled and summarised by a single scalar.

A **bandit superprocess** generalises this setup: when an arm is selected we may choose one of several local controls  $a \in A,\; |A|>1$. Each arm is now a *controlled* Markov process $(S,A,P,r)$ with discounted reward  $\mathbb{E}\!\left[\sum_{t=0}^{\infty} \beta^{t} r(X_t,a_t)\right]$.

### Why the Classical Index Breaks

The extra action dimension destroys the stopping‑time structure. The value of “playing” an arm can no longer be expressed independently of future global decisions because the within‑arm policy itself adapts to opportunity cost. Simple three‑state examples show that naively ranking arms by their Gittins indices can be strictly sub‑optimal—and, in many cases, the index is not even *defined*.

### Whittle’s Indexability Condition

> **Whittle Condition**
> Embed the superprocess in a two‑arm system together with a dummy arm that delivers a constant reward $c$.
> If there exists a mapping $\phi:S\!\to\!A$ such that, whenever it is optimal to choose the superprocess, applying control $a=\phi(s)$ remains optimal *for every* $c\in\mathbb{R}$, the superprocess is said to be **Whittle‑indexable**.

This is a very strong condition. But under this condition one can construct an index $\lambda(s)$ that makes the decision maker indifferent between the superprocess in state $s$ and the dummy arm with reward $\lambda(s)$. In a multi‑arm setting, picking at each step the arm/state with highest $\lambda$ along with the accompanied optimal control $\phi(s)$ is optimal. This recovers the simplicity of an index policy.

### References

* Q. Zhao, *Multi‑Armed Bandits: Theory and Applications to Online Learning in Networks*, Cambridge University Press, 2021.
