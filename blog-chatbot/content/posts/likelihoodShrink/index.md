---
title: "Likelihood Shrink"
date: 2026-07-04T23:40:08-05:00
draft: false
summary: "The likelihood ratio of a misspecified model is a martingale that collapses to zero almost surely — a hands-on look at why."
---

This was one of my favourite during Empirical Analysis III course.
<!--more-->

Suppose we have data $x_1, x_2, \dots$ iid draws from density $p$ (model 1, **true**). A competing model claims density $q$ (model 2, **false**), with $p \neq q$ on some set of positive probability. Both are proper densities: $\int p = \int q = 1$.

Likelihood ratio after $t$ observations:
$$
\tilde L_t = \prod_{j=1}^{t} \frac{q(x_j)}{p(x_j)}, \qquad \tilde L_0 = 1.
$$

> Fact 1. $\tilde L_t$ is a martingale (under the true model)

Notice that $\tilde L_{t+1} = \tilde L_t \cdot \frac{q(x_{t+1})}{p(x_{t+1})}$. Condition on the first $t$ observations; $x_{t+1} \sim p$:
$$
E[\tilde L_{t+1} \mid x_1,\dots,x_t] = \tilde L_t \cdot \int \frac{q(u)}{p(u)}\, p(u)\, du = \tilde L_t \int q(u)\,du = \tilde L_t
$$

> Fact 2. $\ln \tilde L_t$ is a supermartingale *[(see wikipedia reference)](https://en.wikipedia.org/wiki/Martingale_(probability_theory)#Submartingales,_supermartingales,_and_relationship_to_harmonic_functions)*

Write
$$
E[\ln \tilde L_{t+1} \mid x_1,\dots,x_t] = \ln\tilde L_t + \underbrace{E\Big[\ln\tfrac{q(x_{t+1})}{p(x_{t+1})}\Big]}_{=:\ \nu}
$$
By Jensen inequality:
$$
\nu = E\Big[\ln\tfrac{q(x)}{p(x)}\Big] \le \ln E\Big[\tfrac{q(x)}{p(x)}\Big] = \ln 1 = 0
$$

###### The $\le$ would be strict ($<$) because $q/p$ is non-constant as models differ. So the log-LR **drifts down by $|\nu|$ every period**.

###### Note that $-\nu = \int p \ln\frac{p}{q} =: \mathrm{KL}(p\|q)$ KL divergence pops up here

>  Fact 3: $\tilde L_t \to 0$ almost surely (the collapse)

$\ln\tilde L_t = \sum_{j=1}^t \ln\frac{q(x_j)}{p(x_j)}$ is a sum of **iid** terms with mean $\nu < 0$. LLN:

$$\frac{1}{t}\ln\tilde L_t \xrightarrow{a.s.} \nu < 0 \quad\Longrightarrow\quad \ln\tilde L_t \to -\infty \quad\Longrightarrow\quad \tilde L_t \to 0 \ \text{a.s.}$$

###### Note: A seeming paradox is $E[\tilde L_t] = 1$ forever (Fact 1), yet $\tilde L_t \to 0$ a.s. (Fact 3). This is because for large $t$, $\tilde L_t$ is tiny with probability near 1, but with tiny probability it is astronomically large.

{{< include "likelihood_ratio_correct_vs_misspecified.html" >}}