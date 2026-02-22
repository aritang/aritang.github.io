---
title: "The Price of Changing Your Mind in FDU is ¥168"
date: 2025-11-18T18:01:39-06:00
draft: false
---

###### Disclaimer: This post provides a factual summary and commentary on publicly available analysis. It does not constitute legal advice, institutional representation, or formal evaluation. All interpretations are solely my own.

Drama! Here's a brilliant article publish in WeChat platform written by Fudan University's **undergrads**. Now this is what our future economist should look like:

> ### 168的后悔药，复旦年销多少份？基于教务数据的期中退课规模、结构与影响因素分析
>
> The 168-Yuan Regret Pill — How Many Doses Does Fudan Sell Each Year? An Analysis of the Scale, Structure, and Determinants of Midterm Course Withdrawals Based on Academic Affairs Data
>
> Student at FDU | https://mp.weixin.qq.com/s/zJroXbF7-e87YZj3sj4F_g

### TL;DR:

☕️Basically, Fudan University (FDU) charge students for dropping courses during midterm. Around 2023, the drop fee was raised from 130 → 168 RMB per credit (a course is usually 2-6 credits). There were complaints about unclear legality and vague justification of the charge but appeals went no where.

Students stayed annoyed. And two econ undergrads (with suspiciously strong CS skills) got especially outraged.   So during the 2025-26 Fall/Winter semester midterm, they scraped the university website and got all the data about:

- course-enrollment logs (daily shifts),
- syllabus API (course & teacher metadata),
- teaching-evaluation data (difficulty, workload, competence),
- 👀 instructor profile data unintentionally exposed by the backend (professor's age, rank, tenures, contract type…).

After cleaning, they built a 7112-row dataset linking course, teacher, and enrollment information. Based on which, they found out that the revenue estimates at 1,000,000 RMB from one midterm sale. Furthermore,

> ### 🔥 Which Courses Burn?
>
> Using drop rates + Gini coefficients:
>
> - Some departments have uniformly high drop levels
> - Some have one or two “nuclear” courses generating most of the regret.
> - Big Data, Microelectronics, Mathematics, Intelligent Computing: consistent top contributors.
> - A few general-education courses are also excellent at fundraising.

And they did some econometric. The main model looks like, for every session $i$ and course $c$:


$$
\ln{\mathbb E[Drop_{ic}]} = 
\beta X_{ic} + \alpha_{\text{dept}} + \alpha_{\text{ctype}} + \text{ln}{(\text{InitialEnroll}_{ic})}
$$




Variables in $X$ includes:

- **Credits** (proxy for economic penalty).
- **Course burden** = difficulty + weekly workload.
- **Teacher ability** = Q11 (“teacher competent”).
- **Non-voluntary placement** = relative vacancy of a section vs. other sections.

The author also used a cross-classified mixed-effects logit model to decompose responsibility across (i) department (ii) course design (iii) teacher and (iv) residual class–level randomness.

## Hypotheses they suggested:

- H1: Higher credits → lower drop rate.  
- H2: Heavier course burden → higher drop rate; difficulty partly channels through workload.  
- H3: Better teaching → lower drop rate.  
- H3a: Good teachers reduce the damage of bad course design.  
- H4: More “unwanted” sections (higher vacancy) → higher drop rate.  
- H5: Most systematic responsibility lies in departments and course design, not teachers.

## Results
- **H1 confirmed**: credits reduce dropping.  
- **H2 confirmed**: course burden increases dropping; difficulty matters, workload not really.  
- **H3 confirmed**: good teaching lowers dropping.  
- **H3a rejected**: good teachers cannot “save” structurally bad courses.  
- **H4 confirmed**: non-voluntary section assignment strongly predicts dropping.  
- **H5 confirmed**: variance decomposition shows  
  - ~37.5% responsibility: departments,  
  - ~59.3% responsibility: course design,  
  - small remainder: teachers.

-----

Enough for the econometric. In the end, the authors argue that midterm drop fees are not a matter of “student responsibility” but a structural outcome produced by how departments design curricula, sequence prerequisites, and allocate teaching resources. The fee punishes students for patterns that are predictable from institutional design rather than individual choice: concentrated difficulty spikes, mismatched course plans, and sections students never voluntarily selected. Their empirical results undermine the official narrative that drop fees “teach students to choose responsibly,” showing instead that most of the variance sits at the department and course-design level, not the student or teacher level. In short: **the system generates the drops, and the fee monetizes the system’s own design problems.**

Based on that, their proposed to eliminate the midterm drop fee entirely; settle all credit accounting once at graduation by charging only for total credits attempted above the free quota; and fix the curriculum issues that consistently produce high drop rates. They emphasize that improving structural design—reasonable difficulty progression, coherent prerequisites, rational section assignment—is the actual remedy. Their position is that a university should not rely on student-paid regret as a regulatory tool, nor should it convert those regrets into a stable revenue stream. A functioning curriculum reduces drops; and there should be better mechanism to incentivize students to "be responsible" instead of mere monetary punishment.
