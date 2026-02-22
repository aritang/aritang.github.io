---
title: "Booth Econ Camp Class Note Part I"
date: 2025-09-23T20:29:48-05:00
draft: false
---

Before we begin, it's helpful to have this framework in mind:
$$
\text{Utility Functions }u(\cdot) \Leftrightarrow\text{Preferences } a \succeq b \Leftrightarrow\text{Choices (aka Data) }(\beta, C)
$$
Economists care about how to make the above concepts consistent (i.e. under what assumptions would the above $\Leftrightarrow$ hold mathematically).

## Choices and Choice Structures

Given a finite set of mutually exclusive alternatives $X$:

> **Definition.** A **choice structure** is a pair $(\beta, C)$ with 
> 1. $\beta \subseteq \mathcal{P}(X)$ a family of budget sets,  
> 2. $C : \beta \Rightarrow X$ a choice correspondence such that $C(B) \subseteq B$ for all $B \in \beta$.
>

**Example.**  
$X=\lbrace a,b,c\rbrace $,  
$\beta=\lbrace \lbrace a,b\rbrace ,\lbrace a,b,c\rbrace \rbrace $,  
$C(\lbrace a,b\rbrace )=\lbrace a\rbrace , \; C(\lbrace a,b,c\rbrace )=\lbrace a,c\rbrace $.

---

## Weak Axiom of Revealed Preference (WARP)

> **Definition.** A choice structure satisfies **WARP** if:
>
> If $x \in C(B)$ and $y \in B$ for some $B \in \beta$, then for any $B' \in \beta$ with $x,y \in B'$, whenever $y \in C(B')$ it must be that $x \in C(B')$.

**Observation.** If $(\beta',C')$ satisfies WARP and $\beta \subseteq \beta'$ with $C(B)=C'(B)$ for all $B \in \beta$, then $(\beta,C)$ also satisfies WARP.

**Example.** If $\beta$ contains only sets of size $\leq 2$, then $(\beta,C)$ necessarily satisfies WARP.

**Empirical Violations**: for example *Choice Overload*. 
$X=\lbrace \varnothing,a,b,\dots,z\rbrace $.  
If $C(\lbrace \varnothing,a,b,c\rbrace )=\lbrace a\rbrace $ but $C(X)=\lbrace \varnothing\rbrace $, then WARP fails.

---

## Preferences and Utility

> **Definition.** A preference relation $\succeq$ on $X$ is *rational* if  
> 1. Complete: $\forall x,y$, $x \succeq y$ or $y \succeq x$,  
> 2. Transitive: if $x \succeq y, \; y \succeq z$ then $x \succeq z$.
>
> From $\succeq$ we derive strict ($\succ$) and indifference ($\sim$).

**Utility Functions.** A function $u:X\to \mathbb{R}$ represents $\succeq$ if $x\succeq y \iff u(x)\geq u(y)$.  

*Proposition 1.* If $u$ represents $\succeq$ and $f:\mathbb{R}\to\mathbb{R}$ is strictly increasing, then $v=f\circ u$ also represents $\succeq$.  

*Proposition 2.* If some $u$ represents $\succeq$, then $\succeq$ is rational.

---

## Rationalization

> **Definition.** A rational preference $\succeq$ **rationalizes** $(\beta,C)$ if it generates a choice correspondence $C_\succeq$ on all subsets of $X$ such that $C(B)=C_\succeq(B)$ for all $B \in \beta$.

**Proposition.** If $(\beta,C)$ satisfies WARP and contains all subsets of $X$ of size $\leq 3$, then it is rationalizable.

---

## Walrasian Demand

**Environment**: set of alternatives $X=\mathbb{R}^L_{\geq 0}$, price vector $p\in \mathbb{R}^L_{\geq 0}$, wealth $w\geq 0$.  

**Budget set.** $B_{p,w}=\lbrace x\in X \mid p\cdot x\leq w\rbrace $.

**Demand.** $x(p,w)=C(B_{p,w})$, with assumptions:  

1. Homogeneity of degree 0,  
2. Single-valuedness,  
3. Walras’ Law: $p\cdot x(p,w)=w$.

**WARP for demand.**  
$x(\cdot,\cdot)$ satisfies WARP iff:  
if $p\cdot x(p',w') \leq w$ and $x(p,w)\neq x(p',w')$, then $p'\cdot x(p,w) > w'$.

> **Law of Compensated Demand.**  
> Equivalent condition: with $w' = p'\cdot x(p,w)$,  
>$$
> (p'-p)\cdot (x(p',w')-x(p,w)) \leq 0,
> $$
> 
>strict if $x(p',w')\neq x(p,w)$.

---

## The Slutsky Matrix (I)

Assume differentiability. Define

$$
S_{ij}(p,w)=\frac{\partial x_i}{\partial p_j}(p,w) + \frac{\partial x_i}{\partial w}(p,w)\,x_j(p,w).
$$

Collect to $S(p,w)=[S_{ij}]$.  

> **Theorem.** $x(\cdot,\cdot)$ satisfies WARP $\iff$ $S(p,w)$ is negative semidefinite $\forall(p,w)$.

---

## Counter Example: Rational Preference that *Cannot* be represented by a utility function:

**Definition.** *Lexicographic Preferences.* On $\mathbb{R}^2$, $(x_1,x_2)\succeq_L(y_1,y_2)$ iff $x_1>y_1$ or ($x_1=y_1$ and $x_2\geq y_2$). 

> **Claim.** For *Lexicographic Preferences*, There exists no $$u : X \to \mathbb{R} \;\; \text{s.t. } u(x) \geq u(y) \iff x \succeq_L y.$$

Proof Towards contradiction, suppose $u$ represents $\succeq_L$.  Given any $x_1 \in \mathbb{R},$ there exists a rational number: (use density of rational number)

$$
r(x_1) \in \mathbb{Q}\quad \text{s.t. } u(x_1, 1) < r(x_1) < u(x_1, 2).
$$
For any $x_1 < x_1'$, $u(x_1, 2) < u(x_1', 1).$ So take $r(x_1')$ similarly.
$$
r(x_1) < u(x_1, 2) < u(x_1', 1) < r(x_1').
$$
Thus $r(x_1) \neq r(x_1')$. This implies $r : \mathbb{R} \to \mathbb{Q}$  is **injective**. This would imply $|\mathbb{Q}| \geq |\mathbb{R}|$, a contradiction. 

---

## Continuity and Representation

*Contour sets:* $\succeq(x)=\lbrace y\mid y\succeq x\rbrace $, $\preceq(x)=\lbrace y\mid x\succeq y\rbrace $. 

> **Definition.** $\succeq$ is continuous if these sets are closed for each $x$.

> **Theorem.** If $\succeq$ is rational and continuous, there exists a continuous utility $u$ representing it.

---

## Scaling and Canonical Representation

Fix $e\in \mathbb{R}^L_+$. For $x\in X$, define

$$
\Delta_B=\lbrace \lambda\geq 0\mid \lambda e\succeq x\rbrace ,\quad 
\Delta_W=\lbrace \lambda\geq 0\mid x\succeq \lambda e\rbrace .
$$

By completeness, $\Delta_B\cup \Delta_W=\mathbb{R}_{\geq 0}$; by monotonicity and continuity, both are closed intervals. So $\Delta_B=[\bar\lambda,\infty)$, $\Delta_W=[0,\bar\lambda]$.  

Thus each $x$ has a unique $\bar\lambda(x)$ such that $x\sim \bar\lambda e$.  
This defines $\lambda:X\to \mathbb{R}$ with $x\mapsto\bar\lambda(x)$, a canonical (continuous, monotone) utility.

**Remarks.**  
* Not every representing $u$ must be continuous.  
* If $\succeq$ is monotone, every representing $u$ is monotone.  

---

## Convexity of Utility Function

**Definition.** $\succeq$ is convex if whenever $y\succeq x$ and $z\succeq x$, then all convex combinations $\theta y+(1-\theta)z\succeq x$.  

**Definition.** $u$ is quasi-concave if $u(\theta x+(1-\theta)y)\geq \min\lbrace u(x),u(y)\rbrace $.  

**Claim.** If $\succeq$ is convex, any $u$ representing it is quasi-concave.

----

## Utility Maximization

$$
X(p,w) \equiv \arg\max_{x \in B_{p,w}} u(x), 
\qquad 
V(p,w) \equiv \max_{x \in B_{p,w}} u(x)
$$

Here $V$ is the **indirect utility function**. By construction,  

$$
V(p,w) = u(X(p,w)).
$$

**Propositions.**

1. $V$ is continuous,  
2. $V$ is homogeneous of degree $0$,  
3. $V$ is strictly increasing in $w$ and weakly decreasing in $p$,  
4. $V$ is quasi-convex in $p$.  

---

## The Expenditure Function and Hicksian demand:

$$
\begin{align*}
& e(p,u_0) \equiv \min_{x} \{ p \cdot x \mid u(x) \geq u_0 \},
\cr
& h(p,u_0) \equiv \arg\min_{x} \{ p \cdot x \mid u(x) \geq u_0 \}.
\end{align*}
$$

$h$ = Hicksian demand, $e$ = expenditure. Properties of $e$:

1. Continuous,  
2. Homogeneous of degree $1$ in $p$,  
3. Strictly increasing in $u$, weakly increasing in $p$,  
4. Concave in $p$.

---

## Duality:

The neat equalities tying everything we've defined before: (I think here we need to assume some convexity in the underlying utility function)
$$
e(p, V(p,w)) = w, 
\qquad 
V(p, e(p,u_0)) = u_0
$$

$$
X(p,w) = h(p, V(p,w)), 
\qquad 
h(p,u) = X(p, e(p,u)).
$$

---

## Shephard’s Lemma

Use envelope theorem: (Shephard’s Lemma)
$$
\frac{\partial e(p,u)}{\partial p_i} = h_i(p,u).
$$

Thus, Shephard's Lemma implies
$$
\frac{\partial h_i(p,u)}{\partial p_j} 
= \frac{\partial^2 e(p,u)}{\partial p_i \partial p_j}.
$$

Which says, Hicksian demands equal the gradient of $e$, and their derivatives are the Hessian of $e$.

---

## The Slutsky Matrix from Hicksian Demand Function

By chain rule:


$$
\frac{\partial h_i(p,u)}{\partial p_j} = \frac{\partial x_i(p,w)}{\partial p_j}  + \frac{\partial x_i(p,w)}{\partial w}\,x_j(p,w).
$$



Thus the Slutsky Matrix is also equivalent to
$$
S_{ij}(p,w) 
= \frac{\partial h_i(p,V(p,w))}{\partial p_j}.
$$

---

## Special Utility Structures to Keep in Mind:

### Quasi-linear Utility

> **Definition.** Preferences are **quasi-linear** if they can be represented by a utility function of the form  
> $$
> U(x_0,x_1,\dots,x_L)  =  x_0 + \hat U(x_1,\dots,x_L).
> $$

### Homothetic Preferences

> **Definition.** Preferences are **homothetic** if they can be represented by a utility function that is homogeneous of degree 1.

Equivalently: $u(x)$ represents homothetic preferences $\iff \exists$ strictly increasing $f$ such that $f(u(x))$ is homogeneous of degree 1.

**Property.** If preferences are homothetic, then Marshallian demand satisfies  
$$
X(p,w) = \hat X(p) w.
$$

**Example.**  
$U(x) = \sum_{l=1}^L \beta_l \ln(x_l)$ with $\sum \beta_l = 1$.  
Equivalent form: $\hat U(x)=x_1^{\beta_1}\cdots x_L^{\beta_L}$ (Cobb–Douglas).  
Then $U(\lambda x)=U(x)+\ln \lambda$ and $\hat U(\lambda x)=\lambda \hat U(x)$.


### Discounted Utility

$X =$ streams of consumption.  Let $\vec c = (c_0,c_1,\dots,c_T) \in X$.

> **Definition.** Discounted utility representation:  
> $$
> U(\vec c) = \sum_{t=0}^T \delta^t u(c_t).
> $$

The $\delta$ represents trade-off between $c_t$ and $c_{t'}$: (MU := Marginal Rate of Substitution across time)
$$
\frac{MU_t}{MU_{t'}} = \frac{\delta^t}{\delta^{t'}} \cdot \frac{u'(c_t)}{u'(c_{t'})}.
$$
