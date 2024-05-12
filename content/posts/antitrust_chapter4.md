---
title: "a thousand and one nights of oligopoly, collusion and antitrust"
date: 2024-05-14T00:22:18+08:00
draft: true
---

> Reading notes of Chapter 4 of ***ECONOMICS OF REGULATION AND ANTITRUST (2018)***, by Viscusi, Harrington Jr. and Sappinton.

The theories of collusive and oligopoly pricing is powered by the mathematical tool of **economic analysis and game theory**.

An oligopoly is an industry with a small number of sellers. The criterion of ***small*** is, "whether firms take into account their rivals' actions when deciding on their own actions". And we model this economic setting as a game–a list of oligopolies in the market as playes, whose actions includes setting prices or production quantities, and the actions of all players jointly determine the outcome for everyone.

### the Cournot model

The pioneering work of Augustin Cournot in 1838 opened up the study of oligopoly. As it has turned out, the first model of oligopoly is still one of the most widely used ones.

To simplify the analysis, consider two oligopoly firms whose marginal cost is \$40, and the market demand function is
$$
P = 100 - Q
$$
If the industry supplies $Q$, the price that equates supply and demand is $100 - Q$. A monopoly with the same marginal cost will produce $Q^* = 30$ units and earns monopoly profit equals \$900.

The Cournot model assume the two oligopoly firms decides their production quantity on their own. Hence, their action space is essentially a scaler $q_i, i = 1, 2$. Joinly, their actions induce market price $P = 100 - q_1 - q_2$ and the revenue earned by each seller
$$
\pi_1(q_1, q_2) = (100 - q_1 - q_2)q_1 - 40q_1\\
\pi_2(q_1, q_2) = (100 - q_1 - q_2)q_2 - 40q_2
$$
Consider the Nash equilibrium of the above game: for some $(q^*_1, q^*_2)$ to contitutes a Nash Eq., they should be each others' best reply:
$$
q_1^* = \arg\max q_1'\pi(q_1', q_2^*)\\
q_2^* = \arg\max q_2'\pi(q_1^*, q_2')
$$
The Cournot price (i.e. the Nash Eq. in this setting) is \$60, which exceeds the competitive pricing solution.

