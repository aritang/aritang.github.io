---
title: "Syncing Overleaf with Local Editing"
date: 2025-08-27T23:53:55+08:00
draft: false
---

I'm not a LaTeX expert, but after a few papers and too many deadlines, here’s the system I’ve been using to stay sane, and **stay synced**.

**TeX** was created by Donald Knuth, the legendary computer scientist, while writing the legendary *The Art of Computer Programming* (He wasn’t happy with the typesetting quality, so he built TeX in 1978). The beauty is that LaTeX’s elegance lies in its logic + automation — like once the stage is set up, the rest is "the creation of beautiful books". So it's definitely worth the investment to set it up and manage it well.

-----

## Sync Overleaf with Local Editing

Overleaf is great, but **git integration** gives me flexibility and peace of mind:

* **Edit anywhere**: VS Code, Vim, or Overleaf’s editor.
* **Backups**: Even if Overleaf dies during a NeurIPS deadline rush, you have local copies.
* **Better control**: Branches, versioning, and full local compilation.

### Quick start:

1. **Clone Overleaf project**
    Get your Overleaf Git URL (Menu → Git) and:

    ```bash
    git clone https://git.overleaf.com/<your-project-id>
    ```

2. **Install a LaTeX distribution**

    * [TeX Live](https://www.tug.org/texlive/) / [MacTeX](https://www.tug.org/mactex/) (recommended, matches Overleaf)
    * Or [MiKTeX](https://miktex.org/) for Windows.

3. **Pick your editor**

    * **VS Code** + [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop)
    * Vim/Neovim with plugins
    * Or just stick with Overleaf’s browser editor.

4. **Compile locally**

    * In VS Code: `Cmd+Shift+P` → “Build LaTeX project” → pick your recipe.

    * Or via terminal:

        ```bash
        latexmk -pdf ArXiv/main.tex
        ```

----

## Project Organization

- **One paper = one research project**  
    Keep each project in its own folder, with subfolders for **different submissions**, **modules**, and **archived experiments**.  
    This makes syncing, compiling, and collaborating a lot easier.

Example project structure:

```bash
my-research-project/
├── ArXiv/                # arXiv submission version
│   ├── main.tex
│   ├── figures/
│   ├── sections/
│   ├── bibFiles/
│   └── necessary_files/
├── NeurIPS/              # NeurIPS version
│   ├── main.tex
│   ├── figures/
│   ├── sections/
│   └── neurips_2025.sty
├── IJCAI/                # IJCAI version
│   ├── main.tex
│   └── ijcai25.sty
├── shared/               # Shared resources
│   ├── bibFiles/
│   ├── macros.tex
│   └── packages.tex
└── README.md
```

This keeps **shared assets** (macros, `.bib` files, figures) centralized, while letting each submission stay independent.
