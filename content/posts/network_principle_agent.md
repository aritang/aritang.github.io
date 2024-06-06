---
title: "write-up | algorithmic classification and strategic effort"
date: 2024-06-04T23:47:17+08:00
draft: false
---

A memoir of Market Mechanism Design course's final presentation report, based on:

> ### Algorithmic Classification and Strategic Effort
>
> Jon Kleinberg and Manish Raghavan | ACM SIGecom Exchanges, Vol. 18, No. 2, November 2020, Pages 53–60

## motivation: difference in modelling strategic behavior and objectives–between econ/CS perspectives

> The principal-agent and strategic machine learning literatures appear to share a common goal: how should one structure a decision-making rule to account for the strategic actions of decision subjects?

The paper proposes a model that applies ideas from principal-agent theory to the algorithmic decision-making setting.

> A key feature of models of strategic behavior in both the principal-agent and strategic classification literatures is that of hidden actions: decision-makers can’t observe the exact actions taken by a decision-subject. 
>
> In the principal-agent literature, this is typically captured through stochastic outcomes, where each action by the agent produces a distribution over possible outcomes, but only one outcome is realized and observed by the principal. 
>
> In the strategic classification literature, actions are typically not explicitly modeled; instead, a decision-maker simply observes a fea- ture vector, where the values of the feature vector can be strategically manipulated (to a limited degree) by the decision subject.

## model

The principle has **preferences over the underlying behaviors** taken by decision subjects. The model requires decisions (of principle) to be made based on observable feature vectors–that he structure his mechanism to incentivize agents take certain behaviors over others.

Algorithmic aspect comes in when the paper models the relationship between actions and observations as an **effort graph**, shown in below.

{{<figure align="center" src="/who_do_we_blame/effort_graph.jpeg" caption="effort variables $x_1, \ldots, x_m$, which are the $m$ actions the agent can take. features $F_1, \ldots, F_n$ is the $n$-dimensional feature vector the decision maker actually observes.">}} 

In particular, each edge between $x_j$ and $F_i$ contains a parameter $\alpha_{ji}$ indicating the degree to which action $j$ increases feature $i$. Formally
$$
F_i = f_i \left (\sum_{j = 1}^m \alpha_{ij} x_j \right)
$$
where $f$ is some continuous concave function, and assumed that $\alpha \ge 0$. Basically, the larger $\alpha_{ij}$, the more extent of $x_j$ in increasing $F_i$.

Assume that the model's structure and parameters are public knowledge.

The mechanism designer (i.e. us, or the principle) designs a score function $H = M(\mathbf  F)$, and the agent reacts accordingly
$$
\begin{align}\text{agent's obj: }\max_x \ & M(\mathbf F)\cr
s.t.\ & \sum_{j = 1}^m x_j \le B  & (\forall i)\cr
& x_j \ge 0 & (\forall j)
\end{align}
$$
As the designer, we are insterested in whether a particular action (i.e. effort invested) $x^* \in \mathbb{R}{}_{\ge 0}^m$ (or, its support $S(x^*)$) is incentivizable via some scoring rule design of $M(\cdot)$. The result is:

{{<figure align="center" src="/who_do_we_blame/linear_incentives.jpeg" caption="linear mechanisms are optimal in the following sense: whenever a 'reasonable' mechanism can incentivize a particular behavior, there is a linear mechanism that can do so as well.">}}

Moreover, let's say, we'd like to optimize for a set of desirable actions $D\subset [m]$. Let $\mathcal X_D  = \{x | S(x) \subset D\}$ (i.e. the set of effort profiles that is only supported on $D$, that we wish to incentivize).
$$
\begin{align}\text{principle's obj: }\max_x \ & g(x) 
\quad
s.t.\ x \text{ is incentivizable}
\end{align}
$$
{{<figure align="center" src="/who_do_we_blame/linear_incentives_1.jpeg" caption="it can be hard to incentivize a complex set of behaviors while also optimizing other objectives.">}}

### reference

Jon Kleinberg and Manish Raghavan. 2020. Algorithmic classification and strategic effort. SIGecom Exch. 18, 2 (November 2020), 45–52. https://doi.org/10.1145/3440968.3440974

Jon Kleinberg and Manish Raghavan. 2019. How Do Classifiers Induce Agents to Invest Effort Strategically? In Proceedings of the 2019 ACM Conference on Economics and Computation (EC '19). Association for Computing Machinery, New York, NY, USA, 825–844. https://doi.org/10.1145/3328526.3329584
