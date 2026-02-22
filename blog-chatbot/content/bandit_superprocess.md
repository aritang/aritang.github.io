---
title: "Bandit Superprocess Model and Whittle Condition"
date: 2025-06-03T23:16:51+08:00
draft: false
---

In the standard discounted multi‑armed bandit (MAB) with binary “play/rest” decisions, Gittins’ index gives a provably optimal per‑arm priority rule.

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/superprocess_model.jpeg" caption="Section 3.2 of Q. Zhao (2021)" width="100%">}}

For general bandit super process, index-based policy no longer works. Counterexample:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/superprocess_counterexample.jpeg" caption="Section 3.2 of Q. Zhao (2021)" width="100%">}}

Actually, in many cases, the index is not even *defined*. But somehow if the problem is "indexable" satisfying the following condition, Index Policy still is optimal

> ## Whittle’s Indexability Condition
>
> Embed the superprocess in a two‑arm system together with a dummy arm that delivers a constant reward $c$.
> If there exists a mapping $\phi:S\!\to\!A$ such that, whenever it is optimal to choose the superprocess, applying control $a=\phi(s)$ remains optimal *for every* $c\in\mathbb{R}$, the superprocess is said to be **Whittle‑indexable**.

This is a very strong condition. But under this condition one can construct an index $\lambda(s)$ that makes the decision maker indifferent between the superprocess in state $s$ and the dummy arm with reward $\lambda(s)$. In a multi‑arm setting, picking at each step the arm/state with highest $\lambda$ along with the accompanied optimal control $\phi(s)$ is optimal. This recovers the simplicity of an index policy.

### References

* Q. Zhao, *Multi‑Armed Bandits: Theory and Applications to Online Learning in Networks*, Cambridge University Press, 2021.
