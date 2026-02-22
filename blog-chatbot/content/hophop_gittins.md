---
title: "Gittins Index Closed-form Calculation"
date: 2025-06-04T14:14:27+08:00
draft: false
---

### Definition

Consider a discrete-time Bandit Process with one arm (dropping arm index $i$ for convenience): Markov state transition, binary action, reward associated with positive action (aka 'pull') denoted as $r(x(t))$ at each time point $t = 1, \ldots$ The states $x(t)$ doesn't change if the arm is idle.  And the goal is to maximize the discounted reward criteria:
$$
\text{Reward}:=\mathbb E[\sum_t \beta^t r(x(t))].
$$
($x(\cdot)$ or $x$ is state)

The Gittins Index $v(x)$ is calculated for each state $x$ as
$$
v(x) :=\sup_{\tau >0}\frac{\mathbb E[\sum_{t = 1}^\tau \beta^t r(x(t))\mid x(0) = x]}{\mathbb E[\sum_{t  = 1}^\tau \beta^t\mid x(0) = x]}
$$
Note $\tau$ is a past-measurable stopping time—so expectation is taken w.r.t. the potentially stochastic state transitions, including $\tau$.

### How is it obtained, exactly

But this gives no intuition. It would be helpful to know the process of how this compact form of Gittins Index is obtained. So let's start with the same arm, but now we charge this arm $\lambda$ for every pull.

Because state $x(t)$ doesn't change if the arm is idle—optimal policy is a stopping policy. Finding a charge $\lambda$ that makes the decision maker indifferent between pulling/idling the arm for any starting state $x(0) = x$:
$$
\lambda^\star(x): = \sup\{\lambda: \sup_\tau\{\mathbb E[\sum_{t = 0}^\tau\beta^t(r(x(t)) - \lambda)\mid x(0) = x]\ge 0\}\}.
$$
The insider condition for $\lambda$ is equivalent to
$$
\sup_\tau\{\mathbb E[\sum_{t = 0}^\tau\beta^t(r(x(t)))\mid x(0) = x] - \mathbb E[\sum_{t = 0}^\tau \beta^t\lambda\mid x(0) = x]\}\ge 0
$$
which is equivalent to
$$
\sup_\tau\{\mathbb E[\sum_{t = 0}^\tau\beta^t(r(x(t)))\mid x(0) = x]  - \lambda \mathbb E[\sum_{t = 0}^\tau \beta^t\mid x(0) = x]\}\ge 0.
$$
Finding the largest $\lambda$ such that this is satisfied, is equivalent to
$$
\lambda^\star(x) =\sup_{\tau >0}\frac{\mathbb E[\sum_{t = 1}^\tau \beta^t r(x(t))\mid x(0) = x]}{\mathbb E[\sum_{t  = 1}^\tau \beta^t\mid x(0) = x]}.
$$
And this is the Gittins Index.

### Final Note

Another way to formulate Gittins Index for an arm is to imagine a dummy arm which yields reward $\lambda$ per pull. Putting the two arms together, only one arm is allowed to be pulled at the same time. These two formulations are **exactly equivalent**. First, notice that for both formulations a stopping policy $\tau$ suffices for optimality—if it's not optimal to pull the arm now, never. The optimal reward accrued from this $\lambda$-dummy arm accompanied model is then
$$
\sup_{\tau}\{\mathbb E[\sum_{t = 0}^\tau\beta^t(r(x(t)) + \sum_{t = \tau + 1}^\infty \beta^t\lambda\mid x(0) = x]\}
$$


That we want to find $\lambda$ such that $\tau > 1$. The optimal $\tau$ remains the same if one subtract a constant
$$
\sum_{t = 0}^\infty \beta^t \lambda = \frac{\lambda}{1 - \beta}
$$
Which yields
$$
\sup_\tau\{\mathbb E[\sum_{t = 0}^\tau\beta^t(r(x(t)) - \lambda)\mid x(0) = x]\}.
$$
