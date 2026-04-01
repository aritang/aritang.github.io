---
title: "(Open)Anthropic Code Leaks"
date: 2026-03-31T13:38:25-05:00
draft: false
---

March 31 Chaofan Shou @Fried_rice on twitter found a glitch that leaks **Claude code's source code** (500k rows of code!). It's now available on GitHub https://github.com/zackautocracy/claude-code.git:

###### Chaofan Shou is a web engineer in california. he is a really impressive coder. See this article: [the guy who found the Claude Code glitch...](https://mp.weixin.qq.com/s/NEV4JJIZtsh9EVgxYDg0cQ)

{{<figure align="center" width="100%" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/online/claudeCodeLeak.jpeg" caption="Turns out when Anthropic released its recent Claude Code version, the *source map* debug files are also packaged for release. The *source map* contains address of the Claude Code Source Code with which outsider can access and download Anthropic's source code zip stored on their Cloud.">}}

A friend of mine who worked in web once told me that it rarely happens when hackers really brute-force attack internet infrastructure, eg hank your bank pin. It almost always happens with a careless or lazy glitch — eg before releasing to public, the delveloper forgot or failed to check what is supposed to be private ***is*** private or not.

You can now read about the design and engineering inside Claude. For example, its new model is called *Capybara*, it uses a simple word match, implemented by a very primitive *regular expression* to determine whether the user is angry, etc etc:

```
const frustrationRegex = /\b(wtf|wth|ffs|omfg|shit|dumbass|
horrible|awful|pissed off|what the fuck|fucking broken|
this sucks|damn it)\b/;
```

Jesus, what am I going to write about tomorrow?
