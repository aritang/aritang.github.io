---
title: "Reading note | A Theory of Multihoming in Rideshare Competition (Brian and Gans, 2019)"
date: 2026-06-20T20:50:59-05:00
draft: false
---

Here's a very cool theory paper I came across online.

> ### A theory of multihoming in rideshare competition. 
>
> Bryan KA, Gans JS.  *J Econ Manage Strat.*2019;28:89–96. https://doi.org/10.1111/jems.12306

It takes a messy, important, real-world phenomenon and find the *minimal* model that isolates the key force. Here's my note on part of the paper:

###### Disclaimer: all mistakes are mine. all rights belong to the author and publisher.

Two firms $i \in \{1, 2\}$ sit at the two ends of a Hotelling segment $[0, \ell]$, where $\ell$ indexes demand density. Each firm chooses an idleness level $\delta_i \in [0, \ell/4)$ at convex cost $c(\delta_i)$ (with $c(0) = 0$, $c' > 0$, $c'' > 0$), then a price $p_i$.

So idleness reduce wait time but is expensive.

After these are set, a single consumer of location $x \sim \text{Uniform}[0, \ell]$ with unit demand buys one ride from whichever firm gives higher utility
$$
u - p_i - t \cdot D_i(x),
$$

where the wait-time disutility $t$ is small and

$$
D_1(x) = \max(0,\, x - \delta_1), \qquad D_2(x) = \max(0,\, \ell - \delta_2 - x).
$$

Each firm earns

$$
\Pi_i = (p_i - w)\, Q_i - c(\delta_i),
$$

with $w$ the per-ride wage and $Q_i$ its probability of sale.

The paper discussed five market structures — monopoly, no-multihoming, consumer-only, driver-only, and both — by restricting parameters of the hotelling model:

- whether prices and idleness are chosen **jointly or independently**,
- whether line length is $\ell$ or $2\ell$,
- whether effective idleness is $\delta_i$ or the spilled-over $(\delta_1 + \delta_2)/2$, and
- whether the measure of contestable consumers is $\tfrac{1}{2}$ or $1$.

Solved for equilibrium (prices and idleness) in each case analytically: idleness is highest under monopoly, then driver-multihoming, then consumer-multihoming, then no-multihoming, and falls to exactly zero when both sides multihome. Price follows a similar descending order, hitting marginal cost (Bertrand) under full multihoming. The intuition is, when drivers multihome, one firm's idle drivers also serve the rival, so each firm under-invests in idleness until it unravels to nothing.

The policy/welfare implication is, restricting driver multihoming could *reduce* total surplus by affecting both price and wait time. Somewhat counterintuitively, **no single structure is best**. Depending on city density ($l$) and how much waiting bothers consumers ($t$), the socially optimal arrangement can be *any* of the four setups — including monopoly. Monopolists tend to over-provide idleness (to homogenize demand and extract surplus), while competing duopolists under-provide it.
