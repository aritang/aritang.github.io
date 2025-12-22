---
title: "Hugo Update"
date: 2025-12-16T10:53:53-06:00
draft: false
---

If it ain't broke, don't fix it. DON'T EVEN EVER THINK ABOUT IT.

Here's a short tutorial/record of how to migrate and update hugo Papermod version.

### Structure of Hugo Papermod Website

Papermod is the theme powered by Hugo. A typical website maintained locally can be stored in one folder:

```python
arianas_blog_local_repository
├── archetypes
├── aritang
├── assets
├── config.yml
├── content
├── convert_links.sh
├── data
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

Hugo takes `content/` + `config.yml` + `themes/PaperMod/` + any overrides in `layouts/`, `asset/` and `static/` and compile them into `public/` which is the generated website output (HTML/CSS/JS). Additionally, **`archetypes/`** specifies templates for the markdown header of  `hugo new post.md`. Other files are more miscellaneous personal customization, e.g. 



