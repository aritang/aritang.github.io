---
title: "Referee Report | Bertsimas & Kallus 'From Predictive to Prescriptive Analytics' (MS20)"
date: 2026-02-11T20:59:06-06:00
draft: false
---

> One of my course's selective paper referee report writing assignment. I like this paper so, here's the referee report I wrote (lighted edited) which comes with a crisp summarization that I find in times can be quite useful

This is a beautifully written, intellectually clean paper. It uses traditional OR methods and is free of fancy deep learning. Bertsimas is a titan of the field. The paper is published in *Management Science* at an interesting timing of **2020**.

I started college in 2021. My very first research project was applying **deep reinforcement learning** for inventory management. Reading this paper feels like hearing Debussy. We modern audiences take complicated colorful chord progressions for granted, as if *Clair de Lune* is how sonatas are supposed to sound. But it was new and groundbreaking when Debussy composed it. And shortly afterwards, Schoenberg [deep learning] came along and took over everything...

It is very inspiring to read through and think about what this paper gets right, what's different, and how it fits into our future of fancy deep learning-powered, huge-scale, data-driven world.

---

## Summary

Instead of the two-step **predict-then-optimize** pipeline, this paper proposes optimizing with the conditional distribution directly:


$$
\hat{z}_N(x) \in \arg \min_z  \sum_i w(x, N, i) c(z; y_i)
$$


where weights $w(x, N, i)$ come from off-the-shelf ML methods (kNN, kernel, CART, random forests). The weights implicitly estimate the conditional distribution $\mu_{Y|X=x}$ and plug it directly into the optimization—never explicitly estimating $\Pr[Y \mid X = x]$.

---

## Key Contributions

**The paper names and formalizes the right problem.**  
OR traditionally solves $\min_z \mathbb{E}[c(z;Y)]$ by empirically estimating the distribution of $Y$ (sample average approximation, SAA). ML point predicts $\hat{Y}(x)$. Neither alone solves


$$\min_{z \in \mathcal{Z}} \mathbb{E}\bigl[c(z;Y) \mid X = x\bigr]$$

The paper cleanly articulates that the gap between prediction and decision is not trivial—a perfect point prediction fed into an optimizer is *not* optimal because it ignores residual uncertainty.

**The paper proposes an elegant weight-based unification.**  
Every local-learning ML method (kNN, kernels, trees, forests) induces weights $w_{N,i}(x)$. Swapping these weights into a weighted SAA gives a family of prescriptive methods. This extends the simple SAA framework and is conceptually clean, practically modular, and computationally no harder than standard SAA.

**Asymptotic optimality under mild(?) conditions.**  
The authors prove, as the main theorem of the paper:

$$\mathbb{E}\bigl[c(\hat{z}_N(x);\, Y) \mid X = x\bigr] \xrightarrow{N\to\infty} v^{\star}(x) \quad \text{a.s.}$$

for non-iid (mixing) data and even censored observations.

**The coefficient of prescriptiveness $P$.**   
Analogous to $R^2$ but for decisions:


$$
P = 1 - \frac{R({z}_N) - R^{\star}}{R(z^{\mathrm{SAA}}_N) - R^{\star}}
$$


where $R^{\star}$ is the perfect-foresight benchmark and ${R}(z^{\mathrm{SAA}})$ is the data-poor SAA benchmark. This gives a universal, unitless metric for "how much of the gap between ignorance and omniscience does your data + method close?" It's practically useful and pedagogically sharp.

---

## Some Reflections on Limitations and Future Directions

**The exogeneity assumption merits careful consideration.**  
When decisions affect outcomes (Section 3), the authors invoke $Y(z) \perp Z \mid X$—standard unconfoundedness/exogeneity. They argue it is "particularly defensible" because historical decisions were based on observables. In practice, particularly for pricing applications, this assumption can be quite strong. The causal identification challenge—ensuring that historical decisions don't confound the estimated conditional distribution—remains a central concern that practitioners will need to address carefully in applications.

**Finite-sample behavior and scalability present interesting trade-offs.**  
While asymptotic optimality is proven, finite-sample convergence rates are not characterized. In practice, we often work with moderately sized datasets (say, $N = 500$) rather than asymptotic regimes. The method also inherits the curse of dimensionality from the underlying ML techniques. An interesting direction for future work would be to better understand how the asymptotic guarantees translate to finite-sample performance, and how to maintain tractability as sample size grows. This could help guide practitioners in choosing appropriate methods for their problem scale.

**The single-period framework suggests natural extensions.**  
The problem is formulated as $\min_z \mathbb{E}[c(z;Y) \mid X = x]$—a single-period conditional stochastic program. Real inventory and pricing problems are often inherently multi-period, involving sequential decision-making, exploration-exploitation trade-offs, and learning dynamics. The cost function $c(z;y)$ is also assumed known and fixed. Extending this framework to dynamic settings would be a valuable direction, though it would naturally introduce additional complexity.

---

## Positioning Towards Deep Learning / Deep RL

Context matters. **Bertsimas is (almost?) the godfather of modern applied OR**—his intellectual commitment is to tractability, interpretability, and provable guarantees. This paper is deliberately *not* about neural nets.

The key methodological difference: This paper separates *probability weighting* from *optimizing*—first use ML only to estimate conditional probabilities of outcomes, then solve a classical optimization problem. Deep RL, by contrast, collapses these into a single end-to-end differentiable pipeline. 

The Bertsimas philosophy here is: **don't throw away the structure of the optimization problem**—it encodes domain knowledge (constraints, cost structure, feasibility) that a neural policy must rediscover from scratch. This is an OR position paper that *borrows* from ML rather than *becoming* ML. The message for OR practitioners is that our data has more to give than SAA extracts, and the paper provides a principled, general way to use it.