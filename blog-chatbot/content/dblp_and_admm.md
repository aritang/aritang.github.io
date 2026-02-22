---
title: PDLP and ADMM on LP"
date: 2023-10-30T22:42:29+08:00
draft: false
---

Everyone is familiar with linear programming (LP) and its possibly NP-hard simplex algorithm. Additionally, there are interior-point methods and more. Recent advancements in the field are aimed at handling large-scale LP problems that necessitate parallel processing.

One approach is the PDHG (Primal Dual Hybrid Gradient) method, a first-order optimization method for large-scale LP. Another intriguing method is the second-order ADMM. While the PDHG method is straightforward in its core concept, it employs numerous heuristic techniques, some of which have solid theoretical foundations, to expedite the optimization process. These include step size selection, adaptive restarts, primal weight updates, and more.

I've heard a friend complain that "most commercial solvers still rely on the simplex method, and their parallel computing capabilities are lacking." It appears that there's an opportunity here; perhaps someone at Gurobi or COPT is already addressing this issue. In any case, it's enjoyable to gain insights from my neighboring department's free seminars (hope they provide snacks someday). I'll provide updates on the ADMM later. Interestingly, I have downloaded and filed all their supplementary materials (like six or seven papers) but will possibly never read them. Hahaha.
