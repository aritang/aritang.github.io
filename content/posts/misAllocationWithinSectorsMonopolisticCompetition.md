---
title: "Macro Lecture Notes | Misallocation within sectors in monopolistic competition"
date: 2026-02-26T13:19:37-06:00
draft: false
---

Cross-country data reveals large total factor production (TFP) differences. This lecture asks: how does misallocation of inputs across heterogeneous firms affects measured sectoral TFP?

-----

### Define and Measure Wedge in Monopolistic Competition Market

Consider a market with final good producer, a continumm of intermediate good firms $i\in [0, 1]$, and households who supply labor inelastically at wage $W$ (taken as given by firms).

The final good producer's production function is $Y = \left( \int_0^1 Y_i^{\frac{\sigma-1}{\sigma}} \, \text{d}i \right)^{\frac{\sigma}{\sigma-1}}$. He maximizes $\max_{Y, \lbrace Y_i\rbrace}PY - \int P_i Y_i\,\text{di}$ take price as given. His maximization gives a demand function for each firm:
$$
Y_i = Y P_i^{-\sigma}, \forall i.
$$
Each intermediate firm $i$ has a wedge $\tau_i$ and chooses $(P_i, Y_i, L_i)$ to solve:
$$
\max_{P_i, Y_i, L_i} \; P_i Y_i - (1 + \tau_i) W L_i\\
\text{s.t.} \quad Y_i = Y P_i^{-\sigma}, \\
\qquad Y_i = A_i L_i.
$$
This is really just a single-variable unconstrained optimization. The FOC of firm $i$'s revenue maximization problem can be rearranged into the following form, and indicates that marginal revenue product of labor equals effective marginal cost (with wedge)
$$
\boxed{1 + \tau_i = \frac{\sigma-1}{\sigma} \cdot \frac1{W} \cdot\frac{P_i^\star Y_i^\star}{L_i^\star}}
$$
In the undistorted case ($\tau_i = 0$), this reduces to the standard markup condition $\frac{P_i Y_i}{W L_i} = \frac{\sigma}{\sigma-1}$.

Note that ideally we want $\sigma_i = 0$ for every firm, then the market is 'efficient'. Therefore, if we observe revenue = $P_i^\star Y_i^\star$ and employment $L_i^\star$, and assume some value for $\sigma$, we can measure $\hat \tau_i$ for each firm and see if the economy is efficient in this case.

### Total Factor Production Affected by Wedge

Intermediate firm's profit maximization problem solves optimal $(P_i^\star, Y_i^\star, L_i^\star)$ as a function of model primitives. So,
$$
\begin{aligned}
\text{TFP} & = \frac{Y}{L} = \frac{(\int (Y_i^\star)^{(\sigma - 1)/\sigma}\,\text{d}i)^{\sigma/(\sigma - 1)}}{L^\star}\\
& = \bar{A} \cdot \frac{\left( \int \left(\frac{1+\tau_i}{\overline{1+\tau}}\right)^{1-\sigma} \left(\frac{A_i}{\bar{A}}\right)^{\sigma-1} \text{d}i \right)^{\frac{\sigma}{\sigma-1}}}{\int \left(\frac{1+\tau_i}{\overline{1+\tau}}\right)^{-\sigma} \left(\frac{A_i}{\bar{A}}\right)^{\sigma-1} \text{d}i}
\end{aligned}
$$
$\bar A$: note that $\bar A$ can technically be constant scaler and don't change the expression. But let $\ln \bar A := \mathbb E[\ln A_i]$. Define $t_i := \ln(1+\tau_i) - \mathbb{E}[\ln(1+\tau_i)]$ (demeaned log wedge). We want to see how the distribution of $\tau_i$ affects TFP. Need a bit approximation:

> **Lemma.** If $\varepsilon_i$ is a zero-mean random variable, then to second order:
>
> $$\ln \mathbb{E}[e^{\varepsilon_i}] \approx \tfrac{1}{2} \text{var}(\varepsilon_i)$$
>
> *Proof.* Define $F(x) = \ln \mathbb{E}[e^{x \varepsilon_i}]$. Taylor expand around $x=0$: $F(0) = 0$, $F'(0) = \mathbb{E}[\varepsilon_i] = 0$, $F''(0) = \mathbb{E}[\varepsilon_i^2] = \text{var}(\varepsilon_i)$. Hence $F(1) \approx \tfrac{1}{2}\text{var}(\varepsilon_i)$. $\square$

Applying the approximation lemma:

$$\boxed{\ln \text{TFP}^{\text{dist}} \approx \bar{a} + \frac{1}{2}\sigma(\sigma-1)\,\text{var}(a_i - t_i) - \frac{1}{2}(\sigma-1)^2 \,\text{var}\!\left(a_i - \frac{\sigma}{\sigma-1} t_i\right)}$$

Special case — distortions independent of productivity ($t_i \perp a_i$):

$$\boxed{\ln \text{TFP}^{\text{dist}} \approx \underbrace{\bar{a} + \frac{\sigma-1}{2}\text{var}(a_i)}_{\text{undistorted TFP}} - \underbrace{\frac{\sigma}{2}\text{var}(t_i)}_{\text{TFP loss from misallocation}}}$$

TFP depends on the **variance** (dispersion) of distortions, not on their mean level. This is because the final good firm's CES aggregator disproportionately rewards high-productivity firms, and the efficient allocation channels more labor to them. Random (mean-zero, uncorrelated with $A_i$) distortions **reduce** TFP by $\frac{\sigma}{2}\text{var}(t_i)$. And if distortions are positively correlated with $a_i$ (i.e., high-productivity firms face higher wedges), the TFP loss is amplified further.

## Quantitative Results (Hsieh and Klenow, 2009)

**TFP gains from equalizing TFPR within industries (%, Table IV):**

| Country       | Period 1     | Period 2     | Period 3     |
| ------------- | ------------ | ------------ | ------------ |
| China         | 115.1 (1998) | 95.8 (2001)  | 86.6 (2005)  |
| India         | 100.4 (1987) | 102.1 (1991) | 127.5 (1994) |
| United States | 36.1 (1977)  | 30.7 (1987)  | 42.9 (1997)  |

**TFP gains relative to 1997 U.S. benchmark (%, Table VI):**

| Country | Period 1    | Period 2    | Period 3    |
| ------- | ----------- | ----------- | ----------- |
| China   | 50.5 (1998) | 37.0 (2001) | 30.5 (2005) |
| India   | 40.2 (1987) | 41.4 (1991) | 59.2 (1994) |

Even the U.S. has substantial misallocation (30–43% TFP gains from full equalization). China and India have far larger gains, implying that removing distortions could roughly double their manufacturing TFP. China's misallocation declined over 1998–2005, consistent with market-oriented reforms.
