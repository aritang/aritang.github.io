---
title: "The Report on Cookies | What are Cookies"
date: 2024-07-19T23:11:43-07:00
draft: false
---

In April 2024, Google announced the complete phase-out of third-party cookies by 2025, marking a significant shift in the digital landscape ([timeline](https://privacysandbox.com/intl/en_us/open-web/)). This technical report explores the role of ***third-party cookies*** in the online advertising market, their inherent value, and the ongoing industry changes.

## Section 1 | What are *Cookies*?

#### Definition: 

Cookies are **small text files** that hold a modest amount of data specific to a particular user and website. It is stored locally on a user's computer.

The website specifies what data should be stored in the cookie, such as user ID, session keys, or preferences.

The browser's role is to design protocals that manage cookies according to the request set by the website (i.e. `Amazon`: "Give me Jason's every shopping records") and the preferences configured by the user (Jason: "no." [browser: denying all ***3rd party*** cookies]).

#### Types of Cookies:

- **First-Party Cookies**. Stored and used by the same webserver entity: 

    eg. NY Times stores user's login info and language preference.

- **Third-Party Cookies**: The cookie is not being set by the news site directly (the first party), but by a separate entity (the third party):

    eg. Google Ad Exchange places a cookie for future usage when one is reading on NY Times.

#### *Extras: Why cookies need to exist?*

Cookies store general information about user interactions with a website, allowing this data to be accessed in the future. This functionality is crucial because it compensates for what HTTP—our foundational web protocol—lacks. 

HTTP is inherently **stateless**, meaning that with each **request** (such as clicking the `search` button), the website does not inherently know who is making the request. 

Therefore, Cookies makes up for HTTP to keep information across time. And makes the following function available: session management, personalization (eg. language preference) and **tracking**.

A straightforward explaination:

> Imagine a website is like a hotel. The hotel wants each returning guest to have their room personalized to their requests each time they visit. They have millions of guests so instead of keeping a list of what everyone likes in a huge book, they write the guests requests on their foreheads. That way, there is no confusion and there is no need to identify everyone in a huge database. When a guest returns, they instantly know what they want without even asking.
>
> [reddit user higgs8, 4y ago](https://www.reddit.com/r/explainlikeimfive/comments/hb0g3t/comment/fv653p3/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
