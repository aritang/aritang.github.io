---
title: "Video Embedding CSS Class Configuration"
date: 2025-12-10T23:01:11-06:00
draft: false
---

PaperMod **automatically loads** any CSS file inside `assets/css/extended/`. 

### Step 1: CSS Plugin

So in order to configure any plug in, just create file `assets/css/extended/video-embed.css` in Hugo Papermod working directory, and paste

```css
.video-embed {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  max-width: 800px;
  margin: 2rem auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.video-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 12px;
}

@media (prefers-color-scheme: dark) {
  .video-embed {
    box-shadow: 0 4px 12px rgba(0,0,0,0.6);
  }
}
```

### Step 2: html configure short code

Create `layouts/shortcodes/video.html` paste in:

```html
{{- $src := .Get "src" -}}
{{- $start := .Get "start" -}}
{{- $t := .Get "t" -}}
{{- $autoplay := .Get "autoplay" | default "0" -}}
{{- $width := .Get "width" -}}

{{/* Build query string safely */}}
{{- $query := slice -}}

{{- if $start -}}
  {{- $query = $query | append (printf "start=%s" $start) -}}
{{- end -}}

{{- if $t -}}
  {{- $query = $query | append (printf "t=%s" $t) -}}
{{- end -}}

{{- if ne $autoplay "1" -}}
  {{- $query = $query | append "autoplay=0" -}}
{{- else -}}
  {{- $query = $query | append "autoplay=1" -}}
{{- end -}}

{{- $qs := "" -}}
{{- if gt (len $query) 0 -}}
  {{- $qs = printf "?%s" (delimit $query "&") -}}
{{- end -}}

<div class="video-embed"{{ with $width }} style="max-width: {{ . }};"{{ end }}>
  <iframe
    src="{{ $src }}{{ $qs }}"
    allowfullscreen
    loading="lazy">
  </iframe>
</div>

```

Then it can be used like (remove the `\`)

```python
\{\{< video src="https://www.youtube.com/embed/VIDEO_ID" autoplay="1" >\}\}
```

