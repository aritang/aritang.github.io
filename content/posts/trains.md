---
title: train timetabling problem
date: 2023-10-10T18:37:39+08:00
draft: false
cover:
    image: data_vis/spiderman.jpeg
summary: just for fun but it turns out to be more than fun. i attended an introductory talk on train scheduling in the neighboring department. Here are some key takeaways
---

Apologize for the deviation from my work this afternoon, I attended an introductory talk on train scheduling in the neighboring department. Here are some key takeaways:

This problem is known as the high level "**train timetabling problem**" (TTP) and lower level intermediate "**train platform problem**" (TPP). This is not just a profitable business, but a complex issue that affects the welfare of millions of travelers. The primary objectives here are **service level, operational cost, safety issue**. The challenge lies in the sheer scale of the problem, with huge number of complicated constraints to consider, model and solve, encompassing both the train timetabling problem (TTP) and the train platform problem (TPP). Unlike metro planning, where trains uniformly stop at every station, the complexity of train scheduling arises from the multitude of schedules and train types and the various specific issue related to, well, driving such high-speed vehicle.

{{< figure align="center" src="/data_vis/spiderman.jpeg" caption="it's like planning your daily schedule. it's OK to test and hypothetically picture exploding the deadlines. but you'll have to get the shits done no matter what" >}}

Interestingly, this morning, I was listening to a podcast about the operational and revenue management of airline companies, and now, in the afternoon, we're delving into trains. It's noteworthy that OR/OM thrive in hyper-scale industries. The less human interest a problem generates and the more mundane it appears, the greater the room for profit through automated optimization.

Naturally, this problem leads to Mixed-Integer Programming (MIP). One approach to optimization is the Job Shop model, which the schedule in a natural manner, optimizes from the highest level and then sends the schedule to each station to assess feasibility at a more intermediate scale. During this stage, additional low-level constraints are integrated into the system. This algorithm iteratively schedules one train at a time until all more than five hundred trains are accommodated.

Another approach is the space-time network model, which discretizes time and space into vertices and examines variables from a different perspective. This offers a more intuitive representation, particularly from a graph theory standpoint, making it easier and more natural to represent the constraints. However, it can become quite challenging when finer time units, such as transitioning from per minute to per second, are required.

In this second method, the use of binary variables reusults in explosively large set of constraints, rendering it impossible for any commercial solver to handle efficiently. The trick here involves assigning weights and penalties to violated constraints, effectively transforming the problem into a shortest path problem. Ultimately, a heuristic is employed to approximate a feasible optimal solution. Btw, the heuristic prioritizes faster trains initially and then accommodates slower trains in the schedule.

In the high-level Train Timetabling Problem (TTP), the COPT solver efficiently addresses the issue within a mere 20 minutes. When it comes to the intermediate Train Platform Problem (TPP), the solver requires approximately 2 hours to find a solution. However, in the realm of human planning, it takes a dedicated team of experienced planners at least a week to accomplish the same task. This stark contrast in timeframes underscores the remarkable efficiency and effectiveness of automated solvers in handling these complex scheduling challenges.



