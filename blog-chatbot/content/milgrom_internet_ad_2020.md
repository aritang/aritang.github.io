---
title: "Summary | Paul Milgrom (2019) Auction Market Design Recent Innovations"
date: 2024-08-28T15:47:30+08:00
draft: false
tags: ["paper"]
---

The journey begins with Google's sponsored search business. When Google developed the PageRank algorithm, it not only ranked results but also recommended the most relevant ones to users. Simultaneously, it charged advertisers to display their 'sponsored' results atop those organic outcomes. This business model, which underpins our 'free' internet today, grew from nonexistence in 2000 to becoming the biggest and possibly most influential business globally, amassing over 600 billion USD in volume worldwide. Alphabet, Google's parent company, leads as the world's top company, with advertisements accounting for 90% of its revenue.

And here's Paul Milgrom's section on *INTERNET ADVERTISING* in the review ***Auction Market Design: Recent Innovations***, that I really wish I have got my hands on earlier:

## Internet advertising

Internet advertising is a massive industry. Two main forms are sponsored-search and display advertising, each making up about 45% of total internet advertising revenue. Sponsored search operates alongside search engines by auctioning keywords and displaying relevant ads. Display advertising, in contrast, appears on publishers' content webpages, utilizing technologies like Cookies to target ads.

## sponsored search

Two challenges have spurred improvements in the scale of search engine businesses: effective ways to track ad delivery and improving match opportunities. First, verifying an internet ad's **views** for accountability is challenging, but monitoring **clicks**—with technology that tracks and accounts for the source of clicks—is easier, enabling advertisers to be charged for their click-through rates rather than views. Second, increasing the reach and effectiveness of an advertisement's audience enhances both the revenue of the ad seller and the advertiser's value. Hence, search engines and ad sellers are incentivized to improve targeting and predict click-through rates of advertisements.

Issues arise, such as equilibrium problems exemplified by ***Edgeworth cycles***:

> In the early history of these auctions, winners paid the prices that they had bid. Two factors combined to make that system problematic. First, there were multiple ad spots on each search page. Second, bidding was often controlled by **automated bots**, which could observe the bids from previous auctions for the same keyword. The bots were often programmed to predict that the same bids would be repeated and would optimize their own bids accordingly. 
>
> The economic effect of the bots operating in such an environment generates a characteristic dynamic pattern of bids and prices. To illustrate this pattern most simply, let us suppose that the number of bidders is two, the number of slots is two, and there is a low reserve price for each slot. **In a sequence of auctions, the losing bidder is inclined to increase its bid by just enough to win the first position. Prices climb, one penny at a time, until one bidder concludes it would do better to reduce its bid to win the second position at a low price, rather than to increase its bid to win the first position at a high price. Once the low bidder does that, however, the high bidder finds that it can still win first position with a much lower bid. It reduces its bid to be just enough to win and the whole cycle starts again.** These cycles, known to economists as Edgeworth cycles, are described and graphed by Edelman & Ostrovsky (2007).

(Thanks, Paul) 

Equilibrium issues can lead to inefficiencies in resource allocation, where the highest-value bidder wins only half the time. In response, Google switched to the generalized second-price auction. Studies of Nash equilibrium justify the efficiency of this new mechanism. Another issue worth mentioning involves consumers: relevant ads enhance consumer experience and foster a positive ecosystem within the search engine's advertisement business.

## display advertising

Unlike sponsored-search ads, which inherently contain information about the consumer's intent, display advertising lacks such properties. This lack of information leads to **adverse selection**, where one party's lack of information is exploited by others in the market. The **Smart Pricing** technology allows advertisers to monitor and price their advertising based on specific performance metrics (e.g., monitored by Cookie tracking of user behavior post-click-through) to ensure quality ads. The mix of contract and performance advertisers creates challenges for market mechanism design, necessitating adjustments in auction rules (Arnosti et al., 2016; Sayedi, 2018).

## and more

> The Internet advertising market is huge and quite dynamic, as new targeting methods, new ways to include online advertising in larger ad campaigns, and new options for how even simple search ads are shown continue to be developed.
>
> ...
>
> One recent development in sponsored-search advertising is **variable-size ads**.
>
> ...
>
> With variable-size ads, the number that can fit on a page is not fixed, the position number does not fully determine the location of the ad on the search page, and the size of an advertiser’s ad may depend on the other winning bids. This created new challenges in determining which ads to show and how much to charge and in deciding how bids should be structured.

The problem, for sure, is NP-hard in some respects, making pricing challenging, and Vickrey auctions might not be the best for revenue. The problem remains open til today.

The last example highlights another issue:

> Now, however, many publishers are soliciting and comparing bids from various ad exchanges. This is a deeply problematic market organization. For example, suppose that the bids in the first exchange are \$5 and \$3, while those in the second exchange are \$10 and \$2. Using a second-price auction, the price in the first exchange is \$3 while that in the second exchange is \$2, so the bidder who bid \$5 wins over the bidder who bid \$10. This organization creates a huge inefficiency, and there are other problems, too. The bidders who bid \$5 in one exchange and \$10 in the other could be the same bidder, running two different kinds of ad campaigns and unaware that it is bidding against itself. This pattern is most unlikely to persist. It could lead advertisers to prefer exchanges that use first-price auctions and, depending on what other services the exchanges offer, it could then lead to further consolidation in the industry as each bidder seeks to use just one exchange for all its ad campaigns.
