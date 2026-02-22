---
title: "a study in suspense and surprise - part I"
date: 2024-01-03T22:22:44+08:00
draft: false
summary: the model, and the principal's problem part I
tags: ["paper"]
---

Today is a dive into the modelling part of ***Suspense and Surpirse***. The paper is already concise so basically I'm just copying it from there to here... Cause I like it actually.

### The model

Consider a finite state space $\Omega$, where a typical state of the world is $w$ (it should be $\omega$ but let's save a bit typing). A typical belief is denoted by a probability vector $\mu \in \Delta(\Omega)$; $\mu^w$ designates the probability of $w$. Let $t \in \{0, 1, ..., T\}$ denote the period. Let's say, the prior is $\mu_0$.

An information policy $\tilde \pi$ is a mapping of some belief $\mu$ and current period $t$ to the distribution space $\Delta(S)$ of signals. A *belief martingale* $\tilde \mu$ is a sequence $(\mu_t)_{t = 0}^T$ s.t.

- $\tilde \mu_t \in \Delta(\Delta(\Omega))$ for all $t$, with 
- $\tilde \mu_0$ degenerate at $\mu_0$, and
- $\mathbb E[\tilde \mu_t | \mu_0, ..., \mu_{t - 1}] = \mu_{t - 1}$. A realization of the belief martingale is a *belief path* $\eta = (\mu_t)_{t = 0}^T$. Given an information policy $\tilde \pi$ and a prior $\mu_0$ to start from, they generates a stochastic path of beliefs about the state - we denote this induced belief martingale as $\lang \tilde \pi | \mu_0\rang$.

> **Lemma 1** Given any Markov belief martingale $\tilde \mu$, there exists an information policy $\tilde \pi$ that induces it, i.e. $\tilde \mu = \lang \tilde \pi | \mu_0\rang$. 

Notably, condition (iii) guarantees that the martingale is Bayesian-persuasible. A *Markov* belief martigale satisfy that $\tilde \mu_{t + 1}$ depends only on $\mu_t$. For the problem studied in the paper, it suffices to consider Markov cases, quote

> The assumption that $\tilde \pi$ depends only on the current belief and period, and thus induces a Markov martingale, is without loss of generality in the sense that memoryless policies do not restrict the set of feasible payoffs. If payoffs were not time-separable, it might be beneficial to employ history-dependent information policies which could induce non-Markov martingales.

There are two players: the agent and the principal. The agent has utility (it's framed as "preference" in the paper originallly. Hmmm, econ considerations.) of the belief path and belief martingale:
$$
\begin{align}
U_{\text{suspense}}(\eta, \tilde \mu) & = \sum_{t = 0}^{T - 1} u(\mathbb E\|\tilde \mu_{t + 1} - \mu_t\|^2_2)\cr
U_{\text{surprise}}(\eta) & = \sum_{t = 1}^Tu(\| \mu_{t + 1} - \mu_t\|^2_2
\end{align}
$$
where $u(\cdot)$ here is assumed to be some increasing, strictly concave function with $u(0) = 0$, the square-norm $\|\cdot\|_2^2$ can be generalized into weighted versions, and so does weights on time $t$. So, suspense is induced by conditional variance (on current belief $\mu_t$) over the next period's beliefs, and surprise is just a measure of the trajectory of realized believes.

The paper included some examples. Especially, the Blackjack simulation is comprehensive. But, a cooler example (that they used, yet didn't fully exploit, in my pov) would be football (well, soccer if you'd prefer). Football data has been very helpful to economics. A book called Beautiful Game Theory: *How Soccer Can Help Economics* has used the world's most popular sport to test economic theories and document novel human behavior. Basically, it modelled penalty as a zero-sum game with a 2-by-2 reward matrix, and validified randomized strategy of Nash Eq. doing econometric analysis.

### The principal's problem (part I)

The principal seeks to maximize either suspense, or surprise
$$
\begin{align}
\max_{\tilde \pi} & \ \mathbb E_{\eta \sim \lang \tilde \pi |\mu_0\rang}U_{\text{suspense}}(\eta, \lang \tilde \pi |\mu_0\rang)\cr
\max_{\tilde \pi}& \  \mathbb E_{\eta \sim \lang \tilde \pi |\mu_0\rang}U_{\text{surprise}}(\eta)
\end{align}
$$
Btw, beacuse Lemma 1 allows us to associate any belief martigale with an info-policy that induces it, we can focus on optimizing over possible martigales, instead of information policy $\tilde \pi$ in the optimization, i.e.
$$
\begin{align}
\max_{\tilde \pi}& \  \mathbb E_{\eta \sim \tilde \mu}U_{\text{suspense}}(\eta,\tilde \mu)\cr
\max_{\tilde \pi} & \ \mathbb E_{\eta \sim \tilde \mu}U_{\text{surprise}}(\eta)
\end{align}
$$
For maximizing suspense, the result is pretty neat and beautiful. First of all, say, denote each period $t$'s suspense (conditional on $\mu_t$ revealed) be $\sigma_t^2 = \mathbb E_{\{\mu_{t + 1} \sim \tilde \mu_{t + 1} |\mu_t\}} \|\mu_{t+1} - \mu_t\|^2$, the principal's problem is then, choosing a belief martigale $\tilde \mu$ (and its corresponding info-policy $\tilde \pi$ to maximize $ \mathbb E_{\tilde \mu}\sum_{t = 0}^{T-1}u(\sigma_t^2)$.

> **Lemma 2** Any suspense-maximizing info-policy is fully-revealing by the end. For any info-policy that is fully-revealing by the end,
> $$
>  \mathbb E_{\tilde \mu}\sum_{t = 0}^{T-1}\sigma_t^2 = \Phi(\mu_0)
> $$
> which is **independent** of $\tilde \mu$, hence, $\tilde \pi$, the info-policy chosen.

So it's equivalent to consider the problem like, starting from a prior $\mu_0$, the principal is endowed with a "budget of variance" $\Phi(\mu_0)$ which only depends on $\mu_0$. The problem is then to decide how to allocate variance across each period to maximize utility. And it's pretty easy to guess that, given $u$ being concave, it would be optimal to allocate variance evenly across all periods, like, keep the tension up from start to end. In fact, that's the truth as well

> **Prop. 1** A belief martingale maximizes expected suspense iff. $\mu_t \in M_t$ for all $t$, where
> $$
> M_t \equiv \{\mu|\Phi(\mu) = \frac{T - t} T\Phi(\mu_0)\}.
> $$
> The agent's expected suspense from the corresponding opt. policy is $Tu(\Phi(\mu_0)/T)$.
>
> In other words, suspense is constant over time with uncertainty declines gradually. 

Goodnight. tmrw features principal's problem part II, along with rest of the paper read.

