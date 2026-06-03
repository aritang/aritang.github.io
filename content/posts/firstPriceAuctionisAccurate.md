---
title: "Talk Notes | Auctions as Experiments, by Professor Iijima"
date: 2026-05-06T21:43:23-05:00
draft: false
---

Professor Ryota Iijima came over to give a talk of his recent work ***Auctions as Experiments***. Great paper. Great insights. You can find the full paper at [Professor Ryota's Google Site](https://sites.google.com/site/ryotaiijimaecon/papers). Here are some notes jotted down during the talk, along with some thoughts from discussions with fellow phd students:

----

## Setup

- $n$ buyers, one indivisible good, quasi-linear preferences.
- Values $v_i \stackrel{iid}{\sim} F_\theta$ given state $\theta \in \Theta \subseteq \mathbb{R}$, prior $q_0$.
- $(F_\theta)$ has **MLRP in $\theta$**; each $F_\theta$ has continuous, strictly positive density on a compact $I_\theta$.
- **Information asymmetry.** Buyers observe $(\theta, v_i)$. The decision-maker (DM) observes only the $n$ realized bids.
- Canonical interpretation: $v_i = u(\theta, \varepsilon_i)$ — $\theta$ is a common-value component, $\varepsilon_i$ idiosyncratic.

### Class of auctions ("standard auctions")

- Sealed bids $b_i$, ranked $b^{(1)} \ge \dots \ge b^{(n)}$; highest wins.
- Payment functions $\psi = (\psi_\ell)_{\ell=1}^n$, increasing and symmetric in bids; $\psi_\ell = 0$ when $b^{(\ell)} = 0$.
- Examples: $k$-th price ($\psi_1 = b^{(k)}$, others $0$); all-pay ($\psi_\ell = b^{(\ell)}$); own-pay-$\alpha$ ($\psi_\ell = \alpha_\ell b^{(\ell)}$).
- Restrict to symmetric, monotone equilibria $b_\theta^\psi$. Bid CDF: $G_\theta^\psi(b) = F_\theta((b_\theta^\psi)^{-1}(b))$.
- All standard auctions are **revenue-equivalent at each $\theta$** (private values, i.i.d.).

Remak: why does the auction format matter? If buyers observed only $v_i$ (not $\theta$), all formats would be informationally equivalent — DM could invert the bidding function and back out $v_i$. Knowing $\theta$ is what creates the **competition effect**: at fixed $v$, the equilibrium bid $b_\theta(v)$ shifts with $\theta$ in a way that depends on $\psi$. This is the channel of differential informativeness.

> **Definition**. (Lehmann Accuracy Order) $G$ is more *accurate* than $\hat{G}$ iff for all $\theta > \theta'$ and $b \in \mathbb{R}_+$:
> $$
> G_\theta^{-1}\big(\hat G_\theta(b)\big) \;\ge\; G_{\theta'}^{-1}\big(\hat G_{\theta'}(b)\big).
> $$
>

###### Note: Lehmann is weaker than Blackwell, more accurate $\Rightarrow$ higher payoff in any **monotone decision problem**.

> **Lemma 1.** $G$ is more accurate than $\hat G$ iff for all $\theta > \theta'$, $b$:
> $$
> b_\theta\big(\hat b_\theta^{-1}(b)\big) \;\ge\; b_{\theta'}\big(\hat b_{\theta'}^{-1}(b)\big).
> $$

Lemma 1 seems to be the workhorse of the paper. It's a decomposition of $\partial G_\theta / \partial \theta$:

1. *Direct effect.* $F_\theta$ shifts up — same across all formats.
2. *Competition effect.* At fixed $v$, $b_\theta(v)$ moves with $\theta$. Sign and magnitude depend on $\psi$.

And Lemma 1 reduces "more accurate" (in the Lehman sense) to "more positive competition effect."

---

Then Professor Iijima gave some examples of canonical cases comparison, which corresponds to Proposition 1 of the paper.


| Format | Bidding fn $b_\theta(v)$ | $\partial b_\theta(v) / \partial \theta$ |
|---|---|---|
| 1st-price | $\mathbb{E}_\theta[v^{(2)} \mid v^{(1)} = v]$ | **$+$** (by MLRP) |
| 2nd-price | $v$ | $0$ |
| All-pay | $b_\theta^{1st}(v) \cdot F_\theta^{n-1}(v)$ | ambiguous (shading factor ↓ in $\theta$) |

⇒ $G^{1st} \succ G^{2nd} \succ G^{3rd}$ and $G^{1st} \succ G^{all}$.

----

### Theorem 1 (Main Result)

> For any standard auction $\psi$ such that $(G_\theta^\psi)$ satisfies MLRP, $G^{1st}$ is more accurate than $G^\psi$.

It's very cool (and quite strong). Professor Iijima managed to cover the proof during the talk. The proof is very elegant and interesting (and quite impresssive presented) in itself,

Extra results about sub-rankings within the subclasses:

- **$k$-th price family**. $G^{kth} \succ G^{(k+1)th}$ for $k = 1,\dots,n-1$ (Proposition 2). Proof uses the recursion $b_\theta^{kth}(v) = \mathbb{E}_\theta[b_\theta^{(k+1)th}(v^{(k+1)}) \mid v^{(k)} = v]$. So $G^{nth}$ is least accurate within the family.
- **Own-pay family ( $\psi_\ell = \alpha_\ell b^{(\ell)}$)**. $G^\alpha \succ G^{\alpha'}$ whenever $\alpha'_j \alpha_i \ge \alpha'_i \alpha_j$ for all $i < j$ — i.e., $\alpha$ tilts weight toward higher-ranked bidders relative to $\alpha'$. The loser-pay auction ($\alpha_n = 1$, others $0$) is least accurate within this class.

----

Some more results about payoff implications:

> **Monotone decision problem (Karlin–Rubin).** $u(a,\theta)$ single-peaked in $a$ with maximizer $a^*(\theta)$ increasing in $\theta$.
>
> **Corollary 1.** Across all monotone decision problems, more accurate auctions yield higher expected payoffs (provided the dominated experiment has MLRP). Hence 1st-price is payoff-dominant.

Even more results: Ryota gave two examples: prediction problem and reserve-price choices. Under reasonable framing 1st-price auction is more informative and helpful in these decision problems when $F_\theta$ is to-be-learnt at starter. Additional extensions includes interdependent values, imperfect state observation (public $\xi$ + private $v_i$), correlated values and multi-unit auctions.

-----

### Takeaways from coffee discussion:

Headline assessment: *great* theory insight.

**Core mechanism (what the paper is really about)**

- Different auction formats generate different amounts of information about $\theta$ because bidders react to competition differently across formats.
- The Lehmann ranking is invariant to artificial relabelings of the auction mechanism — it tracks the substantive competition effect, not the format's surface structure.

**Applications worth highlighting**

- Sparse-data environments, where extracting maximal information per bid observation is most valuable.

**Possible extensions**

- Forward-looking buyers — bidders who internalize that current bids reveal information used in future auctions, and shade accordingly.