---
title: "Every Argument would Come to an End"
date: 2025-10-30T21:39:04-05:00
draft: false
---

Another note from info economics class. Recall Aumann's common knowledge: fix an event $E$ and consider the two agents' posteriors of event $E$ after agents each conduct their own deterministic partition experiment. (see [this post](/posts/agreeing_to_disagree/) for a recap)

> **Theorem** (Aumann 1976) If A's posterior is $q_A$ and B's posterior is $q_B$ is common knowledge for A and B, then $q_A = q_B$. 

But how come $q_A$ and $q_B$ become common knowledge in the first place? Geanakoplos and Polemarchakis's paper *We Can't Disagree Forever*  (1982) gives a way that the two people can use (non-strategic) communication to arrive at a common understanding of each other's posterior:

- $t = -1$ agent A and B has partition experiment $P_A, P_B$.

- $t = 0$: $w\in \Omega$ realizes. A learns from $P_A$, B learns from $P_B$ and forms their posterior about event $E$: $q_A, q_b$.
- $t = 1$: A reports truthfully "my posterior is $q_A$" B hears and update his posterior
- $t = 2$: B reports truthfully "my posterior is $q_B$" A hears and update his posterior
- ...

The process terminates, and A, B would have the same posterior.

### Reference

John D Geanakoplos, Heraklis M Polemarchakis. *We can't disagree forever*, Journal of Economic Theory, Volume 28, Issue 1, 1982.
