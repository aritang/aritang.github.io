---
title: "unbiased vs. consistent estimation"
date: 2024-04-15T10:19:07+08:00
draft: false
---

Here's a note that clarifies two notions in econometric that I found confusing somehow. And mid-term exam is on the way so here's a note.

### playground

Let $\{Y_1, Y_2, \ldots, Y_n\}$ be a collection of independent and identically sampled random variables out of $f(y; \theta)$, where $\theta \in \Theta$ is a (possibly unknown) parameter associated with the distribution. In general, we want to estimate $\theta$ using our samples $Y$. An ***estimation*** of $\theta$ - random variable $W$ can be expressed as
$$
W = h(Y_1, \ldots, Y_n)
$$

### unbiasedness

- **Definition** If $\forall \theta\in \Theta$, $\mathbb E[W] = \theta$, $W$ is an *unbiased estimator*.

- **Remark** small sample property: the 'unbiasedness' property is defined for any serve of sample size–doesn't matter how large $n$ is it shall holds anyway.

### consistency

- **Definition** Let $W_n$ be an estimator of $\theta$ given sample $\{Y_1, Y_2, \ldots, Y_n\}$. If $n \to \infty$, for any $\epsilon > 0$:
    $$
    P[|W_n - \theta| > \epsilon] \to 0
    $$
    we call such $W_n$ a *consistent estimator*. We'd also call $\theta$ the *probability limit* of $W_n$, denoted as $\text{plim}(W_n) = \theta$.

- **Properties**

    - **continuity** Let $g(\cdot)$ be some continuous function, define another parameter $\gamma = g(\theta)$. Assume $\text{plim}(W_n) = \theta$. Then if we take an estimation of $\gamma$ as $G_n = g(W_n)$, we'd also have $\text{plim}(G_n) = \gamma$.

        e.g. Sample variance $S_n^2 = \frac1{n-1} \| \mathbf Y - \bar Y\|_2^2$ is an unbiased (hence consistent) estimator of $\sigma^2$. Then, $S_n = \sqrt{S_n^2}$, despite being not biased (i.e. $\mathbb E[S_n] \ne \sigma$), it's consistent ($\text{plim}S_n = \sigma$).

    - **composition** If $\text{plim}T_n = \alpha$, $\text{plim}U_n = \beta$:

        (i) $\text{plim}(T_n + U_n) = \alpha + \beta$

        (ii) $\text{plim}(T_nU_n) = \alpha\beta$ 

        (iii) $\text{plim}(T_n/U_n) = \alpha/\beta$ (for $\beta\ne 0$).

        Actually, there might be that for general $\text{plim}T_n^k = \alpha^k, k = 1, ..., K$ and continuous function $f: \mathbb R^K \to \R$
        $$
        \text{plim}f(\mathbf T) = f(\alpha)
        $$
        
