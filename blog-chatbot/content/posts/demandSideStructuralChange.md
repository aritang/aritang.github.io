---
title: "Demand Side Driven Structural Change"
date: 2026-02-08T15:05:41-06:00
draft: false
---

Alchemist 101: don't create gold. Define what you created as gold.

### Motivation: find model to predict economic facts

- **Kaldor facts** —capital-output ratio and factor shares are roughly constant over time.

- **Kuznets facts** — the sectoral composition of employment and consumption shifts systematically: Agriculture (A) down, Manufacturing (M) stable, while Services (S) goes up.

Can a single neoclassical growth model deliver both sets of facts simultaneously? Yes, if we throw in the cauldron a non-homothetic preferences (Engel's law).

-----

## Model

Consider a model with three sectors: $i \in \{A, M, S\}$ (agriculture, manufacturing, services). Continuous time. Representative household. Competitive markets.

### Household:

$$
\begin{align*}
& \max_{\{c^A, c^M, c^S, K\}} \int_0^\infty e^{-\rho t} \frac{c(t)^{1-\sigma} - 1}{1-\sigma} \,dt\cr &\qquad  c(t) = \left(c^A(t) + \gamma^A\right)^{\eta^A} \left(c^M(t)\right)^{\eta^M} \left(c^S(t) + \gamma^S\right)^{\eta^S}\cr
& s.t. \ \sum_{i \in \{A,M,S\}} p^i(t)\, c^i(t) + \dot{K}(t) = w(t) + (r(t) - \delta)\, K(t).
\end{align*}
$$

**Parameters:**

- $\eta^i > 0$, $\sum_i \eta^i = 1$ — long-run expenditure weights.
- Non-zero $\gamma$'s generate non-homotheticity:
  - $\gamma^A < 0$ — agriculture is a necessity (subsistence offset, enters negatively)
  - $\gamma^S > 0$ — services are a luxury

Note that as $c^M \to \infty$, the $\gamma^i/c^M$ terms vanish and preferences become asymptotically homothetic with long-run shares $\{\eta^i\}$.

### Technology

Each sector $i \in \{A, M, S\}$ has a representative firm solving:
$$
\max_{K^i, L^i} \; p^i(t) B^i F\!\left(K^i(t),\, X(t) L^i(t)\right) - w(t) L^i(t) - r(t) K^i(t)
$$
where

- $F$ is the identical CRS (HD1) production function (uhh) across all sectors.
- $B^i > 0$ is sector-specific *total factor productivity (TFP)* level. Here we assume it's constant and given.
- $X(t)$ exogenous: $\dot{X}/X = g$.
- Capital goods are produced by sector $M$ only.

### Market Clearing:

$$K^A + K^M + K^S = K, \qquad L^A + L^M + L^S = \bar{L} = 1$$

$$c^A = Y^A, \quad c^S = Y^S, \quad c^M + I = Y^M, \quad \dot{K} = I - \delta K$$

Note: **Normalization:** $p^M(t) \equiv 1$ for all $t$.

-----

## Solving the model

> What we want:
>
> **Competitive equilibrium:** Given $K_0$, a collection of prices $\{p^A, p^S, w, r\}$ and quantities $\{c^i, Y^i, K^i, L^i, K\}$ such that (i) households optimize, (ii) firms optimize, (iii) all markets clear.
>
> **Focus:** Constant Growth Path (CGP) — an equilibrium in which the interest rate $r(t) = r$ is constant. This requires an appropriate choice of $K_0$.
>
> Particularly: replicate the Kaldor and Kuznet facts — since we're allowed to assume the number of subatomic particles in gold, what alchemist wants, the alchemist got it.

The market is competitive, so for each sector $i\in \lbrace S, A, M\rbrace$ with constant production function, we need the zero-profit condition to allow the market to have an equilibrium. From the firm FOCs:
$$
p^i B^i F_K(K^i, X L^i) = r, \qquad p^i B^i F_L(K^i, X L^i) X = w,\forall i\in \lbrace S, A, M\rbrace.
$$
Since $F_K, F_L$ are HD0, the ratio $r/w$ pins down a common effective capital-labor ratio:
$$
\frac{K^i(t)}{X(t) L^i(t)} = k(t) \quad \forall\, i
$$
Also, for each sector, $p^i B^i F_K(K^i, X L^i) = r$ and use the fact that $F_K$ is HD0, we get
$$
\frac{p^A}{p^M} = p^A = \frac{B^M}{B^A}, \qquad \frac{p^S}{p^M} = p^S = \frac{B^M}{B^S}.
$$

### Household FOCs

The full-package Hamiltonian of Household's optimization gives:

Intratemporal (or, from $\partial_{C_i} H(K, \vec C, \lambda) = 0, \forall i$):
$$
p^i (c^i + \gamma^i) = \eta^i \frac{c^{1-\sigma}}{\lambda}, \forall i.\tag{1}
$$
Denote $\tilde c^i = c^i + \gamma^i$. Take log and take derivative of $(1)$ yields:
$$
\frac{\dot{\tilde c^i}}{\tilde c^i} = (1 - \delta)\frac{\dot c}{c} - \frac{\dot \lambda}{\lambda}\tag{2}
$$
Note that $(1)$ also implies
$$
\frac{\tilde c^i}{\tilde c^j} = \frac{{\eta_i}/{p_i}}{{\eta_j}/{p_j}} = const\xRightarrow{?}\frac{\dot{\tilde c^i}}{\tilde c^i}=\frac{\dot{\tilde c^j}}{\tilde c^j}\tag{3}
$$
Another trick: take log of $c =\prod_i(\tilde c^i{})^{\eta_i}$, take log and take derivative:
$$
\frac{\dot c}{c} = \sum_i \eta_i\frac{\dot{\tilde c^i}}{\tilde c^i}.\tag{4}
$$
Plus another Hamiltonian condition that captures intertemporal optimality ($\dot \lambda = \rho \lambda - H_X$):
$$
\frac{\dot \lambda}{\lambda} = \rho - (r - \delta)\tag{5}
$$
(1) - (5) implies
$$
\frac{\dot{\tilde c^i}}{\tilde c^i} =\frac{\dot c}{c} = \rho - (r - \delta), \forall i.\tag{2}
$$
Note that since $\gamma^A < 0$ and $\gamma^S > 0$:
$$
\frac{\dot{c}^A}{c^A} < \frac{\dot{c}^M}{c^M} < \frac{\dot{c}^S}{c^S}.
$$
This is the structural change result: services consumption grows fastest, agriculture slowest. Since $c^i = Y^i$ for $i = A, S$, output shares reallocate from $A$ to $S$.

------

### Condition for Constant Growth Path

We need additional conditions to ensure that the system is in constant growth path. Using capital constraint, HD1 of the production and equal $k = K/XL$ across sectors:
$$
p^A c^A + p^Mc^M + p^S c^S + \dot{K} = B^M F(K, X\bar{L}) - \delta K
$$
On a CGP, $\dot{K}/K = g$. The RHS grows at rate $g$. The LHS contains three terms $p^A(c^A + \gamma^A)$, $c^M$, $p^S(c^S + \gamma^S)$, all growing at rate $g$, plus a constant term $-(p^A \gamma^A + p^S \gamma^S)$.

By Uzawa-type logic, balanced growth requires the constant term to vanish. So a necessary and sufficient condition for CGP existence is

$$
\boxed{p^A \gamma^A + p^S \gamma^S = 0 \quad \Longleftrightarrow \quad \frac{\gamma^A}{B^A} + \frac{\gamma^S}{B^S} = 0}
$$
On the CGP, $k(t) = k$ (constant), and:

$$
\frac{\dot{c}^A}{c^A} = g \cdot \frac{c^A + \gamma^A}{c^A}, \qquad \frac{\dot{c}^M}{c^M} = g, \qquad \frac{\dot{c}^S}{c^S} = g \cdot \frac{c^S + \gamma^S}{c^S}\tag{6}
$$


- Services: growth rate starts **above** $g$ (since $\gamma^S > 0$) and converges to $g$.
- Agriculture: growth rate starts **below** $g$ (since $\gamma^A < 0$) and converges to $g$.
- Manufacturing: grows at exactly $g$ throughout.

### Labor reallocation

From production function, since $c^i = X L^i B^i F(k,1)$ for $i \in \{A, S\}$:
$$
\frac{\dot{c}^i}{c^i} = g + \frac{\dot{L}^i}{L^i}.
$$
Plug in (6), note that $L^A + L^M + L^S = \bar{L} = 1$, we get
$$
\frac{\dot{L}^M}{L^M} = 0, \qquad \frac{\dot{L}^A}{L^A} < 0, \qquad \frac{\dot{L}^S}{L^S} > 0.
$$
Labor flows out of agriculture and into services; manufacturing employment is stable. Both $\dot{L}^A/L^A$ and $\dot{L}^S/L^S$ converge to zero as $t \to \infty$.
