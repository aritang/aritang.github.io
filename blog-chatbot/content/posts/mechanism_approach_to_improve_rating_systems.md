---
title: "Selling Coins to Improve Rating Systems"
date: 2025-07-11T15:40:05+08:00
draft: false
---

Came across a paper that proposed an interesting mechanism to improve rating systems. This is a very very good idea.

> ## RewardRating: A Mechanism Design Approach to Improve Rating Systems
>
> Vakilinia, Faizian, Khalili. Games (2022) https://doi.org/10.3390/g13040052
>
> "To improve rating systems, in this paper, we take a novel mechanism-design approach to increase the cost of fake ratings while providing incentives for honest ratings."
>
> ...
>
> "Our proposed mechanism RewardRating is inspired by the stock market model in which users can invest in their ratings for services and receive a reward on the basis of future ratings."

The paper proposed a market for ratings. Consider one product to be rated. Assume there are $R = \lbrace 1, 2, \ldots, n\rbrace$ discrete rating scores (eg. n = 5 for Google Map). Let $C = \lbrace c_1, \ldots, c_n\rbrace$ be the set of ***coins*** associated with each level of rating. The market consists of raters, and **raters have to buy coins to rate**. The mechanism set price $\alpha$ for buying a coin and $\beta$ for selling a coin.

The mechanism runs multiple periods. At each time $t = 1, \ldots, T$, a rater $i$ can either rate $j$ by buying corresponding coins ($c^t_{ij}$), or sells his coins. *Note*: there is no time discount in this paper, and this paper also doesn't consider the incentives of joining early, so I guess we can without loss assume that at each time point, only one rater takes action (buy or sell).

At each time point, raters who own coins are stakeholders, denote the set as $\mathcal U$. The *state* can be characterized as vector $\vec c^t = (c_1^t, \ldots, c_n^t)$ recording the number of coins for each rating $j = 1, \ldots, n$. Then, an aggregated score is calculated as
$$
\sigma^t := \frac{\sum_j{j \times c_j^t}}{\sum_j c_j^t}.
$$
The paper incentivizes truthful rating by **profitsharing** to stakeholders. The mechanism distribute the profit from selling a coin $\gamma = \alpha - \beta$ to stakeholders as follows: **each owner of coin $c_w$ gets a share of the profit when a new coin is bought for rating $c_j$** at time $t$, w.r.t. a function $f(w, j)$:
$$
p_w^t = \gamma \times \frac{f(w, j)}{\sum_{q\in \mathcal W_j^t}\sum_{u_k\in \mathcal U}x_{kq}^tf(q, j)}\tag{$\star$}
$$
where, $\mathcal W_j^t$ is a 'separation set' including only raters whose ratings are in the right direction w.r.t. the new rating $j$ compared to current rating $\sigma^t$:
$$
\mathcal W_j^t = \begin{cases}
\lbrace i\in [n]: \sigma^t < i \le n \rbrace & j> \sigma^t\cr
\lbrace i\in [n]: 1 < i \le \sigma^t \rbrace & j< \sigma^t\cr
\lbrace i\in [n]: 1 \le i \le n \rbrace & j = \sigma^t.\cr
\end{cases}
$$
The paper proved that this mechanism is budget-balanced (Proposition 1) and has some incentive-compatibility property (Proposition 2).

----

I think the most interesting and valuable part of this paper is the idea that every rater not only submit a rating, but also got to "buy" some coins for their rating. In this way, ratings are associated with another signal about how sure they are.

The paper established an awesome framework yet moderately dived into this topic. I think there's a lot to explore here — for example, instead of buying two $j = 3$ coin, what if a rater buys $j = 2$ first then $j= 4$? 

And like, a sequential game introduces just as much interesting possibilities as troubles. Say, what if someone wants to join later so as to free ride on other's ratings.

Plus, doesn't $f(w, j)$ seem like a scoring rule in disguise?
