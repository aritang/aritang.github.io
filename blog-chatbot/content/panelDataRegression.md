---
title: "Fixed effect regression — WG/DID estimator and their cluster-robust variance"
date: 2026-02-18T09:33:33-06:00
draft: false
---

> In the early days of recording, the microphone could only cleanly capture a narrow frequency range. So engineers were like: *we'll just record what the microphone handles.* Fair enough. 
>
> Then the microphone got better. Then digital audio arrived. Then we could capture everything.
>
> But by then, scholars had already proven theoretically that music only contains those frequencies. The proof was very elegant. It won a Gramophone award. And to this day, grad students learn that a symphony is just a low-frequency hum with robust standard errors.

Well, but nevertheless you can still do a lot with double bass, bassons and tubas.

----

Consider the following panel data regression:
$$
y_{it} = x_{it}'\beta + \eta_i + \delta_t + v_{it}, \forall t.\tag{1}
$$
Assume strict exogeneity
$$
\text{Strict Exogeneity:}\quad \mathbb E[u_{it}\mid x_{i1}, \ldots, x_{iT}] = 0, \forall s, t.
$$
We observe $i\in [N]$ and multiple periods $t\in [T]$ of $\lbrace y_{it}, x_{it}\rbrace$. We don't observe $\eta_i, \delta_t$. We want to estimate $\beta$.

## Within Group (EG) estimator

Demean: let $\ddot y_{it} = y_{it} - \bar y_i - \bar y_t$ ($y_i = \sum_t y_{it}/T$ and vice versa for $\bar y_t$). Let $\ddot x_{it} = x_{it} - \bar x_i - \bar x_t$. Then according to $(1)$ we have
$$
\ddot y_{it} = \ddot x_{it}'\beta + \tilde v_{it}, \forall t.\tag{2}
$$
Where, $\tilde v_{it} = v_{it} - \bar v_i - \bar v_t$. Stack $(2)$ up in matrix form, let:
$$
\ddot y_i := \begin{bmatrix}
y_{i1}\\
\cdots\\
y_{iT}\\
\end{bmatrix}, \quad \ddot X_i := \begin{bmatrix}
x_{i1}'\\
\cdots\\
x_{iT}'\\
\end{bmatrix}\text{ ($T\times K$ matrix)}, \quad \ddot v_i := \begin{bmatrix}
\tilde v_{i1}\\
\cdots\\
\tilde v_{iT}\\
\end{bmatrix}
$$
$(2)$ becomes $\ddot y_i = \ddot X_i\beta + \ddot v_i.$ When we got to observe a lot of individual's panel data $i$, the within-group GLS estimator of $\beta$ is
$$
\hat \beta^{WG} = \frac{\frac1N\sum_{i\in [N]}\ddot X_i^T \ddot y_i}{(\frac 1N\sum_{i\in [N]} \ddot X_i^T\ddot X_i)} = \frac{\frac1N\sum_{i\in [N]}\ddot X_i^T (\ddot X_i\beta + \ddot v_i)}{(\frac 1N\sum_{i\in [N]} \ddot X_i^T\ddot X_i)} = \beta +  \frac{\frac1N\sum_{i\in [N]}\ddot X_i^T  \ddot v_i}{(\frac 1N\sum_{i\in [N]} \ddot X_i^T\ddot X_i)}
$$

(note: matrix on denominator means inversion).  From strict exogeneity we know that $\mathbb E[\hat \beta^{WG} ] = \beta$. By a standard CLT (independence across $i$, finite moments):

$$
\sqrt{N}(\hat{\beta}_{WG} - \beta) \xrightarrow{d} \mathcal{N}(0, \Sigma_{XX}^{-1}  \Sigma_{m}  \Sigma_{XX}^{-1})\tag{3}
$$

$$
\begin{aligned}
& \Sigma_{XX} = \text{plim }\frac{1}{N}\sum_{i=1}^N \ddot{X}_i'\ddot{X}_i\cr
& \Sigma_m = \text{plim } \frac{1}{N}\sum_{i=1}^N \ddot{X}_i' \ddot{v}_i \ddot{v}_i' \ddot{X}_i
\end{aligned}
$$


A note on correlation. Expand the "meat" variance for a single unit:
$$
\ddot{X}_i'\ddot{v}_i\ddot{v}_i'\ddot{X}_i = \left(\sum_{t=1}^T \ddot{x}_{it}\ddot{v}_{it}\right)\left(\sum_{s=1}^T \ddot{v}_{is}\ddot{x}_{is}'\right) = \sum_{t=1}^T\sum_{s=1}^T \ddot{x}_{it}\,\ddot{v}_{it}\ddot{v}_{is}\,\ddot{x}_{is}'
$$


This is a $K \times K$ matrix that contains **all** cross-products $\ddot{v}_{it}\ddot{v}_{is}$ for every pair $(t,s)$. The term $E[\ddot{v}_{it}\ddot{v}_{is} \mid X_i]$ are nonzero whenever $v_{it}$ and $v_{is}$ are correlated. In other words, when taking the expectation to obtain $\Sigma_m$, the outer product $\ddot{v}_i\ddot{v}_i'$ automatically "picks up" whatever dependence structure exists.

## Analgous analysis for the DiD estimator

For the TWFE model $y_{it} = x_{it}'\beta + \eta_i + \lambda_t + v_{it}$, the DiD estimator uses "double-demeaned" data: subtract both the unit mean and the time mean, then add back the grand mean:

$$
\tilde{x}_{it} = x_{it} - \bar{x}_i - \bar{x}_t + \bar{x}.
$$
The formula is identical in structure — just replace $\ddot{x}$ with $\tilde{x}$ everywhere:

$$
\widehat{V}_{cluster}(\hat{\beta}_{DID}) = \left(\sum_{i=1}^N \tilde{X}_i'\tilde{X}_i\right)^{-1} \left(\sum_{i=1}^N \tilde{X}_i'\hat{\tilde{v}}_i\hat{\tilde{v}}_i'\tilde{X}_i\right) \left(\sum_{i=1}^N \tilde{X}_i'\tilde{X}_i\right)^{-1}
$$
The logic is similar: independence across $i$ allow us to treat $\tilde{X}_i'\tilde{v}_i$ as i.i.d. draws, and the outer product of each unit's score vector absorbs all within-unit serial correlation.

