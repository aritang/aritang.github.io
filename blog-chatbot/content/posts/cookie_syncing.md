---
title: "the Cookie series XII | Cookie syncing"
date: 2024-08-11T00:02:09-07:00
draft: false
---

One important rule for Cookies is that, a Cookie stored locally on a user's computer can only be accessed by whoever placed that Cookie. Websites thus have their own distinct user-unique identifications. Sometimes though, websites want to mutually "align" that the person they're recommending ads to, is the same one. More precisely:

> Cookie syncing works when two ad platforms share and match the information they’ve gathered about the same user in their separate databases. This data mapping process helps identify the users with the help of a string of characters referred to as cookie ID, which is stored on the user’s browser. 
>
> [Publift](https://www.publift.com/)

Basically, every UID is a string, but only that for the same user, different websites and service provider would still assign distinct strings to them.

> When a user visits a publisher's website for the first time, the user's browser sends an ad request to a [demand side platform (DSP)](https://www.publift.com/blog/what-is-a-demand-side-platform-dsp), which creates a user ID and stores it in a third-party cookie.
>
> A DSP then redirects the ad request to the data management platform (DMP) on the pixel URL. The DMP writes its own cookie or reads it if it already exists, and saves the DSP's user ID in the match table alongside its own user ID.
>
> The DMP also passes back its user ID in the URL parameter. The DSP then reads its own cookie and stores the DMP user ID along with its own user ID in the match table.
>
> This way, both platforms have each other's IDs for the same user, and the process is similar for almost the entire adtech ecosystem.
>
> Let's take the example of a publisher's website. The publisher uses a [supply side platform (SSP)](https://www.publift.com/adteach/what-is-a-supply-side-platform) to monetize its inventory and a DMP to manage or exchange user data. Both platforms monetize inventory and audiences via the DSP, which is basically the tool an ad buyer uses to buy ad inventory.
>
> As all of the above platforms work for different domains, they have different user IDs for the same users. They all have different cookies and different ways to identify the same user. 
>
> To identify the user, the SSP sends a bid request to the DSP with its buyer's user ID. Similarly, the DMP sends its audience segment with its buyer's user ID to the DSP. The platforms then confirm that the different IDs from different platforms belong to the same user with the help of a match table.
>
> The information ensures the DSP can identify the user information from the SSP and makes an appropriate bid. The SSP also stores the unique user ID to make a bid request next time it identifies the user. Similarly, the DSP reads cookie data from the DMP. 
>
> If an advertiser is looking to show their ad, their ad tools can communicate with the DSP, place bids, and, if they win, can display their ads on the publisher’s site instantly. Cookie syncing matches DSP's ID and SSP's ID for the same user and helps make appropriate bid requests. 

