---
title: "game theory, with a little help from machine learning I"
date: 2024-06-26T07:26:22-07:00
draft: false
---

Of course, the general purpose of an academic presentation is multifaceted (see an [older post](/posts/idea_of_a_presentation/) about it), as discussed here. Nevertheless, I've once heard someone say that the key purpose of a talk at a conference is to **make your audience interested in reading your work after the talk ends**.

I attended the RAIN seminar [yesterday](posts/rain_seminar/) at Y2E2, Stanford, where Nina Balcan presented one of her latest works. Personally, I have a general interest in research that involves complex human behaviors. But Nina Balcan's talk was particularly captivating. So, I decided to read a bit of the paper, *Online Learning in Stackelberg Security Games* :

> ## Regret Minimization in Stackelberg Games with Side Information
>
> Keegan Harris, Zhiwei Steven Wu, Maria-Florina Balcan (2024) | [paper's arxiv link](https://arxiv.org/abs/2402.08576)

### the game

A Stackelberg Security Game is a structured competitive setting involving a defender and an attacker. The defender commits to a defensive strategy, and the attacker responds by choosing a target to attack. The outcome for both parties depends on their chosen actions and potentially some unknown world state.

There are $i = 1, 2, \ldots, n$ possible targets. The defender has one unit of defensive effort to allocate among these targets, represented by a strategy vector:
$$
\mathbf p = [p_1, p_2, \ldots, p_n]
$$
where $ \sum_i p_i = 1 $ and $ p_i \in [0, 1] $. At every time point, after the defender chooses $\mathbf p$, an attacker comes, knowing $\mathcal p$, chooses a target $ i^* $ that maximizes his utility:
$$
\text{(attacker's utility) } U^\text a =  \max_{\mathbf y} \sum_{i\in [n]}y_i\left(  p_iu^1_i + (1 - p_i)u^0_i\right)\\
\text{later we'll see, it's type-dependent}
$$
Here, $ u_i^1 $ and $ u_i^0 $ are the attacker's utilities from attacking target $i$ when it is protected and unprotected, respectively. The attacker's action vector $ \mathbf y \in \{0, 1\}^n $. The optimal attack response to the defender's strategy $ \mathbf p $ is:
$$
\mathbf y^*:=\arg\max_{\mathbf y}\sum_{i\in [n]}y_i\left(  p_iu^1_i + (1 - p_i)u^0_i\right)
$$
Given the attacker's best response $ \mathbf y^*(\mathbf p) $, the defender's utility is:
$$
\text{(defender's utility) } U^\text d (\mathbf p) =  \sum_{i \in [n]} \left( y^*_i (v^1_i p_i + v^0_i (1 - p_i)) + (1 - y^*_i)(\bar v_i^1 p_i + \bar v_i (1 - p_i)) \right)
$$
From my memory of the talk, the model is linear in both players' strategies. However, the paper uses more general notations and definitions, but the results rely heavily on a polytope-linear partition of the defender's action space, so the linear assumption should be quite general.

### no-regret

Taking the defender's perspective in a dynamic setting, at each time point $ t = 1, 2, \ldots, T $, nature selects an attacker $ A_{k_t} $ from a set of $ K $ possible attackers, with different utility functions and attacking habits. The defender knows the utilities but not the upcoming attacker's type before committing to a strategy $ \mathbf p^t $.

The regret is defined as:
$$
\text{(regret) }R(T) =  \tilde U^d(\mathbf {\tilde {p^t}})-\sum_{t = 1}^T U^d(\mathbf p^t)
$$
where $ \tilde U^d $ is the optimal-in-hindsight benchmark.

> No-regret benchmark:
>
> The optimal-in-hindsight benchmark $\tilde U^d$ is defined for optimized strategy **knowning the upcoming chosen sequence $\{A_{k_1}, \ldots, A_{k_T}\}$**. But, the attacker's action at each time point still changes given the defender's strategy changes.

When the set of attackers is fixed and finite, no-regret learning (where $ R(T) = o(T) $) is achievable. The paper explores introducing context into this dynamic decision-making environment.

It's late tonight. Stay tuned for tomorrow, where I'll write more about the modeling approach and its implications.
