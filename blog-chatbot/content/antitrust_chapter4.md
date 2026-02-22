---
title: "a thousand and one nights of oligopoly, collusion and antitrust | the Cournot model"
date: 2024-05-14T00:22:18+08:00
draft: false
---

> Reading notes of Chapter 4 of ***ECONOMICS OF REGULATION AND ANTITRUST (2018)***, by Viscusi, Harrington Jr. and Sappinton.

The theories of collusive and oligopoly pricing is powered by the mathematical tools of  **economic analysis** and **game theory**.

An oligopoly is an industry with a small number of sellers. The criterion of ***small*** is, "whether firms take into account their rivals' actions when deciding on their own actions". And we model this economic setting as a game–a list of oligopolies in the market as playes, whose actions includes setting prices or production quantities, and the actions of all players jointly determine the outcome for everyone.

The pioneering work of Augustin Cournot in 1838 opened up the study of oligopoly. As it has turned out, the first model of oligopoly is still one of the most widely used ones.

### the standard Cournot model

To begin with, consider two symmetric oligopoly firms. The total production in the market jointly determines the demand curve. Assume that market demand takes the following form:
$$
P = 100 - Q
$$
If the industry supplies $Q$, the price that equates supply and demand is $100 - Q$. Marginal production cost is assumed to be \$40. A monopoly with this marginal cost will produce $Q^* = 30$ units and earns monopoly profit equals \$900.

The Cournot model assume the two oligopoly firms decide their production quantity on their own–every firm's action space is essentially their production quantity $q_i, i = 1, 2$. Assume that their production cost per unit is \$40 as well. Joinly, their actions induce market price $P = 100 - q_1 - q_2$ and the revenue earned by each seller
$$
\pi_1(q_1, q_2) = (100 - q_1 - q_2)q_1 - 40q_1\\
\pi_2(q_1, q_2) = (100 - q_1 - q_2)q_2 - 40q_2
$$
Consider the Nash equilibrium of the above game: for some $(q^*_1, q^*_2)$ to contitutes a Nash Eq., they should be each others' best reply:
$$
q_1^* = \arg\max q_1'\pi(q_1', q_2^*)\\
q_2^* = \arg\max q_2'\pi(q_1^*, q_2')
$$
The Nash Eq. solves to be $q_1^* =q^*_2 = 20$. Cournot price (i.e. the Nash Eq. induced market price) is \$60, which exceeds the competitive price of 40 (which equals marginal cost) but is less than the monopoly price of 70.

### the infinitely repeated Cournot game

Let $r<1$ denote the time discount rate. Let $q_i^t, t = 1, 2, \ldots$ denote the period $t$ production quantity of firm $i, i = 1, 2$. General strategy space is a mapping from historical information to a production quantity. Firm's profits over the long run is accumulated as
$$
\sum_{t = 1}^\infty r^{t - 1}q_i^tD_i(\mathbf q)
$$
One Nash equilibrium for the infinitely repeated Cournot game is then just a repetition of the Cournot solution. Alternatively stated, repetition of a Nash equilibrium for the single-period game is a Nash equilibrium for the infinitely repeated game.

In general, strategy might be anything mapping from history to production quantity of the current period. Consider a slightly more nuanced strategy that allows a firm’s output to depend on how much its competitor produced in the past:
$$
\begin{align}
q_i^1 & = q_i^{\star} & \cr
q_i^{t} & = \begin{cases}
q_i^{\star} & \text{if }q_i^t = 15,\forall i\in [n]\cr
q_i^* & \text{otherwise},
\end{cases}
\end{align}
$$
where $q^*$ denotes the Cournot solution price (the Nash Eq.) and $q_i^\star$ denotes the monopoly price that jointly optimizes all sellers' total revenue.

Working through the algebra, as long as future interaction is possible, and a firm sufficiently values future profits, the number of firms is good, firms will prefer not to cheat and collude. But, in practice, effective collusion requires much more than finding a Nash Eq. 

