---
title: "Random Post Generator"
date: 2025-09-05T22:52:47-05:00
draft: false
---

Click [here](content/random) to jump to a random post.

How to create it?

### 1 Create the `random` layout

Create file `layouts/_default/random.html` and use the following code:

```html
<!-- USING layouts/_default/random.html -->

{{/* Collect posts (adjust sections if yours differ) */}}
{{- $pages := where site.RegularPages "Kind" "page" -}}
{{- $pages = where $pages "Section" "in" (slice "posts" "post" "blog") -}}
{{- $pages = where $pages "Params.draft" "ne" true -}}
{{- $pages = where $pages "Params.private" "ne" true -}}
{{- $pages = where $pages "Params.hidden" "ne" true -}}
{{- $pages = where $pages "Params.unlisted" "ne" true -}}

{{/* Use absolute URLs to avoid GitHub Project Pages repo-path issues */}}
{{- $urls := slice -}}
{{- range $pages -}}
  {{- $urls = $urls | append .Permalink -}}
{{- end -}}

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex">
  <title>Random Post</title>
  <style>
    body { font: 16px/1.45 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; padding: 24px; }
    #fallback { max-width: 720px; }
  </style>
</head>
<body>
<div id="fallback">
  <h1>Random Post</h1>
  {{ if eq (len $urls) 0 }}
    <p>No eligible posts found. Make sure posts are under <code>content/posts/</code> (or <code>post</code>/<code>blog</code>) and not drafts.</p>
  {{ else }}
    <p>Picking something for you… if nothing happens, choose one below:</p>
    <ul>
      {{- range $urls -}}<li><a href="{{ . }}">{{ . }}</a></li>{{- end -}}
    </ul>
  {{ end }}
</div>

<!-- after (mark as safe so Hugo doesn't re-escape/quote) -->
<script type="application/json" id="random-urls">{{ $urls | jsonify | safeHTML }}</script>

<!-- Load external JS. Use absURL to be safe on Project Pages. -->
<script src="{{ "js/random.js" | absURL }}"></script>
</body>
</html>

```

**How it works:**

- Hugo lists **all posts** automatically.
- JavaScript picks one **at random** and redirects immediately.
- If JS is disabled, users can manually click one from the list.

### Add a random page to `content`

Create a page `content/random.md` that uses the above 'random' layout — by specifying the markdown header:

```markdown
---
title: "Random"
layout: "random"
url: "/random/"
---
```

### (Optional) add random link to menu

Add to `config.yml` (likely already exists)

```yaml
menu:
  main:
    - name: "Home"
      url: "/"
      weight: 1
    - name: "Posts"
      url: "/posts/"
      weight: 2
    - name: "Random"
      url: "/random/"
      weight: 3
```

