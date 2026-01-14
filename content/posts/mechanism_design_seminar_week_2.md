---
title: "mechanism design seminar notes | week 2"
date: 2024-09-19T19:55:22+08:00
draft: false
---

Following up on [last week's introduction](/posts/mechanism_design_seminar_week_1) to combinatorial auctions and Vickrey-Clarke-Groves (VCG) mechanisms, a natural question arises: **Is there a more efficient algorithm to allocate items effectively?**

One general idea is to start with an arbitrary price vector. If an item is demanded by more than one agent, we increase its price; if no agent demands it, we decrease its price.  We then sit back, and pray that the process terminates:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/seminars/walrasian_tatonnement.jpeg" caption="A simple representation of the Tatônnement process—starting from $\mathbf{p} = 0$ and allocating everything to one person first." width="88%">}}

Just kidding. Naturally, we ask whether the **Walrasian Tatônnement** process, if it terminates, results in a desirable allocation—ideally, an equilibrium.

------

## Walrasian Equilibrium

> **Definition** (Walrasian Equilibrium): Given $m$ indivisible goods and $n$ agents, each with a valuation function $v_i: 2^{[m]} \to \mathbb{R}_+$, a feasible allocation $\vec{S} = (S_1, \ldots, S_n)$ and a price vector $\vec{p}$ constitute a **Walrasian Equilibrium** if:
>
> 1. **Utility Maximization**: For all $i \in [n]$,
>     $$
>     S_i \in \arg\max_{S \subseteq [m]} \left[v_i(S) - p(S) \right].
>     $$
>
> 2. **Market Clearing**: For all items $j \notin \bigcup_i S_i$, the price satisfies $p_j = 0$.

*Remark*: The first condition alone is trivial to achieve—for instance, by setting prices to infinity, every agent would choose the empty set. The second condition prevents this trivial solution by ensuring that any unallocated item must have zero price, effectively requiring that no agent values it at its current price.

### Properties of Walrasian Equilibrium

Walrasian Equilibria have several desirable properties:

- They maximize **social welfare**.

    > **Theorem** (First Welfare Theorem): If $(\vec{S}, \vec{p})$ is a Walrasian Equilibrium, then $\vec{S}$ maximizes the total valuation across all agents.

- **Fairness**: They are **envy-free** allocations, meaning no agent prefers another agent's allocation at the given prices.

------

## How far can Tatônnement process go?

The Walrasian Tatônnement process does not necessarily work when agents have arbitrary valuation functions. The process implicitly assumes that agents do not discard items they currently hold; that is, at each iteration, an agent may want to acquire additional items but will not give up any they already have. Recognizing this limitation allows us to construct pathological valuation functions that undermine the process.

Nevertheless, think positively. To ensure the Tatônnement process behaves well, we focus on a specific class of valuation functions known as **gross substitutes**.

> **Definition**. (Gross Substitutes) A valuation function $v$ satisfies the *gross substitutes* property if, for any two price vectors $\vec{p}$ and $\vec{p}'$ with $\vec{p}' \geq \vec{p}$ (component-wise), and any demanded bundle $S \in \arg\max_{S \subseteq [m]} [ v(S) - p(S) ]$, there exists a demanded bundle $S' \in \arg\max_{S \subseteq [m]} [ v(S) - p'(S) ]$ such that:
> $$
> S' \supseteq \lbrace j \in S \mid p_j' = p_j \rbrace.
> $$
>
> *In other words*, if the price of some items increases (while others remain the same), an agent with a gross substitutes valuation continues to demand the items whose prices did not increase.

### Examples of Gross Substitutes Valuations:

- **Additive Valuations**: The value of a set is the sum of the values of its items.
- **Unit-Demand Valuations**: The agent desires at most one item.
- **OXS Valuations**: Valuations representable as an *Outer product of eXchangeable goods and Substitutes* (e.g., matroid rank functions).

### An important positive result is:

> **Theorem**: If all agents have gross substitutes valuations, then a Walrasian Equilibrium always exists.

Following, under the gross substitutes condition, the Tatônnement process can find an equilibrium allocation that is efficient and fair.

### Necessity of the Gross Substitutes Condition

Conversely, gross substitutes valuations are, in some sense, necessary for the existence of a Walrasian Equilibrium.

> **Theorem** (Gul and Stacchetti): If an agent's valuation $v_0$ is not a gross substitutes valuation, then there exists a set of unit-demand valuation functions $(v_1, v_2, \ldots, v_n)$ such that, collectively, the system $[v_i]_{i=0}^n$ does not admit a Walrasian Equilibrium.

This negative result highlights the critical role of the gross substitutes property in guaranteeing the existence of equilibrium, **independent of the Tatônnement process.**

------

## Relationship to Submodular Functions

We can further characterize gross substitutes valuations in relation to **submodular functions**.

> **Definition** (Submodular Function): A valuation function $v$ is submodular if, for all $S \subseteq T \subseteq [m]$ and for all $j \notin T$,
> $$
> v(S \cup \lbrace j \rbrace) - v(S) \geq v(T \cup \lbrace j \rbrace) - v(T).
> $$
>

This property reflects diminishing marginal returns—the marginal value of adding an item decreases as the set grows.

> **Theorem**: Gross substitutes valuations are a subset of submodular functions.

*Proof Outline*: For any gross substitutes valuation and sets $S \subseteq T$, we can construct appropriate price vectors $\vec{p}$ and $\vec{p}'$ to derive the inequality conditions required by submodularity.

See you next week!
