---
title: "stuck on a greedy algorithm"
date: 2023-09-24T23:34:32+08:00
draft: false
summary: Him saying, "Whose paper is it? Let me see... Hmm, well, it's very unlikely that it's him who is making a mistake Ariana..."
---

This afternoon, I had a little tête-à-tête in my office with a buddy who's a math whiz turned TCS enthusiast.

> I'm scratching my head here. The author of this paper I'm reading just casually skipped another proof. I'm starting to think they might be off track.

> Him: Whose paper is it? Let me see... Hmm, well, it's very unlikely that it's him who is making a mistake Ariana...

> Me: Fine... But let me give it a shot. Remember that time I went on a [rubbishing about authors skipping proofs and trivializing everything](https://aritang.github.io/posts/with_all_due_respect/). Yeah I know that he probably wasn't intentionally trying to baffle readers by skipping steps, but this feels a tad too speedy for me. But it's tolerable, I've seen far worse.

> Him: Perhaps he believes it's already detailed enough in terms of math deductions...

Anyway. I managed to crack it (after enduring the most dreadful gym session). It's an analysis of a tweaked greedy algorithm for an auction designed to cater to value maximizers (compared to common utility maximizers), who also comes with budget and RoS constraints.

![algo3](/conversations/algo3.jpeg)

The paper establishes that **Algorithm 3** has an approximation ratio of $1/6$ w.r.t. the optimal allocation $\mathbf x$ that maximizes revenue. Denote $\mathbf x$ and $\mathbf x^*$ as the allocations for Algorithm 3 and the optimal solution, respectively. There's a step that needs to prove
$$
\sum_{i\in A}x_{ij}^*w_{ij}\le \sum_{i\in [n]}x_{ij}^*w_{ij}\le 2W_j(\mathbf x)
$$
where $W_j(x):=\sum_{i\in [n]} p_{ij}$ is the revenue earned from object $j$, and $A\subset [n]$ is, well, some subset of agent set $[n]$. The author just claimed the above "due to the greedy property of the algorithm". Cause the algorithm itself is not a classical greedy, so I thought "hmmm, not necessarily does it hold". (all **without** a hint of complaint!) But it turns out that this is just trivial, since $w_{ij}$ is chosen greedily, and some property of $A$ guarantees that $\sum_i x_{ij}\ge \frac12$, the result holds naturally.

While I'm revisiting the paper tonight, it seems that the author actually spelled out this idea clearly in the paper. Sorry... my bad. Overall it's a smooth paper to read. The math is elegant and, I would dare say, beautiful. There are totally 10 algorithms in it and I managed to follow til no.5. Count as a progress for me.

Btw, in case anyone's curious, here's the paper ---> Lu, Pinyan, Chenyang Xu, and Ruilong Zhang. "Auction Design for Value Maximizers with Budget and Return-on-spend Constraints." *arXiv preprint arXiv:2307.04302* (2023).
