---
title: "werewolf game"
date: 2023-10-03T17:38:02+08:00
draft: false
cover:
    image: conversations/werewolf_afternoon.jpeg
---

The Werewolf game is a wildly popular social board game in China, enjoyed by groups of 4 to 10 players. It's a versatile game that can be played in various settings, whether it's a post-meal gathering or any other social occasion. The game has gained immense popularity, transcending friend circles. For instance, our orchestra crew delved into intense games of werewolf in the hotel lobby until the late hours during our tour, while the scientist squads (or actually, professors) engaged in a gripping round when they were unexpectedly confined indoors due to a rainstorm during a conference reception. The game, in both its original form and its various adaptations, has become ubiquitous. You can find the original physical cards, limited-edition golden-plated versions, and even online mini-program software on WeChat, making it accessible even when you don't have the physical cards.

The game's popularity can be attributed to three key factors: accessibility, a delicate balance between randomness and strategic elements, and its innate social nature. However, describing its allure without a solid example is challenging. Here's a classic version of the werewolf game:

> Participants: 9 players + 1 neutral moderator.
>
> Roles:
>
> - 3 werewolves (form the dark side)
>
>     They mutually decide on a person to kill each night.
>
> - 3 deities (aligned with the good side)
>
>     - The seer
>
>         Can investigate the identity of one person (self-selected) every night to determine if they are a werewolf.
>
>     - The witch
>
>         Possesses two potions, one to save a person and one to poison a person. The witch can use these potions at her discretion.
>
>     - The hunter
>
>         Can kill one person when he himself is killed.
>
> - 3 villagers (aligned with the good side)

At the beginning of the game, each player receives a random role, knowing their own but unaware of the others.

The game proceeds with alternating night and day rounds. Typically, during the night, werewolves choose a victim, while during the day, players converse, exchange information, and vote to execute one player.

The objective for each player is to secure a victory for their side. The good side wins if all the werewolves are eliminated and at least one deity survives; otherwise, the dark side prevails. The detailed rules of the game can be expressed as follows in pseudocode:

```markdown
while NO_SIDE_WINS:
-> Night Routine: The moderator announces, "Everyone, close your eyes; night falls."
	- Werewolves choose their nightly victim.
	- (IF seer is alive) The seer investigates one person's identity.
	- (IF witch is alive) The witch can exercise her powers:
		- IF the witch still has her "save" potion:
			The witch is informed of the werewolves' victim for the night.
			- IF it's the "first night," the witch can use the potion on anyone, including herself.
			  ELSE the witch can save anyone with her "save" potion, except herself.
		- IF the witch still has her "kill" potion, the witch can choose to eliminate one person.
	- (IF hunter is alive) The hunter is informed of their living status.
--> Day Routine: The moderator announces, "The day has arrived; everyone, open your eyes," and reveals who was killed during the night.
	- IF it's the first night: Deceased players can provide a "testament" to provide additional information if desired.
	  ELSE, in subsequent nights, deceased players cannot speak in their testament.
	- The moderator designates the first person to speak and the direction (clockwise/counter-clockwise) for players to share information.
	- At the day's end, players vote (secretly, without knowledge of others' votes) for the most suspicious player to identify the werewolves.
	- The player with the most votes is executed.
```

The game typically spans multiple rounds, often lasting 3-4 nights and days. The seer plays a pivotal role, and the witch possesses significant power. What makes the game truly entertaining is the opportunity for players to bluff, deceive, and reveal their alternate personalities, sometimes displaying a hint of aggression. Furthermore, the social aspect of the game shines when players integrate their knowledge of each other from "out-of-game" interactions into the gameplay. In other words, taking it personal.

For instance, in larger groups, an additional deity, "Cupid," may be introduced. Cupid links two players as a couple in the first round, creating a third faction. This faction wins if all other factions are eliminated. In close-knit friend groups, romantic feelings and friendships may emerge, adding a layer of complexity and humor to the game. The chemistry between linked couples and the banter that ensues when people make jokes and guesses further heightens the enjoyment.

However, the game's social nature also has its drawbacks. At times, it can lead to an excess of repetitive and shallow conversations. While the delicate balance between randomness and strategic thinking initially adds excitement and relaxation to the game, it can become monotonous after several rounds. Additionally, the social aspect sometimes comes with preconceived notions about players' characteristics. This can lead to unfortunate discrimination, where individuals like my brilliant cousin often find themselves targeted and executed in the early rounds, potentially leading to a repetitive and less engaging experience.

{{< figure align=center src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/conversations/werewolf_variation.jpeg" caption="my friend invited me to play a special werewolf game in a boardgame house, on the day of the beautiful mid-autumn festival, playing a special moonlight edition.">}}

To solve this problem, in contrast, there's another variant known as "One-Night" Werewolf. Unlike the multi-round format where players are eliminated, this version consists of a single round where no one is eliminated. Instead, players swap, match, and attempt to deduce their identities. The one-night werewolf game is fast-paced and demands sharper strategic deductions, making it a thrilling alternative. My advisor is particularly passionate about this version. Lol.
