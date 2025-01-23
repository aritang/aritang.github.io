---
title: "design of twitter's Birdwatch mechanism"
date: 2025-01-22T20:43:29+08:00
draft: false
---

Here's an interesting paper about crowdsourcing annotation of tweets. Given a twitter post containing possibly misleading information, the ***Birdwatch*** project aims to crowdsource comments on the OG tweet. One problem is to choose among the annotations ***one*** most credible annotation to display.

> ### Birdwatch: Crowd Wisdom and Bridging Algorithms can Inform Understanding and Reduce the Spread of Misinformation
>
> Stefan Wojcik et al. [Arxiv link.](https://arxiv.org/abs/2210.15723)

## Background

So, about Birdwatch:

{{<figure align="center" src="/google_ad_gossip/twitter_birdwatch.jpeg" caption="Birdwatch is Twitter's community-driven approach to identify misinformation. It encourages users add informative clarification notes to Tweets." width="66%">}}

To be exact, for a potentially problematic tweet, users may (i) write ***notes*** for the tweet or (ii) rate the ***notes***'s helpfulnes. Then, for a single tweet, in place of multiple notes, there needs to be an algorithm to select one note to display to all users along with the tweet, as the informative 'complement' to the OG tweet.

Remark: this Birdwatch note does NOT affect the recommendations of the OG tweet.

The problem comes to defining objective, or evaluating the algorithm's outcome. So which such note would be an ideal recommendation? Especially in terms of highly polarized opinion battlefield like Twitter, this could be complicated:

> Identifying notes that satisfy both aims is a challenge. For instance, some well-sourced notes may be seen as unhelpful because they are poorly written, or because they use language that may be perceived as biased or argumentative... Similarly, notes with weak sourcing, or without a strong factual basis, may appeal to people by invoking taken-for-granted ideas or assumptions...
>
> **A core challenge for Birdwatch, then, is to identify notes which not only contain accurate, high quality information, but are also written in a way that is likely to resonate with broad audiences, not just those who are already inclined to agree.**

The algorithm designed (termed as "matrix factorization (MF) algorithm") balances interpretability and practicality:

## The Algorithm

The paper is written in Econ terminologies. How about a CS version? Here it is:

### input

> user-***note*** wise (sparse) rating matrix [$r_{u, n}$], where subscript $u$ denote user and $n$ note. Each rating $r_{u, n}$ takes three possible values: $0$ (not useful) $1$ (useful) or null (not rated).

### step 1: fit an initial model

Given this large zero-one sparse matrix as input, the algorithm basically first fit a model, assuming that each rating is powered by
$$
\hat r_{u, n} = \mu + i_u+ i_n + f_u\cdot f_n
$$
($\mu$ is global intercept, $i_u, i_n$ are user/note's specifc intercept. $f_u, f_n$ are feature vectors of user and notes whose product also contribute to rating outcomes (which, btw seems to be scalers).)

> To estimate the parameters, the authors minimize the following regularized least squared error loss function via gradient descent over the dataset of all observed ratings $r_{u, n}$ :
>
> {{<figure align="center" src="/google_ad_gossip/birdwatch_function1.jpeg" caption="from the paper" width="100%">}}
>
> Where, $\lambda_i$ (0.15), the regularization on the intercept terms, is currently 5 times higher than $\lambda_f$ (0.03), the regularization on the factors.

Among the fitted parameters, the note's intercept—$i_n$—indicates a note's independent value. The paper then assigns a first-stage-label to notes by $i_n$'s value:

- $0.4 \le i_n$: helpful.
- $-0.08\le i_n \le 0.4$: needs more ratings.
- $i_n \le -0.08$: not helpful.

### step 2: filter raters and note writers

- Filter raters:

    - Define *Rater Helpfulness* as the proportion of a rater’s “valid ratings” that match the note’s provisional label.
    - Define *Valid Ratings* as ratings on notes provisionally labeled “helpful” and “not helpful” (excluding "needs more ratings").

    Raters are discarded if their rater helpfulness is below 2/3.

- Filter note writers:

    > if a user did author any notes that have received at least 5 ratings, that user must meet the following criteria for their ratings to be included:
    >
    > - The number of provisionally “helpful” notes written must be at least 5 times the number of “not helpful” notes written
    > - The average intercept of all notes they have written must be at least 0.05.

    Btw, this note-writer filter sounds like a heuristic reputation system to proof against chunk manipulation of note ratings.

### step 3:

Fit the same model (in step 1) again, but using the filtered raters and note writers' notes. And use the newly fitted note's intercept $i_n$ and the threshold (-0.08, 0.4) to classify (not-)helpfulness.

### Evaluation

Users are sampled and recruited on the Twitter platform to conduct surveys. 

- Control group: respondents were shown Tweets alone.

- Treatment group: Tweets plus annotations.

    > Each respondent in the treatment and control groups was asked whether they thought the Tweet they saw was accurate, whether they agreed with a statement summarizing the main claim of the Tweet, and whether they agreed with a statement summarizing the main claim of the note.

- Evaluation group: Tweets plus annotations but a different questionnaire

    > Each respondent in the evaluation group was asked whether they found the annotation to be helpful or unhelpful for understanding the issue discussed in the Tweet. Each of these key dependent variables is measured on a five-item ordinal scale, plus a “don’t know” option. Respondents were also free to skip any question.

The result section discussed evaluation of the algorithm's outcome, and discussion around three questions:

- RQ1: Can we select a set of Birdwatch notes that both inform understanding (decrease propensity to agree with a potentially misleading claim) and are seen as helpful by a diverse population of users (in particular, users with diverse self-reported political affiliations)? Does algorithmic selection achieve these better than a supermajority voting baseline?
- RQ2: How closely related are appraisals of the accuracy of a Tweet and agreement with a Tweet’s claims? Can appraisals of the accuracy of a Tweet reliably be used as proxies for agreement with a Tweet’s claims?
- RQ3: Can crowd-generated Tweet annotations reduce the spreadof potentially misleading information on Twitter? Does exposure to Tweet annotations reduce retweeting and "Liking" behavior compared to users who do not see annotations?
