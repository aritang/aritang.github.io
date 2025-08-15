---
title: "Two-Stage Matrix Completion"
date: 2025-08-12T23:34:37+08:00
draft: false
---

Here's one more interesting matrix completion paper:

> ## Matrix Completion from Non-Uniformly Sampled Entries
>
> Yuanyu Wan, Jinfeng Yi, Lijun Zhang  https://doi.org/10.48550/arXiv.1806.10308
>
> we assume that a small number of columns are randomly selected and fully observed, and each remaining column is partially observed with uniform sampling. To recover the unknown matrix, we first recover its column space from the fully observed columns. Then, for each partially observed column, we recover it by finding a vector which lies in the recovered column space and consists of the observed entries. When the unknown m×n matrix is low-rank, we show that our algorithm can exactly recover it from merely Ω(rnlnn) entries, where r is the rank of the matrix.
