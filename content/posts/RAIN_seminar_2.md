---
title: "game theory, with a little help from machine learning II"
date: 2024-06-27T13:57:29-07:00
draft: false
---

*Following yesterday's post ([here](/posts/RAIN_seminar_1/)), let's delve deeper into Stackelberg Games and the key points of the paper, particularly the addition of context to the problem setting.*

> ## Regret Minimization in Stackelberg Games with Side Information
>
> Keegan Harris, Zhiwei Steven Wu, Maria-Florina Balcan (2024) | [paper's arxiv link](https://arxiv.org/abs/2402.08576)

### recap of the mode:

A Stackelberg Security Game is a structured competitive setting involving a defender and an attacker. The defender commits to a strategy $ \mathbf p \in \mathbb{R}^n $ over $ n $ targets, and the attacker selects a target. The utility outcome for both parties depends on their actions and possibly some unknown world state event.

The attacker seeks to maximize utility given the defender's strategy:
$$
\text{(attacker's utility) } U^\text a(\mathbf p) :=  \max_{\mathbf y} \sum_{i\in [n]}y_i\left(  p_iu^1_i + (1 - p_i)u^0_i\right)
$$
The defender's utility, given the attacker's best response $ \mathbf y^*(\mathbf p) $, is:
$$
\text{(defender's utility) } U^\text d (\mathbf p) =  \sum_{i \in [n]} \left( y^*_i (v^1_i p_i + v^0_i (1 - p_i)) + (1 - y^*_i)(\bar v_i^1 p_i + \bar v_i (1 - p_i)) \right)
$$

regret is defined as:
$$
\text{(regret) }R(T) =  \tilde U^d(\mathbf {\tilde {p^t}})-\sum_{t = 1}^T U^d(\mathbf p^t)
$$
where $ \tilde U^d $ is the optimal-in-hindsight benchmark.

### contextual attackers

In each round $ t \in [T] $, nature reveals a context $ \mathbf z_t \in \mathcal{Z} \subset \mathbb{R}^d $ to both players. 

> For example, in airport security, $ \mathbf z_t $ might include arrival and departure times, passenger counts, and valuable cargo information. In cyber-defense, it might be network traffic statistics.

Both players' utilities depend on the context:
$$
U_a(\text{or } U^d) : \mathcal{Z} \times \text{Action Space} \to \mathbb{R}
$$
Given the sequence of attackers $ \{A_{k_1}, \ldots, A_{k_T}\} $ and context $ \mathbf z_1, \ldots, \mathbf z_T $, the optimal-in-hindsight policy for context $ \mathbf z $ is:

$$\pi^{*}(\mathbf z) \in \arg\max_{\mathbf p} \sum_{t = 1}^T U(\mathbf {z}, \mathbf p, \mathbf y (\mathbf p, \mathbf z)) \mathbb{1}\{\mathbf z_t = \mathbf z\}.$$

Contextual regret is then defined as:
$$
R(T) := \sum_{t = 1}^T \left( U(\mathbf z, {\pi}(\mathbf z), \mathbf y(\pi{}(\mathbf z), \mathbf z)) \mathbb{1}\{\mathbf z_t = \mathbf z\} - U^{\text{opt}} \right)
$$

### intuition and result

The paper begins by demonstrating the impossibility of no-regret learning in a fully adversarial setting where both contexts and attackers are chosen adversarially. 

Motivated by this result, the authors explore two natural relaxations: the settings in which either the sequence of followers is chosen stochastically or the sequence of contexts is stochastic:

{{<figure align="center" src="/maguerite/RAIN_result.jpeg" caption="Harris et al., 2024">}}

### reflections:

Although I haven't fully read the technicals of the paper yet, for the paper itself, an interesting thing to point out is how the authors defined **optimal-in-hindsight benchmark**. Just to motivate the nuance of the definition: despite the sequence of attackers being given, attacker's target changes when $\mathbf p$ changes. This adds an additional layer of complexity (hence, flexibility) to the problem and makes the model more versatile and interesting (according to another friend that I've talk to during the seminar).

As for online problems in general, for me personally, different kinds of online problems and their associated methodologies and mathematical tools has been quite enlightening yet overwhelming. These include Bandits with MWU, Restless Multi-Armed Bandits with Whittle Index, Prophet Inequality, Online Linear Programming, and the dual-threshold descent method, among others.

Online problems are inherently dynamic, which makes them challenging from the start. And, their analysis often involves intimidating, advanced mathematical tools. It requires both intuition and high-level math skills.

I feel anxious about mastering these concepts, but I'm also looking forward to the online problem seminar course next semester. Hopefully, it will provide more clarity and boost my skill in tackling these intricate things.
