---
title: "online matching II | the randomized ranking algorithm"
date: 2024-11-20T09:30:18+08:00
draft: false
---

Continuing the discussion on online matching algorithms, the first post [here](/posts/online_matching/) discussed the **online bipartite matching** model and a greedy (deterministic) algorithm that achieves a 1/2-competitive ratio.

Today, we explore randomized algorithms for the **online bipartite matching** problem:

{{<figure align="center" src="/online/online_matching_model.jpeg" caption="Stealing a page from Professor Tang's slide. One side of the bipartite graph is fixed and known in advance, the other side with edges arrives one-by-one in an online fashion." width="100%">}}

Upon the arrival of every online node, a decision must be made immediately and irrevocably: should this new node connect to one of the available nodes on the fixed side?

The objective is to maximize the number of matches. We study the competitive ratio (the worst-case ratio over ***any graph*** and ***any arrival order***):
$$
\inf_{\text{instances}}\frac{\text{ALG}}{\text{OPT}}.
$$

---

### randomized algorithm

The first randomized algorithm that comes to mind is likely:

> **Algorithm `Random`**: Match any online node to its available neighbors ***uniformly at random***.

Unfortunately, this is still 1/2-competitive, as illustrated in the following example:

{{<figure align="center" src="/online/random_counter_example.jpeg" caption="Stealing another page from Professor Tang's slide." width="100%">}}

So, thank you, next: Karp, Vazirani & Vazirani (1990) proposed the `Ranking` algorithm. Devanur, Jain, and Kleinberg later provided a beautiful analysis of its competitive ratio.

> **Algorithm `Ranking`**: Randomly rank the offline vertices. Then match any online node to its available neighbors with the smallest rank.

----

### analysis of `Ranking`'s competitive ratio | lower bound

First, we can reformulate the `Ranking` algorithm's randomization (randomly ranking the offline vertices) equivalently as:

- For each offline vertex $ v $, draw $ y_v \sim U[0, 1] $ independently. Refer to $ y_v $ as the ***rank*** of $ v $. (Notice that this is equivalent to a random permutation.)
- Upon the arrival of $ u $, match it to the (unmatched) neighbor with the smallest rank.

Next, we analyze the algorithm's performance (i.e., number of matches) using a 'Gain Sharing' approach. Fix a non-decreasing function $ g:[0, 1]\to[0, 1] $:  

If online vertex $ u $ matches offline vertex $ v $ upon $ u $'s arrival, for match $ (u, v) $:

- Let $ u $ gain $ a_u = 1 - g(y_v) $, and
- Let $ v $ gain $ a_v = g(y_v) $.

The plan of the proof is to show that for every edge $ (u, v) $ and competitive ratio $ \Gamma $:
$$
\mathbb{E}[a_v + a_u] \geq \Gamma.
$$
Then,
$$
\mathbb E[\textbf{ALG}] = \sum_{(uv)\in E}\mathbb E[x_{uv}] = \sum_{u}\mathbb E[a_u] + \sum_v \mathbb E[a_v] \ge \sum_{(uv)\in M^*}\mathbb E[a_v + a_u] \ge \Gamma \text{OPT}.
$$
----

### analysis of `Ranking`'s competitive ratio | upper bound

To upper bound the performance, we relax the problem to an easier ***fractional*** version, where edges can be fractionally matched. The fractional version is at least as good as the original problem.

> **Algorithm `Water-Filling`**: On the arrival of every online vertex, allocate its matches continuously to the least-matched neighbor.

`Water-Filling` achieves a 1 - 1/e competitive ratio, but an **Upper Triangle Instance** demonstrates that even the fractional version cannot exceed this bound (via Yao's Minimax).

{{<figure align="center" src="/online/Yao_upper_traingle.jpeg" caption="Stealing two more pages from Professor Tang's slide." width="100%">}}

---

### What's Next?  

The next post will discuss a recent paper exploring the **batched** version of this problem—where one side of the bipartite graph arrives in batches. The plot thickens but can be analyzed similarly. Stay tuned!  

***Remark:*** The primal-dual analysis is missing here. I’ll add that in a future post.

------

### reference

Professor Tang's lecture slides.

---

### proof: 1 - 1/e for `ranking`

$$
\mathbb{E}[\textbf{ALG}] = \sum_{(uv) \in E} \mathbb{E}[x_{uv}] = \sum_{u} \mathbb{E}[a_u] + \sum_v \mathbb{E}[a_v] \geq \sum_{(uv) \in M^*} \mathbb{E}[a_v + a_u] \geq \Gamma \cdot \text{OPT}.
$$

The first equality comes from the definition of a matching, the second equality comes from the gain sharing of the algorithm, the next inequality comes from dropping the edges in the $\textbf{ALG}$'s match that are not included in the optimal matching $M^*$; the last inequality comes from the assumed property $\mathbb E[a_v + a_u]\ge \Gamma$, and is the pivotal lemma we are about to prove:

> **[Lemma]** for every edge $(u, v)$ and the competitive ratio $\Gamma$
> $$
> \mathbb E[a_v + a_u]\ge \Gamma.
> $$
> Proof.
>
> We will prove by proving an even more stronger version: for $v$, fix $\vec y_{-v}$ and consider randomness of $y_v$:
> $$
> \mathbb E_{y_v}[a_v + a_u|\vec y_{-v}]\ge \Gamma.
> $$
> Looking at offline node $v$ and its rank $y_v$ (fix $\vec y_{-v}$), notice that the if-match state of $v$ is 'monotone' w.r.t. the change of $y_v$:
>
> - if $v$ is unmatched, increase $y_v$ does not change the matching;
> - if $v$ is matched, it is still matched when $y_v$ decreases (although to a different node perhaps).
>
> So there exists a threshold $\theta$ for $v$'s $y_v$ (w.r.t. fixed  $\vec y_{-v}$) that $v$ goes from 'unmatched' to 'matched' as $y_v$ decreases and passes this threshold.
>
> Now consider $u$—where the only condition we put on it is that there is an edge between $(u, v)$—but they are not necessarily matched.
>
> - When $y_v > \theta$ ($v$ is unmatched), then $u$ must have actively matched with another offline vertex $z$ with a lower rank, at which $u$ would get a higher 'sharing' than if it has ranked with $v$. In other words, $\forall y_v > \theta$,
>     $$
>     a_u = 1 - g(y_z) \ge 1 - g(y_v).
>     $$
>     And by taking $y_v = \theta^+$, there is $a_u \ge 1 - g(\theta)$.
>
> - Now, for $y_v < \theta$—for $u$, $a_u$ gets better than when $y_v > \theta$. This is nontrivial and requires some scribbling to formally demonstrate that. 
>
>     But an easy way you can form intuition for this is to imagine $v$ as items, $u$ as buyers and $g(y_v)$ as **price**—when price $y_v$ decreases, the buyer side only gets better off.
>
> Put together, for any $y_v$, $a_u\ge 1 - g(\theta)$. Therefore, take intergration of the expectation:
> $$
> \mathbb E[a_v + a_u]\ge 1 - g(\theta) + \int_0^\theta g(y_v)\, \text{d}y_v.
> $$
> By optimizing $g(\cdot)$ we get $g(x) = e^{x - 1}$ and we get
> $$
> \Gamma = 1 - g(\theta) + \int_0^\theta g(y_v)\, \text{d}y_v = 1 - \frac 1e.
> $$
> End of Lemma's proof.

With the Lemma, the proof is complete.
