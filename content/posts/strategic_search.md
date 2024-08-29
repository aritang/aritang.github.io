---
title: "dynamic persuasion and strategic search"
date: 2024-01-05T23:59:49+08:00
draft: false
tags: ["paper"]
---

It's always a refreshing activity to start the morning with a MS paper - even better, a freshly published one right in Nov. 2023.

> ### Dynamic Persuasion and Strategic Search
>
> [Yunfei (Jesse) Yao](https://www.jesseyao.com/), [Management Science](https://doi.org/10.1287/mnsc.2023.00994) 22 Nov 2023
>
> ***ABSTRACT***
>
> Consumers frequently search for information before making decisions. Because their search and purchase decisions depend on the information environment, firms have a strong incentive to influence it. This paper endogenizes the consumer’s information environment from the firm’s perspective and endogenizes the search decision from the consumer’s perspective. We consider a dynamic model where a firm sequentially persuades a consumer to purchase the product. The consumer only wishes to buy the product if it is a good match. The firm designs the information structure. Given the endogenous information environment, the consumer trades off the benefit and cost of information acquisition and decides whether to search for more information. Given the information acquisition strategy of the consumer, the firm trades off the benefit and cost of information provision and determines how much information to provide. This paper characterizes the optimal information structure under a general signal space. We find that the firm only smooths information provision over multiple periods if the consumer is optimistic about the product fit before searching for information. Moreover, if the search cost for the consumer is high, the firm designs the information such that the consumer will be certain that the product is a good match and will purchase it after observing a positive signal. If the search cost is low, the firm provides noisy information such that the consumer will be uncertain about the product fit but will still buy it after observing a positive signal.

Although, one might find it more convenient to read the conlusions part for a slightly deeper understanding

> Consumers frequently search for information before making decisions. Since their search and purchase decisions depend on the information environment, firms have a strong incentive to influence it. This paper endogenizes consumers’ information environment from the firm’s perspective under a general signal space. We examine the optimal information provision strategy of a sender and the optimal information acquisition strategy of a receiver when the sender sequentially persuades a receiver to take a particular action. The sender prefers that action regardless of the unknown state, while the receiver only wishes to take that action if the state is good. In our model, the sender incurs a cost to provide information, and the receiver incurs a cost to search. The receiver trades off the cost of searching and the benefit of obtaining more accurate information to make better decisions. The sender trades off the cost of information provision and the benefit of persuading the receiver to search and then take the sender’s preferred action. We allow for gradual communication between the sender and the receiver. Consequently, the sender also makes the intertemporal trade-off of smoothing the information to reduce the persuasion cost.

OK. So it's pretty common a practice that people uses convex function to measure cost of provision information. But in this paper, the convexity assumption leads to the fact that, the seller (information sender) would like to "smooth" information and do the persuasion job multiple times. Also, the information receiver (buyer's) action is assumed to be strategic, so the game cannot be characterized using a standard linear program.

I'm not an expert in subgame perfect eq. (maybe I should take a look at it, fuck) so that I'll omit discussing the detail of this paper. But its application part is particularly interesting to think about, and really does shed insight on application of information design:

- Value-added Branding in Luxury Goods

    A luxury goods company wants to add value to its branding. In each period, the seller (sender) can spend money on building the luxury image of her brand. An example of the spending is advertising, which has increasing marginal costs. **It may be more costly for the seller to reach richer and busier customers.**

- Lobbying

    Companies (sender) have a strong incentive to influence a regulator’s (receiver) policymaking. The regulator is deciding between policies A and B, which can be a high or low standard on car/food safety, a strict or relaxed policy on privacy, etc.. The company’s cost is the effort it incurs to persuade the regulator. Raising the effort level has an increasing marginal cost.

    *BUT if many other companies also have valuable information, and even, have conflicting interest, it would be cumbersome.*

- Online Advertising

    *I thought I'm already too familiar with online-ads-sponsor-search shits but this is pretty much something I never thought of*

    Consumers (the receiver) frequently search online to learn more about the product before making a purchasing decision. The advertiser (sender) can target a consumer (showing one ad) or retarget him (showing multiple ads to the same consumer). In each period, the advertiser can bid for the advertising spot and persuade the consumer to purchase the product. She directly controls how precise the advertising content is but can only affect the winning probability indirectly through the bidding amount. **In a symmetric N-bidder first-price auction with i.i.d. uniform distribution of the valuation, the bidding amount is convex in the winning probability. (OK, this is fuzzy and simple but true anyway).**  The overall likelihood that the consumer receives a positive signal, $\lambda$ equals the probability that the advertiser reaches him (winning probability) multiplied by the probability that he likes the advertising content, and is thus proportional to the winning probability. So, the advertiser’s cost is also convex in the amount of persuasion. The consumer’s cost $c$ is their time. The prior belief can come from word of mouth or past experience.

    Our model can explain why advertisers most frequently retarget consumers who have added the product to the shopping cart/list. Those consumers, on average, have a high prior belief about the product. Our model predicts that advertisers will persuade these consumers in multiple periods.

