---
title: "attentions"
date: 2023-12-29T22:52:31+08:00
draft: false
summary: I read an eye-openly impressive paper today - Attention Management by Lipnowski, Mathevet and Wei. TBH, their model is very insightful (well, it's in AER afterall...) and has potential to shed light on theoretical as well as behavioral econ research.
---

I read an eye-openly impressive paper today - Attention Management by Lipnowski, Mathevet and Wei. What's funny is that, I didn't even remember how it landed in my reading list cause well, my cortex has been a bit messy recently. Anyway, what a beautiful bump.

> ***ABSTRACT***
>
> Attention costs can cause some information to be ignored and decisions to be imperfect. Can we improve the material welfare of a rationally inattentive agent by restricting his information in the first place? In our model, a well-intentioned principal provides information to an agent for whom information is costly to process, but the principal does not internalize this cost. We show that full information is universally optimal if and only if the environment comprises one issue. With multiple issues, attention management becomes optimal: the principal restricts some information to induce the agent to pay attention to other aspects.

The paper's model is similar to Bayesian Persuasion (Kamenica 2011) but with the utility function aligned between the principle and the agent (so it's kinda easier in this sense, that there's no "persuasion" happening). The problem arises when we consider the agent has an **attention cost** defined as a mapping $C: \mathcal R(\mu) \to \mathbb R_+$, where $\mu\in \Delta \Theta$ is a typical prior ($\Theta$ is world state space and $\Delta \Theta$ refers to set of distribution over $\Theta$), $\mathcal R(\mu)$ is the set of information policies' outcome, like, given a signal $\mu$ and the set of all possible (distribution of) posterior as the outome of some information policy is:
$$
\mathcal R(\mu) := \{ p\in \Delta \Delta \Theta:\int_{\Delta \Theta}\nu \ dp(\nu) = \mu\}
$$
and $C$ should be convex and continuous. Eventually, the problem of the principle becomes
$$
\begin{align}
\sup_{p,q }\ & \int_{\Delta \Theta} U_p\ dq\cr
s.t.\ & p\in \mathcal R(\mu)\cr
& q\in G^\star(p)\cr
\end{align}
$$
where $U$ is just utility (take expectation over distribution $p$) and $G^\star(p)$ referes to the agent with attention cost's optimal response ($q$ is the information that the agent pay attention to when $p$ is the information sent by the principle). Mathematically
$$
G^\star(p) := \arg\max_{q\in \mathcal R(\mu):q\preceq^B p} \{\int_{\Delta\Theta} U \ dq - C(q)\}
$$
(btw, $q\preceq^B p$ means that $p$ is more (Blackwell) informative than $q$, kinda like its mean-preserving spread or something).

Result:

- Full info disclosure is optimal ***iff.*** the state is binary.
- Withholding information can be optimal, helping guide the agent to make better decisions when there are more (≥3) states.

I didn't have time (or energy) today to thoroughly go through the math. But I think this model is very insightful (well, it's in AER afterall...) and has potential to shed light on theoretical as well as behavioral econ. Maybe I should look into its follow up researches as well. 

Anyway, sweet dreams \*;)
