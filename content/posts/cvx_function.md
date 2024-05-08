---
title: "showing a function is convex"
date: 2024-05-08T23:51:21+08:00
draft: false
---

There are basically three ways to establish convexity of a function $f$:

- verify definition (rarely used)

- if $f$ is twice-differentiable, show $\nabla^2f(x) \succeq 0 $​

    NOTE: only recommended for **simple enough** functions. a function is simple enough iff. it's 'manual-computationally tractable' for ***you***

- show that $f$ is obtained from simple convex functions by operations that preserve convexity

**General composition rule**. Composition $g\circ f$of $g: \mathbb R^n \to \mathbb R^k$ and $h: \mathbb R^n \to \mathbb R$ is $f:= g\circ h$ where
$$
f(x) = h(g(x)) =h(g_1(x), \ldots, g_k(x)).
$$
$f$ is convex if $h$ is convex and for each $i$, one of the following holds

- $g_i$​ is convex, $\tilde h$​ nondecreasing in its $i$​th argument.
- $g_i$ is concave, $\tilde h$ nonincreasing in its $i$th argument.
- $g_i$ is affine.

And another trick

**Restriction to a line**. $f: \mathbb R^n \to \mathbb R$ is convex iff. the function $g:\mathbb R\to \mathbb R$, where
$$
g(t):= f(x + tv),\quad \textbf{dom}\ g = \{t|x + tv \in \textbf{dom} \ f\}
$$
is convex (in $t$) for any $x\in \textbf{dom} \ f, v \in \R^n$.

By this trick, we can check convexity of $f$ by checking convexity of functions of one variable.

