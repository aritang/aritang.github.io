---
title: "Adobe Flash Player on Website"
date: 2025-02-19T23:42:45+08:00
draft: false
---

Adobe Flash Player was retired by Adobe and major browser vendors since the beginning of 2021. By the time of 2025, major browsers (Chrome, Edge that works on Chromium core, and Safari) all **DON'T** support Flash. Which makes some interactive operations inapplicable.

But if you ever have the misfortune to still need the Flash function. Here's how to do it (works on Mac, guess similarly you can make it work on Windows too). Key is to (i) download **older version of Chrome** that still supports Adobe Flash Player (ii) download **Adobe Flash Player** and (iii) manually run older version of Chrome **with** Adobe Flash Player.

### Download older version of Chrome

Download historical Chromedriver ver. 87 (only <88 versions support Flash): https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Mac/827102/

Unzip the package, find and move `Chromium.app` to `/Applications` folder (DON'T miss our the `/` before `Applications`).

### Download Flash Player

Here: https://www.flash.cn/download. Download and use the installer to install.

### Run older version of Chrome **with** Adobe Flash Player

First, cause both Chromedriver and Flash are downloaded from web, Apple often refuses to open them. Open `System Settings.app`->`Privacy and Security` and grant both apps rights to open. (Google how-tos if you got system refuse-to-open pop-ups).

Then, simply run the following in terminal:

```python
/path_to_chromium/Chromium.app/Contents/MacOS/Chromium --enable-plugins --allow-outdated-plugins --ppapi-flash-path=/path_to_flash/Internet\ Plug-Ins/PepperFlashPlayer/PepperFlashPlayer.plugin
```

`path_to_chromium` will be `/Applications`. The `path_to_flash` is usually `/Library`. Finally, it's like

```python
/Applications/Chromium.app/Contents/MacOS/Chromium --enable-plugins --allow-outdated-plugins --ppapi-flash-path=/Library/Internet\ Plug-Ins/PepperFlashPlayer/PepperFlashPlayer.plugin
```

After the command, a virtual chrome should open that works with flash. (You probably need to manually open Chrome settings again to grant Flash for specific website, but that is click-able anyway).

Good luck!
