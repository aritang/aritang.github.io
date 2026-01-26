---
title: "WWW25 Keynote | The AI Revolution in Time Series - Challenges and Opportunities, by Yan Liu from USC"
date: 2025-04-28T15:05:09+10:00
draft: false
---

(Btw,  all the WWW keynotes can be found [here](https://www2025.thewebconf.org/keynotes-1).)

Foundation models are **large, pre-trained neural network** trained on broad, diverse time series data with the goal of supporting **many downstream tasks** (forecasting, anomaly detection, causal inference, generation) across different domains. It's like GPT-4, but for time series analysis.

🔹 Core Capabilities of a Time Series Foundation Model:

1. **Prediction** — short-term, long-term, multivariate
2. **Analysis** — pattern discovery, representation learning
3. **Causal Inference** — learning and modeling causal relationships over time
4. **Generation** — synthetic time series for simulation or augmentation
5. **Cross-domain transfer** — one model works across finance, medicine, climate, etc.

To use a foundation model, there are mainly two ways: Prompt-based learning vs Fine-tuning. Prompting is fast (like how you ask ChatGPT questions). Fine-tuning can be costly but would be better for narrow, high-accuracy needs.

One challenge in building time series foundation model is lack of diversity data. Well-organized large scale time series data are often limited to weather and finance. The other is the inherent tradeoff of chaos vs. structure—models must balance flexibility with structure.

But foundational modeling approaches open up new possibilities for **multi-modal analysis**: e.g., linking time series + text (financial statements, news), or images, videos.

The keynote took place April 28 afternoon. It follows a series of work of Professor Yan Liu's lab (https://sites.google.com/view/yanliu-ai/home) in developing and utilizing foundation model for time series.

> ### Keynote: The AI Revolution in Time Series: Challenges and Opportunities | Yan Liu
>
> Abstract:
>
> Recent advancements in deep learning and artificial intelligence have driven significant progress in time series modeling and analysis. On one hand, researchers seek breakthroughs in performance on classical tasks such as forecasting, anomaly detection, classification, etc. On the other hand, it is intriguing to explore the potential for answering more complex inference and reasoning tasks from time series. In this keynote, I will examine the pathways toward foundation models for time series and discuss future research directions in this rapidly evolving field.
>
> The remarkable success of foundation models in natural language processing - exemplified by Generative Pre-trained Transformers (GPT) - suggests their potential to revolutionize time series analysis. I will introduce our recent efforts along this direction, including TEMPO, a novel framework designed to learn effective time series representations by leveraging two key inductive biases: one is explicit decomposition of trend, seasonal, and residual components, and the second is prompt-based distribution adaptation for diverse time series types.
>
> Beyond representation learning, practical applications demands advanced reasoning capabilities with multi-step time series inference task, requiring both compositional reasoning and computational precision. To tackle this challenge, I will discuss TS-reasoner, a program-aided inference agent that integrates large language models (LLMs) with structured execution pipelines, in-context learning, and self-correction mechanisms. I will discuss a new benchmark dataset and evaluation framework to systematically assess multistep time series reasoning.
