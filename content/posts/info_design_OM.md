---
title: "information design in OM"
date: 2024-04-20T19:15:46+08:00
draft: false
---

My advisor was somehow less enthusiastic in information design as compared to other general algorithm game theory topics–despite my several failed attempts to lure him into doing some related projects. But his major concern is solid, that information design demands overly strong assumptions–the existence of a common prior, commitment of the signal sender, inference ability of the signal receiver–all poses challenges for direct applications that justify the existing theory. The real world should be something in between the perfectly rational Bayesian persuasion and the noisy cheap talks.

Nevertheless, my stance is decidedly more optimistic. The past decade has witness a boom of theoretical literature on information design, and that the field is more than ready to step into industry. Hence, information design in the age of internet-AI, interacting with the field of operational management and e-commerce would be promising. Quote Cadogan's 2020 **TutORials**:

> Going forward, it is important to focus on other relevant settings, carefully model the operational details, and discuss how firms/decision makers can optimally use information to induce a desired outcome.

## standing on the shoulders of giants

### basic framework and technical variations

Information design deals with influencing agents' actions by a designer (sender) who commits to a signaling mechanism that reveals payoff-relevant signals once a state is realized. The sender aims to maximize their own payoff by crafting these signals to induce specific actions from the agents (receivers).

- **Concavification**: This approach helps in understanding when and how the sender can use information as a lever to enhance their payoff by converting the payoff function into a concave shape. This simplifies the identification of optimal strategies and is derived from the Bayesian persuasion framework introduced by Kamenica and Gentzkow (2011).
- **Revelation Principle and Bayes Nash Equilibrium (BNE)**: Similar to the revelation principle in mechanism design, straightforward signaling mechanisms recommend actions that are optimal for receivers to follow, ensuring the sender's information shapes receivers' beliefs and actions correctly. This concept extends the work of Bergemann and Morris (2016) on Bayes correlated equilibria.
- **Rothschild-Stiglitz Approach**: Focuses on designing signals based solely on the expected impact (mean) on the receivers' actions, simplifying the design problem when the sender's payoff depends on the actions taken by receivers. This approach is particularly useful in environments where the state affects payoffs through its expectation, as detailed in the work of Gentzkow and Kamenica (2017).
- **Step Function Lemma and Tricks**: Techniques used when the sender's payoff can be segmented into distinct levels or 'steps' based on different intervals of the state's realization, facilitating piece-wise strategies in signal design to target specific outcomes effectively. This method leverages the tractability of convex optimization in information design, as explored by Candogan (2020).

### existing applications

- **Queueing Systems**: Information design can be employed to influence customers' decisions on whether to join queues based on signals about queue length, so as to help manage customer flow and optimize service efficiency. Lingenbrink and Iyer (2018) explore how a designer can reveal informative signals on the queue length to influence customers' decisions to join, with the objective of maximizing the revenue collected from customers who decide to participate.
- **Revenue Management**: Naturally, sellers who is aware of the actual inventory position might use persuasion to encourage early purchases by signaling product availability or anticipated price changes. This application is vital in industries like airlines and hotels where pricing strategies can significantly influence demand. Drakopoulos and Iyer (2017) and Küçükgül et al. (2019) demonstrate how sellers can signal product availability to persuade buyers to purchase the product earlier (and potentially at a higher price), thus maximizing revenue over time.
- **Social Networks**: The spread of information through social networks can significantly impact user engagement and product adoption, especially when there's network effect. Platforms may use information design to manipulate how content is perceived, enhancing engagement or directing product adoption behaviors. Candogan and Drakopoulos (2019) focus on social networks, exploring how platforms can design signaling mechanisms that reveal the accuracy of content, influencing users' decisions to engage with or share the content.
- **Two-sided Markets**: In platform-based industries like e-commerce or ride-sharing, information about the quality of service providers can affect consumer trust and transaction volumes. Information design can be used to manage the reputation of a platform by signaling seller or service quality. Papanastasiou et al. (2017) study how platforms can induce exploration by provisioning information appropriately to their users, potentially enhancing user experience and increasing platform value.

### assumptions to relax or improve upon

Info design in operations highlights several challenges that arise when applying these theories to practical settings. 

- **Design Complexity**: Solving for optimal signals that effectively influence the diverse and sometimes conflicting actions of multiple agents with varying preferences poses significant complexity. Also, when the structure of the environment (e.g. social networks) is challenging in the first place, matters worse.
- **Informational Spillovers**: Designed signals may unintentionally affect unintended receivers due to spillovers, this complicates the targeted impact of the information design, therefore makes the design job complicated in the first place.
- **Assumption of Common Prior Knowledge**: The practicality of information design is often challenged by the unrealistic assumption that all agents share common and public prior knowledge, which may not hold in real settings.
- **Integration with Operational Levers**: Effectively combining information design with other operational strategies like pricing or inventory management requires a deep, nuanced understanding in modelling, as well as hard-to-do but necessary real-application to justify and complement the theory.

For all the key assumptions imposed in information design that need not hold in various operational settings, some recent works attempt at discussing when such assumptions are violated. This presents an exciting avenue for future investigations and applications. For example, the complexities inherent in dynamic settings, where the conditions and participant behaviors can evolve over time, is seldomly addressed in conventional information design that assumes a one-shot game. So there is significant opportunities to explore how information strategies can be optimized and applied across various operational settings that lasts and changes over time.

And another last point: in practice, some businesses and markets naturally apply principles of information design—such as rating platforms, Google Maps updating real-time traffic status, and recommendation systems. Informational advantages arise not only when the real state of the world is unknown but also when the cost of obtaining more concrete information is substantial. Generally, existing studies tend to oversimplify this by equating the latter scenario with the former. But, is this equivalence entirely accurate?

### in conclusion

> In the last decade, there has been substantial interest in information design. The existing literature has laid the foundation for systematically approaching information design problems. In addition, the applications of information design in many different settings have been explored.

There are some early work in the area, but it's like the pandora's box has just been opened.

##### reference: 

Ozan Candogan (2020) ***Information Design in Operations*** **INFORMS TutORials in Operations Research**. doi: https://orcid.org/0000-0003-3920-402XOzan

