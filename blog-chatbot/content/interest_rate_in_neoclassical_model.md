---
title: "When Your Eigenvalues Judge You"
date: 2025-11-16T17:40:41-06:00
draft: false
---

7 weeks into a quarter, I am now allergic to the word "interest rate" "saddle path" and "EIGENVALUES". 

This note presents a continuous-time neoclassical growth model, deriving household and firm optimality conditions, characterizing the steady state, and analyzing the resulting saddle-path dynamics. On top of which, per-household productivity $A$ is left out, which makes it extendable.

---

Consider continuous time model $t\in[0, \infty)$.

### (Representative) Household's Problem


$$
\begin{align}
\max_{\lbrace c_t, x_t, k_t\rbrace_{t\ge 0}}& \int_0^\infty e^{-\rho t}U(c_t)\thinspace\text{d}t\cr
\text{s.t.}& \ \dot k_t = x_t -\delta k_t, \forall t\cr
& \int_0^\infty p_t(c_t + x_t)\thinspace\text{d}t = \int_0^\infty p_t(w_t + v_tk_t)\thinspace\text{d}t \cr&\text{where, } p_t :=\exp{(-\int_0^\infty r_{\tau}\thinspace\text{d}\tau)}.
\end{align}
$$

Now, plug $(2)$ into $(3)$ and do intergration by part on horizon $[0, T]$, we obtain


$$
\int_0^T p_t\dot k_t \thinspace\text{d}t = [p_tk_t]_0^T - \int_0^T\dot p_tk_t\thinspace\text{d}t.
$$


Let $T\to \infty$ and impose **transversality condition** (aka no-Ponzi) $\lim_{T\to \infty}p_Tk_t =0 $. Naturally we can assume (or normalize) $p_0 = 1$. Note that $\dot p_t/p_t = -r_t$. So $(2)-(4)$ becomes
$$
\begin{equation}
\int_0^\infty p_tc_t\thinspace\text{d}t  - k_0 + \int_0^\infty(r_t + \delta - v_t)p_tk_t\thinspace\text{d}t = \int_0^\infty p_tw_t\thinspace\text{d}t.
\end{equation}
$$

Now in $(5)$, because the household can arbitrarily choose $k_t$, no-arbitrage requires
$$
\begin{equation}
r_t + \delta - v_t = 0.
\end{equation}
$$
(Otw they can earn infinite profit by tilting towards the more profitable asset). With this, the households' constraints $(5)$ further simplifies, and the household's problem $(1) - (4)$ now simplifies to
$$
\begin{equation}
\max_{\lbrace c_t\rbrace_{t\ge 0}}\int_0^\infty e^{-\rho t}U(c_t)\thinspace\text{d}t \quad  \text{s.t.} \quad \int_0^\infty p_tc_t\thinspace\text{d}t = \int_0^\infty p_tw_t\thinspace\text{d}t + k_0.
\end{equation}
$$
Note that there is only **one** static intergral constraint, no more differential equations. Now we take FOC of the household problem $(7)$ to characterize the optimal control $c_t$. First take the Lagrangian to $(7)$:
$$
\mathcal L =\int_0^\infty \left(e^{-\rho t} U(c_t) - \lambda p_tc_t\right)\thinspace\text{d}t + \lambda\left(\int_0^\infty p_tw_t\thinspace\text{d}t + k_0\right).
$$
Then we can obtain the FOC w.r.t. $c_t$ by:
$$
\frac{\partial {\mathcal L}}{\partial c_t}=e^{-\rho t} U'(c_t) - \lambda p_t = 0,
$$
take logarithm, then differentiate w.r.t. $t$, after a little algebra, we obtain
$$
\begin{equation}
\boxed{\dot c_t = -\frac{U'(c_t)}{U''(c_t)}(r_t - \rho)\quad \forall t.}
\end{equation}
$$

### (Competitive) Firm's Problem

Now, assume that there is one firm, invested by and producing for $N$ households in the economy. The firm's (aggregate) production function is:
$$
Y = F(Nk, NA)
$$
where $k$ is capital and $A$ is efficiency of labor (aka technology level). Assume that $F$ is **homogeneous of degree 1** (constant-return-to-scale **CRS** production function). In other words, $F(c NK, cNA ) = cF(NK, NA), \forall c > 0$. 

The firm then optimize over capital investments $\lbrace k_t\rbrace_{t\ge 0}$ at each time to maximize profit:


$$
\max_{\lbrace k_t\rbrace_{t\ge 0}}\int_0^\infty p_t[F(Nk_t, NA) -\underbrace{w_tNA}_\text{constant} - v_tNk_t]\thinspace\text{d}t.
$$


Two important observations (i) because there is no adjustment cost, the firm can optimize pointwise in time. (ii) we can without loss normalize $N=1$. Now, the firm's problem reduces to
$$
\begin{align}
& \max_{k_t, n_t}\ p_tf(k_t, A) -  v_t k_t, \quad \forall t\cr
\Rightarrow &\ f_k(k_t, A) = \underbrace{v_t = r_t + \delta}_\text{Equation $(6)$}, \quad \forall t && \text{(FOC)}
\end{align}
$$

### Aggregate System Dynamic and Steady State Property

From goods market clearing per effective worker, require that output = consumption + investment + depreciation, i.e.
$$
\begin{equation}
f(k_t, A) = c_t + x_t + \delta k_t
\end{equation}
$$
Plug $(2)$ into $(11)$, plug $(10)$ into $(8)$, light rearrangement, we obtain the following system dynamic:
$$
\begin{equation}
\begin{cases}
\dot k_t = f(k_t, A) -c_t -\delta k_t && [(2) + (11)]\cr
\dot c_t=-\frac{U'(c_t)}{U''(c_t)}(f_k(k_t, A) -\delta - \rho) && [(10) + (8)]
\end{cases}
\end{equation}
$$
With $(12)$ we can study the property of steady state $(\bar k, \bar c)$. Now, with a little abuse of notation, allow steady state be contingent with $A$. At steady state, $\dot k_t=\dot c_t = 0$. We then use $(12)$ to show that the ratio $\bar k(A)/\bar c(A)$ is constant:

> Because $f(\cdot, \cdot)$ is CRS, there exists a function $\phi(\cdot)$ such that
> $$
> f(k, A) = A\phi(\frac kA).
> $$
> Then, $f_k(k_t, A) = \phi'(\frac{k}A)$. So from $(12.2)$, letting $\dot c = 0$ determines the ratio betwee steady state $\bar k$ and $A$:
> $$
> \frac{\bar k(A)}{A} = (\phi')^{-1}(\delta + \rho) := \kappa.
> $$
> From $(12.1)$, letting $\dot k_t = 0$ and sub in $\bar k(A) = A\kappa$:
> $$
> f(\bar k(A), A) - \bar c(A) - \delta \bar k(A) = 0\Rightarrow \bar c(A) = (\phi(\kappa) - \delta \kappa)A.
> $$
> Which implies
> $$
> \frac{\bar c(A)}{\bar k(A)} = \frac{\phi(\kappa)}{\kappa} - \delta, \quad \forall A.
> $$

### Saddle Path

Fix $A$ as a constant parameter, an dformallly, consider the dynamic system:
$$
\begin{align*}
& \dot k = g(k,c) := f(k,A) - c - \delta k, \qquad\cr
& \dot c = h(k,c) := -\frac{U'(c)}{U''(c)}\big(f_k(k,A)-\delta-\rho\big).
\end{align*}
$$
This is a 2D system $\dot z = F(z)$, where $z = \begin{bmatrix}k\cr c\end{bmatrix}, F=\begin{pmatrix}g\cr h\end{pmatrix}$. A steady state $(\bar k, \bar c)$ solves $g(\bar k, \bar c) = 0, f(\bar k, \bar c) = 0$. Let the **Jacobian** at the steady state be


$$
\begin{equation}
\mathcal J := \nabla F= \begin{pmatrix}
g_k(\bar k,\bar c) & g_c(\bar k,\bar c)\cr
h_k(\bar k,\bar c) & h_c(\bar k,\bar c)
\end{pmatrix}=\begin{pmatrix}
\rho & -1\cr
-\frac{U'(\bar c)}{U''(\bar c)}f_{kk}(\bar k, A) & 0
\end{pmatrix}.
\end{equation}
$$


(Note: the 3nd equality above plugged in the steady state condition $g(\bar k, \bar c) = 0, f(\bar k, \bar c) = 0$ and did a *little* bit of algebra...) 

As $\mathcal J$ is 2x2, and because of its special structure, it has exactly one **s**table eigenvalue $\mu_s <0$ (and another **u**n**s**table $\mu_{us} >0$). Let $\begin{bmatrix}v_k^s\cr v_c^s\end{bmatrix}$ be the eigenvector associated with the stable eigenvalue $\mu_s$.


$$
\mathcal J 
=\begin{pmatrix}
\rho & -1\cr
-\frac{U'(\bar c)}{U''(\bar c)}f_{kk}(\bar k, A) & 0
\end{pmatrix}\Rightarrow \begin{cases}
\lambda_s = \frac{\rho - \sqrt{\rho^2 -4\frac{U'(\bar c)}{U''(\bar c)}f_{kk}(\bar k, A)}}{2}\cr
\frac{v_c^s}{v_k^s} = \rho - \lambda_s = \frac{\rho + \sqrt{\rho^2 + 4\big(-\frac{U'(\bar c)}{U''(\bar c)} f*{kk}(\bar k,A)\big)}}{2}.
\end{cases}
$$


Now, consider the manifold
$$
W^s(\bar z) = \lbrace z_0 : \text{solution } z(t;z_0) \to \bar z \text{ as } t\to \infty\rbrace.
$$
Because $\mathcal J$ has a pair of opposite sign eigenvectors, $(\bar k,\bar c)$ is a *saddle point*, and $W^s(\bar z) $ a *stable manifold* (saddle path). Now,

> The **Stable Manifold Theorem** from dynamical systems) says: If $\mathcal J$ has eigenvalues with strictly negative real parts (stable) and strictly positive real parts (unstable), then there exists a unique smooth stable manifold ($W^s(\bar z) $), tangent at $\bar z$ to the **stable eigenspace** of $\mathcal J$.

Therefore, on the Saddle path at the steady state:


$$
\frac{\text{d}c}{\text{d} k}{(\bar k, \bar c)}
= \frac{\rho + \sqrt{\rho^2 + 4\big(-\dfrac{U'(\bar c)}{U''(\bar c)} f_{kk}(\bar k,A)\big)}}{2}.
$$


Therefore, locally around the steady state, say a shock moves capital away from $\bar k$ to $k_0$, the consumption would jumps to


$$
c_0 = \bar c + \frac{\rho + \sqrt{\rho^2 + 4\big(-\dfrac{U'(\bar c)}{U''(\bar c)} f_{kk}(\bar k,A)\big)}}{2}(k_0 - \bar k)
$$


then gradually recovers back to steady state.
