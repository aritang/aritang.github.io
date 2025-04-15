---
title: "Expectation of the Maximum Order Statistic of a Power Law Distribution"
date: 2025-04-15T13:01:53+08:00
draft: false
---

Didn't know calculating expectation would take this long...

Consider $n$ i.i.d. random variables $X_i$ drawn from Power Law distribution with support lowerbound $x_\text{min} = 1$ and the shape parameter $\alpha > 2$—in other words, the pdf of $X_i$ being
$$
f_{X_i}(x) = (\alpha - 1) x^{-\alpha },
$$
and
$$
F_{X_i}(x) =1 - x^{-(\alpha - 1)} \quad \text{ for }x \ge 1.
$$

> Btw, for the heavy-tailed distribution family, it can be more comfortable (and general) to understand random variable $X$ as
> $$
> \Pr[X > x] \sim x^{-\alpha}.
> $$
> see Ibragimov and Walden (MS'10)'s Section 3 "Heavy-Tailed Distributions" for a cooler, less intuitive way of seeing it.

Assume there are $n$ iid $X_i$ for $i = 1, \ldots, n$. Take $X_\text{(n)}:= \max_{i \in [n]}X_i$—the maximum order statistics of $[X_i]$ for $i\in [n]$ . $n$ is expected to go large. The expectation of $X_{(n)}$ can be calculated as
$$
\begin{align*}
\mathbb E[X_{(n)}] & = \int_0^\infty \Pr[X_{(n)} > t]\, \text{d}t\cr
(X_i \ge 1) \quad & = 1+ \int_1^\infty \Pr[X_{(n)} > t]\, \text{d}t\cr
& = 1 + \int_1^\infty \left[1 - \Pr[X_{(n)} \le t]\right]\, \text{d}t\cr
& = 1 + \int_1^\infty \left[1 - F^n_{X_i}(t)\right]\, \text{d}t\cr
& = 1 + \int_1^\infty \left[1 - (1 - t^{-(\alpha - 1)})^n\right]\, \text{d}t
\end{align*}
$$
Notice that
$$
(1 - t^{-(\alpha - 1)})^n = 1 +  \sum_{k = 1}^n {n\choose k} (-1)^k t^{-(\alpha - 1)k}
$$
So the integral part above becomes
$$
\begin{align*}
& \quad \quad \int_1^\infty \left[1 - (1 - t^{-(\alpha - 1)})^n\right]\, \text{d}t \cr
& = -\int_1^\infty \left(  \sum_{k = 1}^n {n\choose k} (-1)^k t^{-(\alpha - 1)k} \right)\, \text{d}t\cr
\end{align*}
$$
It's legal to swap $\int$  and $\sum$ here cause absolute cause there's absolute convergence—continuing:
$$
\begin{align*}
& \quad \quad \int_1^\infty \left[1 - (1 - t^{-(\alpha - 1)})^n\right]\, \text{d}t \cr
& = -\sum_{k= 1}^n \left(\int_1^\infty{n\choose k} (-1)^k t^{-(\alpha - 1)k}\, \text{d}t \right)\cr
& = -\sum_{k= 1}^n {n\choose k} (-1)^k \left(\int_1^\infty t^{-(\alpha - 1)k}\, \text{d}t \right)\cr
& = -\sum_{k= 1}^n {n\choose k} (-1)^k \frac1{(\alpha - 1)k - 1}. \quad \quad \text{(\*)}\cr
\end{align*}
$$
$\text{(\*)}$ becomes a bit nasty. Nevertheless, from binomial identity digged up in a really fancy math textbook:
$$
\sum_{k = 0}^n {n\choose k} (-1)^k\frac{1}{k+x} = \frac{n!}{x(x + 1)\cdots (x + n)}.
$$
So as $n\to \infty$,
$$
\begin{align}
\mathbb E[X_{(n)}] & = 1 -\sum_{k= 1}^n {n\choose k} (-1)^k \frac1{(\alpha - 1)k - 1}\cr
& = 1 -\frac1{\alpha - 1}\sum_{k= 1}^n {n\choose k} (-1)^k \frac1{k - \frac1{\alpha - 1}}\cr
& =  -\frac1{\alpha - 1} \sum_{k = 0}^n {n\choose k} (-1)^k\frac{1}{k - \frac1{\alpha - 1}} + \underbrace{1 - \frac1{\alpha - 1}}_\text{just constants}\cr
\end{align}
$$
Let $x = -1/(\alpha - 1)$ just for notation convenience.
$$
\begin{align}
& = - \frac1{\alpha - 1}\frac{n!}{x(x + 1)\cdots (x + n)} + 1 - \frac1{\alpha - 1}\cr
& = - \frac1{\alpha - 1}\frac{n!\Gamma (x)}{\Gamma(n + x + 1)} + 1- \frac1{\alpha - 1}\cr
& = \mathcal O(n^\frac{1}{\alpha - 1})
\end{align}
$$
And we're done.
