import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SimulationRunner } from './engine/simulation';
import { DEFAULT_CONFIG } from './engine/config';
import type { SimConfig, SimSnapshot } from './engine/types';
import { LiveMarketViz } from './components/LiveMarketViz';
import { SimCharts } from './components/Charts';
import { Controls } from './components/Controls';
import { ConfigPanel } from './components/ConfigPanel';

const P1_C = '#111111';
const P2_C = '#ec4899';

function makeEmpty(): SimSnapshot {
  return {
    t: 0, z: 0,
    platforms: {
      A: { price: DEFAULT_CONFIG.p0A, wage: (1 - DEFAULT_CONFIG.tauA) * DEFAULT_CONFIG.p0A, riderQueue: [], driverQueue: [] },
      B: { price: DEFAULT_CONFIG.p0B, wage: (1 - DEFAULT_CONFIG.tauB) * DEFAULT_CONFIG.p0B, riderQueue: [], driverQueue: [] },
    },
    riders: [], drivers: [], matchRecords: [], timeSeries: [], done: false,
    switchedRiders: new Set(), switchedDrivers: new Set(),
    searchedRiders: new Set(), searchedDrivers: new Set(),
    arrivedRiders: new Set(), arrivedDrivers: new Set(),
    rejectedRiders: [], rejectedDrivers: [],
  };
}

export default function App() {
  const [config, setConfig] = useState<SimConfig>({ ...DEFAULT_CONFIG });
  const [snapshot, setSnapshot] = useState<SimSnapshot>(makeEmpty());
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1200);
  const [configOpen, setConfigOpen] = useState(false);
  const [chartsOpen, setChartsOpen] = useState(true);
  // Panel widths are state, not constants, so the panels can be dragged wider.
  // The default 300 is too narrow to read the model equations in.
  const [configW, setConfigW] = useState(300);
  const [statsW, setStatsW] = useState(380);

  const runnerRef = useRef<SimulationRunner | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    runnerRef.current = new SimulationRunner(config);
    setSnapshot(runnerRef.current.snapshot());
  }, []); // eslint-disable-line

  const handleReset = useCallback((cfg?: SimConfig) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPlaying(false);
    const c = cfg ?? configRef.current;
    runnerRef.current = new SimulationRunner(c);
    setSnapshot(runnerRef.current.snapshot());
  }, []);

  const handleStep = useCallback(() => {
    const r = runnerRef.current;
    if (r && !r.done) { r.step(); setSnapshot(r.snapshot()); }
  }, []);

  const startInterval = useCallback((spd: number) => {
    intervalRef.current = setInterval(() => {
      const r = runnerRef.current;
      if (!r || r.done) { clearInterval(intervalRef.current!); setPlaying(false); return; }
      r.step();
      setSnapshot(r.snapshot());
    }, spd);
  }, []);

  const handlePlay = useCallback(() => {
    setPlaying(true);
    startInterval(speed);
  }, [speed, startInterval]);

  const handlePause = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPlaying(false);
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (playing) startInterval(newSpeed);
  }, [playing, startInterval]);

  const handleConfigChange = useCallback((cfg: SimConfig) => {
    setConfig(cfg);
    handleReset(cfg);
  }, [handleReset]);

  const snap = snapshot;
  const { platforms, matchRecords, riders, drivers } = snap;

  const matchesA = matchRecords.filter(m => m.platform === 'A').length;
  const matchesB = matchRecords.filter(m => m.platform === 'B').length;
  const revA = matchRecords.filter(m => m.platform === 'A').reduce((a, m) => a + m.platformRevenue, 0);
  const revB = matchRecords.filter(m => m.platform === 'B').reduce((a, m) => a + m.platformRevenue, 0);
  const switchesR = riders.reduce((a, r) => a + r.switchCount, 0);
  const switchesD = drivers.reduce((a, d) => a + d.switchCount, 0);
  const activeR = riders.filter(r => r.state === 'QUEUED_A' || r.state === 'QUEUED_B').length;
  const activeD = drivers.filter(d => d.state === 'QUEUED_A' || d.state === 'QUEUED_B').length;
  const surgeActive = snap.z > 0;
  const surgeColor = snap.z < 0.5 ? '#f59e0b' : snap.z < 0.9 ? '#f97316' : '#ef4444';

  return (
    <div style={{
      height: '100vh',
      background: '#ffffff',
      color: '#1e293b',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* ── Header ── */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        gap: 12,
      }}>
        <div>
          <span style={{
            fontWeight: 800, fontSize: 17,
            background: 'linear-gradient(135deg, #111827 30%, #ec4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}>
            Rideshare Platform Simulation
          </span>
          <span style={{ color: '#9ca3af', fontSize: 12, marginLeft: 12 }}>
            Two-platform hex · discrete time · endogenous surge
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {surgeActive && (
            <div style={{ background: surgeColor + '20', color: surgeColor, border: `1px solid ${surgeColor}50`, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>
              ⚡ z = {snap.z.toFixed(2)}
            </div>
          )}
          <button onClick={() => setChartsOpen(o => !o)} style={pillBtn(chartsOpen)}>
            {chartsOpen ? '▾ Charts' : '▸ Charts'}
          </button>
          <button onClick={() => setConfigOpen(o => !o)} style={pillBtn(configOpen)}>
            ⚙ Parameters
          </button>
        </div>
      </header>

      {/* ── Controls ── */}
      <div style={{ padding: '8px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
        <Controls
          t={snap.t} tMax={config.tMax} playing={playing} done={snap.done} speed={speed}
          onPlay={handlePlay} onPause={handlePause} onStep={handleStep}
          onReset={() => handleReset()} onSpeedChange={handleSpeedChange}
        />
      </div>

      {/* ── Main body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* Config sidebar — resizable: the equations and derived readouts want
            more than 300px when someone is actually reading them. */}
        {configOpen && (
          <>
            <div style={{ width: configW, overflowY: 'auto', flexShrink: 0 }}>
              <ConfigPanel config={config} onChange={handleConfigChange} />
            </div>
            <Splitter side="left" width={configW} setWidth={setConfigW} min={240} max={760} />
          </>
        )}

        {/* Center: market visualization — fills all available space */}
        <div style={{
          flex: 1,
          background: '#f8fafc',
          overflow: 'hidden',
          position: 'relative',
          minWidth: 0,
          minHeight: 0,
        }}>
          <LiveMarketViz snapshot={snap} speed={speed} />
        </div>

        <Splitter side="right" width={statsW} setWidth={setStatsW} min={170} max={860} />

        {/* Right panel: stats + optional charts */}
        <div style={{
          width: statsW,
          background: '#f9fafb',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          flexShrink: 0,
        }}>
          {/* Platform stats */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #e5e7eb' }}>
            <PlatformStats
              label="Platform 1"
              color={P1_C}
              textColor="#f1f5f9"
              price={platforms.A.price}
              wage={platforms.A.wage}
              tau={config.tauA}
              matches={matchesA}
              revenue={revA}
              riderQ={platforms.A.riderQueue.length}
              driverQ={platforms.A.driverQueue.length}
            />
            <div style={{ height: 1, background: '#e5e7eb', margin: '12px 0' }} />
            <PlatformStats
              label="Platform 2"
              color={P2_C}
              textColor={P2_C}
              price={platforms.B.price}
              wage={platforms.B.wage}
              tau={config.tauB}
              matches={matchesB}
              revenue={revB}
              riderQ={platforms.B.riderQueue.length}
              driverQ={platforms.B.driverQueue.length}
            />
          </div>

          {/* Market-wide stats */}
          <div style={{ padding: '10px 16px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ color: '#9ca3af', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Market</div>
            <StatRow label="Tick" value={snap.t.toString()} />
            <StatRow label="Active riders" value={activeR.toString()} />
            <StatRow label="Active drivers" value={activeD.toString()} />
            <StatRow label="Rider switches" value={switchesR.toString()} />
            <StatRow label="Driver switches" value={switchesD.toString()} />
            <StatRow label="Total matches" value={(matchesA + matchesB).toString()} />
          </div>

          {/* Charts */}
          {chartsOpen && snap.timeSeries.length > 1 && (
            <div style={{ padding: '12px 10px', flex: 1 }}>
              <SimCharts timeSeries={snap.timeSeries} tMax={config.tMax} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface PlatformStatsProps {
  label: string;
  color: string;
  textColor: string;
  price: number;
  wage: number;
  tau: number;
  matches: number;
  revenue: number;
  riderQ: number;
  driverQ: number;
}

function PlatformStats({ label, textColor, price, wage, tau, matches, revenue, riderQ, driverQ }: PlatformStatsProps) {
  return (
    <div>
      <div style={{ color: textColor, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 8px' }}>
        <MetricTile label="Price" value={`$${price.toFixed(2)}`} />
        <MetricTile label="Wage" value={`$${wage.toFixed(2)}`} />
        <MetricTile label="Take rate" value={`${(tau * 100).toFixed(0)}%`} />
        <MetricTile label="Revenue" value={`$${revenue.toFixed(0)}`} />
        <MetricTile label="Matches" value={matches.toString()} />
        <MetricTile label="Queues R/D" value={`${riderQ} / ${driverQ}`} />
      </div>
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: '#f1f5f9', borderRadius: 6, padding: '6px 8px' }}>
      <div style={{ color: '#9ca3af', fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 700, marginTop: 1 }}>{value}</div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ color: '#9ca3af', fontSize: 11 }}>{label}</span>
      <span style={{ color: '#374151', fontSize: 11, fontWeight: 600 }}>{value}</span>
    </div>
  );
}


/**
 * A draggable divider. `side` says which edge of the panel it sits on, so the
 * drag direction is correct on both sides of the layout: widening the left panel
 * means dragging right, widening the right panel means dragging left.
 */
function Splitter({ side, width, setWidth, min, max }: {
  side: 'left' | 'right';
  width: number;
  setWidth: (w: number) => void;
  min: number;
  max: number;
}) {
  const drag = useRef<{ x0: number; w0: number } | null>(null);
  const [active, setActive] = useState(false);
  return (
    <div
      onPointerDown={e => {
        // Pointer capture keeps the drag alive when the cursor leaves this 6px
        // strip, which it immediately does.
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        drag.current = { x0: e.clientX, w0: width };
        setActive(true);
      }}
      onPointerMove={e => {
        if (!drag.current) return;
        const dx = e.clientX - drag.current.x0;
        const next = side === 'left' ? drag.current.w0 + dx : drag.current.w0 - dx;
        setWidth(Math.max(min, Math.min(max, next)));
      }}
      onPointerUp={e => {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        drag.current = null;
        setActive(false);
      }}
      onDoubleClick={() => setWidth(side === 'left' ? 300 : 380)}
      title="Drag to resize · double-click to reset"
      style={{
        width: 6, flexShrink: 0, cursor: 'col-resize',
        background: active ? '#93c5fd' : 'transparent',
        borderLeft: side === 'right' ? '1px solid #e5e7eb' : undefined,
        borderRight: side === 'left' ? '1px solid #e5e7eb' : undefined,
        transition: active ? undefined : 'background 0.15s',
        // Keep the grab target findable without drawing a heavy rule.
        touchAction: 'none',
      }}
      onPointerEnter={e => { if (!drag.current) (e.currentTarget as HTMLElement).style.background = '#dbeafe'; }}
      onPointerLeave={e => { if (!drag.current) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    />
  );
}

function pillBtn(active: boolean): React.CSSProperties {
  return {
    background: active ? '#dbeafe' : '#f1f5f9',
    border: `1px solid ${active ? '#93c5fd' : '#e5e7eb'}`,
    color: active ? '#1d4ed8' : '#6b7280',
    borderRadius: 8,
    padding: '5px 12px',
    fontSize: 12,
    cursor: 'pointer',
    fontWeight: 600,
  };
}
