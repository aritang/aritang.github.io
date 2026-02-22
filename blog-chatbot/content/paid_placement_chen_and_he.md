---
title: "paper reading note | Chen and He (2011) Paid Placement — Advertising and Search on the Internet"
date: 2024-11-01T10:35:05+08:00
draft: false
---

Summary and reading note of the paper

> Yongmin Chen, Chuan He, Paid Placement: Advertising and Search on the Internet, *The Economic Journal*, Volume 121, Issue 556, November 2011, Pages F309–F328, https://doi.org/10.1111/j.1468-0297.2011.02466.x

[Yongmin Chen](https://www.colorado.edu/faculty/chen-yongmin/) and [Chuan He](https://www.colorado.edu/business/leeds-directory/faculty/chuan-he) are both Professors at the University of Colorado Boulder. This is a theoretical paper.

The paper examines the effects of online advertising with ***paid placement*** on sellers and consumers. It formulates a market model with multiple differentiated sellers and searching consumers, with the search engine serving as an information intermediary. The paper emphasizes sellers' differentiation and incorporates a mechanism design approach by assuming the search engine runs a generalized second-price auction to elicit sellers' information about their relevance. The authors solve for the market equilibrium and analyze the implications of paid placement for the search engine's profit, consumer welfare, and efficiency. Finally, the paper extends the analysis to include sellers with different costs.

## model

Given a particular keyword, $ m $ sellers offer products to a unit mass of consumers at a constant marginal cost $ c $. Each seller $ i $'s ***relevance*** value for consumers is differentiated as
$$
v_i X_i,
$$
where:

- $ v_i \in [\underline{v}, \overline{v}] $ is a realization of a random variable from distribution $ F(\cdot) $,
- $ X_i \in \lbrace0, 1\rbrace $ is an indicator random variable denoting whether the product is a match; $ X_i = 1 $ with probability $ \beta_i $.

The distribution $ F(\cdot) $ is assumed to be independent and identically distributed (i.i.d.) across sellers and independent of $ X_i $.

The parameter $ \beta_i $ is the main driving force of differentiation—it represents the ***relevance probability*** of seller $ i $ and is private information for each seller. Without loss of generality, we assume
$$
\beta_1 \geq \beta_2 \geq \ldots \geq \beta_m.
$$
For tractability, the paper further assumes an underlying structure for $ \beta_i $:
$$
\beta_i = \gamma^{\min(i - 1, I)} \beta,
$$
where $ \beta, \gamma \in (0, 1) $ and $ 2 \leq I \leq m $. The relevance match probability $ \beta_i $ decreases with $ \gamma $ and remains the same after $ I $.

[**Assumption**] The paper assumes $ I = 3 $ and later sets the number of ad positions to 3 in the subsequent analysis.

### consumers

A consumer does not know any $ \beta_i $ or $ v_i $ a priori. They use a ***search engine*** to find products using a keyword. Sellers can choose to pay the search engine to be included in the result list through a ***generalized second-price auction***.

Based on their beliefs, consumers incur a cost $ t_j $ to inspect the webpage of the seller in position $ j $. For $ t < t^h $ (along with **a few other regularization assumptions**), the inspection costs are defined as:
$$
t_j = \begin{cases}
t & \text{for } j = 1, 2, 3, 4, \cr
t^h & \text{for } j > 4.
\end{cases}
$$

### sellers

Sellers make two decisions: first, they bid for the paid-placement slots; then they independently choose their prices, which are **not** observed by consumers before they incur the cost to inspect the sellers. After inspection, consumers make unit purchases when they find a desired product, and sellers obtain their revenue.

[**Assumption**] The paper studies symmetric pricing equilibria where sellers' equilibrium prices are the same: $ p_i = p^o, \forall i $, and where
$$
p^o = \arg \max (p - c)[1 - F(p)].
$$
In my opinion, this assumption is rather restrictive. However, it simplifies the technical complexity, allowing the model to focus on other more interesting aspects.

## equilibrium analysis

A ***profile of strategies*** consists of (i) the search and purchase strategy of each consumer, and (ii) the bidding strategies and uniform pricing strategies of sellers. A (perfect Bayesian) equilibrium is a profile of strategies, together with a system of beliefs by buyers regarding the search engine, such that each player is optimizing.

### consumer's equilibrium search strategy

Under the assumptions made for the inspection costs $ t_j $, suppose that sellers displayed are ranked in the order of their $ \beta_i $ (and that they price $ p^o $ uniformly). It is optimal for each consumer to search sequentially over positions $ j = 1, 2, 3 $ and then randomly select another seller not listed on the search engine. They stop searching either when $ v_i X_i \geq p^o $ or after they have conducted all four searches and leave without making a purchase.

This scenario appears to be a special case of the Weitzman (1979) search model.

When sellers are ranked according to their $ \beta_i $ (and price uniformly), and given consumers' search behavior, sellers' revenue can be expressed in terms of $ \beta $, $ \gamma $, $ F(v) $, and $ m $ (the number of sellers).

### sellers' bidding equilibrium

Sellers, knowing their $ \beta_i $ privately, bid in a generalized second-price auction for paid placement. Note that generalized second-price auction is not universally truthful—equilibria in such auctions can be non-unique and potentially problematic—for example, in some equilibria, it is not the highest-relevance sellers who secure the better positions. Nevertheless, the paper solves for those favorable "separating equilibria" under certain assumptions, so that at equilibrium, the sellers (who get the paid-placement display) are ranked according to their $ \beta_i $.

There are other equilibria when the search engine operates differently. The paper refers to different strategies employed by the search engine that result in various "*consumer beliefs*". **Proposition 1** states (informally):

- If consumers believe that sellers presented in the paid placements are in descending order of relevance ($ \beta_i $) and are more relevant than those not presented in the paid placement, it results in a ***separating equilibrium***.
- If consumers believe that sellers presented in the paid placements are in a random order of relevance ($ \beta_i $) but are more relevant than those not presented in the paid placement, it results in a ***partial separating equilibrium***. The top three best sellers bid the same and are placed in random order.
- If consumers believe that all sellers are equally relevant (or irrelevant), there is a ***pooling equilibrium*** where all sellers bid zero.

## market outcome under equilibrium

### search engine's profit

The paper derives closed-form expressions for the search engine's profit under both separating and partial separating equilibria, expressed in terms of $ \beta $, $ \gamma $, $ m $, and $ F(\cdot) $. **Proposition 2** in Section 3 summarizes the technical properties of the profit functions. The key insight is that, as per **Remark 1**, paid-placement advertising leads to more efficient consumer search and higher total output. The separating equilibrium (informative ranking by the search engine) generally yields higher welfare gains than the partial separating equilibrium (where the ad placement does not signal relevance).

Finally, the paper extends the analysis to consider sellers with heterogeneous production costs.
