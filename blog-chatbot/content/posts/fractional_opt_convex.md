---
title: "Implicitly Convex Fractional Optimization | Notes from YYYe's ORML Intensive Lectures"
date: 2025-06-06T14:41:44+08:00
draft: false
---

A lot of seemingly non-convex optimization problems are de facto convex. For example
$$
\begin{align*}
\min_{a_i, r_i}& \;\frac{a_i}{r_i}\cr
s.t.& \;a_i, r_i \ge0
\end{align*}\tag{1}
$$
can actually be massaged into a convex optimization. Let $x_i\ge \frac{a_i}{r_i}$, optimization $(1)$ is equivalent to
$$
\begin{align*}
\min_{a_i, r_i, x_i}& \;x_i\cr
s.t.& \;a_i, r_i \ge0
\end{align*}\tag{2}
$$
And is equivalent to
$$
\begin{align*}
\min_{a_i, r_i, x_i}& \;x_i\cr
s.t.& \;\begin{bmatrix}
x_i & \sqrt{a_i}\cr
\sqrt{a_i}& r_i
\end{bmatrix}\succeq0\cr
& a_i, r_i \ge 0
\end{align*}
$$
So now it's in Positive Semidefinite (PSD) Programming, and it is convex.

Note: $(1)$ can be extended by adding more fractional variables—$i = 1, \ldots, m$ and more linear constraints. The final converted form will still be convex.
