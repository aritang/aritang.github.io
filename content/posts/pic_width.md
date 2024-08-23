---
title: "resize image with HTML code"
date: 2024-08-21T09:33:42+08:00
draft: false
---

When working with images in blog, one might need to adjust image size to fit different layouts and screen sizes. Here's the hack:

(**delete the space at after double `{{`**)

```html
{{ <figure align="center" src="/path/pic_name.jpeg" caption="caption_text" width="50%">}}
```

Or, by pixel size:

```html
{{ <figure align="center" src="/path/pic_name.jpeg" caption="caption_text" width="300px">}}
```

