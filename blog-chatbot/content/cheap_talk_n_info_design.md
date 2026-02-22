---
title: "A Unified Modeling Perspective to Compare Cheap Talk and Information Design"
date: 2025-10-28T20:07:16-05:00
draft: false
---

Consider the information game with one sender, one receiver, defined by
$$
\lang \Omega, M, A, \mu_0, v, u\rang
$$
where

- $\Omega$ is the state of the world
- $M$ is the space of messages
- $A$ is receiver's action
- $\mu_0$ is the prior
- Sender's payoff $v:A\times \Omega \to \R$
- Receiver's payoff: $u:A\times \Omega \to \R$.

Sender's strategy $\sigma:\Omega \to \Delta(M)$. Receiver's strategy $\rho: M\to \Delta (A)$

A **Cheap Talk** Game proceeds as follows:

1. Nature draws $w\sim \mu_0$
2. Sender observes $w$
3. Sender sends $m$
4. Receiver observes $m$
5. Receiver chooses $a$.

A **Bayesian Persuation** Game proceeds as follows:

1. Sender chooses $\sigma:\Omega \to \Delta M$
2. Nature draws $w\sim \mu_0$
3. Receiver observes $m, \sigma$
4. Receiver chooses $a$.

With a tiny abuse of notation, define as $U(\sigma, \rho)$, $V(\sigma, \rho)$ as the payoff of receiver/sender when they play $\sigma, \rho$. Basically,
$$
\begin{align*}
U(\sigma, \rho) := \sum_{w, m, a} \mu_0(w)\sigma(m\mid w)\rho(a\mid m)u(a, w),\cr
V(\sigma, \rho) := \sum_{w, m, a} \mu_0(w)\sigma(m\mid w)\rho(a\mid m)v(a, w).\cr
\end{align*}
$$
Now,

> $(\sigma^\star, \rho^\star)$ is a (perfect bayesian) cheap talk equilibrium [in other words, $V(\sigma^\star, \rho^\star)$ is attainable payoff for sender] iff,
> $$
> \begin{align*}
> U(\sigma^\star, \rho^\star) \ge U(\sigma^\star, \rho'), \forall \rho',\cr
> V(\sigma^\star, \rho^\star) \ge V(\sigma', \rho^\star), \forall \rho'.
> \end{align*}
> $$

> $V(\sigma, \rho^\star)$ is attainable payoff for sender in information design if
> $$
> U(\sigma, \rho^\star) \ge U(\sigma, \rho'), \forall \rho'.
> $$

So cheap talk is almost a Cournot-ish equilibrium whereas info design has more of a Stackleberg flavor. Or, I feel like cheap talk equilibrium is somewhat of a saddle point and info design is the dual feasible solution of the same problem. 

Question: How to characterize it this way?

---

Some other interesting stuff from the info design class:

### Analytically Tractable Cheap Talk Models

Some trivias: Every cheap talk game has a trivial *babbling* equilibrium where the sender sends whatever and the receiver do as if the sender doesn't exists. Moreover, if the conditions 

> (i) $a^\star(m) := \arg\max_{a\in A}\mathbb E[u(a, w)\mid m]$ is single-valued 
>
> (ii) $v(a, w) \equiv v(a)$ 
>
> (iii) $v(a)\ne v(a')$ for $a\ne a'$

Then every equilibrium of a cheap talk game is babbling. However, it is NP-Hard to solve for a nontrivial equilibrium for general cheap talk game. Loosely speaking there are 2 widely known tractable cheap-talk models:

(1) **Uniform-Quadratic**: $\Omega = [0, 1]$, $A = [0, 1]$, $\mu_0:w\sim \text{Uni[0, 1]}$. Fix $b > 0$> Sender's payoff $v(a, w) = -(a - w - b)^2$, receiver payoff $u(a, w) = -(a - w)^2$. Like a guessing game where the sender is slightly biased.

(2) **Transparent Motives**: for general cheap talk game, assume $v(a, w) \equiv v(a)$. Now sender's achievable payoff from the game's equilibrium can be obtained by evaluating at the prior of the **quasiconcavification** of sender's payoff function. Formally, denote as $V:\Delta \Omega \to \R$ the sender's payoff function at belief $\mu$ when he does nothing:
$$
V(\mu) := \sup\lbrace v(a) : a\in  \arg\max_{\hat a\in \Delta A}\mathbb E_{\mu}[u(\hat a, w)]\rbrace 
$$
Quasi-concavify $\hat V(\cdot)$ to obtain $\bar V(\cdot)$. Then, sender's highest attainable utility from Cheap Talk game equilibrium at prior $\mu_0$ is $\bar V(\mu_0)$.
