---
title: "Use Audio Card in Hugo Website"
date: 2025-09-15T22:18:26-05:00
draft: false
---

You can configure Hugo Papermod file to create audio cards in websites—like pictures. Everytime you store in `static/audio/track.mp3`, then put the following embedding code in the markdown text:

{{

```html
< audio
    src="/audio/graze_the_roof.m4a"
    title="Graze the Roof"
    artist="Ariana Tang"
    caption="April 2022, Created using Logic Pro"
    cover="/audio/graze_the_roof_cover.jpeg"
    download=false

>
```

}}

And the audio player would appear:

{{< audio
    src="/audio/graze_the_roof.m4a"
    title="Graze the Roof"
    artist="Ariana Tang"
    caption="April 2022, Created using Logic Pro"
    cover="/audio/graze_the_roof_cover.jpeg"
    download=false

>}}

---

Here's what you need to do for the above to work

### 1 Add html file `layouts/shortcodes/audio.html`:

It supports:

- `src` (required) – MP3/WAV/OGG in `/static/...`
- `title`, `artist`, `caption` – shown above/below the player
- `cover` – optional image
- `download` – `true`/`false` for a download link
- `loop`, `autoplay`, `muted`
- `src_ogg` – optional second source for widest browser support

```html
{{- $src := .Get "src" -}}
{{- if not $src -}}
  <p><em>Audio “src” is required.</em></p>
{{- else -}}
  {{- $title    := .Get "title"    | default "" -}}
  {{- $artist   := .Get "artist"   | default "" -}}
  {{- $caption  := .Get "caption"  | default "" -}}
  {{- $cover    := .Get "cover"    | default "" -}}
  {{- $download := .Get "download" | default false -}}
  {{- $loop     := .Get "loop"     | default false -}}
  {{- $autoplay := .Get "autoplay" | default false -}}
  {{- $muted    := .Get "muted"    | default false -}}
  {{- $srcOGG   := .Get "src_ogg" -}}

  {{- $ext  := lower (path.Ext $src) -}}
  {{- $mime := cond (eq $ext ".ogg") "audio/ogg" (cond (eq $ext ".wav") "audio/wav" "audio/mpeg") -}}

  <figure
    class="audio-card{{ if $cover }} has-cover{{ end }}"
    {{ if $cover }}style="--cover-url: url('{{ $cover | absURL | safeURL }}');"{{ end }}
    itemscope itemtype="https://schema.org/MusicRecording">

    <div class="audio-card__content">
      <div class="audio-card__media">
        {{- if $cover -}}
          <img src="{{ $cover | absURL | safeURL }}" alt="Cover art for {{ $title }}" loading="lazy" itemprop="image" />
        {{- end -}}
        <div class="audio-card__meta">
          {{- if $title }}<div class="audio-card__title" itemprop="name">{{ $title }}</div>{{- end }}
          {{- if $artist }}<div class="audio-card__artist" itemprop="byArtist">{{ $artist }}</div>{{- end }}
        </div>
      </div>

      <audio class="audio-card__player" controls preload="metadata"
        {{ if $autoplay }}autoplay{{ end }} {{ if $loop }}loop{{ end }} {{ if $muted }}muted{{ end }}>
        <source src="{{ $src | absURL | safeURL }}" type="{{ $mime }}" />
        {{- with $srcOGG -}}<source src="{{ . | absURL | safeURL }}" type="audio/ogg" />{{- end -}}
        Your browser does not support the audio element.
      </audio>

      {{- if or $caption $download -}}
        <figcaption class="audio-card__caption">
          {{- if $caption -}}<span>{{ $caption }}</span>{{- end -}}
          {{- if $download -}}
            <a class="audio-card__download" href="{{ $src | absURL | safeURL }}" download>Download</a>
          {{- end -}}
        </figcaption>
      {{- end -}}
    </div>
  </figure>
{{- end -}}

```

### 2 Add a little Papermod-friendly css file `assets/css/extended/audio.css`

Create `assets/css/extended/audio.css` (PaperMod auto-includes anything under `assets/css/extended/`). Css configures aesthetics of the audio box. The following css is edited to present nicely (good margin, nice color):

```css
/* Tunables */
.audio-card {
  --ac-blur: 28px;                    /* background blur amount */
  --ac-sat: 1.15;                     /* background saturation boost */
  --ac-tint: rgba(247,247,247,.65);   /* glass tint */
  --ac-border: rgba(0,0,0,.08);
  --ac-radius: 14px;
}

@media (prefers-color-scheme: dark) {
  .audio-card {
    --ac-tint: rgba(26,26,26,.40);
    --ac-border: rgba(255,255,255,.12);
  }
}

/* Card base */
.audio-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--ac-radius);
  border: 1px solid var(--ac-border);
}

/* Layering: bg(0) < glass(1) < content(2) */
.audio-card__bg,
.audio-card__glass,
.audio-card__content {
  position: absolute;
  inset: 0;
}

.audio-card__bg { z-index: 0; }
.audio-card__glass { z-index: 1; }
.audio-card__content { z-index: 2; position: relative; }

/* Background (color borrow from cover) */
.audio-card__bg {
  background-size: cover;
  background-position: center;
  filter: blur(var(--ac-blur)) saturate(var(--ac-sat));
  transform: scale(1.08); /* avoid edge clipping after blur */
  opacity: 0.48;
  pointer-events: none;
}

/* Fallback texture when no cover */
.audio-card.no-cover .audio-card__bg {
  background:
    radial-gradient(120% 100% at 10% 0%, rgba(0,0,0,.05), rgba(0,0,0,0)),
    linear-gradient(135deg, rgba(0,0,0,.03), rgba(0,0,0,.01));
  filter: none;
  transform: none;
  opacity: 1;
}

/* Glass tint (no blur, so text stays crisp) */
.audio-card__glass {
  background: var(--ac-tint);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.25);
  pointer-events: none;
  border-radius: inherit;
}

.audio-card__content {
  padding-left: 1.2rem; /* shifts all inner content right */
  padding-right: 1.2rem; /* optional symmetry */
}

.audio-card__media,
.audio-card__caption {
  margin: 0;             /* reset extra spacing so gutters stay consistent */
}


/* Foreground layout */
.audio-card__media {
  display: flex; align-items: center; gap: 1.0rem;
  padding: 1rem 1rem 0 1rem;
}
.audio-card__media img {
  width: 88px; height: 88px; object-fit: cover; border-radius: 10px;
}
.audio-card__meta { min-width: 0; }
.audio-card__title {
     font-weight: 600; line-height: 1.2; 
    font-size: 1.2rem;
    }
.audio-card__artist { font-size: 0.95rem; opacity: 0.85; }


.audio-card__player {
  width: 96%;
  padding-right: 1rem;      /* breathing room on the right */
  padding-left: 1rem;       /* optional: match left gap */
  padding-bottom: 0.2rem; /* avoid player controls touching edge */
  margin-top: 0rem;
}


.audio-card__caption {
  display: flex; justify-content: space-between; align-items: baseline;
  gap: 0.75rem; font-size: 0.95rem; opacity: 0.88; padding: 0 1rem 1rem 1rem;
}
.audio-card__download {
  white-space: nowrap; text-decoration: none;
  border: 1px solid var(--ac-border); border-radius: 0.5rem; padding: 0.25rem 0.5rem;
}

/* Optional: keep borders tidy when nested in rounded containers */
.audio-card__bg,
.audio-card__glass { border-radius: inherit; }
```

