---
title: "measuring information and uncertainty"
date: 2023-12-13T23:03:45+08:00
draft: false
summary: buckle up for deep revelation
cover:
    image: tattooed_heart/legally_blonde.jpeg
---

Following [yesterday's post](https://aritang.github.io/posts/measuring_information_and_uncertainty1/), now that it's a series of this Frankel and Kamenica (2019) AER paper.

### Entropy as a Measure

Consider entropy
$$
H(q) = -\sum_{w\in \Omega} q^w \log q^w.
$$
It's coupled with Kullback–Leibler divergence (Bregman, 1967):
$$
d(p, q) = \sum_{w\in \Omega} p^w \log(p^w/q^w)
$$
which can be shown by verifying $d(p, q)$ is a Bergman divergence of $H(q)$. Pretty cool right? Moreover, let
$$
u^{KL}(a, w) = -\log a^w
$$
It can be verified that this utility function forms a decision problem corresponds to a "proper scoring rule" for eliciting truthful beliefs, and actually, powers the above measure of information and uncertainty. Although the decision problem that a couple of measure of information/uncertainty is not unique, there is a direct way of constructing some utility function right from the measure.

### Buying Information

Consider the mechanism design problem, we wanna compensate a observer of information to revel his information.

Let the prior be $q$. There are two periods $t\in \{1, 2\}$ and two available signals $\pi_\alpha^*$ (arrives at period $1$), $\pi_\beta^*$  (arrives at period $2$). The observer will reveal information in the first and second stage, each time after (optionally and perhaps strategically) observing the signal, and that he would reveal all information at the second stage. The observer is compensated by some payment function both in the first and second stage, based on the information he reveals, but he might delay revelation of information and perhaps misreport.

There are two kinds of stratigics. First, the seller can delay the arrival of information, choosing to observe $\pi_\alpha$ instead of $\pi_\alpha^*$, restricted to such that $q(\alpha^*)$ is a mean-preserving spread of $q(\alpha)$ - that $\pi_\alpha$ is less informative than the original signal $\pi_\alpha^*$. Second, he can delay the revelation of signal, i.e. on receiving $\alpha$, he might reveal $\alpha$ (truthfully) or nothing.

Let the payment of the first stage and second stage be $t(p1, q)$ and $t(p2, p1)$, where $p_1 = q(\alpha)$ and $p2 = q(\alpha \cap \beta)$ - the updated distribution.

#### Incentive Compatibility

We define two notions of incentive compatibility:

- Payment $t$ is *ex ante incentive compatible*, if seller don't "delay the arrival of information" - hence always choose to observe signal $\alpha^*$ in the first stage.
- Payment $t$ is *interim incentive compatible*, if for every $q$ and possible signals $\pi_\alpha, \pi_\beta$, the seller always prefer to reveal $\alpha$ (other than nothing) in period $1$.

If both IC conditions are satisfied, we say that $t$ is ***incentive compatible***.

[**Lemma**] ex ante incentive compatible => interim incentive compatible.

Quote the paper remarking on this lemma

> At first glance, it might seem that interim incentive compatibility is more difficult to satisfy than ex ante incentive compatibility since the seller can condition the decision of whether to delay on the first period’s signal realization. This turns out not to be the case; in fact, ex ante incentive compatibility is the stronger condition.

Thanks to the lemma, we then only need to focus on ex ante IC. And right after this we have

[**Theorem**] A payment function is incentive compatible if and only if it is a valid measure of information.

The idea behind this theorem is that if a payment function satisfies Order-invariance, then delaying any signal (at the ex ante or interim stage) has zero impact on the expected payment.

Coolness.
