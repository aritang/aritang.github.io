---
title: "Html Music Player"
date: 2026-01-21T14:38:18-06:00
draft: false
---

Sometimes I embed music playing links onto my website. The workflow is as follows:

Create `assets/css/extended/custom.css` and paste:

```css
/* Apple Music Embed */
.music-embed {
  max-width: 660px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.music-embed iframe {
  display: block;
  width: 100%;
  border: none;
}

/* Alignment */
.music-embed.left {
  margin-right: auto;
}

.music-embed.center {
  margin-left: auto;
  margin-right: auto;
}

.music-embed.right {
  margin-left: auto;
}

/* Width modifiers */
.music-embed.small {
  max-width: 400px;
}

.music-embed.full {
  max-width: 100%;
}
```

I am ok with directly writing html code in markdown files (if you prefer another layer of abstraction, you can create an `.html` file in layouts so that embedding is more straightforward)

## Template:

```html
<div class="music-embed center">
  <iframe
    src="https://embed.music.apple.com/us/album/YOUR-ALBUM-ID"
    height="450"
    allow="autoplay *; encrypted-media *"
    allowfullscreen>
  </iframe>
</div>
```

## Configuration Options

### Alignment and size is configured when setting CSS class As seen in the line

`<div class="music-embed center small">`

Options includes: for alignment:

| Class    | Result        |
| -------- | ------------- |
| `left`   | Left-aligned  |
| `center` | Centered      |
| `right`  | Right-aligned |

For size:

| Class   | Result     |
| ------- | ---------- |
| (none)  | 660px max  |
| `small` | 400px max  |
| `full`  | 100% width |

### Height, on the other hand, can be set in iframe attributes

| Value  | Use case             |
| ------ | -------------------- |
| `175`  | Single song          |
| `450`  | Full album (default) |
| `500+` | Long playlists       |

### 
