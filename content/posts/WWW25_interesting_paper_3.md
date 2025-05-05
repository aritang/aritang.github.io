---
title: "WWW25 Paper Reading Note | Preference + Relevance = Behavior Modeling Space Reconstruction"
date: 2025-05-01T07:56:21+08:00
draft: true
---

My advisor was busy during tea break so I was sent to listen to the paper's oral presentation. His loss.

> ## Behavior Modeling Space Reconstruction for E-Commerce Search
>
> Wang et al. WWW2025. [ https://doi.org/10.48550/arXiv.2501.18216](https://doi.org/10.48550/arXiv.2501.18216)
>
> Delivering superior search services is crucial for enhancing customer experience and driving revenue growth. Conventionally, search systems model user behaviors by combining user preference and query item relevance statically, often through a fixed logical 'and' relationship. This paper reexamines existing approaches through a unified lens using both causal graphs and Venn diagrams, uncovering two prevalent yet significant issues: entangled preference and relevance effects, and a collapsed modeling space. To surmount these challenges, our research introduces a novel framework, DRP, which enhances search accuracy through two components to reconstruct the behavior modeling space. Specifically, we implement preference editing to proactively remove the relevance effect from preference predictions, yielding untainted user preferences. Additionally, we employ adaptive fusion, which dynamically adjusts fusion criteria to align with the varying patterns of relevance and preference, facilitating more nuanced and tailored behavior predictions within the reconstructed modeling space. Empirical validation on two public datasets and a proprietary search dataset underscores the superiority of our proposed methodology, demonstrating marked improvements in performance over existing approaches.

{{<figure align="center" src="/online/joint_modeling_wangEtAl.jpeg" caption="caption_text" width="50%">}}
