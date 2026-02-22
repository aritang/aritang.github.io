---
title: "with all due respect to those economists - episode 2"
date: 2023-10-06T19:55:52+08:00
draft: false
---

Welcome back to the carnival of economic theories! Episode 2: The Diamond Paradox. I love the paper.

Diamond's model revolves around a discrete-time market, denoted as $t\in [T]$, featuring multiple consumers and firms. 

### Consumer Behavior

Each consumer possesses a downward-sloping demand function $x(p)$, it decreases as price ($p$) increases. In this market, consumers have a strategic buying plan: they purchase a product in period $t$ if and only if the price is less than or equal to their predetermined cutoff price, $q$. Thus, an individual consumer's demand function is defined as:
$$
x^*(p) = \begin{cases} 
x(p) & \text{if } p\leq q \newline
0 & \text{otherwise}
\end{cases}
$$

### Market Dynamics

- In each period, a new pool of consumers enters the market, selects a firm at random, observes the price ($p_t$), and decides whether to buy or wait for the next period.
- The consumer's utility function is represented as $u(p, z)$, with $z$ indicating the number of periods a consumer is willing to wait. Btw, it's properly regularized, as whatever u might wish it for.

### *Assumptions*

Here's the fun part, now let's explicitly state the important assumptions made in this model:

1. **Market Size and Consumer Behavior**: The market is sufficiently large, and consumers are assumed to be somewhat oblivious. This simplifies the model by ignoring memory effects, preference heterogeneity, and the historical impact of price reputation on future demand.

2. **Consumer Types**: consumers can vary among their possible type $h\in H$ and have different cut-off prices. But their demand curve $x(p)$ is the same. Also, the new pool of consumers entered each period are assumed to be consisted of the same type combination.

3. **Firm Behavior**: Firms are myopically focused on maximizing their utility in the current period and possess perfect knowledge of their demand aggregating function.In each period, firms aim to maximize their objective:
    $$
    \max_p pX_t(p) = px(p)\sum_{\tau}N_t^\tau (p)
    $$
    $N_t^\tau(p)$ represents the count of consumers who will make a purchase at price $p$ in period $t$ w.r.t. to their potentially heterogeneous cut-off prices, across different historical generations $\tau$ and type $h$. It's a proper but shitty definition, leave the mathematical notation alone.

    Denoting $p_t$ as one of the optimal solutions to this decision problem, it can be demonstrated that $\bar p_t \le p_t \le p^*$, with $\bar p_t$ representing the minimum cutoff price ensuring every consumer purchases the product, under certain assumptions.

### Result - Price Adjustment

Moving on, we consider how prices adjust over time. Assume that consumers who persist in the market gradually raise their cutoff prices over time by a constant non-degenerate fraction, such as $q^{h\tau}_{t + 1} > q^{h \tau}_t+ \eta$, where $\eta > 0$.

Now, for the tricky part: we posit that for consumers of the same type $h$ across different generations, say, $\tau = t$ and $\tau' = t + 1$, their cutoff prices are related as follows: $q^{h\tau}_{t + 1}$ falls between $q_t^{h\tau}$ and $q^{* h}$, where

$$u^h(q^{*h}, 1) = u^h(p_t, 2)$$

so the new generation knows the current period's price $p_t$ and anticipate that firms will maintain similar pricing in the next period. Assume they select a cutoff price that falls within a certain range, satisfying the following condition:

$$q^{*h}\le q^{h\tau'}_{t+1}\le q^{h\tau}_t$$

or reversed.

Continuing from the above, we can establish that if $\bar p_t \le p_t$, then $\bar p_{t+1} > \bar p_t$. Given our earlier demonstration that $\bar p_t \le p_t \le p^\*$, we conclude that the sequence ${\bar p_{\tau}}_{\tau = 1}^\infty$ converges to $p^*$. This analysis forms a crucial part of our discussion.

In a market where consumers anticipate stability with prices like $p^*$ persisting, firms can strategically increment their prices while maintaining demand levels. Sneaky, right? This continues until equilibrium is reached, possibly at a monopoly price if it is initially lower.

### I was going to complain but...

While Diamond's model may seem laden with assumptions, both conservative and unconventional, it has been deliberately crafted to facilitate tractable analysis. It's not surprising that it leads to intriguing paradoxes and... tons of citations.

Anyway, they essence of this famously recognized paper (a Nobel-Price winning one after all) is that it modeled market friction as search cost (the cost of waiting in search period) and spurred off subsequent decades of extensive research. Peter Diamond himself also said in his bio

> The kind of theoretical work I most enjoy is sorting out how to approach a problem to get insights, more so than refining models to shed further light on it. Thus, it was natural for me to explore new areas once I felt I had hit diminishing returns in one area.
>
> Dissatisfaction with (well-understood) analysis was part of the drive that led to this success; trying to get a more satisfactory perspective that would open up the ability to better answer economic questions was another part.

Hear hear. After I thoroughly read his paper, I was like WOW, I will kill for a slot in this professor's course, really.
