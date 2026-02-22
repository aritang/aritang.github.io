---
title: "Market for Computation Resource"
date: 2025-10-06T10:07:26-05:00
draft: false
---

Bloomberg has the story *[The AI Boom Needs a Market for Compute](https://www.bloomberg.com/news/articles/2025-09-26/the-ai-boom-needs-a-market-for-compute-just-like-oil-and-spectrum?utm_source=website&utm_medium=share&utm_campaign=copy)*. It claims that still now AI companies who need to buy computing resources have to reach a sales representative:

> In the clunky current system, the chief operating officer of an AI company calls up Amazon Web Services Inc. or CoreWeave and asks for a price. — Bloomberg

And,

> ... The godfather of spectrum auctions Paul Milgrom and his company, Auctionomics Inc., have [teamed up](https://www.businesswire.com/news/home/20250729678918/en/Auctionomics-and-OneChronos-Partner-on-First-Tradable-Financial-Market-for-GPU-Compute) with OneChronos Markets, a company that builds smart exchanges, to do for compute what Milgrom did for spectrum. — Bloomberg

### The Economics:

> [Auctionomics and OneChronos] announced a partnership to develop the first financial market for GPU and compute capacity... [eg. computing resources such as data center access, GPU capacity]
>
> ... the new off-exchange marketplace will be designed to deliver real-time price discovery and liquidity through bi-lateral forwards which will provide users with the ability to lock in future capacity and pricing in advance... This new market structure will enable companies to **secure compute capacity at predetermined prices for future delivery dates**, providing the price certainty, capacity guarantees, and planning visibility that enterprise customers require for AI initiatives and large-scale computing projects. — Businesswire

Interestingly, unlike spectrum auction, this time the market design also seem to involve more people

> It’s more than fine for a slew of hedge funds and other financial institutions to start speculating in the market without actually wanting to use the product being traded: Their involvement will be crucial to spreading risks and providing liquidity. — Bloomberg

### Engineering

> Powering this market will be OneChronos’ Smart Market technology: **combinatorial auctions that use mathematical optimization to match counterparties based on complex, multi-asset preferences**. — Businesswire

I guess some LLM application is involved as well:

> This technology allows participants to **express nuanced trading goals across portfolios and unlock efficiencies that traditional one-to-one markets can’t achieve**. — Businesswire

And the whole auction design sounds like a lot of engineering effort (definitely not a simple 2nd price auction would solve):

> Applied to compute, the technology can *optimize across the interdependencies between different types of resources, capturing synergies that conventional auctions may miss*. (????) Eventually, participants will be able to bid on bundles of compute capacity, power capacity, energy storage, and other compute-upstream resources, enabling efficient allocation across diverse and dynamic computing needs. — Businesswire

### Random Question...

Will the market of computation resource be stable and an 'ideal' financial market, if the market clearing mechanism (eg. combinatorial auction that assigns demands to computation power) is not easy to solve for feasibility and optimality?

### Reference

*Auctionomics and OneChronos Partner on First Tradable Financial Market for GPU Compute.* Businesswire. Jul 29, 2025. https://www.businesswire.com/news/home/20250729678918/en/Auctionomics-and-OneChronos-Partner-on-First-Tradable-Financial-Market-for-GPU-Compute?utm_campaign=shareaholic&utm_medium=copy_link&utm_source=bookmark

*The AI Boom Needs a Market for Compute*. Bloomberg. Sept. 26, 2025. https://www.bloomberg.com/news/articles/2025-09-26/the-ai-boom-needs-a-market-for-compute-just-like-oil-and-spectrum?embedded-checkout=true

