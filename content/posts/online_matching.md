---
title: "online matching I | deterministic"
date: 2024-11-18T23:06:02+08:00
draft: false
---

[Professor Tang](http://zhihaotang.com/)'s online seminar course today covers online matching.

### (very short) motivation

The (offline) maximum matching problem is a well-studied area in graph theory, even though some cases (e.g., on general graphs with weights) can be NP-hard. Classic algorithms have provided efficient solutions for specific cases:

- **Bipartite matching**: Solved using the **Ford-Fulkerson Algorithm** for maximum flow.
- **Weighted bipartite matching**: Uses the **Hungarian Algorithm** to find an optimal match.
- **Unweighted general graphs**: Solved by Edmonds' **Blossom Algorithm**, which extends matching theory to handle odd-length cycles.

These problems have wide applications, from **job assignments** to **network design**. Here's a snapshot of real-world examples:

{{<figure align="center" src="/online/online_matching_application.jpeg" caption="Stealing a page from Professor Tang's slide" width="100%">}}

However, many of these matching problems occur in **online settings**...

### why *online* is fascinating

Let’s start with the **classical online bipartite matching** problem:

{{<figure align="center" src="/online/online_matching_model.jpeg" caption="Stealing another page from Professor Tang's slide" width="100%">}}

- One side of the bipartite graph (e.g., workers) is fixed and known in advance.
- The other side (e.g., jobs) with edges arrives one-by-one in an online fashion.
- Upon arrival, a decision must be made immediately and irrevocably: Does this new node connect to one of the available nodes on the fixed side?

The objective is to maximize the number of matches. We study the competitive ratio (the worst ratio in ***any graph*** and ***any arrival order***)
$$
\inf_{\text{instances}}\frac{\text{ALG}}{\text{OPT}}.
$$

Notice that it's prior free.

### deterministic algorithm

Consider the **greedy algorithm**—matching an online vertex whenever it is possible. The greedy algorithm is 1/2-competitive.

- Notice that greedy algorithm's matching guarantees that for each edge, at least one of the endpoints is matched. This provides that greedy matching is at least 1/2 approximation of the any matching (hence, maximum matching).
- A simple 4-point example can upper bound the algorithm's performance.

{{<figure align="center" src="/online/det_alg_instance.jpeg" caption="offline nodes (left) and online nodes (right). the 1/2 instance can be constructed by, if the alg. connects the first online node with one of the offline node, let the second online node be connected only with this occupied offline node." width="100%">}}

Sad. But this instance is so stupid that we would expect randomized algorithm to have improvement—we'll talk about it tmrw, with high probability.
