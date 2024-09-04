---
title: "online advertisement privacy glitch"
date: 2024-09-02T12:10:34+08:00
draft: false
cover:
    image: google_ad_gossip/spooky_watching.jpeg
---

> 'Nothing is impossible to a willing heart.'
> — John Heywood

Here's a news that demonstrate one side effect of ad targeting technology:

------

## [UW News | For $1000, anyone can purchase online ads to track your location and app use](https://www.washington.edu/news/2017/10/18/for-1000-anyone-can-purchase-online-ads-to-track-your-location-and-app-use/)

[Jennifer Langston](https://www.washington.edu/news/author/jennifer-langston/), October 18, 2017.

{{<figure align="center" src="/google_ad_gossip/spooky_watching.jpeg" caption="not in the catwoman way though" width="100%">}}

> Privacy concerns have long swirled around how much information online advertising networks collect about people’s browsing, buying and social media habits — typically to sell you something.
>
> But could someone use mobile advertising to learn where you go for coffee? Could a burglar establish a sham company and send ads to your phone to learn when you leave the house? Could a suspicious employer see if you’re using shopping apps on work time?
>
> The answer is yes, at least in theory. New [University of Washington research](http://adint.cs.washington.edu/), to be presented in a [paper](http://adint.cs.washington.edu/ADINT.pdf) Oct. 30 at the Association for Computing Machinery’s [Workshop on Privacy in the Electronic Society](https://cs.pitt.edu/wpes2017/), suggests that for roughly $1,000, someone with devious intent can purchase and target online advertising in ways that allow them to track the location of other individuals and learn what apps they are using.
>
> “**Anyone from a foreign intelligence agent to a jealous spouse can pretty easily sign up with a large internet advertising company and on a fairly modest budget use these ecosystems to track another individual’s behavior**,” said lead author [Paul Vines,](http://paulvines.com/) a recent doctoral graduate in the UW’s Paul G. Allen School of Computer Science & Engineering.

{{<figure align="center" src="/google_ad_gossip/commute_leak.jpeg" caption="This map represents an individual’s morning commute. Red dots reflect the places where the UW computer security researchers were able to track that person’s movements by serving location-based ads: at home (real location not shown), a coffee shop, bus stop and office. The team found that a target needed to stay in one location for roughly **four minutes** before an ad was served, which is why no red dots appear along the individual’s bus commute (dashed line) or walking route (solid line.)*University of Washington*" width="88%">}}

> The researchers discovered that an individual ad purchaser can, under certain circumstances, **see when a person visits a predetermined sensitive location** — a suspected rendezvous spot for an affair, the office of a company that a venture capitalist might be interested in or a hospital where someone might be receiving treatment — within 10 minutes of that person’s arrival. They were also able to **track a person’s movements across the city during a morning commute by serving location-based ads to the target’s phone**.
>
> Someone who wants to surveil a person’s movements first needs to learn the [mobile advertising ID](https://support.google.com/adxseller/answer/6274238?hl=en) (MAID) for the target’s mobile phone. These unique identifiers that help marketers serve ads tailored to a person’s interests are sent to the advertiser and a number of other parties whenever a person clicks on a mobile ad. A person’s MAID also could be obtained by eavesdropping on an unsecured wireless network the person is using or by gaining temporary access to his or her WiFi router.
>
> The UW team demonstrated that customers of advertising services can **purchase a number of hyperlocal ads through that service, which will only be served to that particular phone when its owner opens an app in a particular spot.** By setting up a grid of these location-based ads, the adversary can track the target’s movements if he or she has opened an app and remains in a location long enough for an ad to be served — typically about four minutes, the team found.
>
> Importantly, the target **does not have to click on or engage with the ad** — the purchaser can see where ads are being served and use that information to track the target through space. In the team’s experiments, they were able to pinpoint a person’s location within about 8 meters.

In short, obtain the Ad targeting ID of that victim, and place location-specific ads targeted to that ID around his/her area (e.g. her favourite café), and with a budget that is able to outbid competing advertisers—the person can be tracked.

## comments and implications

Co-author of [Tadayoshi Kohno](https://homes.cs.washington.edu/~yoshi/) was shocked by the capability of ad targeting:

> “We did this research to better understand **the privacy risks with online advertising**. There’s a fundamental tension that as advertisers become more capable of targeting and tracking people to deliver better ads, there’s also the opportunity for adversaries to begin exploiting that additional precision. It is important to understand both the benefits and risks with technologies.”

It only needs an email account and a credit card to open up an Ad campaign. I would say, the risk is infinitely bad. What to do next:

> An individual could potentially disrupt the simple types of location-based attacks that the UW team demonstrated by frequently resetting the mobile advertising IDs in their phones — a feature that many smartphones now offer. Disabling location tracking within individual app settings could help, the researchers said, but advertisers still may be capable of harvesting location data in other ways.
>
> On the industry side, mobile and online advertisers could help thwart these types of attacks by rejecting ad buys that target only a small number of devices or individuals, the researchers said. They also could develop and deploy machine learning tools to distinguish between normal advertising patterns and suspicious advertising behavior that looks more like personal surveillance.
