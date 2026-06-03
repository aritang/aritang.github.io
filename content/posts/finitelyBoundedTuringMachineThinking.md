---
title: "Limited Storage Turing Machine Human Beings"
date: 2026-04-08T09:45:40-05:00
draft: false
---

Professor Richard Holden from UNSW Sydney came to our theory seminar to give a talk about his paper [**"Getting the Picture"**](https://economics.uchicago.edu/sites/default/files/users/user337/Holden Getting the Picture.pdf).

The paper's idea of modeling an individual who has limited *working memory* originates from cognitive science. But gives a strong computer science flavor. Here's my notes from student coffee seminar. We think there are certain computer science work can be done for it:

## Model

Definitions

- Input: $P \in \mathcal P \subseteq \Omega^{MN}$

- *Feature* is a predicate function
	$$
  f: \mathcal P \to \{0, 1\}
  $$
	An equivalent way of defining *feature* is the subset of $\mathcal P$ with which $f$ is true
	$$
	S_f = \{P\in \mathcal P: f(P) = 1\}.
	$$
	
- Denote the space of features: $\mathcal F$. 

- Define the set of knowable *knowledge* as $C\subseteq \mathcal F$.

> Note: just for clarification
>
> An NP problem is "**GIVEN f FIND P such that f(P) = 1**"
>
> This paper's cognitive constrained agent face a decision problem: **GIVEN P and f, FIND whether f(P) = 1 s.t. (some kind of) space constraints**
>

Formally, the 'algorithm' is

> INPUT $P\in \mathcal P$, $f_a\in \mathcal F$ and $K_0\subseteq C$.<br>FOR t = 1, ...
>
> > Agents choose a thought $ T_t = (\phi_t, W_t) $ where $\phi_t\in C$ and $$W_t \subset K_t, |W_t| \le L$$
> >
> > IF $\phi_t$ satisfies
> > $$ \cap_{f\in W_t}S_f\subseteq S_{\phi_t} $$
> > Let $K_{t + 1} = K_t\cup\{\phi_t\}$ <br>ELSE $K_{t + 1} = K_t$
> >
>
> RETURN $f_a$ is TRUE or FALSE

Question: does the algorithm always ends?

Question: how to choose $T_t$?

Qusetion: can all $f_a$ be reached?

Question: if we limit $C$ (eg. Polynomial time computable) AND/OR poly-steps iteration AND/OR choise of $T$ at each step: does it limit the set of $f_a$ reachable?
