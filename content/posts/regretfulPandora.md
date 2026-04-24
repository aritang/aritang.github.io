---
title: "Talk Note | Pandora Box + Prior Ambiguity + MinMax Regret = Choice Overload"
date: 2026-04-24T15:01:10-05:00
draft: true
---

Professor Auster came to Chicago to give a talk in our theory seminar. Turns out for Pandora's box, if boxes' prior are ambiguous and decision maker seeks to minimize maximum regret against a clairvoyant oracle (an oracle who knows all the real reward of the boxes), the decision maker would exihbit **choice overload** (theoretically).

Some additional notes:

### Setup

A decision maker face $n$ boxes. Search cost $c_i$ for each boxes. Each box's reward is binary $v_i \in \{0, \bar v\}$.

Let $\{0, \bar v\}^n \equiv \Omega$ and $\mathcal F \subseteq\Delta(\{0, \bar v\}^n)$. Reward distribution $F\in \mathcal F$ is unknown.

Space of actions: deteministic actions are without loss a stopping rule.
$$
A^{det} = \{a: 2^{[n]} \to [n]\cup \{0\}\}.
$$
For convenience, suppose an individual take deteministic action $a$ and the real state of the world (boxes) are $w\in \Omega$, denote his utility as 
$$
u(a, w).
$$
Decision maker takes random action $\tilde a\in \Delta(A^{set})$, and cares about max regret against a oracle who knows the optimal distribution.
$$
\max_{F\in \mathcal F} \mathbb E_{a\sim \tilde a}\mathbb E_{w\sim F}[\underbrace{u(a^*, w)- u(a, w)}_{\text{Regret}}].
$$
where $a^*$ is an oracle decision rule, might be:

- A "Bayes" oracle — Weitzman's index policy under the true $F$. In other words, $a^*(\cdot)$ is contingent on $F$.
- A "clairvoyant" oracle, $a^*(w)$ knowning the real state.

For convenience, let regret be
$$
R(a, w) = u(a^*, w)- u(a, w)
$$
And let instance-level payoff
$$
\rho(a, F):= \mathbb E_{w\sim F}[R(a, w)].
$$

### Yao's Lemma

The OG problem's min max regret
$$
V = \min_{\tilde a\in \Delta(A^{det})}\max_{F\in \mathcal F} \mathbb E_{a\sim \tilde a}\mathbb E_{w\sim F}[\underbrace{u(a^*(w), w)- u(a, w)}_{\text{Regret}}]\tag{Primal-1}
$$
equals
$$
\max_{G\in \Delta(\mathcal F)}\min_{a\in A^{det}} \mathbb E_{F\sim G}\mathbb E_{w\sim F}[\underbrace{u(a^*(w), w)- u(a, w)}_{\text{Regret}}].
$$

### $F$ Collapse to $w$ if $\mathcal F = \Delta(\{0, \bar v\}^n)$.

Assume $\mathcal F = \Delta(\{0, \bar v\}^n)$.

Fix $\tilde a\in \Delta (A^{det})$, ambiguity over $F$ adds no power to Nature beyond ambiguity over $w$, because $\mathcal F=\Delta(\Omega)$ is a simplex and $\rho$ is linear in $F$:
$$
\max_{F\in \mathcal F}\mathbb E_{F}[\mathbb E_{a\sim \tilde a}  R(a, w)]=\max_{w\in \Omega}\mathbb E_{a\sim \tilde a}  R(a, w)
$$
So we have a simplified Yao's Lemma exposition:
$$
\boxed{\;\min_{\tilde a\in\Delta(A^{det})}\max_{w\in\Omega}\mathbb E_{a\sim\tilde a}[R(a,w)]\;=\;\max_{q\in\Delta(\Omega)}\min_{a\in A^{det}}\mathbb E_{w\sim q}[R(a,w)].\;}
$$
This can be generalized to when $\mathcal F$ is convex with a tractable extreme-point set.

### For general $\mathcal F$:

The primal is hard to deal with. Look at the Yao dual:
$$
V = \max_{G\in\Delta(\mathcal F)}\min_{a\in A^{det}}\mathbb E_{F\sim G}\mathbb E_{w\sim F}[R(a,w)].
$$
Note that
$$
\mathbb E_{F\sim G}\mathbb E_{w\sim F}[R(a,w)] = \mathbb E_{w\sim \bar G}[R(a,w)],\qquad \bar G=\!\int\! F\,dG.
$$
Essentially
$$
\{\bar G:G\in\Delta(\mathcal F)\}\;=\;\operatorname{co}(\mathcal F),
$$
So
$$
\boxed{\;V\;=\;\max_{\bar F\,\in\,\operatorname{co}(\mathcal F)}\;\min_{a\in A^{det}}\;\mathbb E_{w\sim\bar F}[R(a,w)].\;}
$$
The outer layer is gone; the adversary's effective strategy set is $\operatorname{co}(\mathcal F)$.
