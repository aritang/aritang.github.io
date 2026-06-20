---
title: "Three-year review of what the DMA has actually done"
date: 2026-06-14T16:34:13-05:00
draft: false
---

> Article 35 DMA requires the Commission to submit an annual report on the implementation of the DMA and the progress made towards achieving its objectives. [DMA Annual Report 2023](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=COM:2024:106:FIN) [DMA Annual Report 2024](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=COM:2025:166:FIN)  [DMA Annual Report 2025](https://digital-markets-act.ec.europa.eu/document/download/2f31180c-b9da-49d4-ae36-3a4109cc59a5_en?filename=CELEX_52026DC0247_EN_TXT.pdf)

Here's a short reading note that I outlined some economically interesting points:

###### Disclaimer: I am not a lawyer, and this post is not legal advice. These are my personal reading notes on the EU Digital Markets Act — it's for academic purposes only, and all mistakes are my own. Readers should consult the official legal text and, where necessary, a qualified lawyer for legal advice.

###### Related: [notes on The EU Digital Markets Act: A Report from a Panel of Economic Experts (February 9, 2021)](/posts/gatekeeperregulation/). [Reading Notes of the EU's Digital Market Act](/posts/eudma/)

### The gatekeeper are dynamically targeted

- In 2023, the Commission designated the first six gatekeepers: **Alphabet, Amazon, Apple, ByteDance, Meta, and Microsoft**, covering 22 core platform services. Samsung was not designated for its browser. Some services escaped designation after rebuttals, including Gmail, Outlook, iMessage, Bing, Edge, and Microsoft Advertising. 
- In 2024, the map expanded. **Booking** was added for Booking.com, and **Apple iPadOS** was added as a core platform service. By the end of 2024, the regime covered seven gatekeepers and 24 core platform services. 
- In 2025, the map became dynamic. Meta Marketplace was removed after Meta changed the service so that it no longer met the business-user threshold. By year-end, seven gatekeepers remained under supervision, covering 23 core platform services. 

Compliance moved inside the firm: gatekeepers now have to submit compliance reports, audited consumer-profiling reports, appoint independent compliance officers, attend workshops, answer information requests, and keep documents for enforcement review. In 2024, the Commission reviewed compliance reports, held workshops, met gatekeepers and third parties, and issued document-retention orders to six gatekeepers. 

### Apple became the first big test case

Apple has taken the hardest direct hit so far. I think it may have been because its OS business model is built around a tightly controlled ecosystem — so DMA seems specifically unhappy about the architecture and what Apple is doing around it. It faced scrutiny across:

* App Store steering.
* Alternative app stores.
* Browser choice screens.
* Default settings.
* App uninstallation.
* iOS interoperability.
* iPadOS designation.

In 2025, the Commission fined Apple **EUR 500 million** for restricting developers from steering users to cheaper or alternative offers outside the App Store. It also issued preliminary findings that Apple failed to comply with alternative app-distribution obligations. The Commission also issued two binding specification decisions on Apple interoperability, requiring clearer and more effective access to iOS features for connected devices and third-party developers. 

### Meta was hit on data

Meta’s main problem is data combination and advertising consent.

The Commission found Meta’s “Consent or Pay” model non-compliant because users were not given a less-personalized but equivalent alternative to Facebook and Instagram. Meta was fined **EUR 200 million**. Meta later announced it would offer EU users a less-personalized advertising option from 2026. 

At the same time, Meta scored one defensive win: Marketplace was removed from DMA supervision after the Commission accepted that the service no longer had enough business users.

So Meta is wounded by a fine but not as structrally exposed as Apple. The DMA is hitting Meta’s ad-data model more than its platform architecture.

### Alphabet is under pressure across several fronts

Alphabet has not yet taken the biggest fine in the reports, but it may be the broadest ongoing target. The Commission has focused on:

* Google Play steering rules.
* Google Search self-preferencing.
* Android choice screens.
* Chrome and search defaults.
* Data portability.
* Consent screens for data combination.
* Online advertising transparency.

In 2025, the Commission issued preliminary findings that Alphabet may have prevented app developers from steering users to alternative offers and may have charged fees that went beyond what was justified. The Commission also continued action around Google Search and possible self-preferencing, including concerns over vertical services and publisher monetization. 

Alphabet may be the next major enforcement target because it sits across search, ads, Android, Play, Chrome, YouTube, Maps, and data. The risks are spread across the whole stack.

------

## (GOOD) Changes in the market

- Mobile ecosystems (partially) opened: Users now see more choice screens. Some default settings became easier to change. Some pre-installed apps can be removed. Alternative app stores entered the EU market. Apple changed parts of iOS. Alphabet changed choice-screen and data-portability tools. Microsoft made some Windows defaults easier to change. 

  *But* gatekeepers may formally allow alternatives while making them commercially unattractive through fees, warnings, eligibility rules, technical friction, or degraded user journeys.

- Data portability became better. Alphabet improved tools for forward-looking data access. Meta consolidated its data export tools. The Commission worked with Alphabet and Apple on easier Android-to-iPhone and iPhone-to-Android switching. Switching cost seems to be down a lot.
- Advertising and profiling became more transparent: Gatekeepers must submit audited consumer-profiling reports and publish public overviews. In 2025, all seven gatekeepers submitted updated reports. The Commission says these reports help transparency and may also support GDPR enforcement.

## What is still unresolved

The heated discussion center might be the playground for new research:

### Whether alternative app stores can actually compete, and how closed should Apple be:

The big unresolved question is whether Apple and Alphabet will allow meaningful competition in app distribution, or whether new fees and technical conditions will preserve the old economics.

There's a reddit post relevant to about it, most arguing ove: **is Apple honestly protecting privacy, or using privacy as a political argument against regulation?** The pro-Apple side says: Apple’s ecosystem works because it controls the full stack. The anti-Apple / skeptical side says: Apple is framing the DMA as if the EU wants data handed to third parties automatically, but users should be able to consent to sharing their own data.

<blockquote class="reddit-embed-bq" style="height:500px" data-embed-showusername="false" data-embed-height="240">
<a href="https://www.reddit.com/r/apple/comments/1npw3vh/the_digital_markets_acts_impacts_on_eu_users/">The Digital Markets Act’s impacts on EU users</a><br> by
<a href="https://www.reddit.com/user/Fer65432_Plays/">u/Fer65432_Plays</a> in
<a href="https://www.reddit.com/r/apple/">apple</a>
</blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>
Some other hard questions: 

- Whether search self-preferencing can be fixed? eg Google Search ranking is not a simple access rule. It involves interface design, ranking logic, specialized boxes, vertical search units, crawling, indexing, and publisher access.
- Does eliminating “choice screens” actually change user behavior? — The Commission has forced more user choice, but the reports do not yet prove large market-share shifts. Defaults are powerful. The question is whether choice screens produce real competition or just formal compliance.
- **Whether cloud becomes the next gatekeeper layer** The newest frontier is cloud. In 2025, the Commission opened market investigations into whether **AWS** and **Microsoft Azure** should be designated as gatekeeper services. It also launched a broader cloud investigation covering interoperability, access to data, tying, bundling, and imbalanced contract terms.

The likely next chapter is **cloud and AI infrastructure**. If the DMA expands seriously into AWS, Azure, and cloud practices, Europe’s platform regulation will no longer be mainly about smartphones, app stores, and social networks. It will be about who controls the computing layer underneath the digital economy.
