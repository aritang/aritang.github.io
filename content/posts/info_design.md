---
title: "two talks about information design"
date: 2023-09-16T22:37:34+08:00
draft: false
summary: The crux of information design emerges from the interplay between conflicting interests and information asymmetry. It's reminiscent of Braess's paradox.
---

Information design represents a burgeoning field in economics. Last week, Professor Haifeng Xu of Chicago University delivered an intriguing talk at SUFE-ITCS titled "Some New Frontiers of Algorithmic Information Design." His insights rank among my top three favorite talks, and I'm not exaggerating.

> Information has become integral to decision making in this digital era. This gives rise to a timely and explosive research topic on information design, which studies how a more informed party can strategically influence downstream agents’ behaviors through selective provision of information.
>
> Abstract of talk abstract from ITCS post

> *Persuasion*, defined as the act of exploiting an informational advantage in order to effect the decisions of others, is ubiquitous. Indeed, persuasive communication has been estimated to account for almost a third of all economic activity in the US.
>
> Dughmi and Xu, 2016

At the heart of this field lies the Bayesian persuasion model (Kamenica and Gentzkow, 2011). In the simplest setting, consider a *sender* and a *receiver*. They share a prior of the world (hence, Bayesian) but the *sender* knows **more information**. By strategically designing the signal scheme, the sender can manipulate the (also assumed strategic) receiver's actions, achieving favorable outcomes.

Information is undeniably powerful, everyone knows that. However, the true revelation lies in mathematically modeling its potential. Professor Xu's recent talk highlighted an intriguing example involving professors strategically crafting recommendation letters for their students:

Imagine a simplified market with professors and job-seeking students on one side, and employers on the other. Professors possess precise knowledge of their students' abilities, whereas employers remain unaware. Conflict arises when employers seek brilliant PhDs, while professors aim to secure jobs for as many students as possible. Leveraging their informational advantage, professors strategically signal in their cover letters to secure good positions for both brilliant and average students.

> Spoiler alert: the magic is randomization, which is not a surprise. 

The crux of information design emerges from the interplay between conflicting interests and information asymmetry. It's reminiscent of Braess's paradox, where adding extra road capacity can impede traffic flow. Similarly, withholding or obfuscating information can benefit the party with the information advantage. And I won't be surprised that in certain system structure, carefully designed information disclosure mechanisms can enhance overall welfare.

Professor Xu's talk brought to mind another presentation I attended at Stanford in August (Dessein, Frankel, and Kartik, 2023). It explored the shift toward test-optional college admissions. Aka, for students applying for universities, they won't be required to submit std test scores **if they don't want to**. It seems a bit contradictory because standardized test scores have traditionally indicated future academic performance, why would the universities reject such information? The answer lies in information design as well, but this time against a third party:

> But how can observing less information allow a college to improve its decisions? We argue that test-optional policies may be driven by **social pressure on colleges’ admission decisions**. We propose a model of college admissions in which a college disagrees with society on which students should be admitted. We show how the college can use a test-optional policy to reduce its “disagreement cost” with society, regardless of whether this results in a preferred student pool.
>
> Abstract of abstract of Dessein, Frankel, and Kartik's 2023 paper, *Test-Optional Admissions*.

The paper is comprehensive and rich, they even looked into the influence of this shift-of-strategy on the student's side. What's exciting about it is that it's a three-party model - although the paper kind of simplified the students' side's strategic-ness - it introduced a passive "critic" - the society (in general speaking, scrutinizer of college's admissions such as anxious parents, gossiping reporters, even local courts) that have a slightly different objective in terms of what kind of students that colleges should admit. For example, universities would want its students to be more diversified, like a combo of elite kids, clever geeks and outstanding athletes, but society want the university to be "fairer" and admit just more outstanding high school students other than the priviledged ones.

This comprehensive study delves into the influence of this shift, introducing a three-party model, including societal "critics." While universities seek diverse student bodies, society values fairness. Conflicts arise, but information design can enable universities to admit preferred students while minimizing criticism, even if their admission criteria are public.

To be honest, I wasn't enthralled by this research at the first sight - I was still in the aftermath of another heart transplant market design research work earlier by then. However, my interest reignited before Professor Xu's talk. This type of research genuinely captivates me.

### Some of my thoughts: 

Regarding the Bayesian Persuasion Model, I'm exploring the possibility of integrating it with the Pandora box decision framework (Xu et al., SOTA 2023) and advertising theory (Anderson and Renault, 1999). This alignment makes sense and aligns with ongoing work with a professor.

In the case of optional standardized test college admissions, it's essential to consider heterogeneous student strategies, given diverse types and test scores. The dynamics become even more intriguing when multiple universities participate simultaneously.

Furthermore, graduate school admission remains an underexplored area compared to undergraduate admission. The graduate school market is nuanced, flexible, and multi-criteria, making it challenging to generalize abstract models. Nevertheless, it's a potential avenue for exciting research.

Last but not least, while Professor Xu's recommendation letter model illuminates information asymmetry, it overlooks the pivotal role of students. They may not be more intelligent than their professors but can introduce complexity and volatility with their behavior, adding depth to the game. Afterall, I know too well how nasty and desperate but powerful we undergrad kids can be when we're really into something.

