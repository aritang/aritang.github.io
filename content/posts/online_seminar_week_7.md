---
title: "online algorithm seminar | week 8"
date: 2024-10-28T21:45:29+08:00
draft: false
---

For the suppose-to-be-continuous series of online algorithm's seminar course note (see a pervious note [here](/posts/online_seminar_week_1_n_2/)), here's a latest one.

Today's theme is ***introduction to online learning***.

## the so-called "expert setting"

There is a decision maker who makes decisions over time horizon $t = 1, 2, \ldots, T$. We expect $T\to \infty$ to be asymptotic in our analysis.

There is a set of "actions" — $\lbrace L, H\rbrace$ (assume two for now).

For any $t = 1, 2, \ldots, T$, the decision maker chooses one action $i_t \in \lbrace L, H\rbrace$. She then learns the ***loss***:
$$
l_t^L, l_t^H \in [0, 1],
$$
and suffers from corresponding loss $l_t^{i_i}$. We will use $l_t$ to refer to the vector $[l_t^i]_{i_t \in \lbrace L, H\rbrace}$ sometimes.

At the end. the decision maker obtain total loss
$$
\sum_{t = 1}^T l_t^{i_t}.
$$
Benchmark is the loss when the decision maker commit to one action throughout the process
$$
\min_i \sum_{t = 1}^T l_t^i.
$$
<u>Def</u> ***regret***:
$$
\text{Reg}(T) := \max_{l_1, \ldots, l_T}\lbrace \sum_{t = 1}^T l_i^{i_t} - \min_{i}\sum_{t = 1}^T l_t^i\rbrace.
$$
<u>Def</u> ***no-regret***:
$$
\text{Reg(T)} = o(T).
$$

## algorithms

An algorithm for the decision maker would, at every time point $t$, map known $l_1, \ldots, l_{t - 1}$ to a distribution over actions. For deterministic algorithms, the distribution set the chosen action's probability to be $1$ and others zero. 

Some more useful notations:

- In our case with two actions $\lbrace L, H\rbrace$, we may assume the algorithm is a one-dimensional function $p$ that maps history to probability of choosing $H$. More specifically, for certain algorithm ALG:
    $$
    p_t^\text{ALG} :=P[i_t = H ].
    $$

- Loss at each time period:
    $$
    f_t(p_t; l_t) := p_t l_t^H + (1 - p_t)l_t^L.
    $$

- Cumulated loss:
    $$
    F_t(\vec p) = \sum_{\tau = 1}^t f_\tau(p_\tau; l_\tau).
    $$

<u>Def</u> Follow-The-Leader (FTL). At time $t$, the algorithm chooses the action distribution that minimizes ex-post loss:
$$
p_t^\text{FTL}:= \arg\min_{p\in [0, 1]} F_{t - 1}( p\mathbf 1).
$$
Notice that becase $f$, $F$ are both linear in $p$, the optimal solution $p_t^\text{FTL} = 1$ or $0$ — that FTL is deterministic.

## regretful...

<u>Lemma</u> FTL has regret $O(T)$.

<u>Theorem</u> No deterministic algorithm achieves no-regret.

Proof tip: use FTL construction.

## no-regret

FTL and deterministic algorithms fail because they're too ***obvious*** and too ***volatile***. But FTL isn't too bad—that we can improve it by adding a ***regularizer*** that stabilizes its choice as well as add in a bit randomness:

<u>Def</u> Follow-The-Regularized-Leader (FTRL). At time $t$, the algorithm chooses the action distribution that minimizes ***regularized*** ex-post loss:
$$
p_t^\text{FTRL}:= \arg\min_{p\in [0, 1]} F_{t - 1}( p\mathbf 1) + \frac1\eta R( p).
$$
$R(\cdot)$ is strongly convex. For example, a classic choice of $R(\cdot)$ is negative entropy:
$$
R(p) = p \log p + (1 - p) \log (1 - p).
$$
In this case, $p^\text{FTRL}_t$ solves to be

{{<figure align="center" src="/wine/eq_2.jpeg" caption="" width="56%">}}

Looks familar, right?

<u>Theorem</u> By choosing $\eta$ properly FTRL can be no-regret.

To prove the theorem we need one more definition and a few more lemmas:

<u>Def</u> Be-The-Leader (BTL). At time $t$, the algorithm chooses the action distribution that minimizes loss, **knowing the current periods' loss** and history:
$$
p_t^\text{BTL}:= \arg\min_{p\in [0, 1]} F_{t}( p\mathbf 1).
$$
<u>Lemma 1</u> (Bounded regret of any FTL w.r.t. $\vec l$) For any instance $l_1, \ldots, l_T$:

{{<figure align="center" src="/wine/eq1.jpeg" caption="" width="56%">}}

Proof tip: done by proving

(i) $FTL - BTL \le \sum |p_{t + 1} - p_t|$, and

(ii) $BTL$ has regret zero (done by induction).

<u>Lemma 2</u> (When $R$ is convex enough, FTRL won't be too volatile—$p_t$ and $p_{t + 1}$ would not be too far) If $f, g$ are convex on $[0, 1]$ and $f'', g''\ge \frac 1\eta$. And if $f - g$ is $L$-Lipschitz continuous. Define
$$
p_f = \arg\min f(p),\\
p_g = \arg\min g(p).
$$
We will have $|p_f - p_g| \le \eta L$.

<u>Proof</u>

Lipschitz continuity gives:
$$
|f(p_f) - g(p_f) - f(p_g) + g(p_g)| \le L|p_f - p_g|.
$$
Convexity, minimum condition and Taylor expansion gives:
$$
f(p_g) - f(p_f) \ge \frac1{2\eta} |p_g - p_f|^2,\\
g(p_f) - g(p_g) \ge \frac1{2\eta} |p_g - p_f|^2.
$$
Concatenate the above yields $|p_f - p_g| \le \eta L$. Q.E.D.

Finally, plug in $f = F_{t}$, $g = F_{t + 1}$ and $L = 1$, we would get the distance between $FTRL$ and $BTRL$.

BTRL and no-regret benchmark though is bounded by convexity function $\frac 1\eta R(\cdot)$. So finally by picking the correct $\eta\sim\frac1{\sqrt T}$ we'll obatin sublinear regret.











