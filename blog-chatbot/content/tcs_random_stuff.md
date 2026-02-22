---
title: "Theoretical Computer Science (TCS) Special Column"
date: 2025-04-11T00:19:46+08:00
draft: false
---

My undergraduate advisor Pinyan Lu has published a special introductory column for theoretical computer science in the *Communication of CCF* (China Computer Federation). The Chinese version is available [here](https://mp.weixin.qq.com/s/-s3rpAhGOJRCquvz7wOvew).

TCS field is not only home to many powerful tools (and brilliant minds), but it also boasts a beautiful, elegant philosophical methodology—a way of thinking that is deeply fundamental. Snippets from the article:

> [TCS has] its unique internal way of thinking. I believe that most work in theoretical computer science follows a three-step pattern:
>
> 1. Define **X** formally and strictly.
> 2. Prove what can be done with **X** (the feasible problems).
> 3. Prove what cannot be done with **X** (the infeasible problems).
>
> As long as **X** relates to computation, information, communication, or similar topics, it is considered a relevant research area in theoretical computer science. For example:
>
> - When **X** is replaced with “computation,” we get computability theory. The formal definition of computation is achieved through Turing machines. We can prove some problems are solvable by Turing machines, and more importantly, prove that other problems, like the Halting Problem, cannot be solved by Turing machines.
> - When **X** is replaced with “efficient computation,” we get complexity theory, which is a core component of modern theoretical computer science.
> - When **X** is replaced with “learning,” we get machine learning theory. One formal definition of learning is Leslie Valiant’s Probably Approximately Correct (PAC) learning model, which allows us to discuss which concepts can be learned and which cannot.
> - When **X** is replaced with “unlearnability,” we get cryptography. Even if a third party intercepts ciphertext or eavesdrops on a communication, they cannot glean any private information.
>
> In general, most work in theoretical computer science does follow the three-step pattern described above. For **X**, there are often intuitive concepts or examples from practical applications that suggest some problems are feasible. However, without a strict formal definition, we cannot prove which problems are infeasible. **For theoretical research, a good definition is crucial; a less-ideal definition can make one of the two subsequent questions “trivial.” For instance, if a definition is too weak, you might end up solving everything trivially within that definition; if the definition is too strong, any interesting problems might become infeasible.** Therefore, having an appropriate definition is very important.

Additionally, there is something I find interesting but am not yet fully familiar with:

> ### Iterative Algorithms and Local Search Algorithms
>
> For iterative and local search algorithms, we haven’t yet provided a clear explanation for why they cannot solve NP-complete problems. **These algorithms start from an initial state or solution and iteratively update the current state or solution based on certain rules, continuing until a termination condition is met.** Examples include the simplex method for linear programming, the Expectation-Maximization (EM) algorithm in machine learning, and Newton’s method in numerical computation. These algorithms are notable for their general applicability—they can be applied to many different problems with little need for sophisticated design. Of course, apart from a few successful examples, the theoretical analysis of these algorithms is far more difficult than greedy algorithms or dynamic programming.
>
> For combinatorial algorithms, the running time is usually relatively stable across inputs of the same size, or at least predictable and easier to estimate. In contrast, the state or solution space of iterative and local search algorithms is generally exponential in size. Can such an algorithm reach its termination condition in polynomial time? This is a very challenging question. Understanding these algorithms better from a theoretical perspective has become a major focus in recent algorithmic research. For example, the worst-case running time of the simplex method for linear programming is exponential, but it performs well in practice. Why is that? Spielman and Teng introduced the idea of smooth analysis, which provides an explanation. Essentially, if the worst-case instances are sparse and unstable within the possible input space, a slight disturbance can turn them into instances with much shorter running times.
>
> There are many algorithms like this, including the Markov Chain Monte Carlo (MCMC) method and belief propagation algorithms commonly used in statistical physics and machine learning. For MCMC, many mathematical tools have been developed to analyze under what conditions they quickly reach a stable distribution. Some of my work over the past few years aims to use related mathematical tools to prove that under certain conditions, belief propagation algorithms converge rapidly to the correct solution. Although these mathematical tools can only analyze a subset of MCMC and belief propagation algorithms, and many unsolved problems remain (especially for other iterative and local search algorithms), I believe that gaining a deeper understanding of these algorithms and developing new mathematical tools to analyze them is an important direction in current theoretical computer science. This is because many of these algorithms are not designed by humans but arise naturally from the dynamics of systems such as biological evolution and social game theory, which exhibit iterative and local adjustment behaviors. The mathematical tools we develop could also be used to analyze such dynamic systems.

So, when will I finally sit down and read that long-overdue textbook on algorithms?
