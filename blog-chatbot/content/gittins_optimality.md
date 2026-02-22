---
title: "Gittin Index's Optimality Proof by the Prevailing Charge Argument from Weber (1992)"
date: 2025-06-05T23:21:34+08:00
draft: false
---

For the [discrete-time Bandit Process definition](/posts/hophop_gittins/), consider a total of $n$ of these discrete-time Bandit Processes. The state of the bandits are $x_1(t), \ldots, x_n(t)$. One arm is allowed to be pulled at each $t$. Taking action $a_j, j\in [n]$ corresponds to pulling arm $j$ and generate reward $R_j(x_j(t))$. The aim is to maximize total-discounted ($\beta < 1$) reward, given initial state $\vec x(0)$.

The Gittins Index Policy pulls the arm $j$ with the highest Gittins Index $\nu(x_j(t))$:
$$
a(t) = \arg\max_j \nu_j(x_j(t)),
$$
and is known to be optimal.

Weber gave a nontrivial and really elegant proof for the optimality of Gittins Index Policy in a 1992 10-page paper, via a "Prevailing Charge Argument".

### The *Prevailing Charge* Proof

Forget about how we used to define Gittin's index. Start by considering one arm $j$, imagine we charge a fixed constant amount for every pull. Starting at any state $x_j$, we define **fair charge** $\gamma_j(x_j)$ as the threshold level of this fix constant amount charged at which an (optimal) decision maker is indifferent between pulling/idling the arm. 

Note that the fair charge is well defined. ($-\infty$ charge->always pull, $\infty$ charge->never pull).

**Because arms don't change state when idled**—any time when it is optimal to stop you stop forever. Therefore, the optimal policy runned by a decision maker can be characterized by a stopping policy $\tau$. And the fair charge can be solved via:
$$
\begin{equation}
\gamma_j(x_j): = \sup\{\lambda: \sup_\tau\{\mathbb E[\sum_{t = 0}^{\tau - 1}\beta^t(R_j(x_j(t)) - \lambda)\mid x_j(0) = \gamma_j]\ge 0\}\}.
\end{equation}
$$
Now consider a process. The player starts at $x_i(0)$ and the charge for pulling the arm at each time point is set as $\gamma_j(x_j(0))$. The player plays until at some point $\tau$ he finds it better to stop:
$$
\gamma_j (x_j(0)) > \gamma_j (x_j(\tau)).
$$
Note that the process is generally like this: denote $\tau$ as the stopping time in (1),  the "fair charge" at each time $t = 1, \ldots, \tau -1$ is bigger than the charge set at the beginning.
$$
\gamma_j(x_j(t))\ge \gamma_j(x_j(0))
$$
If things just stop at $\tau$, the player gets $0$ utility (in expectation ex-ante at the start of period 0) as defined by $(1)$. But now if we lower the charge-per-pull to $\gamma_j (x_j(\tau))$, the player may continue to play and until he stops again—and by how we constructed fair charge, the player gets (ex-ante at time $\tau$ expected) zero utility once again.

So consider the process: For every single arm, starting at $x_j(0)$, initially set charge-per-pull as fair charge $\gamma_j(x_j(0))$. The player pulls the arm and until he stops at $\tau$, the charge is again set to $\gamma_j(x_j(\tau))$ where the player is indifferent between continuing pulling the arm vs. stops. Note every time the charge resets, it decreases. For the process, the player's optimal expected utility is zero.

Now pool all $n$ arms together. With a starting state $\vec x(0)$, initialize every arm with its fair charge $\gamma_j(x_j(0))$ and reduce it as above. **A player achieves optimal utility—zero—if she starts to play an arm until its charge is renewed.**

Denote as $Reward$ the total reward the player obtained from pulling the arms, and $Revenue$ as the charges. For any player's policy, the player's optimal policy yields utility 0:
$$
Reward - Revenue <= 0
$$
In this prevailing charge game, the optimal revenue we charge from the player is obtained when he plays the arm with the highest charge. The player achieves $Reward = Revenue$ if she plays an arm until its charge is renewed. 

By starting from the highest charged arm, $Revenue$ is maximized. As it's an upperbound for $Reward$—$Reward$ is maximized by reaching the upperbound $Revenue$. The player starts playing the highest charged arm $j$ and doesn't switch until $\gamma_j(x_j(t))<\gamma_j(x_j(0))$—because arm $i$'s charge $\gamma_j(x_j(0))$ is the initial highest charge among all arms, when arm $j$ is played for $t = 1, \ldots, \tau - 1$ before it stops it's guaranteed that $\gamma_j(x_j(t))\ge\gamma_j(x_j(0))$ and remain the highest charge.

This concludes the proof. And $\gamma_i(\cdot)$ is indeed the Gittins Index we're looking for.

### Reference

Professor R. Kleinberg has a slides about this proof's high level idea ([link](https://www.cs.cornell.edu/courses/cs6840/2017sp/lecnotes/6840sp17R_Kleinberg.pdf)). There's also a version of the proof in the book "Multi-armed Bandit Allocation Indices (2011)" by Gittins, Glazebrook and Weber ("Theorem 2.1 The index theorem for a SFABP"). But Weber's 1992 original paper (On the Gittins Index for Multiarmed Bandits) is a better reference. All subsequent paraphrases seem somewhat intended for people who already comprehended the proof...

Further reading: A Short Proof of the Gittins Index Theorem. Tsitsiklis (1994)
