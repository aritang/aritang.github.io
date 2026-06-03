---
title: "Decision Under Risk Uncertainty and Ambiguity"
date: 2026-05-10T15:20:44-05:00
draft: false
---

Our empirical analysis course is really cool. Here's what we covered last week:

-----

The setup is quite clean. There is one agents. Four objects:

| Object | Symbol | Role |
|---|---|---|
| Likelihood | $\ell(x\mid\theta)$ | family of probability models for data $x$, indexed by parameter $\theta\in\Theta$ |
| Prior | $\pi(\theta)$ | your subjective beliefs over which $\theta$ is true |
| Utility | $U(\gamma,\theta)$ | what you care about; $\gamma$ is a "prize rule" mapping data into an outcome |
| Decision rule | $\delta(z)$ | what you actually choose, as a function of observed $z$ |

Split the data: $x=(w,z)$, where $z$ is observed before act and $w$ is realized after—the decision $\delta$ may only use $z$. The prize is then $\gamma_\delta(x)=\Psi(\delta(z),x)$.

## The Bayesian benchmark

Define Wald's **risk function**:

$$
\overline{U}(\gamma\mid\theta)=\int_\mathcal{X} U[\gamma(x),\theta]\,\ell(x\mid\theta)\,d\tau(x)
$$

###### note: $\tau$ is the reference measure on the data space $\mathcal X$. For different $\mathcal X$ — continuous, discrete, $\tau$ corresponds to Lebesgue measure of counting measure. Or for simplicity just think $\text{d}\tau(x)$ as $\text{d}x$.

Then we can define the full-confidence benchmark. Assumes<br>**(i)** $\ell(\cdot\mid\theta)$ is correct for some $\theta$, and<br>**(ii)** $\pi$ is the right prior, and —
$$
\max_{\gamma\in\Gamma(\Delta)}\;\int_\Theta \overline{U}(\gamma\mid\theta)\,d\pi(\theta)
$$
Now let's relaxes both.

## Doubting the prior → ambiguity

Write any alternative prior as a reweighting of the baseline:

$$
d\tilde\pi(\theta)=n(\theta)\,d\pi(\theta),\qquad n\geq 0,\;\int n\,d\pi=1
$$
So $n$ is the density of the new prior with respect to the old. Measure its distance from $n\equiv 1$ using a convex $\phi_1$ with $\phi_1(1)=0$:

$$
D_{\phi_1}(n)=\int_\Theta \phi_1[n(\theta)]\,d\pi(\theta).
$$

> Note: KL is the choice $\phi_1(n)=n\log n$.
>
> ###### Standard KL of $\tilde\pi$ relative to $\pi$ is<br>$$D_{\text{KL}}(\tilde\pi\|\pi) = \int_\Theta \log\!\left(\frac{d\tilde\pi}{d\pi}\right)d\tilde\pi$$<br>Substitute $d\tilde\pi = n\,d\pi$ and $\frac{d\tilde\pi}{d\pi} = n$:<br>$$D_{\text{KL}}(\tilde\pi\|\pi) = \int_\Theta \log[n(\theta)]\cdot n(\theta)\,d\pi(\theta) = \int_\Theta n(\theta)\log n(\theta)\,d\pi(\theta)$$<br>

The **robust Bayesian objective** replaces $\int \overline{U}\,d\pi$ with a *worst-case-plus-penalty*:

$$
\max_{\gamma\in\Gamma(\Delta)}\;\min_{n\in\mathcal{N}}\;\int_\Theta \overline{U}(\gamma\mid\theta)\,n(\theta)\,d\pi(\theta)+\xi_1\int_\Theta \phi_1[n(\theta)]\,d\pi(\theta)
$$
The hyperparameter $\xi_1\geq 0$ governs trust in $\pi$. Denote as $n^* := \arg\min_{n\in \mathcal N} \text{(above)}$.

- $\xi_1\to\infty$: $n^*\equiv 1$, back to standard Bayes.
- $\xi_1\to 0$: adversarial choose $n^*$ free (classic max-min).

Note that the inner minimization problem is over $n$ so $U$ doesn't have to be concave. As long as $\phi_1$ is convex we get nice properties. Eg:

> For KL $n^*$ has a closed-form:
>
> $$n^*(\theta)= \frac{\exp[-u(\theta)/\xi_1]}{\int_\Theta \exp[-u(\theta')/\xi_1]\,d\pi(\theta')}\propto \exp\!\left[-\frac{1}{\xi_1}\overline{U}(\gamma\mid\theta)\right]$$
>
> Note that overweights the $\theta$ where $\gamma$ performs badly.
>
> Substituting back collapses the objective to the smooth-ambiguity form
>
> $$\max_{\gamma\in\Gamma(\Delta)}\{-\xi_1\log\int_\Theta \exp\!\left[-\frac{1}{\xi_1}\overline{U}(\gamma\mid\theta)\right]d\pi(\theta)\}$$
>
> a certainty-equivalent operator across models. Ambiguity aversion looks formally like risk aversion, but applied *across* models rather than within one.
>
> ###### NOTE: The cancellation isn't a coincidence — it's the **duality between KL-penalized expectation and the log-Laplace transform**, a well-known fact (the Donsker–Varadhan variational formula): <br>$$-\xi\log\mathbb{E}\!\left[e^{-X/\xi}\right] = \min_{Q\ll P}\;\Big\{\mathbb{E}_Q[X] + \xi\,D_{\text{KL}}(Q\|P)\Big\}$$<br>Letting $P=\pi$, $Q=\tilde\pi$, $X=u(\theta)$.

## Doubting the likelihood → misspecification

Same trick, different target. Hold $\theta$ fixed; allow $\ell$ itself to be wrong. Write any tilted likelihood as $\tilde\ell(x\mid\theta)=m(x\mid\theta)\,\ell(x\mid\theta)$ with $\int m\,\ell\,d\tau=1$. Penalty (with convex $\phi_2$, $\phi_2(1)=0$):

$$\int_\mathcal{X} \phi_2[m(x\mid\theta)]\,\ell(x\mid\theta)\,d\tau(x)$$

Inner min with KL gives the parallel formula

$$-\xi_2\log\int_\mathcal{X}\exp\!\left[-\frac{1}{\xi_2}U[\gamma(x),\theta]\right]\ell(x\mid\theta)\,d\tau(x)$$

— a certainty-equivalent operator now acting *on data given $\theta$*.

###### **Note.** No prior is placed over $m$'s. Misspecification is a constrained set, not a Bayesian unknown. If you had a credible prior over $m$'s, you'd just integrate them out and call the result a new $\ell$. Treating it as a set is what makes "misspecification" different from "another layer of parameter uncertainty."

## A unified view for robust Bayes and misspecification

Stack both layers and let the decision maker maximize, the adversary minimize on each axis:

$$\max_{\gamma\in\Gamma(\Delta)}\;\min_{n\in\mathcal{N}}\;\min_{m\in\mathcal{M}}\;\;\underbrace{\int_\Theta\!\int_\mathcal{X} U[\gamma(x),\theta]\,m(x\mid\theta)\,\ell(x\mid\theta)\,d\tau(x)\,n(\theta)\,d\pi(\theta)}_{\text{worst-case expected utility}}\\ +\;\xi_2\underbrace{\int_\Theta\!\int_\mathcal{X}\phi_2[m]\,\ell\,d\tau\,n\,d\pi}_{\text{likelihood-misspec penalty}}\;+\;\xi_1\underbrace{\int_\Theta\phi_1[n]\,d\pi}_{\text{prior-ambiguity penalty}}$$

**Two independent hyperparameters:**

- $\xi_1$ — how much you trust the prior $\pi$.
- $\xi_2$ — how much you trust the likelihood family $\ell(\cdot\mid\theta)$.

Setting $\xi_1=\xi_2=\infty$ recovers vanilla Bayes.

The minimizers $n^*(\theta)$ and $m^*(x\mid\theta)$ tell us *where* uncertainty bites for *this* decision. Same prior, same likelihood, different $\gamma$ → generally different worst cases. So we don't just have error bars, but error bars **weighted by decision relevance**.

### Reference

*Risk, Ambiguity, and Misspecification*. Lars Peter Hansen (University of Chicago) and Thomas Sargent (NYU) https://lphansen.github.io/QuantMFR/book/10_risk_ambiguity_misspecification.html