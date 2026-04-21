---
title: "Dominance Hierarchy"
date: 2026-04-14T17:43:24-05:00
draft: false
---

Some sidenotes from price theory iii:

### Definitions

For distributions (pdf) $f_1(\cdot), f_2(\cdot)$:

- Monotone Likelihood Ratio (MLR): let ratio
    $$
    \phi(l) = \frac{f_1(l)}{f_2(l)}.
    $$
    $f_1$ dominate $f_2$ (in MLR sense) iff. $\phi(l)$ is weakly increasing in $l$.

    Intuition: Pointwise relative density shifts up
    
- Hazard Rate Dominance (HRD): define the hazard rate (aka conditional failure rate):
    $$
    h_{f_i}(l) = \frac{f_i(l)}{1 - F_i(l)} \quad i =1, 2.
    $$
    $f_1$ dominate $f_2$ (in HRD sense) iff. $h_{f_1}(l)\le h_{f_2}(l), \forall l$.

    Intuition: Conditional survival always higher
    
- First Order Stochastic Dominance (FOSD): define the cumulative distribution function: 
    $$
    F_i(l) = \int_{-\infty}^{l} f_i(t)\, \text{d}t \quad i = 1, 2.
    $$
    $f_1$ dominates $f_2$ (in FOSD sense) iff. $F_1(l) \leq F_2(l), \forall l$.

    Intuition: any non-decreasing utility prefers $f_1$.

- Second Order Stochastic Dominance (SOSD): define the second-order distribution function:
    $$
    F_i^{(2)}(l) = \int_{-\infty}^{l} F_i(t)\,  \text{d}t \quad i = 1, 2.
    $$
    $f_1$ dominates $f_2$ (in SOSD sense) iff. $F_1^{(2)}(l) \leq F_2^{(2)}(l),\forall l$.

    Intuition: Any non-decreasing **concave** utility prefers $f_1$.

- nth Order Stochastic Dominance: define the recursive distribution function:
    $$
    F_i^{(n)}(l) = \int_{-\infty}^{l} F_i^{(n-1)}(t)\,  \text{d}t \quad i = 1, 2,
    $$
    with base case $F_i^{(1)}(l) \equiv F_i(l)$.

    $f_1$ dominates $f_2$ (in nth-order SD sense) iff. $F_1^{(n)}(l) \leq F_2^{(n)}(l), \forall l$.

### Dominance hirgachy:

$$
\text{MLR} \implies \text{HRD} \implies \text{FOSD} \implies \text{SOSD}\implies \cdots \implies \text{nth-order SD}
$$

The idea is,

- **MLR** is a local, multiplicative condition on densities
- **HRD** weakens this to conditional tail behavior
- **FOSD** weakens further to cumulative mass comparisons
- **nth-order SD** progressively weakens by averaging/integrating, expanding the class of distributions that can be ranked
