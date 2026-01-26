---
title: "mechanism design seminar notes | week 3"
date: 2024-10-10T16:55:46+08:00
draft: false
---

### Recap of [week 2](/posts/mechanism_design_seminar_week_2/), and motivation for this week's Part I:

In an economy of $n$ agents and $m$ indivisible items, if all agents' value functions are Gross-Substitute, the economy has a Walrasian Equilibrium $(\vec S, \vec p)$. The Walrasian Tatônnement process can find the equilibrium efficiently. The allocation also maximizes social welfare.

But one subtle thing to notice about Walrasian Tatônnement is that **it *converges* to an equilibrium**. So here's another way of solving it:

## Part I: configuration LP

### Interger programming formulation

The welfare problem can be casted as the following IP:
$$
\begin{align}
W_\text{IP}:=\max & \sum_{i = 1}^n \sum_{S\subseteq [m]}v_i(S)x_{i, S} \cr
\text{s.t.} & \sum_{j\in S}\sum_{i}x_{i, S} = 1, \forall j\in [n]\cr
& \sum_{S} x_{i, S} = 1, \forall i\in [m]\cr
& x_{i, S}\in \lbrace0, 1\rbrace, \forall i\in [n], S\subset [m]
\end{align}
$$
### LP relaxation and duality

Let $W_\text{LP}$ be the corresponding linear programming relaxation for the above problem: by taking $x_{i, S}\in [0, 1]$. It can be observed that (proving using the existence of W. Eq) that when all valuations are GS, $W_\text{LP} = W_\text{IP}$.

<u>**Theorem**</u> If $(v_1, \ldots, v_m)$ admit Walrasian Equilibrium, then the configuration LP has integrality gap $1$ (i.e. no gap).

The LP has $n2^m$ variables, but only $m + n$ constraints. Usually it's easier to deal with LP with a lot of constraints but fewer variables. Therefore, take dual of the LP:
$$
\begin{align}
\text{(dual) }W_\text{LP} = &  \min\sum_{i\in [n]} u_i + \sum_{j\in [m]}p_j\cr
\text{s.t. } & u_i \ge v_i(S) - \sum_{j\in S}p_j, & \forall i\in [n], S\subseteq [m] \cr
& p_j \ge 0, u_i \ge 0,& \forall i\in [n], j\in [m] & 
\end{align}
$$

### Ellipsoid method

The dual has $\mathcal O(2^m)$ constraints and $m + n$ variables. This dual LP can be efficiently solved by using ***Ellipsoid method***, that, given a separation oracle that does the following job:

> [**<u>Separation Oracle</u>**, w.r.t. an LP]
>
> - Input: a tentative solution $\vec x$
> - Output: either $\vec x$ is feasible, or a constraint is violeted by $\vec x$.

The very first poly-time algorithm for LP is the ellipsoid method! Basically, if, exists poly-time separation oracle, exists poly-time solution for the LP.

If we look at the constraint for the dual, fix any $i$:
$$
u_i \ge v_i(S)  - \sum_{j\in S}p_j, \forall S\subseteq[m]
$$
this is essentially trying to find $u_i \ge \text{value of }D_i(S, p)$. Therefore, if we have a ***demand oracle*** w.r.t. every $i$, the LP can be solved in polynomial time.

Misc: other oracles: value oracle, demand oracle, general communication oracles.

### demand oracle

The last piece of the puzzle to solved the dual -> relaxed LP -> configuration IP.

<u>**Theorem**</u> A valuation $v$ is in GS iff. $\forall \vec p\in \mathbb R_+^m$, $D(v, \vec p)$ is given by a ***greedy*** process.

So we do have a demand oracle for GS valuations, and the LP is poly-time solvable.

## Part II: submodular valuation

Now we switch to another dimension of the problem: *submodular function maxmization subject to matroid constraints*.

### greedy for one sub-modular value function

Consider the problem of finding the maximum allocation for a single agent with subodular valuation $v(\cdot)$ and a uniform matroid constraint $\mathcal I = \lbrace S: |S|\le k\rbrace$.

> [<u>**Greedy**</u>]
>
> Initialize $S \leftarrow \emptyset$.
>
> WHILE $|S| < k$:
>
> ​	$j^* = \arg \max_j v(j | S)$
>
> ​	$S \leftarrow S \cup \lbrace j^* \rbrace$.
>
> Return $S$.

<u>**Theorem**</u> The greedy obtains $v(S) \ge (1 - \frac1e) \text{OPT}$.

> Proof sketch.
>
> Let $S_1, S_2, \ldots, S_k$ be the sets that is obtained in the steps of the greedy algorithm.
>
> To begin with
> $$
> v(S_1) \ge \frac1k \text{OPT}
> $$
> by the submodular assumption. The above can be reorganized to be in the form of
> $$
> \text{OPT} - v(S_1) \le \left(1 - \frac1k\right)\text{OPT}.
> $$
> For $1 - \frac1e$, we want a way to stuff an exponential to obtain something like $\left(1 - \frac1k\right)^k$. So, it will be nice to have, something like, for each greedy step $i\ge1$
> $$
> \text{OPT} - S_{i + 1} \le \left(1 - \frac1k\right)\left(\text{OPT} - v(S_i)\right)
> $$
> which is equivalent to
> $$
> v(S_{i + 1}) - v(S_i) \ge \frac1k (\text{OPT} - v(S_i)).
> $$
> Might as well denote the optimal as $\text{OPT} = v(S^\star)$. Observations:
>
> - $v(S^\star \cup S_i) \ge \text{OPT}$.
>
> - $v(S^\star | S_i) = v(S^\star \cup S_i) - v(S_i) \ge \text{OPT} - v(S_i)$.
>
> - At every greedy step
>     $$
>     v(S^\star| S_i) \le \underbrace{\sum_{l_i\in S^*\setminus S_i} v(l_i|S_i\cup\lbrace l_k:k< i\rbrace)}_\text{adding in $l_i\in S^\star\setminus S_i$ one by one}
>     $$
>
>
> So, there exists some $l$ such that $v(l|S_i)\ge \frac1k (OPT- v(S_i))$. Aka
> $$
> \text{(greedy) }v(S_{i + 1}) - v(S_i) \ge v(l| S_i) \ge \frac1k (\text{OPT} - v(S_i)).
> $$
> And the proof is (almost) complete.


That's all for this week. See you!
