---
title: "the beta distribution"
date: 2024-06-11T23:31:09+08:00
draft: false
---

> The Beta distribution is a versatile and useful probability distribution with a wide range of applications in statistics, particularly when associated with modelling unknown **probabilities** and doing Bayesian inference. Here's a brief overview:

## definition

The Beta distribution, denoted as $ \theta \sim B(\alpha, \beta) $​, is defined by two shape parameters $ \alpha $​ and $ \beta $​. The probability density function (pdf) of the Beta distribution is given by: 
$$
f(\theta) = \frac{\theta^{\alpha - 1}(1 - \theta)^{\beta - 1}}{\int_0^1 x^{\alpha - 1}(1 - x)^{\beta - 1} dx}
$$
where $ \theta $​ lies in the interval $[0, 1]$​.

## properties

The Beta distribution has several attractive properties that make it widely used in practice: 

1. **Supported on $[0,1]$**:   

    The Beta distribution is defined on the interval $[0, 1]$, making it suitable for modeling probabilities and proportions. 

2. **Quite General**:

    It is a flexible distribution that can take various shapes depending on the values of $ \alpha $ and $ \beta $. It can model uniform, U-shaped, or even skewed distributions.

    {{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/info_design/betas.jpeg" caption="pdf for different $\alpha, \beta$ values.">}}

3. **Convenient Bayesian Update**:

    One of the most important properties of the Beta distribution is its conjugacy with the Bernoulli and Binomial distributions. This means that if the prior distribution of a parameter $ \theta $ is Beta, then the posterior distribution, after observing data, will also be a Beta distribution. 

## bayesian update with beta distribution 

In a Bayesian framework, we often start with a prior belief about a parameter and update this belief after observing data. The Beta distribution's conjugate property simplifies this update process. Given an unknown parameter $ \theta_i $ with a prior distribution $ \theta_i \sim B(\alpha_i, \beta_i) $, we can update our belief after observing the outcome of an experiment $ x^t $. 

- **Posterior Distribution After Success ($ x^t = 1 $)**:  $$ \theta_i \mid x^t = 1 \sim B(\alpha_i + 1, \beta_i) $$ 
- **Posterior Distribution After Failure ($ x^t = 0 $)**:  $$ \theta_i \mid x^t = 0 \sim B(\alpha_i, \beta_i + 1) $$ This property is particularly useful when working with binary outcomes (success/failure). The Beta distribution allows us to conveniently update our beliefs about the probability of success as we observe more data.

## at last, a generalization: the Dirichlet distribution

The Dirichlet distribution is a generalization of the Beta distribution to multiple variables. It is particularly useful in Bayesian statistics for modeling the probabilities of a multinomial distribution, sharing the conjugate prior property with the Multinomial distribution.

The Dirichlet distribution with parameters $\alpha_1, \alpha_2, \ldots, \alpha_K$ is defined as:

$$
f(\theta_1, \theta_2, \ldots, \theta_K) = \frac{1}{B(\alpha)} \prod_{i=1}^K \theta_i^{\alpha_i - 1}
$$

where $ \theta_i \geq 0 $ for all $i$ and $ \sum_{i=1}^K \theta_i = 1 $, and $ B(\alpha) $ is the multivariate Beta function:

$$
B(\alpha) = \frac{\prod_{i=1}^K \Gamma(\alpha_i)}{\Gamma\left(\sum_{i=1}^K \alpha_i\right)}
$$
