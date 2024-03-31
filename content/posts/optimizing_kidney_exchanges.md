---
title: "optimizing kidney exchanges - and beyond"
date: 2024-03-30T17:02:01+08:00
draft: false
---

Looking at two-sided market literatures so as to motivate one of my recently launched project, here's a brief reading write-up of two papers.

Starting with the first one: Ashlagi et al. *On Matching and Thickness in Heterogeneous Dynamic Markets* (OR2019).

## kidney exchange 101

Before diving into the paper, here's how kidney exchange actually works.

### the concept of **"exchange"**

Kidney transplantation is essential for patients with late-stage renal failure. While a healthy individual can donate one of their kidneys to their loved ones, often the donor is incompatible with the intended recipient. Kidney exchange allows such patient–donor pairs to swap donors so that each patient can receive a kidney from a compatible donor.

There are two main methods of conducting kidney exchanges: swaps (bilateral matching) and chains. 

- **Swaps (Bilateral Matching):** Consider incompatible pairs $(P_1, D_1)$ and $(P_2, D_2)$, where $P_i$ represents a patient and $D_i$ their intended donor. If $D_1 \not\to P_1$ and $D_2 \not \to P_2$, but $D_2 \to P_1$ and $D_1 \to P_2$, a two-way cycle can be formed for simultaneous transplants. Due to logistical constraints, only bilateral matching is commonly practiced, requiring adjacent operating rooms for donors and recipients.

- **Chains:** In scenarios with unpaired donors, such as altruistic "angel" donors or deceased donors, chains can be initiated in the donation pool. For example, an initial donor $D_0$ donates to patient $P_1$, whose donor $D_1$ then donates to $P_2$, and so on. Contrary to concerns about donors defaulting once their loved ones receive a kidney, chains often continue due to a pay-it-forward mentality. The longest chain on record involves over 130 transplants. Chains offer logistical advantages, as surgeries can be performed sequentially, unlike the simultaneous requirement of swaps.

### compatibility

In mechanism design (and general CS-Econ), patient-donor pairs are often simply classified as compatible or incompatible. While this abstraction is useful for theoretical analysis, the reality of kidney compatibility is more complex. Understanding this complexity can inform our work and help us appreciate the level of abstraction in existing research.

The key to compatibility lies in the interaction between **antibodies** and **antigens**. Antibodies – those Y-shaped proteins in our blood – identify and initiate immune attack foreign **antigens** on invaders like bacteria and viruses. **Each antibody usually only identify their specific corresponding antigens.**

In the context of transplantation, the **human leukocyte antigen (HLA)** and their corresponding antibodies are especially relevant for compatibility. If the donor kidney's HLA (antigens!) reacts with certain antibody contained in the blood of the recipients, the kidney is likely to be attacked by immune system and transplant fails. 

- **tissue typing:** 

    Out of over 100 different HLA antigens that have been identified, there are six that have been shown to be the most important in organ transplantation. This process involves determining the HLA types of both donor and recipient. It is crucial for assessing compatibility and is closely related to the evaluation of PRA.

- **percent reactive antibody (PRA)**

    PRA is a metric evaluated for the **recipient** that measure how many HLA antibodies he/she has in her blood. A higher PRA suggests a higher likelihood of incompatibility with potential donors in general population, making it more challenging to find a matching kidney. 

    PRA provides an estimate of the percentage of donors with whom a recipient would be incompatible, reflecting the expected wait time for a transplant.

- **serum crossmatch**: positive/negative

    A serum **crossmatch** is a blood test the recipient and the donor will have multiple times, including right before the transplant surgery. Blood from certain donor and recipient are mixed. If the recipient's cells attack and kill the donor cells, the crossmatch is considered positive. If the crossmatch is negative, the pair is considered compatible and surgeries may then be carried out.

### matching market

There have been efforts to create and coordinate large platforms to increase opportunities for kidney exchanges. Numerous kidney exchange platforms operate in the United States and in other countries, varying in **size (thickness), composition (PRA composition), and policies**. For size of the market, one would generally consider how large the pool of paired donor-recipient is (in terms of absolute quantities). For composition, it would be the arrival rate of different PRA-patients. Policies would involves whether chain or swap is used, and how different patients with varying PRA value would be prioritized.

## paper

Motivated from real world policy choice of design of kidney matching policies, the paper took a rather stylized modelling approach and asymptotic approach, but does capture some important features of kidney exchange – to characterize **the heterogeneity of patient's PRA level**, to shed insight on how market thickness and prioritizing policy would affect wait time.

### model

The paper study matching policies in two different settings–agents might exchange items (1) bilaterally in a cyclic fashion or (2) through chains. We'll establish the model in basic "swap" scenario and then extend to chain.

- #### swap

    Consider an infinite-horizon dynamic matching market, where each arriving agent is endowed with a single item she wants to exchange for another item she finds compatible. Agents are indifferent between compatible items and wish to exchange as soon as possible.

    There are two types of agents, **H (hard-to-match)** and **E (easy)**. Beginning at $t = 0$, type $T\in \{H, E\}$ agents arrive to the market according to an independent Poisson process with rate $\lambda_H[\lambda_E]$. Any agent of type $H[E]$ would find the item of any other agents compatible with probability $p_H[p_E]$. The analysis is asymptotic in the sense that $p_H \to 0, p_E \text{ constant}$ which corresponds to the case that kidney recipients are almost bimodal distributed - they are either very easy to match (PRA < 5%) or hardly matchable (PRA > 95%). If both agents find each other's item desirable, they can be matched. Matched agents leaves the market.

- #### chain

    Chains are initiated by "angel" donor. Assume at $t = 0$ there are $d$ special **altruistic** agents who are willing to give an item without getting anything in return. Each agent in a chain receives a compatible item from one agent and gives to the next. Following on, at any time $t$, there are exactly $d$ such **bridge agents**.

The state of the marketplace can be characterized as a compatibility graph. A policy is a mapping from the history of exchanges and the state of the marketplace to a set of feasible exchanges involving nonoverlapping sets of agents–compatible pairs or chains–**break ties** to exchange and agents leave.

The objective the paper studied is the average waiting time in steady state. Note, in the model, the average waiting time of one type of agents is equivalent to the average number of agents of that type in the marketplace divided by the arrival rate of that type, because these two quantities are proportional to each other by Little’s law.

This research looked at two myopic policies (used in practise):

- **Bilateral match wrt $T$**: upon arrival of a new agent, if cycle of length 2 is formed, those agents are immediately matched. If more than one such cycle exists, priority is assigned to cycles of with type $T$, further ties are broken uniformly at random.
- **Chain match (d)**: for new arriving agent, build bridge (disjoint path) from it until bridge can no longer be extended. Prioritize $H$ agents, further ties are broken uniformly at random.

### results

The paper studies the influence of how (1) **market composition** (such as how extensive is $H$ agents) and (2) thickness (Poisson arrival rates of the two types) would affect the bilateral-match/chain market, respectively. The asymptotic approach they took simplified the analysis a lot–using a lot of clever tricks. Still, the maths are quite hard-core and I haven't read through them yet.

Some theoretical and numerical results shed insights on real world matching policy choice: matching through chains is significantly more efficient than (simple) bilateral matching only when the market is sufficiently thin. Furthermore, counter-intuitively, increasing the arrival rate of hard-to-match agents may have, under bilateral matching, an adverse effect on such agents.
