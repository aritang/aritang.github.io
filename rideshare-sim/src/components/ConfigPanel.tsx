import React, { useState } from 'react';
import type { SimConfig } from '../engine/types';
import { DEFAULT_CONFIG, MARKET_PRESETS, SEARCH_PRESETS, SURGE_PRESETS } from '../engine/config';
import { previewCutoffs } from '../engine/simulation';

// One tick is 30 seconds of wall-clock time, so 120 ticks = 1 hour. Every
// derived figure shown in this panel converts through that.
const TICKS_PER_HOUR = 120;
const MIN_PER_TICK = 0.5;

interface Props {
  config: SimConfig;
  onChange: (c: SimConfig) => void;
}

// Show the value the engine will actually use — not a rounded version of it.
// lambdaD = 0.0125 must not read as "0.01", and a value off the step grid must
// still display truthfully.
function exact(v: number): string {
  if (Number.isInteger(v)) return String(v);
  const s = v.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
  return s === '-0' ? '0' : s;
}

// Standard normal CDF (Abramowitz & Stegun 7.1.26), for the accept-rate
// readouts below: a lognormal WTP means P(accept) is a normal tail.
function normCdf(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp(-x * x / 2);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937
          + t * (-1.821255978 + t * 1.330274429))));
  return x >= 0 ? 1 - p : p;
}

interface SliderRowProps {
  label: string;
  sym?: string;                     // the symbol as it appears in the equations
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;   // for the number box, when a unit helps
  parse?: (v: number) => number;    // inverse, when the slider is on a transform
  hint?: string;                    // what this value MEANS, in real units
}

function SliderRow({ label, sym, value, min, max, step, onChange, format, hint }: SliderRowProps) {
  // A value can legitimately sit outside the slider's range (a preset may set
  // alphaR = 1.5 on a 0..1 slider). Say so rather than silently clamping the
  // thumb and implying the config is something it is not.
  const outOfRange = value < min || value > max;
  // While the box is being typed in, show the keystrokes. Echoing the parsed
  // number straight back would make "0.06" impossible to type — the leading
  // "0." parses to 0 and would overwrite the field on the next render. On blur
  // it re-syncs to the engine's exact value, so float noise like
  // 25.000000000000004 never reaches the screen.
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <div style={{ padding: '3px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#6b7280', fontSize: 11, width: 118, flexShrink: 0, lineHeight: 1.2 }}>
          {label}
          {sym && <span style={{ color: '#c4cbd6', fontSize: 10, marginLeft: 4 }}>{sym}</span>}
        </span>
        <input
          type="range" min={min} max={max} step={step}
          value={Math.min(max, Math.max(min, value))}
          onChange={e => onChange(Number(e.target.value))}
          style={{ flex: 1, accentColor: outOfRange ? '#f59e0b' : '#3b82f6', minWidth: 0 }}
        />
        {/* Editable, so a calibrated value that is off the step grid can still
            be entered exactly instead of being snapped by the slider. */}
        <input
          type="number" min={min} max={max} step={step}
          value={draft ?? exact(value)}
          onChange={e => {
            setDraft(e.target.value);
            const n = Number(e.target.value);
            if (e.target.value.trim() !== '' && Number.isFinite(n)) onChange(n);
          }}
          onBlur={() => setDraft(null)}
          style={{
            width: 58, flexShrink: 0, textAlign: 'right',
            fontSize: 11, fontVariantNumeric: 'tabular-nums',
            color: outOfRange ? '#b45309' : '#0f172a',
            background: outOfRange ? '#fffbeb' : '#f8fafc',
            border: `1px solid ${outOfRange ? '#fcd34d' : '#e2e8f0'}`,
            borderRadius: 5, padding: '2px 4px',
          }}
        />
      </div>
      {(hint || format) && (
        <div style={{ marginLeft: 126, color: '#a9b2c0', fontSize: 9.5, lineHeight: 1.35 }}>
          {format ? format(value) : ''}{format && hint ? ' · ' : ''}{hint}
          {outOfRange && <span style={{ color: '#b45309' }}> · outside slider range, value kept</span>}
        </div>
      )}
    </div>
  );
}
function Toggle({ label, on, onChange, hint }: {
  label: string; on: boolean; onChange: (v: boolean) => void; hint?: string;
}) {
  return (
    <div style={{ padding: '3px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#6b7280', fontSize: 11, flex: 1 }}>{label}</span>
        <button onClick={() => onChange(!on)} style={{
          width: 58, flexShrink: 0, fontSize: 10, fontWeight: 700, cursor: 'pointer',
          borderRadius: 5, padding: '2px 4px',
          background: on ? '#ecfdf5' : '#f8fafc',
          border: `1px solid ${on ? '#6ee7b7' : '#e2e8f0'}`,
          color: on ? '#047857' : '#94a3b8',
        }}>{on ? 'ON' : 'OFF'}</button>
      </div>
      {hint && <div style={{ marginLeft: 0, color: '#a9b2c0', fontSize: 9.5, lineHeight: 1.35 }}>{hint}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 10 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#9ca3af', fontSize: 11, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.07em',
          padding: '6px 0', width: '100%', textAlign: 'left',
          display: 'flex', justifyContent: 'space-between',
        }}
      >
        {title} <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div style={{ paddingTop: 4 }}>{children}</div>}
    </div>
  );
}

export function ConfigPanel({ config, onChange }: Props) {
  const set = (patch: Partial<SimConfig>) => onChange({ ...config, ...patch });

  return (
    <div style={{
      background: '#ffffff',
      border: 'none',
      borderRadius: 0,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontSize: 12,
      overflowY: 'auto',
      maxHeight: '100%',
    }}>
      <div style={{ color: '#1e293b', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Parameters</div>

      {/* Market Scenarios */}
      <Section title="Market Scenarios">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {MARKET_PRESETS.map(p => {
            // A scenario is a complete specification, so it is applied over the
            // defaults — not over whatever is currently loaded. Merging over the
            // live config left fields behind from the previously clicked preset,
            // which meant a scenario did not reproduce its calibrated behaviour.
            // The presenter's seed and run length are theirs, so they survive.
            const isActive = (Object.keys(p.patch) as Array<keyof typeof p.patch>)
              .every(k => config[k as keyof SimConfig] === p.patch[k]);
            return (
              <button
                key={p.label}
                onClick={() => onChange({ ...DEFAULT_CONFIG, seed: config.seed, tMax: config.tMax, ...p.patch })}
                style={{
                  background: isActive ? '#f0fdf4' : '#f9fafb',
                  border: `1px solid ${isActive ? '#86efac' : '#e5e7eb'}`,
                  color: isActive ? '#15803d' : '#374151',
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontSize: 11,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 2 }}>{p.label}</div>
                <div style={{ opacity: 0.7, fontSize: 10 }}>{p.description}</div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Presets */}
      <Section title="Search & Surge Presets">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ color: '#9ca3af', fontSize: 11, marginBottom: 2 }}>
            Search experiments
            {config.searchRule !== 'bernoulli' && (
              <span style={{ color: '#b45309' }}>
                {' '}— these set c_R/c_D, which the active rule ignores. Switch to
                “Fixed coin” above to use them.
              </span>
            )}
          </div>
          {SEARCH_PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => set({ cR: p.cR, cD: p.cD })}
              style={{
                opacity: config.searchRule === 'bernoulli' ? 1 : 0.45,
                background: config.cR === p.cR && config.cD === p.cD ? '#eff6ff' : '#f9fafb',
                border: `1px solid ${config.cR === p.cR && config.cD === p.cD ? '#93c5fd' : '#e5e7eb'}`,
                color: config.cR === p.cR && config.cD === p.cD ? '#1d4ed8' : '#374151',
                borderRadius: 6,
                padding: '5px 10px',
                fontSize: 11,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {p.label}
            </button>
          ))}

          <div style={{ color: '#9ca3af', fontSize: 11, marginTop: 8, marginBottom: 2 }}>Surge scenarios</div>
          {SURGE_PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => set({ surgeSchedule: p.schedule })}
              style={{
                background: config.surgeSchedule === p.schedule ? '#fff7ed' : '#f9fafb',
                border: `1px solid ${config.surgeSchedule === p.schedule ? '#fdba74' : '#e5e7eb'}`,
                color: config.surgeSchedule === p.schedule ? '#c2410c' : '#374151',
                borderRadius: 6,
                padding: '5px 10px',
                fontSize: 11,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Population & Arrivals">
        <SliderRow label="Init riders" sym="n_R⁰" value={config.nRiders} min={0} max={100} step={1}
          onChange={v => set({ nRiders: v })}
          hint="t=0 cohort only — ~7% of everyone who ever arrives" />
        <SliderRow label="Init drivers" sym="n_D⁰" value={config.nDrivers} min={0} max={100} step={1}
          onChange={v => set({ nDrivers: v })} />
        <SliderRow label="Arrival rate, riders" sym="λ_R" value={config.arrivalRateR} min={0} max={10} step={0.05}
          onChange={v => set({ arrivalRateR: v })}
          format={v => `${(v * TICKS_PER_HOUR).toFixed(0)} requests/hr`}
          hint="this, not n_R⁰, is market size" />
        <SliderRow label="Arrival rate, drivers" sym="λ_D" value={config.arrivalRateD} min={0} max={10} step={0.05}
          onChange={v => set({ arrivalRateD: v })}
          format={v => `${(v * TICKS_PER_HOUR).toFixed(0)} sign-ons/hr`}
          hint={`λ_R/λ_D = ${(config.arrivalRateR / Math.max(1e-9, config.arrivalRateD)).toFixed(2)} — this sets the clearing price`} />
        <SliderRow label="WTP median" sym="e^μ_R" value={Math.exp(config.muR)} min={5} max={60} step={0.5}
          onChange={v => set({ muR: Math.log(v) })} format={v => `$${v.toFixed(2)} per trip`} />
        <SliderRow label="WTP spread" sym="σ_R" value={config.sigmaR} min={0.05} max={1.2} step={0.01}
          onChange={v => set({ sigmaR: v })}
          hint="also sets how far surge can move price before screening everyone out" />
        <SliderRow label="Res. wage median" sym="e^μ_D" value={Math.exp(config.muD)} min={3} max={40} step={0.5}
          onChange={v => set({ muD: Math.log(v) })} format={v => `$${v.toFixed(2)} per trip`} />
        <SliderRow label="Res. wage spread" sym="σ_D" value={config.sigmaD} min={0.05} max={1.2} step={0.01}
          onChange={v => set({ sigmaD: v })} />
        <SliderRow label="Rider patience" sym="λ^pat_R" value={config.lambdaR} min={0.001} max={0.3} step={0.001}
          onChange={v => set({ lambdaR: v })}
          format={v => `mean ${(MIN_PER_TICK / v).toFixed(1)} min`}
          hint="assumption — no published source for rider abandonment" />
        <SliderRow label="Driver patience" sym="λ^pat_D" value={config.lambdaD} min={0.001} max={0.3} step={0.001}
          onChange={v => set({ lambdaD: v })}
          format={v => `mean ${(MIN_PER_TICK / v).toFixed(1)} min`} />
      </Section>

      <Section title="Search Rule">
        {/* Which rule is live matters more than any single number here, and it
            used to be invisible — the equations block below described the
            Bernoulli rule regardless of what was running. */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
          {([
            ['threshold-attention', 'Rational', 'Search benefit covers its cost, gated by per-agent attention'],
            ['threshold', 'Synchronised', 'Same band, no attention gate — everyone looks at once'],
            ['bernoulli', 'Fixed coin', 'A satisfied agent checks the rival with probability cR/cD'],
          ] as const).map(([val, label, tip]) => (
            <button key={val} title={tip}
              onClick={() => set({ searchRule: val })}
              style={{
                flex: 1, padding: '5px 4px', fontSize: 10, cursor: 'pointer',
                borderRadius: 6, fontWeight: config.searchRule === val ? 800 : 500,
                background: config.searchRule === val ? '#eef2ff' : '#f9fafb',
                border: `1px solid ${config.searchRule === val ? '#818cf8' : '#e5e7eb'}`,
                color: config.searchRule === val ? '#3730a3' : '#6b7280',
              }}>
              {label}
            </button>
          ))}
        </div>

        {config.searchRule === 'bernoulli' ? (
          <>
            <SliderRow label="Rider check rate" sym="c_R" value={config.cR} min={0} max={1} step={0.01}
              onChange={v => set({ cR: v })}
              format={v => `${(100 * v).toFixed(0)}% per tick`}
              hint="P(a SATISFIED rider opens the rival app). Literal empirical rate ≈0.008" />
            <SliderRow label="Driver check rate" sym="c_D" value={config.cD} min={0} max={1} step={0.01}
              onChange={v => set({ cD: v })}
              format={v => `${(100 * v).toFixed(0)}% per tick`}
              hint={`c_D/c_R = ${(config.cD / Math.max(1e-9, config.cR)).toFixed(1)}×`} />
          </>
        ) : (
          <>
            {/* The ceiling is Hbar/p_j, roughly 0.07 — above it the band is empty
                and nobody searches at all, so the slider stops well short of 1. */}
            <SliderRow label="Rider search cost" sym="s_R" value={config.sR} min={0} max={0.15} step={0.002}
              onChange={v => set({ sR: v })}
              format={v => `${(100 * v).toFixed(1)}% of own WTP`}
              hint="above ≈7% the band is empty and nobody searches" />
            <SliderRow label="Driver search cost" sym="s_D" value={config.sD} min={0} max={0.6} step={0.005}
              onChange={v => set({ sD: v })}
              format={v => `${(100 * v).toFixed(1)}% of own res. cost`} />
            {config.searchRule === 'threshold-attention' && (
              <>
                <SliderRow label="Rider attention" sym="φ_R" value={config.attentionR} min={0.01} max={1} step={0.01}
                  onChange={v => set({ attentionR: v })}
                  format={v => `looks ${(100 * v).toFixed(0)}% of ticks`}
                  hint="how often an agent happens to look, vs whether looking would pay" />
                <SliderRow label="Driver attention" sym="φ_D" value={config.attentionD} min={0.01} max={1} step={0.01}
                  onChange={v => set({ attentionD: v })}
                  format={v => `looks ${(100 * v).toFixed(0)}% of ticks`}
                  hint={`φ_D/φ_R = ${(config.attentionD / Math.max(1e-9, config.attentionR)).toFixed(2)}× — this carries the driver-over-rider asymmetry`} />
              </>
            )}
            <SliderRow label="Re-search trigger" sym="δ" value={config.researchDelta} min={0} max={0.15} step={0.005}
              onChange={v => set({ researchDelta: v })}
              format={v => v === 0 ? 'every tick' : `rival price moved ${(100 * v).toFixed(1)}%`}
              hint="the write-up's search is one-shot; this stops an agent re-paying every tick" />
            <SliderRow label="Believed take rate" sym="τ_belief" value={config.tauBelief} min={0} max={0.6} step={0.01}
              onChange={v => set({ tauBelief: v })}
              hint="held fixed under a deviation, so a τ experiment is not seen through instantly" />
            <Toggle label="Liquidity discount" on={config.liquidityDiscount}
              onChange={v => set({ liquidityDiscount: v })}
              hint="scale the option value by the chance of actually transacting, so an agent will not switch to a better price and an empty board" />
          </>
        )}
      </Section>

      <Section title="Platform Shocks">
        <div style={{ color: '#a9b2c0', fontSize: 9.5, marginBottom: 6, lineHeight: 1.4 }}>
          Cohort shocks split into a factor common to both platforms and a
          differential one. ρ = 1 is purely common — both prices move together, so
          there is nothing to arbitrage and search dies. ρ = 0 maximises the
          uncertainty that makes search worth paying for.
        </div>
        <SliderRow label="Rider shock sd" sym="σ_a" value={config.sigmaShockR} min={0} max={0.8} step={0.01}
          onChange={v => set({ sigmaShockR: v })}
          hint={config.sigmaShockR === 0 && config.sigmaShockD === 0
            ? 'both zero: no platform-specific shocks, so search degenerates toward full information'
            : undefined} />
        <SliderRow label="Rider shock corr" sym="ρ_a" value={config.rhoShockR} min={-0.95} max={0.95} step={0.01}
          onChange={v => set({ rhoShockR: v })} />
        <SliderRow label="Driver shock sd" sym="σ_b" value={config.sigmaShockD} min={0} max={0.8} step={0.01}
          onChange={v => set({ sigmaShockD: v })} />
        <SliderRow label="Driver shock corr" sym="ρ_b" value={config.rhoShockD} min={-0.95} max={0.95} step={0.01}
          onChange={v => set({ rhoShockD: v })} />
        <SliderRow label="Shock half-life" sym="h" value={config.shockHalfLife} min={1} max={120} step={1}
          onChange={v => set({ shockHalfLife: v })}
          format={v => `${v} ticks = ${(v * MIN_PER_TICK).toFixed(1)} min · φ = ${Math.pow(2, -1 / Math.max(1e-6, v)).toFixed(3)}`}
          hint={config.shockHalfLife < Math.LN2 / Math.max(1e-9, config.etaA)
            ? 'BELOW ln2/η — the price update filters the shock out before any agent can see it'
            : 'above the ln2/η knee, so the shock reaches the price'} />
        <SliderRow label="Queue-noise sd" sym="σ_q" value={config.sigmaQ} min={0} max={0.5} step={0.005}
          onChange={v => set({ sigmaQ: v })}
          hint="the engine's own price dispersion, measured at 0.171. An equilibrium object, not a primitive" />
      </Section>

      <Section title="Platform Economics">
        <SliderRow label="Platform 1 take rate" sym="τ_A" value={config.tauA} min={0} max={0.6} step={0.01}
          onChange={v => set({ tauA: v })}
          format={v => `wage = ${((1 - v) * 100).toFixed(0)}% of price`}
          hint="the only durable two-sided advantage in this model" />
        <SliderRow label="Platform 2 take rate" sym="τ_B" value={config.tauB} min={0} max={0.6} step={0.01}
          onChange={v => set({ tauB: v })}
          format={v => `wage = ${((1 - v) * 100).toFixed(0)}% of price`} />
        <SliderRow label="Platform 1 opening price" sym="p₀ᴬ" value={config.p0A} min={3} max={60} step={0.5}
          onChange={v => set({ p0A: v })}
          format={v => `$${v.toFixed(2)} → wage $${((1 - config.tauA) * v).toFixed(2)}`}
          hint="TRANSIENT ONLY — the arrival ratio sets the clearing price" />
        <SliderRow label="Platform 2 opening price" sym="p₀ᴮ" value={config.p0B} min={3} max={60} step={0.5}
          onChange={v => set({ p0B: v })}
          format={v => `$${v.toFixed(2)} → wage $${((1 - config.tauB) * v).toFixed(2)}`} />
        <SliderRow label="Price floor" sym="p_min" value={config.pMin} min={1} max={20} step={0.5}
          onChange={v => set({ pMin: v })} format={v => `$${v.toFixed(2)}`} />
        <SliderRow label="Price cap" sym="p_max" value={config.pMax} min={20} max={120} step={1}
          onChange={v => set({ pMax: v })} format={v => `$${v.toFixed(2)}`}
          hint="if price pins here, the pricing signal is dead" />
      </Section>

      <Section title="Pricing Dynamics">
        <SliderRow label="Platform 1 imbalance resp." sym="η_A" value={config.etaA} min={0} max={0.5} step={0.005}
          onChange={v => set({ etaA: v })}
          hint="above ~0.10 the price path visibly two-cycles" />
        <SliderRow label="Platform 2 imbalance resp." sym="η_B" value={config.etaB} min={0} max={0.5} step={0.005}
          onChange={v => set({ etaB: v })} />
        <SliderRow label="Platform 1 surge pass-thru" sym="γ_A" value={config.gammaA} min={0} max={0.5} step={0.005}
          onChange={v => set({ gammaA: v })}
          format={v => config.etaA > 0 ? `γ/η = ${(v / config.etaA).toFixed(2)}` : 'η_A = 0: fixed fare'}
          hint="pins the idle-driver ratio, NOT the price. Keep γ/η in 0.5–1.0" />
        <SliderRow label="Platform 2 surge pass-thru" sym="γ_B" value={config.gammaB} min={0} max={0.5} step={0.005}
          onChange={v => set({ gammaB: v })}
          format={v => config.etaB > 0 ? `γ/η = ${(v / config.etaB).toFixed(2)}` : 'η_B = 0: fixed fare'} />
        <SliderRow label="Imbalance damping" sym="ε" value={config.epsilon} min={0.5} max={5} step={0.5}
          onChange={v => set({ epsilon: v })}
          hint="raise it in thin markets, or one agent moves the price 7% per tick" />
      </Section>

      <Section title="Matching & Time">
        <SliderRow label="Platform 1 match rate" sym="μ_A" value={config.muMatchA} min={0.005} max={1} step={0.005}
          onChange={v => set({ muMatchA: v })}
          format={v => `q = ${(1 - Math.exp(-v * config.dt)).toFixed(3)} · pickup ${(MIN_PER_TICK / (1 - Math.exp(-v * config.dt))).toFixed(1)} min`}
          hint="matching liquidity — the density externality lives here" />
        <SliderRow label="Platform 2 match rate" sym="μ_B" value={config.muMatchB} min={0.005} max={1} step={0.005}
          onChange={v => set({ muMatchB: v })}
          format={v => `q = ${(1 - Math.exp(-v * config.dt)).toFixed(3)} · pickup ${(MIN_PER_TICK / (1 - Math.exp(-v * config.dt))).toFixed(1)} min`} />
        <SliderRow label="Horizon" sym="T" value={config.tMax} min={20} max={400} step={10}
          onChange={v => set({ tMax: v })}
          format={v => `${v} ticks = ${(v * MIN_PER_TICK).toFixed(0)} min`} />
        <SliderRow label="Seed" value={config.seed} min={1} max={9999} step={1}
          onChange={v => set({ seed: v })} />
      </Section>

      <Section title="Regional Surge">
        <SliderRow label="Rider WTP sens." sym="β_R" value={config.betaR} min={0} max={1.5} step={0.01}
          onChange={v => set({ betaR: v })}
          format={v => `at z=1: WTP ×${Math.exp(v).toFixed(2)}`} />
        <SliderRow label="Driver wage sens." sym="β_D" value={config.betaD} min={-1} max={1.5} step={0.01}
          onChange={v => set({ betaD: v })}
          format={v => `at z=1: res. wage ×${Math.exp(v).toFixed(2)}`}
          hint="β_D > 0 is what makes surge necessary at all" />
        <SliderRow label="Rider arrival sens." sym="α_R" value={config.alphaR} min={0} max={2} step={0.01}
          onChange={v => set({ alphaR: v })}
          format={v => `at z=1: arrivals ×${Math.exp(v).toFixed(2)}`} />
        <SliderRow label="Driver arrival sens." sym="α_D" value={config.alphaD} min={-1} max={2} step={0.01}
          onChange={v => set({ alphaD: v })}
          format={v => `at z=1: arrivals ×${Math.exp(v).toFixed(2)}`}
          hint="α_D = 0 switches off supply response — the point of surge" />
      </Section>

      <Section title="Model Equations">
        <Equations config={config} />
      </Section>

      <Section title="Derived, at these settings">
        <Derived config={config} />
      </Section>

      <button
        onClick={() => onChange({ ...DEFAULT_CONFIG })}
        style={{
          background: '#f9fafb',
          color: '#9ca3af',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: '8px',
          cursor: 'pointer',
          fontSize: 12,
          marginTop: 4,
        }}
      >
        Reset to defaults
      </button>
    </div>
  );
}

// ── Model equations ──────────────────────────────────────────────────────────
// Rendered as plain text rather than pulling in a maths typesetter: the panel is
// 300px wide and these need to stay readable at 10px on a projector.

function Eq({ title, lines, note }: { title: string; lines: string[]; note?: string }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ color: '#64748b', fontSize: 10, fontWeight: 700, marginBottom: 2 }}>{title}</div>
      {lines.map((l, i) => (
        <div key={i} style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 10, color: '#0f172a', lineHeight: 1.5,
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>{l}</div>
      ))}
      {note && <div style={{ color: '#a9b2c0', fontSize: 9.5, lineHeight: 1.35, marginTop: 1 }}>{note}</div>}
    </div>
  );
}

function Equations({ config }: { config: SimConfig }) {
  const z = config.surgeSchedule(0);
  return (
    <div>
      <div style={{ color: '#a9b2c0', fontSize: 9.5, marginBottom: 7, lineHeight: 1.4 }}>
        One tick = 30 s, so 120 ticks = 1 hr. z(t) is the regional surge state.
        Subscript t+1 written as ₊.
      </div>

      <Eq title="Arrivals — Poisson, per tick"
        lines={[
          'N_R(t) ~ Poisson( λ_R · e^(α_R·z) )',
          'N_D(t) ~ Poisson( λ_D · e^(α_D·z) )',
        ]}
        note="Continuous arrivals; the t=0 cohort n⁰ is a small fraction of the run." />

      <Eq title="Initial homing — one draw, at birth"
        lines={[
          'P(home = P1) = π_R   (riders)',
          'P(home = P1) = π_D   (drivers)',
        ]}
        note="i.i.d. per agent, independent of WTP and of market state. Never re-drawn: π does not respond to who is winning, so there is no adoption feedback. Homing shifts only by switching." />

      <Eq title="Valuations — lognormal, surge-scaled"
        lines={[
          'WTP  v ~ LogNormal(μ_R, σ_R),  v_eff = v·e^(β_R·z)',
          'res. wage s ~ LogNormal(μ_D, σ_D), s_eff = s·e^(β_D·z)',
          'accept if   p ≤ v_eff      (rider)',
          'accept if   w ≥ s_eff      (driver)',
        ]} />

      {config.searchRule === 'bernoulli' ? (
        <Eq title="Search — fixed coin, per tick  ← ACTIVE"
          lines={[
            'satisfied:    open rival w.p. c_R (c_D)',
            '              switch iff  p_rival < p_own  and  p_rival ≤ v_eff',
            'dissatisfied: open rival free (always)',
            '              switch if acceptable, else EXIT',
          ]}
          note="c is a CHECK hazard, not a switch probability. Not derived from anything — the rational rule below replaces it." />
      ) : (
        <>
          <Eq title={`Search — threshold rule${config.searchRule === 'threshold-attention' ? ' + attention' : ' (synchronised)'}  ← ACTIVE`}
            lines={[
              'h(p) = log G_C((1-τ)p) − log[1 − F_V(p)]      strictly increasing,',
              '                                              so p reveals x = h(p)',
              'F_i|j(t) = Φ( (h(t) − m) / s ),   m = μ_x + ρ(h(p_j) − μ_x),',
              '                                  s = σ_x·√(1 − ρ²)',
              'H(v) = ∫₀^min(v,p_j) F_i|j(t) dt              rider option value',
              'K(c) = ∫_max(w_j,c)^∞ [1 − G_i|j(t)] dt       driver option value',
            ]}
            note="One belief per PLATFORM, not per agent — and that is exact, not a shortcut: the belief conditions only on p_j, which every agent on that platform observes identically. What differs across agents is their own type, and that enters the decision, not the belief." />
          <Eq title="Who searches"
            lines={[
              'rider:  search iff  H(v)/v ≥ s_R   ⟺   v ∈ [v₋, v₊]',
              '        v₊ = H̄/s_R  (closed form),   v₋ by bisection',
              '        empty iff  s_R·p_j > H̄',
              'driver: search iff  K(c) ≥ s_D·c   ⟺   c ≤ c₊',
              '        c₊ = K̄/s_D  on the operative branch',
              ...(config.searchRule === 'threshold-attention'
                ? ['', 'AND a per-agent attention draw fires:  φ_R (φ_D)']
                : []),
            ]}
            note={config.searchRule === 'threshold-attention'
              ? 'H(v)/v peaks exactly at v = p_j, so the rider set is an INTERVAL — the searcher is the marginal rider, not the rich one. The driver set is a lower set, because K is flat below the current wage while the cost rises with it. Attention makes the timing idiosyncratic: without it every agent in the band reacts to the same shock on the same tick.'
              : 'NO attention gate: the cutoffs are platform-level and deterministic in the agent own type, so every agent inside the band reacts to the same shock in the same direction on the same tick. This is the counterexample — dispersion RISES with search.'} />
        </>
      )}

      <Eq title="Patience — exponential"
        lines={[
          'P ~ Exp(λ^pat),  mean 1/λ^pat ticks',
          'exit when   accumulated wait ≥ P',
          'abandonment share = λ^pat / (λ^pat + q)',
        ]} />

      <Eq title="Matching — per platform, front of queue"
        lines={[
          'q = 1 − e^(−μ·Δt)',
          'matches ~ Binomial( min(Q_R, Q_D), q )',
        ]}
        note="Strictly FIFO, so a match always pairs the two front agents. Throughput is linear in queue depth." />

      <Eq title="Price — log walk on queue imbalance"
        lines={[
          'log p₊ = log p + η·log((Q_R+ε)/(Q_D+ε)) + γ·z',
          'p₊ clamped to [p_min, p_max]',
          'w = (1 − τ)·p        (same platform)',
        ]}
        note="w is tied to p, so the platform riders prefer is the one drivers reject. That coupling is why rider-side friction (low c_R) is what keeps the duopoly alive." />

      <Eq title="Steady state — three identities"
        lines={[
          'Q*  = (λ_arr · acceptRate · π) / (q + λ^pat)',
          'price:  λ_R·acceptR(p) / (q+λ^pat_R)',
          '      = λ_D·acceptD((1−τ)p) / (q+λ^pat_D)',
          'surge:  Q_D/Q_R → e^(γ·z/η)',
        ]}
        note="Identity 2 is why p₀ is a transient: the arrival RATIO pins the clearing price. Identity 3 is why a big γ buys idle drivers, not a higher price." />

      {z !== 0 && (
        <div style={{ color: '#b45309', fontSize: 9.5, lineHeight: 1.4 }}>
          Note: z(0) = {z.toFixed(2)} — this scenario starts already surged.
        </div>
      )}
    </div>
  );
}

// ── Live derived quantities ──────────────────────────────────────────────────

function Row({ k, v, note }: { k: string; v: string; note?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '1.5px 0' }}>
      <span style={{ color: '#6b7280', fontSize: 10, flex: 1 }}>{k}{note && <span style={{ color: '#c4cbd6' }}> {note}</span>}</span>
      <span style={{
        color: '#0f172a', fontSize: 10, fontWeight: 700,
        fontVariantNumeric: 'tabular-nums', flexShrink: 0,
      }}>{v}</span>
    </div>
  );
}

function Derived({ config }: { config: SimConfig }) {
  // Same code path the engine uses, with the shock pinned at its mean. Wrapped
  // because a mid-drag config can be transiently degenerate and this is a panel,
  // not a place to throw.
  let cut: ReturnType<typeof previewCutoffs> | null = null;
  if (config.searchRule !== 'bernoulli') {
    try {
      const c = previewCutoffs(config, 'A');
      if (Number.isFinite(c.Hbar)) cut = c;
    } catch { cut = null; }
  }
  const qA = 1 - Math.exp(-config.muMatchA * config.dt);
  const qB = 1 - Math.exp(-config.muMatchB * config.dt);
  // Evaluated at the OPENING price, since this panel sees the config and not the
  // live market. The clearing price is generally not p₀ — see identity 2.
  const wA = (1 - config.tauA) * config.p0A;
  const accR = 1 - normCdf((Math.log(config.p0A) - config.muR) / config.sigmaR);
  const accD = normCdf((Math.log(wA) - config.muD) / config.sigmaD);
  const qStarR = (config.arrivalRateR * accR * config.piR) / (qA + config.lambdaR);
  const qStarD = (config.arrivalRateD * accD * config.piD) / (qA + config.lambdaD);
  const idleRatio = config.etaA > 0 ? Math.exp(config.gammaA * config.surgeSchedule(0) / config.etaA) : 1;
  return (
    <div>
      <div style={{ color: '#a9b2c0', fontSize: 9.5, marginBottom: 6, lineHeight: 1.4 }}>
        Computed from the sliders above at the opening price p₀ᴬ, with the shock
        at its mean — not a simulation result. Run it to see where the market
        actually goes. Active search rule: <b style={{ color: '#64748b' }}>{
          config.searchRule === 'threshold-attention' ? 'rational + attention'
          : config.searchRule === 'threshold' ? 'synchronised (counterexample)'
          : 'fixed coin'}</b>.
      </div>
      <Row k="Rider arrivals" v={`${(config.arrivalRateR * TICKS_PER_HOUR).toFixed(0)}/hr`} />
      <Row k="Driver arrivals" v={`${(config.arrivalRateD * TICKS_PER_HOUR).toFixed(0)}/hr`} />
      <Row k="Arrival ratio" note="λ_R/λ_D" v={(config.arrivalRateR / Math.max(1e-9, config.arrivalRateD)).toFixed(2)} />
      <Row k="Accepted at p₀" note="riders" v={`${(100 * accR).toFixed(1)}%`} />
      <Row k="Accepted at w₀" note="drivers" v={`${(100 * accD).toFixed(1)}%`} />
      <Row k="Match hazard" note="q_A / q_B" v={`${qA.toFixed(3)} / ${qB.toFixed(3)}`} />
      <Row k="Mean pickup" note="P1 / P2" v={`${(MIN_PER_TICK / qA).toFixed(1)} / ${(MIN_PER_TICK / qB).toFixed(1)} min`} />
      <Row k="Abandonment" note="riders / drivers" v={`${(100 * config.lambdaR / (config.lambdaR + qA)).toFixed(1)}% / ${(100 * config.lambdaD / (config.lambdaD + qA)).toFixed(1)}%`} />
      <Row k="Predicted queue Q*" note="P1 R / D" v={`${qStarR.toFixed(1)} / ${qStarD.toFixed(1)}`} />
      <Row k="Homing inflow" note="P1:P2" v={`${(config.piR / Math.max(1e-9, 1 - config.piR)).toFixed(1)} : 1`} />
      {config.searchRule === 'bernoulli' ? (
        <Row k="Search ratio" note="c_D/c_R" v={config.cR > 0 ? `${(config.cD / config.cR).toFixed(1)}×` : '—'} />
      ) : (
        <>
          <Row k="Attention ratio" note="φ_D/φ_R" v={
            config.searchRule === 'threshold-attention' && config.attentionR > 0
              ? `${(config.attentionD / config.attentionR).toFixed(2)}×` : 'no gate'} />
          {cut && (
            <>
              <Row k="Rider option value" note="H̄" v={`$${cut.Hbar.toFixed(2)}`} />
              <Row k="Search cost ceiling" note="H̄/p₀ — above this, nobody" v={`${(100 * cut.Hbar / config.p0A).toFixed(1)}%`} />
              <Row k="Rider search band" note="WTP in [v₋, v₊]" v={
                Number.isFinite(cut.vMinus)
                  ? `$${cut.vMinus.toFixed(1)} – $${cut.vPlus.toFixed(1)}`
                  : 'EMPTY — nobody searches'} />
              <Row k="…share of all riders" note="unconditional" v={
                Number.isFinite(cut.vMinus)
                  ? `${(100 * (normCdf((Math.log(cut.vPlus) - config.muR) / config.sigmaR)
                            - normCdf((Math.log(Math.max(1e-9, cut.vMinus)) - config.muR) / config.sigmaR))).toFixed(0)}%`
                  : '0%'} />
              {config.liquidityDiscount && (
                <div style={{ color: '#a9b2c0', fontSize: 9.5, lineHeight: 1.35 }}>
                  Band shown is before the liquidity discount, which narrows it
                  tick by tick from the live queues (and can close it entirely
                  when the rival has no counterparties).
                </div>
              )}
              <Row k="Driver cutoff" note="res. cost ≤ c₊" v={
                Number.isFinite(cut.cPlus) ? `$${cut.cPlus.toFixed(2)}` : 'all search'} />
              <Row k="…share of all drivers" note="unconditional" v={
                Number.isFinite(cut.cPlus)
                  ? `${(100 * normCdf((Math.log(Math.max(1e-9, cut.cPlus)) - config.muD) / config.sigmaD)).toFixed(0)}%`
                  : '100%'} />
              {cut.degenerate && (
                <div style={{ color: '#b45309', fontSize: 9.5, lineHeight: 1.35, marginTop: 3 }}>
                  Full-information branch: the conditional dispersion has collapsed
                  (σ_x·√(1−ρ²) ≈ 0), so the rival's price is known rather than
                  guessed. Raise a shock sd, or move ρ away from ±1.
                </div>
              )}
            </>
          )}
          <Row k="Belief σ_x / ρ" note="derived unless overridden" v={
            `${(config.beliefSigmaX ?? Math.sqrt(config.sigmaShockR ** 2 + config.sigmaShockD ** 2 + config.sigmaQ ** 2)).toFixed(3)} / ${(config.beliefRho ?? ((config.sigmaShockR ** 2 + config.sigmaShockD ** 2 + config.sigmaQ ** 2) > 0 ? (config.rhoShockR * config.sigmaShockR ** 2 + config.rhoShockD * config.sigmaShockD ** 2) / (config.sigmaShockR ** 2 + config.sigmaShockD ** 2 + config.sigmaQ ** 2) : 0)).toFixed(3)}`} />
        </>
      )}
      <Row k="Idle-driver ratio" note="e^(γz/η), P1" v={idleRatio.toFixed(2)} />
      <Row k="Run length" v={`${config.tMax} ticks = ${(config.tMax * MIN_PER_TICK).toFixed(0)} min`} />
      <Row k="Tick Δt" note="fixed — not adjustable" v={`${config.dt} = 30 s`} />
      <div style={{ color: '#a9b2c0', fontSize: 9.5, lineHeight: 1.35, marginTop: 5 }}>
        Q* is for P1 and is accurate to roughly ±20%: it ignores
        switching, and the accept rate is convex in a price that fluctuates.
        Δt is fixed because every minute-figure in this panel converts through
        it — changing it would silently invalidate all of them.
      </div>
    </div>
  );
}
