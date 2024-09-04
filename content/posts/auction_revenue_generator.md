---
title: "How auctions conquered the internet | the Game Changer podcast with Michael Ostrovsky"
date: 2024-09-03T22:52:08+08:00
draft: false
---

Here's an episode of ***Game Changer*** - the game theory podcast that shares enthusiasm and passion for game theory and its applications. [Link](https://tws-gamechanger.libsyn.com/how-auctions-conquered-the-internet-with-michael-ostrovsky) to the podcast ***How auctions conquered the internet***.

> In this episode Michael Ostrovsky walks us through the history of online advertising auctions, from their modest beginnings at Yahoo and other internet pioneers to the lucrative business models many internet giants like Google and Amazon rely on today. Even though online ad auctions are a story of incredible success Michael also gives some insights into which flaws existed in its early days and how these were overcome as time passed.

Buckle up, here are the interesting points:

## two models

Two primary auction types dominate online advertising: display ads and sponsored search. Ostrowski provides a clear distinction between the two—the key difference is that whether the user proactively input a 'keywords' or not. Display ads are somewhat more akin to traditional advertising, where ads appear on platforms not necessarily related to the user's immediate intent. For example, ads on Facebook—users are primarily there to connect with others rather than to make purchases, but they might see ads that relates to their previous shopping tendency.

On the other hand, sponsored search ads target users' specific search queries. This method allows advertisers to **bid** on keywords relevant to their products, ensuring that their ads appear alongside search results when those particular terms are queried. The effectiveness of sponsored search lies in its ability to deliver highly targeted advertising, matching what users are actively seeking at that moment.

## 20 minutes for 20 years

The development of auction design in selling online ads is largest and possibly coolest application of game theory. Ostrowski's exploration into sponsored search auctions highlighted several key innovations that have defined this space:

1. ***Pay-per-Click Model***: Moving away from traditional ad **impressions**, sponsored search adopted a ***pay-per-click*** model, where advertisers only pay when a user clicks on their ad. This model aligns the costs of advertising with actual user engagement, making advertising spending more efficient and measurable (with the use of tracking technologies)
2. **Quality matters**: Google incorporated advertisers' relevance (quality score) into the auction mechanism to improve both the user experience and auction efficiency.
3. **Decentralization of Sales Teams**: Early online advertising required interaction with sales teams for ad placements. However, the ad auctions are made to be automated—early 1997 at the beginning of the online ads, platforms like GoTo pioneered **programmatic advertising** where advertisers could manage their campaigns through user interfaces or even, APIs—forget those sales team. This shift not only scaled the advertising process but also introduced a higher level of granularity and efficiency in how ads were targeted and bid upon.
4. **Auction Mechanism Design**: Perhaps the most significant area of innovation has been in the auction mechanisms themselves. The initial generalized first-price auction, which lacked stability due to non-existent Nash equilibria, led to continuous bid cycling and server overloads. To address these issues, Google and others moved towards the Generalized Second Price (GSP) auction. In GSP auctions, advertisers are ranked not just by their bid amounts but also by a 'quality score,' which considers the relevance and click-through rates of their ads. Importantly, advertisers pay the amount bid by the next lower bidder, which helps stabilize the auction dynamics.

## game theory in work

The GSP auction has become a standard in online advertising, largely due to its balance of simplicity and effectiveness in dealing with multiple ad slots. While not fully incentive-compatible, it's better in various ways. The design tweaks made by platforms like Google have ensured that while bidders might adjust their strategies based on position preferences, the overall auction environment remains stable and profitable.

Lastly, Ostrowski discusses his current focus on providing auction-based advertising solutions through his company, **TopSort**. He reflects on the evolution of advertising auctions, their critical role in the revenue streams of major tech companies, and the broader impact on market dynamics. Topsort aims at providing off-the-shelf solution for businesses needing sophisticated auction systems without the overhead of developing them in-house.
