---
title: "selling information - model and bound"
date: 2024-02-13T16:37:52+08:00
draft: false
---

A paper I read recently is somewhat interesting. The model is very inspiring for an OM project I'm working on recently, whereas its mathematical method and results are immensely useful to learn from for another problem that I've been working on for a while.

> **Is Selling Complete Information (Approximately) Optimal?** 
>
> Dirk Bergemann, Yang Cai, Grigoris Velegkas, and Mingfei Zhao. 2022.
>
> *ABSTRACT*
>
> We study the problem of selling information to a data-buyer who faces a decision problem under uncertainty. We consider the classic Bayesian decision-theoretic model pioneered by Blackwell. Initially, the data buyer has only partial information about the payoff-relevant state of the world. A data seller offers additional information about the state of the world. The information is revealed through signaling schemes, also referred to as experiments. In the single-agent setting, any mechanism can be represented as a menu of experiments. A recent paper by Bergemann et al.[8] present a complete characterization of the revenue-optimal mechanism in a binary state and binary action environment. By contrast, no characterization is known for the case with more actions. In this paper, we consider more general environments and study arguably the simplest mechanism, which only sells the fully informative experiment. In the environment with binary state and m≥3 actions, we provide an $O(m)$-approximation to the optimal revenue by selling only the fully informative experiment and show that the approximation ratio is tight up to an absolute constant factor. An important corollary of our lower bound is that the size of the optimal menu must grow at least linearly in the number of available actions, so no universal upper bound exists for the size of the optimal menu in the general single-dimensional setting. We also provide a sufficient condition under which selling only the fully informative experiment achieves the optimal revenue.
>
> For multi-dimensional environments, we prove that even in arguably the simplest matching utility environment with 3 states and 3 actions, the ratio between the optimal revenue and the revenue by selling only the fully informative experiment can grow immediately to a polynomial of the number of agent types. Nonetheless, if the distribution is uniform, we show that selling only the fully informative experiment is indeed the optimal mechanism.

Here's a brief summarize of the model used, and a few commentaries. 

[WRITE it]

Consider a decision game of uncertainty. There are $n$ possible states and $m$ actions with each  combination $i\in [n], j\in [m]$ yields outcome $u_{ij}$, which is universally known. Denote the matrix of $u_{ij}$ as $U$. States are unknown aprior known and **buyer has a private belief (prior)**, denoted as $\mathbf \theta\in \R^{n-1}$ where $\theta_i$ is the probability for state $i ,i = 1, ..., n-1$ to occur (notice that for $i = n $, probability is given bby $1 - \sum_i \theta_i$, hence for $n$ states, a vector of $n - 1$ dimensions suffices).

The sold information, or an **experiment** $\mathbf E$ as described in the paper, is a signaling scheme that the seller commit to. It can be described as a matrix $\pi \in \mathbb R^{n\times m}$ where $\pi_{ij}$ corresponds to when state is $i$, action $j$ is recommended (revelation principle). After receiving an recommendation, say, action $k\in [m]$, the buyer updates his belief to a posterior, according to Baye's law:
$$
P[w = i|k, \theta] = \frac{\theta_i \pi_{ik}}{\sum_{l\in [n]} \theta_l \pi_{lk}}, \forall i = [n]
$$
and decides the best action using the posterior:
$$
a(k|\theta) = \arg\max_{j\in [m]} \frac{\sum_{i\in [n]}\theta_i \pi_{ik}u_{ij}}{\sum_{i\in [n]} \theta_i \pi_{ik}}.
$$
A given experiment $\mathbf E$ yields expected utility for type $\theta$ to be $V_\theta(\mathbf E) = \sum_{k\in [m]} \max_{j\in [m]}\{\sum_{i\in [n]} \theta_i \pi_{ik} u_{ij}\}$.

Then, a mechanism to ilicit information $\theta\in \Theta$ can be described as a pair of matching $\{E(\theta), t(\theta)\}_{\theta \in \Theta}$, where $E(\theta)$ is the experiment buyer gets allocated and $t(\theta)$ is the payment. The mechanism's IR/IC constraints can be defined pretty intuitively thereof.

The paper studies the scenario when it is assumed that $\theta$ drawn out of some given distribution, and attempt to approximate the optimal revenue when selling for completel information. The result is that, under binary state with $m$ actions, the optimal revenue is $O(m)$ times the revenue of simply selling full information. And, selling a menu of semi-informative experiments can achieve constant approximated revenue of optimal selling.

Will read the math details and literature reviews and write an update later, say, hopefully within this week. Chao.

### ref.

Dirk Bergemann, Yang Cai, Grigoris Velegkas, and Mingfei Zhao. 2022. Is Selling Complete Information (Approximately) Optimal? In Proceedings of the 23rd ACM Conference on Economics and Computation (EC '22). Association for Computing Machinery, New York, NY, USA, 608–663. https://doi.org/10.1145/3490486.3538304
