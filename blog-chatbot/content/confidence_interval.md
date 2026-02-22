---
title: "Confidence Interval | Definition and Duality with Hypothesis Testing"
date: 2025-10-02T20:59:51-05:00
draft: false
summary: "I got perfect 4.0s for a series of advanced-level statistics courses through my undergrad. Still today during our Empirical Economics class I was spellbound by the concept of confidence interval."
---

I got perfect 4.0s for a series of advanced-level statistics courses through my undergrad. Still today during our Empirical Economics class I was spellbound by the concept of *confidence interval*.

### Confidence Interval

Suppose you have some data generating process from which you collected a bunch of data $X$. You want to estimate an unknown parameter $\beta$ (eg. the mean of the distribution, some ground truth of the data generating process).

> A *Confidence Interval* is a random variable represented in the form of a set, denote as $C(X)$. Given $\alpha\in [0, 1]$, a level $1 -\alpha$ confidence interval satisfies:
> $$
> \Pr[C_\alpha(X)\ni\beta] \ge 1-\alpha.
> $$

We might as well write $C(X):= [C_1, C_2]$. Note that by the above definition, $C(X)$ isn't necessarily unique. We may remove ambiguity by, e.g. requiring an **equi-tailed** confidence interval:
$$
\Pr[\beta< C_1] = \Pr[C_2 <\beta] = \frac \alpha 2.
$$
Then, say we have a nice function mapping the collected data to a nice estimator $B:= f(X)$ that satisfies $B \approx_d N(\beta, \frac1{n}\sigma^2)$. Then we can studentize $B$ using Central Limit Theorem:
$$
\frac{B - \beta}{S\sqrt{n}}\sim \mathcal N(0, 1)\text{ (normal distribution)}
$$
($S$ is often the *standard error* that estimates $\sigma$ from the data). Then, knowing that $\frac{B - \beta}{S\sqrt{n}}$ is normal distribution, we can obtain $(C_1^N(\alpha), C_2^N(\alpha))$ that satisfies
$$
\Pr[C_1^N(\alpha)\le \frac{B - \beta}{S\sqrt{n}}\le C_2^N(\alpha)] = 1 - \alpha
$$
So the confidence interval can be solved out in closed-form:
$$
C_\alpha(X) :=[B - C_2^N(\alpha)S\sqrt{n}, B + C_1^N(\alpha)S\sqrt{n}].
$$

### Duality with Hypothesis Testing

Fix $\alpha$, for any *hypothesis* $H: \beta = \beta_0$, define a binary function (a binary rejection rule) $R_{\beta_0}:\lbrace X\rbrace \mapsto \lbrace0, 1\rbrace$ that decides if the data collected is (almost) consistent with the hypothesis
$$
R_{\beta_0}(X) = \begin{cases}
1 & \text{if }\Pr[X]<\alpha, \text{ under }\beta = \beta_0\\
0 & \text{otherwise}
\end{cases}
$$
Then, let $C(X) \equiv\lbrace \beta_0:R_{\beta_0}(X) =0\rbrace$. $C(X)$ is a level $1 - \alpha$ confidence interval.
$$
\Pr[C(X)\ni \beta] = \Pr[R_{\beta_0}(X) =0]\ge 1 - \alpha.
$$
Which implies hypothesis tests <=> confidence interval.



