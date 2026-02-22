---
title: "Matrix Estimation by Universal Singular Value Thresholding"
date: 2025-07-22T23:59:26+08:00
draft: false
---

I first encountered matrix completion duing undergrad in Advance Operations course. So I thought it was history well-solved problem. Turns out well, amazing papers still emerge over the past years:

> ## Matrix Estimation by Universal Singular Value Thresholding (USVT)
>
> Sourav Chatterjee *The Annals of Statistics* (2015)
>
> Consider the problem of estimating the entries of a large matrix, when the observed entries are noisy versions of a small random fraction of the original entries. This problem has received widespread attention in recent times, especially after the pioneering works of Emmanuel Cand`es and collaborators. 
>
> This paper introduces a simple estimation procedure, called Universal Singular Value Thresholding (USVT), that works for any matrix that has “a little bit of structure.” Surprisingly, this simple estimator achieves the minimax error rate up to a constant factor. The method is applied to solve problems related to low rank matrix estimation, blockmodels, distance matrix completion, latent space models, positive definite matrix completion, graphon estimation and generalized Bradley–Terry models for pairwise comparison.

The method is extremely straightforward: suppose the matrix is $M$, in shape $m\times n$ with $m < n$. Its observed entries are $X$ (*Note*: observation $X$ may have noise factor added). USVT estimator is obtained by:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/usvt_provess.jpeg" caption="First half USVT — thresholding and throw away the too-small singular values." width="100%">}}

Basically, singular values are discarded up to a universal threshold *independent* of the matrix. And the estimator $\hat M$ ($\hat m_{ij}$) is obtained from:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/usvt_provess1.jpeg" caption="" width="100%">}}

The intuition is, singular value thresholding (i) maintains the key info for recovering the matrix while (ii) filter out the noise.

### (Some of the) Main Results:

First theorem links the MSE error with the nuclear norm of $M$ ($\|M\|_*$) (the sum of singular values).

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/usvt_theorem1.jpeg" caption="Half of Theorem 1 from Chatterjee (2015). The bound can be improved if variance of the noisy observation $X$ is known." width="100%">}}

There's also a minimax lower bound that matches the upperbound for the estimator. I'll cover the details of the math later :)

### Notes on why it's worth reading (and going over all the technical details)

The USVT method requires minimal assumptions — unlike many matrix completion methods that require strong structural conditions (like exact low rank, incoherence, or specific noise models), this paper's method **assumes only that each entry is observed independently with a fixed probability $p$**. And the estimator is simple—just a singular value decomposition followed by thresholding.

Second, the result is strong and useful. the MSE bound provided connects the *estimation accuracy* (which is the expectation of random variable) directly to the *nuclear norm* $\|M\|_*$ related to the OG matrix. Linking a probabilistic notion (an important one) of error (MSE) to a geometric property (nuclear norm) makes the method analytically useful. And it's simple.
