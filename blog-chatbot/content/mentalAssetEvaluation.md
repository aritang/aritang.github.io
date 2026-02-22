---
title: "Mental Models and Financial Forecasts — How Attention and Simplification Shape Beliefs"
date: 2026-01-12T22:56:18-06:00
draft: false
---

Notes from behavior seminar at Booth.

> ### Mental Models and Financial Forecasts
>
> Bastianello, Décaire and Guenzel (2025) | SSRN https://dx.doi.org/10.2139/ssrn.5004839
>
> We uncover the mental models financial professionals use to explain their quantitative forecasts, and show how they shape beliefs and return predictability. Using the near-universe of 2.1 million equity analyst reports, we collect the valuation methods analysts adopt to compute their price targets, together with their reasoning, measured as attention to topics, and their associated valuation channels, time horizons, and sentiments. To validate the reliability of our output, we introduce a multi-step LLM prompting strategy and new diagnostic tools. Consistent with a model of top-down and bottom-up attention, we then uncover three sets of facts. First, analysts’ mental models are sparse and rigid, and the choice of attention allocation and valuation methods are jointly determined by both analyst- and firm-characteristics. Second, analysts’ reasoning translates into their quantitative forecasts. Both attention and valuation methods contribute to differences in valuations over time and across analysts, but variation in attention plays a bigger role. Third, we study the extent to which different topics contribute to over and underreaction to information, and show how biases in analysts’ reasoning are reflected in asset prices. Analysts underreact to macroeconomic topics, and overreact to firm-related topics, and this contributes to return predictability.

This paper studies how financial professionals form predictions of asset prices — the combination of what analysts pay attention to and how they simplify the valuation problem. Using a comprehensive dataset of equity analyst reports, the authors show that these mental models are ***sparse***, ***rigid***, and ***systematically biased*** (ohhh...).

### The core model

Firm value depends on many underlying features, summarized in reduced form as
\[
\hat p = \sum_{k=1}^K v_k x_k,
\]
where $x_k$ are valuation-relevant variables and $v_k$ their true weights. Analysts do not observe $x_k$, they only receive noisy signals

$$
s_k = x_k + u_k, \quad u_k \sim \mathcal N(0,\omega_{sk}^{-1}),
$$




where signal precision $\omega_{sk}$ is chosen by the analyst through attention allocation, subject to a linear attention budget 
$$
\sum_k c_k \omega_{sk} \le C.
$$
To make valuation tractable, analysts choose a vector of weights $\vec m$ to estimate price
\[
\hat p = \sum_{k=1}^K m_k x_k.
\]
Analysts choose $(\vec m,\omega_s)$ to minimize mean squared forecast error
$$
\min_{m,\omega_s} \; \mathbb E\!\left[(p - \mathbb E[\hat p \mid s])^2\right] \quad \text{s.t.} \quad \sum_k c_k \omega_{sk} \le C.
$$


### Key mechanisms implied

Standard optimiation — the objective function can be decomposes into a variance term (imprecision from noisy signals) and a bias term (misspecification from using $m_k \neq v_k$). Which implies

- Optimal attention is selective: analysts devote attention to variables that are more relevant ($v_k$ high), more volatile, and cheaper to process, and ignore others entirely, generating sparse mental models.
- Attention and valuation methods are tightly linked: analysts allocate more attention to dimensions emphasized by their chosen method
- Simplification creates systematic bias. When analysts overweight a salient variable or underweight an important but less prominent one, they overreact or underreact to news about it.

The model allows processing costs and perceived relevance to differ across analysts. And so, training and experience lower the cost of using familiar valuation methods, creating persistence and rigidity in model choice. Exposure to their favourite topics can distort perceived relevance or volatility, leading analysts to overweight them (e.g., firm-specific narratives) and underweight others (e.g., macroeconomic conditions). Even when valuing the same firm at the same time, analysts with different backgrounds therefore tend to adopt different mental models.

(But isn't that obvious already?)

Therefore, the theory also predicts certain kind of return patterns: variables that analysts **overreact** to should be associated with lower subsequent returns after good news, while **underreacted variables should predict higher returns**.

### What the data show

Using large language models to extract valuation methods and structured reasoning from over two million analyst reports, the authors find strong support for these predictions. Analysts attend to a small subset of topics, and topic choice is highly persistent. While valuation methods are relatively similar across analysts, attention differs substantially and explains most of the variation in disagreement and valuation changes. Analysts overreact to firm-level topics and underreact to macro topics, and these distortions translate into return predictability. The paper essentially showed that belief formation in financial markets is shaped less by sophisticated pricing formulas than by representational choices under limited attention.
