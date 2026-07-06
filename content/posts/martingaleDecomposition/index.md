---
title: "The Martingale Decomposition Step by Step"
date: 2026-07-05
draft: true
summary: "Interactive walkthrough of the four-step martingale decomposition of an additive functional, with a CLT check."
---

Every ergodic additive functional hides a martingale. Eg: 
$$
Y_{t + 1} - Y_t = \kappa (X_t, W_{t +1}).
$$
where $X_t$ is stationary & ergodic Markov State, can be decomposed into
$$
Y_t = \left(Y_0 + g(X_0)\right) + t\nu + \sum_{j = 0}^{t - 1}\kappa_m(X_{j}, W_{j + 1}) - g(X_t).
$$

###### So later we can do CLT on the time series: $1/\sqrt{N}(Y_N - N\nu) \xrightarrow{d} N(0, E[\kappa_m \kappa_m'])$.

- Let $\kappa_2(X_t, W_{t + 1})= \kappa(X_t, W_{t + 1}) - E[\kappa(X_t, W_{t + 1})\mid X_t]$

    ###### $\kappa_2$ is the direct shock hit into $\Delta Y_t$

- Let $f(X_t) = E[\kappa(X_t, W_{t + 1}) \mid X_t] - E[\kappa(X_t, W_{t + 1})]$

    Let $g(X_t) = \sum_{j = 0}^\infty E[f(X_{t + j})\mid X_t]$

    Let $\kappa_1(X_t, W_{t + 1}) = g(X_{t + 1}) - (g(X_t) - f(X_t))$

    ###### $\kappa_1$ is the indirect shock from $X_{t}$ that hit forever

Finally, obtain the martingale component by
$$
\kappa_m(X_t, W_{t + 1}) = \kappa_1 (X_t, W_{t + 1})+ \kappa_2(X_t, W_{t + 1}).
$$

-----

Here's a simulation to see the decomposition:

- $Y_{t+1} − Y_t = ν + d·X_t + F·W_{t+1}$
- $X_{t+1} = a·X_t + W_{t+1}$

We extracts a martingale in four steps.

###### Drag the parameters, resample the shock path, and watch each step of the construction update on the same draw.

{{< include "widget.html" >}}

