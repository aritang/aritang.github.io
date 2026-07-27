---
title: "Paper reading note | Will the market fix the market?"
date: 2026-07-24T00:54:31-05:00
draft: false
---

Proabably not?

> A Theory of Stock Exchange Competition and Innovation: Will the Market Fix the Market?
>
> Budish, Lee and Shim (2024) JPE

-----

Reading Notes

Context: exchanges today adopt the continuous limit order book trading mechanism, which generates latency arbitrage — rents from *symmetrically disseminated public* information — which fuels a socially wasteful speed race and taxes liquidity. A known fix exists (frequent batch auctions). Incumbent exchanges have not adopted it. Why not?

### Players

Four types

1. **Exchanges** (M ≥ 2, ex ante identical). Choose market design, trading fees, and exchange-specific speed technology (ESST) fees.
2. **Trading firms (TFs)** — the central actors. N fast TFs plus a continuum of slow ones. No intrinsic demand to trade. Two ways to profit: provide liquidity, or snipe others' stale quotes.
3. **Informed traders** — arrive with private information; impose adverse-selection losses on TFs.
4. **Investors** — arrive needing to trade one unit; the profit source for liquidity provision. They bear the spread.

Informed traders and investors are arrival processes, not real strategists. The game is exchanges vs. TFs.

### model

> ###### "To analyze our questions, we build a model that is closely tailored to the institutional details of modern electronic financial exchanges."
>

One security, fundamental value *y*, always liquidatable at *y*. 

Two regulations are baked in.<br>A. the security trades identically on every exchange. <br>B. frictionless search and access — zero cost to see all books and route anywhere.<br>Together these let participants stitch all exchanges into a virtual single platform.

Play repeated **trading games** (~1 ms each), two periods per game.

**Period 1:** TFs post/cancel limit orders anywhere; books are public.

**Period 2:** nature draws one event:

- λ_invest — an investor arrives, buys or sells one unit (equally likely), via immediate-or-cancel orders (IOCs);
- λ_private — an informed trader privately sees a jump in *y* and trades on it;
- λ_public — everyone sees a jump in *y* at once; all TFs may send IOCs and cancellations;
- remainder — nothing happens.

###### Jumps: symmetric, zero mean, bounded; |jump| ~ J. Define L(s) ≡ Pr(J > s/2)·E[J − s/2 | J > s/2]: expected loss on a stale quote at spread s, if traded against.

## Market designs

- **Continuous** (status quo): messages processed *serially*, in arrival order; speeding breaks ties.
- **Discrete** (frequent batch auction): short discrete intervals; each batch processes cancellations first, then clears everything else in a uniform-price auction. Speed wins nothing.

### Trading Firm incentives and the equilibrium spread

A trading firm can be a provider by posting a bid at y − s/2 and an ask at y + s/2. Payoffs:

- investor arrives: earn s/2;

- informed trader arrives: lose L(s);

- public jump: lose L(s) if the race is lost; also forgo a 1/N share of the sniping prize by defending instead of attacking:

  ###### ie. when a public information is released (λ_public), price jump to $y'$. The liquidity-providing trading firm would want to cancel his $y ±s/2$ orders on the book. Other trading firms would scramble in and try to *snipe* the liquidity-providing trading firm. 

Widening s raises investor revenue and shrinks both loss terms (small jumps can't clear a wide spread). Competition pins the equilibrium $s^*$ at indifference between providing and sniping:

- **Continuous** (3.1): $λ_{invest }· s^*/2 = (λ_{public} + λ_{private}) · L(s^*)$
- **Discrete** (3.3): $λ_{invest} · s^*/2 = λ_{private} · L(s^*)$

## Game timing

1. Exchanges choose design (Continuous / Discrete).
2. Exchanges set trading fees f_j and speed fees F_j.
3. Fast TFs buy speed
4. Trading game repeats T times. (For the repeated-game analysis, stages 1–4 themselves repeat.)

## Equilibrium concepts

Stages 1–3: subgame-perfect Nash. 

But stage 4 is problematic. Because if we just do stand subgame perfect nash: (A) notice that in continuous game, there should only be one TF acting as liquidity provider, because excess liquidity would thinner each provider's profit (from trading with investors) — but more providers means more latency threat and more loss. (B) then, with only one liquidity provider, if he set spread at $s^*$ and no one else is providing liquidity, Nash-styled equilibrium doesn't hold because he can painlessly deviate to $s^* + \epsilon$ and profit more. (C) But notice that this deviation is not proofable one-step ahead, because if the existing liquidity provider deviate to $s^*+ \epsilon$, others can undercut and do $s^*+ \epsilon/2$,

Fix: stage 4 uses **Order Book Equilibrium (OBE)**. A book is at rest if (1) no TF has a *safe* profitable price improvement — profitable even if rivals withdraw in response — and (2) every other profitable deviation dies to a rival's withdrawal or safe  undercut. Discipline comes from one step ahead anticipated reactions.

> ### Case 1 — all Continuous (status quo; Prop. 3.1–3.2)
>
> - Trading fees = **zero** (Frictionless search ⇒ Bertrand)
> - Speed fees > 0. All N fast TFs buy speed everywhere volume exists.
> - One unit of liquidity at $s^*_{continuous}$, split across exchanges in arbitrary interior shares $σ*$. Investors route by the same $σ*$. Depth/volume ratios equalize — the virtual single platform.
>
> ###### Data matched: trading fees ~$0.0001/share/side; speed-tech revenue $675–790M in 2015, est. $1.3–1.5B by 2022; interior, stable market shares.

> ### Case 2 — one Discrete exchange (Prop. 3.3–3.4)
>
> If one exchange switches to discrete market design
>
> - In *any* equilibrium, all trade tips to the Discrete exchange. Surviving on Continuous requires a spread $s̄_{continuous} > s^*_{discrete}$; frictionless search lets anyone undercut that quote on Discrete at a profit.
> - The Discrete exchange would charge a supracompetitive trading fee — up to roughly the latency-arbitrage tax it removes — earns profit. Continuous rivals earn zero.
>
> Technically, the innovator gets paid for solving the problem. Here private and social incentives align.

> ### Case 3 — multiple Discrete exchanges (Prop. 3.5)
>
> If one exchange switch to discrete, all others do, and it restores Bertrand. At least one Discrete exchange sets zero fees; all volume flows there at spread $s*_{discrete}$; **every exchange earns zero**. Case 1's virtual single platform, minus the speed rents. Best for investors, worst for exchanges.

Because Case 2 is NOT stable — in a continuous world, if one exchange deviate to discrete, it would make all other continuous exchanges run out of business. Every other exchanges then would have to do continuous. Then we would go to Case 3 where everyone again make zero profit, less the speed premium paid by TF. SO at the end of the day, the market would not fix the market.

Funny enough, NYSE, Nasdaq, LSE, Europe, Tokyo, Hong Kong etc all run continuous limit order books for regular-hours trading.

The Chicago Stock Exchange (CHX) was a small and very old exchange. Founded in 1882, by 2010s it had almost negligible market share in US equities (<1%). In 2017 CHX proposed an **asymmetric speed bump**: a 350-microsecond delay applied to *incoming aggressive orders* (the snipers' orders) but *not* to liquidity providers' cancellations. As the paper recounts in Section IV.A: the proposal drew significant opposition from the larger incumbent exchanges. In 2018, NYSE Group acquired CHX and officially withdrew the proposal.
