---
title: "First Order Methods (Constrained) | Notes from YYYe's ORML Intensive Lectures "
date: 2025-06-07T15:23:24+08:00
draft: false
---

We’re back! 

[Last time](/posts/first_order_method/), we explored unconstrained first-order methods (FOMs), where gradient descent works well and its time-traveling cousins (momentum and acceleration) helped even more. Now adding constraints: Here’s how FOMs extend to constrained problems, especially equality constraints. We’ll walk through two major methods: **The Augmented Lagrangian Method with Multipliers (ALMM)** and its smoother, modular evolution—**ADMM**.

For constrained problems like this:

$$
\min_x \; f(x) \quad \text{s.t.} \quad h(x) = 0,\; x \in X
$$

The classical Lagrangian is:

$$
L(x, y) = f(x) - y^\top h(x)
$$

Then we flip to the dual:

$$
\phi(y) = \min_{x \in X} L(x, y)
$$

The idea is to optimize $\phi(y)$ over $y$ to satisfy the constraint $h(x) = 0$. Yeah you can write KKT—but this method can be unstable when $f$ or $h$ is badly conditioned. That’s where augmentation helps.

## The Augmented Lagrangian Method with Multipliers (ALMM)

ALMM adds a penalty to the constraint violation, write an "Augmented Lagrangian function" $L_a$:

$$
L_a(x, y) = f(x) - y^\top h(x) + \frac{\beta}{2} \|h(x)\|^2
$$

It gives a smoother optimization surface and better convergence. Using this $L_a$, ALMM iterates like this:

1. **x-update:**  
   $$
   x^{k+1} = \arg\min_{x \in X} L_a(x, y^k)
   $$

2. **y-update:**  
   $$
   y^{k+1} = y^k - \beta h(x^{k+1})
   $$

This is still a first-order method. The gradient of the dual is just $-h(x^{k+1})$, so we do steepest ascent on the dual.

For strongly convex $f$ with linear constraints $h(x) = Ax - b$, ALMM achieves convergence with function value error

$$
\mathcal{O}(\log(1/\epsilon))
$$

(Comparing to **unconstrained** gradient descent—general convex: $\mathcal{O}(1/\epsilon)$, Strongly convex: $\mathcal{O}(\log(1/\epsilon))$). So ALMM **matches** the best case for unconstrained FOMs—when the problem structure is convex and smooth.

## ADMM: Alternating Direction Method of Multipliers

ADMM handles problems with separable structure:

$$
\min_{x_1, x_2} \; f_1(x_1) + f_2(x_2) \quad \text{s.t.} \quad A_1x_1 + A_2x_2 = b
$$

The augmented Lagrangian:

$$
L(x_1, x_2, y) = f_1(x_1) + f_2(x_2) - y^\top(A_1x_1 + A_2x_2 - b) + \frac{\beta}{2} \|A_1x_1 + A_2x_2 - b\|^2
$$

Then alternate updates:

1. **$x_1$ update:**
   $$
   x_1^{k+1} = \arg\min_{x_1} L(x_1, x_2^k, y^k)
   $$
2. **$x_2$ update:**
   $$
   x_2^{k+1} = \arg\min_{x_2} L(x_1^{k+1}, x_2, y^k)
   $$
3. **$y$ update:**
   $$
   y^{k+1} = y^k - \beta (A_1x_1^{k+1} + A_2x_2^{k+1} - b)
   $$

### 💡 Why Alternate?

ADMM breaks down hard subproblems into easier ones. Each update only involves part of the variables. This makes it very suitable for parallel and distributed systems.

### Convergence

Under convexity, ADMM also achieves:
$$
\text{Function value error: } \quad \mathcal{O}(\log(1/\epsilon))
$$

Like ALMM, it enjoys **linear convergence** if strong convexity and certain regularity conditions hold. So ADMM also matches best-case rates compared with unconstrained versions.

