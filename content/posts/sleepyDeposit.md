---
title: "Sleepy Deposits | Dynamic Competition, or Eggs?"
date: 2026-05-22T20:49:12-05:00
draft: false
---

Professor Sunderam gave a talk at Booth about *Dynamic Competition for Sleepy Deposits* at the banking workshop.

###### It reminded me of how local small banks in China get people to open up account and do deposits. Local small banks' major customers are grandmas — so banks would give **rice, oil and/or eggs** as gifts for opening up account or putting deposit.

###### Then, grandmas would periodically "move" their deposits from bank to bank to get free gifts. They would even compare all banks and communicate to get the best deals.

###### Somewhat isomorphic to PhD students searching for seminar food. Anyway...

Professor Sunderam and the author team collaborated with Fiserv, a software solution provider for a lot of small-scale banks and credit unions. They got a total of deposit data from 58 million accounts at 920 banks/credit unions.

> Model **model** of dynamic competition between banks for deposits:
>
> - At each time period, fraction $\phi$ of depositors "asleep" each year, rest rolling over automatically. 
> - Bank set deposit rate.
> - Awake depositors deposit at new banks with *logit demand*, contingent on deposit rate and bank's idiosyncratic quality.
>
> Banks play Markov Perfect dynamic game; symmetric equilibria only; $\beta=0.9$ assumed. The paper solves a linearized policy function of banks that sets price, where coefficients are estimated (Table 4).

The main message seems to be: among small banks on the Fiserv platform, deposit stickiness is large, and *if* you take the dynamic strategic model seriously, it accounts for a big share of estimated franchise value.

Two additional thoughts: 

A quick Google tells: JPMorgan serves more than 85 million retail (consumer) customers, while 68 million for Bank of America. Big banks differ from community banks vastly: consumers are younger, more urban, and more digitally engaged. Big bank's "quality" is valued differently than small community banks, and their cost-revenue structure makes deposit interest rate enter their utility function too. The differences create a non-negligible gap in terms of structural parameters estimated and what really matters for the deposit market.

Moreover, banks aren't actually Markov *perfect* strategist. Likely, community bank rate-setting is benchmarking + rules of thumb + monthly ALCO meetings. And the "as if" defense (competitive pressure produces optimization-like behavior) is not really working because FDIC insurance dampens competitive pressure, and sleepiness itself actually might protect bad pricers — local market power means survival doesn't require optimal pricing.

