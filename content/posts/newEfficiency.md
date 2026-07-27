---
title: "A new way to quantify inefficiency"
date: 2026-07-16T09:46:57-05:00
draft: false
---

The 36th Stony Brook game theory conference features the **New Perspectives on Algorithmic Game Theory Workshop**. One of the most anticipated talks is Professor Gonczarowski's "Quantifying Inefficiency,"

Here's my note:

### Setup

A *context* is a pair $C=\bigl(X,(\succsim_i)_{i=1}^{n}\bigr)$ where $X$ is a nonempty **finite** set of alternatives, $n\in\mathbb{N}$, and each $\succsim_i$ is a preference over $\Delta(X)$ satisfying the von Neumann–Morgenstern axioms (hence admitting an expected-utility representation $u_i$, unique up to positive affine transformation).

###### Can the vNM also encompasses risk aversion characterization?

The *Pareto frontier* $F_C\subseteq\Delta(X)$ is the set of $x\in\Delta(X)$ for which no $x'\in\Delta(X)$ satisfies $x'\succsim_i x$ for all $i$ with $x'\succ_i x$ for some $i$.

**Definition (social inefficiency function).** A social inefficiency function assigns to every context $C$ and every $x\in\Delta(X)$ a value $I(C,x)\in\mathbb{R}_{\ge 0}\cup\{\infty\}$.

## The function $\hat I$

Fix any vNM representations $u_1,\dots,u_n$. Let $u_i^{\max}=\max_{x\in F_C}u_i(x)$ and $u_i^{\min}=\min_{x\in F_C}u_i(x)$, and define

$$V(C,x)=\frac{1}{n}\sum_{i=1}^{n}\frac{u_i(x)-u_i^{\min}}{u_i^{\max}-u_i^{\min}},\qquad
\hat I(C,x)=\max_{x'\in X}V(C,x')-V(C,x).$$

<figure style="margin:2rem 0;padding:1.25rem 0.5rem 0.25rem;border:1px solid var(--border, #d9d5cc);border-radius:8px;background:var(--theme, transparent);">
<svg width="100%" viewBox="0 0 680 440" role="img" aria-label="Two-person normalized utility space with Pareto frontier, tangent iso-welfare line, and the inefficiency of x as the gap between parallel iso-welfare lines.">
<defs><marker id="rn-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<line x1="180" y1="380" x2="180" y2="100" stroke="#9b968a" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="3 4"/>
<line x1="500" y1="380" x2="500" y2="100" stroke="#9b968a" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="3 4"/>
<line x1="120" y1="320" x2="510" y2="320" stroke="#9b968a" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="3 4"/>
<line x1="120" y1="110" x2="510" y2="110" stroke="#9b968a" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="3 4"/>
<line x1="120" y1="380" x2="600" y2="380" stroke="#8a867c" stroke-width="1.2" marker-end="url(#rn-arr)"/>
<line x1="120" y1="380" x2="120" y2="50" stroke="#8a867c" stroke-width="1.2" marker-end="url(#rn-arr)"/>
<text x="615" y="384" font-size="13" fill="#8a867c">u₁</text>
<text x="100" y="60" font-size="13" fill="#8a867c" text-anchor="end">u₂</text>
<text x="180" y="402" font-size="12.5" fill="#8a867c" text-anchor="middle">u₁ min = 0</text>
<text x="500" y="402" font-size="12.5" fill="#8a867c" text-anchor="middle">u₁ max = 1</text>
<text x="108" y="114" font-size="12.5" fill="#8a867c" text-anchor="end">1</text>
<text x="108" y="324" font-size="12.5" fill="#8a867c" text-anchor="end">0</text>
<path d="M180 110 C 300 115, 430 180, 500 320" fill="none" stroke="#1d9e75" stroke-width="2.5"/>
<text x="505" y="230" font-size="12.5" fill="#1d9e75" font-style="italic">Pareto frontier</text>
<line x1="215" y1="71" x2="555" y2="294" stroke="#7f77dd" stroke-width="1" stroke-dasharray="4 4"/>
<line x1="215" y1="175" x2="525" y2="378" stroke="#7f77dd" stroke-width="1.5"/>
<text x="215" y="54" font-size="12.5" fill="#7f77dd" text-anchor="middle" font-style="italic">V max</text>
<text x="230" y="158" font-size="12.5" fill="#7f77dd" text-anchor="middle" font-style="italic">V at x</text>
<circle cx="358" cy="165" r="6" fill="#7f77dd"/>
<line x1="364" y1="158" x2="430" y2="92" stroke="#8a867c" stroke-width="0.6" stroke-dasharray="2 3"/>
<text x="436" y="88" font-size="12.5" fill="#7f77dd">best alternative (tangency)</text>
<circle cx="360" cy="270" r="6" fill="#d85a30"/>
<text x="343" y="281" font-size="14" font-weight="600" fill="#d85a30" text-anchor="end">x</text>
<line x1="545" y1="288" x2="497" y2="360" stroke="#d85a30" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#rn-arr)"/>
<text x="556" y="318" font-size="12.5" fill="#d85a30">inefficiency</text>
<text x="556" y="336" font-size="12.5" fill="#d85a30">of x</text>
</svg>
<figcaption style="font-size:0.85rem;opacity:0.75;padding:0.6rem 0.75rem 0.5rem;line-height:1.5;">
I(C,x) is the gap between the tangent line and the parallel line through x.
</figcaption>
</figure>

### Characterizations

Let $C^1\oplus C^2$ denotes the composition of two contexts on $X^1\times X^2$ with disjoint individuals, each caring only about the marginal on their own context.

**A1 — Pareto monotonicity.** If $x\succsim_i y$ for all $i$, then $I(C,x)\le I(C,y)$; if moreover $x\succ_i y$ for some $i$, then $I(C,x)<I(C,y)$, unless both are $\infty$ and some $w\in\Delta(X)$ with $w\succsim_i x$ for all $i$ has $I(C,w)<\infty$.

**A2 — Anonymity.** For any permutation $\pi$ of $\{1,\dots,n\}$: $I\bigl((X,(\succsim_{\pi(i)})_{i=1}^n),x\bigr)=I(C,x)$ for all $x\in\Delta(X)$.

**A3 — Expected inefficiency.** $I\bigl(C,\alpha x+(1-\alpha)y\bigr)=\alpha\, I(C,x)+(1-\alpha)\, I(C,y)$ for all $x,y\in\Delta(X)$, $\alpha\in[0,1]$.

**A4 — Independence of irrelevant alternatives.** Let $\emptyset\ne X'\subset X$ and $C'=\bigl(X',(\succsim_i|_{\Delta(X')})_{i=1}^n\bigr)$. If $C$ and $C'$ have the same ideal point ($\max_{\succsim_i}X'\sim_i\max_{\succsim_i}X$ for all $i$) and the same point of minimal expectations ($\min_{\succsim_i}F_{C'}\sim_i\min_{\succsim_i}F_C$ for all $i$), then $I(C',x)-I(C',y)=I(C,x)-I(C,y)$ for all $x,y\in\Delta(X')$. *(Both reference points are the endogenous ones of Roth, 1977.)*

**A5 — Independence of irrelevant preferences.** For contexts $D=\bigl(Y,(\succsim_i)_{i=1}^m\bigr)$ and $D'=\bigl(Y,(\succsim_i')_{i=1}^m\bigr)$ on the same alternatives and number of individuals: $I\bigl(C\oplus D,(x,y)\bigr)-I\bigl(C\oplus D,(x',y)\bigr)=I\bigl(C\oplus D',(x,y)\bigr)-I\bigl(C\oplus D',(x',y)\bigr)$ for all $x,x'\in\Delta(X)$, $y\in\Delta(Y)$.

**A6 — Population-size stability.** For every $k\in\mathbb{N}$: $I\bigl(\oplus_{j=1}^{k}C,(x,\dots,x)\bigr)-I\bigl(\oplus_{j=1}^{k}C,(x',\dots,x')\bigr)=I(C,x)-I(C,x')$ for all $x,x'\in\Delta(X)$.

**A7 — Feasibility.** For every context $C$ there exists $x\in\Delta(X)$ with $I(C,x)=0$.

###### NOTE: all contributions are by the OG author. All mistakes are mine.

> **Theorem 1.** A social inefficiency function $I$ satisfies A1–A7 if and only if there exists a constant $0<c<\infty$ such that $I(C,x)=c\cdot\hat I(C,x)$ for every context $C$ and every $x\in\Delta(X)$. Moreover, the seven axioms are logically independent: dropping any one of them invalidates the statement.

-------

Some thoughts:

The assumption that $X$ needs to be finite generalizes easily to compact $X$ with continuous preference (cause I think the only thing we need from the finiteness is that max and min over the frontier still exist). Axiom 3 is very strong because it imposes vNM style linearity: I(αx + (1−α)y) = αI(x) + (1−α)I(y). This along with vNM on $\Delta(X)$ jointly did a lot of heavy lifting.

This measure is not a replacement for PoA though. PoA is also measure free and only requires two points. This inefficiency measure captures more structure. It should be a pro when alternatives are finite and preference is ordinal. But for well-measured game like auctions PoA should still be a cleaner metric — for now.

