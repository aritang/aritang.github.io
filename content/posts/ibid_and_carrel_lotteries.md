---
title: "Miniature Markets | Booth's iBid Course Auction and Carrel Lottery"
date: 2025-09-18T21:41:12-05:00
draft: false
---

Two fascinating cases of market design for grad students at UChicago.

### Bidding for classes

At Booth, students enroll in courses through an auction system. The process runs across four stages — each a separate round of auction, with waitlist and drop-refund rules layered in.

{{<figure align="center" src="/market_design/ibid_schedule.jpeg" caption="The bidding schedule for Fall 2025 quarter" width="100%">}}

At the start, students are endowed with virtual currency (e.g. 8,000 *Bid Points* for new PhDs; returning students carry over 2,000 points per course completed). They can see the total seat supply, remaining spots, and the clearing prices from all past rounds — including the current quarter.

At the end of each stage, the market “clears.” Winning students are placed into courses and pay the **Lowest Successful Bid**, a kind of generalized one-point-five-price auction:

{{<figure align="center" src="/market_design/ibid_spa.jpeg" caption="Not quite incentive compatible... It's definitely not IC cause even normally with n winners, you’d charge the (n + 1)th bid." width="100%">}}

Students have three extra actions available:

- **Drop**: dropping costs vary by stage (see previous bidding stage pic for details)
- **Alternate Bid**: when bidding on one course, students can simultaneously bid on alternatives taught by the same instructor or section, free of charge.  
- **Waitlist**: opens in Phase 3. Students who didn’t win are ranked by their Phase 3 bids; if later admitted, they pay their bids. After Phase 3, anyone can join the waitlist, but only after unsuccessful bidders — and for free.  

> It’s a bit confusing even for me. Well we need these extra rules to address nuanced concerns. This is also partly because the mechanism isn’t incentive compatible in the first place. In my view, a straightforward descending-clock auction would be far cleaner.

###### **Disclaimer**: I have huge respect for our lovely, impeccably professional admin staff — *they’re the ones who keep the system running while fielding endless student frustrations* (for example, when students launched a [*Petition to Protect Chicago Booth Evening/Weekend MBA Program Access*](https://www.change.org/p/petition-to-protect-chicago-booth-evening-weekend-mba-program-access)). We theorists, meanwhile, are much better at pointing out flaws than actually fixing them.

### Carrel lottery

Each year, ~25 incoming PhDs choose carrel desks in McGiffert. Everyone wants the window corners, and some programs also require their students to sit together — adding constraints to the allocation.

It’s basically a combinatorial problem: how to be fair and efficient while keeping (most) students happy. 

Our Admin has this brilliant solution: each student ranks their top 10 desks (respecting program rules). She then draws one slip at random, assigns that student their best available desk, and repeats.

{{<figure align="center" src="/market_design/mg_lottery.jpeg" caption="The bidding schedule for Fall 2025 quarter" width="66%">}}

Surprisingly elegant. With no collusion, it’s essentially dominant strategy incentive compatible, isn't it!
