---
title: "gerrymandering | from a law-ish perspective"
date: 2024-11-12T16:56:00+08:00
draft: false
---

I have a law class this semester and we covered United State's voting rule today. Gerrymandering caught my attention. Here's a nice introductory video about it:

<iframe width="800" align="center" height="315" src="https://www.youtube.com/embed/KpamjJtXqFI?si=B5oKrNaGnPbrOIHS" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

And if you're interested in some technical stuff, there seem to be a lot of 'redistricting' literature in Algorithmic Game Theory and Econ-CS relevant to this topic. Here's one as an entry into the citation tree:

> Nikhil Garg, Wes Gurnee, David Rothschild, and David Shmoys. 2022. ***Combatting Gerrymandering with Social Choice: The Design of Multi-member Districts.*** (EC '22). https://doi.org/10.1145/3490486.3538254

> The Fair Representation Act (first introduced in 2017 and reintroduced in 2019 and 2021) mandates the use of ***multi***-member districts (***M***MDs) to elect members to the United States House of Representatives.
>
> This paper considers the design of such multi-member districts and, in the process, opens a rich research agenda at the intersection of two well-studied, but hitherto distinct, aspects of the design of representative democracies: **<u>*redistricting, and social choice for multiple winners*</u>**. 
>
> The redistricting literature assumes winnertakes-all in SMDs and, given a fixed set of voters, studies how to divide the voters into districts such that the set of winners across districts satisfies desirable properties (e.g., for a gerrymandering party, maximizing the number of winners belonging to their party; for a neutral rule-maker, devising rules to ensure ‘proportionality,’ such that the fraction of winners of each party matches the fraction of voters). 
>
> The social choice literature, on the other hand, considers a single district and studies voting rules (functions from voter rankings to a set of winners) such that the set of winners in that district satisfies similar properties, including proportionality.
>
> A map consisting of multiple MMDs (e.g., 30 two-member districts in Arizona) requires both partitioning voters into districts and devising how each district collects and aggregates votes. The challenge cannot be decomposed: drawing districts depends on the social choice function, and the same social choice function has different effects depending on district size and composition.

> **Methodological contributions.** We provide a scalable, empirical methodology to algorithmically study partisan gerrymandering and fair redistricting under multi-member districts. We leverage an efficient way to calculate partisan outcomes under Single Transferable Voting (a common variant RCV for multiple winners) and extend an algorithm by Gurnee and Shmoys 2021 to efficiently calculate near-optimal multi-member maps, under a variety of objective functions and social choice rules. We further develop a voter-file-based methodology to study intra-party effects of rank choice voting.

There's also cool ***Application Oriented Findings*** section but I think they make more sense if read under the context of the paper. Here's the [link](https://dl.acm.org/doi/pdf/10.1145/3490486.3538254) to the paper's two-page introduction. You're welcome😉.

