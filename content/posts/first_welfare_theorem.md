---
title: "The First Welfare Theorem"
date: 2025-10-01T22:20:10-05:00
draft: false
summary: "Macro is all about vibes. If you can vibe the math, it'd be super cool."
---

##### Macro is all about vibes. If you can vibe the math, that'd be super cool.

Consider the following economy: 

- Denote as $L = \mathbb R^m$ the commodity space. 

- Denote as $i = 1, 2, \ldots I$ the $I$ agents. Each agent can consume any vector $X^i\subset L$, and has a utility function $u^i : X^i \mapsto \mathbb R$. Each agent has endowment $e^i\in L, \forall i$.
- Denote as $j = 1, 2, \ldots, J$ the $J$ firms. Each firm can produce vectors $Y^j\subset L $. 
- Let consumer $i$ own a fraction $\theta^i_j \ge 0$ of firm $j$. Assume $\sum_{i\in [I]} \theta_j^i  = 1, \forall j\in [J]$.

> **Definition** A *competitive equilibrium* is a price vector $p\in \mathbb R^m$ and an allocation $\lbrace x^i, y^j\rbrace$ that satisfies
>
> - Each firm maximizes its profit:
>     $$
>     y^j = \arg \max_{y^j \in Y^j} p\cdot y
>     $$
>
> - Each consumer maximizes her utility subject to her budget constraint:
>     $$
>     \begin{align*}
>      & x^i = \arg\max_{x\in X^i}\  u^i(x)\\
>     & \text{s.t. } p\cdot x\le p\cdot e^i + \sum_{j\in [J]}\theta_j^i(p \cdot y_j)
>     \end{align*}
>     $$
>     
> - And the allocation is feasible (i.e. the market clears)
>     $$
>     \sum_{i\in [I]}x^i = \sum_{j\in [J]}y^j + \sum_{i\in [I]}e^i.
>     $$

> **Definition** An *allocation* $\lbrace x^i, y^j\rbrace$ is said to be *feasible* if $x^i\in X^i, \forall i$, $y^j\in Y^j, \forall j$, and
> $$
> \sum_{i\in [I]}x^i = \sum_{j\in [J]}y^j + \sum_{i\in [I]}e^i.
> $$

> **Definition** A feasible allocation $\lbrace x^i, y^j\rbrace$ is Pareto Optimal if there is no other feasible allocation preferred by everybody, i.e. one such that
> $$
> \begin{align*}
> u^i(x^i) \ge u^i(\bar x^i), \forall i\in [I],\\
> u^i(x^i) > u^i(\bar x^i), \exists i\in [I].\\
> \end{align*}
> $$

> **Definition** (*Local Non-Satiation*): A preference relation $\succsim$ on $X^i$ satisfies *local non-satiation* if, for every bundle $x \in X^i$ and every $\epsilon > 0$, there exists some $x' \in X^i$ with $\lVert x' - x \rVert < \epsilon$ such that $x' \succ x$.  

> **Theorem (First Welfare Theorem).**
>
> If every all agent's preferences are locally non-satiated, then every competitive equilibrium allocation is Pareto Optimal.

**Proof (sketch).**

1. Let $(p, \{x^i\}, \{y^j\})$ be a competitive equilibrium.  
   - Each firm $j$ maximizes profits given $p$.  
   - Each consumer $i$ maximizes utility subject to $p \cdot x^i \leq p \cdot e^i + \sum_j \theta_j^i (p \cdot y^j)$.  
   - Feasibility: $\sum_i x^i = \sum_j y^j + \sum_i e^i$.

2. Suppose, for contradiction, that this allocation is **not** Pareto Optimal. Then there exists another feasible allocation $\{\bar x^i, \bar y^j\}$ such that:
   - $u^i(\bar x^i) \ge u^i(x^i)$ for all $i$,  
   - and $u^k(\bar x^k) > u^k(x^k)$ for some $k$.

3. Local non-satiation implies that each consumer $i$ must be spending their *entire* budget in equilibrium:
   $$
   p \cdot x^i = p \cdot e^i + \sum_j \theta_j^i (p \cdot y^j).
   $$

4. Summing across all consumers:
   $$
   \sum_i p \cdot x^i = \sum_i p \cdot e^i + \sum_j p \cdot y^j.
   $$
   Which implies:
   $$
   p \cdot \Big(\sum_i x^i - \sum_j y^j - \sum_i e^i\Big) = 0.
   $$
   By feasibility, this holds.

5. Now consider the alternative allocation $\{\bar x^i, \bar y^j\}$. If it strictly improves some consumer’s utility without lowering anyone’s, then by local non-satiation, it must require strictly more expenditure at prices $p$:
   $$
   \sum_i p \cdot \bar x^i > \sum_i p \cdot x^i.
   $$
   But feasibility and firm profit maximization imply:
   $$
   \sum_i p \cdot \bar x^i \le \sum_i p \cdot e^i + \sum_j p \cdot \bar y^j \le \sum_i p \cdot x^i,
   $$
   a contradiction.

6. Hence, no such feasible Pareto improvement exists. The equilibrium allocation is Pareto Optimal.

---

### Questions to Think About

The first welfare theorem is elegant, but its assumptions hide a lot of subtlety. Here are some questions (from class notes) that push on its limits:

- **Externalities in Consumption:** Suppose the consumption of agent $i$ directly affects the utility of agent $i'$. In a competitive equilibrium, $i'$ takes $i$’s consumption as given. Does the theorem still hold?
- **Externalities in Production:** Suppose the production of firm $j$ directly shifts the production possibilities of firm $j'$. In a competitive equilibrium, $j'$ takes $j$’s plan as given. Does the theorem still hold?
- **Incomplete Markets:** If there are three goods but markets exist for only two, does the theorem still apply? What is the right notion of efficiency to compare equilibrium allocations with?
- **Disagreement about the world:** In classical models, agents are assumed to “see the world” the same way. What happens if people disagree about probabilities, technologies, or even basic facts? Does efficiency require common beliefs?
- **Intertemporal trade-offs:** How should we think about budget constraints that span across time? What does the equilibrium notion imply for saving and borrowing decisions?

- **Search frictions:** In practice, finding jobs, housing, or trading partners takes effort and time. How would adding such frictions alter the efficiency conclusion?

- **Money and transactions:** The model assumes goods-for-goods trade, but real economies use money. If we give money a role—as a unit of account, medium of exchange, or store of value—what changes in the welfare story?

- **Nominal contracts:** What if contracts are written in money terms rather than real goods? Does this institutional detail affect the efficiency properties of equilibrium?
