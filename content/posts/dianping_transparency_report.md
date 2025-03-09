---
title: "Dianping's 'Transparency Report' is not so transparent after all"
date: 2025-03-06T20:15:56+08:00
draft: false
---

Dianping, an affiliate of Meituan, is essentially the monopoly version of China’s Yelp. It primarily serves as a restaurant rating platform where users review their experiences on a five-star scale with optional pictures and videos. From a business perspective, it allows sellers to register their establishments while buyers provide feedback. At its core, a rating platform is a dynamic ecosystem where sellers, buyers, and the platform's algorithms all interact—a playground that any mechanism designer would love to experiment with.

On February 9th, Dianping released its first-ever ***Transparency Report 2024*** (archived [OG_cn_ver.pdf](/files/meituan_transparency_report_2024.pdf)  for academic reference). The report caused some buzz, as users frequently complain about biased, colluded, or misleading reviews. Meituan’s report primarily focuses on how it defines, detects, and mitigates these **deceptive reviews**.

### Defining 'Unwanted' Reviews

Dianping categorizes problematic reviews as follows:

- **Unlawful or Non-Compliant Reviews**: Content that violates regulations or laws.
- **Artificially Campaigned or Incentivized Reviews**: Reviews written by users who have not actually experienced the product or were incentivized by sellers to leave positive feedback.
- **Malicious Reviews**: Unusual, deliberately harmful reviews—often from competitors, haters, or those attempting blackmail.
- **Fake Reviews for Rewards**: Users posting fake reviews to obtain coupons or other benefits.
- **Low-Quality Reviews**: Poorly written, uninformative, or otherwise unhelpful feedback.

According to the report, the primary challenge for rating platforms is combating these types of problematic reviews. However, I believe the bigger issue lies in the design of recommendation algorithms and mechanisms that encourage truthful and meaningful reviews. But for now, let’s take their framing at face value and examine how Dianping claims to address these issues.

### Strategies

Dianping outlines several measures to combat misleading reviews:

- **Detecting Suspicious Accounts**: Identifying bots and fake batch accounts.

- **AI-Powered Filtering**: Using machine learning algorithms to detect and remove non-compliant reviews. This AI system integrates cutting-edge technology with human moderators who update and refine its capabilities.

- **Human Moderation**: Manual review of flagged content.

- **Crowdsourced Moderation**: This is particularly interesting and extends beyond Dianping to other Meituan platforms.

    The “Raters by the People” initiative (name may vary) invites experienced users to act as judges in disputed reviews. This often applies when a consumer leaves a negative review and the seller appeals the feedback. These senior users help determine who is in the right.

### Ending Remarks

The “Raters by the People” project is somewhat innovative and bears some resemblance to Twitter (X)*'*s Community Notes.

However, I expected more from Meituan in its first-ever transparency report. Key unanswered questions remain: How are the displayed charts selected? What are the details of the recommendation algorithm? How are sellers ranked in keyword searches? Unlike a search engine, Meituan’s platform directly influences consumer purchase behavior, making these ranking mechanisms crucial for scrutiny and study.
