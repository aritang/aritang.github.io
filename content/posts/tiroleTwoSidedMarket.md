---
title: "The technical part in Rochet & Tirole (2006)"
date: 2026-06-06T19:10:07-05:00
draft: false
---

*Two‐sided markets: a progress report* (Rochet & Tirole, RAND Journal of Econmics, 2006) has 5172 citations according to Google Scholar as of June 2026. Though I would have defined two sided platforms differently and focus more on the two sided structure's nature rather than using price effects "a market is two-sided iff reallocating the fee between sides changes outcomes" (sweet, right?) — It's genuinely groudbreaking.

Anyways, here's a reading note for the technical part of the paper:

### Notation

One platform, two sides $i\in \{B, S\}$ (buy/sell).

- Membership: An agent can decide whether to join the platform, and incur benefit $B^i$. The platform incur cost $C^i$ to carry a member. The platform chagres $A^i$ for membership fee.
- Interactions: after joining the platform, the agent incur transactions. For each transaction, the agent incur benefit $b^i$. The platform incur fixed cost $c$ to enable a transaction. The platform charges $a^i$ to the agent for usage fee.

Each agent make a separate decisions: join (or not) and pay the membership. Once memberships on both sides $(N^B,N^S)$ are set, the number of *potential* interactions is the product $N^B N^S$ (complete bipartite graph — every buyer a potential partner of every seller). Realized volume is a fraction of this.

###### This single assumption is the engine of the whole tractability — it compresses the entire matching technology (search, ranking, capacity, assortativity, the online/sequential nature of real matching) into one proportionality constant.

So an agent's utility is

$$
U^i = \underbrace{(b^i - a^i)\,N^j}_{\text{usage layer} \,\times\, \#\text{partners}} + \underbrace{B^i - A^i}_{\text{membership layer}},\qquad N^i = \Pr(U^i \ge 0).
$$
Platform profit:

$$
\pi = \sum_{i}\underbrace{(A^i - C^i)}_{\text{net fixed margin}}N^i + \underbrace{(a^B + a^S - c)}_{\text{net variable margin}}N^B N^S.
$$

## Price, reparameterized

Define the **per-interaction price**

$$
p^i \equiv \underbrace{a^i}_{\text{usage fee}} + \underbrace{\frac{A^i - C^i}{N^j}}_{\text{net fixed margin, amortized over the }N^j\text{ partners}}.
$$
So

$$N^i = \Pr\!\Big(\underbrace{b^i + \tfrac{B^i - C^i}{N^j}}_{\text{per-partner gross benefit}} \ge p^i\Big) \equiv D^i(p^i, N^j).$$

Fixed point $\Rightarrow N^B = n^B(p^B,p^S),\ N^S = n^S(p^B,p^S)$, and profit collapses to

$$
\pi(p^B, p^S) = (p^B + p^S - c)\,n^B(p^B,p^S)\,n^S(p^B,p^S).
$$

## Definition of two-sidedness

Let $V(p)=\max\{n^B n^S : p^B+p^S=p\}$. So essentially $\pi(p^B, p^S) = V(p^B, p^S)(p^B + p^S - c)$

- **Two-sided:** this volume-max has a unique (or finite) solution — the *split* of a fixed total price moves the outcome.
- **One-sided:** a continuum of $(p^B,p^S)$ achieves the max — structure is neutral, only the level $p$ matters.

## Proposition 1 — optimal pricing

The platform's profit is
$$
\pi = (p^B + p^S - c)V(p),\qquad V(p)\equiv n^B n^S.
$$
The platform has two things to choose: **how high** to set the total $p = p^S + p^B$ (the level), and **how to split** it across sides (the structure). These two choices separate cleanly, so we solve them one at a time. Now, solving for optimal $p$:

- **Level — how high to set $p$.** 

    Hold the split fixed at its best and choose $p$ to maximize $(p-c)V(p)$. First-order condition:
    $$
    \frac{d}{dp}\big[(p-c)V(p)\big]=0 \;\Longrightarrow\; V(p) + (p-c)V'(p) = 0.
    $$
    Divide through by $V(p)$ and rearrange, using the volume elasticity $\eta \equiv -pV'(p)/V(p)$:
    $$
    \ \frac{p-c}{p} = \frac{1}{\eta}.
    $$

- **Structure — how to split $p$.**

    Now fix $p$ and ask how would shifting a dollar of price from side $S$ onto side $B$ raise total volume $V$? At the optimum the answer must be "no" in either direction — so the marginal effect of price on volume must be **equal across the two sides**. Writing the volume sensitivity per side (here $n^B_{p^B}$ means $\partial n^B/\partial p^B$, etc.):
    $$
    -\frac{1}{p-c} = \underbrace{\frac{n^B_{p^B}}{n^B}+\frac{n^S_{p^B}}{n^S}}_{\text{effect of raising } p^B} = \underbrace{\frac{n^S_{p^S}}{n^S}+\frac{n^B_{p^S}}{n^B}}_{\text{effect of raising } p^S}.
    $$
    Each bracket has two terms because raising the price on one side hurts that side's membership *and* — through the cross-side link — the other side's too. The condition says: at the optimum, the last dollar loaded onto either side does equal damage.

    This equation is hard to read in general. It becomes a clean formula in two extreme cases:

    - **Case 1 — pure usage** ($B^i=C^i=0$). The above condition collapses to
        $$
        \frac{p^i-(c-p^j)}{p^i} = \frac{1}{\eta^i}.
        $$

    - **Case 2 — pure membership** (agents differ only in fixed benefit $B^i$, share a common $b^i$; no usage fees $a^i=0$ and no transaction cost $c=0$). Same shape:
        $$
        \frac{p^i-(-b^j)}{p^i} = \frac{1}{\eta^i}.
        $$
        Now the opportunity "cost" is $-b^j$ — a *negative* cost, i.e. a benefit. **Why:** signing up one more member on side $i$ makes side $j$ better off by $b^j$ (one more partner each), which lets the platform raise side $j$'s price by $b^j$ without losing anyone. So an extra member on $i$ is worth $b^j$ in extra revenue on $j$ — the platform should price as if serving side $i$ has negative cost.

> **The seesaw.** Because the cost of each side is offset by what you earn on the other, a force that lets you charge a high margin on one side simultaneously makes it *more* profitable to charge a low price on the other (to pull in members who feed that high margin). So platforms routinely price one side below cost — even free — and recoup on the cross-side: **newspapers free to readers** (charge advertisers), **operating systems free to developers** (charge users), **consoles sold at or below cost** (charge per-game royalties).

Additionally, proposition 2 assumes there can be bargain between buyer/sellers. This splits platform's problem in two: pick the total usage charge $a$ to maximize trade efficiency, then price memberships $(p^B,p^S)$ to extract revenue exactly as in the pure-membership case.

## More than prices

The paper clealy stood the test of time amid the rapid evolving two sided platforms:

- The definition that "*a market is two-sided iff reallocating the fee between sides changes outcomes*" is clean and exquisite 
- The seesaw of "price one side below cost, recoup on the other, because cost should be read as opportunity cost net of cross-side revenue" explains an enormous range of real pricing. Despite the model is restrictive, this is so insightful.
- Unification. The paper nested the two prior strands (usage-externality à la telecom/cards, membership-externality à la Armstrong) into one model with a single pricing formula.

What can be done further:

- **Matching.** The defining capability of a modern platform (Google, Amazon, Uber, TikTok, dating apps) is *the matching/ranking technology itself*: who gets shown to whom, in what order, online and sequentially, under capacity. The paper prices access to an assumed-dense, frictionless, static graph. The hard, value-creating, and competition-relevant problem is left as open question.
- **Data, learning, and dynamics.** The model is static and one-shot. It has no data feedback loop, switching costs, lock-in dynamics. The actual source of platform dominance and entrenchment — data network effects and dynamic increasing returns — is To-Be-Modelled.
- **It's a pricing theory, but modern platforms compete on non-price dimensions.** Quality, design, ranking algorithms, default settings, self-preferencing, attention engineering.
- **Welfare framing is too benign.** $v(a)$ = social surplus from voluntary trades, all positive. There's no room for attention markets where the "transaction" (you viewing an ad, doomscrolling) may have *negative* social value. Also, political-economy effects of concentrated platform power.
- And on and on...

I guess that's why the paper has 5k+ (and growing) citations.