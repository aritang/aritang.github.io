---
title: "DOJ vs. Google | DOJ's complaints, breaking down | Part I"
date: 2024-09-16T22:20:37+08:00
draft: false
cover:
    image: google_ad_gossip/one_more_thing.jpeg
---

The ***DOJ's complaint*** against Google is remarkably clear, efficiently addressing the core issue of Google's monopoly in display advertising within 150 pages.

After reading it, well, I believe Google is in serious trouble this time. The DOJ made its point effectively, outlining the ad tech ecosystem's structure by highlighting key abstractions and omitting unnecessary details. They've probably created some of the best explanatory slides ever.

{{<figure align="center" src="/google_ad_gossip/DOJ_webpage.jpeg" caption="The complaint is available [here](https://www.justice.gov/atr/case-document/file/1566706/dl?inline) in DOJ's official website. Their [slides](https://www.justice.gov/atr/media/1366806/dl) is also released—succinct and straight to the point." width="66%">}}

The crux of the DOJ's complaint is that Google has used various sneaky means to establish and maintain its monopoly, which hampers competition and prevents the ad tech market from being healthy, efficient, and sustainably innovative.

The break-down will be in two parts. For today:

## Defining the Market: The Foundation of a Monopoly Case

The main argument in the complaint has two parts demonstrating that **Google has acted unlawfully**. The first part (**III. DISPLAY ADVERTISING TRANSACTIONS**) explains the current state of the market. A particularly accurate term used is the "ad tech **stack**," referring to the chain of operators facilitating the ad tech business.

{{<figure align="center" src="/google_ad_gossip/ad_tech_stack.jpeg" caption="The ad tech stack illustrates the chain of operators in the advertising ecosystem. Notably, Google's Ad Network connects to its own inventory, such as sponsored keyword auctions and YouTube ads, reinforcing its monopoly power." width="96%">}}

The DOJ does an excellent job summarizing the flow of ads to consumers. I recommend reading the following paragraphs from the complaint thoroughly:

Starting from the publisher's side, ad servers help publishers monetize their popularity:

------

### ad server

{{<figure align="center" src="/google_ad_gossip/ad_server.jpeg" caption="Ad servers assist publishers in monetizing their content by managing the ad spaces on their websites." width="96%">}}

> An ad tech transaction begins when a user opens a website. While the website’s content loads, the website uses a **publisher ad server** to select which ads will fill each ad slot on the page. The publisher ad server is an ad tech tool that evaluates potential ads from different advertising sources and applies a decision-making logic to determine which ad will be displayed to the user opening the website. Since 2008, Google has owned the industry’s leading publisher ad server, **Google Ad Manager**, which is often still referred to by its former name, **DoubleClick for Publishers (“DFP”)**.

------

### ad exchange

Most ads are sold via **indirect sales** through auctions in **ad exchanges**, as opposed to **direct sales** where large publishers sign agreements directly with advertisers.

{{<figure align="center" src="/google_ad_gossip/ad_exchange.jpeg" caption="Ad exchanges act as intermediaries, auctioning off ad slots provided by ad servers." width="98%">}}

> Indirect sales are typically made via a series of interactions between ad tech tools. These technologies allow website publishers and advertisers to transact through lightning-fast automated processes, known as **programmatic** buying. Today, most programmatic transactions take place on an ad exchange. An **ad exchange** (sometimes called a supply-side platform or SSP) is a software platform that receives requests—often from a publisher ad server—to auction ad impressions on a particular webpage. The ad exchange solicits bids on the impression from advertiser buying tools, chooses the winning bid, and transmits information on the winning bid back to the publisher ad server. Google presently owns the industry’s leading ad exchange, called **AdX** (now packaged as part of **Google Ad Manager**).

**Google monopolized the market of ad-exchange as well. The dominance in ad exchanges gives Google significant key control over the advertising market.**

{{<figure align="center" src="/google_ad_gossip/googles_ad_exchange_monopoly.jpeg" caption="Google: gotcha!" width="98%">}}

> When a publisher ad server sends an auction request to an ad exchange, the publisher ad server provides certain information about the impression for sale. This can include information about the website itself, the ad space on the webpage (e.g., where the ad is placed), and the user that will view the impression. After receiving this information from the publisher ad server, the ad exchange may supplement the information with any additional information the ad exchange might independently have about the user viewing the ad, including information about the user’s browsing history, location, and age. The ad exchange then transmits the bid request, along with information gathered about the user and the website, to various advertiser buying tools, described below. **The detailed information concerning the user’s location and browsing history is highly valuable to advertisers because it helps advertisers assess the value of the particular impression to its overall advertising campaign.** For example, if the information tells a particular retail advertiser that the user had previously browsed that retailer’s website but did not complete a sale, then that retailer may be willing to pay a premium for the particular impression.

------

### advertiser's buying tools

On the advertiser's side, they use "advertiser buying tools" to connect to ad exchanges, which are of two kinds:

- **Demand-Side Platforms (DSPs)**
- **Ad Networks**

{{<figure align="center" src="/google_ad_gossip/advertiser_buying_tool.jpeg" caption="Advertiser buying tools, including DSPs and ad networks, connect advertisers to ad exchanges." width="96%">}}

DSPs buy directly from ad exchanges and serve larger advertisers. Ad networks, on the other hand, service smaller advertisers and sometimes run their own auctions, profiting through arbitrage between buying and selling views.

> Advertisers receive and respond to bid requests using advertiser buying tools. These tools assist advertisers in connecting to ad exchanges, selecting impressions to bid on, submitting bids, and tracking purchased impressions against their advertising campaign goals.
>
> Large ad buyers often use demand-side platforms, which provide sophisticated and customizable tools for managing advertising purchases. Smaller advertisers rely on ad networks, which offer simpler, self-service technology solutions. Google offers the industry’s leading ad network, Google Ads, and the leading demand-side platform, Display & Video 360 (“DV360”).

To summarize, alas, we end up in a stack of ad tech tools:

{{<figure align="center" src="/google_ad_gossip/ad_tech_stack.jpeg" caption="The comprehensive ad tech stack shows how Google's pervasive presence influences every step of the advertising ecosystem." width="96%">}}

-----

## One More Thing...

Display advertising and sponsored search ads are two nearly equivalent markets, each accounting for about 45% of the $600 billion advertising industry. While the ad tech stack we've discussed facilitates display ads, Google's monopoly in sponsored search ads is even more straightforward—it simply dominates the market.

{{<figure align="center" src="/google_ad_gossip/one_more_thing.jpeg" caption="Google's direct control over the keyword ads market highlights its extensive influence in online advertising." width="96%">}}

The DOJ's been missing the other 45% (or even more, as Paul Milgrom's 2020 auction survey suggests): the massive market of keyword ads. Google's ad network has a direct connection to this market, further solidifying its monopolistic position.
