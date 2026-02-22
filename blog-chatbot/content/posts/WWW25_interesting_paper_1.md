---
title: "WWW25 Paper Reading Note | Transparency? In This Economy?"
date: 2025-04-29T23:42:10+08:00
draft: false
---

This is a reading note of an accepted oral paper at WWW2025:

> ## Welcome to the Dark Side — Analyzing the Revenue Flows of Fraud in the Online Ad Ecosystem
>
> By Emmanouil Papadogiannakis, Nicolas Kourtellis, Panagiotis Papadopoulos and Evangelos Markatos. Link: https://doi.org/10.1145/3696410.3714899

The online ad ecosystem is a mess—a densely tangled web of players with overlapping roles, and worse, a dictionary full of confusing terminologies. This paper takes a flashlight to one particularly shadowy corner (ad fraud?) beneath the glossy, “efficient” surface of digital advertising.

### TL;DR

The core problem: publishers are basically anonymous.

When an ad spot gets sold—say, through some intermediate auction platform to an advertiser,—the only thing that needs to be revealed about the publisher is a `publisher ID`. In theory, this ID is unique and meaningful (think: NYTimes). But in practice there’s no required verification—**anyone can pretend to be anyone**.

One shady trick enabled by this lack of verification is “Identifier Pooling,” where publishers cozy up and swap identities like it’s masquerade ball.

> (Section 4 Intro of the paper)
>
> Assume a website that sells books (e.g., `example.com`) registers for an advertising account with Google. `example.com` will be reviewed to ensure that it does not violate any of Google’s terms, and eventually be granted a publisher ID so that it can display ads. 
>
> Now assume an affiliated website (e.g., `fakenews.com`) that is notorious for publishing misinformation. Since `fakenews.com` has attracted negative attention for its articles, popular advertisers have pulled away from it. Thus, while `example.com` receives ads from popular-brand.com via programmatic ad processes (e.g., RTB, Header Bidding), `fakenews.com` gets ads from click-bait.com. 
>
> To increase the quantity but also the quality (and price) of the ads it receives, `fakenews.com` can make a backroom deal with `example.com` to pool their ad inventory, in exchange for a small fee that example.com gets for sharing its publisher ID. By simply putting the publisher ID of `example.com` in the ads.txt file served by `fakenews.com` and using it in bid requests, a “dark pool” is formed. The revenue generated from all advertisers (both popular-brand.com and click-bait.com) will wind up at the same publisher account.

The paper also documents a few other creative revenue hacks—courtesy of the ad ecosystem’s love with opacity :)

----

### Transparency? In *This* Economy?

Transparency sounds nice in theory. In practice it's not—mostly because (i) user privacy is (justifiably) a concern, and (ii) some folks may just benefit from the fog. With enough ambiguity, big-name publishers can rent out their IDs for side cash, intermediaries can masquerade as publishers and re-sell ad slots, and honestly, as a user, I’m not exactly thrilled about advertisers knowing which ads I clicked on. Price discrimination, anyone?

So, figuring out *how much* transparency is enough—and *where* to put it—is a genuinely good and hard question. And one that probably won’t get a satisfying answer anytime soon.
