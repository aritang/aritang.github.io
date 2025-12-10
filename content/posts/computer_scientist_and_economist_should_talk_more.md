---
title: "Professor Roughgarden on Why Computer Scientist and Economists Should Talk to Each Other"
date: 2025-12-04T21:06:07-06:00
draft: false

---

Professor Roughgarden came to University of Chicago!

### Day 1: Shill-Proof Auctions

The paper *Shill-Proof Auctions* (https://doi.org/10.48550/arXiv.2404.00475) was presented the first day 

Professor Roughgarden introduced shill bidding from a broad angle. Reconsider the basic premise of the *credibility* of a mechanism. For instance, in a sealed-bid second-price auction, how can a bidder *verify* that they are truly paying the second-highest bid given that it's a sealed bid auction in the first place? One credibility concern in auction is shill bidding, where the mechanism designer (the auctioneer) injects fake bids.

The key challenge of modeling and make sense of the shill bid model is **who knows what at when**. As far as I recall, the key takeaway was the following:

> **Theorem** no optimal auction is (i) single auction (ii) strategyproof and (iii) weakly shill-proof.

As a consequence, English and first-price auctions are shill-proof.

## Day 2:

{{<figure align="center" width="100%" src="/online/cs_econ_talk.jpeg" caption="Professor Kamenica: 'This is a dangerous claim!'">}}

The talk was a crash course on *Twenty Lectures on Algorithmic Game Theory*. For the record, Professor Roughgarden covered network games, the computability of equilibrium concepts, and the price of anarchy.

My home university offers a full course based on this textbook for theoretical computer science PhD students. I audited it during my sophomore year, TA-ed it in my junior year, and officially took it in my senior year when it was offered to the undergraduate pilot class (I know it's weird, don't ask...). Now, in the first year of my PhD, I’ve taken the crash-course version from Tim himself. It was enlightening to be in the talk and to revisit the differences in reasoning styles, methodological preferences, and attitudes toward mathematics as I continue shifting from “CS person” to economist. I remember vividly Tim's reflection:

> CS people **loathe** making assumptions, partly because of CS history: once an algorithm is designed, people may look it up and use it for their own purposes, so you want it to be as general as possible. 
>
> Economists, on the other hand, want to make a point and are generally happy to commit to whatever assumptions make the conclusion mathematically closed-form and interpretable. 
>
> The intersection of the fields is expanding, and we’re seeing students’ papers converge in both methods and topics.

The two fields launched in the mid-20th century are circling back toward each other today. The open problems sit squarely in the overlap. In my pov, the space feels early, and that’s usually a good sign.
