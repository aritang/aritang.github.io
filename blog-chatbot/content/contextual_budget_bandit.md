---
title: "Contextual Budget Bandit for Food Rescue"
date: 2025-02-12T00:58:54+08:00
draft: false
---

A new paper is out: [Contextual Budget Bandit for Food Rescue](/files/ContextualBudgetBandit4FoodRescue_Arxiv.pdf).

{{<figure align="center" src="/complaints/AI4SG.pdf" caption="The picture shows volunteers and donation regions in real food rescue database. Region color indicates the richness of volun teer resource. Connected lines indicates how volunteers and real-time donation tasks are matched by food-rescue platforms." width="100%">}}

> ## **Abstract**
>
> Volunteer-based food rescue platforms tackle food waste by matching surplus food to communities in need. These platforms face the dual problem of maintaining volunteer engagement and maximizing the food rescued. Existing algorithms to improve volunteer engagement exacerbate geographical disparities, leaving some communities systematically disadvantaged. We address this issue by extending restless multi-armed bandits, a model of decision-making which allows for stateful arms, to incorporate context-dependent budget allocation. By doing so, we can allocate higher budgets to communities with lower match rates, thereby alleviating geographical disparities. To tackle this problem, we develop an empirically fast heuristic algorithm. Because such an algorithm can achieve a poor approximation when active volunteers are scarce, we design the **Mitosis** algorithm, which is guaranteed to compute the optimal budget allocation. Empirically, we demonstrate that our algorithms outperform baselines on both synthetic and real-world food rescue datasets, and show how our algorithm achieves geographical fairness in food rescue.

The Mitosis algorithm is cool, FYI.
