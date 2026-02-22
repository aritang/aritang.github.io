---
title: "ICLR Breach | The Pitfall of Peer Review"
date: 2025-12-01T19:13:02-06:00
draft: false
---

> Another vivid example of "in the worst case, what (tf) would happen if xxx information is leaked?"

ICLR is one of the most important computer science conferences. They do double-blind peer review on OpenReview. OpenReview makes all paper submissions and reviews public (e.g. **anyone** can view and make public comment on it, like Twitter). Reviewers goes under anonymous encrypted alias.

Around Nov 11, a bug was found in OpenReview that you can query the anonymous encrypted alias of reviewers and get the true reviewer identity. Consider the openness of OpenReview, technically, everything was under the daylight from Nov 11 to Nov 27 (when at Thankgiving morning, the officials learnt and fixed the bug).

> Exploiting this bug, malicious actors **scraped** the author, reviewer and other details for **over ten thousand ICLR papers (45% of the conference) and circulated this data on the internet.**
>
> [ICLR blog](https://blog.iclr.cc/2025/12/03/iclr-2026-response-to-security-incident/)

Basically, someone uploaded the csv (or json?) file containing names/affiliations of those 10k reviewers on github so anyone can download. The consequence is **bad**. Because OpenReview allows public comments under paper and reviews (exactly like twitter), some people started **commenting** reviewer's true identity under their own reviews. And people get blackmailed.

Some people say it's karma — there is a reviewer who posted 40 weaknesses **and** 40 questions for all his/her reviews in 2026 ICLR. After identity leak, he quicked raised his rating score for the paper he/she reviewed. In general, review quality has become a problem. See more in [*Major AI conference flooded with peer reviews written fully by AI*](https://doi.org/10.1038/d41586-025-03506-6). Or you might remember the famous joke:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/google_ad_gossip/adam.jpeg" caption="For my econ readers, this is the same an AER reviewer asking 'Who is Marshall?!'" width="66%">}}

It taste like tea, bitter tea. On the upside, reviewers would be more cautious. In upcoming conferences we will likely observe a more inflated review scores. But the stitch would leave long term trauma in academia as a whole :(
