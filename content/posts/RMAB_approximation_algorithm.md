---
title: "Approximation Algorithm for RMAB"
date: 2025-06-22T11:45:32+08:00
draft: false
---

The paper "Approximation Algorithms for Restless Bandit Problems" by Guha, Munagala, Shi (2009) designed a $2 + \epsilon$-approximation algorithm for a special class of RMAB (Feedback MAB, and Monotone MAB). The algorithm is fundamentally different to the classical Whittle Index. The paper's analysis uses a duality-based algorithmic technique—it is vastly different compared with Weber (1988)'s proof for RMAB's asymptotic optimality, hence the $2 + \epsilon$ approximation outcome doesn't requires asymptotic.

## Feedback MAB

The paper considers a subclass of RMAB problem, termed as the Feedback MAB. It has $n$ independent arms. The decision maker pulls one arm at each time point. Reward criteria is averaged total rewards. 

> ### *Note on the reward criteria: for RMAB*
>
> The sister of RMAB: **the *MAB* problem—with the key assumption that arms' states remains the same when idled**—is interesting only in the **discounted reward** setting (this is a nontrivial argument that requires another blog ;). The Gittin's Index Policy is optimal for it.
>
> On the contrary, theoretical analysis for RMAB all use the (averaged) total reward. This is because Whittle's Index is developed with intention to max reward over the long run. Using average total reward criteria, the analysis can tolerate a few mistaken actions. However, if using the discounted reward setting, especially if discount factor $\beta < 1$ is not close enough to $1$—a few mistakes in the first few rounds will hamper optimality. So while in simulation numbers are similar for different reward criterias (when scaled properly), the optimality analysis under discounted reward criteria can't go through for RMAB.

### State

Each arm $i$ has two (good/bad) states $\lbrace g_i, b_i\rbrace$, that are non-observable until the arm is pulled. The good state $g_i$ yields $r_i$ rewards when pulled. The bad state $b_i$ yields no reward. Let $s_{it}$ denote the state of arm $i$ at time $t$. Transition between states are given as follows (notice that transition of good/bad states is irrelevant w.r.t. actions)
$$
\begin{align*}
\text{bad to good}:&\quad\Pr[s_{i(t + 1)} = g \mid s_{it} = b] = \alpha_i,\cr
\text{good to bad}:&\quad\Pr[s_{i(t + 1)} = b \mid s_{it} = g] = \beta_i.
\end{align*}
$$
The good/bad state of arms are **non-observable** until the arm is pulled. So from the perspective of any policy, this Feedback MAB problem is de facto an Restless-MAB (RMAB). The de facto state in the RMAB of any arm encodes the belief over its state w.r.t. history, and can be represented as $(s, \tau)$:  which denote the last observed $\tau\ge 1$ steps (the last time the arm was pulled) and the state it was in $s\in \lbrace g_i, b_i\rbrace$.

The state transition dynamic of the RMAB can be characterized as follows:

- If the arm is not pulled, last observed state $s$ remains the same, and $\tau \to \tau+1$.

- If the arm is pulled, $\tau$ refreshes to $0$. The probability ($v_{it}$/$u_{it}$) of observing the good state $g_i$ depends on the last observed state ($b_i$/$g_i$) and the amount of time $t$ the arm is left to evolve on its own:
    $$
    \begin{align*}
    & v_{it}  := \frac{\alpha_i}{\alpha_i + \beta_i}(1 - (1 - \alpha_i -\beta_i)^t) & \text{last observed state is $b_i$}\cr
    & u_{it}  := \frac{\alpha_i}{\alpha_i + \beta_i} + \frac{\beta_i}{\alpha_i + \beta_i}(1 - \alpha_i -\beta_i)^t & \text{last observed state is $g_i$}
    \end{align*}
    $$
    *Note*: the above expressions for $v_{it}, u_{it}$ can be verified to be correct using induction, if you want to try.

Reward for the RMAB is defined as the expected reward obtained from the pulled arm. It suffices to just think over it, but I'll leave the compact (and confusing) formal definition here:
$$
\text{(RMAB Reward)} \quad R_i(s, t\mid a = 1) := r_i\times (\mathbb I\lbrace s = b_i\rbrace v_{it} + \mathbb I\lbrace s = g_i\rbrace u_{it}).
$$

## Whittle LP and Simplifications

Fix any policy running the RMAB problem over an infinite time horizon, at each time point the reward of an arm $i$ can be sufficiently represented by its (state-action) played on it. The **Whittle LP** is fomulated on variables representing the **fraction of time steps** of the arm $i$ being in every (state-action) event. Denote as $x_{st}^i $ (resp. $y_{st}^i$) as the fraction of time steps of an arm in state $(s, t)$ and is pulled (resp. idled),

{{<figure align="center" src="/online/whittle_og.jpeg" caption="" width="100%">}}

*Note*: $(1)$ is budget constraint, $(2) - (5)$ are probability constraints.

Note that $y_{st}^i = \sum_{\tau > t}x_{st}^i$. We can hence replace all $y$ variables, and the last two transition constraints above collapse into the same constraint (which is a common property you can expect in most RMAB's Whittle LPs). And we have the following significantly clearer and natural LP formulation to work on, that later will leverage the structure of the Whittle LP to give a lot of surprising results:

{{<figure align="center" src="/online/whittle_simplified.jpeg" caption="" width="100%">}}

Fix a Lagrangean multiplier $\lambda$ for the budget constraint, we penalize it to the objective and formulate the following Lagrangean:

{{<figure align="center" src="/online/LPLagrangean.jpeg" caption="" width="100%">}}

And the dual of the $\texttt{LPLagrange($\lambda$)}$ is


$$
(\texttt{Dual($\lambda$)}) 
\quad 
\begin{align*}
\min \quad & \lambda + \sum_{i \in [n]}h_i\cr
s.t. \quad & \lambda + th_i \ge r_i - (1 - u_{it}) p_i, & \forall i\in [n], t \ge 1\cr
& \lambda + th_i \ge v_{it} p_i & \forall i\in [n], t \ge 1\cr
& h_i \ge 0 & \forall i\in [n]
\end{align*}
$$

### Analyzing LPLagrange and its dual

The following parts will be dry but useful. Basically, we want to develop the closed form optimal policy for $\texttt{LPLagrange($\lambda$)}$—which are independent across arms. Based on which we will then derive the index algorithm.

Forget about the original LP ($\texttt{Whittle}$) for a moment. First, look at the objective of $\texttt{LPLagrange($\lambda$)}$:
$$
\lambda + \sum_{i = 1}^m \sum_{t\ge 1}(r_i x_{gt}^i - \lambda(x_{gt}^i + x_{bt}^i))
$$
It can be interpreted as, whenever each arm is played, a penalty $\lambda$ is incurred to the reward. The goal is to max expected reward minus cost of pulling arms, with no budget constraint.

$\texttt{LPLagrange($\lambda$)}$ and its $\texttt{Dual($\lambda$)}$ are de facto, disjoint in arms—they yields $n$ disjoint max (min) problems, one for each arm $i$. And the $\texttt{LPLagrange($\lambda$)}$ and $\texttt{Dual($\lambda$)}$.

> **Lemma 2.4 (informal)** Fix $\lambda$, the **optimal policy** solved from $\texttt{LPLagrange($\lambda$)}$ (and its $\texttt{Dual($\lambda$)}$) has the following special property:
>
> - If an arm $i$ was just observed in state $g_i$, pull the arm.
> - If an arm $i$ was last observed in state $b_i$, wait $t_i^\star(\lambda)$ steps and play the arm.

Lemma 2.4 is obtained from analyzing the complementary conditions between $\texttt{LPLagrange($\lambda$)}$ and its dual, and using $v_{it}, u_{it}$'s monotonicity on $t$. Lemma 2.4 here is pretty so nice that we can basically untangle this RMAB's optimal policy in closed form. Consider every arm $i$, fix playing the optimal policy, its dynamic can be characterized by a markov chain illustrated in the following picture:

{{<figure align="center" src="/online/state_markov_chain.jpeg" caption="The Markov chain describing the optimal policy: it has $t_i^\star(\lambda) + 1$ states which denote $s, 0, 1, 2, t_i^\star(\lambda) - 1$. The state $s$ corresponds to the arm being last observed in the state $g$, and state $j  = 0,\ldots,  t_i^\star(\lambda) - 1$ corresponds to the arm being observed in state $b$ just $j$ times ago. The transition prob from state $j$ to $j + 1$ is 1, from state $s$ to $j = 0$ is $\beta_i$, from state $t - 1$ to $s$ is $v_{it}$ and $t\to 0$ is $1 - v_t$." width="88%">}}

The markov chain above is easy to solve and give the following nice closed-form solution to the average reward of the optimal policy solved for $\texttt{LPLagrange($\lambda$)}$:

> **Lemma 2.5**
>
> Suppose playing an arm like this:
>
> - If an arm $i$ was just observed in state $g_i$, pull the arm.
> - If an arm $i$ was last observed in state $b_i$, **wait** $t$ steps and play the arm.
>
> Every arm $i$ will yield the following reward $R_i(t)$:
> $$
> R_i(t) = r_i\frac{v_{it}}{v_{it} + t\beta_i},
> $$
> and expected rate of play
> $$
> Q_i(t) = \frac{v_{it} + \beta}{v_{it} + t\beta_i}.
> $$
> where, recall $v_{it} = \frac{\alpha_i}{\alpha_i + \beta_i}(1 - (1 - \alpha_i -\beta_i)^t)$ is the probability of an arm being in state $g_i$ when $t$ times ago it was last observed in $b_i$ state.

Using Lemma 2.5, if we plug in the optimal solution's optimal wait-time $t_i^\star(\lambda)$ from Lemma 2.4—we obtain optimal reward $R_i(t_i^\star(\lambda))$ and wait time $Q_i(t_i^\star(\lambda))$. And the optimal objective reward for $\texttt{LPLagrange($\lambda$)}$ is:
$$
\lambda + \sum_{i\in [n]}\left(R_i(t_i^\star(\lambda)) - \lambda Q_i(t_i^\star(\lambda))\right).
$$
Note: the monotonicity of $R_i(t)$ is really important—it's increasing in $t$.





