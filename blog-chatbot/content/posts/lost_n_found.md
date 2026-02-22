---
title: "The Mitosis Pitch"
date: 2025-05-10T20:17:49+08:00
draft: false
---

There’s magic in every second of attention someone gives you—a formal presentation, a tea-break conversation—and even just any surprise opportunity to share your work, like in an elevator. Those seconds are precious. And often, the difference between being remembered and being forgotten is having a lovely pitch talk ready to go.

Here’s one I wrote and delivered—not for a conference or a stage, but for a small conversation that mattered. I found the script again after some time, and I still think it’s one of my favorite things I’ve written. It’s a little technical, a little passionate, and very much "me."

(Note: audience are super important. This snippet is intended for people familar in stochastic optimization (like MDPs))

> Food waste is a massive issue—while 1 in 7 people struggle to find food, up to 40% of our food supply is wasted.
>
> Food rescue organizations help bridge this gap by using volunteers to deliver surplus food from donors to people in underserved neighborhoods.
>
> Volunteer resources are limited, and their behavior is **unpredictable**. These organizations care about the **completion rates** of food rescue tasks. They need to maintain a pool of active volunteers consistently, so that every day, they can deliver food reliably.
>
> Moreover, existing algorithms often maximize the probability of a volunteer reacting—but this actually worsens **geographical disparities**. Some urban regions see up to **90% completion rates**, while certain suburban or rural areas drop to **40%**, leaving food unrescued.
>
> So we want to optimize not only **efficiency** (modeled as the match probability of volunteers) but also **fairness** across different regions.
>
> In our work, we **model volunteer engagement as a Restless Multi-Armed Bandit (RMAB) problem**. Each volunteer is like an arm of the RMAB. RMAB assumes each arm has a state—so it’s like each arm is a Markov Decision Process with binary actions. You pull arms subject to a **budget constraint** at each time point, optimizing the total collected reward.
>
> At the end of the day, in Bandit problems, the key question is: **which arms do you pull**? In classic MAB, the algorithm optimizes against **unknown parameters**. But in our setting, RMAB assumes **transition probabilities and rewards are known**—so we’re optimizing against the **dynamics** of the system.
>
> RMAB is a well-studied topic. Our theoretical contribution is to introduce **context** into the traditional RMAB framework. Then we proved that the traditional algorithm is **suboptimal**, even in the asymptotic regime.
>
> (To calculate the optimal way of pulling the arms is NP-hard—and we designed a **no-regret algorithm** called *Mitosis*.)
>
> I really like this paper because the theoretical analysis and algorithm design are **original**. It’s not like some CS research where you throw in who-knows-what techniques to squeeze out marginal performance on a niche benchmark. This is **grounded**, and **thoughtful**.
>
> We even have a fancy picture showing how our algorithm allocates food rescue volunteers:

{{<figure align="center" src="/complaints/AI4SG.pdf" caption="Red and blue show different donor regions, color indicates a region’s popularity, and the lines represent how volunteers are assigned. Some areas are well-covered, while others are barely connected. Our approach rebalances these assignments **dynamically**." width="100%">}}
