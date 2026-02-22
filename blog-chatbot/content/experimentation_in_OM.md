---
title: "Experimentation? Online Learning?"
date: 2025-03-31T23:54:54-04:00
draft: false
---

> Today at Columbia Business School's DRO PhD open house, a friend of mine from SJTU is really into something called "experimentation"—and introduced it to me. I found is somewhat echos online learning. But not entirely the same.

*Experimentation* in OR/OM means actively exploring different actions to learn about unknown factors, rather than passively using assumed parameters to optimize a system. This concept is central to **online learning** problems like multi-armed bandits and reinforcement learning. Algorithms balance **exploration vs. exploitation** to maximize cumulative reward.

Usually this framework uses the sequential decision making model—Markov or more generally, just multi-period models. And often, a successful algorithm minimizes **regret**. Regret is defined as the reward gap between the (optimal) reward obtained when the decision maker knows all the information vs. when the decision maker has to learn it on the go.

It's very natural that we want to be 'learning-while-excuting' in operations. For example, rather than merely optimizing on a fixed set of parameters estimated twenty years ago—why not update your knowledge along the way? Another thing, this paradigm provides a solution to the 'cold start' problem. When a decision maker starts with zero knowledge with the system that he works on, "experimentation" provides a sound way to properly tradeoff exploration and exploitation.

Online learning somewhat echos the philosophy of experimentation.

> Online learning represents an important family of machine learning algorithms, in which a learner attempts to resolve an online prediction (or any type of decision-making) task by learning a model/hypothesis from a sequence of data instances one at a time. The goal of online learning is to ensure that the online learner would make a sequence of accurate predictions (or correct decisions) given the knowledge of correct answers to previous prediction or learning tasks and possibly additional information. This is in contrast to many traditional batch learning or offline machine learning algorithms that are often designed to train a model in batch from a given collection of training data instances.
>
> SCH Hoi et al. 2018. Online Learning: A Comprehensive Survey. https://arxiv.org/abs/1802.02871
