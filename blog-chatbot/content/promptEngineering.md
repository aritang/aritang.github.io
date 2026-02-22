---
title: "Let AI Write Their Own Prompts"
date: 2026-01-13T22:38:23-06:00
draft: false
---

If I need to get something serious done with the help of AI, I would first open an (auxiliary) AI window to let the AI generate my prompts. One good method is to use the **C**ontext-**R**ole-Input-**S**pecification-**P**rocess-**E**valuation (CRISPE) framework. For example

```tex
You are an experienced [ROLE/DOMAIN EXPERT]. I will provide a high-level or ambiguous description of a task or problem. Your job is to design a high-quality prompt that would enable an AI to effectively accomplish the task or solve the problem.

The resulting prompt should be concise, precise, and action-oriented. You may structure it using the CRISPE framework (Context, Role, Instructions, Scope, Parameters, Examples) or any relevant subset of it, if helpful.

Before presenting the final prompt, ask me exactly three high-impact clarification questions that would materially improve the quality and specificity of the prompt. Finally, you will output prompt in a copytable codebox.
```

Works every time.

{{<figure align="center" width="50%" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/wine/perpetualMachine.jpg" caption="...">}}
