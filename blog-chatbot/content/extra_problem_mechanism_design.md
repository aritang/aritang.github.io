---
title: "The Game of Extra Problems | Design the Grading Mechanism"
date: 2025-03-20T22:58:09+08:00
draft: false
---

I'm TAing Discrete Math for [Professor Nick Gravin](https://ngravin.github.io/) this semester (2025 Spring). We’ve introduced **extra problems**—a set of challenging bonus questions that provides extra credits, meant for students who find the regular coursework too easy. The goal is to provide meaningful enrichment, but we’ve encountered a **mechanism design problem**: How do we structure rules and incentives so that students put in genuine effort, avoid academic dishonesty where they copy from each other to get scores, and maintain fairness in the grading process?

Nick wants more nuanced, well-thought solutions, and prefers when there are <3 solutions, and don't want students to copy from each other. Several key challenges have emerged in the administration:

- Each student is allowed **only one attempt** per problem. This prevents trial-and-error submissions and encourages thoughtful problem-solving.
- Credit is **split among all correct solvers**: if only one student solves it, they receive **full credit**; if ten students solve it, each gets only **0.1 credit**.
- Only **full solutions** are counted, and partial progress is disregarded. This prevents students from submitting incomplete work in the hopes of earning some credit.

- If an extra problem receives **a large number of submissions**, the next set of problems will be **more difficult**.

A critical concern is academic dishonesty—we want to prevent students from sharing solutions—to deter solution-sharing, we do not disclose the number of successful solvers immediately.

An intriguing questions is: Should we disclose how many students have completed a problem?

- **If we reveal the number of solvers**, students may adjust their behavior strategically. If they see many correct submissions, they might opt out to avoid earning minimal credit. If they see few solvers, they might feel motivated to submit.
- **If we keep the number hidden**, students must decide whether to submit without knowing how many others are working on the problem. This discourages purely strategic decision-making and encourages independent effort. But sometimes we might get too few submissions (or too much) cause there's no response system.

The intersection of TAship and game theory in this setting offers a fascinating glimpse into how incentives shape behavior, even in an education environment. As the course progresses, it will be interesting to see whether further refinements are needed to maintain the integrity of the system while keeping the extra problems engaging for those who truly seek the challenge.

## 
