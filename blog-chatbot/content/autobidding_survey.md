---
title: "Reading Notes | Auto-biddings and Auctions in Online Advertising by Aggarwal et al. (2024)"
date: 2024-09-08T15:22:28+08:00
draft: false
---

This survey comprehensively covers the recent developments over the past two decades in autobidding within the online advertising ecosystem:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/google_ad_gossip/autobidding.jpeg" caption="Most research focuses on specific interactions between two of these components, often through the lenses of mechanism or algorithm design. Alimohammadi (2023)." width="88%">}}

The complexity of the system is evident as it integrates various components—the advertisers, the autioneer, the auto-bidding agents—they are rarely analyzed collectively.

The key areas of focus in the survey are divided into three main perspectives:

## Bidding Algorithms

Autobidding agents take high-level inputs (value, budget, RoS targets) and bids into auctions on behalf their delegating advertisers. Autobidder's problem is largely an LP, and its dual helps:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/google_ad_gossip/autobidding_LP.jpeg" caption="excerpts from Aggarwal et al. (2024)" width="99%">}}

### Online Learning for autobidders

> There is a recent line of work studying the design of online learning algorithms under uncertainty. Most work in the literature consider **a finite horizon model in which the bidder participates in $m$ sequential auctions and constraints are enforced over time across auctions.** For simplicity, we consider a single-slot auction. In this online model, **when the $j$-th auction is announced, features are shared with the bidder and they estimate a value $v_j$ for winning the auction**. The value $v_j$ is exogenously given and usually estimated using offline machine learning models. Valuation models tend to be more stable over time and can be trained across many advertisers and long periods of time (He et al., 2014; Juan et al., 2016; Lu et al., 2017; McMahan et al., 2013; Zhou et al., 2018). The payment $p_j$ is learned after the auction is cleared. While the value $v_j$ is learned before bidding in the $j$-th auction, future values are not known in advance.

The survey convered learning algorithm bounds investigated under various input models, stochastic and adversarial, and for truthful and non-truthful auctions.

## Equilibria and Price of Anarchy (PoA)

The survey discussed previous results for PoA for a number of solution concepts and auction formats. Apart from the standard question of finding the exact PoA value, other interesting study points mentioned include (i) the value of randomized mechanism, (ii) the presence of budget constraint and (iii) existence of equilibrium, and (iv) basic auction formats with reserves and additive boosts.

## Auction Design

For the section, the survey takes the perspective of the mechanism designer—then, the core question revolves around devising efficient auction formats that accommodate the strategic behaviors of autobidding agents.

Most works assume prior distributions for the bidding agents (i.e. Bayesian mechanism design). In general, agents would have three types of private information: value, budget and target RoS. Recent work varies on whether each of these information is private or public, as well as the utility function of agents.

> A distinctive feature of the auction design literature for autobidding auctions is the assumption that valuations are public instead of private as it is standard in the mechanism design literature. This assumption is predicated on the fact that advertisers increasingly rely on the machine learning algorithms that are developed by the advertising platforms to predict clicks and conversions.

The survey discussed one paper that considered a non-Bayesian model and corresponding prior free auction design: "In other words, the allocation and payment of each single auction are no longer independent, instead, all the auctions are interdependent."

The last section mentioned studies around alternative definition of the RoS constraint, where the constraint is enforced for each auction $j$ separately rather than the aggregation over all $m$ auctions. In this case, GSP is incentive compatible for the bidding agents, which in general does not hold. This allows for a further studies for blend of (public and, possibly private) utility-maximization and value-maximization objectives.

## emeging topics

In the last 'emeging topics' section, the discussion goes beyong the preceding three large pools. 

One, since the real objective of the advertisers and the autobidding agents are for sure not equivalent, study of utility alignment between advertisers and bidding agents is interesting. For example, using the principal-agent model. In general, this stream of research applies more economic tool box than the autobidder segment.

This segment also examines the strategic dimensions of multi-channel advertising, where autobidders, auctioneer and advertisers potentially operate across multiple platforms, adding layers of complexity to the auction design.

And, last but not least, empirical studies:

> The performance of different auction formats is usually analyzed in terms of PoA, which essentially focuses on welfare analysis in the worst-case scenarios, while the real-world instances could have much better equilibrium welfare. To complement the theoretical analysis...

## closing remarks

The ad ecosystem’s growing  reliance on autobidding highlights broader market dynamics and technological trends, suggesting a potentially turbulent yet innovative and lucrative future for online advertising.

### reference

Aggarwal, Gagan, et al. "Auto-bidding and Auctions in Online Advertising: A Survey." *arXiv preprint arXiv:2408.07685* (2024).


Alimohammadi et al. Incentive Compatibility in the Auto-bidding World. In Proceedings of the 24th ACM Conference on Economics and Computation (EC '23). https://doi.org/10.1145/3580507.3597725
