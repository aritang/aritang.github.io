---
title: "Recursive Bayesian Regression | A Self-Contained Guide for Section 5.4 of Hansen & Sargent"
date: 2026-04-22T13:06:19-05:00
draft: false
---

## The VAR Model

We observe a vector time series $Z_1, Z_2, \ldots, Z_T \in \mathbb{R}^m$ following a VAR($\ell$):

$$
Z_{t+1} = \tilde {\mathbb N} + D \begin{pmatrix} Z_t \\ Z_{t-1} \\ \vdots \\ Z_{t-\ell+1} \end{pmatrix} + F\,W_{t+1}, \qquad W_{t+1} \sim \mathcal{N}(0, I_k). \tag{1}
$$

**Known:** the signals $Z_1, \ldots, Z_T$.

**Unknown:** the coefficient matrices $\tilde {\mathbb N}$, $D$, and the covariance $FF'$.

**Key idea.** Treat $(\tilde {\mathbb N}, D)$ as hidden states that never change, so the problem becomes an Hidden Markdov Model (HMM) with trivial state dynamics $\beta_{t+1} = \beta_t$ and a linear observation equation. We then update beliefs about $\beta$ recursively as data arrives.

#### Remark: From State Space (5.17) to VAR (5.18): Implicit Assumptions

The general linear state-space model (5.17) is:

$$
X_{t+1} = A X_t + B W_{t+1}, \tag{2}
$$

$$
Z_{t+1} = N + D X_t + F W_{t+1}. \tag{3}
$$

The VAR form (1) is a special case obtained by imposing three assumptions, which are left implicit in the OG lecture note:

- **Assumption 1: Exact identification ($F$ is square and nonsingular)**

    We require $\dim(Z_{t+1}) = \dim(W_{t+1}) = m$, and $F$ is $m \times m$ nonsingular. This means there are exactly as many structural shocks as observables. In principle, one could invert $F$ and recover $W_{t+1}$ from residuals. There are no redundant shocks and no missing ones.

- **Assumption 2: The state is stacked lagged observables**

    The hidden state $X_t$ is constructed from data:

    $$
    X_t = \begin{pmatrix} Z_t - N \\ Z_{t-1} - N \\ \vdots \\ Z_{t-\ell+1} - N \end{pmatrix} \in \mathbb{R}^{m\ell}.
    $$

    So $X_t$ is not genuinely hidden — it is just a stack of lagged observations (up to the unknown constant $N$). The only hidden quantities are the parameters $(\tilde {\mathbb N}, D, F)$ themselves. This is what reduces the filtering problem to a regression problem.

- **Assumption 3: $A$ is a companion matrix**

    The matrix $A$ is not a free parameter — it is the companion matrix determined by $D$:

    $$
    A = \begin{pmatrix} D_1 & D_2 & \cdots & D_\ell \\ I & 0 & \cdots & 0 \\ 0 & I & \cdots & 0 \\ \vdots & \vdots & & \vdots \\ 0 & 0 & \cdots & 0 \end{pmatrix}, \qquad B = \begin{pmatrix} F \\ 0 \\ \vdots \\ 0 \end{pmatrix},
    $$

    where $D = [D_1 \; D_2 \; \cdots \; D_\ell]$. Estimating $(\tilde {\mathbb N}, D, F)$ in the VAR is therefore equivalent to estimating $(A, B, D, F, N)$ in the state-space form — the companion structure imposes no loss of generality given Assumptions 1 and 2.

These three assumptions collapse the general HMM into a standard VAR. The "hidden state" language is used only because we treat the unknown parameters as invariant hidden states ($\beta_{t+1} = \beta_t$), not because the time-varying state $X_t$ is unobserved.

## Back to the model

The noise covariance $FF'$ is an $m \times m$ positive definite matrix. We factor it as:

$$
FF' = J\,\Delta\,J', \tag{4}
$$

where:

- $J$ is lower triangular with ones on the diagonal,
- $\Delta$ is diagonal with positive entries $(\delta_1, \ldots, \delta_m)$.

This is the $LDL'$ Cholesky decomposition of the covariance matrix.

**Purpose.** Left-multiply the entire system (1) by $J^{-1}$:

$$
J^{-1} Z_{t+1} = J^{-1} \tilde {\mathbb N} + J^{-1} D \begin{pmatrix} Z_t \\ \vdots \\ Z_{t-\ell+1} \end{pmatrix} + U_{t+1}, \qquad U_{t+1} = J^{-1} F\,W_{t+1}. \tag{5}
$$

Because $J^{-1}$ is also lower triangular with ones on the diagonal:

$$
\text{Cov}(U_{t+1}) = J^{-1}(J\,\Delta\,J')\,J'^{-1} = \Delta = \text{diag}(\delta_1, \ldots, \delta_m).
$$

**Consequence.** The $i$-th component of $U_{t+1}$ is uncorrelated with (and, by normality, independent of) all other components. The $i$-th equation in (5) is a scalar regression:

$$
Y^{(i)}_{t+1} = R^{(i)'}_{t+1}\,\beta^{(i)} + U^{(i)}_{t+1}, \qquad U^{(i)}_{t+1} \sim \mathcal{N}(0, \sigma^2_i), \tag{6}
$$

where:

- $Y^{(i)}_{t+1}$ is the $i$-th entry of $J^{-1} Z_{t+1}$ (left-hand side),

- $R^{(i)}_{t+1}$ contains a constant, the lagged $Z$'s, and the first $i-1$ entries of $Z_{t+1}$ (regressors):
    $$
    R^{(i)}_{t+1} = \Big[\underbrace{1}_{\text{constant}},\; \underbrace{Z'_t,\; Z'_{t-1},\; \ldots,\; Z'_{t-\ell+1}}_{\text{lagged observables}},\; \underbrace{Z^{(1)}_{t+1},\; \ldots,\; Z^{(i-1)}_{t+1}}_{\text{contemporaneous from earlier eqns}}\Big]'.
    $$

- $\beta^{(i)}$ stacks all unknown coefficients for equation $i$, it contains three groups of parameters:

    1. **Constant term:** the $i$-th entry of $J^{-1} \tilde {\mathbb N}$.
    2. **Lagged coefficients:** the $i$-th row of $J^{-1} D$.
    3. **Contemporaneous coefficients:** the off-diagonal entries in row $i$ of $J^{-1}$ itself (columns $1, \ldots, i-1$).

- $\sigma^2_i = \delta_i$ (the $i$-th diagonal entry of $\Delta$).

The system is **recursive**: equation 1 has no contemporaneous $Z$ on the right; equation 2 includes $Z^{(1)}_{t+1}$; equation $i$ includes $Z^{(1)}_{t+1}, \ldots, Z^{(i-1)}_{t+1}$. Each equation can be estimated independently.

## Construct Prior Hyperparameters

For each scalar equation (dropping the superscript $i$), we maintain a joint prior over $(\beta, \sigma^2)$. The conjugate prior has two parts:

- **Prior on $\beta$ given $\sigma^2$**
    $$
    \beta \mid \sigma^2 \sim \mathcal{N}\!\left(b_0,\; \sigma^2 \Lambda_0^{-1}\right).
    $$

    - $b_0 \in \mathbb{R}^p$: prior mean — your best initial guess of the coefficients.
    - $\Lambda_0 \in \mathbb{R}^{p \times p}$: prior precision matrix (inverse of prior covariance scaled by $\sigma^2$). Large $\Lambda_0$ means "confident prior"; $\Lambda_0 = 0$ means "I know nothing" (improper/diffuse prior).

    **Note:** The prior covariance of $\beta$ is $\sigma^2 \Lambda_0^{-1}$, so it scales with the noise variance. This coupling is what makes the conjugate family work — it is a Normal-Gamma prior.

- **Prior on the precision $\zeta = 1/\sigma^2$**
    $$
    \zeta \sim \text{Gamma}\!\left(\frac{c_0}{2},\; \frac{d_0}{2}\right), \qquad \text{i.e., density} \propto \zeta^{c_0/2}\,e^{-d_0\,\zeta/2}.
    $$

    - $c_0$: degrees of freedom — "how many pseudo-observations" the prior is worth.
    - $d_0$: scale — acts like a prior sum-of-squared residuals.

- **Diffuse (non-informative) prior**

    A common default:

    $$
    \Lambda_0 = 0, \qquad c_0 = -2, \qquad d_0 = 0.
    $$

    This means: uniform prior over $\beta$, and uniform prior over $\log \sigma^2$. Both are improper (do not integrate to unity). After enough data accumulates so that $\Lambda_t$ becomes nonsingular, the posterior becomes proper, and $b_t$ converges to the ordinary least squares estimate.

### The recursive regression algorithm

{{<figure align="center" width="100%" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/recursiveRegression.jpeg" caption="">}}

- $\Lambda_t$ accumulates $\sum_{\tau=1}^{t} R_\tau R'_\tau$ (the Gram matrix of regressors) plus the prior $\Lambda_0$. It is the sufficient statistic for estimation precision.
- $\Lambda_t b_t$ accumulates $\sum_{\tau=1}^{t} R_\tau Y_\tau$ plus $\Lambda_0 b_0$. Once $\Lambda_t$ is invertible, $b_t = \Lambda_t^{-1}(\Lambda_0 b_0 + \sum R_\tau Y_\tau)$ — the posterior mean of $\beta$. With diffuse prior ($\Lambda_0 = 0$), this is exactly the OLS estimate.
- $d_t$ tracks the residual sum of squares. The $d$ update formula keeps a running tally: add $Y^2_{t+1}$, subtract the change in the "explained" quadratic form.

Algorithm runtime and space:<br>**Time**: $O(p^2)$ per observation (rank-1 update to $\Lambda$), $O(Tp^2)$ total.<br>**Space:** $O(p^2)$ (store $\Lambda_t, b_t, c_t, d_t$ only).<br>Note that there is no matrix inversion *during* the recursion — only needed at the end to read off the posterior covariance.

## Full Pipeline

To estimate the original VAR:

1. **Pick a prior (or diffuse).** Set $(\Lambda_0, b_0, c_0, d_0)$ for each equation.
2. **Factor $FF' = J\,\Delta\,J'$** (Cholesky, or use the recursive structure of the equations to define $J$ implicitly).
3. **Transform:** left-multiply by $J^{-1}$ to get $m$ independent scalar regressions.
4. **Run the algorithm** above on each of the $m$ equations independently.
5. **Recover original parameters** (see Section 8).
6. **Enforce stability:** reject Monte Carlo draws for which $A$ has eigenvalues outside the unit circle. This conditions the posterior on stationarity.

After running the algorithm, we have posterior distributions for the transformed system. And we can map them back to the original parameterization.

### Recovery steps

Given posterior draws of $\beta^{(1)}, \ldots, \beta^{(m)}$ and $\sigma^2_1, \ldots, \sigma^2_m$:

1. **Reconstruct $J^{-1}$:** Read off the contemporaneous coefficients from each equation. $J^{-1}$ is lower triangular with ones on the diagonal; its $(i, j)$ entry for $j < i$ is the coefficient on $Z^{(j)}_{t+1}$ in equation $i$.
2. **Recover $J$:** Invert the lower-triangular matrix $J^{-1}$. This is $O(m^2)$.
3. **Recover $\tilde {\mathbb N}$ and $D$:**
$$\tilde {\mathbb N} = J \times (\text{vector of estimated constants}), \qquad D = J \times (\text{matrix of estimated lag coefficients}).$$
4. **Recover $FF'$:**
$$FF' = J\,\Delta\,J', \qquad \Delta = \text{diag}(\sigma^2_1, \ldots, \sigma^2_m).$$
This is identified. The matrix $F$ itself is not uniquely identified without further structural restrictions.
5. **Recover $N$:** From the definition $\tilde {\mathbb N} = N - D[N';\; N';\; \ldots;\; N']'$, solve for $N$:
$$N = (I - D_1 - D_2 - \cdots - D_\ell)^{-1}\,\tilde {\mathbb N},$$
provided $I - \sum_j D_j$ is nonsingular (guaranteed when $A$ is stable).
6. **Build the companion form:** $A$ is the companion matrix from $D$, and $B = [F;\; 0;\; \ldots;\; 0]$ for any valid $F$.

### So, about What is and isn't identified

| Object                 | Status          | Reason                                                    |
| ---------------------- | --------------- | --------------------------------------------------------- |
| $\tilde {\mathbb N}, D$               | Identified      | Regression coefficients                                   |
| $FF'$                  | Identified      | $= J\,\Delta\,J'$ from estimated quantities               |
| $F$ itself             | Not identified  | Any $F$ with $FF' = J\Delta J'$ gives the same likelihood |
| $J$ (lower triangular) | A normalization | Convenient, not economically motivated                    |

