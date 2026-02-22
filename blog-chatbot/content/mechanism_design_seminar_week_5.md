---
title: "mechanism design seminar notes | week 5"
date: 2024-10-16T17:17:46+08:00
draft: false
---

Something interesting happened in today’s seminar course. One of my classmates presented his final paper, and as expected in a seminar setting, our instructor, Hu Fu, wants everyone to stay engaged and understand what’s being discussed. Today's presenter had clearly prepared and read the paper but had no clue how to structure an academic talk. He skipped all the basics—no background, no context of the model provided—and jumped straight into the technical details. Naturally, no one understood a thing. So after the first few minutes, most of the audience zones out, especially once the technical parts hit.

And that’s not just in seminars. Even in formal conferences, where the speakers are often professors or experienced grad students, you still lose most of the audience by the technical deep dive. Now, imagine the same situation in an undergrad seminar. 

Hu Fu, not one to waste anyone’s time, came up with a clever new scoring rule system. After each talk, he randomly picks students to answer questions about the paper, and their responses affect their final grade. This incentivizes us to pay attention and ask questions while also forcing the presenter to focus on the whole audience, not just the instructor. It’s a smart way to keep everyone on their toes and engaged.

Only works in a class small enough to pull it off though.

Now, onto today’s content—a forty-minute presentation on revenue-maximizing auctions.

## Background:

Roger Myerson’s 1981 paper introduces a classic setting:

- One item, one seller, $n$ buyers.
- Buyers have value distributions $v_i \sim F_i(\cdot)$. Distributions are public knowledge, but their actual values are private to the buyers themselves.
- The seller is focused on maximizing profit (cost normalized to zero), and buyers care about quasi-linear utility.

### Remark: an academic ***milieu***

**Myerson's setting isn’t the only problem setting out there.** When mechanism design flourishes with many valuable contributions around the era. Myerson’s work just happens to be the brightest star among them, but the broader body of research might be interesting and important.

### back to technicals...

On top of the setting, an allocation and payment outcome can be denoted as follows:
$$
\vec x = (x_1, x_2, \ldots, x_n),\\
\vec p = (p_1, p_2, \ldots, p_n).
$$
A mechanism in this context, is defined by the allocation/payment rule. Let the value vector for all buyers be $\mathbf v$. We write
$$
x_i(\mathbf v), p_i(\mathbf v)
$$
as the allocation and payment for buyer $i$ when all buyers' prices are $\mathbf v$. Correspondingly, buyer $i$'s (quasi-linear) utility would be
$$
v_i x_i(\mathbf v) - p_i(\mathbf v).
$$

### incentives

If buyer's value are private, the mechanism needs to be strategy-proof, define as

**Def.** Ex post Individual Rationality (IR):
$$
v_i x_i(\mathbf v) - p_i(\mathbf v)\ge 0.
$$
**Def.** Dominant Strategy Incentive Compatible (DSIC):
$$
\forall v_i, v_i',\quad v_i x_i(\mathbf v) - p_i(\mathbf v)\ge v_i x_i(v'_i, \mathbf  v_{-i}) - p_i(v'_i,\mathbf  v_{-i}).
$$
And its relaxations:

Given mechanism $\vec x, \vec p$, let
$$
x_i(v_i) := \mathbb E_{\mathbf v_{-i}}[x_i( v_i, \mathbf v_{-i})],\\
p_i(v_i) := \mathbb E_{\mathbf v_{-i}}[p_i( v_i, \mathbf v_{-i})]\\
$$
**Def** Interim Individual Rationality
$$
\forall v_i,\quad v_i x_i(v_i) - p_i(v_i)\ge 0
$$
**Def** Bayesian Incentive Compatible (BIC)
$$
\forall v_i, v_i',\quad  v_i x_i(v_i) - p_i(v_i)\ge v_i x_i(v'_i) - p_i(v'_i)
$$

## Myerson's optimal mechanism

Take BIC constraint (and exchange $v_i, v_i'$):
$$
v_i x_i(v_i) - p_i(v_i)\ge v_i x_i(v'_i) - p_i(v'_i)\\
v'_i x_i(v'_i) - p_i(v'_i)\ge v'_i x_i(v_i) - p_i(v_i)
$$
Simply add up the above inequalities:
$$
(v_i - v_i') (x_i(v_i) - x_i(v_i'))\ge 0
$$
So this implies, **BIC allocation requires $x_i(\cdot)$ be monotone.**

Manipulate BIC constraint in another way we have
$$
v_i'(x_i(v_i) - x_i(v_i'))\le p_i(v_i) - p_i(v_i')\le v_i(x_i(v_i) - x_i(v_i')).
$$
WLOG assume $v_i - v_i' > 0$, divide the above inequalities all by $v_i - v_i'$:
$$
v_i'\frac{x_i(v_i) - x_i(v_i')}{v_i - v_i'}\le \frac{p_i(v_i) - p_i(v_i')}{v_i - v_i'}\le v_i\frac{x_i(v_i) - x_i(v_i')}{v_i - v_i'}.
$$
Push $v_i \to v_i'$ we have
$$
p_i'(v_i) = v_i x_i'(v_i).
$$
So, given $x$ we can solve for $p$

> <u>**Corr.**</u> (Revenue equivalence) Given monotone $x_i(\cdot)$, its BIC payment is then also given by ***payment identity***:
> $$
> p_i(v_i) = v_i x_i(v_i) - \int_0^{v_i}x_i(z)\,\text{d} z + p_i(0).
> $$

**<u>Remark</u>** BIC -> $x(\cdot)$ monotone + payment identity. The vice versa is also true.

**<u>Remark</u>** BIC seems to have correspondence with Bayes Nash Equilibrium (BNE). If, in a BNE of another mechanism, the allocation is the same as some $\vec x$ for BIC, the mechanism's payment should be the same as induced by BIC mechanism's payment identity.

### spoiler alert:

Back to max. revenue:
$$
\text{Rev} = \mathbb E_\vec v\left[\sum_i p_i(v_i)\right] = \mathbb E_\vec v\left[x_i(v_i) (v_i - \frac{1 - F_i(v_i)}{f_i(v_i)})\right].
$$
And, the last thing is to discuss, if $v_i - \frac{1 - F_i(v_i)}{f_i(v_i)}$ is monotone, and if not how to do so-called 'ironing'.

### some last thinkings:

One particular hovering question is, if $F_i(v_i)$ is not continuous, or if $f_i(v_i) = 0$ at some non-zero-measure sets, what do we do? Most results still holds but I wonder where would we need extra care in handling the maths, and where should we be extremely careful.
