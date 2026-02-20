---
title: "Cross-Country Income Differences is Because of What?"
date: 2026-02-17T12:50:35-06:00
draft: false
---

Another lecture note from macroeconomic class.

Question: why the log GDP per capita are widely different across countries and that they doesn't seem to converge?

{{<figure align="center" width="100%" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/logGDPdistribution.jpeg" caption="Estimates of the distribution of countries according to log GDP per capita (PPP-adjusted) in 1960, 1980 and 2000. Courtesy to Theory of Income II class.">}}

***Assuming Cobb-Douglas***, data analysis says that over 60% of cross-country income dispersion is attributable to TFP differences, not input differences. Countries are not poor simply because they lack capital or education — they are poor because they use their inputs far less productively. Technology/efficiency differences ($A$) of the production function are the dominant explanation.

----

## Misallocation Verification

Consider a static economy with two sectors $i\in \lbrace M, A\rbrace$ (agriculture and manufacturing) both with CRS Cobb-Douglas production function $Y_i =F_i(K_i, L_i) =  A_i K_i^{\alpha_i}L_i^{1 - \alpha_i}$. Consumers with convex utility function $U(c_M, c_A)$.  The the planner's problem:
$$
\begin{align*}
& \max_{\lbrace K_i, L_i, c_i\rbrace} U(c_M, c_A)\cr
& \text{s.t.}\quad  c_i = A_i K_i^{\alpha_i}L_i^{1 - \alpha_i}, \forall i\cr
& \qquad K_M + K_A = K,\cr
& \qquad L_M + L_A = L.
\end{align*}
$$
FOC implies
$$
\frac{{\partial U}/{\partial c_M}}{\partial U /\partial c_A}\cdot \frac{\partial F_M/\partial L_M}{\partial F_A/\partial L_A}=1 \tag{1}
$$
Consumer's optimization 
$$
\begin{align*}
& \max_{\lbrace c_i\rbrace} U(c_M, c_A)\cr
& \text{s.t.}\quad c_A p_A + c_M p_M \le B
\end{align*}
$$
implies
$$
\frac{{\partial U}/{\partial c_M}}{\partial U /\partial c_A} = \frac{p_M}{p_A}\tag{2}.
$$
The production functions' HD1 structure implies
$$
\frac{\partial F_M/\partial L_M}{\partial F_A/\partial L_A} = \frac{(1 - \alpha_M) Y_M/L_M}{(1 - \alpha_A) Y_A/L_A}.\tag{3}
$$
So [ (2) + (3) ] + (1) implies
$$
\frac{p_M Y_M/L_M}{p_AY_A/L_A} = \frac{1 - \alpha_A}{1 - \alpha_M}.\tag{4}
$$
$Y_i, p_i, L_i$ are production, price, labor ratio of each sector which can be get from data. 

### $\alpha_i$ can be get from the firm's problem:

$$
\begin{align*}
& \max_{K, L} \; AK^\alpha L^{1-\alpha} - rK - wL\cr
FOC \Rightarrow & \begin{cases}
\frac{\partial Y}{\partial K} = \alpha A K^{\alpha-1} L^{1-\alpha} = r\cr
\frac{\partial Y}{\partial L} = (1-\alpha) A K^{\alpha} L^{-\alpha} = w
\end{cases}
\end{align*}
$$

Some algebras on the FOC would yield that $\alpha$:

$${\frac{wL}{Y}} = 1 - \alpha \qquad \text{and} \qquad \underbrace{\frac{rK}{Y}}_{\text{capital share}} = \alpha$$

This is a special and convenient property of Cobb-Douglas that really, does not hold for any general production functions...

----

So from the data, we can verify IF an economy satisfies Cobb Douglas, if it's efficient.

