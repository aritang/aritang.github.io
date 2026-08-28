// Bit-exact behavioural baseline for the engine.
//
// Why this exists: the engine replays an entire run from a seeded PRNG, and
// prng.ts's normal() caches a Box-Muller spare, so agents consume normals in
// pairs that straddle tick boundaries. One extra or missing draw anywhere
// permanently desynchronises every lognormal thereafter. An audit measured that
// such a break moves the 12-seed mean total matches by ~12 (about 2 SE) while
// individual seeds move up to 3.9% — i.e. a draw-order break is INVISIBLE to
// aggregate re-verification. Only an exact per-tick hash catches it.
//
//   npm run baseline:write   — regenerate (only ever on purpose)
//   npm run baseline:check   — assert the engine still matches
import { SimulationRunner } from '../src/engine/simulation';
import { DEFAULT_CONFIG, MARKET_PRESETS, SURGE_PRESETS } from '../src/engine/config';
import type { SimConfig } from '../src/engine/types';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Two disjoint seed sets: the one the calibration was reported on, and a
// contiguous block, so a break cannot hide in a lucky seed choice.
export const CALIBRATION_SEEDS = [42, 7, 101, 555, 2024, 13, 88, 907, 31, 604, 1234, 77];
export const BLOCK_SEEDS = [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];

function runHash(cfg: SimConfig): { hash: string; matches: number } {
  const run = new SimulationRunner(cfg);
  const h = createHash('sha256');
  while (!run.done) {
    run.step();
    const s = run.snapshot();
    // Full precision: no rounding. There is no parallelism or FMA in this
    // engine, so doubles are exactly reproducible and an epsilon tolerance
    // would let a draw-order break straight through.
    h.update([
      s.t,
      s.platforms.A.price, s.platforms.B.price,
      s.platforms.A.wage, s.platforms.B.wage,
      s.platforms.A.riderQueue.length, s.platforms.A.driverQueue.length,
      s.platforms.B.riderQueue.length, s.platforms.B.driverQueue.length,
      s.matchRecords.length,
    ].join(',') + '\n');
  }
  const f = run.snapshot();
  // Who matched with whom, and at what price — the thing FIFO order decides.
  for (const m of f.matchRecords) h.update(`${m.riderId}|${m.driverId}|${m.matchTime}|${m.price}\n`);
  return { hash: h.digest('hex').slice(0, 32), matches: f.matchRecords.length };
}

function build(): Record<string, { hash: string; matches: number }> {
  const out: Record<string, { hash: string; matches: number }> = {};
  const scenarios: Array<[string, Partial<SimConfig>]> = [
    ['DEFAULT', {}],
    ...MARKET_PRESETS.map(p => [p.label, p.patch] as [string, Partial<SimConfig>]),
  ];
  for (const [name, patch] of scenarios) {
    for (const seed of [...CALIBRATION_SEEDS, ...BLOCK_SEEDS]) {
      out[`${name}|seed${seed}`] = runHash({ ...DEFAULT_CONFIG, ...patch, seed });
    }
  }
  // The surge paths exercise alphaR/alphaD/betaR/betaD, where new shock code
  // would most plausibly perturb the stream.
  for (const sp of SURGE_PRESETS) {
    for (const seed of [42, 7, 101]) {
      out[`surge:${sp.label}|seed${seed}`] =
        runHash({ ...DEFAULT_CONFIG, surgeSchedule: sp.schedule, seed });
    }
  }
  return out;
}

const path = new URL('./baseline.json', import.meta.url).pathname;
const mode = process.argv[2];
const now = build();

if (mode === 'write') {
  writeFileSync(path, JSON.stringify(now, null, 1));
  console.log(`wrote ${Object.keys(now).length} baseline entries`);
} else {
  const want = JSON.parse(readFileSync(path, 'utf8')) as typeof now;
  const wantKeys = Object.keys(want), nowKeys = Object.keys(now);
  let bad = 0;
  for (const k of wantKeys) {
    if (!now[k]) { console.log(`  MISSING   ${k}`); bad++; continue; }
    if (now[k].hash !== want[k].hash) {
      console.log(`  CHANGED   ${k}  matches ${want[k].matches} -> ${now[k].matches}`);
      bad++;
    }
  }
  for (const k of nowKeys) if (!want[k]) { console.log(`  NEW       ${k}`); }
  if (bad) {
    console.log(`\n✗ ${bad}/${wantKeys.length} runs diverged from the baseline.`);
    console.log('  If this was intended, inspect the diff first, then: npm run baseline:write');
    process.exit(1);
  }
  console.log(`✓ all ${wantKeys.length} runs bit-identical to baseline`);
}
