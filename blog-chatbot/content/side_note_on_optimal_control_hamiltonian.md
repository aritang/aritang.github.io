---
title: "Concavity of Maximized Hamiltonian"
date: 2025-11-06T21:03:06-06:00
draft: false
---

A general continuous-time dynamic programming problem is given by reward function $h(x, u)$ control function $g(x, u)$ and initial state $x_0$:
$$
\begin{align*}
V^\star (x_0) :=& \max_{\lbrace u_t\rbrace_{t\ge 0}} \int_0^\infty e^{-\rho t} h(x_t, u_t)\,\text{d}t\cr
& \text{s.t. }\dot x_t = g(x_t, u_t).
\end{align*}
$$
The Hamiltonian functino $H(x, u, \lambda)$, and ***Maximized Hamiltonian*** $H^\star(x, \lambda)$ is defined as
$$
\begin{align*}
& H(x, u, \lambda) = h(x, u) + \lambda^Tg(x, u),\cr
& H^\star(x, \lambda) = \max_u H(x, u, \lambda).
\end{align*}
$$
It's classical convex analysis result that $H^\star(x, \lambda)$ is convex in $\lambda$. But also, interestingly

> **Proposition** If $h, g$ are concave in $x$, then $H^\star$ is concave in $x$.

Not a difficult proof nor too surprising a result. Squint your eyes and you might even see it between the lines :)

