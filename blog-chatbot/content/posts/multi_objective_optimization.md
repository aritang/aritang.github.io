---
title: "Multiobjective Optimization and Tchebycheff Scalarization (and something about Pareto)"
date: 2025-04-08T17:18:11+08:00
draft: false
---

I always like attending job talks. You learn something, be awed by cutting edge research, and from time to time, reflect on skills of academic presentations...

Today's topic is Multi-Objective Optimization (MOO). When sometimes for an optimization problem there are two or more conflicting objectives (e.g. fairness vs. efficiency), it is not guaranteed that a single solution simultaneously optimizes each objective. Naturally, we consider Pareto Efficiency as a major concept for solution—a solution where none of the objective functions can be improved in value without degrading some of the other objective values. By the way, quick overview for ***Pareto***:

> ## Pareto: from Econ to CS
>
> The **Pareto** concept originates from **Vilfredo Pareto**, an Italian economist and sociologist from the late 19th to early 20th century. He introduced the idea while studying wealth distribution in society.
>
> Pareto observed that roughly 80% of Italy’s land was owned by 20% of the population, which led to the Pareto Principle (the "80/20 rule"). The deeper theoretical contribution, though, is **Pareto Efficiency**:
>
> > A state is Pareto efficient if no individual can be made better off without making someone else worse off.
>
> Then, the term Pareto Front is picked up by OR and CS people doing multi-objective optimization, to describe the solutions that are non-dominated—
>
> > You can't improve one objective without sacrificing another.

**Genetic (Evolutionary) Algorithms** used to be popular for Multi-Objective Optimization, and is especially handy for finite feasible solutions. It starts with a population of potential solutions, and iteratively apply genetic operators like selection, crossover, and mutation to evolve the population over generations—finally, the algorithm identifies Pareto Efficient (non-dominated) solutions. "The main disadvantage of evolutionary algorithms is their lower speed and the Pareto optimality of the solutions cannot be guaranteed; it is only known that none of the generated solutions is dominated by another." See the paper "Multi-objective optimization using genetic algorithms: A tutorial" by Konak et al. for details (https://doi.org/10.1016/j.ress.2005.11.018).

But now people do it with **deep learning**—i.e. using gradient-based optimization. Usually it's taking linear combination of all the objectives and then one can use gradient-based optimization methods to find one Pareto solution. More interesting question arise when one attempt to find a set of Pareto Efficient solutions that satisfies some criteria—finite, evenly distributed, etc.

A very cool technique of MOO is Tchebycheff Scalarization. Citing one of the papers by the speaker of today:

> ## Smooth Tchebycheff Scalarization for Multi-Objective Optimization
>
> Lin et al. 2024.  https://doi.org/10.48550/arXiv.2402.19078
>
> Multi-objective optimization problems can be found in many real-world applications, where the objectives often conflict each other and cannot be optimized by a single solution. In the past few decades, numerous methods have been proposed to find Pareto solutions that represent optimal trade-offs among the objectives for a given problem. However, these existing methods could have high computational complexity or may not have good theoretical properties for solving a general differentiable multi-objective optimization problem. In this work, by leveraging the smooth optimization technique, we propose a lightweight and efficient smooth Tchebycheff scalarization approach for gradient-based multi-objective optimization. It has good theoretical properties for finding all Pareto solutions with valid trade-off preferences, while enjoying significantly lower computational complexity compared to other methods. Experimental results on various real-world application problems fully demonstrate the effectiveness of our proposed method.

