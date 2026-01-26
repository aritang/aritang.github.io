---
title: "regulation for algorithmic collusion"
date: 2024-04-30T22:52:19+08:00
draft: false
tags: ["paper", "econ-CS", "TCS"]
---

This week, **Chenhao Zhang** from Northwestern University visited ITCS and gave [a talk on Regulation of Algorithmic Collusion](https://itcs.sufe.edu.cn/48/71/c10453a215153/page.htm), based on his ongoing collaboration with Prof. Jason Hartline. Here's a background of the topic, summary of the talk and their work (hopefully), and some discussion afterwards.

> ### Regulation of Algorithmic Collusion
>
> ***ABSTRACT***
>
> Consider sellers in a competitive market that use algorithms to adapt their prices from data that they collect. In such a context it is plausible that algorithms could arrive at prices that are higher than the competitive prices and this may benefit sellers at the expense of consumers (i.e., the buyers in the market). This paper gives a definition of plausible algorithmic non-collusion for pricing algorithms. The definition allows a regulator to empirically audit algorithms by applying a statistical test to the data that they collect. Algorithms that are good, i.e., approximately optimize prices to market conditions, can be augmented to contain the data sufficient to pass the audit. Algorithms that have colluded on, e.g., supra-competitive prices cannot pass the audit. The definition allows sellers to possess useful side information that may be correlated with supply and demand and could affect the prices used by good algorithms. The paper provides an analysis of the statistical complexity of such an audit, i.e., how much data is sufficient for the test of non-collusion to be accurate.

### algorithmic collusion

The concept of algorithmic collusion is brought to light by Calvano et al. in their seminal 2020 paper from the American Economic Review, "Artificial Intelligence, Algorithmic Pricing, and Collusion." They note that:

> As firms increasingly adopt software programs for pricing goods and services—a trend evidenced by over a third of vendors automating their pricing on Amazon in 2015—pricing algorithms might autonomously learn to collude. This tacit collusion occurs without explicit instructions or inter-algorithm communication, challenging the current frameworks of antitrust policies which target explicit agreements among competitors.

- The paper substantiates through simulation experiments that even simple pricing algorithms can systematically adopt collusive strategies. These strategies, markedly sustaining prices below monopoly levels but well above the Bertrand competition equilibrium, rely on **punishments for defections**, which are finite and gradually revert to pre-deviation pricing. This suggests a form of coordination absent any formal agreement.

    Further studies enhancing our understanding of this phenomenon include:

    - "Artificial Intelligence and Auction Design" by Banchio and Skrzypacz (EC'22)
    - "The Impact of AI Design on Pricing" by Asker et al. (AEMS'23)
    - "Algorithm Collusion by LLMs" by Fish et al. (2024)
    - "Algorithmic Pricing and Competition: Empirical Evidence from the German Retail Gasoline Market" by Assad et al. (JPE'24)

### the talk | Regulation of Algorithmic Collusion

Addressing algorithmic collusion involves navigating the fine line between legitimate competitive strategies and illicit coordination. Proposing a certification for non-collusive behavior might provide a clearer path than directly defining collusion, which can be a slippery slope due to potential misclassifications. Such a certification could have properties that:

- Are **unilateral**, focusing on the absence of joint behaviors.
- Allow for the use of correlated side information, such as price adjustments of hotels in response to demand fluctuations during holidays.
- Define that optimizing responses based on market conditions is not collusion.
- Are verifiable through historical data analysis.
- Simplify algorithmic verification processes.

The framework utilize calibrated (swap) regret to assess whether a change in pricing strategies would improve a seller's long-term outcomes. If no benefit is derived from altering prices, then the current pricing strategy might be deemed non-collusive. The development of a statistical test and accompanying algorithm to analyze a seller’s historical pricing and sales data can determine compliance with these non-collusion standards, despite challenges such as data gaps which might necessitate assumptions and imputation methods.

### discussions

Creating mechanisms to detect and define non-collusive behavior in algorithm-driven markets is fraught with challenges, both conceptual and technical. In an algorithmic setting, what constitutes collusion isn't always clear-cut. For instance, algorithms may evolve to adopt pricing strategies that, while not explicitly collusive, result in prices that are consistently above competitive levels due to optimal long-term strategies. These outcomes, while potentially resembling collusive arrangements, do not meet the traditional criteria of collusion but indicate a persistent elevation of price levels.

This ambiguity, compounded by the opaque nature of algorithms, makes validating the presence or absence of collusion not just an algorithmic challenge but a conceptual dilemma as well—prompting us to question: Where do we draw the line for collusion? Or indeed, does such a line even exist?
