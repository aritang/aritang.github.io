---
title: "catch me if you can, starring generative AI"
date: 2024-02-16T23:28:20+08:00
draft: false
---

> Make the AI dance in certain ways, they would eventually stumble.

Here's a new story from the economist about fake-news new:

## [Many AI researchers think fakes will become undetectable](https://www.economist.com/science-and-technology/2024/01/17/many-ai-researchers-think-fakes-will-become-undetectable)

AI created contents that are indetectably mixed within genuine 'natural' human products are causing a lot of troubles. Deep-fake videos and news are generating misleading information towards public. For AI developers who relies on internet-based text corpus to train new AI versions, they are finding their relied sources being polluted by AI generations. Hence, how to detect such trickery is a live topic among ai researchers. There are two primary ways of detection: some firms offer software that aims to spot machine-generated media; others, like the makers of big ai models, meanwhile, are searching for ways of “watermarking” their output so that real pictures, video or text can be readily distinguished from the machine-generated sort.

> *The Economist* conducted a (deeply unscientific) straw poll of delegates to Neurips. Of 23 people asked, 17 thought ai-generated media would eventually become undetectable. Only one believed that reliable detection would be possible. (The other five demurred, preferring to wait and see.)

For text:

> One technique for marking text was proposed by a team at the University of Maryland in July 2023, and added to by a team at University of California, Santa Barbara, who presented their tweaks at Neurips. The idea is to fiddle with a language model’s word preferences. First, the model randomly assigns a clutch of words it knows to a “green” group, and puts all the others in a “red” group. Then, when generating a given block of text, the algorithm loads the dice, raising the probability that it will plump for a green word instead of one of its red synonyms. Checking for watermarking involves comparing the proportion of green to red words—though since the technique is statistical, it is most reliable for longer chunks of writing.

For images (and hence also videos):

> Many methods for watermarking images, meanwhile, involve tweaking the pixels in subtle ways, such as shifting their colours. The alterations are too subtle for human observers to notice, but can be picked up by computers. But cropping an image, rotating it, or even blurring and then resharpening it can remove such marks.
>
> Another group of researchers at Neurips presented a scheme called “Tree-Ring” watermarking that is designed to be more robust. Diffusion models, the most advanced type of image-generation software, begin by filling their digital canvas with random noise, out of which the required picture slowly emerges. The tree-ring method embeds the watermark not in the finished picture, but in the noise at the start. If the software that created a picture is run in reverse, it will reproduce the watermark along with the noise. Crucially, the technique is less easy to thwart by fiddling with the final image.

However, the situation has almost become an arm race between the detectors and the AI-developers:

> Another team led by Hanlin Zhang, Benjamin Edelman and Boaz Barak, all of Harvard University, presented a method (not yet peer-reviewed) that can, they say, erase watermarks. It works by adding a dash of new noise, then using a second, different ai model to remove that noise, which removes the original watermark in the process. They claim to be able to foil three new text-watermarking schemes proposed in 2023. In September scientists at the University of Maryland published a paper (also not yet peer-reviewed) claiming that none of the current methods of image watermarking—Tree-Rings included—is foolproof.

The application of AI detection would be immensely case-dependent. Despite we could already name dozens of particular applicaion cases where abusive use of AI generated content would create negative impact, to precisely define the application scenario hence framing a working boundary for such detection requires thorough work that bridge current academic findings with robust industrial usage.
