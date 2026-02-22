---
title: "eclipsed revelation - crafting eternal sunshine in keystrokes"
date: 2024-03-26T20:57:08+08:00
draft: false
tags: ["art", "music", "technical"]
---

Inspired by the aesthetic of eternal sunshine's album cover, I customized a Typora themeable that echos the album's concept.

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/eternal_sunshine/image00086.jpg" caption="the red of the gloves, paired with the innocent white dress, echoes a juxtaposition of passion and purity. meanwhile The dark background augments the sense of mesmerizing self-revelation.">}}

Instead of directly replicating the color palette from the album cover, I decided to take a more conceptual approach, in reflecting the commitment to an ethereal minimalism—like, an homage to the what Saturn Return brings into our lives. Particularly, the white background wasn’t merely a nod to convenience but a deliberate choice to reflect the album’s soul-stirring clarity, serving as the quiet space for thoughts to breathe and uncluttered. The typography of italics features *Karrilee*, a playful handwriting akin to break of seriousness adds a voice to italics—a subtle whisper of the album’s spirit.

**Here's a demo:**

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/eternal_sunshine/eternal_sunshine_typora_demo.png">}}

All details are fine-tuned: there the special customized item dots, carefully chosen header style and colors, blockquotes, etc. Yet, Less is more. Overall, it's a tribute to the aesthetic of eternal sunshine, reflecting a pursuits for a mentally comfortable writing environment.

### CSS file:

Last but not least, CSS:

```css
:root {
    /* Colors */
    --color-primary            : var(--red-600);
    --color-secondary          : var(--red-300);
    --marked-background        : var(--amber-200);
    --search-match-background  : var(--pink-300);
    --search-match-border-color: var(--pink-900);
    --selection-background     : var(--pink-300);
    --border-color: #FFFFFF; /* Change to use the primary color */
    --background-color            :  #FFFFFF; 
    --font-size       : 14px;
}

@media (prefers-color-scheme: dark) 
@font-face {
    font-family: 'Karrilee';
    src: url('./fonts/Karrilee-Regular.woff2') format('woff2'), /* Modern Browsers */
         url('./fonts/Karrilee-Regular.woff') format('woff'), /* Older Browsers */
         url('./fonts/Karrilee-Regular.ttf') format('truetype'); /* Oldest Browsers */
    font-weight: normal;
    font-style: normal;
}

/* Headers */
h1 {
    color: #8B0000; /* dark red */
    font-size: var(--font-size-xxl);
}
h2 {
    color: #A52A2A;  /* brown red */
    font-size: var(--font-size-xl);
}
h3 {
    color: #DAA520; /* gold */
    font-size: var(--font-size-l);
}
h4 {
    color: #F9D25A; /* rosy brown */
    font-size: var(--font-size-l);
}
h5 {
    color: var(--stone-700); /* tan */
    font-size: var(--font-size-m);
}
h6 {
    color: rgba(200, 139, 82, 0.7); /* gold-brown */
    font-size: var(--font-size-m);
}

/* Italics */
em {
    font-family: 'Karrilee', --font-family;
    color:  #DAA520; /* golden rod */
    font-weight: var(--strong-font-weight);
    font-size: var(--font-size-l); /* This will be the default size for italics in the body text */
}

/* Headers with Italics */
h1 em {
    font-size: var(--font-size-xxl); /* Inherits size from h1 */
}

h2 em {
    font-size: var(--font-size-xl); /* Inherits size from h2 */
}

h3 em {
    font-size: var(--font-size-l); /* Inherits size from h3 */
}

h4 em {
    font-size: var(--font-size-m); /* Inherits size from h4 */
}

h5 em {
    font-size: var(--font-size-m); /* Inherits size from h5 */
}

h6 em {
    font-size: var(--font-size-s); /* Inherits size from h6 */
    font-weight: 400
}


/* Boldfaces */
strong {
    color: #B22222; /* firebrick */
    font-weight: var(--strong-font-weight);
}

/* Quotes */
blockquote {
    border-left-color: #972121; /* dark red */
    background-color: rgba(151, 33, 33, 0.1); /* transparent red */
    color: #010101; /* black */
}

/* Customization for additional elements based on preference */
/* Update --color-primary and --color-secondary with shades of red */
:root {
    --color-primary: #8B0000; /* dark red for primary actions and highlights */
    --color-secondary: #DAA520; /* golden rod for secondary actions and accents */
}

/* Apply the font-family for italics across all emphasized text if desired */
em, i {
    font-family: 'Karrilee', --font-family;
}

/* Update the modular scale for typography if you want a different proportion */
:root {
    --modular-scale: 1.3; /* Adjust this value to scale your typography sizes */
}

ul {
    /* Removes default list style */
    list-style-type: none;
    padding-left: 1em; /* Adjust as necessary to align your list correctly */
}

ul li::before {
    /* Adds custom bullet */
    content: '❍';
    /* Controls spacing between the bullet and the list item */
    margin-right: .5em;
    /* Aligns bullet with text */
    position: absolute;
    margin-left: -1.0em; /* Adjust as necessary */
}
```

