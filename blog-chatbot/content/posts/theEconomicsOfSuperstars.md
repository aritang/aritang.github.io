---
title: "Paper Reading Notes | The Economies of Superstars (Sherwin Rosen, AER 1981)"
date: 2026-02-21T17:24:45-06:00
draft: false
---

> The market for classical music has never been larger than it is now, yet the number of full-time soloists on any given instrument is also on the order of only a few hundred (and much smaller for instruments other than voice, violin, and piano). Performers of first rank comprise a limited handful out of these small totals and have very large incomes. There are also known to be substantial differences in income between them and those in the second rank, **even though most consumers would have difficulty detecting more than minor differences in a "blind" hearing**. (Rosen 1981)

What a brave claim... Nevertheless, this paper is cool, so I took the time to read it and write the following technical summary for future reference.

----

Consider the market with consumers and sopranos. Consumers consume the sopranos' service with variable quality.

### Consumers

Each consumer choose consumption by
$$
\begin{aligned}
& \max_{n,z,x}u(x, nz)\cr
& s.t. \ x + (p(z) + s)n \le I.
\end{aligned}
$$
$z$ is quality, $n$ is quantity, and $x$ is all other goods. $s$ and $p(\cdot)$ and $I$ are given and fixed. Price of $x$ is normalized to 1.

Consumer's FOC says that, at the optimal quality they chose, $z^*$ should satisfy locally the following condition:
$$
p'(z^*) = \frac{p + s}{z^*}.\tag{2}
$$
<u>Assumption</u>: **everyone has the same $s$ and the above relation holds for all $z$**. Then (2) implies
$$
p(z) = vz - s, \forall z.\tag{1}
$$

> *Note*: think of (1) as the *revealed price curve* out of consumer's optimization. In general, consumer's optimization would *convexifies* $p(\cdot)$ (see [Tenant's Optimization Behavior Convexifies Nonconvex Rent Function](/posts/nonconvex_rent_function/) for a concrete example). Because the special structure of the consumer's problem here, the revealed $p(\cdot)$ is not only convex but also linear.

Moreover, note that if we assume price is (1), consumer's problem reduces to
$$
\begin{aligned}
& \max_{n,z,x}u(x, (nz))\cr
& s.t. \ x + v(nz) \le I.
\end{aligned}
$$
So total consumption $y = nz$ is uniquely pinned down but $n, z$ varies (which would be pinned down later from the production side).

### Soprano

Every soprano has talent $q$ fixed and maximizes:
$$
\begin{align}
R(q): = &\max_{z, m} p(z)m - C(m)\tag{3}\cr
\text{where }& z = h(q, m)\cr
= &\max_{m} (vh(q, m) - s)m - C(m)& [\text{from assuming }(1)]
\end{align}
$$
$m$ is quantity, $z$ is quality perceived by audience. Cost function $C$ is convex and increasing. $h$ reflects how a singer's talent & quantity affects his service quality $z$. Assume $h_q > 0, h_m < 0, h_{qm} \ge 0$.

### Market Equilibrium

Assume (1). Consider general equilibrium. 

For the consumer side, aggredate demand can be characterized by some decreasing function of $v$
$$
Y^d = \sum nz = F(v)\tag{4}
$$
For the Soprano side, assume there is a distribution over $q$ characterized by pdf $\phi(q)$. Index each soprano as $i$. Soprano with $q_i$ supplies $y(q_i): = m^*(q_i)z^*(q_i)$. 

Assume zero entry, assume a soprano's outside option (e.g. becoming a software engineer) is $K$. Then
$$
\begin{align}
& Y^s = \int_{q_i \ge q_0} y(q_i)\phi(q_i) \,\text{d}i.\tag{5}\cr
& R(q_0) = K\tag{6}.
\end{align}
$$
(6) pinns down $q_0$. Note that when $q_0$ is fixed, supply (5) is increasing in $v$. Then equating demand (4) and supply (5) uniquely pins down $v$ that clears the market.

-----

## Analysis:

### 1 internal diseconomies

Aka, production costs rise as soprano sings to more customers ($C(m)$).

Assume $h(q, m) = q = z$. Every single soprano's problem reduces to
$$
R(q) = \max_m(vq - s)m - C(m)\Rightarrow \frac{\text{d}{m^*(q)}}{\text{dq}} = \underbrace{\frac{v}{C''(m)}}_\text{$C$ is convex}>0.
$$
So a soprano's supply increases with her talent $q$. The paper claim, from this math:

> This case is important in showing that the tendency toward skewed rewards arising from convexity of revenues holds under very general circumstances: individuals who, by virtue of superior talent and ability in an activity, can sell their services for higher prices have strong incentives to produce more so long as costs are not perfectly correlated with talent.
>
> The increase in both price and quantity with quality implies that talent has a multiplicative effect on reward. It is surprising that the tendency toward skewed rewards is not necessarily dependent on indivisibilities and occurs in the linear efficiency-units case, perhaps the weakest possible specification. However, no relative skew is implied in the distribution of output in this case because there are no interactive effects in that dimension of the problem.

### 2 Pure JOint consumption

The author assumed $C(m)\equiv 0$ and  $h(q, m) = q = z$. In this case, if all sopranos are of the same talent, only one is required and she earns zero profit and she supplies the whole market.

Then with *a set of assumptions that is somewhat unclear*, the author argued that

- If talent is densely distributed on $[q_0, q^*]$, the top soprano supplies the whole market but makes zero profit.
- When talent distribution has an *outlier* $q^*$ (ie a jump in the cdf) the top soprano can extract rent.

### 3 external diseconomies

Assume sopranos have $C(m) \equiv 0$, but $z = h(q, m)$, price follow $p = vz - s$. Sopranos should maxmize the following problem
$$
\begin{align}
R(q): = &\max_{m} (vh(q, m) - s)m .
\end{align}
$$
The author analyzed the soprano's optimal supply $m^*$ and price $p^*$ based on the above problem: if $h_{qm} > 0$, sopranos with higher talent would supply more: $q\uparrow \Rightarrow m^*\uparrow$. But price gradient:
$$
\frac{\text{d}p}{\text{d}q} = vh_q + \underbrace{vh_m(\frac{\partial m}{\partial q})}_{< 0}
$$
so price increase not so much.

### 4 heterogeneous consumers

The author gave a text-based explain of *what happens when consumers are different in their fixed cost of consumption $s$.* 

First, **$p(z)$ would be convex**. This conclusion, though not formally proved, is actually quite insightful and deserves a more thorough revelation:

> *Note*: think of (1) as the *revealed price curve* out of consumer's optimization. In general, consumer's optimization would *convexifies* $p(\cdot)$ (see [Tenant's Optimization Behavior Convexifies Nonconvex Rent Function](/posts/nonconvex_rent_function/) for a concrete example). Because the special structure of the consumer's problem here, the revealed $p(\cdot)$ is not only convex but also linear.

Based on the premise that $p(z)$ is convex, the paper reasoned that differentiation in both consumers ($s$) and sopranos ($q$) will have a nice sorting effect. Because **(i)** sopranos with more talent gravitate to the price level where slope of the price curve is steeper and **(ii)** consumers with lower $s$ find quantity relatively cheaper hence *economize* on quality, while those with larger $s$ demadn greater quality and economize on quantity.

### 5 demand shift

The paper's analysis here is very clear so I'll just cite the og:

> An increase in the number of consumers or in the intensity of their demands for $y$ increases the market demand for [sopranos]. Market equilibrium price $v$ rises due to rising supply price. Hence unit prices, $p(q)$, of all sellers increases. Since $R(q) $ increases every-where, less talented people enter. At the same time, existing [sorpanos] expand their scales of operations. Though average quality of [sopranos] falls, all previous entrants earn larger rents than before, and the largest increases accrue to the most talented persons. Therefore the distribution of reward becomes more skewed than before.
>
> The important practical implication is that it is monetarily advantageous to operate in a larger overall market; and it is increasingly advantageous the more talented one is.
>
> No wonder that the best economists tend to be theorists and methodologists rather than narrow field specialists, that the best artists sell their work in the great markets of New York and Paris, not Cincinnati, or that the best writers are connected with the primary literary centers such as New York or London. The best doctors, lawyers, and professional athletes should be found more frequently in larger cities. For a given place in the distribution of talent, it is more lucrative to be a violinist than an accordianist, a heavyweight than a flyweight, a rock musician than a folk singer, a tennis player than a bowler, or a writer of elementary texts rather than of monographs.

### 6 supply shift

This is the part where it gets interesting. The paper focus on how *lesser diseconomies* affect output, price and talent in the market. Note: "internal diseconomies" = $C(m)$. "External diseconomies" = $h(q, m)$.

- Less diseconomies increase market supply and reduce equilibrium price ($v \Downarrow$).
- If demand is sufficiently elastic, decrease in internal diseconomies $C(m)$ increase the concentration of more talented sopranos, but also allow more entry so average talent decreases.
- If demand is inelastic, decrease in external diseconomies $h(q, m)$ would kick out the less talented ones and increase average quality of those remaining.

Therefore, in the real world, if we think demands are elastic, with increasing communication technology (hence, less diseconomies), market concentration increases and the top players would charge growingly more rent.

### 7 increase in $s$

Recall $s$ appear in consumer's problem as fixed cost of each unit consumption:
$$
\begin{aligned}
& \max_{n,z,x}u(x, nz)\cr
& s.t. \ x + (p(z) + s)n \le I.
\end{aligned}
$$
The paper predicts that an increase in $s$ reduces market supply. Consumers substitute to better sopranos and less talented ones exit the market. $v$ also increases, which leads to higher $R(q)$ for those talented sopranos who remains in the market, resulting in more concentration.

The paper relates to the reality and argues that — what happens in reality — people get richer over time, their wage rises, so their time becomes more valuable => **$s$ rises.** Income effect increase demand, but supply drops according to the paper's model, therefore $v$ rises and there is more concentration. It gets to a point of hand-waviness that I'm not sure if this is valid model prediction or simply putting together arguments to justify what the author believes.

