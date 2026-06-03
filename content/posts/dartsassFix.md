---
title: "Dart Sass snap install failure | GitHub Actions"
date: 2026-05-01T20:52:32-05:00
draft: false
---

As of May 1 2026, Hugo deploy workflow failed at `sudo snap install dart-sass` with `error: unable to contact snap store`.

Root cause is GitHub Actions runners intermittently (or permanently) cannot reach the Canonical snap store. This seems to be an infrastructure-level issue.

**Fix:** Replaced snap install with a direct download from the Dart Sass GitHub releases. Pinned the version via an env var and extracted the binary to `${HOME}/.local`:

```yaml
env:
  DART_SASS_VERSION: ${{ github.event.inputs.dartSassVersion || '1.99.0' }}

steps:
  - name: Create directory for user-specific executable files
    run: mkdir -p "${HOME}/.local"
  - name: Install Dart Sass
    run: |
      curl -sLJO "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
      tar -C "${HOME}/.local" -xf "dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
      echo "${HOME}/.local/dart-sass" >> $GITHUB_PATH
```

**Key detail:** The download URL must include an explicit version number. Using `/releases/latest/download/` returns a redirect that produces a malformed response instead of the tarball.

Btw, **Dart Sass**, explained by Claude "to an undergrad"

> When you write a website, you style it with CSS — that's what controls colors, fonts, layout, spacing, etc. CSS works fine, but it can get repetitive and messy on bigger projects. For example, if your brand color is `#2a7ae2`, you'd have to copy-paste that hex code everywhere.
>
> Sass is basically CSS with superpowers. You can do things like store that color in a variable (`$brand-color: #2a7ae2`) and reuse it everywhere, nest your selectors so they mirror your HTML structure, and write reusable chunks of style called mixins. It makes stylesheets way easier to write and maintain.
>
> But browsers don't understand Sass — they only understand CSS. So you need a compiler that reads your `.scss` files and spits out normal `.css` files. That compiler is Dart Sass. It's called "Dart" Sass because it's written in the Dart programming language, but you don't need to know Dart to use it. You just install it, it runs in the background during your build, and you never think about it.
>
> In your case, your Hugo site's theme uses Sass for its styles. So when GitHub Actions builds your site, it needs Dart Sass installed to convert those styles into CSS. That's the only reason it's in your workflow — no Sass files, no need for it.