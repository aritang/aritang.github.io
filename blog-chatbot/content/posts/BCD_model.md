---
title: "BCD model"
date: 2023-09-27T23:38:10+08:00
draft: false
cover:
    image: complaints/Subway_Senior_Watching_Phone.jpg
summary: i was like, what in the world is this?! anyway here's the model. without literature review or intro.
---

For at least a solid ten times this week, I found myself wearing a perplexed expression, wondering, "What in the world is this?!" The act of delving into academic papers is a far cry from the pleasurable stroll through a well-structured textbook. Textbooks are crafted with care, replete with illustrative examples seamlessly connecting theorems and impeccably arranged content. Papers, on the other hand, can be nasty, even downright brutal. Some of them, at least.

Especially economists' papers, and particularly when they engage in heated debates, discussing various models named after individuals whom they themselves taken for granted. It's a barrel of laughs to witness their fervent arguments over settings, all while casually tossing out claims like, "Oh, our model is merely a generalization of his, hers, and theirs, and that other one? Well, it's just a trivial limiting case of ours."

Totally respect for their tireless passion and spectacular efforts...

### Here's the model (who needs a literature review anyway?)

$n$ single-product firms, $L$ consumers. For each $l\in [L]$ consumer and $i\in [n]$ firm's product, it incurs pairwise utility:
$$
u_{li}(p_i) =\mu \epsilon_i - p_i
$$
where $\epsilon_i$ is randomly drawn out of distribution $F$, same among every firm and assume its density function $f$ has support $[a, b]$.

There is search cost $c$. Before search consumer only has a prior assumption on firm's price charge. After using search cost and visit, consumer realize his utility $u_{li}$ and the firm's charge $p_i$. All consumers are unit demand and can choose to either buy/no-buy and quit or continue searching. Consumer's overall utility in a buying process is
$$
u_{li}(p_i) -kc, \text{ searched }k \text{ times}
$$
Firms sought to maximize their sales revenue, i.e. denote $D(p_i, p_{-i})$ as the demand of firm $i$ (if, in this chaotic market, such a well-defined demand even exists), its revenue can simple be found as $p_i D(p_i, p_{-i})$. In the series of work that I followed, they only considered **symmetric equilibria**, in other words, consumers expect all firms charge the same price $p^*$. 

As for a **detailed analysis** of this complex concoction, well, let's leave that for tomorrow, shall we? Goodnight for now. Wanna guess whose model is this? I'll put up reference, maybe later tmrw. Bite me.

