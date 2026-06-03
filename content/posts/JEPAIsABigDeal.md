---
title: "Will JEPA be the next revolutionary technology after GPT?"
date: 2026-05-18T23:56:17-05:00
draft: false
---

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/ngBraLDqzdI?si=QuCZgD8QOvYsxgjp"
    allowfullscreen>
  </iframe>
</div>

In an interview with Jacob Effron, Yann LeCun talked about why the LLM as they are now aren't the path to (general) intelligence and how the JEPA architecture will help.

Judge yourself — but before, here are some sources to understand what *IS* JEPA:

<blockquote class="reddit-embed-bq" data-embed-showtitle="true" data-embed-height="852">
<a href="https://www.reddit.com/r/learnmachinelearning/comments/1gya9pm/comment/lypsag3/">Comment</a><br> by
<a href="https://www.reddit.com/user/johny_james/">u/johny_james</a> from discussion
<a href="https://www.reddit.com/r/learnmachinelearning/comments/1gya9pm/can_someone_explain_to_me_in_a_laymenish_terms/"></a><br> in
<a href="https://www.reddit.com/r/learnmachinelearning/">learnmachinelearning</a>
</blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>
Basically, an "encoding" is just the model's internal compressed understanding of something — the gist, not the pixels. Think of how you remember a movie: not every frame, but "hero fights villain on a rooftop." That summary is an encoding.

Let's look at a concrete example. Show an AI a photo of a dog with the right half covered, and ask it to fill in what's missing:

- A *generative* model tries to actually paint the missing pixels — every fur strand, every shadow. But it can never get those details right (you can't know the exact fur pattern from the left half alone), so it wastes effort hallucinating specifics that don't matter.
- *JEPA* doesn't paint anything. It just predicts the encoding of the missing part — something like "dog body, brown fur, sitting pose, tail visible." It's guessing the *meaning* of what's hidden, not its appearance.

LeCun argued (had I understood correctly) real intelligence works this way: when you walk into a room and see a chair half-hidden behind a table, your brain doesn't render the missing chair legs in detail — it just knows "legs are there, probably wooden." You operate on meaning, not pixels. **By forcing the model to predict abstract encodings instead of reconstructing reality, you stop it from burning capacity on unpredictable surface details (exact pixels, exact words) and push it toward what actually matters — the structure of the world.**

So, "predict parts of the input encodings from the context of other input encodings" = look at the encoding of the visible half of the dog, predict the encoding of the hidden half. "Without generating the hypothesized input" = never bother trying to draw the actual missing pixels.

The transformer (or whatever architecture) is just the engine — JEPA changes what you're asking it to learn:

- Next-token prediction / masked modeling: "predict the exact missing token/pixel." Loss is measured in the raw input space.
- JEPA: "predict the encoding of the missing part." Loss is measured in a learned abstract space.

Changing the target from "the thing itself" to "a meaningful summary of the thing," and you get a model that learns concepts instead of memorizing textures.