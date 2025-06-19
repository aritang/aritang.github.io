---
title: "MAB UCB1 No-Regret Proof"
date: 2025-06-19T23:37:37+08:00
draft: false
summary: "This is beautiful, beautiful, beautiful!"
---

> "That was my Lo," she said, "and these are my lilies."
>
> "Yes," I said, "yes. They are beautiful, beautiful, beautiful!"
>
> — Nabokov, *Lolita* (1959)

### Definition of MAB Problem: Setting, and Solution Concepts

In its most basic formulation, a $K$-armed bandit problem is defined by random variables $X_{i, n}$" for each bandit $i\in [K]$ and any time point $n\ge 1$. Successive plays of arm $i$ yield rewards $X_{i, 1}, X_{i, 2}, \ldots$, i.i.d. from an unknown distribution with unknown mean $\mu_i$. Independence also holds across arms: i.e. $X_{i, s}$ and $X_{j, t}$ are independent (and usually not identical) for each $i\ne j$.

A policy chooses the next arm to play based on historical info. Let $T_i(n)$ denote the number of times arm $i$ has been played by the policy during the the first $n$ plays. The *regret* of the policy is defined by
$$
\text{Regret(n)}:=\max_j \mu_j\cdot  n - \sum_{j\in [K]} \mu_j  \mathbb E[T_j(n)].
$$

### Policy: UCB1

> Initialization: Play each arm once.
>
> At each successive round $n$, play arm $j$ that has the largest index:
> $$
> \bar x_j + \sqrt{\frac{2\ln n}{n_j}}.
> $$
> where $\bar x_j$ is the average reward obtained from arm $j$, $n_j$ the number of times $j$ has been pulled.

### Theorem

For MAB with $K>1$ arms, let the arms' reward be normalized to be distributed on $[0, 1]$. Denote as $\mu^*$ as the optimal arm's mean, UCB1's expected regret is at most

{{<figure align="center" src="/online/UCB1Regret.jpeg" caption="" width="66%">}}

Proof. 

One lovely thing to notice is that regret after $n$ periods is equivalent to the following form:
$$
\text{Regret}(n) = \sum_{j\in [K]}(\mu^* - \mu_j)\mathbb E[T_j(n)].
$$
So we try to upperbound sum of regret by upperbound each $T_j(n)$.

For convenience, let $c_{t, s} = \sqrt{2\ln t/s}$. So the index is convenient written in the form $\bar x + c$.

Let $l$ be an arbitrary integer.
$$
\begin{align*}
T_i(n) & = 1 + \sum_{t = K + 1}^n\mathbb I\lbrace\text{arm $i$ is pulled at $t$}\rbrace\tag{0}\cr
& \le l + \sum_{t = K+1}^n\mathbb I\lbrace\text{arm $i$ is pulled at $t$}, T_i(t - 1) \ge l\rbrace\tag{0.1}\cr
\end{align*}
$$
Arm $i$ is pulled at $t$ requires that at least this arm is better than the optimal arm:

{{<figure align="center" src="/online/UCB1Regret_ineq1.jpeg" caption="" width="100%">}}

*Note:* (0.1) has it that $l\le T_i(t - 1)< t$. Simply, $0\le s< t$. So if (1) holds for some $l\le s_i< t$ and $0<s<t$ (letting $s_i = T_i(t -1), s = T^*(i -1)$), max over LFS, min over RHS shall also hold—as the following:


$$
\max_{l\le s_i< t}\bar X_{i, s_i} + c_{t - 1, s_i}>\min_{0 < s < t}\bar X_{s}^* +c_{t - 1, s}\tag{2}
$$
Hold on, using (2), (0) is relaxed as
$$
\begin{align*}
T_i(n) & = 1 + \sum_{t = K + 1}^n\mathbb I\lbrace\text{arm $i$ is pulled at $t$}\rbrace\tag{0}\cr
& \le l + \sum_{t = K+1}^n\mathbb I\lbrace\max_{l\le s_i< t}\bar X_{i, s_i} + c_{t - 1, s_i}>\min_{0 < s < t}\bar X_{s}^* +c_{t - 1, s}\rbrace\tag 2\cr
& \le l + \sum_{t = 1}^\infty \sum_{s = 1}^{t-1}\sum_{s_i = l}^{t - 1}\mathbb I\lbrace\bar X_{i, s_i} + c_{t, s_i}>\bar X_{s}^* +c_{t, s}\rbrace\tag{3}
\end{align*}
$$
*Note:* from (2) to (3) it's done by a union bound below, and then replace $t - 1$ with $t$ which is harmless when $t$ goes large.

{{<figure align="center" src="/online/UCB1Regret_ineq2.jpeg" caption="" width="100%">}}

Now, for each $s, s_i, t$, observe that the condition $\bar X_{i, s_i} + c_{t - 1, s_i}>\bar X_{s}^* +c_{t - 1, s}$ implies one of the following must hold
$$
\begin{align*}
	\bar X_s^* & \le \mu^* - c_{t, s}\tag{i}\cr
	\bar X_{i, s_i} & \ge \mu_i + c_{t, s_i}\tag{ii}\cr
	\mu^* & < \mu_i + 2 c_{t, s_i}\tag{iii}
\end{align*}
$$

Interesting enough, let $l = \lceil (8\ln n)/(\mu^* -\mu_i)^2 \rceil \le s_i$, we can prove (iii) is always false for $s_i\ge l$, cause
$$
\mu^* - \mu_i - 2c_{t, s_i} = \mu^* - \mu_i - 2\sqrt{2(\ln t)/s_i}\ge \mu^* - \mu_i - (\mu^* - \mu_i) = 0.
$$
And the probability of $(i)$ and $(ii)$ is nicely upperbounded by Chernoff-Hoeffding bound:

{{<figure align="center" src="/online/chernoff_hoeffding.jpeg" caption="Chernoff-Hoeffding bound, Auer et al. (2002)" width="100%">}}

Translates to
$$
\begin{align*}
	\Pr[\bar X_s^* \le \mu^* - c_{t, s}] & \le e^{-4 \ln t}	=t^{-4}\cr
	\Pr[\bar X_{i, s_i} \ge \mu_i + c_{t, s_i}]& \le e^{-4\ln t} = t^{-4}
\end{align*}
$$
*Note: $s$ perfectly cancels in the exponent when taking $c_{t, s}^2/s$*.

So for each (suboptimal) arm $i$, take $l = \lceil (8\ln n)/(\mu^* -\mu_i)^2 \rceil $:
$$
\begin{align*}
\mathbb E[T_i(n)]  \le (3)& \le \bigg\lceil \frac{(8\ln n)}{(\mu^* -\mu_i)^2} \bigg\rceil + \sum_{t = 1}^\infty\sum_{s = 1}^{t - 1}\sum_{s_i = \big\lceil \frac{(8\ln n)}{(\mu^* -\mu_i)^2} \big\rceil}^{t - 1} \cr
& \quad \quad \quad \times(\Pr[\bar X_s^* \le \mu^* - c_{t, s}] +\Pr[\bar X_{i, s_i} \ge \mu_i + c_{t, s_i}])\cr
& = \bigg\lceil \frac{(8\ln n)}{(\mu^* -\mu_i)^2} \bigg\rceil + \sum_{t = 1}^\infty\sum_{s = 1}^{t - 1}\sum_{s_i = 1}^{t - 1}2t^{-4}\cr
& = \frac{8\ln n}{(\mu^* -\mu_i)^2}+ 1 + \frac{\pi^2}3.
\end{align*}
$$
Adding all of them together
$$
\begin{align*}
\text{Regret}(n) & =\sum_{j\in [K]}(\mu^* - \mu_j)\mathbb E[T_j(n)]\cr
& \le \sum_{j\in [K]} \frac{8\ln n}{(\mu^* - \mu_i)} + (1 + \frac{\pi^2}3)\sum_{j\in [K]}(\mu^* - \mu).
\end{align*}
$$

### Reference

*Finite-time Analysis of the Multiarmed Bandit Problem*. Auer, Cesa-Bianchi and Fischer (2002).

