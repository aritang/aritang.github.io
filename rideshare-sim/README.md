# Rideshare Platform Simulation

A live, animated agent-based market simulation of two competing rideshare platforms (Uber vs. Lyft). Built for a business school presentation — runs entirely in the browser with no backend.

## How to run

```bash
# Install dependencies (one-time)
npm install

# Start the development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

To build a static bundle for sharing/hosting:

```bash
npm run build   # output goes to dist/
```

---

## Folder structure

```
rideshare-sim/
├── index.html              Entry point HTML
├── package.json
├── vite.config.ts          Vite + React build config
├── tsconfig.json
│
└── src/
    ├── main.tsx            Mounts the React app into #root
    ├── index.css           Global styles + CSS keyframe animations
    │                         (arriveIn, switchPulse, matchBlink)
    ├── App.tsx             Root component — layout, simulation loop,
    │                         play/pause/step/reset, speed control,
    │                         sidebar toggles, platform stats display
    │
    ├── engine/             Pure TypeScript simulation core (no React)
    │   ├── types.ts        All shared type definitions:
    │   │                     SimConfig, SimSnapshot, Rider, Driver,
    │   │                     MatchRecord, PlatformState, animation Sets
    │   ├── prng.ts         Seeded PRNG (mulberry32) with helpers:
    │   │                     uniform, normal (Box-Muller), logNormal,
    │   │                     exponential, bernoulli, binomial, poisson
    │   ├── config.ts       DEFAULT_CONFIG, and named presets:
    │   │                     MARKET_PRESETS (5 scenarios),
    │   │                     SEARCH_PRESETS (6 search-cost combos),
    │   │                     SURGE_PRESETS (5 surge schedules)
    │   └── simulation.ts   SimulationRunner class — discrete-time engine:
    │                         step(), reset(), snapshot(), runAll()
    │                         Implements: LogNormal WTP/wages, FIFO queues,
    │                         Binomial matching, endogenous surge pricing,
    │                         free rival check for dissatisfied agents,
    │                         Bernoulli search for satisfied agents,
    │                         Poisson continuous arrivals each tick
    │
    └── components/         React UI components
        ├── LiveMarketViz.tsx  Main animated visualization:
        │                        two-column layout (Uber | Lyft),
        │                        riders stack above divider, drivers below,
        │                        fly-in animation for new arrivals,
        │                        switch-pulse for platform switchers,
        │                        match animation — pairs converge at divider,
        │                        blink, shrink, vanish.
        │                        Fully responsive via ResizeObserver.
        ├── ConfigPanel.tsx    Parameter sidebar — market scenario buttons,
        │                        search/surge presets, all sliders
        ├── Controls.tsx       Play / Pause / Step / Reset + speed dropdown
        │                        + progress bar
        ├── Charts.tsx         Recharts time-series panels:
        │                        price & wage paths, queue lengths,
        │                        cumulative matches, active agent counts
        └── QueuePanel.tsx     (Legacy — superseded by LiveMarketViz)
```

---

## Model in brief

Each tick the engine:

1. Draws a regional surge shock `z` from the schedule
2. Updates platform prices via log-linear surge feedback
3. Each queued rider/driver checks their current platform:
   - **Dissatisfied** (price > WTP or wage < reservation): free rival quote → switch or exit
   - **Satisfied**: pay Bernoulli(`c`) search cost → switch if rival is strictly better
4. Applies all switches simultaneously (from pre-switch state)
5. Draws matches: `M ~ Binomial(min(|queue_R|, |queue_D|), 1 − exp(−μ·Δt))`
6. Removes matched agents; records match revenue
7. Draws Poisson arrivals (`λ_R`, `λ_D`) and assigns them to a platform by default preference (`π`)

Color coding: **Uber = black**, **Lyft = pink**. Filled circles = riders; outlined rings = drivers.
