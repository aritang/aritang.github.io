import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, AreaChart, Area, ReferenceLine,
} from 'recharts';
import type { TimeSeriesPoint } from '../engine/types';

interface Props {
  timeSeries: TimeSeriesPoint[];
  /** Run horizon, so the time axis is the WHOLE run from the first frame. */
  tMax: number;
}

// ── Why the axes are pinned ──────────────────────────────────────────────────
// Recharts defaults a dataKey axis to type="category", which spaces points
// evenly by index. As points accumulate every tick the whole series is rescaled
// horizontally, so the line crawls and the tick labels shuffle — the "wiggle".
// Fixing the domain to [0, tMax] makes the plot a fixed frame that the line
// draws into left to right.
//
// The value axes need the same treatment for a different reason: an auto domain
// re-fits on every tick, so a line can move vertically while its data has not
// changed. Quantising the domain to a coarse step fixes that, and because the
// series only ever gains points, the observed max is monotone — so a quantised
// domain can only ever step OUT, never jitter.
// ── Why the curves are smoothed ──────────────────────────────────────────────
// Pinning the axes removed the frame's motion but not the line's. The price is a
// log-integrator that steps every tick, so it genuinely zigzags: measured on the
// urban calibration, the price change flips sign on 42% of consecutive ticks with
// a mean step of 4.2% of the level, and in the synchronised-search counterexample
// it is 93% of ticks at 35% of the level (a period-2 oscillation, lag-1
// autocorrelation of the increments = -0.94). At 200 points across ~300px that is
// 1.5px per point, which reads as a fuzzy band rather than a path.
//
// So the heavy line is a CENTRED moving average and the raw series stays
// underneath as a faint line. Nothing is hidden — which matters, because in the
// counterexample the oscillation IS the finding — and the window is on screen and
// adjustable rather than being a silent transformation of the data.
function smoothKey(k: string) { return k + '_s'; }

/** Centred moving average, shrinking the window at the ends rather than
 *  padding — so the line neither starts late nor bends toward zero. */
function addSmoothed<T extends Record<string, unknown>>(
  rows: T[], keys: string[], w: number,
): Array<T & Record<string, number | null>> {
  const half = w >> 1;
  return rows.map((row, i) => {
    const out: Record<string, number | null> = {};
    for (const k of keys) {
      const lo = Math.max(0, i - half), hi = Math.min(rows.length - 1, i + half);
      let sum = 0, n = 0;
      for (let j = lo; j <= hi; j++) {
        const v = rows[j][k] as number;
        if (typeof v === 'number' && Number.isFinite(v)) { sum += v; n++; }
      }
      out[smoothKey(k)] = n > 0 ? sum / n : null;
    }
    return { ...row, ...out };
  });
}

function niceMax(v: number, step: number): number {
  return Math.max(step, Math.ceil(v / step) * step);
}
function seriesMax(rows: TimeSeriesPoint[], keys: Array<keyof TimeSeriesPoint>): number {
  let m = 0;
  for (const r of rows) for (const k of keys) {
    const x = r[k] as number;
    if (typeof x === 'number' && Number.isFinite(x) && x > m) m = x;
  }
  return m;
}

const P1 = '#111111';
const P2 = '#ec4899';
const P1_LIGHT = '#6b7280';
const P2_LIGHT = '#f9a8d4';
const SURGE_COLOR = '#f97316';

const GRID = '#e5e7eb';
const TICK_COLOR = '#9ca3af';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div style={{ background: '#f9fafb', borderRadius: 10, padding: '14px 16px 8px', border: '1px solid #e5e7eb' }}>
      <div style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: 8,
      padding: '8px 12px',
      fontSize: 12,
    }}>
      <div style={{ color: '#9ca3af', marginBottom: 4 }}>t = {label}</div>
      {payload
        // The faint raw underlay would double every price row in the tooltip.
        .filter((p: any) => !String(p.name ?? '').includes('(raw)'))
        .map((p: any) => (
        <div key={p.name} style={{ color: p.color === '#111111' || p.color === 'none' ? '#374151' : p.color, marginBottom: 2 }}>
          {p.name}: {typeof p.value !== 'number' ? String(p.value)
            : p.dataKey === 'matchShare' ? `${(100 * p.value).toFixed(1)}%`
            : Number.isInteger(p.value) ? p.value
            : p.value.toFixed(2)}
        </div>
      ))}
    </div>
  );
};

export function SimCharts({ timeSeries, tMax }: Props) {
  // 5 ticks = 2.5 minutes. Cuts the urban tick-to-tick jitter by 53% and the
  // counterexample's by 82%, without moving the surge spike noticeably.
  const [win, setWin] = useState(5);
  if (timeSeries.length === 0) return null;

  const surgePoints = timeSeries.filter(p => p.z > 0);
  const hasSurge = surgePoints.length > 0;

  // One fixed time axis for every chart, so they stay visually comparable and
  // none of them rescales as the run proceeds.
  const xAxis = {
    dataKey: 't' as const,
    type: 'number' as const,
    domain: [0, tMax] as [number, number],
    allowDataOverflow: true,
    ticks: Array.from({ length: 6 }, (_, i) => Math.round((i * tMax) / 5)),
    tick: { fill: TICK_COLOR, fontSize: 10 },
  };

  const priceMax = niceMax(seriesMax(timeSeries, ['pA', 'pB', 'wA', 'wB']), 10);
  const queueMax = niceMax(seriesMax(timeSeries, ['qRA', 'qDA', 'qRB', 'qDB']), 10);
  const activeMax = niceMax(seriesMax(timeSeries, ['activeRiders', 'activeDrivers']), 20);
  const zMax = niceMax(seriesMax(timeSeries, ['z']), 0.5);

  // Platform 1's share of cumulative matches. Null until the first match, so the line
  // starts where it becomes meaningful instead of sitting at a made-up 0 or 0.5.
  const base = timeSeries.map(p => {
    const tot = p.cumulativeMatchesA + p.cumulativeMatchesB;
    return { ...p, matchShare: tot > 0 ? p.cumulativeMatchesA / tot : null };
  });
  // z(t) is a step function and the cumulative share is already smooth, so
  // neither is averaged.
  const rows = win > 1
    ? addSmoothed(base, ['pA', 'pB', 'wA', 'wB', 'qRA', 'qDA', 'qRB', 'qDB', 'activeRiders', 'activeDrivers'], win)
    : base.map(r => ({ ...r, ...Object.fromEntries(
        ['pA','pB','wA','wB','qRA','qDA','qRB','qDB','activeRiders','activeDrivers'].map(k => [smoothKey(k), r[k as keyof typeof r] as number]))}));


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* The smoothing window is a control, not a hidden default. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#9ca3af' }}>
        <span>Smoothing</span>
        {[1, 5, 11, 21].map(w => (
          <button key={w} onClick={() => setWin(w)} style={{
            padding: '2px 8px', fontSize: 10, cursor: 'pointer', borderRadius: 5,
            fontWeight: win === w ? 800 : 500,
            background: win === w ? '#eef2ff' : '#f9fafb',
            border: `1px solid ${win === w ? '#818cf8' : '#e5e7eb'}`,
            color: win === w ? '#3730a3' : '#6b7280',
          }}>{w === 1 ? 'raw' : `${w}t`}</button>
        ))}
        {win > 1 && <span style={{ marginLeft: 2 }}>
          centred {win}-tick mean ({(win * 0.5).toFixed(1)} min) · raw shown faint
        </span>}
      </div>

      {/* Price paths */}
      <ChartCard title="Price & Wage Paths">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={rows} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
            <XAxis {...xAxis} />
            <YAxis tick={{ fill: TICK_COLOR, fontSize: 10 }} domain={[0, priceMax]}
              allowDataOverflow tickFormatter={v => `$${v.toFixed(0)}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#6b7280' }} />
            {hasSurge && timeSeries.map((p, i) =>
              p.z > 0 && (i === 0 || timeSeries[i - 1].z === 0) ? (
                <ReferenceLine key={i} x={p.t} stroke={SURGE_COLOR} strokeDasharray="4 2" strokeWidth={1} />
              ) : null
            )}
            {/* Raw, underneath and faint, so the smoothing conceals nothing —
                in the synchronised-search scenario this oscillation IS the
                result. No legend entries; they would double the legend. */}
            {win > 1 && <>
              <Line type="linear" dataKey="pA" stroke={P1} dot={false} strokeWidth={0.75} opacity={0.28} legendType="none" name="Platform 1 price (raw)" />
              <Line type="linear" dataKey="pB" stroke={P2} dot={false} strokeWidth={0.75} opacity={0.28} legendType="none" name="Platform 2 price (raw)" />
            </>}
            <Line type="monotone" dataKey={smoothKey('pA')} name="Platform 1 Price" stroke={P1} dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey={smoothKey('pB')} name="Platform 2 Price" stroke={P2} dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey={smoothKey('wA')} name="Platform 1 Wage" stroke={P1_LIGHT} dot={false} strokeWidth={1.5} strokeDasharray="4 2" />
            <Line type="monotone" dataKey={smoothKey('wB')} name="Platform 2 Wage" stroke={P2_LIGHT} dot={false} strokeWidth={1.5} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Queue lengths */}
      <ChartCard title="Queue Lengths">
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={rows} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
            <XAxis {...xAxis} />
            <YAxis tick={{ fill: TICK_COLOR, fontSize: 10 }} allowDecimals={false}
              domain={[0, queueMax]} allowDataOverflow />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#6b7280' }} />
            <Area type="monotone" dataKey={smoothKey('qRA')} name="Platform 1 Riders" stroke={P1} fill={P1 + '30'} dot={false} strokeWidth={1.5} />
            <Area type="monotone" dataKey={smoothKey('qDA')} name="Platform 1 Drivers" stroke={P1_LIGHT} fill={P1_LIGHT + '20'} dot={false} strokeWidth={1.5} />
            <Area type="monotone" dataKey={smoothKey('qRB')} name="Platform 2 Riders" stroke={P2} fill={P2 + '30'} dot={false} strokeWidth={1.5} />
            <Area type="monotone" dataKey={smoothKey('qDB')} name="Platform 2 Drivers" stroke={P2_LIGHT} fill={P2_LIGHT + '20'} dot={false} strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Cumulative matches + active agents */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* The SHARE, not the two levels. Whether the market tips is a question
            about the ratio, and on a fixed 0-100% axis with a 50% reference line
            you can read it at a glance — where two rising cumulative lines make
            you estimate a ratio by eye. The underlying counts stay in the
            tooltip. Fixed axis, so this one cannot wiggle either. */}
        <ChartCard title="Match Share — Platform 1">
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={rows} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis {...xAxis} />
              <YAxis tick={{ fill: TICK_COLOR, fontSize: 10 }}
                domain={[0, 1]} ticks={[0, 0.25, 0.5, 0.75, 1]} allowDataOverflow
                tickFormatter={v => `${(100 * v).toFixed(0)}%`} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0.5} stroke="#cbd5e1" strokeDasharray="4 3" strokeWidth={1} />
              <Line type="monotone" dataKey="matchShare" name="Platform 1 share" stroke={P1}
                dot={false} strokeWidth={2} connectNulls={false} />
              {/* Kept only so the counts appear in the tooltip, not drawn. */}
              <Line dataKey="cumulativeMatchesA" name="Platform 1 matches" stroke="none" dot={false} legendType="none" />
              <Line dataKey="cumulativeMatchesB" name="Platform 2 matches" stroke="none" dot={false} legendType="none" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Active Agents in Market">
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={rows} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis {...xAxis} />
              <YAxis tick={{ fill: TICK_COLOR, fontSize: 10 }} allowDecimals={false}
                domain={[0, activeMax]} allowDataOverflow />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#6b7280' }} />
              <Area type="monotone" dataKey={smoothKey('activeRiders')} name="Riders" stroke="#10b981" fill="#10b98125" dot={false} strokeWidth={1.5} />
              <Area type="monotone" dataKey={smoothKey('activeDrivers')} name="Drivers" stroke="#f59e0b" fill="#f59e0b25" dot={false} strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Regional surge overlay */}
      {hasSurge && (
        <ChartCard title="Regional Surge State  z(t)">
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={rows} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis {...xAxis} />
              <YAxis tick={{ fill: TICK_COLOR, fontSize: 10 }} domain={[0, zMax]} allowDataOverflow />
              <Tooltip content={<CustomTooltip />} />
              <Area type="stepAfter" dataKey="z" name="z(t)" stroke={SURGE_COLOR} fill={SURGE_COLOR + '35'} dot={false} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      )}
    </div>
  );
}
