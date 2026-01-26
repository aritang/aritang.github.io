---
title: "kidney exchange 101"
date: 2024-03-21T23:55:37+08:00
draft: false
---

Madonna said "strike the pose" in *Vogue*. Today, let's stike the ***TERMINOLOGY***:

## Kidney exchange 101

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
