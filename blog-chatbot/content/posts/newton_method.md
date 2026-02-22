---
title: "Newton's Method🍎 for Constrained Optimization | Notes from YYYe's ORML Intensive Lectures"
date: 2025-05-27T19:41:21+08:00
draft: false
---

> I used to think Newton’s method was a bit old-school. Turns out I was the one playing catch-up. This is about Newton’s method and a clever way to make it work for constrained optimization.

Consider optimizing an unconstrained function $f(\cdot)$ whose Hessian exists. Newton's method works around its gradient function, finding a point $x^\star$ such that $\nabla f(x^\star) = 0$. In an iterative way, at each point $x^k$, it approximates the gradient function $\nabla f(\cdot)$ around $x^k$ using its second-order derivative information
$$
\nabla {\tilde f}(x^{k + 1}) \approx \nabla f(x^k) + \nabla^2 f(x^k)(x^{k + 1} - x^k),
$$
and solve for $x^{k + 1}$ such that this approximation equals zero—which gives us the classic update:
$$
x^{k + 1} = x^k - (\nabla^2 f(x^k))^{-1}\nabla f(x^k).
$$
Btw: Newton’s method converges rapidly—quadratically, even—if the starting point $x^0$ is close enough to the solution.

Now here's the cool part. Newton’s method also works for *constrained* problems. Say we want to minimize $f(x)$ subject to a linear constraint:
$$
\min f(x), \quad \text{s.t.} \quad Ax = b.
$$
The first-order optimality conditions evolve naturally into the KKT conditions, with primal-dual variables $(x, y)$:
$$
\begin{aligned}
& \nabla f(x) - A^\top y = 0, \\
& Ax = b.
\end{aligned}
$$
Let $\Delta x = x^{k+1} - x^k$, $\Delta y = y^{k+1} - y^k$. Expanding the KKT system around $(x^k, y^k)$:

Stationarity (linearized):
$$
\nabla f(x^k) + \nabla^2 f(x^k) \Delta x + A^\top \Delta y = 0
$$
Feasibility (linearized):
$$
A(x^k + \Delta x) = b \Rightarrow A \Delta x = b - Ax^k
$$

We can now solve the Newton step from this linear system:
$$
\begin{bmatrix}
\nabla^2 f(x^k) & A^\top \cr
A & 0
\end{bmatrix}
\begin{bmatrix}
\Delta x\cr
\Delta y
\end{bmatrix} = \begin{bmatrix}
-\nabla f(x^k)\cr
b - Ax^k
\end{bmatrix}
$$
And that’s it—Newton’s method, upgraded for equality constraints. Still sharp and fast, just wearing a dual variable now.
