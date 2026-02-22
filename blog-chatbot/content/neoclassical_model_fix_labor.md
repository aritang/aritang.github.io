---
title: "Continuous vs. Discrete Time Neoclassical Growth Model and their Connections"
date: 2025-11-05T18:37:13-06:00
draft: false
---

When I learnt the continuous time and discrete time neoclassical model, it's feels so tempting to try to put them together in a uniform view. It's not trivially easy though. And here's one way to do it.

### Continuous-Time Neoclassical Growth Model

Given $k_0$, $f(\cdot), U(\cdot)$:
$$
\begin{align*}
& \max_{\lbrace c_t\rbrace_{t\ge 0}} \int_0^\infty e^{-\rho t} U(c_t)\,\text{d}t\cr
& \text{s.t. }\dot k_t = f(k_t) - \delta k_t - c_t
\end{align*}\tag{1}
$$
Taking (appropriate) derivative of the Hamiltonian function solves this problem — in general, for any continuous-time problem in the following form:
$$
\begin{align*}
V^\star (x_0) :=& \max_{\lbrace u_t\rbrace_{t\ge 0}} \int_0^\infty e^{-\rho t} h(x_t, u_t)\,\text{d}t\cr
& \text{s.t. }\dot x_t = g(x_t, u_t).
\end{align*}
$$
then, the following first-order optimality conditions are necessary (under regularity assumptions) and sufficient (under regularity and convexity assumptions) for the path $\lbrace x_t, u_t\rbrace_{t\ge 0}$ to be optimal:
$$
\begin{align*}
& \text{let } H(x, u, \lambda) = h(x, u) + \lambda^Tg(x, u)\cr
& \text{FOCs}:\begin{cases}H_u(x_t, u_t, \lambda_t) = 0\cr
\dot \lambda_t = \rho \lambda_t - H_x(x_t, u_t, \lambda_t)\cr
\dot x_t = H_\lambda (x_t, u_t, \lambda_t) = g(x_t, u_t).
\end{cases}
\end{align*}
$$
For $(1)$, the first order optimality conditions are
$$
(1)'s\text{ FOCs}:\begin{cases} 
U'(c_t) = \lambda_t\cr
\dot \lambda(t) = \rho\lambda_t - \lambda_t(f'(k_t) - \delta)\cr
\dot k_t = f(k_t) - \delta k_t - c_t.
\end{cases}
$$

### Discrete-Time Neoclassical Growth Model

Fix $k_0$, $U(\cdot), f(\cdot)$:
$$
\begin{align*}
& \max_{\lbrace c_t\rbrace_{t\in\N}} \sum_{t = 1}^\infty \beta^tU(c_t)\cr
& \text{s.t. }k_{t + 1} = f(k_t) - c_t+ (1 - \delta)k_t
\end{align*}\tag{2}
$$
Now, for general discrete time model, fix (per-unit-time) objective $U(x, u)$ and the dynamic: $x_{t + 1} = \Gamma(x_t, u_t)$:
$$
\begin{align*}
V^{\star}(x_0) := & \max_{\lbrace x_t\rbrace_{t\in\N}} \sum_{t = 0}^\infty \beta^t F(x_{t}, x_{t + 1})\cr
\text{where }& F(x, y) := \max_{y = \Gamma(x, u)} U(x, u)
\end{align*}
$$
The Euler equation for optimality is (note: technically you'd still need tranversality)
$$
\text{FOCs}:\begin{cases}
F_y(x_t, x_{t + 1}) + \beta F_x(x_t, x_{t + 2}) = 0, \forall t & \text{(Euler Equations)}\cr
\lim_{t \to \infty} \beta^t F_x(x_t, x_{t + 1})x_t = 0 & \text{(Transversality)}
\end{cases}
$$
So, (part of) the discrete version of specific neoclassical growth model's optimality condition looks like
$$
(2)'s\text{ EE}:\ U'(c_t) = \beta U'(c_{t + 1})(1 - \delta + f'(k_{t  + 1}))
$$

### Connecting the two

Starting from the discrete time model's EE:
$$
\begin{align*}
U'(c_t) & = \beta U'(c_{t + 1})(1 - \delta + f'(k_{t  + 1}))\cr
&  \text{(let $\Delta = 1$)}\cr
\Leftrightarrow U'(c_t) &  = \frac1{1 + \rho \Delta} U'(c_{t + \Delta})(1 - \delta \Delta + \Delta f'(k_{t  + \Delta}))\tag{3}
\end{align*}
$$
(*Note*: Fix $\Delta = 1$, $\beta =e^{-\rho \Delta}$. Then for small $\Delta$, $e^{-\rho \Delta} \approx \frac 1{1 + \rho \Delta}$.)

Now, notice that if we take $\Delta \to 0$, $(3)$'s RHS simply reduce to $U'(c_t)$ and it's trivial. Therefore instead we need to do a little manipulation:
$$
\begin{align*}
(3) & \Leftrightarrow \rho\Delta U'(c_t) = U'(c_{t + \Delta}) - U'(c_t) + U'(c_{t + \Delta})\Delta(- \delta + f'(k_{t  + \Delta}))\cr
& \Leftrightarrow \rho U'(c_t) = \frac{U'(c_{t + \Delta}) - U'(c_t)}{\Delta} + U'(c_{t + \Delta})(- \delta + f'(k_{t  + \Delta}))\cr
& \quad \text{push }\Delta \to 0  \cr
& \Leftrightarrow \rho U'(c_t) = U''(c_t)\dot c_t + U'(c_{t})(- \delta + f'(k_{t})) \tag{4}
\end{align*}
$$
So we've established that $(2)$'s EE (part of its FOCs) is somehow equivalent to $(4)$, while $(4)$ is already somewhat continuous — the last step to connect $(1)'s$ FOCs: (copying it one more time here)
$$
(1)'s\text{ FOCs}:\begin{cases} 
U'(c_t) = \lambda_t & (i) \cr
\dot \lambda(t) = \rho\lambda_t - \lambda_t(f'(k_t) - \delta) & (ii) \cr
\dot k_t = f(k_t) - \delta k_t - c_t & (iii) \text{ (ignore this one)}
\end{cases}
$$
is just plug in $(i)$ into $(ii)$:
$$
\begin{align*}
(ii) \Leftrightarrow &\ \lambda(t)  = \rho\lambda_t - \lambda_t(f'(k_t) - \delta)\cr
 \Leftrightarrow &\  \rho\lambda_t  = \lambda(t) + \lambda_t(f'(k_t) - \delta)\cr
&  \text{plug in }(i)\cr
\Leftrightarrow &\  \rho U'(c_t) = U''(c_t) \dot c_t + U'(c_t)(f'(k_t)-\delta)\cr
\Leftrightarrow & \ (4)\approx (2)'s \ EE.
\end{align*}
$$
Viola.

