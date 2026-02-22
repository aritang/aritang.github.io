---
title: "Probability Essentials from Booth PhD Math Camp"
date: 2025-09-10T21:57:33-05:00
draft: false
---

Today at Booth’s PhD math camp, we revisited some foundational concepts in probability theory. Two key topics stood out to me:

## Frequentist vs. Bayesian Perspectives

A crucial distinction lies in *what* we treat as random:

- **Frequentist**: Parameters (e.g., population mean $\mu$) are fixed, and randomness comes from the data.

    Example:
    $$
    P(X \mid \mu)
    $$
    We ask: *Given a true mean $\mu$, how likely is it to observe sample mean $X$?*

- **Bayesian**: Parameters are treated as random variables, and data informs beliefs.

    Example:
    $$
    P(\mu \mid X)
    $$
    We ask: *Given observed data $X$, what is the probability distribution of $\mu$?*

Both frameworks are reasonable, but realizing that these distinct pov exists help avoid confusion.

## Modes of Convergence

Probability theory distinguishes several types of convergence for random variables $\{X_n\}$ to $X$:

* **Convergence in distribution**:
    $$
    X_n \xrightarrow{d} X \quad \iff \quad F_{X_n}(x) \to F_X(x)
    $$

    The CDFs converge at continuity points of $F_X$.

* **Convergence in probability**:

    
    $$
    X_n \xrightarrow{P} X \quad \iff \quad  \forall \varepsilon > 0,\ P(|X_n - X| > \varepsilon) \to 0
    $$

    

    Intuitively, the probability of deviating from $X$ shrinks to zero.

* **Almost sure convergence**:
    $$
    X_n \xrightarrow{a.s.} X
    $$

    $$
    \Leftrightarrow
    $$

    
    $$
    \Pr[\lim_{n \to \infty} X_n = X] = 1
    $$

    

    Strongest form: for almost every outcome, the sequence eventually sticks to $X$.

Hierarchy:

$$
X_n \xrightarrow{a.s.} X \implies X_n \xrightarrow{P} X \implies X_n \xrightarrow{d} X
$$

---

A math professor who specializes in probability and stochastics once told me that "All it takes to learn math well is decent intelligence and excellent memory". Huh.
