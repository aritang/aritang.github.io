---
title: "Generative Social Choice, and China 2185"
date: 2024-12-20T22:56:59+08:00
draft: false
---

Here's a paper I read lately,

> ## Generative Social Choice
>
> Sara Fish, Paul Gölz, David Parkes, Ariel Procaccia, Gili Rusak, Itai Shapira, and Manual Wüthrich. [link to one of the authors' posted verison](https://procaccia.info/wp-content/uploads/2023/08/generative.pdf). Plus, [link](https://icml.cc/virtual/2024/37607) to ICML talk version.
>
> [Abstract] The mathematical study of voting, social choice theory, has traditionally only been applicable to choices among a few predetermined alternatives, but not to **open-ended decisions** such as collectively selecting a textual statement. We introduce generative social choice, a design methodology for open-ended democratic processes that combines the rigor of social choice theory with the capability of large language models to generate text and extrapolate preferences. Our framework divides the design of AI-augmented democratic processes into two components: first, proving that the process satisfies representation guarantees when given access to oracle queries; second, empirically validating that these queries can be approximately implemented using a large language model. We apply this framework to the problem of **summarizing free-form opinions into a proportionally representative slate of opinion statements**; specifically, we develop a democratic process with representation guarantees and use this process to portray the opinions of participants in a survey about abortion policy. In a trial with 100 representative US residents, we find that 84 out of 100 participants feel “excellently” or “exceptionally” represented by the slate of five statements we extracted.

The paper designs a "democratic process", which takes a group of participants' input and output a ***slate*** of ***statements*** that ideally represents all participants' stance well. 

Btw, some details: a single "statement" **fully** reflect a participant's stance on the topic. In other words, a participant shouldn't adore statement A and B simultaneously as her stance, but only either A or B.

Classical democratic process design is usually restrained to a fixed finite set of statements. As LLM step in, the universe of all possible statements can be extended—to infinitely more, including the ones that the participants don't necessarily proposed in their inputs. To generate, gauge and summarize (cleverly) any statement (whether they are human-OG or LLM-generated), one need to estimate how participants think of it—this is when LLM plays its key roles: 

(i) generate statements that represent a group of participants well enough and 

(ii) gauge a participant's endorsement towards a certain statement based on her input, which she doesn't necessarily seen before.

Assuming that LLMs' outputs are perfectly good, the paper further proposed a notion of representativeness and proposed a greedy-flavored algorithm to achieve it.

I especially like that the paper's proposed mathematical frameworks and assumptions in the paper is "***future proof***" for LLMs. Also I asked around my friend what they think. Most questions are centered around the reliability and ability of the LLM involved in the designed democratic process. But I think these are mere engineering concerns that cannot overshadow how brilliant the idea is—if this doesn’t sound like sci-fi made real, here’s a related weekend read: **CiXing Liu’s debut, *China 2185*** ([read Chapter 8 here](https://dlf.uzh.ch/sites/sinofutures/2019/12/18/china-2185-chapter-8/)). A teaser from Chapter 8:

> The supercomputer had to summarize and evaluate the collected information, before it could convert the voices and opinions of two billion people into a dozen statements, which were then presented to the highest representative. The software used for this process was extremely important and both the state and the people treated it with the same reverence as the constitution. How detailed the evaluation had to be depended on the situation and there were one hundred precision levels. Most of the time, the first precision level was used, but when a certain level of difference in opinion occurred a higher precision level was employed.

Sure, *China 2185* takes it to the extreme. But it’s fascinating how research edges us closer to such speculative futures. The paper’s ideas and Liu’s vision of algorithmic democracy both feel like pieces of the same puzzle—one where representation is computed, yet profoundly human.
