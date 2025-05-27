---
title: "First Order Methods | Notes from YYYe's ORML Intensive Lectures"
date: 2025-05-23T22:53:03+08:00
draft: false
---

I used to think **first-order methods (FOM)** were mostly just warm-up materials. But after sitting through Professor Ye’s lightning-fast 3-hour tour of the topic... FOM are probably the best! I can't do a full overview of FOMs here. Here are some takeaways from the lecture: a few highlights that are surprisingly insightful and fun so worth pausing over.

We’ll skip zero-order methods. Sure, you can do bisection (aka binary search) if you assume strong structure on the objective function. But the more efficient zero-order methods typically approximate gradients via sampling. That’s clever, but we’re moving on.

---

### First-Order Methods

First-order methods are iterative.

The vanilla is the **Steepest Descent Method (SDM)**. We begin at some point $ x^0 $. At each iteration $ x^k$, we take the negative gradient $ -\nabla f(x^k) $ as the direction of steepest descent. Then we choose a step size $ \alpha^k $ to get:

$$
x^{k + 1} = x^k - \alpha^k \nabla f(x^k),
$$
where
$$
\alpha^k = \arg\min_{\alpha} f(x^k - \alpha \nabla f(x^k)).
$$

This method converges to the global optimum at a rate of $ \mathcal{O}(1/\epsilon^2) $ for general convex problems, and $ \mathcal{O}(1/\epsilon) $ for strongly convex ones. The rate also depends on the **condition number**:

> More precisely, the condition number typically refers to the ratio $\kappa = L/\mu$, where $L$ is the Lipschitz constant of the function's gradient (an upper bound on how quickly the gradient can change), and $\mu$ is the strong convexity constant (a lower bound on the function’s curvature). The smaller the better.

----

There are simple yet powerful upgrades to SDM—just by looking slightly forward or backward in time.

### Looking Back: Momentum

If you’ve seen the idea of *momentum*, this will feel familiar. A unified way to express it is:
$$
x^{k + 1} = x^k - \alpha_1^k \nabla f(x^k) + \alpha_2^k d^k = x^k + d(\alpha^k),
$$
where $ d^k := x^k - x^{k - 1} $. This looks like Nesterov’s method, doesn’t it?

To choose the best pair $ \alpha^k = (\alpha_1^k, \alpha_2^k) $, we might solve:
$$
\min_{\alpha^k} \nabla f(x^k)^\top d(\alpha^k) + \frac{1}{2} d(\alpha^k)^\top \nabla^2 f(x^k) d(\alpha^k).
$$

If we had access to the true Hessian and its inverse, we could compute the optimal step. But to stay within the first-order framework, we rely on approximate Hessians, often learned or estimated during iterations.

{{<figure align="center" src="/online/FOM_backward.jpeg" caption="The slide comes from Prof. Ye—Thanks Professor Ye" width="100%">}}

----

### Looking Forward: Acceleration

Anticipating the next step—“looking ahead”—can also give performance boosts and even theoretical guarantees. Again, it’s a bit more memory and computation, but still lightweight compared to second-order methods.

{{<figure align="center" src="/online/FOM_forward.jpeg" caption="The slide comes from Prof. Ye—Thanks Professor Ye, again" width="100%">}}

### Conclusion

The myopic steepest descent already works surprisingly well. But looking just a little forward or backward—with minimal extra memory—can make it dramatically faster. Since we’re working in first-order land, the extra cost is just a few vectors. That’s a great trade.

That’s all for unconstrained first-order methods. And we'll have another blog covering the 2nd half—**constrained** first-order methods—and yes, **ADMM** is coming. Goodnight, gradients :)
