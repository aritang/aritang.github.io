---
title: "Bandits with Switching Cost"
date: 2025-06-17T11:31:42+08:00
draft: false
---

> _Multi-armed bandits with switching costs_ are a special case of the restless-bandit model.

## Setup

Consider the infinite-horizon, discounted MAB problem with

- finite state space $\mathcal S$,
- binary action set $\{0,1\}$ per arm ($1$ = pull, $0$ = idle),
- discount factor $0\le\beta<1$,
- arms evolve only when pulled (i.e. "static" when $a_i=0$),
- per-pull reward $r_i(s)$.

We now add two costs for each arm $i$:

- **switch-in cost** $c_i$: paid (once) whenever we switch **to** arm $i$,

- **tear-down cost** $d_i$: paid (once) whenever we switch **away** from arm $i$.

    *Note: both $c_i$, $d_i$ can be state-dependent*.

Our goal is to show

1.  We can WLOG absorb every tear-down cost $d_i$ into its arm’s switch-in cost.
2.  A MAB with (only) switch-in costs is a special case of a restless bandit.

## Absorbing tear-down costs

Let arm $i$ incur switch-in cost $c_i$ and tear-down cost $d_i$.  Fix any play of arm $i$: we pull it at times $t=0,1,\dots,k$, then switch away.  The total **discounted** reward is
$$
\text{Reward} = c_i + \sum_{t=0}^k \beta^t\,r_i(s_i(t)) + {\beta^{k+1}d_i}.
$$
The way to absorb $d_i$ into $c_i$ is, by constructing a single switch-in cost $\tilde c_i$ and modified reward $\tilde r_i$ so that **for every action-state history trajectory** the discounted payoff is unchanged.

Set
$$
\tilde c_i = c_i + d_i,
  \qquad
  \tilde r_i(s)
    = r_i(s)-(1-\beta)d_i.
$$
Then,

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/switching_cost_MAB.jpeg" caption="" width="100%">}}

Thus every tear-down cost has been absorbed into the initial switch-in cost plus a constant offset to the reward.

> **State-dependent costs.**  If $d_i$ (and $c_i$) depends on the state when you tear down, you can likewise absorb it by _augmenting_ each arm’s state to remember the last state.  Then modify the reward function so that
> $$
> \tilde r_i\!\bigl(s_t,s_{t-1}\bigr)
>  = r_i(s_t)
>    -\tfrac{1}{\beta}\,d_i\bigl(s_{t-1}\bigr)
>       + d_i\bigl(s_t\bigr),
> $$
> which ensures the same cancellation in the discounted sum.

## From MAB with switching costs to Restless MAB

Once all costs are “switch-in” only, we can cast the problem as a restless bandit by _adding_ each arm’s previous action to its state.  For arm $i$, define
$$
  x_i(t) = \bigl(s_i(t),\,a_i(t-1)\bigr)
  \in\mathcal S\times\{0,1\}.
$$

- If $a_i(t-1)=1$, the arm was active last period ⇒ no switching cost this period.
- If $a_i(t-1)=0$, activating now incurs $c_i$.

Thus define the RMAB reward function
$$
r_i'\!\bigl((s,\,\pi)\bigr) 
  = r_i(s)-c_i\,(1-\pi),
  \quad \pi = a_i(t-1).
$$
The transition of $x_i(t)$ is just the natural evolution of $s_i(t)$ when pulled or static otherwise, together with updating $\pi\leftarrow a_i(t)$.  This is exactly a restless bandit: each arm’s state always evolves (restlessly) in a small state-action space, and the total reward is additive across arms.

### Reference

Banks, J. S. & Sundaram, R. K. (1994). _Switching costs and the Gittins index_. _Econometrica_. doi:[10.2307/2951664](https://doi.org/10.2307/2951664)
