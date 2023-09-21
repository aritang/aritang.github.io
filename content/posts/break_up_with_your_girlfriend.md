---
title: "break up with your girlfriend, i'm bored"
date: 2023-09-21T19:58:01+08:00
draft: false
cover:
    image: high_school_admission/bkwyg.jpeg
summary: about stable matching
---

So, I made this epic promise to Al Roth while asking him to sign his book "*Two-Sided Matching (1990)*", that I'll dive in and finish reading it in a blistering **four months** (spanning this semester). Fast forward, and a quarter of that time has slipped through my fingers, leaving me stranded on page 40 out of 260. Well...careful with your promises.

Time to step on the gas pedal. But hey, I found some inspiration in Chapter 2, section 2.3, courtesy of the lattice theorem. It relates to a song of Ariana Grande (the title). Not trying to sabotage anybody's relationship though. Here's the math:

Background check: stable matching. Consider a prom, with boys and girls labelled as $M:=\{m_1, m_2, ..., m_{k_m}\}$ and $W:=\{w_1, w_2, ..., w_{k_w}\}$. Naturally, for any $m\in M$ [$w\in W$] he [she] would have a preference over any two girls [boys] $w, w'\in W$ [$m, m'\in M$]. Denote this pairwise preference order as $w\succeq_m w'$ [$m\succeq_w m'$]. Assume that it's acyclic and strict (yeah i know this is nontrivial in certain sense, bite me). And we're allowing everyone to rank themselves above a few others. So, for instance, a boy $m\in M$, might have a preference list that looks something like this:


$$
P(m):w_1 \succ w_3 \succ m \succ w_2
$$
indicating that $m$ adores $w_1$, maybe she's his crush. $w_3$ isn't too bad, but she's got a bit of an attitude, so she's his second choice. Finally, $w_2$? Too nerdy. He'd rather attend prom solo than with her.

Now, this prom drama (or generally, a bilateral matching market $(M, W, P)$) needs a "match". A matching $\mu$ is a mapping from $M\cup W$ to $M\cup W$. For it to be proper, it needs to satisfy two criteria: (i) boys are matched to girls (and vice versa), i.e., $\mu(m)\in W\cup{m}$ and (ii) it's a one-to-one matching, i.e., $\mu(m) = w$ *iff.* $\mu(w) = m$.

But then, a meddling teacher enters the scene, acting as a matchmaker, trying to pair everyone up instead of letting the market handle its own romantic affairs. Now, this teacher has to find a **stable matching**—a matching where there is no blocking pair $(m, w)$ that is not matched but both prefer each other than their current matches. 

Btw, Ariana Grande is an expert in this, as she sings in one of her hit single *break up with your girlfriend, i'm bored*:

> Then I realize she's right there, and I'm at home like, "Damn, this ain't fair".
>
> And you realize she's right there, and you're at home like "Damn, she can't compare."

![bkwyg1](/high_school_admission/bkwyg1.jpeg)

Chill. In a bilateral matching market, it's been proven that a stable matching always exists. Denote the set of all possible stable matchings as $\mathcal S$, $\mathcal S\ne \empty$.

Now, the fun part comes in. There can be multiple possible stable matchings. But which one's better? We can define a partial order on the space $\mathcal S$, based on all the girls' preferences. Given two stable matches, $\mu_1$ and $\mu_2$, we say $\mu_1 \succ_W \mu_2$ if all the girls like $\mu_1$ as much as $\mu_2$, with some of them stricly prefer $\mu_1$ over $\mu_2$:
$$
\mu_1\succ_W \mu_2 \text{ if and only if:}\\

\mu_1(w)\succeq_w \mu_2(w),\forall w\in W\\
\mu_1(w)\succ_w \mu_2(w),\exists w\in W
$$
The same partial order can be set up w.r.t. boys. But say, the teacher is a bit biased and favors the girls. She has two stable matches, $\mu_1$ and $\mu_2$ in her hands. Now, if $\mu_1\succ_W \mu_2$, she can just choose $\mu_1$ over $\mu_2$. But what if $\mu_1$ is incomparable to $\mu_2$ w.r.t. girls, i.e. some girls prefer $\mu_1$ while others prefer $\mu_2$? In this case, we merge the two stable matching $\mu_1, \mu_2$ that we have in favours of the girls. 

Formally, define $\lambda := \mu_1 \vee_W \mu_2$ where
$$
\lambda (w) = \mu_1(w)\text{, if } \mu_1(w)\succeq_w\mu_2(w)\text{ and vice versa}\\
\lambda (m) = \mu_1(m)\text{, if } \mu_1(m)\preceq_m\mu_2(m)\text{ and vice versa}
$$
Notice that the operation $\vee_W$ leans towards the girls. Moreover, it can be proved that $\lambda$ is also a stable matching. And all the girls are happier with $\lambda$, i.e. $\lambda\succ_W \mu_1$ and $\lambda\succ_W \mu_2$.

So here's the solution, the teacher starts with some stable matching $\mu\in \mathcal S$ at hand and start looking for other stable matchings $\mu'\in \mathcal S$ and update $\mu = \mu' \vee_W\mu$. Since $\mathcal S$ is finite, she will eventually land at a $W$-optimal matching $\mu^*$ which is best for all girls while worst for all boys. It's worth noting that the saying "worst for all boys" is a nontrivial statement, but can be proven starting from the observation that $\lambda $ is worse for all boys than $\mu_1$ or $\mu_2$.

How I wish I'd learned this theory in high school!
