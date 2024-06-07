---
title: "Whittle index policy in RMAB problem | technicals"
date: 2024-06-06T23:27:58+08:00
draft: false
---

Consider an RMAB instance with $N$ arms, where each arm $i \in [N]$ has a finite state space $\mathbb{S}_i$ and can receive an action $y_i^t \in {0, 1}$ (representing not pulling or pulling the arm, respectively) at each time step $t$. The state of arm $i$ at time $t$ is denoted by $s_i^t$. Depending on the action taken, a reward $r_i(s_i^t, y_i^t)$ is accrued. As a decision maker, our objective is to maximize the averaged total reward over an infinite time horizon, under a constraint that only $B$ arms can be pulled at any time step. This setup can be formalized as follows:
$$
\max_{\pi:\:\mathbb S \to Y} \lim_{T \to \infty} \frac{1}{T} \mathbb{E} [\sum_{t = 1}^T \sum_{i\in [N]} r_i(s_i^t, y_i^t)]\\
\text{s.t. } \sum_{i\in [N]} y_i^t \le B, \forall t
$$
Consider a relaxed version where the 'hard' budget constraint is averaged over time:
$$
\max_{\pi:\:\mathbb S \to Y} \lim_{T \to \infty} \frac{1}{T} \mathbb{E} [\sum_{t = 1}^T \sum_{i\in [N]} r_i(s_i^t, y_i^t)]\\
\text{s.t. }  \frac1T\mathbb E[\sum_{i\in [N]} y_i^t ]\le B
$$
Let $\lambda$ be the Lagrangian multiplier for the relaxed budget constraint $\frac1T\mathbb E[\sum_{i\in [N]} y_i^t ]\le B$. The duality transforms into the following
$$
\min_{\lambda} \max_{\pi:\:\mathbb S \to Y}  \lim_{T \to \infty} \frac{1}{T} \left( \mathbb{E} \left[\sum_{t=1}^T \sum_{i \in [N]} r_i(s_i^t, y_i^t)\right] - \lambda \left(\mathbb{E} \left[\sum_{t=1}^T \sum_{i \in [N]} y_i^t\right] - TB\right) \right)
$$
Notice that we can decouple the above optimization problem for every arm, by leaving out the budget constraint on the outside:
$$
\begin{align}
& \lim_{T \to \infty} \frac{1}{T} \left( \mathbb{E} \left[\sum_{t=1}^T \sum_{i \in [N]} r_i(s_i^t, y_i^t)\right] - \lambda \left(\mathbb{E} \left[\sum_{t=1}^T \sum_{i \in [N]} y_i^t\right] - TB\right) \right)\\

= &  \lim_{T \to \infty} \frac{1}{T}\left(\sum_{i\in [N]}  \left( \mathbb{E} \left[\sum_{t=1}^T r_i(s_i^t, y_i^t)\right] - \lambda \mathbb{E} \left[\sum_{t=1}^T  y_i^t\right]\right) - \lambda TB\right)\\
\end{align}
$$
So, for each $i$, consider the inner maximization.
$$
\max_{\pi:\:\mathbb S_i \to Y_i}\left\{\lim_{T \to \infty} \frac{1}{T} \left( \mathbb{E} \left[\sum_{t=1}^T r_i(s_i^t, y_i^t)\right] - \lambda \left(\mathbb{E} \left[\sum_{t=1}^T  y_i^t\right] - TB_i\right) \right)\right\}
$$
Notice that, the last term $\lambda TB$ can be dropped for each individual $i$ because it's irrelevant with the inner maximization. Let:
$$
\phi_i(\lambda) :=\max_{\pi:\:\mathbb S_i \to Y_i}\left\{\lim_{T \to \infty} \frac{1}{T} \left( \mathbb{E} \left[\sum_{t=1}^T r_i(s_i^t, y_i^t)\right] - \lambda \mathbb{E} \left[\sum_{t=1}^T  y_i^t\right]  \right)\right\}
$$
The Lagrangian multiplier here now has an economic intepretation – the price charged for pulling the arm. Consider the optimal stationay policy $\pi_i^*$ for the above optimization problem. Define an arm $i$'s ***indexability***:

> **Definition** (Indexability)
>
> An arm $i$ is said to be ***indexable*** if it meets the following criteria based on the optimization of a stationary policy $\pi^*_i(\lambda)$ which maps the state space $\mathbb{S}_i$ to actions ${0, 1}$. This policy is determined by maximizing the long-term average expected reward minus a penalty for action, formulated as:
> $$
> \phi_i(\lambda) :=\max_{\pi:\:\mathbb S_i \to Y_i}\left\{\lim_{T \to \infty} \frac{1}{T} \left( \mathbb{E} \left[\sum_{t=1}^T r_i(s_i^t, y_i^t)\right] - \lambda \mathbb{E} \left[\sum_{t=1}^T  y_i^t\right]  \right)\right\}
> $$
> Define the *active set* under a penalty $\lambda$ as:
> $$
> \mathcal P_i(\lambda) :=\{s\in \mathbb S_i: \pi_i^*(\lambda)(s_i) = 1\}
> $$
> where $\mathcal{P}_i(\lambda)$ is the set of states for which the optimal policy $\pi_i^*(\lambda)$ chooses to activate (pull) the arm.
>
> For indexability to hold, the active set must satisfy the inclusion relationship:
> $$
> \mathcal P_i(\lambda_1)\subseteq \mathcal P_i(\lambda_2), \text{for all }\lambda_2 \le \lambda_1
> $$

If for an RMAB problem instance, all arms are indexable, the preceding Lagrangian relaxation followed by decoupling allows us to solve for an **index** for every state $s_i$ of arm $i$:
$$
w_i(s_i):=\inf_{\lambda}\{\lambda: s_i\in \mathcal P_i(\lambda)\}.
$$
Back to the optimization problem, that the decision maker sought pull $N$ arms, and maximizes aggregate reward subject to a budget constraint:
$$
\max_{\pi:\:\mathbb S \to Y} \lim_{T \to \infty} \frac{1}{T} \mathbb{E} [\sum_{t = 1}^T \sum_{i\in [N]} r_i(s_i^t, y_i^t)]
\quad\text{s.t. }  \frac1T\mathbb E[\sum_{i\in [N]} y_i^t ]\le B\\
$$
In his seminal work, Whittle proved that the solution for the above optimzation is equivalent to
$$
\min_\lambda \sum_{i\in [N]}\phi_i(\lambda)  - \lambda TB.
$$
And, from the Lagrangian construction process, we know that the optimal policy is obtained for every arm $i$ independently. Denote the optimal solution as
$$
\lambda^\star(B) := \arg\min_\lambda \sum_{i\in [N]}\phi_i(\lambda)  - \lambda TB.
$$
The optimal policy takes the following form: we simply pull an arm $i$ iff. $w_i(s_i)\ge \lambda^\star$. The budget constraint $\mathbb E\sum_t \sum_{i\in [N]}y_i^t\le TB$ is automatically satisfied in the long run in an average sense.
