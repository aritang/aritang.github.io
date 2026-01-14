---
title: "Echoes in Pandora's Box"
date: 2023-11-22T13:49:19+08:00
draft: false
summary: In a humorous twist of fate, our mechanism design course unveils the curious case of two student groups unwittingly mirroring each other's presentations on Pandora's Box, spotlighting the ironic interplay of choice and chance in academic endeavors.
---

In our mechanism design course, a final presentation required each student to deliver a 15-minute talk based on letters or surveys from SIGecom Exchanges. Interestingly, two out of twelve student groups chose to focus on the "Pandora's Box" survey. This topic is a mature stream of research, stretching from Weizmann's seminal 1979 paper to recent comprehensive surveys that bridge economics and computer science. The survey in SIGecom Exchanges is particularly thorough, allowing both groups to base their presentations entirely on its content, resulting in nearly identical talks.

Imagine a scenario with several boxes containing prizes of unknown value. These values follow independent distributions $F$, varying from box to box. Opening a box to reveal its value incurs a "search cost" $c$. The basic premise is that you can take away one box from those opened, ideally the one with the highest prize. The decision-maker must strategize whether to continue opening boxes, incurring additional costs, or to stop and choose the best box thus far.

The optimal search strategy, while the problem seems complex, is surprisingly straightforward. For every box, we define an "index value" *θ* by solving
$$
\mathbb E[v - \theta]^+ = c.
$$
The search process involves starting with the box with the highest *θ*, opening it, and if its prize value exceeds *θ*, we stop and take the box; otherwise, we continue searching. We'll left the proof of this strategy's optimality as a teaser.

Give a potentially interesting economic question to those TCS scientists and they can complicate the matter in hundreds of ways. Just kidding. This concept of "search with cost under uncertainty" has significant implications and is popular over the recent decade, as evidenced by Peter Diamond's Nobel Prize for his contributions to search theory in economics. Various adaptations of the original Pandora's box model have been explored. One intriguing variation is the option to "take away a box **without opening it**". For example, some searcher just run out of patience and be like "screw it I'll just take that remaining un-opened box with the highest potential prize". But, this small adjustment makes finding the optimal strategy NP-hard. 

The relevance of search theory is underscored by information asymmetry and the challenges in acquiring additional information. For instance, the choice of the Pandora's box topic by the student groups likely stemmed from its prominent placement on the SIGecom Exchanges website, like:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/new_plan/pandora.jpeg" caption="The survey of Pandora's box is placed at the centre of the main page of the website. When the students open the website, they may find Pandora's box as a topic to be potentially interesting enough (high realized value) and hence don't have the incentive to search for other papers over the previous years, thus... picking this survey and go away.">}}

Featured as the only survey in the June 2023 issue, it is immediately visible upon visiting the site. Additionally, the intriguing title "Pandora's Box" likely drew more interest than other more daunting terms, reducing mental aversion. It seems students often gravitate towards topics that appear interesting and accessible, which led to the unfortunate crash in presentation topics.

Compounding the issue, as the TA, I scheduled these identical presentations back-to-back. The second group faces the challenge of presenting the same material immediately after the first. It will be interesting to see how they manage to engage the audience with their take on Pandora's Box. Good luck.

