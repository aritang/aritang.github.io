---
title: "Monopolistic Competition in General Equilibrium"
date: 2026-02-09T08:59:18-06:00
draft: false
---

I like this model. It's cute. Unrealistic, but cute.

### Environment:

- **Intermediate sector.** A unit measure of firms $i \in [0,1]$. Firm $i$ produces differentiated variety $Y_i$ with linear technology:
    $$
    Y_i = A_i L_i
    $$
    We assume $A_i\equiv A$ for now.

- **Final sector.** A competitive firm aggregates varieties via CES:
    $$
    Y = \left(\int_0^1 Y_i^{\frac{\sigma-1}{\sigma}}\, di\right)^{\frac{\sigma}{\sigma-1}}, \qquad \sigma > 1.
    $$

- **Consumer.** Representative agent with preferences:
    $$
    U = \frac{C^{1-\gamma}}{1-\gamma} - \frac{L^{1+\varphi}}{1+\varphi}.
    $$

---

## Equilibrium

Prices $(\{P_i\}_i, W, P)$ and allocations $(\{Y_i, \Pi_i, L_i\}_i, C, Y, L)$ such that:

**(i) Consumer** solves:
$$
\begin{align*}
& \max_{C,L}  \frac{C^{1-\gamma}}{1-\gamma} - \frac{L^{1+\varphi}}{1+\varphi} \cr
& \text{s.t.}  \quad PC = WL + \int_0^1 \Pi_i\, di
\end{align*}
$$
**(ii) Final good firm** takes $\{P_i\}_i, P$ as given and solves:
$$
\begin{align*}
& \max_{\{Y_i\}_i,\, Y} \; PY - \int_0^1 P_i Y_i\, di \cr
& \text{s.t.} \quad Y = \left(\int_0^1 Y_i^{\frac{\sigma-1}{\sigma}}\, di\right)^{\frac{\sigma}{\sigma-1}}
\end{align*}
$$
**(iii) Intermediate firm $i$** takes $W$ and a demand function $\mathcal{Y}_i(P_i, Y, P)$ as given and solves:
$$
\begin{align*}
& \max_{P_i, Y_i, L_i} \; P_i Y_i - W L_i \cr
& \text{s.t.} \quad Y_i = \mathcal{Y}_i(P_i, Y, P),\quad Y_i = A L_i
\end{align*}
$$
**(iv) Markets clear:**
$$
C = Y, \qquad \int_0^1 L_i\, di = L
$$
Price $P$ is numeraire-free; we eventually set $P=1$.

---

### Solving the Eqm.

- Final good firm's FOC yields a demand function for each firm $i$:
    $$
    Y_i = Y\left(\frac{P_i}{P}\right)^{-\sigma}, \forall i.
    $$

- Then for each intermediate firm, they price optimally according to the above demand curve 
    $$
    P_i = \frac{\sigma}{\sigma - 1}\frac{W}{A}.
    $$

- Consumer's FOC gives a labor-leisure substitution condition
    $$
    C^\gamma L^\varphi = \frac{W}{P}.
    $$

- Symmetric Eqm + Zero profit in the final sector (since it has CRS production) implies:
    $$
    P \equiv P_i \quad \forall\, i
    $$
    

### Equilibrium allocations

Combining $C^\gamma L^\varphi = W/P = W/P_i = \frac{\sigma-1}{\sigma}A$ with $C = Y = AL$ (market clearing + technology):

$$\boxed{C = \left(\frac{\sigma-1}{\sigma}\right)^{\!\frac{1}{\gamma+\varphi}} A^{\frac{1+\varphi}{\gamma+\varphi}}, \qquad L = C/A}$$

Real profits per intermediate firm:
$$\frac{\Pi_i}{P} = Y_i - \frac{W}{P}L_i = \frac{1}{\sigma}C$$

---

## Efficiency

Consider the planner's problem
$$
\begin{align*}
& \max_{C,L,\{Y_i,L_i\}_i}\; \frac{C^{1-\gamma}}{1-\gamma} - \frac{L^{1+\varphi}}{1+\varphi} \cr
& \text{s.t.}\quad C = \left(\int Y_i^{\frac{\sigma-1}{\sigma}} di\right)^{\frac{\sigma}{\sigma-1}},\cr
& \qquad Y_i = AL_i, \forall i.\; \int L_i\, di = L
\end{align*}
$$
By symmetry, the solution is:
$$C^* = A^{\frac{1+\varphi}{\gamma+\varphi}}, \qquad L^* = C^*/A$$

The equilibrium differs from the planner's solution by the factor $\left(\frac{\sigma-1}{\sigma}\right)^{1/(\gamma+\varphi)} < 1$. The monopolistic equilibrium **under-produces** relative to the efficient allocation.

---

## Optimal Policy

Introduce a labor income tax $\tau$ and lump-sum transfer $T$. The consumer's budget becomes:
$$PC = (1-\tau)WL + \int \Pi_i\, di + T, \qquad T = \tau WL$$

Modified FOC: $C^\gamma L^\varphi = (1-\tau)\frac{W}{P} = (1-\tau)\frac{\sigma-1}{\sigma}A$.

Setting $(1-\tau)\frac{\sigma-1}{\sigma} = 1$ yields:

$$\boxed{\tau^* = -\frac{1}{\sigma-1}}$$

The optimal policy is a **labor subsidy** ($\tau < 0$), financed by lump-sum taxation. It exactly offsets the markup distortion. Note $\tau^*$ is independent of $\varphi$; when $\varphi = \infty$ the subsidy is irrelevant since no labor reallocation occurs.

---

## Heterogeneous Firms ($A_i$ varies across $i$)

The markup is unchanged: $P_i = \frac{\sigma}{\sigma-1}\frac{W}{A_i}$. Cross-firm comparisons for $A_i > A_j$:

| Variable | Ratio |
|---|---|
| Prices | $P_i/P_j = A_j/A_i$ |
| Output | $Y_i/Y_j = (A_i/A_j)^\sigma$ |
| Employment | $L_i/L_j = (A_i/A_j)^{\sigma-1}$ |
| Revenue | $P_iY_i / P_jY_j = (A_i/A_j)^{\sigma-1}$ |
| Profits | $\Pi_i/\Pi_j = (A_i/A_j)^{\sigma-1}$ |

More productive firms charge lower prices, sell more, hire more, and earn higher profits.

### Price index

With heterogeneous $P_i$, the zero-profit condition in the final sector pins down the ideal **CES price index**:
$$P = \left(\int_0^1 P_i^{1-\sigma}\, di\right)^{\frac{1}{1-\sigma}}$$

This equals the marginal (= average) cost of the final good firm, since its technology is CRS. The efficiency and optimal-policy results carry over: $\tau^* = -1/(\sigma-1)$ restores the first best.

