---
title: "online algorithm seminar | week 1 & 2"
date: 2024-09-14T23:34:43+08:00
draft: false
---

Professors Hu Fu and Gavin Tang are jointly teaching an online algorithms seminar, following selected content from Borodin and Pankratov's 2019 textbook *Online Algorithms*. The course explores how algorithms perform under uncertainty, without prior knowledge of future inputs.

## Introduction to Online Algorithms

### Prior-Free Online Setting

In online algorithms, decisions are made sequentially and non-revocable, without knowledge of future inputs. The final reward is contigent on the whole sequence of input.

### Assessing Algorithms: Competitive Ratio

The **competitive ratio** is a measure of an online algorithm's performance compared to an optimal offline algorithm:
$$
\text{Competitive Ratio} = \max_{\text{inputs}} \frac{\text{Cost of Online Algorithm}}{\text{Cost of Optimal Offline Algorithm}}.
$$
A lower competitive ratio indicates better performance in the worst case.

### Role of Randomization

Randomization can improve the competitive ratio of online algorithms by introducing unpredictability, which can be advantageous against adversarial inputs.

### Motivating Examples

During the first two weeks (well, adjusted two weeks because of the Mid-autumn Festival), we covered three classic problems that illustrate key concepts in online algorithms:

1. Ski Rental Problem: You decide whether to rent skis each time you ski or buy them outright, without knowing how many times you'll ski. The objective is to minimize total cost over the skiing season.

    The performance of the algorithm though, is competitive ratio. Interestingly, the optima. algoirthm here is not economicaly rational.

    Use continuous approximation in analysis.

2. Line Search Problem: Search for an object along a line in either direction without knowing the distance to the object.

    **Strategy**: Alternate searching in both directions with increasing (doubling) distances.

3. Paging Problem: Manage a limited-size cache (memory) to service page requests, minimizing page faults when pages are not in the cache.

    **Deterministic algorithms:**

    - **Least Recently Used (LRU)**
    - **First-In-First-Out (FIFO)**

All three problem background settings are prior-free—assuming no probabilistic information about future events.

In general, I thought that Online algorithms require a variety of analytical methods. While competitive ratio focuses on the worst-case performance, they are a restrictive but useful assessment. The online concepts are widely applicable in fields like computer systems, networks, and economics.
