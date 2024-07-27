---
title: "Paper Summary | Optimizing Product Launches w/ Strategic Consumers"
date: 2024-07-27T13:41:05-07:00
draft: false
---

> ## Optimizing Product Launches in the Presence of Strategic Consumers. 
>
> By Ilan Lobel, Jigar Patel, Gustavo Vulcano, and Jiawei Zhang. 
>
> Management Science 2016. DOI https://doi.org/10.1287/mnsc.2015.2189

The paper studies firm's product launch policy. It is motivated by the industry example, where tech firms iteratively release new models of their products. For example, Apple releasing one new iPhone models almost every 12-18 months, or Nintendo's upcoming switch 2 that has been overdued 7 years (still is though).

A product launch is expensive because it involves operational costs and marketing campaigns etc. Consumers won't buy in-a-row for a ridiculously rapid sucession. Oftentime, consumers strategically postpone their purchase decision to maximize their utility. The paper models a market of technology innovation and costly product launches, taking into account of consumer's strategic forward-looking behavior, so as to study how firm should optimize their launch policy. Especially, whether to commit to a launch policy and when to launch new product.

### technicals

The model is continuous time and build on the probabilistic tool of Bronian motions.

> A firm continually develops technology over time. The technology developed by the firm follows a stochastic process, which we assume to be a Brownian motion $Z(t) = \mu t + \sigma B(t)$.

It is assumed that technology level is public. At any time point, the firm can launch a new product that exactly corresponds to the current technology level $Z(t)$, and incurs fixed launch cost $K > 0$. Assume that only the latest product is available on the market.

Consumer strategically buys. I.e. being aware of the firm's policy, they buy at a certain timepoint iff. their anticipated utility of ***wait*** is less than that of buying the current available model now.

Formallly, let the realized sample path til time $t$ be $w_t :=\{Z(s): 0\le s \le t\}\subset \Omega_t$. Let $w:=\{Z(s): s\in \R_+\}\subset \Omega$ denote the full sample path. Given a realized sample path, under certain firm's strategy and corresponding consumer behavior, the transactions would be determined, and corresponding consumer utility can be computed: (taking integral over the sample path of consumer's instant utility:
$$
\text{consumer's utility: }U^c(w) = \int_{t = 0}^\infty C(t) e^{-\delta t} \ dt - p\sum_{i = 1}^\infty e^{-\delta\kappa_i}
$$
where, $p$ is price, $\kappa_i, i = 1, \ldots$ is purchase time point, and $C(t)$ is a convenient symbol denoting the value that a certain consumer is holding at time point $t$. 

And, firm's utility is available as well:
$$
\text{firm's utility: }U^f(w) = (p - c - K)\sum_{i = 1}^\infty e^{-\delta\kappa_i}
$$
(Remark: the model in the paper has a few more elements for generalization to heterogenous consumers).

### launching products ***on-the-go***

When firm does not make any commitment to the launching of product, the consumers and the firm would need to make decision based on thier beliefs about other's behavior, and that they need to know the policy of the other party.

One way is to analyze Markov perfect equilibrium (MPE), where the players make decision using Markovian strategies. Consider at time point $t$ and the state of the game $M(t)$, be the pair $(N(t), O(t))$ where $N(t)$ is upcoming tech value (market tech level $Z(t)$ minus currently available product's tech level), and $O(t)$ is consumer's **outdated value** (consumer's holding value $C(t)$ minus tech level $Z(t)$.

At any time point, firm's strategy would simply be a mapping
$$
s^f :\{M(t^-)\}\to \{0, 1\}\\
$$
to the decision space of whether to launch a product or not. Correspondingly, consumer's policy would also be a mapping
$$
s^c :\{M(t^-)\}\to \{0, 1\}
$$
into his purchase decision.

The author demonstrated the following claim as their first result (cf. Theorem 1 of the paper). Under this ***on-the-go*** strategy space, firm's optimal launch strategy is a **threshold policy**: product launch iff. $N(t) = z^*$ where $z^*$ is the solution of
$$
z(1 - e^{-\Delta z}) = \frac{p\delta}v\text{, where }\Delta = \frac{2\delta}{\sqrt{\mu^2 + 2\delta \sigma^2} + \mu}. 
$$

### commitment

The firm can do more when it is able to commit to technology levels of future launches. The firm announces an entire path of (discrete) technology levels of its products in advance, represented by $\mathbf z$—and launch whenever technology level reaches the value. In other words, the $i$th launch time would be exactly the time when tech level $Z(t)$ hit $i$th target level $z_i$.

Then, consumer's policy space at each time point $t$ would, in general, be a mapping
$$
S^c_t : 2^{\R_{+}}\times \Omega_t \to \{0, 1\} \text{ ($1$ for purchase)}.
$$
(Btw, reminder: $\Omega_t$ is the space of all possible sample paths til time point $t$, i.e. $w_t :=\{Z(s): 0\le s \le t\}\subset \Omega_t$).

Denote $S^c := \{S_t^c\}_t$ as the full strategy space over time.

And finally, the firm's decision presents as the following optimization: to maximize its expected utility subject to the consumer's optimal response constraint:
$$
\max_{\mathbf z \in 2^{\R_+}}\  \mathbb E[U^f(\mathbf z, s^c)]\quad \text{firm's utility}\\
\text{s.t. }\mathbb E[U^c(\mathbf z, s^c_t) | \omega _t]\ge\mathbb E[U^c(\mathbf z, \tilde s^c_t) | \omega _t] \forall t, \omega_t \in \Omega_t, \tilde s^c\in S_t^c \quad \\\text{(consumer's best response given }\mathbf z)
$$
After observations, explains, lemmas, we land gracefully (really?) at Theorem 2 of the paper:

> **Theorem 2** (Lobel et al., Theorem 2 part 2)
>
> (Under certain parameter conditions) the firm should launch new product generations in accordance with a 2-cycle policy with cycles $\mathbf z := [r_1, r_2, r_1, r_2, \ldots]$, where
> $$
> r_1:p\delta(e^{-\Delta t} + 1 + \Delta t) = 2v \Delta t^2\\
> r_2=\frac1\Delta \log(\frac{v r_1 }{vr_1 - p\Delta}).
> $$

### and more

For pricing, the paper further discussed the joint optimal launch-and-price policy—to endogenize the pricing decision but **assume that a single price is chosen at $t = 0$**. And via simulations, to demonstrate the value of commitment in various parameter settings. Lastly, the paper extends the model to heterogeneous consumers—with multiple consumer classes.

> The framework introduced in this paper opens several new avenues for potential future work. One interesting direction is empirical: estimating long-term technology values of real products and matching these values to their launch policies would allow us to understand whether firms are currently successful in managing strategic customers. Extending our model to a competitive setting or to a setting with finite production capacity would also be important topics for future research.
