---
title: "understanding a bit of the Big Five via transfer data"
date: 2024-06-21T09:06:05-07:00
draft: false
---

> Understand the transfer of football clubs and their impact–from an interesting case study from [GouXiongHui](https://www.xiong99.com.cn/), read original article [here](https://mp.weixin.qq.com/s/uZVdkR59DN5qqS96g7aYag) (in Chinese). 
>
> Apart from its introduction that provides a clear, brief overview of the modern football market, this report is well structured and is an excellent example of crafting a data science analysis analysis.

## basics

The **Big Five** refers to the association football markets of England, Germany, Spain, Italy and France. As of 2024, they are the five European leaders in size and popularity of the main domestic football leagues – the Premier League, Bundesliga, La Liga, Serie A and Ligue 1 respectively in men's football.

{{<figure align="center" src="/21/big_five.jpeg" caption="England (Premier League), Spain (La Liga), Italy (Serie A), Germany (Bundesliga) and France (Ligue 1)">}}

On January 1, 2024, the winter transfer window for the 23/24 season in European football opened as usual. For the ongoing European club competitions spanning the New Year, this is the only opportunity within the season to make significant adjustments to the squads. During the 2023 winter transfer window, teams from the top five leagues spent a total of **1.061 billion euros**.

Specifically, the football transfer window refers to a specific period during which clubs can sign new players or sell existing players. Generally, it is divided into the summer transfer window and the winter transfer window, abbreviated as "summer window" and "winter window," respectively. During the transfer window, there are usually two ways to trade players: permanent transfers and loans. A permanent transfer means that a player leaves their original club and signs a contract with a new club. In contrast, a loan refers to one club temporarily lending its player to another club. During the loan period, the player remains registered with their original club and will return to the original club once the loan period ends.

## the trend

In the past decade, one major trend in European football has been the **corporatization of football clubs**. This is specifically manifested by multinational companies owning and managing multiple football clubs worldwide. Through corporatization, these clubs can maximize resource sharing and coordinated development, thereby enhancing their overall strength and achieving commercial success in the football field.

Currently, the two largest football conglomerates are the [City Football Group (CFG)](https://www.cityfootballgroup.com/) and the Red Bull Group. The former is controlled by the Abu Dhabi United Group, headquartered in Manchester, England, and owns several football clubs, including the Premier League's Manchester City, La Liga's Girona, and the Chinese Super League's Shenzhen New Power (formerly Sichuan Jiuniu). The latter was established by Austria's Red Bull Company and owns clubs such as the Bundesliga's RB Leipzig.

{{<figure align="center" src="/21/meet_ur_boss.jpeg" caption="Manchester City owner Sheikh Mansour bin Zayed, UAE Vice President, Deputy Prime Minister and Minister of the Presidential Court, hosted the club's treble-winning manager Pep Guardiola in Abu Dhabi.">}}

## the rest | original article [here](https://mp.weixin.qq.com/s/uZVdkR59DN5qqS96g7aYag)

**Purpose of Using Transfer Data to Analyze Football Corporations:**
The analysis utilizes transfer data to understand the impact and dynamics of football corporations. This approach provides publicly available data to assess the effects of corporatization in football, including resource sharing, internal cooperation, and competitive strategies among clubs within the same corporate group. Transfer windows reveal how clubs adjust their squads, offering insights into their tactical and operational strategies.

**Data Collection and Analysis Process:**
1. **Data Source and Scraping:**
   - Data was scraped using Octoparse from the Transfermarkt website, specifically from the Transfer flows pages for each team.
   - Focus was on two major football corporations: City Football Group (CFG) and Red Bull Group.

2. **Selection Criteria:**
   - The analysis includes Manchester City and Girona from CFG, and RB Leipzig from the Red Bull Group, focusing on these clubs' activities from the 2017/18 season to the 2023/24 season.
   - To ensure comparability, only resident clubs that have consistently remained in their respective top leagues since the 2017/18 season were included.

3. **Data Points:**
   - Cumulative transfer-in and transfer-out data were collected for each resident club.
   - Data included details such as the number of transfers and loans, the involved amounts, and the leagues of the transfer-in and transfer-out clubs.

4. **Key Metrics Analyzed:**
   - Number of clubs each resident team has cooperated with in terms of player transfers.
   - Differences in transfer activities, such as permanent transfers versus loans, and the scale of transfers between different leagues.

### **Conclusions:**

1. **Trends in Top Five Leagues:**
   - The Premier League and La Liga are more competitive and attractive, leading to higher talent inflow.
   - Serie A and the Bundesliga have higher proportions of resident teams, indicating less fluctuation in team performance.
   - The Premier League experiences significant performance variance among teams, reflecting intense competition for survival.

2. **Corporatization Effects:**
   - Football corporations like CFG and Red Bull Group show close cooperation between their clubs, particularly in player transfers and loans.
   - Manchester City tends to loan out players within the group, while RB Leipzig focuses on permanent transfers within the group.
   - The strategic differences between the two corporations are evident in their transfer approaches and investment strategies, with CFG displaying a more cautious investment approach.

3. **Implications for Football Corporations:**
   - Effective corporatization requires a balanced team structure for optimal synergy rather than focusing solely on the strength of individual clubs.
   - The economic benefits and strategic significance of corporatization can be better understood by comparing transfer fees and loan fees within and outside the group.

This analysis provides a comprehensive understanding of how football corporatization impacts team dynamics, transfer strategies, and competitive advantages in the top five European leagues.

#### disclaimer:

**All rights belongs to, and coursey to, the original author.** I do not preserve any rights of the original content. This blog is for sharing only.
