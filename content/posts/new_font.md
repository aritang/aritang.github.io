---
title: "how to customize font on my website?"
date: 2024-10-17T23:29:42+08:00
draft: false
tags: ["trick"]
---

ChatGPT makes it much easier to modify configurations for my website. I changed the font to `Montserrat`—an open source font provided by Google font (`fonts.google.com`) that is highly similar to Google's proprietary logo font `Product Sans`.

> Google Sans [and Product Sans] is not available for use outside of Google. It is our brand font and is exclusively used in Google products.

Fine. Google font has a delivery service—everytime the website loads, it fetches font files from Google. So that only a few lines are required to do the customization:

Put the following in `<head>` of HTML:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=FAMILY_NAME:wght@WEIGHT_OR_RANGE&display=swap" rel="stylesheet">
```

Put the following lines in `custom.css`:

```css
.montserrat-main-heading {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;  // Example for a bold heading
  font-style: normal;
}

.montserrat-body-text {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;  // Normal weight for body text
  font-style: normal;
}
```

The location of the files varies for different website templates. But the basic logic is the same: first you have to get the font file, either fetch it from some online service portal API or just download and place it in the website's serving files (for example, in 'assets'). Second, configure somewhere to say that 'yes we're using the font'. That's all. 

Really, one thing that LLM/NLP would revolutionize is coding courses. Coding entry becomes lower. Emphasize would shift even more from understanding semantics to understanding logic of the code.

### reference

Using web fonts from a font delivery service. Google. https://fonts.google.com/knowledge/using_type/using_web_fonts_from_a_font_delivery_service
