---
title: "BCD model - Analysis"
date: 2023-09-28T09:24:22+08:00
draft: false
cover:
    image: complaints/Subway_Senior_Watching_Phone.jpg
summary: Following yesterday's post, as promised, here's an analysis of the model in the series of papers.
---

Following [yesterday's post](https://aritang.github.io/posts/bcd_model/), as promised, here's an analysis of the proposed model in the series of papers.

We'll focus on a few key parameters: $\mu$ (product heterogeneity factor, which multiplies the i.i.d. random parameter $\epsilon$ to yield the product's net value for a consumer), search cost $c$, and market size $n$ (the number of firms). Consumer count $L$ is irrelevant because we're examining expected revenue with i.i.d. consumers, and it's simply a constant multiplier.

Building upon our previous discussion, assuming a symmetric equilibrium, where all firms share the same equilibrium price, denoted as $p^{\star}$. Consumer search behavior is akin to Pandora's box: for a consumer holding her current best option $v_i = \mu\epsilon_i$ found at firm $i$, which sets the price at $p_i$. If she continues searching, her expected incremental value becomes:

$$
G_\mu(\epsilon_i, p_i) =\int_\R[\mu\epsilon - p^{\star}-( \mu\epsilon_i - p_i)]^+\ dF(\epsilon)
$$
When $G_\mu(\epsilon_i, p_i) - c \geq 0$, it incentivizes the consumer to keep searching for a potentially better product. Notably, $G_\mu$ decreases as $\mu\epsilon_i - p_i$ decreases, so we find a critical value $\hat u$ where, for any $\epsilon_i$ and $p_i$ satisfying $\mu \hat\epsilon_i - \hat p_i \geq \hat u$, the consumer continues searching. Otherwise, she stops and buys if her utility remains positive.

For the firm $i$, if he sneakily sets his price at $p_i$  (so while consumer search they still assume $p^{\star}$ for every firms, only accepting $p_i$ after they searched company $i$), his demand would be

Now, for firm $i$, if they slyly set their price at $p_i$ (while consumers assume for all firms, only accepting $p_i$ after searching at firm $i$), their demand becomes:

$$
D(p_i, p_{-i}^{\star}) = \sum_{t = 1}^{n} \frac{1}n F^{t-1}(\hat \epsilon^{\star})(1 - F(\hat \epsilon_i)) + \int_{\max(a, p_i)}^{\hat \epsilon_i} F^{n-1}(\epsilon_i - (p^{\star} - p_i)/\mu)\ dF(\epsilon_i)
$$
The first component sums the expectation of consumers (selecting firms randomly) who search until they reach $i$ without encountering a satisfying product before $\mu\epsilon_i - p_i \geq \hat u_i$ and then make a purchase. The second component represents consumers who search all firms without finding a satisfying product, eventually returning to buy from firm $i$, where they find the best option.

Revenue is simply $p_i \times D$. WLOG assume under equilibrium that $p^{\star} \leq a$, and a necessary condition for symmetric equilibrium is
$$
\partial_{p_i}\pi(p^{\star}, p_{-i}^{\star}) = 0\Rightarrow p^{\star} = -D(p^{\star}, p_{-i}^{\star})/\partial_{p_i}D(p^{\star}, p_{-i}^{\star}).
$$
With tributes to my OCD:
$$
p^{\star}=\frac{\mu}{n}\frac1{\frac1nf(\hat\epsilon^{\star})(\frac{1 - F^n(\hat\epsilon^{\star})}{1 - F(\hat\epsilon^{\star})}) - F^{n-1}(\hat\epsilon^{\star})f(\hat \epsilon^{\star}) + \int_a^{\hat \epsilon^{\star}}(n-1)F^{n-1} (\epsilon_i)f^2(\epsilon_i)\ d\epsilon_i}
$$
recall that $\mu \hat \epsilon^{\star} - p^{\star} = \hat u$ where $\hat u$ is the critical utility level that originated out of $F$. This equation represents a stability point function that solves the symmetric market equilibrium price, $p^{\star}$.

For economists, the next steps involve the riveting adventure of diving into the abyss of taking limits to scrutinize extreme cases (yawn...) and studying social welfare (like figuring out the optimal market size (aka $n$) based on the delicate balance between welfare and search costs) and tracking the trend dynamic of price, revenue, or market size with respect to various parameters.

In my point of view, analyzing the outcome of the model when $\mu \to 0$ is a little bit trivial because this is just a degenerate case when all products are exactly the same. Moreover, $c$ and $\mu$ are kind of correlated because you can normalize one of them w.r.t. another. But say, fix search cost $c$, when product heterogeneity (or simply, it's just the variance scale of products' value distribution) $\mu$ goes from some lower bound $\mu_0$ (that minimum product variation that incentivize search-then-buy) to sufficiently large, the price and market size in equilibrium would be interesting result to look into (I kinda remembered it's first drop then rise...?). It will be fascinating to read the rest of the paper in detail but quite the mental workout.

Now, from my humble perspective, delving into what happens when $\mu \to 0$ feels like chasing after the world's tiniest unicorn because, well, that's when all products become clones of each other. Plus, $c$ and $\mu$ seem to be playing a cat and mouse game because you can normalize one of them w.r.t. another. Correct me if I'm wrong.

But say, fix search cost $c$, when product heterogeneity (or simply, it's just the variance scale of the value distribution...) $\mu$ goes from some lower bound $\mu_0$ (that minimum product variation that incentivize search-then-buy) to sufficiently large, the price and market size in equilibrium would be interesting result to look into (I vaguely recall it's like a dip and then a rise...or something like that?). It will be fascinating to read the rest of the paper in detail but quite a mental marathon.

Stay tuned for more, possibly tomorrow. Citations still lounging around, sipping their tea.
