---
title: "complexity issues bring a fresh TCS talk to begin 2024"
date: 2024-01-09T23:16:51+08:00
draft: false
summary: As a rookie, I dare not factorize and comment on such high level work. But basically...
---

Jiawei Li's visit to ITCS marked a thought-provoking start to 2024. Jiawei presented his latest solo paper, "Total NP Search Problems with Abundant Solutions". Earlier that day, a casual conversation with Professor He highlighted the intrinsic value of such talks: they offer a rare glimpse into the author's original thought process, often obscured in the structured format of academic papers.

As a rookie who doesn't even know what a factoring problem is (well, actually knowing it but failed to associate the name with the math), I dare not factorize and comment on such high level work. Basically, the class TFNP is the search analog of NP with the additional guarantee that any instance has a solution (Hubácek, 2017). Problems in this class can usually be dual-ly characterized by a combinatorial principle.  Jiawei's work defined a subclass of the TFNP class - the problems with **Abundant** solutions (TFAP), opposed to the **Lean** class (also defined w.r.t. the number of solutions of the search problem). The characterization is very natural (and nontrivial, for sure). For a lot of problems in the TFAP class they have a black-box reduction to problems in Lean class, but no white-box reduction is available now and possibly there won't be any in the future (as it will prove P$\equiv$NP, as he has said).

Li concluded his talk with an engaging discussion on the Necklace-Splitting problem, a topic of particular interest to the Algorithmic Game Theory community. This problem, with its deep connections to TFAP and TFNP, served as a perfect finale, intertwining complexity theory with practical applications. 

I must confess that my initial enthusiasm for complexity theory was somewhat lukewarm, but Jiawei did a great job somehow (like, really). Cool. Not a bad start-off talk for 2024.
