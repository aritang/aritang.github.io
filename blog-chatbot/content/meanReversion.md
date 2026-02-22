---
title: "Mean Reversion (a concept that's been abusively used)"
date: 2026-01-20T14:35:48-06:00
draft: false
---

> Mean reversion is a property some models have and some data exhibits. It's not a law. It's a useful lens but requires specifying the mechanism and checking whether it actually holds.

So let's check the conditions.

In our Macroeconomics with Heterogeneous Households class, for the continuous-time model of an individual household with (Poisson) income shock, consumption follows the following dynamic:

{{<figure align="center" width="50%" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/consumptionEvolution.jpeg" caption="Courtsey to Professor Kaplan's Course material... If you're interested in more about the math/model.">}}

- The first term reflects the **intertemporal tradeoff** — you get it even from standard deterministic Euler equation term. If the interest rate $r$ exceeds your discount rate $\rho$, you want to defer consumption to earn that return, so expected consumption growth is positive. The IES $\sigma$ scales how responsive one is to this intertemporal tradeoff.
- The 2nd line reflects saving to hedge against risk for (negative) income shock — "**precautionary motive**". If you might jump to a state where consumption would be lower (so $u'$ is higher due to concavity), this term is positive—you're saving more today as a buffer.
- The 3rd line reflects the **mean reversion** in income. It is powered by the (independent) Poisson income assumption. If the current income state $z_t$ is unusually high, you likely face jumps to lower states ($c(a_t,z')<c_t$), then this term negative and you'll be *expecting* consumption to fall. 

More generally, Barro and Sala-i-Martin's *Convergence* (JPE, 1992) studies income convergence across economies. The U.S. states provide clear evidence of convergence in the sense that poor economies tend to grow faster than rich ones in per capita terms. The paper distinguished between β-convergence (poor places growing faster) and σ-convergence (dispersion decreasing over time), finding that conditional convergence applies at about 2 percent per year—meaning it takes about 35 years for an economy to eliminate one-half of the gap between its initial per capita GDP and its long-run target level.

And even more generally, Francis Galton's 1886 paper *Regression towards mediocrity in hereditary stature* coined the term. Galton compared the height of adult children to the heights of their parents and found that height in parents are not passed on completely to their offspring—rather, it regress toward a mediocre point (the mean). (Interestingly, this work gave the term "regression" (as in regression analysis) and the concept of regression to the mean as a statistical phenomenon).
