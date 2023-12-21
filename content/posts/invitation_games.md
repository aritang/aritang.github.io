---
title: "invite and outwit"
date: 2023-12-21T20:28:22+08:00
draft: false
---

Game theory presents mindblowingly cute frameworks. Here's two captivating models that revolve around the concept of - ***invitation***.

### a market designer's dilemma

Imagine a seller with a valuable item and a crowd of potential buyers. Unlike a typical auction, these buyers have the unique ability to invite others outside the current circle to join in. For the seller, the ideal scenario a highly competitive market with as much participants as possible - where the item fetches the highest price. However, the buyers' incentives are misaligned, like, what if the new invitee values the item more highly and outbids the existing buyers? This risk creates a strategic tension, where buyers might be inclined to 'throw away the invitation' to protect their own chances.

Naturally, as u might have already imagined, some kind of compensation would be necessary. One potential solution in specific settings involves utilizing the Vickrey-Clarke-Groves (VCG) mechanism on each nodes on the invitation tree.

### another market designer's dilemma

The second model invites us into the realm of cooperative games. Consider an online setting where participants arrive in an unpredictable sequence. As the mechanism designer, we have a set function that value participants who joined, and we need to allocate **all** of the value, with no delay and no regret "subtraction" from the already-allocated amount, to every participants in the system. The challenge is to design a utility allocation scheme that encourages early participation – preventing strategies like 'waiting outside the door' – while also maintaining fairness.

This task is far from trivial, as it requires a delicate balance between incentivizing prompt involvement and ensuring that no participant feels shortchanged by the timing of their arrival.

### and... the starved undergrad's dilemma

These theoretical models find an interesting, if not perfectly aligned, reflection in the real world. Take, for example, a promotional strategy used by Meituan, a popular food delivery app:

{{<figure align="center" src="/new_plan/coupon.jpeg" caption="a promo of Meituan. the rule is that, on inviting one more friend to 'click' the link (and thus joining the collecting coupon game), one get a ¥2 increment on their own coupon. and u can imagine how viral it becomes once spread out.">}}
