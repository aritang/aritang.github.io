---
title: "Booth Econ Camp Class Note Part II"
date: 2025-09-25T16:16:28-05:00
draft: false
---

## Expected Utility Theory

Suppose the space of alternatives has a little more structure:
$$
X = X_1 \times X_2 \times \cdots \times X_n.
$$

We define **Lottery Space** on this $X$: Let $\mathcal{L} = \Delta(X)$ = set of lotteries on $X$ (probability distributions).

### Expected Utility Representation

> **Definition.** A preference $\succeq$ on lottery space $\mathcal{L}$ admits an **expected utility form** if  $\exists u:X\to\mathbb{R}$ such that $\forall L,L'\in\mathcal{L}$:
>
> 1. $U(L) = \sum_{x\in X} p^L_x u(x)$,
> 2. $L\succeq L' \iff U(L)\geq U(L')$.


### The von Neumann Morgenstein Theorem

> **Theorem** Consider the space of lotteries $\mathcal{L} = \Delta(X)$ over a finite set of outcomes $X$. For any preference relation $\succeq$ on $\mathcal{L}$, iff. it satisfies:
>
> 1. **Rationality** (completeness + transitivity).
>
> 2. **Continuity** (note: one can define continuity on different abstract levels. For the problem we are working with right now, the following suffices)
>
>     > **Continuity Axiom.** (VNM version) If $L \succeq L' \succeq L''$, then there exists some probability $\alpha \in [0,1]$ such that
>     >$$
>     > L' \sim \alpha L + (1-\alpha)L''.
>     > $$
>     
> 3. **Independence**
> 
>     > **Independence Axiom.** $\succeq$ on $\mathcal{L}$ satisfies **independence** if  
>     > $$
>     > L \succeq L'   \iff   \beta L+(1-\beta)L'' \succeq \beta L' + (1-\beta)L"
>    > $$
>     > for all $L,L',L''\in\mathcal{L}$ and $\beta\in(0,1)$.
>
> Then, there exist a utility function $u:X\to\mathbb{R}$ such that preferences are represented by the expected utility:
> $$
> U(x) = \sum_i U_i(x_i)
> $$

*Remark*: "expected utility" is also called **von Neumann–Morgenstern (VNM) utility** because John von Neumann and Oskar Morgenstern were the first to give a rigorous axiomatization of when preferences over lotteries can be represented by the **expected value** of some numerical utility function.

----

## Linearity

> **Definition.** $U:\mathcal{L}\to\mathbb{R}$ is **linear** if  
> $$
> U(\beta L+(1-\beta)L') = \beta U(L)+(1-\beta)U(L') \quad \forall L,L', \beta\in[0,1].
> $$

**Proposition.** $U$ has an expected utility form $\iff$ $U$ is linear.

---

## Uniqueness of Bernoulli Utility

Suppose  
$$
U(L) = \sum_{x\in X} p^L_x u(x),\qquad
\hat U(L) = \sum_{x\in X} p^L_x \hat u(x)
$$
both represent the same $\succeq$.  

Then $\exists \alpha\in\mathbb{R}, \beta>0$ such that  
$$
U = \alpha + \beta \hat U, \qquad
u = \alpha + \beta \hat u.
$$


---

## Risk Aversion

Let $X$ be a compact subset of $\mathbb{R}$.

> **Definition.** An individual is
>
> - **risk-neutral** if $  \forall P:   \mathbb{E}_P[u(x)] = u(\mathbb{E}_P[x])$,  
>
> - **risk-averse** if $  \forall$ nondegenerate $P:   \mathbb{E}_P[u(x)] < u(\mathbb{E}_P[x])$,  
>
> - **risk-seeking** if $  \forall P:   \mathbb{E}_P[u(x)] > u(\mathbb{E}_P[x])$.

Mathematically, these risk-attitudes relates to utility function's convexity/concavity.

> (Jensen’s Inequality) Let $f:\mathbb{R}\to\mathbb{R}$. Then
>
> * $f$ is linear $\iff \forall P:   \mathbb{E}_P[f(x)] = f(\mathbb{E}_P[x])$,  
> * $f$ is strictly concave $\iff \forall$ nondegenerate $P:   \mathbb{E}_P[f(x)] < f(\mathbb{E}_P[x])$,  
> * $f$ is strictly convex $\iff \forall P:   \mathbb{E}_P[f(x)] > f(\mathbb{E}_P[x])$.

---

## Subtlety: Risk Attitudes and Wealth Utility

Note that when we're defining risk attitude, the utility function $u(\cdot)$ is de facto, defined relative to a 1-dimensional utility of wealth:

$$
u(w)   :=   \max_{x: p\cdot x \leq w}   u(x,p),
$$

which is like optimal outcome of the lower-level utility function, implicitly fixing a price vector $p$.

However, if the primitive preferences are defined on alternatives $X=\mathbb{R}^2$, the induced wealth utility (and therefore risk-attitude) can depend on the **price system**.

$$
\textbf{Example:}\quad u(a,b)   =   a^{1/2} + b^2   -   10^{10}  \cdot \mathbb 1_{\lbrace a>0,b>0\rbrace}.
$$

Here, depending on whether the consumer faces $p^1$ or $p^2$, the **indirect utility** $u(w)$ constructed via

$$
u(w) = \max_{x: p\cdot x \leq w} u(x)
$$

may exhibit different *risk attitudes*.

**Takeaway.**  
Risk aversion is a property of the *induced 1-dimensional wealth utility*. But since wealth utility itself comes from maximizing over a richer choice set, the observed risk attitude can vary with the environment (prices, feasible allocations), even if the underlying $u(x)$ is fixed.

---

## Measures of Risk Aversion

Let $u:\mathbb{R}\to\mathbb{R}$. The **Arrow–Pratt Relative Risk Aversion** index:

$$
\begin{align*}
\textit{(Absolute)}\quad  \Gamma^A(x) & = -\frac{u''(x)}{u'(x)}\cr
\textit{(Relative)}\quad \Gamma^R(x) & = -x\frac{u''(x)}{u'(x)}\cr
\end{align*}
$$

Not too much difference between these two notions. For two utilities $u_A,u_B$ $A$ is more risk-averse than $B$ if $\Gamma_A(x)   \geq   \Gamma_B(x) \quad \forall x$.

### Common Utility Forms that is Useful to Know

**CARA (Constant Absolute Risk Aversion):**

$$
u(x) = -e^{-ax}, \quad r^A(x) = a.
$$

**CRRA (Constant Relative Risk Aversion):**

$$
u(x) = \frac{x^{1-\delta}-1}{1-\delta}, \qquad r^R(x) = \delta.
$$

Special case: $\delta\to 1   \Rightarrow   u(x)=\ln(x)$.

----

## Comparative Concavity

> **Definition.** Given $f,g:\mathbb{R}\to\mathbb{R}$, say $f$ is *more concave* than $g$ if $\exists$ concave $h:\mathbb{R}\to\mathbb{R}$ s.t.  
> $$
> f(x) = h(g(x)).
> $$

**Theorem.** If $r_A^R(x) \geq r_B^R(x)$ $  \forall x$, then $u_A$ is more concave than $u_B$.
