---
title: "Blackwell's Theorem"
date: 2025-10-08T21:42:21-05:00
draft: false
---

Here's my own class note from first two weeks of Professor Kamenica's *Topics in Informational Economics* course.

## Math Prelims: Comparing Two Distributions

### Second-Order Stochastic Dominance (SOSD)

> **Definition.**  
> Given $\mathbf{X}, \mathbf{Y} \in \mathcal{X}^n$, we say that $\mathbf{X}$ second-order stochastically dominates $\mathbf{Y}$, written as $\mathbf{X} \ge_{sosd} \mathbf{Y}$,  , if for every increasing and concave function $u : \mathbb{R}^n \to \mathbb{R}$,
> $$
> \int u(x)\, dF_{\mathbf{X}}(x) \ge \int u(x)\, dF_{\mathbf{Y}}(x).
> $$
>

---

### Mean-Preserving Spread (MPS)

> **Definition.**  
> Given $\mathbf{X}, \mathbf{Y} \in \mathcal{X}^n$, we say that $\mathbf{X}$ and $\mathbf{Y}$ are equal in distribution, denoted $\mathbf{X} \overset{d}{=} \mathbf{Y}$, iff. $F_{\mathbf{X}}(\cdot) = F_{\mathbf{Y}}(\cdot)$ for their CDFs.

> **Definition.**  
> Given $X, Y \in \mathcal{X}^n$, we say $X$ is a **mean-preserving spread** of $Y$, denoted
> $$
> X \ge_{mps} Y,
> $$
>
> if there exists some $Z \in \mathcal{X}^n$ such that
>
> $$
> X \overset{d}{=} Y + Z,   \mathbb{E}[Z|Y] = 0.
> $$
>
> Equivalently, $F_X$ is a **mean-preserving spread** of $F_Y$.

> **Proposition.**  
> Given $X, Y \in \mathcal{X}^n$,
>$$
> X \ge_{mps} Y \Longleftrightarrow  \int f(x)   dF_X(x) \ge \int f(x)   dF_Y(x)
> $$
>   
> for every **convex** function $f : \mathbb{R}^n \to \mathbb{R}$.

---

### Relationship Between SOSD and MPS

> **Theorem.**  
> Suppose $X, Y \in \mathcal{X}^n$. Then
> $$
> \mathbb{E}[X] = \mathbb{E}[Y] \ \text{ and } \ X \le_{sosd} Y  \Longleftrightarrow  X \ge_{mps} Y.
> $$


---

### Detour: One Dimensional Case

> **Theorem.**  
> Given $X, Y \in \mathcal{X}^1$,
> $$
> X \ge_{mps} Y  \Longleftrightarrow  \mathbb{E}[X] = \mathbb{E}[Y]\text{ and } \int_{-\infty}^{x} F_X(t)  dt \ge \int_{-\infty}^{x} F_Y(t)  dt, \ \forall x.
> $$
>

---

# Blackwell’s Theorem

### Decision Problems {#decision-problems}

Fix a finite state space $\Omega$.

A **decision problem** is a triplet $(\mu, A, u)$ where:

1. $\mu \in \Delta(\Omega)$ — the decision maker’s (DM’s) **belief** about $\Omega$;  
2. $A$, a **compact set** — the DM’s **choice set**;  
3. $u : A \times \Omega \to \mathbb{R}$ — the DM’s **state-contingent utility** (assumed continuous).

### Value Function

Define the **value function**:

$$
V_{(A,u)}(\mu) = \max_{a \in A} \mathbb{E}_\mu[u(a,\omega)].
$$

> **Theorem.**  
> For all $(A, u)$, the value function $V_{(A,u)}$ is **convex**.

> **Theorem.**  
> Given any convex function $f : \Delta(\Omega) \to \mathbb{R}$,  
> there exists a decision problem $(A, u)$ such that
>
> $$
> V_{(A,u)} = f.
> $$
>
> *(NOTE: This shows that any convex function over beliefs can be represented as a decision problem with some utility and action set.)*

----

## Experiment

> **Definition (Experiment).**  
> An **experiment** $\mathcal{E}$ is a *Markov kernel* that maps a prior belief $\mu \in \Delta(\Omega)$  
> to a random posterior $\tilde{\mu} \in \Delta(\Omega)$ satisfying the Bayes plausibility condition:
> $$
> \mathbb{E}_{\tilde{\mu} \sim \lang \mathcal{E}|\mu \rang}[\tilde{\mu}] = \mu.
> $$
>
> We write this random posterior as
> $$
> \langle \mathcal{E} \mid \mu \rangle \in \Delta(\Delta(\Omega)),
> $$
> i.e., $\langle \mathcal{E} \mid \mu \rangle$ is the **distribution over posteriors** induced by experiment $\mathcal{E}$ when the prior is $\mu$.

Note: this *revelation approach* abstracts away the underlying signal space.

---

### Blackwell Order

> **Definition.**  
> Given a decision problem $(\mu, A, u)$, the **value of an experiment** $\mathcal{E}$ is $W_{(\mu, A, u)}(\mathcal{E}) = \mathbb{E}_{\tilde{\mu} \sim \lang \mathcal{E}|\mu\rang} \left[ V(\tilde{\mu}) \right]$.

> **Definition.**  
> Given two experiments $\mathcal{E}$ and $\mathcal{E}'$, $\mathcal{E}$ is *(Blackwell) more informative* than $\mathcal{E}'$, denoted $\mathcal{E} \ge_B \mathcal{E}'$, if
> $$
> W_{(\mu, A, u)}(\mathcal{E})
> \ge
> W_{(\mu, A, u)}(\mathcal{E}')
> \quad \forall (\mu, A, u).
> $$

### Induced Mean-Preserving Spread (IMPS) Order

> **Definition.**  
> Given $\mathcal{E}, \mathcal{E}'$, $\mathcal{E}$ is above $\mathcal{E}$ in the *induced mean-preserving spread order*, denoted $\mathcal{E} \ge_{\mathrm{IMPS}} \mathcal{E}'$, if
> $$
> \langle \mathcal{E} | \mu \rangle
> \ge_{\mathrm{MPS}}
> \langle \mathcal{E}' | \mu \rangle
> \quad \forall \mu.
> $$

## Garbling Order

> **Definition.**  
> Given experiments $(\mathcal{E}, Y)$ and $(\mathcal{E}', Y')$,  say that $\mathcal{E}'$ is a **garbling** of $\mathcal{E}$, denoted $\mathcal{E} \ge_g \mathcal{E}',$ if there exists a stochastic kernel $g : Y \times Y' \to [0,1]$ such that:
>
> 1. $\displaystyle \sum_{y' \in Y'} g(y, y') = 1 \quad \forall y \in Y;$  
> 2. $\displaystyle \mathcal{E}'(y'|\omega) = \sum_{y \in Y} g(y, y') \mathcal{E}(y|\omega).$
----

## Blackwell’s Theorem (1951)

> **Theorem (Blackwell 1951).**  
> The following are equivalent for any experiments $\mathcal{E}, \mathcal{E}'$:
>
> 1. $\mathcal{E} \ge_B \mathcal{E}'$  
> 2. $\mathcal{E} \ge_{\mathrm{IMPS}} \mathcal{E}'$  
> 3. $\mathcal{E} \ge_g \mathcal{E}'$
>

An interesting Convex Support Condition

> **Proposition.**  
> If $\mathcal{E} \ge_B \mathcal{E}'$, then
> $$
> \mathrm{co}\big(\mathrm{supp}(\langle \mathcal{E} | \cdot \rangle)\big)
> \supseteq
> \mathrm{supp}(\langle \mathcal{E}' | \cdot \rangle).
> $$

---

## Some Examples to Play Around

Example 1 (Location Experiment)
$$
\Omega \subseteq \mathbb{R}, \quad Y \subseteq \mathbb{R}
$$

$$
\mathcal{E}: y \sim \mathcal{N}(\omega, \sigma^2), \qquad
\mathcal{E}': y' \sim \mathcal{N}(\omega, {\sigma'}^2)
$$

**Claim:** $\mathcal{E} \ge_B \mathcal{E}' \iff \sigma \le \sigma'.$

---

### Example 2

$$
\mathcal{E}: y = \omega + \varepsilon, \quad \varepsilon \sim \mathcal{N}(0, \sigma^2)
$$

$$
\mathcal{E}': y' = \omega + \varepsilon', \quad \varepsilon' \text{ with } \mathrm{Var}(\varepsilon') > 0
$$

**Claim:** $\mathcal{E} \not\ge_B \mathcal{E}'$ and $\mathcal{E}' \not\ge_B \mathcal{E}$.

---

### Example 3

$$
\mathcal{E}: y = \omega + U, \quad U \sim \mathrm{Unif} \left(-\tfrac{1}{2}, \tfrac{1}{2}\right)
$$

$$
\mathcal{E}': y' = \omega + U', \quad U' \sim \mathrm{Unif} \left(-\tfrac{1}{2x}, \tfrac{1}{2x}\right), \ x > 1
$$

**Claim:** $\mathcal{E} \not\ge_B \mathcal{E}'$,  
and $\mathcal{E}' \ge_B \mathcal{E} \iff x \in \mathbb{N}$ (e.g., $x = 1.5$ fails).
