---
title: "the Cookie series IV | the rule for Cookies"
date: 2024-08-01T12:24:44-07:00
draft: false
---

Cookies are **small text files** that hold a modest amount of data specific to a particular user and website. It is stored locally on a user's computer. The website specifies what data should be stored in the cookie, such as user ID, session keys, or preferences.

I really like this example:

> Imagine a website is like a hotel. The hotel wants each returning guest to have their room personalized to their requests each time they visit. They have millions of guests so instead of keeping a list of what everyone likes in a huge book, they write the guests requests on their foreheads. That way, there is no confusion and there is no need to identify everyone in a huge database. When a guest returns, they instantly know what they want without even asking.
>
> [reddit user higgs8, 2020](https://www.reddit.com/r/explainlikeimfive/comments/hb0g3t/comment/fv653p3/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

## why cookies need to exist?

Cookies store general information about user interactions with a website, allowing this data to be accessed in the future. This functionality is crucial because it compensates for what HTTP—our foundational web protocol—lacks—HTTP is inherently **stateless**, meaning that with each **request** (such as clicking the `search` button), the website does not inherently know who is making the request.

Therefore, Cookies makes up for HTTP to keep information across time. And makes the following function available: session management, personalization (eg. language preference) and **tracking**.

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/google_ad_gossip/cookie_n_http.jpeg" caption="Cookies transmit information **across** browsing sessions.">}}

## who make the rule for Cookies?

The browser's role is to design protocals that manage cookies according to the request set by the website (i.e. `Amazon`: "Give me Ariana's every shopping records") and the preferences configured by the user (Ariana: "hell no." [`Chrome`: denying all ***3rd party*** cookies]).

**Notably, a website (or third-party) can only have access to their own cookies.** 

**Google Chrome**: Google originally planned to gradually phase-out third-party cookies throughout 2024, with new technologies like Privacy Sandbox to maintain functionality while protecting privacy. But it didn't quite work out: see the news [here](/posts/cookies_report3/).

**Firefox**: Actively blocks third-party cookies using Enhanced Tracking Protection, with some user control over settings.

**Safari**: Employs Intelligent Tracking Prevention to rigidly block third-party cookies, offering less user flexibility compared to Firefo./

**Microsoft Edge** does not block third-party cookies by default but allows users to enable this feature.

## other alternatives?

As third-party cookies are gradually being restricted, various alternatives are being adopted for tracking on iPhones and other apps:

1. **Mobile Advertising IDs (MAIDs)**: Remember the "allow apps to track" option when you first open it after download? MAIDs are unique identifiers provided by mobile operating systems like Apple's IOS, which allow advertisers to deliver personalized advertising without traditional cookies. The use of MAIDs is contingent on user consent under frameworks like Apple's App Tracking Transparency ([Privacy Professionals](https://iapp.org/resources/article/future-of-cookies-tracking-technologies/))
2. **ID Matching** and **Publisher Provided IDs (PPIDs)**: These identifiers are created using first-party data, which can be shared across different websites and platforms to track users without third-party cookies. They rely on user logins and engagements to provide targeted advertising. 

