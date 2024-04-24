---
title: "Bandits - background"
date: 2024-04-24T19:22:10+08:00
draft: false
---

Consider a decision problem where you have a collection of $\mathcal L$ papers to read before your next week's meeting with your advisor. For each paper $l \in \mathcal L$, you can estimate its relevance and quality, represented as a potential intellectual reward $r_i$, modeled by a probability distribution $F_i(\cdot)$. $r_i$'s value is only learnt and acquired after you thoroughly read through the paper. Additionally, each paper comes with an uncertain reading time $t_i$, modeled by another distribution $G_i(\cdot)$. Notably, you have the flexibility to start reading a paper, pause and switch to another, and return to it later, adapting your reading strategy as needed.

This scenario presents a sequential allocation problem, where you aim to optimize your reading schedule to maximize intellectual return. Such problems can be effectively modeled using a **Markov decision process (MDP)**, a robust framework for handling decisions that unfold over time.

In general, in an MDP, one navigate through a series of states, with the probability of transitioning to the next state depending on the current state and the action taken–at each stage, one have several actions available, and the choice of action influences both the next state of the system and the immediate reward received. The objective is to devise a strategy that maximizes the total expected reward, which we refer to as the *payoff*. For now, we study MDP with an infinite time horizon where future rewards are discounted (to ensure that the sum of rewards remains finite).

A ***Bandit process*** is a special type of Markov decision process. There's a *countable state space $E$* and space of ***action*** is to be chosen from a set of two ***controls*** $\{0, 1\}$. Consider at time $t$ where state is some $x_t\in E$. Conventionally, control $0$ refers to *freezing* the state (taking no action, eg. not reading the paper) hence no reward is obtained, while control $1$ corresponds to the '*continuation* control' (i.e. reading the paper) that yields reward $r(x_t)$ and triggers state transition to $y$ according to probability $P(y|x_t)$. A *policy* is any (possibly randomized) rule that for each decision time $t$, specifies the control $\{0, 1\}$ to be applied as a function of $t$, $x_t$ (the state at time $t$), the set of previous decisions and states. The most general policy that relies on all historical information but not the future ones is *past- measurable*. A policy which maximizes the expected total reward over the set of all policies for every initial state will be termed an *optimal* policy. *Deterministic* policies are those which involve no randomization. *Stationary* policies are those which involve no explicit time dependence. *Markov* policies are those for which the control chosen at time t depends only on $t$ and the state at time $t$. As for reward, it's defined as the summation of discounted rewards over time, of course, viewed from period $t = 1$ at the beginning:
$$
\mathbb E \sum_{i = 1}^{\infty} a^t r(x_t)
$$
Now consider a decision problem with $n$ available independent bandit processes $B_1, . . . , B_n$. The state of the decision process is the vector of states $ξ = (ξ_1,...,ξ_n)$ and is a member of the product space $E = E_1 \times \cdots \times E_n$. If at decision time $t$ we choose to apply the continuation control to $B_i$, which is in state $ξ_i$, then a reward $r_i(ξ_i)$ is obtained from it. Standard dynamic programming gives us the solution over all past-mesuarable policies $\pi$:
$$
\begin{align}
V(\xi) & = \sup_{\pi}\mathbb E\left[ \sum_{t = 0}^\infty a^t r_{i_t}(\xi_{i_t}(t)) \bigg | \xi(0) = \xi \right]\\
& = \max_{i\in [n]}\{r_i(\xi_i) + a\sum_{y\in E_i}P_i(y|\xi_i)V(y, \xi_{-i})\}
\end{align}
$$
btw, $\xi_{-i} = [\xi_1, \ldots, \xi_{i - 1}, \xi_{i + 1}, \ldots, \xi_n]$. And the above process, unfortunately, is computationally infeasible for even moderate sizes of $|E|$ and $n$.
