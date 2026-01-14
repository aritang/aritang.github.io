---
title: "Approximation Algorithm for RMAB"
date: 2025-06-22T11:45:32+08:00
draft: false
---

The paper "Approximation Algorithms for Restless Bandit Problems" by Guha, Munagala, Shi (2009) designed a $2 + \epsilon$-approximation algorithm for a special class of RMAB ("Feedback MAB", and generalized to "Monotone MAB"). The algorithm is fundamentally different to the classical Whittle Index. The paper's analysis uses a duality-based algorithmic technique—it is vastly different compared with Weber (1988)'s proof for RMAB's asymptotic optimality, hence the $2 + \epsilon$ approximation outcome doesn't requires asymptotic.

Link to the paper: https://arxiv.org/pdf/0711.3861

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

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/whittle_og.jpeg" caption="" width="100%">}}

*Note*: $(1)$ is budget constraint, $(2) - (5)$ are probability constraints.

Note that $y_{st}^i = \sum_{\tau > t}x_{st}^i$. We can hence replace all $y$ variables, and the last two transition constraints above collapse into the same constraint (which is a common property you can expect in most RMAB's Whittle LPs). And we have the following significantly clearer and natural LP formulation to work on, that later will leverage the structure of the Whittle LP to give a lot of surprising results:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/whittle_simplified.jpeg" caption="" width="100%">}}

Fix a Lagrangean multiplier $\lambda$ for the budget constraint, we penalize it to the objective and formulate the following Lagrangean:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/LPLagrangean.jpeg" caption="" width="100%">}}

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

### Analyzing $\texttt{LPLagrange($\lambda$)}$ and $\texttt{Dual($\lambda$)}$:

The following parts will be dry but useful. Basically, we want to characterize the optimal policy and optimal reward for $\texttt{LPLagrange($\lambda$)}$in **close form**. This would motivate the design of the index policy later as well as proving its approximation.

> **Lemma 2.4 (Optimal Policy for $\texttt{LPLagrange($\lambda$)}$)**
>
> Fix $\lambda$, the **optimal policy** solved from $\texttt{LPLagrange($\lambda$)}$ (and its $\texttt{Dual($\lambda$)}$) has the following special property:
>
> - If an arm $i$ was just observed in state $g_i$, pull the arm.
> - If an arm $i$ was last observed in state $b_i$, wait $t_i^\star(\lambda)$ steps and play the arm.
>
> *Proof sketch:* 
>
> To begin with, notice that $\texttt{LPLagrange($\lambda$)}$ and its $\texttt{Dual($\lambda$)}$ yield $n$ disjoint max (min) problems, one for each arm $i$​—the constraints are already disjoint in arms. Furthermore, the objective function of $\texttt{LPLagrange($\lambda$)}$ can be rewrite as
> $$
> \lambda + \sum_{i = 1}^m \sum_{t\ge 1}(r_i x_{gt}^i - \lambda(x_{gt}^i + x_{bt}^i))
> $$
> which can be interpreted as, whenever each arm is played, a penalty $\lambda$ is incurred to the reward.
>
> Then, to pull each arm independently, with no budget constraint (remember we penalized it into the objective), with a penalty $\lambda$ for pulling—you can almost guess that the optimal policy should be in the form described in Lemma 2.4. To formally verifying it, one can write out and analyze the first-order optimality conditions (especially, complementary slackness)—and will lead to Lemma 2.4's results above.

Using Lemma 2.4, while playing the optimal policy solved from $\texttt{LPLagrange($\lambda$)}$, every arm's dynamic can be characterized by a **markov chain** illustrated in the following picture:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/state_markov_chain.jpeg" caption="The Markov chain describing the optimal policy: it has $t_i^\star(\lambda) + 1$ states which denote $s, 0, 1, 2, t_i^\star(\lambda) - 1$. The state $s$ corresponds to the arm being last observed in the state $g$, and state $j  = 0,\ldots,  t_i^\star(\lambda) - 1$ corresponds to the arm being observed in state $b$ just $j$ times ago. The transition prob from state $j$ to $j + 1$ is 1, from state $s$ to $j = 0$ is $\beta_i$, from state $t - 1$ to $s$ is $v_{it}$ and $t\to 0$ is $1 - v_t$." width="88%">}}

Denote as $R_i(t_i^\star(\lambda))$ the average reward obtained from pulling arm $i$ when running Lemma 2.4's optimal policy, and $Q_i(t_i^\star(\lambda))$ the average time arm $i$ is pulled. The optimal objective reward for $\texttt{LPLagrange($\lambda$)}$ is:
$$
\lambda + \sum_{i\in [n]}\left(R_i(t_i^\star(\lambda)) - \lambda Q_i(t_i^\star(\lambda))\right).
$$
Furthermore, we can solve $R_i(t)$ and $Q_i(t)$ in closed form—more precisely

> **Lemma 2.5 (Optimal Reward in Closed-Form) for $\texttt{LPLagrange($\lambda$)}$**:
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
> and expected rate of pulls
> $$
> Q_i(t) = \frac{v_{it} + \beta}{v_{it} + t\beta_i}.
> $$
> where, recall $v_{it} = \frac{\alpha_i}{\alpha_i + \beta_i}(1 - (1 - \alpha_i -\beta_i)^t)$ is the probability of an arm being in state $g_i$ when $t$ times ago it was last observed in $b_i$ state.

*Note*: the monotonicity of $R_i(t)$ is really important—it's increasing in $t$.

Lastly, from strong duality, we have that for the optimal solution from $\texttt{Dual($\lambda$)}$would satisfy
$$
\lambda + \sum_i h^\star_i = \lambda + \sum_{i\in [n]}\left(R_i(t_i^\star(\lambda)) - \lambda Q_i(t_i^\star(\lambda))\right)
$$

## Index Policy

We will use the structure of the dual to facilitate the design of the optimal policy. First, solve from the original $\texttt{Whittle}$ LP we obtain $OPT$ as our approximation benchmark—note that this **upperbounds** any policy for the RMAB.

We find a $\lambda^\star$ where, the optimal solution from the $\texttt{Dual($\lambda^\star$)}$ satisfies
$$
\lambda^\star = \sum_{i\in [n]}h_i^\star
$$
And this $\lambda^\star$ and accompanied $h_i^\star$ would satisfiy
$$
\lambda^\star \ge \frac{OPT}2, \quad \sum_{i \in [n]} h_i^\star \ge \frac{OPT}2.
$$
because the optimal solution of the $\texttt{Dual($\lambda^\star$)}$, $\lambda^\star + \sum_i h_i^\star$, would always upperbounds $OPT$. Note that $\lambda$ and $h_i^\star$ that satisfy this criteria can be found in poly time.

The Index Policy, termed `BalancedIndexPolicy`, is as follows:

> Input: instance of Feedback MAB.
>
> Find $\lambda^\star$ and solve $\texttt{LPLagrange($\lambda^\star$)}$ to obtain $t_i^\star(\lambda^\star)$—the time point above which the arm last observed in state $b$ shall resumed to be pulled. Note that for some arm, $t_i^\star(\lambda^\star) = \infty$—it's never pulled.
>
> - If exists any arm $i\in S$ in state $(g, 1)$, pull it.
> - If no arm $i\in S$ is in state $(g, 1)$, play any arm $i\in S$ in state $(b, t)$ such that $t\ge t_i^\star(\lambda)$.
> - Otherwise pull no arm.
>
> *Note:* this can be constructed as an index policy.

### 2-approximation proof

We use an amortization argument, linking the reward of the optimal single arm policy with that of the index policy to show 2-approximation.

When the `BalancedIndexPolicy` runs, for any arm, we call it *blocked* if it's in state $(b, t)$ with $t\ge t^\star_i(\lambda^\star)$ (so that according to the optimal signle arm policy it's supposed to be pulled but it's not). Every arm evolves like this: when it's pulled after sometime idled—as long as it's maintained in state $(g, 1)$, the arm is continuously pulled until it turns bad $(b, 1)$ and remain idled, then perhaps blocked, until the next time it's pulled and repeat. We focus on the every sequence of period between the time the arm is first pulled til the time it's again being *blocked*. During this time that this arm is *not* blocked—either pulled or idled in $(b, t)$ for $t < t_i^\star(\lambda^\star)$—the average reward within this time block will be larger than $R_i(t_i^\star(\lambda^\star))$—as described in Lemma 2.5 above.

We will split $R_i = \lambda Q_i + h_i$ and amortize it—Since $R_i(t_i^\star (\lambda^\star)) - \lambda Q_i(t_i(\lambda^\star)) = h_i^\star$—the average reward obtained from an arm during its non-blocked time equals $h_i^\star$ plus $\lambda$ per play. 

Consider two cases for each time step, on steps where no arms is played, none of the arms is blocked—by definition the amortized reward is greater than $\sum_i h_i^\star \ge \frac{OPT}2$. When an arm is pulled—$\lambda$ is obtained. These two cases add up and finish the proof.
