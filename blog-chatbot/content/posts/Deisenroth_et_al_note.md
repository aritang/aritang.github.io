---
title: "paper reading note | digital advertising and market structure — implications for privacy regulation"
date: 2024-10-31T20:37:21+08:00
draft: false
---

Here is a summary of the paper "Digital Advertising and Market Structure: Implications for Privacy Regulation" by Deisenroth et al., along with some of my thoughts on its interesting aspects.

This economics paper focuses on industrial organization and public policy. The five authors are Utsav Manjeer, Daniel Deisenroth, and Zarak Sohail from Meta; Steve Tadelis, a professor at UC Berkeley and affiliated with NBER and CEPR; and Nils Wernerfelt from the Kellogg School of Management at Northwestern University.

The paper examines the digital advertising market and studies the effects of tightened privacy regulations on market outcomes. It approaches this analysis through two main methods:

> (from the abstract of the paper)
>
> To inform these policy debates, we develop an equilibrium model of advertising and market structure to analyze the impact of privacy regulation on market outcomes. We test the model’s predictions using the launch of Apple’s App Tracking Transparency feature, which created a natural experiment that limited the use of consumer data. Leveraging data from all U.S. advertisers on Meta combined with oﬄine administrative data, we find that reductions in digital ad eﬀectiveness led to ***decreases in investments in advertising, increases in market concentration, and increases in product prices***.

From the perspective of a student researching in a similar area, the paper can be dissected into four parts:

- **Introduction and Literature Review**  
    The paper outlines a framework for analyzing digital advertising. Digital advertising delivers **targeted ads** by utilizing consumer data. Privacy protection regulations (e.g., GDPR, CCPA, Apple's App Tracking Transparency feature) restrict access to certain consumer data, thereby affecting advertisers' effectiveness. The key question is: How does this deterioration in ad effectiveness impact market outcomes?

    The introduction of Apple's App Tracking Transparency (ATT) feature—"Ask App Not to Track"—creates a natural experiment to evaluate the effects of privacy protection on firms and market outcomes.

    Section 2 of the paper describes the ***institutional details*** of advertising on Meta and how Apple's ATT has affected it.

- **Model**  
    The paper presents a model—a three-stage game where multiple advertisers make following decisions sequentially

    - **Stage (i):** Whether to enter the market, given an entry cost $ k $.
    - **Stage (ii):** How much to invest in advertising $ a_i $, incurring a cost of $ \frac{1}{2} a_i^2 $.
    - **Stage (iii):** The quantity to produce $ q_i $ in a Cournot competition setting.

    The key function of the model is the market price determined by ads and demand:
    $$
    p(Q) = R - \frac{Q}{e\sum_{i = 1}^N a_i},
    $$
    where:

    - $ i = 1, 2, \ldots, N $ indexes the $ N $ advertisers in the market.
    - $ p(Q) $ is the market price.
    - $ Q = \sum_{i=1}^N q_i $ is the total quantity produced.
    - $ R $ is the market "reservation" price above which no consumer purchases.
    - $ a_i $ is the advertising effort exerted by advertiser $ i $.
    - $ e $ is the elasticity parameter of advertising.

    Each advertiser $ i $ aims to maximize their profit:
    $$
    p(Q) \, q_i.
    $$
    The paper solves for the ***symmetric*** equilibrium by working backwards and taking derivatives.

    Proposition 3 of the paper states:

    > A unique free entry equilibrium exists if and only if $e^2R^4 \ge 32 k$. Furthermore, as advertising effectiveness $e$ increases, the equilibrium number of firms $N^*$ weakly increases while the equilibrium price $p^*$ decreases.

    Therefore, the model predicts that as more stringent privacy policies are implemented:

    - Firms will exit the market.
    - Total ad spending decreases, but surviving advertisers spend more individually.
    - Product prices increase.

- **Data Processing**  
    In Sections 4 and 5, the paper utilizes large-scale, exclusive data from Meta and U.S. industry data from the North American Industry Classification System (NAICS).

    I am not an expert in statistics and data processing, but I believe the authors explain how they organized and utilized the data in a reasonable way. For now, I'll treat this part as a black box and consult some friends who are more proficient in econometrics for assistance.

- **The Paper's Findings**  
    By analyzing the data, the paper hypothesizes that advertisers with different objectives react differently to tightening privacy regulations (ATT):

    > "In particular, the campaigns whose objectives relate to 'lower funnel' (off-platform) actions, such as sales or app downloads, are likely more affected than the campaigns whose objectives relate to 'upper funnel' (on-platform) actions, like increasing the number of 'likes' or brand awareness."

    Other findings include that ATT decreases overall ad spend but increases individual advertisers' ad spend. ATT leads to more advertisers exiting the market and higher product prices.

The paper concludes by emphasizing that it is the first research to use large-scale, industry data to analyze the effect of privacy regulation on digital advertising and the product market. It suggests that privacy regulation harms not only firms but also potentially consumers due to higher prices. Finally, the paper notes that small and medium-sized businesses are the ones that rely most on advertising—specifically targeted advertising that uses consumer data to reach niche markets—hence, they are most affected by privacy laws. Considering that they have more limited budgets and fewer opportunities to recover from setbacks, this is concerning.

## my thoughts

The paper's results are not particularly surprising. Given a product market where digital advertising is a primary driving force besides product quantity, it is intuitive that when the effectiveness of advertising deteriorates, there will be fewer advertisers in the market. With fewer sellers, prices go up. Under certain assumptions of the demand function, ad spending may increase. 

What would be really interesting is to explicitly account for smaller and larger sellers. Can we verify both theoretically and empirically that privacy regulation harms smaller sellers but does not significantly affect bigger sellers?

Finally, it occurs to me that in the near future, large language models could contribute significantly to empirical analysis. Much of the data summarization and cleaning could be done on a larger scale by these models, offering new opportunities for findings that were previously inaccessible.
