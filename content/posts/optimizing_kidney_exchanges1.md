---
title: "penalties and rewards for fair learning in paired kidney exchange programs"
date: 2024-03-31T17:16:17+08:00
draft: false
---

Following [yesterday](/posts/optimizing_kidney_exchanges), the second paper I'd recommend is Carvalho et al. *Penalties and Rewards for Fair Learning in Paired Kidney Exchange Programs* (WINE2023).

The paper took a data-driven approach and tested its method on Canadian Kidney Exchange program's data. It established a dynamic (over time) kidney exchange model so as to take in consideration of some aspects missed by myopic naive matching schemes. They developed a novel **learning** approach to update the **weights** of the vertices so as to improve equity as well as efficiency.

> ### *ABSTRACT*
>
> A kidney exchange program, also called a kidney paired donation program, can be viewed as a repeated, dynamic trading and allocation mechanism. This suggests that a dynamic algorithm for transplant exchange selection may have superior performance in comparison to the repeated use of a static algorithm. We confirm this hypothesis using a full scale simulation of the Canadian Kidney Paired Donation Program: learning algorithms, that attempt to learn optimal patient-donor weights in advance via dynamic simulations, do lead to improved outcomes. Specifically, our learning algorithms, designed with the objective of fairness (that is, equity in terms of transplant accessibility across cPRA groups), also lead to an increased number of transplants and shorter average waiting times. Indeed, our highest performing learning algorithm improves egalitarian fairness by 10% whilst also increasing the number of transplants by 6% and decreasing waiting times by 24%. However, our main result is much more surprising. We find that the most critical factor in determining the performance of a kidney exchange program is not the judicious assignment of positive weights (rewards) to patient-donor pairs. Rather, the key factor in increasing the number of transplants, decreasing waiting times and improving group fairness is the judicious assignment of a negative weight (penalty) to the small number of non-directed donors in the kidney exchange program.

### a quick overview of the paper's model

> The paper is concisely written. Here's a brief write-up but I would strongly recommend referring to the original paper: https://doi.org/10.1007/978-3-031-48974-7_8

It is convenient to think the existing kidney exchange market as a **compatibility graph** that change over time – with patient-donor pairs arriving and leaving. The graph, of course, is **dynamic**: arrival is assumed as Poisson process, with arrival rates, as well as blood type and cPRA distributions estimated from real data. Match compatibility is drawn randomly from distribution given by cPRA.

Traditionally, exchange programs have a human-expert designed, a rather static scoring system for assigning weights to patients wrt wait time, match hardness, etc.. This paper took a dynamic learning approach that assign weights to each types (denoted as subscript $\tau$) and optimizes matching accordingly. Initally, for all types, initial weight is assigned as $w^0_\tau = 1$, and is updated accordingly to
$$
w^{t +1 }_\tau = f\left(\frac{\text{que}_r (\mathbf w^t)}{\text{pop}_\tau}\right)
$$
where $f$ is a monotonically increasing update function, set to be either (i) linear: $f(x) = 1 + \frac xa$ or (ii) exponential: $f(x) = (a + 1) - ae^x$ ($a$ is a picked parameter​). $\text{pop}_\tau$/$\text{que}_\tau$ is defined as the proportion of type $\tau$ in the population/waiting pool.

### conclusion

One of the most critical insights from this research is the importance of assigning a negative weight to non-directed donors. This strategy has been shown to be a key factor in increasing the number of transplants, reducing waiting times, and enhancing fairness in the allocation process.

The paper outlines six key lessons that can be drawn from their findings:

1. **Negligible Benefit in Long Paths:** Extending the length of paths beyond five does not significantly increase the number of matches, suggesting that a cap of five is sufficient for optimal performance.
2. **Importance of Cycle Length:** Allowing for cycles of length three is crucial, while the benefits of longer cycles are marginal.
3. **Critical Role of Altruist Weights:** Assigning an appropriate negative weight to altruistic donors is fundamental in determining the quality of outcomes, highlighting the need for a careful balance between utilizing and preserving this valuable resource.
4. **Marginal Contribution of Altruistic Donors:** The contribution of each additional altruistic donor decreases as their number increases, emphasizing the importance of optimizing their use.
5. **Reduction in Hard-to-Match Patients:** Fair algorithms can effectively reduce the accumulation of hard-to-match patients in waiting pools, addressing a significant challenge in kidney exchange programs.
6. **Compatibility of Fairness and Efficiency:** Fair algorithms can be implemented without detrimental effects on utilitarian measures such as waiting times and the number of transplants, demonstrating that fairness and efficiency can coexist.

These lessons provide valuable insights for the design and improvement of kidney exchange programs, not only in Canada but also globally. By integrating these findings into their operations, these programs can save more lives while ensuring a fairer distribution of transplants across different patient groups.

In summary, the study adopted a dynamic and data-driven approach, the authors have developed a learning algorithm that continuously updates the weights of patient-donor pairs, leading to improved outcomes in terms of both efficiency and equity.

### reference

Carvalho, M., Caulfield, A., Lin, Y., Vetta, A. (2024). Penalties and Rewards for Fair Learning in Paired Kidney Exchange Programs. In: Garg, J., Klimm, M., Kong, Y. (eds) Web and Internet Economics. WINE 2023. Lecture Notes in Computer Science, vol 14413. Springer, Cham. https://doi.org/10.1007/978-3-031-48974-7_8
