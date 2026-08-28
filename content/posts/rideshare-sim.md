---
title: "rideshare sim, in the browser"
date: 2026-08-28T12:00:00+08:00
draft: false
summary: A two-platform rideshare market you can step through, pause, and re-parameterize.
---

two platforms, a queue of riders, a queue of drivers, and prices that move. hit
play and watch matches clear; open the config panel to change the commission
rates $\tau_A, \tau_B$, the base prices, or the arrival process, then reset.

everything runs client-side — no server, no data leaves the page. the seed is
fixed, so the same config gives the same run.

{{< rideshare-sim >}}

controls: **step** advances one period, **play** runs continuously at the chosen
speed, **reset** rebuilds the market from the current config. the side panels
drag wider if you want to read the equations.
