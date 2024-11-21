---
title: "color in latex"
date: 2024-11-21T23:05:54+08:00
draft: false
---

To use more colors in Overleaf LaTeX, one can do the following: at header

```latex
\usepackage[dvipsnames]{xcolor}
```

Then the following named color can be accessed:

{{<figure align="center" src="https://sharelatex-wiki-cdn-671420.c.cdn77.org/learn-scripts/images/e/ef/OLxcolorList2.png" caption="[dvipsnames] provided colors" width="100%">}}

One can access colors by

```latex
\color{RoyalBlue}
```

Or, in a more fancy way, define the commands at header

```latex
\newcommand{\note}[1]{{\color{Rhodamine}\noindent\textbf{\{}{#1}\textbf{\}}}}
```

For more information, check out Overleaf's tutorial here: [Using colors in LaTeX](https://www.overleaf.com/learn/latex/Using_colors_in_LaTeX).
