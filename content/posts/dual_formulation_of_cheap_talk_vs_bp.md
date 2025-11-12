---
title: "LP Characterization of Cheap Talk vs. Bayesian Persuasion Game"
date: 2025-11-07T16:22:50-06:00
draft: false
---

Another convenient way to view, compare, and solve Cheap Talk vs. Bayesian Persuasion.

### Linear-Programming Formulation: Cheap Talk vs. Bayesian Persuasion

Consider an information environment $\langle \Omega, A, M, \mu_0, u, v \rangle$ with state space $\Omega$, action space $A$, signal space $M$, prior $\mu_0$, receiver utility $u(\omega,a)$, and sender utility $v(\omega,a)$. (Let every set be finite).

Consider direct mechanisms. In general, the sender’s strategy $\sigma:\Omega \to \Delta(A)$ maps each state to a distribution over recommended actions, and the receiver’s strategy $\rho:A \to \Delta(A)$ specifies how she responds to each recommendation. 

But note that we can absorb the mixed-strategy randomness into the sender's stagey — assume that in equilibrium the receiver follows the sender's recommendation, so $\rho(a)$ is degenerate at $a$. Let
$$
x_{\omega a} = \mu_0(\omega)\sum_{a\in A}\sigma(a|\omega)
$$
denote the (ex-ante) joint probability of state $\omega$ and induced action $a$ under $\sigma$. Now under this framework we can write Bayesian Persuasion and Cheap Talk in a unified optimization framework — say we're maximizing sender's payoff:

### Bayesian Persuasion

$$
\begin{align*}
\max_{x \ge 0} \quad & \sum_{\omega,a} x_{\omega a}v(\omega,a) \cr
\text{s.t.} \quad
& \sum_a x_{\omega a} = \mu_0(\omega) && \forall \omega\cr
& \sum_\omega x_{\omega a}[u(\omega,a) - u(\omega,a')] \ge 0 && \forall a,a' .
\end{align*}
$$

### Cheap Talk

$$
\begin{align*}
\max_{x \ge 0} \quad & \sum_{\omega,a} x_{\omega a}v(\omega,a) \cr
\text{s.t.} \quad
& \sum_a x_{\omega a} = \mu_0(\omega) && \forall \omega \cr
& \sum_\omega x_{\omega a}[u(\omega,a) - u(\omega,a')] \ge 0 && \forall a,a' \cr
& \sum_a x_{\omega a}[v(\omega,a) - \mathbf 1_{\lbrace{\sum_{\omega'}x_{\omega'a'}>0}\rbrace}v(\omega,a')] \ge 0 && \forall \omega,a' .
\end{align*}
$$

Note it's interesting and perhaps nontrivial to verify that these are indeed equivalent to the OG cheap talk/Bayesian persuasion definitions. But happy Friday :) 
