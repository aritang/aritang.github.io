---
title: "the Cookie series V | who collect data via Cookies, and how?"
date: 2024-08-02T12:40:04-07:00
draft: false
cover:
    image: google_ad_gossip/fancy_pic.jpeg
---

Cookies are **small text files** that hold a modest amount of data specific to a particular user and website. There are two types of cookies:

- **First-Party Cookies**. Stored and used by the same webserver entity: 

    eg. NY Times stores user's login info and language preference.

- **Third-Party Cookies**: The cookie is not being set by the news site directly (the first party), but by a separate entity (the third party).

> Third-party cookies are used by a third party to collect user information, while the user is browsing on the internet. The collected information is usually processed and stored by the third party for future usage, such as ad targeting, for selling the data.
>
> For example, Google Ad Exchange [as a third party] places a cookie for future usage when one is reading on NY Times [the website, first party].

## flow of information with third-party cookies

Third-parties (e.g. Google Ad, data brokers) can collaborate with websites (e.g. publishers) to place 3rd-party cookies on user's computer while they're browsing the website. So, whatever one does when browsing, Cookies can record all those information and **upload them to third party's cloud database**. The data collector then "bake" the cookies—compile, clean and store the data for future usage.

{{<figure align="center" src="/google_ad_gossip/cookie_info_flow.jpeg" caption="Example: how google collect user information across sites, and store to use for future ad targeting.">}}

Because third-party cookies track user across sites, they will have **UIDs** to identify a user when he/she login onto different websites. UIDs are usually device-and-browser specific, and owned by each third-parties themselves. But advertisers and the industry do have varies technologies to 'align' UIDs and do better, say, ad targeting

## flow of information with first-party data

In opposite to third party data, nowadays, advertisers are more aware of keeping their own data assets. User accounts, login information are considered as first-party data. As first-party cookies are always allowed, and you login, first-party data are safe regardless of Cookie policies.

Moreover, first party data are often much more specific and valuable in terms of ad targeting and for improving user-experience. At the end of the day, companies would want to know, for themselves, what their customers like.

## to summarize, the overall landscape of data looks like:

{{<figure align="center" src="/google_ad_gossip/fancy_pic.jpeg" caption="the landscape of privacy.">}}
