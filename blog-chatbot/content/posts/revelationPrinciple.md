---
title: "The Revelation Principle"
date: 2026-04-23T14:01:06-05:00
draft: false
---

Mechanism design is a framework for studying the set of *implementable outcomes* when rational agents have private information. Revelation principle is one of its key lemmas. Here's a principled way to understand it:

## Setup

- **Agents:** $i \in [n] = \{1, \dots, n\}$.
- **Types:** Each agent $i$ has private type $t_i \in T_i$. The joint type space is $T = \prod_{i=1}^n T_i$.
- **Prior:** The type distribution (common prior) is $q \in \Delta(T)$. Assume $q$ is **fully supported** on $T$, i.e., $q(t) > 0$ for all $t \in T$.
- **Outcomes:** $x \in X$.
- **Preferences:** Each agent $i$ has a VNM utility function contingent on the outcome and the types of *all* agents:

$$u_i : X \times T \to \mathbb{R}.$$

---

## General Mechanism

**Definition.** A *(general) mechanism* is a pair $(S, g)$, where $S = S_1 \times \cdots \times S_n$, with $S_i$ the set of strategies (messages) available to agent $i$, and $g$ is a (possibly stochastic) outcome function:

$$g : S \to \Delta(X),$$

where $g(x \mid s)$ denotes the probability of outcome $x$ when the strategy profile is $s$.

---

## Bayesian Nash Equilibrium (BNE)

**Definition.** A strategy profile $\sigma = (\sigma_1, \dots, \sigma_n)$ under mechanism $(S, g)$ is a **Bayesian Nash Equilibrium (BNE)** if each agent's strategy is a (possibly mixed) mapping from types to strategies:

$$\sigma_i : T_i \to \Delta(S_i),$$

and for every agent $i$ and every type $t_i \in T_i$, the strategy $\sigma_i(\cdot \mid t_i)$ maximizes agent $i$'s interim expected utility. That is, for all $\sigma_i' : T_i \to \Delta(S_i)$,

$$\sum_{t_{-i} \in T_{-i}} \sum_{s \in S} \sum_{x \in X} u_i(x,\, t_i,\, t_{-i})\; g(x \mid s)\; \prod_{j=1}^n \sigma_j(s_j \mid t_j)\; q(t_{-i} \mid t_i)$$

$$\geq \quad \sum_{t_{-i} \in T_{-i}} \sum_{s \in S} \sum_{x \in X} u_i(x,\, t_i,\, t_{-i})\; g(x \mid s)\; \sigma_i'(s_i \mid t_i) \prod_{j \neq i} \sigma_j(s_j \mid t_j)\; q(t_{-i} \mid t_i).$$

---

## Implementable Distribution

**Definition.** A distribution over $X \times T$ is **implementable** if it can be obtained from some BNE $(\sigma, g, S)$. Concretely, the BNE $(\sigma, g, S)$ induces a joint distribution $p \in \Delta(X \times T)$ given by:

$$p(x, t) = \sum_{s \in S} g(x \mid s) \prod_{j=1}^n \sigma_j(s_j \mid t_j)\; q(t).$$

The marginal on $T$ is $q$ itself. The conditional distribution over outcomes given types is:

$$p(x \mid t) = \sum_{s \in S} g(x \mid s) \prod_{j=1}^n \sigma_j(s_j \mid t_j).$$

---

## Direct Mechanism (DM)

**Definition.** A **direct mechanism** is a mechanism $(S, g)$ in which $S_i = T_i$ for every agent $i$, so agents simply report types. The outcome function is written as:

$$\mu(\cdot \mid t) \in \Delta(X), \qquad \forall\, t \in T,$$

where $\mu(x \mid t)$ is the probability of outcome $x$ when the reported type profile is $t$.

---

## Incentive Compatibility (IC)

**Definition.** A direct mechanism $\mu$ is **incentive compatible (IC)** if truth-telling is a BNE. That is, for every agent $i$, every true type $t_i \in T_i$, and every possible misreport $t_i' \in T_i$:

$$\sum_{t_{-i} \in T_{-i}} \sum_{x \in X} u_i(x,\, t_i,\, t_{-i})\; \mu(x \mid t_i,\, t_{-i})\; q(t_{-i} \mid t_i) \;\;\geq\;\; \sum_{t_{-i} \in T_{-i}} \sum_{x \in X} u_i(x,\, t_i,\, t_{-i})\; \mu(x \mid t_i',\, t_{-i})\; q(t_{-i} \mid t_i).$$

In words: no agent can improve their interim expected utility by misreporting their type, given that all other agents report truthfully.

---

## The Revelation Principle

**Theorem (Revelation Principle).** Any implementable distribution over $X \times T$ can be induced by the truth-telling equilibrium of an incentive-compatible direct mechanism.

**Proof.**

Suppose $(\sigma, g, S)$ is a BNE that implements some distribution $p \in \Delta(X \times T)$.

*Step 1: Construct the direct mechanism.* Define $\mu : T \to \Delta(X)$ by composing the outcome function with the equilibrium strategies:

$$\mu(x \mid t) = \sum_{s \in S} g(x \mid s) \prod_{j=1}^n \sigma_j(s_j \mid t_j).$$

This is the "moderator" step: when agents report type profile $t$, the mechanism plays the equilibrium strategies on their behalf and draws the outcome accordingly.

*Step 2: The induced distribution is the same.* Under truth-telling in $\mu$, the joint distribution over $X \times T$ is:

$$\mu(x \mid t)\, q(t) = \sum_{s \in S} g(x \mid s) \prod_{j=1}^n \sigma_j(s_j \mid t_j)\; q(t) = p(x, t). \qquad \checkmark$$

*Step 3: Truth-telling is a BNE (IC holds).* Suppose, toward contradiction, that some agent $i$ with true type $t_i$ strictly benefits from reporting $t_i'$ under $\mu$. That is:

$$\sum_{t_{-i}} \sum_x u_i(x, t_i, t_{-i})\;\mu(x \mid t_i', t_{-i})\;q(t_{-i} \mid t_i) \;>\; \sum_{t_{-i}} \sum_x u_i(x, t_i, t_{-i})\;\mu(x \mid t_i, t_{-i})\;q(t_{-i} \mid t_i).$$

Expanding $\mu$ using its definition:

$$\sum_{t_{-i}} \sum_x u_i(x, t_i, t_{-i}) \left[\sum_s g(x \mid s)\;\sigma_i(s_i \mid t_i')\prod_{j \neq i}\sigma_j(s_j \mid t_j)\right] q(t_{-i} \mid t_i)$$

$$> \quad \sum_{t_{-i}} \sum_x u_i(x, t_i, t_{-i}) \left[\sum_s g(x \mid s)\;\sigma_i(s_i \mid t_i)\prod_{j \neq i}\sigma_j(s_j \mid t_j)\right] q(t_{-i} \mid t_i).$$

But notice the left-hand side is exactly agent $i$'s expected utility in the *original* mechanism $(S, g)$ when their true type is $t_i$ and they deviate to the strategy $\sigma_i(\cdot \mid t_i')$ instead of playing $\sigma_i(\cdot \mid t_i)$. This contradicts $\sigma$ being a BNE in $(S, g)$. $\square$

---

**Key Intuition (The Moderator Argument).** Given any general mechanism and its BNE strategies, imagine a moderator who:
1. Asks each agent to report their type.
2. Plays the BNE strategy on each agent's behalf (i.e., draws $s_i \sim \sigma_i(\cdot \mid t_i)$ for reported $t_i$).
3. Feeds $s = (s_1, \dots, s_n)$ into $g$ to determine the outcome.

No agent can gain by lying to the moderator, because lying to the moderator about being type $t_i'$ is equivalent to deviating to strategy $\sigma_i(\cdot \mid t_i')$ in the original game — which was not profitable by the BNE assumption. Hence truth-telling is an equilibrium of the direct mechanism, and it produces exactly the same distribution over outcomes and types.
