---
title: "Alibaba AMap's Behavior Data Based Recommendation | Local Discovery Ranking (扫街榜)"
date: 2026-01-06T16:51:55-06:00
draft: false
---

Chinese are always serious and obsessed about food. On the 26th birthday of Alibaba (2025 Sept 10), *AMap* released a new **Local Discovery Ranking** (扫街榜) — for restaurant and general local service recommendations. Unlike traditional online rating platforms rely mainly on user ratings, AMap uses behavioral data including **navigation usage, in-store visits, repeat visits, and intentional destination trips** to make the rankings more authentic, trustworthy and immune to score manipulation. AMap's CEO Ning Guo (郭宁) pledge that the rankings would "never be commercialized":

> "Authenticity is the core lifeblood of any ranking. The fundamental goal of AMap's Ranking is to genuinely reflect real user choices. We believe that strengthening consumer trust helps boost consumer confidence, enabling merchants to focus on running their businesses while giving customers greater peace of mind—ultimately supporting a healthier and more sustainable offline services ecosystem." (Ning Guo)
>
> “真实是榜单的核心生命力，扫街榜的核心目标就是真实反映用户的选择。我们相信，提升消费信任一定有助于提振消费信心，有助于让商家专心经营、顾客安心消费，让线下服务业更健康可持续发展。” (郭宁)

In essence, real-world consumption history—"voting with one’s feet"—is a very convincing signal for a restaurant's quality. As China's most popular navigation app, Amap can capture large-scale, real user actions toward restaurants, such as whether users have visited, returned multiple times, or made a dedicated trip specifically to eat there.

AMap's ranking provides multiple behavior-based lists. Eg the "Tire Wear Ranking" highlights venues that attract long-distance visits; the "Repeat Visitor Ranking" focus on frequent return visits; and more categories such as Local's Favorites, City-Specific Experiences, and Highly Rated Neighborhood Eats. Each category is updated daily based on dynamic data.

AMap's Rankings also integrates Alipay’s *Sesame Credit system*, applying credibility weighting based on user credit levels. Combined with AI, the system effectively identifies and filters out fake or noisy signals, ensuring the integrity of the rankings. So, something like:
$$
\text{rank}\Leftarrow f(\textit{BehavData}, \textit{UserRating}\mid \textit{CreditSco})
$$

### AMap's vision

Helping small businesses has long been part of Alibaba’s DNA, probably cause they're good at AI, which works better at scale and with data. And you need a thick market to make the platform work — on the day of launch AMap announced a handful of programs to help (and attract) small businesses: more than 1 billion RMB subsidies, targeted impressions for small local businesses, etc. 

On the consumer side, AMap does way more than navigation (at least that's what their leadership probably want). It routes attention and demand into the broader local services ecosystem. So the map becomes the front door: people enter here, and value flows outward to restaurants, retail, payments, and beyond.

As of October 2025, daily active users of Local Discovery Ranking exceeds 70000000, comparatively, DianPing (the other Chinese online rating platform) has average daily user 32605700 (2025 Aug). Within 100 day of its launch, AMap monthly active user reached 1 billion. With great power comes great responsibility!

While some users complain about AMap's too many functions and privacy leaks, that's another blog. Meanwhile, when will Google Map adapt this method?

### Reference

掏10亿去“扫街”，高德想要什么？Oct 22 2025. CEIBS. https://cn.ceibs.edu/new-papers-columns/27825

高德震撼上线！10亿人「走出」的扫街榜，牛在哪？Sept 10 2025. 雷科技, 知乎. https://zhuanlan.zhihu.com/p/1949206859421581720

高德扫街榜100天全新升级：从美食到吃喝玩乐，实现飞行实景探店. Jan 7 2026. Xinhua News. https://www.news.cn/tech/20260107/850acf6846254d1bb02e4c4189f72551/c.html

100天，10亿人，一个超级入口：高德不再只是地图. Jan 7 2026. [36氪财经](https://36kr.com/user/5562755) https://36kr.com/p/3628814355268616

“高德扫街榜”正式发布，构建全新线下服务信用体系. Sept 9 2025 Xinhua News. https://www.news.cn/tech/20250910/12bd08e888f34380a3f8bf7199a8fd9c/c.html

