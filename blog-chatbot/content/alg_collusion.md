---
title: "When Algorithms Collude by Dropping Bids"
date: 2025-10-04T23:18:10-05:00
draft: false
summary: "A brilliant blend of economic modeling and reinforcement learning."
---

One more insightful paper presented at the Conference on Frontiers in Machine Learning and Economics:

> ## Algorithmic Collusion of Pricing and Advertising on E-commerce Platforms
>
> Hangcheng Zhao, Ron Berman (2025) https://arxiv.org/abs/2508.08325

Online sellers increasingly use AI algorithms to set both prices and ad bids. While concerns center on tacit collusion raising prices, this paper shows otherwise when pricing and advertising decisions are jointly made. 

In the paper, the authors models competing **sellers** on an e-commerce platform who simultaneously choose prices and advertising bids. **Consumer** has search friction, and is modelled as: a fraction $\theta$ of consumers stop after viewing only the top sponsored product, while the remaining ($1-\theta$) continue browsing further listings. Conditional on their consideration set, consumers choose according to a standard logit demand.

Seller profits combine revenue from sponsored and organic consumers, minus production, platform commissions, and ad expenditures determined by the auction outcome. This two-dimensional action space couples advertising and pricing: higher bids increase visibility but also raise effective costs, which feed back into prices. The consumer choice set with search costs is the core innovation—it ties the ad auction and demand structure together in a way that endogenizes how algorithms can coordinate on bids and, through them, on prices.

On top of this theoretical framework, the authors use **multi-agent reinforcement learning (MARL)** as an equilibrium solver. Sellers are modeled as Q-learning agents that adaptively adjust price–bid strategies in repeated play. This allows the system to converge toward stable policies in an environment too complex for closed-form analysis. 

The simulations reveal an unexpected pattern: with **low search costs**, learning converges to the familiar supra-competitive prices (as in Calvano et al. 2020), but with **high search costs**, algorithms instead coordinate on **low bids**, reducing ad expenditures and pushing **prices below the competitive benchmark**. Empirical calibration with large-scale Amazon data provides supporting evidence: algorithm usage correlates with lower prices when search costs are high.

---

The paper is a brilliant blend of economic modeling and reinforcement learning — tackling a model so intricate that most economists wouldn’t even dare to touch it. It’s genuinely cool work.
