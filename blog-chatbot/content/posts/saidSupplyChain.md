---
title: "Global Food Aid Supply Chain Efficiency Optimization"
date: 2026-04-07T15:57:09-05:00
draft: false
---

Professor Ozlem Ergun (Northeastern University) gave a talk at Booth's OM seminar titled *Enhancing the Effectiveness of Humanitarian Services Through Data-Driven Optimization*. I found a similar YouTube recording online:

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/Vk8DDLrUpoI?si=RlVPDWXwHzrGT43e&amp;start=467"
    allowfullscreen>
  </iframe>
</div>

The slide at 7:47 (shown below) gives a useful overview of the global food aid supply chain:

{{<figure align="center" width="100%" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/globalFoodAid.jpeg" caption="All rights belong to Professor Ergun and her coauthor — I don't own copyright. Though I like this picture very much.">}}

Two things stuck with me from the talk and Q&A:

**The institutional details deserve a closer look.** I think of a food aid organization as two-sided: it answers to funders and donors on one end, and delivers aid to partners abroad on the other. The authors, as OR practitioners, minimize supply chain cost — but what's the organization's higher-level goal? How does that central goal break down into metrics across different levels of the organization, and how does that shape its actions and decisions?

**The solution approach is interesting.** Solving a stochastic integer program over a multi-echelon, multi-period global supply chain is hard. The authors handle this by sampling many demand paths, solving each deterministically, then clustering the solutions (and demand paths) for interpretation. As attendees pointed out, this can push toward extreme solutions and may be far from optimal in theory. But I find the method appealing, and it seems generalizable.

Also: the seminar had great food. As a PhD student, I felt aided both physically and spiritually.
