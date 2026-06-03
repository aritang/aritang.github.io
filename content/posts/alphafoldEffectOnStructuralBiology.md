---
title: "How does AlphaFold affect publication and jobs in structural biology?"
date: 2026-04-09T12:47:22-05:00
draft: false
---

AlphaFold2, released by DeepMind in 2020 and made freely available in July 2021, uses deep learning + DNA sequence alignment to *predict a protein's 3D structure* at near-experimental accuracy, and generalizes well out-of-sample. This solves a 50-year-old open problem in structural biology and won 2024 Nobel Prize in Chemistry. MOREOVER, DeepMind ran AlphaFold2 on essentially every known protein and release a free database lookup.

Though note its key limitations are: AlphaFold predicts a single static "default" conformation and misses the flexibility, ligand-bound states, and allosteric changes that matter most for drug design; ~10% of high-confidence residues are still meaningfully misplaced; and it is pattern recognition over evolutionary data, not a physics-based simulation.

So how would the invention of a new protein calculator affect the structural bio industry? Professor Carolyn Stein gives a talk about *How Artificial Intelligence Shapes Science: Evidence from AlphaFold* (with Ryan Hill) at Booth's micro lunch seminar today. 

###### I think you can find the paper in Professor Stein's webpage, eg: https://carolynstein.github.io/research/

There are folklores about how computational tools would affect biology. "21 century is the century of biological science" (Shi Yigong) but chem/bio graduates are facing a shaky job market. 

Data spoke and the folklores are right. AlphaFold complements rather than replaces experimental work, crystallographers use it as a template, drug discovery hasn't visibly moved. The paper measured thes effects and some insights are very refreshing:

- **Experimental structural biology didn't slow down.** Crystallographers and cryo-EM groups are depositing new structures at the same rate after AlphaFold as before, publishing them in the same journals (including *Cell/Nature/Science*). AlphaFold did not replace the wet lab.

- **Experimentalists are using AlphaFold heavily**. AF makes previously difficult proteins prediction tractable.

    ###### Caveat: X-ray crystallography measures the amplitudes of scattered x-rays but loses the phases, and without phases one can't build an electron density map from the data — the "phase problem." *Molecular replacement* solves it by borrowing phases from a similar known structure as an initial guess, then iteratively refining against the experimental data. Like any non-convex optimization, this only works if the starting guess lands in the basin of attraction around the true solution (rule of thumb: ~30% sequence identity). Before AlphaFold, viable initial guesses had to come from experimentally-solved relatives in the PDB, so orphan proteins were stuck with expensive experimental phasing. AlphaFold gave every protein a plausible starting model on demand, and because it generalizes out-of-sample, the guess is usually good enough to land in the basin even when no experimental cousin exists.

- **The rest of protein science shifted toward previously-unstudied proteins.** Before 2021, well-studied proteins dominated the literature. After AlphaFold gave everyone a structure, papers about the previously-unsolved proteins grew 16–35% faster than papers about already-solved ones.

- **BUT: Early-stage drug discovery has not moved — yet.** Using a public database of compound-vs-protein binding experiments, Professor Stein find no corresponding shift toward the newly-illuminated proteins. Medicinal chemists are still working on the same targets as before.

