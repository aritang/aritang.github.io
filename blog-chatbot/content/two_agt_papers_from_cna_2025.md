---
title: "C&A 2025 interesting paper collections"
date: 2025-04-13T18:05:01+08:00
draft: false
---

Four papers (topic) from the C&A (complexity & algorithms) workshop 2025 that I personally found interesting (or, perhaps, just understood), hosted by Sun Yat-Sen University, Guangzhou China.

Two EconCS papers:

> ## Persuasive Calibration 
>
> Yiding Feng and Wei Tang, 2025 ([Arxiv link](https://arxiv.org/abs/2504.03211))
>
> The paper studies a persuasion problem consisting of an information sender and a receiver. It's somewhat like information design—but ***calibration*** replaced commitment to an information policy. The model is restricted to a state in [0, 1] (unknown success probability of a Bernoulli experiment). ***Calibration*** means when the sender sends an signal $q$ it's close to the expected value of the real state.
>
> Somewhat vogues with robust mechanism design to me.

> ## On the Efficiency of Fair and Truthful Trade Mechanisms
>
> Babaioff et al 2025 ([Arxiv link](https://arxiv.org/abs/2502.19050))
>
> Used the KS-fairness notion to study the efficiency-fair-truthful impossibility triangle in two-player trade problem.

An algorithmic game theory paper:

> ## Improved Analysis for Bandit Learning in Matching Markets
>
> Kong, Wang and Li, Neurips2024. [Link](https://proceedings.neurips.cc/paper_files/paper/2024/file/a730abbcd6cf4a371ca9545db5922442-Paper-Conference.pdf)
>
> The problem model sets on Bipartite matching. One party's preference is cardinal and unknown and can only be learnt via Bandit feedback :( So it's like at every timepoint, a stable matching is formed and each agents learn their preference but with noise.
>
> It's a difficult problem. Because for example, one nasty counter example is, consider Girl A and Girl B proposing to Boy C and Boy D for prom. Girl A finds Boy C and D both OK, pretty indifferent. But Girl B only wants Boy C, and disregards Boy D. But Boy C and Boy D both prefers A. If we assume that the Bandit feedback is given everytime a stable matching is formed, the problem arise when, let's say, Girl A prefers Boy C to D just by a small epsilon. Girl A happens to match with Boy C all the time—thus blocking Girl B to ever test with Boy C. So like this, half of the social welfare is lost somehow (or, perhaps, even more?).

And an LLM one, from a information-theory perspective. Can't believe LLM papers can be interesting (but actually it is). It seems not available online yet so here's the speaker's abstract:

> ## Understanding LLM Behaviors via Compression: Data Generation, Knowledge Acquisition and Scaling Laws
>
> Given by Professor Jian Li from IIRS TsingHua. This is a theoretic LLM paper that I can't believe I followed through, but was actually pretty interesting. The paper seems still not available online, so here's the abstract:
>
>  ***Abstract***:
>
>  Large Language Models (LLMs) have demonstrated remarkable capabilities across numerous tasks, yet principled explanations for their underlying mechanisms and several phenomena, such as scaling laws, hallucinations, and related behaviors, remain elusive. In this work, we revisit the classical relationship between compression and prediction, grounded in Kolmogorov complexity and Shannon information theory, to provide deeper insights into LLM behaviors. By leveraging the Kolmogorov Structure Function and interpreting LLM compression as a two-part coding process, we offer a detailed view of how LLMs acquire and store information across increasing model and data scales—from pervasive syntactic patterns to progressively rarer knowledge elements. Motivated by this theoretical perspective and natural assumptions inspired by Heap’s and Zipf’s laws, we introduce a simplified yet representative hierarchical data-generation framework called the Syntax-Knowledge model. Under the Bayesian setting, we show that **prediction and compression within this model naturally lead to diverse learning and scaling behaviors of LLMs.** In particular, our theoretical analysis offers intuitive and principled explanations for both data and model scaling laws, the dynamics of knowledge acquisition during training and fine-tuning, factual knowledge hallucinations in LLMs. The experimental results validate our theoretical predictions.
