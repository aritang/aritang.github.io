---
title: "dating w.r.t. opportunity cost"
date: 2023-09-05T17:25:16+08:00
draft: false
cover:
    image: procrastinator/IMG_0448.jpeg
summary: Some people are less happy than they could have been because they focus on opportunity cost rather than pure utility. Here's a mathematic model to explain why.
---

Some people are less happy than they could have been because they focus on opportunity cost rather than pure utility. Here's why:

Imagine you're planning your Friday night. You have a feasible set of actions denoted as $\mathcal A$ and an estimated utility value for each action, expressed as a cumulative distribution function (CDF):
$$
F_a(\cdot):\R \to [0, 1),a\in \mathcal A
$$
You then select an action $a^\star \in \mathcal A$, and carry it out. For instance $a^\star = \textit{dating your partner}$. Notice that when making this decision, you exclude all other alternatives from your set of options, like another $a'=\textit{going to Friday Night Waltz}$. 

Typically, people make decisions based on some optimization approach (although some unconventional individuals might rely on a purely randomized strategy). In formal terms, given a utility perception function $c: \mathcal F_\mathcal A\to \R$, where $\mathcal F_\mathcal A:={F_a: a\in \mathcal A}$, they choose their best available option as follows:
$$
\max_ac(F_a)\\
\text{subject to } a\in \mathcal A,\ F_a\in \mathcal F_\mathcal A
$$
(As an example, for *homo economicus* - those perfectly rational know-it-all expected utility maximizer, $c = \mathbb E[u_a] = \int_\R xF_a'(x)\ dx$)

So far so good. However, on the subsequent Saturday morning, things start to unravel for those who take opportunity cost into account. For the chosen action $a^\star$, you experience a fixed value $v^\star$. And for all other actions, your beliefs are updated based on the known value of $a^\star$, resulting in $\bar c (a | a^\star)$. Without loss of generality, let's assume that $\bar c(a^\star | v^\star) = v^\star$. People who consider opportunity cost perceive their ex-post utility as:
$$
\bar u(v^\star, a^\star) =  \bar c(a^\star|v^\star) - \max_{a\in \mathcal A\setminus a^\star}\bar c(a|v^\star)
$$
which, sadly, can sometimes yield a negative result. Even worse, some people tend to be "regretful," overestimating the utility of what they didn't choose. Mathematically, this can be expressed as:
$$
\bar c(a|v^\star) < c(a)\text{ for }a\ne a^\star
$$
In simpler terms:

> "You literally have no idea of the sacrifice I made by giving up my favorite social dance event to spend time with you! And then you're upset just because I arrived five minutes late due to traffic..."
