---
title: "an interesting question in mechanism design course's assignment and its solution"
date: 2023-11-07T23:01:57+08:00
draft: false
summary: This exercise is designed to be accessible yet stimulating, introducing students to the process of bounding the Price of Anarchy (POA).
---

I've been a teaching assistant (TA) for a course on market mechanism design this semester, and it's been an enlightening journey as we approach its conclusion. I've gained a wealth of knowledge, and in today's blog, I want to share a simple yet thought-provoking exercise from our recent homework. This exercise is designed to be accessible yet stimulating, introducing students to the process of bounding the Price of Anarchy (POA). Let's dive in:

### Question:

> #### Background:
>
> In a selfish-routing game, consider the following theorem: the Nash Equilibrium (NE) cost of a flow with total quantity $r$ is no more than the optimal cost with total quantity $2r$, for any set of cost functions.
>
> Now, let's narrow down our focus to affine cost functions, i.e. for each edge if the flow on it is $f_e$, traversing it incurs a cost $c_e(f_e) = af_e + b$.
>
> #### Problems:
>
> ##### (i)
>
> Given any affine $c(x) = ax + b$ with $a, b \ge 0$, for any non-negative $x, x^{\*}$ show that
> $$
> x^{\*}(c(x) - c(x^{\*}))\le \frac14xc(x)
> $$
>
> ##### (ii)
>
> Under the assumption of linear costs, prove that the cost of the Nash Equilibrium flow of total quantity $r$ is at most the optimal cost of a flow loaded with $\frac54 r$.

### Solution:

> ##### (i)
>
> To verify the inequality, let's consider the difference between the right side and the left side: $\frac14 xc(x) - x^{\*}(c(x) - c(x^{\*}))$ and using the fact that $c(x)$ is affine:
> $$
> \frac 14x(ax + b) - x^{\*}(ax - ax^{\*}) = a(x^{\*} - \frac14 x)^2 + \frac 14 bx\ge 0.
> $$
>
> ##### (ii)
>
> If we "freeze" all edge costs at their equilibrium being $c_e (f_e)$, then the equilibrium flow $\{f_e\}_{e\in E}$ is the optimal flow out of all else possible flows that preserves total flow quantity. Then, consider optimal flow solution on the same network with total quantity $\frac 54 r$, denoted as $f^{\*}_e$:
>
> $$
> \sum_{e\in E}(\frac 45f_e^{\*}  - f_e )c_e(f_e)\ge 0.
> $$
> We then have
> $$
> \sum_{e\in E} f_e c_e(f_e)\le\frac45 \sum_{e\in E} f_e^{\*}c_e(f_e) = \frac45\sum_{e\in E}(f_e^{\*} c_e(f_e^{\*}) + \frac14 f_ec_e(f_e)),
> $$
> which infers:
> $$
> NE(r)\le \frac 45 OPT(\frac54 r) +  \frac15 NE(r)\Leftrightarrow NE(r) \le OPT(\frac54 r).
> $$
> I hope this exercise sparks anyone's interest in the intricacies of market mechanism design and the beauty of mathematical proofs (if you're not in this field yet). Until next time, keep it sharp and explore a little in the realms of economics and mathematics!
