---
title: "Hugo Versioning and PaperMod Submodule"
date: 2025-12-16T10:53:53-06:00
draft: false
---

If it's not broken, don't fix it. DON'T.

But if it ever (unfortunately) happens, here's how to manage Papermod version control, compatible with hugo version:

### Structure of Hugo Papermod Website

Papermod is the theme powered by Hugo. Usually, I maintain the website locally:

```python
arianas_blog_local_repository
├── archetypes
├── assets
├── config.yml
├── content
├── convert_links.sh
├── layouts
    └── shortcodes
        ├── audio.html
        └── video.html
            ......
├── layouts_new
├── public
├── READMD.md
├── remove_tags.sh
├── resources
├── static
└── themes
	└── PaperMod
```

Here's what each file work:

- `content/` = markdown blog posts
- `themes/PaperMod` = look & behavior
- `layouts/` = look & behavior, personal overrides
- `config.yml` = major settings
- `assets/` + `static/` = pictures, files, like warehose
- **`archetypes/`** specifies templates for the markdown header for the command `hugo new post.md`
- `public/` = final site output
- `.github/workflows/hugo.yaml` = remote build + publish recipe

Basically, Hugo takes `content/` + `config.yml` + `themes/PaperMod/` + any overrides in `layouts/`, `asset/` and `static/` and compile them into `public/` which is the generated website output (HTML/CSS/JS).

------

## Papermod Submodule

Interestingly, the `themes/PaperMod/` is a submodule (aka a Git repo inside another Git repo). Git submodules are intentionally not synced with the main repo—the main repo does not store files inside ` themes/PaperMod` and the submodule's history. It stores only the URL of the PaperMod repo and the **commit hash**.

So after cloning the whole remote repository of the website into a local working directory (e.g. `git clone git@github.com:username/websitename.github.io.git`), run

```bash
git submodule update --init
```

or, if you are worried that some submodules nest submodules, do it recursively:

```python
git submodule update --init --recursive
```

This would pull down submodules at the **exact commit hashes** recorded in the parent git. So, though the developer might update their PaperMod remote repository. But if the current version works and I don't want to change it, in this way it remains the same.

Additionally, you can monitor all existing submodules in a parent git by running:

```bash
git submodule status
```

The terminal will return something like, for example, I have one submodule:

```python
7d061d56d4664bd themes/PaperMod (v8.0-54-g7d061d5)
```

`7d061d56d4664bd` is the pinned commit hash, `themes/PaperMod` is the pointer to where the directory is, and `(v8.0-54-g7d061d5)` is the human-friend version info from Git, means this commit is 54th commits after tag `v8.0`, and `g7d061d5` is the abbreviated commit hash.

------

### Maintaining the right hugo version

Sometimes one would updated their submodule (DON'T, if the current version works), by say, the one of the following, DANGEROUS commands:

```bash
git submodule update --remote
cd themes/PaperMod && git pull
cd themes/PaperMod && git checkout main
```

Then you will need to update ALL OTHER SOFTWARES so that they are compatible with the say, new PaperMod because the new PaperMod requires them. For example, new PaperMod often requires latest Hugo software. I then need to edit the following lines in `.github/workflows/hugo.yaml` to manually configure the hugo version:

```yaml
HUGO_VERSION: ${{ github.event.inputs.hugoVersion || '0.153.1' }}
```

NOTE: Why it doesn't suffice to update your local computer's hugo version but that you'll have to configure `.github/workflows/hugo.yaml`: GitHub actions is a remote build machine configured by this workflow yaml file—the workflow says: “On every push (or manual run), spin up Ubuntu, install Hugo version X, build the site, publish output.”

Therefore, local hugo version doesn't really help other than preview and debug. Still, it's helpful to keep the versions (local and the remote config) compatible, and FREEZE the `themes/PaperMod` submodule.
