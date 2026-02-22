---
title: "Inequality in Neoclassical Growth Model with Capitalist and Workers under Balanced Growth"
date: 2026-01-17T23:26:04-06:00
draft: false
---

This is a problem from Theory of Income II problem sets. Courtesy to Elle Edmonds who worked out this problem with great clarity. All the contributions are hers and mistakes are mine.

> ## Inequality in the Neoclassical Growth Model
>
> For standard NGM: given CRS technology $F(K_t, X_t L_t)$ with capital accumulation $\dot{K}_t = I_t - \delta K_t$ and TFP growth $\dot{X}_t/X_t = g > 0$.
>
> **Agents:**
>
> - Measure $\pi_c$ of *capitalists*: endowed with $k_0$, no labor, rent capital competitively
> - Measure $\pi_w$ of *workers*: no initial wealth, each supplies $1/\pi_w$ units of labor inelastically
>
> **Preferences:** Both types maximize $\int_0^\infty e^{-\rho t} \ln C_{it}\, dt$, $ i \in \{c, w\}$.
>
> **Markets:** Complete asset markets (workers and capitalists trade freely).
>
> Questions:
>
> - Define a competitive equilibrium.
> - Show there exists $k_0^\star$ such that $k_0 = k_0^\star$ implies the economy is immediately on a balanced growth path.
> - On the BGP, characterize the ratio of aggregate wage income ($w_t L_t$) to aggregate rental income ($r_t K_t$). Does it change over time?
> - Is the assumption of complete markets (asset trade between types) essential for part (c)?
> - On the BGP, compare the interest rate $r_t - \delta$ to the growth rate of wages $\dot{w}_t/w_t$. Interpret in light of the claim that "$r > g$ implies rising inequality."

### Basic Setup: within the framework of NGM:
- Production: $C_t + I_t = F(K_t, X_t L_t)$, CRS and concave
- Capital: $\dot{K}_t = I_t - \delta K_t$
- Technology on labor: $X_t$ exogeneous and grows at rate $g$.
- Agents: $\pi_c$% capitalists + $\pi_w$% workers. Capitalists only supplies capital whereas workers only supply labor.
- Preferences structure for both type of agent:  $\int_0^\infty e^{-\rho t} \ln {C}_{it} \, \text d t,i \in \lbrace c,w\rbrace$, 

-----

## Competitive Equilibrium Conditions

**Capitalist's Problem:**
$$
\begin{align*}
&\max \int_0^\infty e^{-\rho t} \ln C_t^c \, dt \cr
&\text{s.t.} \quad C_t^c + I_t^c + S_t^c = r_t^k K_t^c + r_t^a A_t^c \cr
&\quad\quad \dot{A}_t^c = S_t^c \quad \text{(bond accumulation)} \cr
&\quad\quad \dot{K}_t^c = I_t^c - \delta K_t^c \quad \text{(capital accumulation)}
\end{align*}
$$

**Worker's Problem:**
$$
\begin{align*}
&\max \int_0^\infty e^{-\rho t} \ln C_t^w \, dt \cr
&\text{s.t.} \quad C_t^w + S_t^w = \frac{w_t}{\pi_w} + r_t^a A_t^w\cr
& \quad\quad \dot A_t^w = S_t^w
\end{align*}
$$

**Firm's Problem:**
$$
\begin{align*}
&\max_{L_t^d, K_t^d} F(K_t^d, X_t L_t^d) - w_t L_t^d - r_t^k K_t^d \cr
&\text{FOCs:} \quad F_L = \frac{w_t}{X_t}, \quad F_K = r_t^k
\end{align*}
$$

**Market Clearing:**
$$
\begin{align*}
\text{Labor:} && L_t^d &= \pi_w L_t^s = 1 \cr
\text{Capital:} && K_t^d &= \pi_c K_t^c = K_t \cr
\text{Bonds:} && \pi_w A_t^w + \pi_c A_t^c &= 0 \cr
\text{Goods:} && C_t + I_t &= F(K_t, X_t L_t)
\end{align*}
$$
where $C_t = \pi_c C_t^c + \pi_w C_t^w$ and $I_t = \pi_c I_t^c$.

---

## Existence of BGP

On BGP, all variables grow at constant rates; define $k_t \equiv K_t/X_t$ (it should be constant in BGP).

- From the capitalist's problem:
    $$
    \frac{\dot{C}_t^c}{C_t^c} = r_t^k - \rho - \delta = g \tag{1}
    $$

    > Note: The capitalist maximizes: $\int_0^\infty e^{-\rho t} \ln C_t^c \, dt$ subject to their wealth accumulation. With complete asset markets (ie bond trading is free and everyone faces the same interest rate $r^a_i$) we can consolidate capitalist's budget into a single wealth constraint. 
    >
    > Let $W_t^c = K_t^c + A_t^c$ be total wealth. The return on wealth is $r_t^a = r_t^k - \delta$ (no-arbitrage between bonds and capital). So for capitalists:
    > $$
    > \dot{W}_t^c = r_t^a W_t^c - C_t^c.
    > $$
    > The Euler Equation will implies $(1)$. (You can derive it from differentiating the HJB function or working on the Hamiltonian optimality condition)

- Firm FOC /w CRS implies $r_t^k = F_K(K_t, X_t) = F_K(k_t, 1) \equiv f'(k_t)$

- On BPG: $f'\left(\frac{K_0^*}{X_0}\right) = g + \rho + \delta$ (need to be constant)

### Trick for analyzing factor growth rate in BGP

Start with the capital accumulation equation, $\dot K_t = F(K_t, X_t L_t) - C_t - \delta K_t$, divide by $K_t$ on both sides
$$
\frac{\dot K_t}{K_t} = \frac{F(K_t, X_tL_t)}{K_t} - \frac{C_t}{K_t} - \delta
$$
For the LHS to be constant (which is what BGP requires), the RHS must be constant. Note that also, /w CRS $F$:
$$
\frac{F(K_t, X_tL_t)}{K_t} = F(1, \frac{X_tL_t}{K_t})
$$
So basically squint your eyes and you can tell which equals which. Eventually, since $F$ is CRS and concave, $f' > 0$ and decreasing in $k$ $\Rightarrow$ **unique $k_0^*$ exists**.

---

## Ratio of Wage to Rental Income on BGP

$$
\begin{align*}
\text{Wage income:} && w_t \cdot 1 &= w_t \cr
\text{Rental income:} && r_t^k K_t & \cr
\text{Ratio:} && \frac{w_t L_t}{r_t^k K_t} &= \frac{X_t F_L(\cdot)}{F_K(\cdot) K_t}
\end{align*}
$$

On BGP with $k_t = k^\star$ constant: 
$$
\displaystyle\frac{w_t}{r^k K_t} = \frac{w_0/X_0}{r^k k^\star} = \text{constant}
$$
Since $w_t$ and $K_t$ both grow at rate $g$: **ratio is constant on BGP**.

---

## Asset Trading is Necessary for BGP

Without asset markets ($A_t^c = A_t^w = 0$):
$$
\begin{align*}
\text{Workers:} && C_t^w &= w_t/\pi_w \quad \text{(hand-to-mouth)} \cr
\text{Capitalists:} && &\text{must self-finance all investment}
\end{align*}
$$

With complete markets: both agents face $r^a = r^k - \delta$, ensuring both Euler equations yield growth rate $g$.

---

## Interest Rate vs Wage Growth on BGP

$$
\begin{align*}
\text{Interest rate:} && r^k &= g + \rho + \delta \quad \text{(constant)} \cr
\text{Wage growth:} && \dot{w}_t/w_t &= g \cr
\text{Net return:} && r^A &= r^k - \delta = g + \rho \cr
\text{Comparison:} && r^A - g &= \rho > 0
\end{align*}
$$

So $r > g$ on BGP, but this does **not** imply increasing inequality because:
- Both wages and capital income grow at rate $g$
- The ratio of labor to capital income is constant
- $r > g$ reflects time preference $\rho$, required for transversality