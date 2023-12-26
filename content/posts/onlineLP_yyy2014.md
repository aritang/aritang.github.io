---
title: "a glimpse into prof. Ge's lab, and beyond"
date: 2023-12-26T22:16:53+08:00
draft: false
summary: Deciphering the elegance of an algorithm for online LP.
---

Today, I had the opportunity of dropping in on Prof. Ge's group meeting, where my friend Wanyu and a few other students presented their work. It was a precious opportunity to look into the lab structure of my neighboring department as well as learn from the work ethic of my peers. The conclusion is - I gotta work harder...

At the end of the talk, Professor Ye mentioned a paper of his about online LP. Here it is: I managed to read through some of its contents, and it's pretty cool.

Consider an LP in the following format:
$$
\begin{align}
\max \ & \sum_{t = 1}^n \pi_t x_t\\
s.t. \ &\sum_{t = 1}^n a_{it} x_t \le b_i, i = 1, ..., m\\
& 0\le  x_t\le 1, \forall t = 1, ..., n\\
\end{align}
$$
We simplify by considering that, for all $j$, $\mathbf a_j = {a_{ij}}_{i = 1}^m \in [0, 1]^m, \pi_j \ge 0$. In an online setting, at each time $t = 1, 2, ..., n$, the coefficients $(\pi_t, \mathbf a_t)$ are revealed, and then $x_t$ has to be chosen (and it needs to be feasible, i.e., $\sum_{j = 1}^t a_{ij} x_j \le b_i\ \forall i, t$). For online analysis, it is further assumed that ${\mathbf a_{i}}_{i = 1, ..., m}$ can be picked adversarially, but the arrival order of them is **uniformly distributed over all permutations**.

And the paper considered the *competitiveness* of the online algorithm. Let $OPT$ denote the optimal objective value for the preceding problem solved offline. We say an algorithm is *$c$-competitive* in the random permutation model if the expected value of the online solution obtained by using the algorithm is at least a $c$ factor of $OPT$, i.e.,
$$
\mathbb E_\sigma [\sum_{t = 1}^n \pi_t \tilde x_t]\ge c\cdot OPT
$$
And the model (and result!) can be generalized to when $x$ arrives in batches. Specific applications of this problem include online knapsack/secretary problem, online routing problem (in networks, for example), and online adwords problem (hmm, the smell of money). Actually, I do think live-donor kidney exchanges are a sort of online matching and can be generalized to this form, though it would lose a bit of efficiency as we structure the problem in a different context. But anyway, it's a cool paper to start with if one (well, me) has completely no idea about online algorithms...

The key idea of the algorithm is that, for $n$ large, we may take some threshold $s = \epsilon n$ and learn the (sub-optimal) dual variables $p^s$ of the revealed problem so far, and use them as (approximately good) thresholds to pick the outcomes. To be more specific, at time $s = \epsilon n$, we solve the partial linear program defined only for inputs until now:
$$
\begin{align}
\max \ & \sum_{t = 1}^s \pi_t x_t\\
s.t. \ &\sum_{t = 1}^s a_{it} x_t \le (1 - \epsilon) \epsilon \cdot b_i, i = 1, ..., m\\
& 0\le  x_t\le 1, \forall t = 1, ..., s\\
\end{align}
$$
and use its dual variable $p^s$ to decide, for the upcoming $x_{t+1}$ with $(\pi_{t + 1}, \mathbf a_{t + 1})$, its allocation:
$$
x_{t + 1}(p^s) = 
\begin{cases}
0 & \text{if } \pi_{t+1} \le (p^s)^T a_t\\
1 & \text{if } \pi_{t+1} > (p^s)^T a_t
\end{cases}
$$
To achieve the result of $c = 1 - O(\epsilon)$ or, more specifically, $1 - O(\sqrt{m \log n / B})$, a dynamic, adaptive approach is needed. This involves periodically solving for $p^s$ to adjust the dual variable threshold adaptively.

The proof idea is roughly that, if we're lucky enough to obtain $p^s = p^{\star}$ during the online process, where $p^\star$ is the optimal dual variable, our approximate solution would be close to optimal and we're done. In reality, our algorithm uses an online-solved $p^s$ as a substitute, but it is a *good* proxy for $p^\star$ – meaning that with high probability its solution is feasible and the expected value of the objective is close to $OPT$.

Btw, I have to say, [the paper-reading technique](https://aritang.github.io/posts/how_to_read_a_paper/) really works. It's such a joy reading this paper (or, maybe it's because its math and results are beautiful in the first place). Anyway, stay tuned. I will go through and write about the proof as an exercise later. Let's promise, say, within this week.
