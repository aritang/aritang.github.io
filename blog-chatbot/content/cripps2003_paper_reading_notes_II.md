---
title: "Paper Reading Note | Strategic Experimentation with Exponential Bandits II"
date: 2025-03-13T22:56:12-07:00
draft: false
---

This is the second reading note of paper "***Strategic Experimentation with Exponential Bandits***", following the [previous post](/posts/cripps2003_paper_reading_notes/) that describes the single-agent basic model: a continuous two-armed bandit: one risky (R) arm + one safe (S) arm.

## Model: When There Are More Than One Agents

Players each have replica two-armed bandits. They share the same prior belief (over whether the Risky arm is good or bad), the same discount rate, and information is public. The risky arms' time thresholds are i.i.d..—In other words, the risky arm's 'good'/'bad' nature is the same among all agents. But every agent's threshold distribution might be realized differently.

## N-Player Cooperative Problem

When it is as assumed that all N players are stochastically identical, if players play cooperatively (maximizing total welfare), it is optimal for all players to play Risky arm or for none of them to do so (Lemma 3.1). There is a cut-off belief that is decreasing in $N$. When the real belief is above the cut-off value, all players play Risky arm. When the real belief drops below this cut-off, all players play Safe arm (Proposition 3.1).

## N-Player Strategic Equilibrium

Note that the model is continuous, and an agent's action is a parameterized function $[k_t], t\in [0, \infty)$—at every time point $t$ she choose to play one arm.

### Symmetric Equilibria

The solution concept considered is pure Markov perfect equilibrium. There is no pure strategy Markov perfect symmetric equilibrium (Lemma 4.1). All Markov perfect equilibria of the N-player-strategic-game are inefficient (Proposition 4.1). But the game does admit a unique symmetric mixed equilibrium (Proposition 5.1).

### Asymmetric Equilibria

There exists pure strategic (markov perfect) equilibrium that is **asymmetical**. The intuition is that, players switch roles between being the pioneer or the freerider (Proposition 6.1, 6.2). The welfare outcome of these assymetric equilibrium is better than that of the symmetric (mixed) equilibrium mentioned in Proposition 5.1.

The assymetric equilibrium achieves some kind of efficiency (the amount of experimentation performed in equilibrium approaches) as the number of ***switches*** goes to infinity.

## remarks

The Bandit-experimentation-learning model is really cool. Quote the paper: "exponential bandits will prove useful as building blocks for models with a richer structure.".
