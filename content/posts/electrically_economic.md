---
title: "electrically economic I"
date: 2024-04-12T15:43:16+08:00
draft: false
---

Our Frontiers of Management Science Seminar looked into a study that grounded operational management analysis in real application:

> ## Capacity Investment in Renewable Energy Technology with Supply Intermittency: *Data Granularity Matters!*
>
> Hu et al., MSOM 2015
>
> ***ABSTRACT*** We study an organization’s one-time capacity investment in a renewable energy-producing technology with supply intermittency and net metering compensation. The renewable technology can be coupled with conventional technologies to form a capacity portfolio that is used to meet stochastic demand for energy. The technologies have different initial investments and operating costs, and the operating costs follow different stochastic processes. We show how to reduce this problem to a single-period decision problem and how to estimate the joint distribution of the stochastic factors using historical data. Importantly, we show that data granularity for renewable yield and electricity demand at a fine level, such as hourly, matters: Without energy storage, coarse data that does not reflect the intermittency of renewable generation may lead to an overinvestment in renewable capacity. We obtain solutions that are simple to compute, intuitive, and provide managers with a framework for evaluating the trade-offs of investing in renewable and conventional technologies. We illustrate our model using two case studies: one for investing in a solar rooftop system for a bank branch and another for investing in a solar thermal system for water heating in a hotel, along with a conventional natural gas heating system.

### motivation:

Nowadays, firms as consumers of electricity in general are willing to invest in installing renewable energy-generating technologies, such as solar and wind power to a portion of their energy needs. Incentives are (i) no matter out of genuine good will or environmental responsibility, or forced by government or public opinion whatsoever, firms takes 'sustainability' more seriously (ii) installing self-supplying energy-generating facilities off-set the risk of volatile electricity prices and save money in some way (iii) monetary incentives set by government, such as 'net energy metering (NEM) programs' that buys back surplus electricity (at a discounted price). Starting from here, the paper want to look at when and how is the optimal way of investing in these energy-generating technologies facilities.

### model

Consider the simplest setting where the firm plans a one-time investment $k$  renewable energy facilities, i.e. $k$ solar panels, so as to serve stochastic energy demand $X_t$ over $t = 1, ..., T$ periods. Investment cost per facility is taken as $v$, including the insurance and maintenance cost of the energy facilities, so the total investment cost is $vk$​.

The effective generated capacity by the facilities in any period is random to account for supply intermittency: denote the yield rate in period $t$ by $\Lambda_t\in [0, 1]$, so the effective electricity generated in period $t$ is $\Lambda_t k$. Let $w$ be the unit operating cost (which is usually taken as negative sometimes to reflect the government's tax credit for generating renewable energy). NEM compensation (i.e. government buy back extra produced energy) is credited at at rate of $M_t$ per unit (say, kWh). If there is unmet demand in any period, the firm can source energy from the spot market at a random cost $P_t$.

Denote $\mathbf Y_t = \{X_t, \Lambda_t, M_t, P_t\}$ as the vector of stochastic process, total operating cost to meet at period $t$ is
$$
C(k; \mathbf Y_t) = \underbrace{w\Lambda_t k}_{\text{generated power}} + \underbrace{P_t(X_t - \Lambda_k)^+}_{\text{purchased power}} - \underbrace{M_t(\Lambda_k - X_t)^+}_{\text{sold surplus power}}
$$
The firm's cost-minimization problem is then
$$
\min_{k} \mathcal C(k) = \sum_{t = 1}^T \delta^{t-1}\mathbb E_{Y_t} [C(k; \mathbf Y_t)] + vk
$$

#### conversion to a single-period problem

If takes $T = 1$, the above optimization reduces to a variant of the standard ***newsvendor model***. In our case, for general $T$, we can convert the problem to single-period because the linearity of the cost structure as well as once investment decision $k$ is made, it's fixed over all periods. Adios to Dynamic Programming. The idea is, normalize by $\Delta_T = \sum_{t = 1}^T \delta^{t -1}$ and treat every time-discounting factor $\delta^{t - 1}$ as the distribution weights over $\mathbf Y_t$, yielding another distribution $\mathcal Y$, and the cost equals to
$$
\mathcal C(k) = \mathbb E_{\mathcal Y} [C(k; \mathcal Y)] + \frac v{\Delta_T} k
$$
And the rest can be solved via newvendor variation.

### application and insights

tmrw



Our Frontiers of Management Science Seminar looked into a study that grounded operational management analysis in real application:

> ## Capacity Investment in Renewable Energy Technology with Supply Intermittency: *Data Granularity Matters!*
>
> Hu et al., MSOM 2015
>
> ***ABSTRACT*** We study an organization’s one-time capacity investment in a renewable energy-producing technology with supply intermittency and net metering compensation. The renewable technology can be coupled with conventional technologies to form a capacity portfolio that is used to meet stochastic demand for energy. The technologies have different initial investments and operating costs, and the operating costs follow different stochastic processes. We show how to reduce this problem to a single-period decision problem and how to estimate the joint distribution of the stochastic factors using historical data. Importantly, we show that data granularity for renewable yield and electricity demand at a fine level, such as hourly, matters: Without energy storage, coarse data that does not reflect the intermittency of renewable generation may lead to an overinvestment in renewable capacity. We obtain solutions that are simple to compute, intuitive, and provide managers with a framework for evaluating the trade-offs of investing in renewable and conventional technologies. We illustrate our model using two case studies: one for investing in a solar rooftop system for a bank branch and another for investing in a solar thermal system for water heating in a hotel, along with a conventional natural gas heating system.

### Motivation:

Nowadays, firms, as general consumers of electricity, are increasingly willing to invest in installing renewable energy-generating technologies, such as solar and wind power, to fulfill a portion of their energy needs. Incentives include (i) genuine goodwill or environmental responsibility, or pressures from government or public opinion that lead firms to take 'sustainability' more seriously (ii) installing self-supplying energy-generating facilities to offset the risk of volatile electricity prices and save money in some way (iii) monetary incentives, such as government-sponsored 'net energy metering (NEM) programs,' which buy back surplus electricity at a discounted price. This paper explores the optimal methods for investing in these technologies.

### Model:

Consider the simplest setting where the firm plans a one-time investment $k$ in renewable energy facilities, i.e., $k$ solar panels, so as to serve stochastic energy demand $X_t$ over $t = 1, ..., T$ periods. The total investment cost per facility, $v$, includes insurance and maintenance, amounting to $vk$ for $k$ facilities.

The effective capacity of the facilities in any period is variable, accounting for supply intermittency: denote the yield rate in period $t$ by $\Lambda_t\in [0, 1]$, so the effective electricity generated in period $t$ is $\Lambda_t k$. Let $w$ be the unit operating cost (which is usually taken as negative sometimes to reflect the government's tax credit for generating renewable energy). NEM compensation (i.e., government buyback of extra produced energy) is credited at a rate of $M_t$ per unit (say, kWh). If there is unmet demand in any period, the firm can source energy from the spot market at a random cost $P_t$.

Denote $\mathbf Y_t = \{X_t, \Lambda_t, M_t, P_t\}$ as the vector of stochastic processes, total operating cost to meet demand at period $t$ is
$$
C(k; \mathbf Y_t) = \underbrace{w\Lambda_t k}_{\text{generated power}} + \underbrace{P_t(X_t - \Lambda_t k)^+}_{\text{purchased power}} - \underbrace{M_t(\Lambda_t k - X_t)^+}_{\text{sold surplus power}}
$$
The firm's cost-minimization problem is then
$$
\min_{k} \mathcal C(k) = \sum_{t = 1}^T \delta^{t-1}\mathbb E_{Y_t} [C(k; \mathbf Y_t)] + vk
$$

#### Conversion to a Single-Period Problem:

By setting $T = 1$, we reduce the optimization to a variant of the standard newsvendor model. For general $T$​, we convert the problem to a single-period model due to the cost structure's linearity and the fixed nature of the investment decision across all periods. Adios to Dynamic Programming. The idea is, normalize by $\Delta_T = \sum_{t = 1}^T \delta^{t -1}$ and treat every time-discounting factor $\delta^{t - 1}$ as the distribution weights over $\mathbf Y_t$, yielding another distribution $\mathcal Y$, and the cost equals to

$$
\mathcal C(k) = \mathbb E_{\mathcal Y} [C(k; \mathcal Y)] + \frac v{\Delta_T} k
$$
Subsequently, the problem can be addressed using a variation of the newsvendor model.

### Application and Insights:

*(This section is currently being developed.)*
