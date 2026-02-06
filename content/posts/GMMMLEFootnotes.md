---
title: "Three Econometric Footnotes | Hidden LLN, KL Divergence in MLE, and what is Machine Learning?"
date: 2026-02-02T21:29:09-06:00
draft: false
---

### The Hidden Weight of GMM Consistency Conditions
> Consider estimating parameter $\theta\in \Theta$ from data $\lbrace w_i\rbrace_{i \in [N]}$
>
> Assume:
>
> 1. Parameter space $\Theta\in \R^K$ is compact.
>
> 2. The criterion function of GMM
>     $$
>     s_N(\theta) = s(\vec w; \theta)
>     $$
>     is continuous in $\theta$ $\forall, \vec w$.
>
> 3. $s_N(\cdot)$ well behaves:
>     $$
>     \sup_{\theta\in \Theta}|s_N(\theta) - s_\infty(\theta) \xrightarrow{p}0.
>     $$
>
> 4. $s_\infty(\theta)$ has a unique minimum at $\theta_0$.
>
> Then $\hat \theta_{GMM} \xrightarrow{p}\theta$.

The proof is essentially a topological argument — uniform convergence of continuous functions on a compact set, plus a unique minimum, pins down the limit of the minimizers. It is clean, elegant, and almost suspiciously general.

But actually condition 3 is not innocuous. $\sup_{c \in \Theta} |s_N(c) - s_\infty(c)| \xrightarrow{p} 0$ did nearly *all* the heavy econometric work, and it does not come for free.

In practice, $s_N(c)$ is typically a sample average: $s_N(c) = \|\frac{1}{N} \sum_{i=1}^N m(w_i, c)\|_2^2$, and we need this average to converge *uniformly* in $c$. This invokes a **uniform law of large numbers** (ULLN), which requires substantially more than pointwise convergence. The standard sufficient conditions are:

1. **i.i.d. or mixing structure** on $\{w_i\}$ — ruling out arbitrary dependence.
2. **Moment conditions**: $\mathbb{E}[\sup_{c \in \Theta} |m(w_i, c)|] < \infty$ — a *dominance condition* that demands the criterion's envelope function has a finite first moment. This is not innocuous. Fat-tailed data (Cauchy-like returns, heavy-tailed durations) can violate this directly.
3. **Smoothness or complexity control** on the class $\{m(\cdot, c) : c \in \Theta\}$ — typically Lipschitz continuity in $c$, or a bounded VC-dimension / bracketing entropy condition, to prevent the function class from being too rich for uniform convergence.

So the theorem's elegance is real but *conditional*: the econometric price is paid at entry — finite moments and i.i.d. sampling are genuinely strong structural commitments about the data-generating process.

---

### MLE Under Misspecification: Just Finding the Closest Model

Let $f(y|x)$ be the true conditional density. Let $\{f(\cdot|x; c) : c \in \Theta\}$ be a parametric family that **need not contain** $f$. The MLE maximizes $\frac{1}{N}\sum_i \ln f(y_i|x_i; c)$. And, even under misspecification, the MLE converges"

$$
\bar{\theta} = \underset{c \in \Theta}{\operatorname{argmax}}\ \mathbb{E}[\ln f(y_i|x_i; c)]
$$
Add and subtract $\mathbb{E}[\ln f(y_i|x_i)]$ (a constant in $c$):

$$
\bar{\theta} = \underset{c \in \Theta}{\operatorname{argmin}}\ \underbrace{\mathbb{E}\left[\int \ln\!\left(\frac{f(y|x_i)}{f(y|x_i; c)}\right) f(y|x_i)\, dy\right]}_{= \ \mathbb{E}[D_{\text{KL}}(f(\cdot|x_i)\ \|\ f(\cdot|x_i; c))]}
$$
The pseudo-true value $\bar{\theta}$ is the **KL-projection** of the truth onto the model class. **MLE is essentially finding the member of the parametric family that is closest to reality, as measured by KL divergence.**

As MLE minimizes $D_{\text{KL}}(\text{truth} \| \text{model})$, which penalizes the model for placing *low density* where the truth places *high density* — MLE models are mass-covering — they avoid missing probability mass, at the cost of potentially smearing density into low-probability regions.

In other words, the algorithm searches over a function class, with KL divergence as its implicit loss. The only question is whether your class is rich enough that the projection lands close to the truth.

-----

Quote from one of my class

### Machine Learning is just...

> "auto-differentiation, stochastic gradient descent and machine learning."

Equivalently, can I say that econometrics is just OLS, IV, and MLE?