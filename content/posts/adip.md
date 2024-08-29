---
title: "recent advance in ADIP"
date: 2023-10-31T23:12:48+08:00
draft: false
tags: ["paper"]
---

Regarding ADIP, a first-order method for solving LP, the following is an excerpt from Deng et al.'s arxiv page:

> The ADMM-based interior point method (ABIP, Lin et al. 2021) is a hybrid algorithm which effectively combines the iterior point method and the first-order method to achieve performance boost in large-scale linear programming. Different from the standard interior point method which relies on a costly Newton step, ABIP applies the alternating direction method of multipliers (ADMM) to approximately solve the barrier penalized problem. In this paper, we provide a new version of ABIP with several improvements. First, we develop some new implementation strategies to accelerate ABIP's performance for linear programming. Next, we extend ABIP to solving the more general linear conic programming and establish the associated iteration complexity of the algorithm. Finally, we conduct extensive numerical experiments in both synthetic and real-world datasets to demonstrate the empirical advantage of our developments. In particular, the enhanced ABIP achieves a 5.8x reduction in the geometric mean of run time on 105 LP instances from Netlib and it compares favorably against state-of-the-art open-source solvers in a wide range of large-scale problems. Moreover, it is even comparable to the commercial solvers in some particular datasets.

Today, a PhD student presented their research at the undergrad-kick-off workshop (pending formal name). While the method (ADMM + interior point) isn't novel, they applied performance-enhancing techniques, demonstrated some theoretical results, and tested the results on LP benchmarks. They also extended the method to tackle convex problems, which yielded promising performance.

The key highlight was that the student's method only requires decomposing the input matrix once, making it an almost "matrix-free" approach. This decomposition aims to expedite the inner ADMM iteration by reducing the condition number of the original input constraint matrix (akin to the ratio of the largest to the smallest eigenvalue).

Coincidentally, I bumped into the PhD student in the school elevator later today. He's certainly very proud of his work and quite possess some attitude. Appreciate that.
