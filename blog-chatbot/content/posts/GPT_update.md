---
title: "ChatGPT unleashed: a quirky adventure with niche GPT wizards"
date: 2023-11-10T23:39:26+08:00
draft: false
---

#### **Exploring the New Frontier of ChatGPT: A Journey with Specialized GPTs**

Recently, ChatGPT has undergone a remarkable transformation, introducing a diverse array of GPT models beyond the familiar GPT3.5, GPT4, and DALL-E. These specialized GPTs, likely fine-tuned versions of GPT4, offer tailored functionalities for specific tasks.

#### **A Test Drive with the "Data Analysis" Chatbox**

I ventured into the world of these new models, starting with the "Data Analysis" chatbox. However, my experience was mixed. The processing speed was sluggish, and the output generation seemed unstable. Especially during lengthy data analysis tasks, the system struggled, indicating that it might not yet be fully optimized for complex, long-sequence outputs. Moreover, encountering an error—like a connection loss—meant restarting the entire process from scratch, a time-consuming and frustrating ordeal.

#### **Finding the Sweet Spot**

Despite these challenges, I found that ChatGPT excels in short debugging and coding suggestion sessions. It adeptly simplifies verbose code blocks. For example, it condensed a dictionary creation process in Python from a for-loop to a more concise dictionary comprehension:

```python
# Before
voter_to_region_dict = {}
for voter, region in zip(unified_df['Voter_Name'], unified_df['Region']):
    voter_to_region_dict[voter] = region

# After
voter_to_region_dict = dict(zip(unified_df['Voter_Name'], unified_df['Region']))
```

#### **The Role of ChatGPT in Data Analysis**

In the current landscape, ChatGPT is best utilized as a support tool—a digital assistant or co-pilot—in coding and data analysis. It's akin to having a first-year PhD student or a research assistant: helpful, but not a replacement for the meticulous work involved in data cleaning and analysis.

#### **My Experience with Ballon d'Or Data**

I put ChatGPT to the test with the Ballon d'Or dataset, seeking its assistance in data cleaning and analysis. Unfortunately, the new data analysis feature fell short of expectations. Eventually, I resorted to guiding ChatGPT through step-by-step prompts for data cleaning, suggesting analysis schemes, and refining the approach through detailed fine-tuning. I executed the final code on my computer, preferring the familiarity of my terminal with its Monaco font.

Here's a visualization I created using ChatGPT's assistance: (btw, the data-cleaning process is tedious and not presented here. It took a lot of effort to (i) find and download (ii) parse into csv files and (iii) clean and prepare the data for analysis.)

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/data_vis/ballon_dor.jpeg" caption="cluster of voter -\> nominees">}}

And the code. Well, GPT is the perfect programmar always.

```python
import matplotlib.pyplot as plt
import networkx as nx
import numpy as np
import pandas as pd

# Load data
unified_df = pd.read_csv("ballon_dor_3years.csv")

def plot_graph_for_year(year, ax):
    df_year = unified_df[unified_df['year'] == year]
    
    # Create graph for the specific year
    G = nx.Graph()
    for _, row in df_year.iterrows():
        G.add_edge(row['Voter_Name'], row['First_Choice'], weight=100)
        G.add_edge(row['Voter_Name'], row['Second_Choice'], weight=0.5)
        G.add_edge(row['Voter_Name'], row['Third_Choice'], weight=0.1)

    # Set node attributes
    voter_nodes = set(df_year['Voter_Name'])
    player_nodes = set(df_year['First_Choice'])
    for node in G.nodes():
        G.nodes[node]['bipartite'] = 0 if node in voter_nodes else 1

    # Define color mapping for regions
    region_list = df_year['Region'].unique()
    color_map = plt.cm.rainbow(np.linspace(0, 1, len(region_list)))
    region_colors = {region: color for region, color in zip(region_list, color_map)}
    voter_to_region_dict = dict(zip(df_year['Voter_Name'], df_year['Region']))
    voter_colors = [region_colors[voter_to_region_dict[voter]] for voter in voter_nodes]

    # Draw the graph
    pos = nx.spring_layout(G, k = 0.005, iterations = 20, seed=10)

    # Draw the nodes and edges
    nx.draw_networkx_nodes(G, pos, nodelist=player_nodes, node_color='lightgreen', label='Players', edgecolors='k', node_size=100, ax=ax)
    nx.draw_networkx_nodes(G, pos, nodelist=voter_nodes, node_color=voter_colors, node_size=50, ax=ax)
    nx.draw_networkx_edges(G, pos, alpha=0.5, ax=ax)

    # Draw labels
    player_labels = {player: player for player in player_nodes}
    nx.draw_networkx_labels(G, pos, labels=player_labels, font_size=10, font_color='darkgreen', ax=ax)

    ax.set_title(f"Ballon d'Or Voting Network - {year}")
    ax.axis('off')

# Create subplots
fig, axes = plt.subplots(nrows=1, ncols=3, figsize=(60, 15))

# Plot each year
plot_graph_for_year(2013, axes[0])
plot_graph_for_year(2014, axes[1])
plot_graph_for_year(2015, axes[2])

plt.show()
```



