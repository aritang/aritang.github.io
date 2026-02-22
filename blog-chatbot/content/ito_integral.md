---
title: "Itô's Integral and Itô's Lemma"
date: 2024-05-21T11:04:14+08:00
draft: false
---

> a stochastic calculus crash course for Financial Engineering.

Building on Kolmogorov's axiomatic probability theory, define **continuous time stochastic process**, for time $\mathcal T = [0,\infty)$ a sample path is essentially
$$
\{X_t : t\ge 0\}
$$

# **Brownian Motion**

> History anecdote:
>
> In **1828**, British Botanist R. Brown observed the random movement exhibited by plant pollens suspended in water.
>
> In **1905**, A. Einstein proposed the first quantitative model of Brownian motion in terms of a Gaussian process, which explains some principles of molecular movements.
>
> In **1923**, N. Wiener developed rigorous theoretical system of Brownian motion and relevant functional structures. Wiener’s construction is basically equivalent with Einstein’s definition, and is quite close to our modern definition.

Formally, a stochastic process $\{W_t: t\ge 0\}$ is called *Brownian motion* or *Wiener process*, if satisfying

- (almost WLOG) $W_0 =0$, and it's continuous.

- **independent increments**: for $0 = t_0 < t_1 < \cdots < t_m$, the increments
    $$
    W_{t_i } - W_{t_i -1}, \forall i = 1, \ldots, m
    $$
    are mutually independent.

- **stationary increments**: for $0 \le s < t$:
    $$
    W(t) - W(s) \sim \mathcal N(0, t - s)\\ \text{ (normal distribution with \textbf{variance} $t - s$)}
    $$

### properties

- **Non-differentiable everywhere**: except for a null set (w.r.t. the probability measure), all sample paths of a Brownian motion $W_t$ are non-differentiable.

- **Unbounded variation**: except for a null set, all sample paths of a Brownian motion $W_t$ are not of ***bounded variable***. More specificallly, for any interval $[T_1, T_2]$ we'd have
    $$
    \lim_{\|\Pi\|\to 0}\sum_{j = 1}^n|W_{t_j} - W_{t_{j-1}}| = +\infty
    $$
    where $\Pi :=\{t_0, t_1, \ldots t_n\} $ is a partition of $[T_1, T_2]$​ and $\|\Pi\|$ is its *mesh*:
    $$
    \|\Pi\| :=\max_{j\in [n]}|t_j - t_{j-1}|
    $$

- **Bounded quadratic variation**: similarly, for any interval $[T_1, T_2]$ of a Brownian motion $W_t$:
    $$
    \lim_{\|\Pi\|\to 0}\sum_{j = 1}^n|W_{t_j} - W_{t_{j-1}}|^2 = T_2 - T_1
    $$
    Essentially, we can define *quadratic variation process* for any continuous random varaible of bounded quadratic variation $\{X_t, t\ge 0\}$:
    $$
    \lang X, X\rang_t := \lim_{\|\Pi\|\to 0}\sum_{j = 1}^n|X_{t_j} - X_{t_{j-1}}|^2.
    $$
    Specifically, for Brownian motion: $\lang W, W\rang_t = t$.

Because Brownian motion is not of unbounded variable, its sample path $W(t)$ is (almost) not (Riemann) integrable.

But mathematicians don't stop from here. And now

## Itô's intergral

Recall that, for Riemann integral:
$$
\int_{T_1}^{T_2}f(t)\,dt = \lim_{\|\Pi\|\to 0}\sum_{j = 1}^n f(s_j)(t_j - t_{j-1}),
$$
$s_j$ can take **any value** in between $ [t_{j-1}, t_{j}]$.

As for Itô's intergral, restricting $s_t = t_{j-1}$ for every partition in the definition can solve the integrability issue. Define Itô intergral of an $L^2$ process $\{X_t\}$:
$$
I_X(T) = \int_0^T X(t) \,dW_t:=\lim_{\|\Pi\|\to 0}\sum_{j = 1}^n X(t_{j-1})(W_{t_j} - W_{t_{j-1}})
$$
And, the limit on the RHS exists, so that the integral is well-defined. This is a stochastic integral because, basically, every sample path $X$ is a realization of the random variable, say $X(\omega)$ for some $\omega\in \Omega$. So, $I_X(T)$ is a random variable as well.

***Remark***. $W$ is a Brownian motion but can be generalized to being a semimartingale and things will work as well.

### properties | Itô's Lemma

- For a smooth function $f$, we have
    $$
    df(X_t) = f'(X_t) dX_t + \frac12 f''(X_t)d\lang X, X\rang_t
    $$

- For bivariate smooth function $f$, the process $f(W_t, t)$ satisfies
    $$
    df(X_t, t) = f_1(X_t, t)dX_t + f_2(X_t, t) dt+ \frac12 f_{11}(X_t, t)\, d\lang X, X\rang_t
    $$
    Specifically, for Brownian motion $W_t$:
    $$
    df(W_t, t) = f_1(W_t, t)dW_t + \left[f_2(W_t, t) + \frac12 f_{11}(W_t, t)\right]\,dt
    $$
    because $\lang W, W\rang_t = t$, as we've solved before.

    
