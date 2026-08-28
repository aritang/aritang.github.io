import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { SimSnapshot, PlatformId } from '../engine/types';

// ─────────────────────────────────────────────────────────────────────────────
// LiveMarketViz — one agent, one element, for its whole life on screen.
//
// The board is two stacked platform blocks. Inside a block, riders queue in one
// straight lane and drivers in the lane below it; both lanes run left → right
// and end at that platform's match gate. Position alone encodes queue order:
// the front of the line is the circle nearest the gate, the back of the line is
// the far left, and newcomers join there. Nothing has to be traced or decoded.
//
// Every agent is a single DOM node keyed `role-id`, held in an entity store that
// outlives any one snapshot. The store — never the snapshot's queue arrays — is
// what decides who exists on screen, which is what lets a matched agent finish
// its pairing after the engine has already removed it from its queue. No agent
// is ever drawn twice, and no motion is ever replayed by a second element.
//
// Motion is committed as a target `transform`, and the browser interpolates. If
// a new snapshot retargets an agent mid-flight, the transition re-bases on the
// live position automatically, so an interrupted gesture curves into its new
// one instead of snapping.
//
// The five events each get one gesture, made mutually exclusive by direction:
//   arrive  → slides in along its lane, inward, at the far end
//   advance → slides forward toward the gate as the line closes up
//   search  → no motion at all; a rival-coloured overlay pulses in place
//   switch  → steps out perpendicular to its lane, forfeiting its slot
//   match   → the front pair converges into the gate and fuses into one token
//   exit    → drops out perpendicular, away from the lane, and falls off-board
// ─────────────────────────────────────────────────────────────────────────────

const P1_C = '#111111';
const P2_C = '#ec4899';
const BOARD_BG = '#f8fafc';
const RULE_C = '#e2e8f0';
const MUTED = '#94a3b8';

const EASE_OUT = 'cubic-bezier(0.22,0.61,0.36,1)';
const EASE_IO = 'cubic-bezier(0.45,0,0.55,1)';

type Role = 'r' | 'd';

// ── Layout ───────────────────────────────────────────────────────────────────

interface Lane {
  cy: number;        // centre line of the lane
  y: number;         // top of a circle sitting in the lane
  outY: number;      // top of a circle that has stepped out of the lane
}

interface Block {
  platform: PlatformId;
  top: number;
  headerY: number;
  rider: Lane;
  driver: Lane;
  mergeY: number;    // where a pair meets, midway between the two lanes
  color: string;
}

interface Layout {
  w: number; h: number;
  d: number; gap: number; slot: number; ring: number;
  cols: number;              // visible slots per lane
  laneLeft: number; laneRight: number;
  entryX: number;            // the empty margin left of every lane
  gateX: number; gateW: number; gateCX: number;
  blockH: number;
  blocks: Block[];
  labelSize: number;
}

function makeLayout(w: number, h: number): Layout {
  const blockH = h / 2;
  const headerH = Math.max(30, Math.min(44, blockH * 0.15));
  const labelW = Math.max(58, Math.min(84, w * 0.06));
  const gateW = Math.max(74, Math.min(124, w * 0.09));
  const gateX = w - 12 - gateW;
  const laneLeft = labelW + 12;
  const laneRight = gateX - 16;
  const laneLen = Math.max(120, laneRight - laneLeft);
  const laneAreaH = blockH - headerH - 10;
  // The two lanes sit at 29% and 71% of the block, so the gap between them is
  // wide enough to hold a converging pair and to read as one platform's market.
  const spacing = laneAreaH * 0.42;
  // Two limits on circle size: the vertical room between the lanes, and having
  // enough slots to hold a long queue. Measured over a 200-tick default run,
  // lane length is ~17 at the median and ~30 at the 90th percentile, so the
  // lane is sized for 30 and anything past that goes to the overflow chip.
  const d = Math.round(Math.max(12, Math.min(spacing * 0.60, laneLen / (30 * 1.24), 34)));
  const gap = Math.max(3, Math.round(d * 0.24));
  const slot = d + gap;
  const cols = Math.max(4, Math.floor(laneLen / slot));
  const out = Math.round(d * 0.82);

  const blocks: Block[] = (['A', 'B'] as PlatformId[]).map((platform, i) => {
    const top = i * blockH;
    const laneTop = top + headerH;
    const riderCY = laneTop + laneAreaH * 0.29;
    const driverCY = laneTop + laneAreaH * 0.71;
    return {
      platform,
      top,
      headerY: top + Math.max(6, headerH * 0.22),
      // Riders step out upward and drivers downward — always away from the
      // other lane, so a switcher never walks through seated agents.
      rider:  { cy: riderCY,  y: riderCY - d / 2,  outY: riderCY - d / 2 - out },
      driver: { cy: driverCY, y: driverCY - d / 2, outY: driverCY - d / 2 + out },
      mergeY: (riderCY + driverCY) / 2,
      color: platform === 'A' ? P1_C : P2_C,
    };
  });

  return {
    w, h, d, gap, slot,
    ring: Math.max(2, Math.round(d * 0.10)),
    cols, laneLeft, laneRight,
    entryX: laneLeft - Math.round(slot * 0.95),
    gateX, gateW, gateCX: gateX + gateW * 0.42,
    blockH, blocks,
    labelSize: Math.max(9, Math.min(13, d * 0.40)),
  };
}

function block(L: Layout, p: PlatformId): Block {
  return L.blocks[p === 'A' ? 0 : 1];
}

function lane(L: Layout, p: PlatformId, role: Role): Lane {
  const b = block(L, p);
  return role === 'r' ? b.rider : b.driver;
}

// Slot 0 is the front of the line, hard against the gate; the index grows
// leftward, away from it. So distance from the gate *is* queue position.
function slotX(i: number, L: Layout): number {
  return L.laneRight - L.d - i * L.slot;
}

// Anyone past the visible run is parked in the entry margin at zero opacity,
// rather than mounted and unmounted — so a draining queue never pops dots into
// existence, it just slides them into view.
function isParked(i: number, L: Layout): boolean {
  return i < 0 || i >= L.cols;
}

function slotPos(i: number, p: PlatformId, role: Role, L: Layout): { x: number; y: number } {
  const ln = lane(L, p, role);
  return { x: isParked(i, L) ? L.entryX - L.slot : slotX(i, L), y: ln.y };
}

// ── Timing ───────────────────────────────────────────────────────────────────
// Every duration is a fraction of the tick with an absolute floor, so the
// choreography scales with playback speed instead of being clipped by it.
// Below ~70ms a gesture stops reading as motion, which is what sets the tiers.

type Mode = 'full' | 'brisk' | 'flow';

function makeTiming(speed: number) {
  const S = Math.max(1, speed);
  const mode: Mode = S >= 600 ? 'full' : S >= 300 ? 'brisk' : 'flow';
  const f = (frac: number, floor: number) => Math.max(floor, frac * S);
  return {
    S, mode,
    flash:       mode === 'flow' ? 0 : f(0.24, 150),
    pairStart:   f(0.12, 60),
    pairGap:     f(0.17, 90),
    legA:        f(0.13, 90),
    legB:        f(0.11, 80),
    fuse:        f(0.09, 70),
    tokenOut:    f(0.14, 100),
    advDelay:    f(0.28, 90),
    advDur:      f(0.20, 110),
    stepOut:     f(0.10, 70),
    crossLeg:    f(0.11, 80),
    exitDelay:   f(0.05, 40),
    exitDur:     f(0.20, 120),
    arriveDelay: f(0.62, 130),
    arriveDur:   f(0.22, 130),
    fadeIn:      f(0.10, 80),
  };
}
type Timing = ReturnType<typeof makeTiming>;

// ── Entities ─────────────────────────────────────────────────────────────────

type Phase = 'idle' | 'arriving' | 'pairing' | 'fused' | 'crossing' | 'leaving';

interface Ent {
  key: string;
  id: number;
  role: Role;
  platform: PlatformId;
  index: number;             // slot in its queue; -1 once it has left the queue
  x: number; y: number;      // committed target, px, top-left
  dur: number; delay: number;
  scale: number;
  opacity: number;
  phase: Phase;
  label: string | null;      // the price, once a pair has fused into one token
  // A crossing agent keeps the colour of the queue it is leaving until it has
  // arrived, so it never changes identity before it has changed sides.
  originColor: string | null;
  z: number;
  gen: number;               // bumped whenever the entity is re-planned
}

interface Flash { key: string; x: number; y: number; role: Role; color: string }
interface Tether {
  key: string; x: number; top: number; h: number; color: string;
  dur: number; delay: number;
  inDelay: number;   // held constant across updates, or the fade-in restarts
}
interface GateFlash { key: string; platform: PlatformId; dur: number; delay: number }
interface Flow { platform: PlatformId; role: Role; n: number }
interface Reject { key: string; x: number; y: number; fall: number; role: Role; color: string; dur: number }
interface Quick { A: number; B: number; t: number }

export function LiveMarketViz({ snapshot, speed }: { snapshot: SimSnapshot; speed: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [L, setL] = useState<Layout>(() => makeLayout(1000, 700));
  const T = makeTiming(speed);

  const store = useRef<Map<string, Ent>>(new Map());
  const prevSnap = useRef<SimSnapshot | null>(null);
  const timers = useRef<number[]>([]);
  const [, redraw] = useState(0);
  const [flashes, setFlashes] = useState<Flash[]>([]);
  const [tethers, setTethers] = useState<Tether[]>([]);
  const [gateFlashes, setGateFlashes] = useState<GateFlash[]>([]);
  const [flows, setFlows] = useState<Flow[]>([]);
  const [rejects, setRejects] = useState<Reject[]>([]);
  const [quick, setQuick] = useState<Quick>({ A: 0, B: 0, t: -1 });
  const [overCount, setOverCount] = useState<Record<string, number>>({});

  const paint = () => redraw(n => n + 1);
  const later = (fn: () => void, ms: number) => {
    if (timers.current.length > 400) timers.current.splice(0, 200);
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setL(makeLayout(width, height));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // A resize must not replay any choreography: re-place everyone at rest.
  useLayoutEffect(() => {
    for (const e of store.current.values()) {
      if (e.phase === 'idle' || e.phase === 'arriving') {
        const p = slotPos(e.index, e.platform, e.role, L);
        e.x = p.x; e.y = p.y; e.dur = 0; e.delay = 0;
        e.opacity = isParked(e.index, L) ? 0 : 1;
        e.phase = 'idle';
      }
    }
    setTethers([]);
    paint();
  }, [L]);

  // ── Reconcile: runs once per new snapshot ─────────────────────────────────
  useEffect(() => {
    const prev = prevSnap.current;
    if (prev === snapshot) return;
    reconcile(snapshot, prev, store.current, L, T, {
      later, paint, setFlashes, setTethers, setGateFlashes, setFlows, setRejects, setQuick, setOverCount,
    });
    prevSnap.current = snapshot;
    paint();
  }, [snapshot, L]); // eslint-disable-line react-hooks/exhaustive-deps

  const ents = [...store.current.values()];

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', background: BOARD_BG, overflow: 'hidden' }}>
      {L.blocks.map(b => (
        <BlockFrame key={b.platform} b={b} L={L} snapshot={snapshot} />
      ))}

      {/* Matches past the readable budget: counted at the gate, never dropped. */}
      {L.blocks.map(b => {
        const n = b.platform === 'A' ? quick.A : quick.B;
        if (n <= 0 || quick.t !== snapshot.t) return null;
        return (
          <div key={'q' + b.platform} style={{
            position: 'absolute', left: L.gateX, top: b.driver.y + L.d * 1.15,
            width: L.gateW, textAlign: 'center',
            fontSize: L.labelSize * 0.95, fontWeight: 800, color: b.color, opacity: 0.85,
            pointerEvents: 'none', zIndex: 6,
          }}>
            +{n} matched
          </div>
        );
      })}

      {/* Flow counters for the switchers that did not make the journey. */}
      {flows.map(fl => (
        <FlowChip key={`${fl.platform}${fl.role}`} fl={fl} L={L} />
      ))}

      {/* Overflow chips — the honest encoding of a queue longer than the lane. */}
      {Object.entries(overCount).map(([k, n]) => n > 0 && (
        <OverflowChip key={k} lanekey={k} n={n} L={L} />
      ))}

      {/* Tethers: while a pair converges, one line joins exactly those two. */}
      {tethers.map(t => (
        <div key={t.key} style={{
          position: 'absolute', left: t.x, top: t.top, width: Math.max(2, Math.round(L.d * 0.09)), height: t.h,
          background: t.color, opacity: 0, borderRadius: 2, zIndex: 18,
          transition: `top ${t.dur}ms ${EASE_IO} ${t.delay}ms, height ${t.dur}ms ${EASE_IO} ${t.delay}ms`,
          animation: `tetherIn ${Math.max(90, L.d * 4)}ms linear ${t.inDelay}ms both`,
          pointerEvents: 'none',
        }} />
      ))}

      {gateFlashes.map(g => {
        const b = block(L, g.platform);
        return (
          <div key={g.key} style={{
            position: 'absolute', left: L.gateX, top: b.rider.y - L.d * 0.5,
            width: L.gateW, height: (b.driver.y + L.d + L.d * 0.5) - (b.rider.y - L.d * 0.5),
            border: `2px solid ${b.color}`, borderRadius: L.d * 0.6, opacity: 0,
            animation: `gateFlash ${g.dur}ms ease-out ${g.delay}ms both`,
            pointerEvents: 'none', zIndex: 4,
          }} />
        );
      })}

      {/* Turned away at the door: never enters a slot, never shrinks to
          nothing (that gesture belongs to a match) — it just drops away. */}
      {rejects.map(r => (
        <div key={r.key} style={{
          position: 'absolute', left: 0, top: 0,
          width: L.d, height: L.d, borderRadius: '50%',
          border: `${Math.max(2, L.ring - 1)}px dashed ${r.color}`,
          background: 'transparent', opacity: 0,
          ['--x' as string]: `${r.x}px`,
          ['--y' as string]: `${r.y}px`,
          ['--fall' as string]: `${r.fall}px`,
          animation: `rejectFall ${r.dur}ms ease-in both`,
          pointerEvents: 'none', zIndex: 5,
        }} />
      ))}

      {ents.map(e => (
        <AgentDot key={e.key} e={e} L={L} />
      ))}

      {/* Search overlays: rival colour, in place, no displacement. */}
      {flashes.map(f => (
        <div key={f.key} style={{
          position: 'absolute', left: 0, top: 0,
          transform: `translate3d(${f.x}px,${f.y}px,0)`,
          width: L.d, height: L.d, borderRadius: '50%',
          background: f.role === 'r' ? f.color : 'transparent',
          border: f.role === 'd' ? `${L.ring}px solid ${f.color}` : undefined,
          boxShadow: `0 0 0 ${Math.max(2, L.d * 0.14)}px ${f.color}55`,
          opacity: 0,
          animation: `searchPulse ${Math.max(150, T.flash)}ms ease-in-out both`,
          pointerEvents: 'none', zIndex: 12,
        }} />
      ))}
    </div>
  );
}

// ── Reconciliation ───────────────────────────────────────────────────────────

interface Sink {
  later: (fn: () => void, ms: number) => void;
  paint: () => void;
  setFlashes: Dispatch<SetStateAction<Flash[]>>;
  setTethers: Dispatch<SetStateAction<Tether[]>>;
  setGateFlashes: Dispatch<SetStateAction<GateFlash[]>>;
  setFlows: Dispatch<SetStateAction<Flow[]>>;
  setRejects: Dispatch<SetStateAction<Reject[]>>;
  setQuick: Dispatch<SetStateAction<Quick>>;
  setOverCount: Dispatch<SetStateAction<Record<string, number>>>;
}

const LANES: Array<{ p: PlatformId; role: Role }> = [
  { p: 'A', role: 'r' }, { p: 'A', role: 'd' },
  { p: 'B', role: 'r' }, { p: 'B', role: 'd' },
];

function queueOf(s: SimSnapshot, p: PlatformId, role: Role): number[] {
  return role === 'r' ? s.platforms[p].riderQueue : s.platforms[p].driverQueue;
}

function newEnt(id: number, role: Role, p: PlatformId, index: number, L: Layout): Ent {
  const pos = slotPos(index, p, role, L);
  return {
    key: role + '-' + id, id, role, platform: p, index,
    x: pos.x, y: pos.y, dur: 0, delay: 0,
    scale: 1, opacity: 1, phase: 'idle', label: null, originColor: null, z: 6, gen: 0,
  };
}

function reconcile(
  s: SimSnapshot, prev: SimSnapshot | null,
  store: Map<string, Ent>, L: Layout, T: Timing, sink: Sink,
) {
  // A rewind (Reset, or any ConfigPanel edit) reuses agent ids, so a surviving
  // store would fuse two different agents into one element. Start clean.
  const cold = !prev
    || s.t < prev.t
    || s.matchRecords.length < prev.matchRecords.length
    || s.riders.length < prev.riders.length;
  if (cold) {
    store.clear();
    sink.setTethers([]); sink.setFlashes([]); sink.setGateFlashes([]); sink.setFlows([]);
  }

  const now = new Map<string, { p: PlatformId; role: Role; index: number }>();
  const over: Record<string, number> = {};
  for (const { p, role } of LANES) {
    const q = queueOf(s, p, role);
    q.forEach((id, i) => now.set(role + '-' + id, { p, role, index: i }));
    over[p + role] = Math.max(0, q.length - L.cols);
  }
  sink.setOverCount(over);

  // The last tick of a run exits every queued agent at once; a staggered
  // stampede is the wrong last frame for a presentation.
  if (s.done) {
    for (const e of store.values()) {
      e.gen++; e.opacity = 0; e.scale = 0.8; e.dur = 400; e.delay = 0; e.phase = 'leaving';
    }
    sink.later(() => { store.clear(); sink.paint(); }, 460);
    return;
  }

  // ── What happened this tick ────────────────────────────────────────────────
  const newMatches = s.matchRecords.slice(prev ? prev.matchRecords.length : s.matchRecords.length);
  const matched = new Map<string, { price: number; platform: PlatformId; order: number }>();
  const perPlatform: Record<string, number> = { A: 0, B: 0 };
  for (const m of newMatches) {
    const order = perPlatform[m.platform]++;
    matched.set('r-' + m.riderId, { price: m.price, platform: m.platform, order });
    matched.set('d-' + m.driverId, { price: m.price, platform: m.platform, order });
  }

  const switched = new Set<string>();
  for (const id of s.switchedRiders) switched.add('r-' + id);
  for (const id of s.switchedDrivers) switched.add('d-' + id);
  const arrived = new Set<string>();
  for (const id of s.arrivedRiders) arrived.add('r-' + id);
  for (const id of s.arrivedDrivers) arrived.add('d-' + id);

  // Exits are not reported by the engine, so they are derived: a key the store
  // held that is no longer queued and was not matched has left the market.
  const gone: Ent[] = [];
  for (const e of store.values()) {
    if (!now.has(e.key) && !matched.has(e.key) && e.phase !== 'leaving' && e.phase !== 'fused') gone.push(e);
  }

  // ── Beat 1: matches ────────────────────────────────────────────────────────
  // The pair stays in the store after the engine drops it from the queue, so
  // the circles that fly are the very ones that were standing at the front.
  const pairSpan = 0.80 * T.S - T.pairStart - (T.legA + T.legB + T.fuse);
  const maxFull = Math.max(1, Math.min(4, Math.floor(pairSpan / Math.max(40, T.pairGap)) + 1));
  const gap = Math.min(T.pairGap, Math.max(40, pairSpan / Math.max(1, maxFull - 1)));
  const tethers: Tether[] = [];
  const gateFlashes: GateFlash[] = [];
  const quick: Record<string, number> = { A: 0, B: 0 };

  for (const m of newMatches) {
    const b = block(L, m.platform);
    const order = matched.get('r-' + m.riderId)!.order;
    let rider = store.get('r-' + m.riderId);
    let driver = store.get('d-' + m.driverId);
    // An agent that arrived and matched inside the same tick has no entity yet.
    // Give it one at the front of its line so the pair is never half-drawn.
    if (!rider) { rider = newEnt(m.riderId, 'r', m.platform, order, L); store.set(rider.key, rider); }
    if (!driver) { driver = newEnt(m.driverId, 'd', m.platform, order, L); store.set(driver.key, driver); }
    const full = order < maxFull && T.mode !== 'flow';
    const at = T.pairStart + order * gap;

    for (const [e, role] of [[rider, 'r'], [driver, 'd']] as Array<[Ent | undefined, Role]>) {
      if (!e) continue;
      e.gen++; e.index = -1; e.phase = 'pairing'; e.z = 20;
      if (!full) {
        // Beyond the readable budget: acknowledge in place and let the gate
        // flash carry the count, rather than staging a race nobody can follow.
        e.dur = T.fuse; e.delay = at; e.scale = 1.2; e.opacity = 0;
        continue;
      }
      // Leg A — both step forward into the gate, still in their own lane, so
      // they end up vertically aligned above and below the meeting point.
      e.x = L.gateCX - L.d / 2;
      e.y = (role === 'r' ? b.rider : b.driver).y;
      e.dur = T.legA; e.delay = at;
    }

    if (!full) {
      quick[m.platform]++;
      gateFlashes.push({ key: `gf-${m.riderId}-${m.matchTime}`, platform: m.platform, dur: T.fuse * 2, delay: at });
      const rk0 = 'r-' + m.riderId, dk0 = 'd-' + m.driverId;
      sink.later(() => { store.delete(rk0); store.delete(dk0); sink.paint(); }, at + T.fuse + 60);
      continue;
    }

    const tx = L.gateCX - L.d / 2 + L.d / 2 - Math.max(1, L.d * 0.045);
    tethers.push({
      key: `th-${m.riderId}-${m.driverId}`,
      x: tx, top: b.rider.y + L.d, h: b.driver.y - (b.rider.y + L.d),
      color: b.color, dur: 0, delay: 0,
      inDelay: at + T.legA * 0.55,
    });
    gateFlashes.push({ key: `gf-${m.riderId}-${m.matchTime}`, platform: m.platform, dur: T.fuse * 2.2, delay: at + T.legA + T.legB });

    // Leg B — they close vertically onto one point and the tether shrinks to
    // nothing between them: two marks becoming one, which is the pairing.
    const rk = 'r-' + m.riderId, dk = 'd-' + m.driverId;
    const gens = { r: rider?.gen, d: driver?.gen };
    sink.later(() => {
      const r = store.get(rk), dv = store.get(dk);
      if (r && r.gen === gens.r) { r.y = b.mergeY - L.d / 2; r.dur = T.legB; r.delay = 0; }
      if (dv && dv.gen === gens.d) { dv.y = b.mergeY - L.d / 2; dv.dur = T.legB; dv.delay = 0; }
      sink.setTethers(list => list.map(t => t.key === `th-${m.riderId}-${m.driverId}`
        ? { ...t, top: b.mergeY, h: 0, dur: T.legB, delay: 0 } : t));
      sink.paint();
    }, at + T.legA);

    // Fuse: the rider grows into a single token carrying the price and rides
    // out of the gate; the driver has been absorbed into it.
    sink.later(() => {
      const r = store.get(rk), dv = store.get(dk);
      if (dv && dv.gen === gens.d) { dv.opacity = 0; dv.dur = T.fuse; dv.delay = 0; }
      if (r && r.gen === gens.r) {
        r.phase = 'fused'; r.scale = 1.34; r.label = '$' + m.price.toFixed(0);
        r.dur = T.fuse; r.delay = 0; r.z = 22;
      }
      sink.paint();
      sink.later(() => {
        const r2 = store.get(rk);
        if (r2 && r2.gen === gens.r) { r2.x = L.gateX + L.gateW + L.slot; r2.opacity = 0; r2.dur = T.tokenOut; }
        sink.paint();
      }, T.fuse);
    }, at + T.legA + T.legB);

    sink.later(() => { store.delete(rk); store.delete(dk); sink.paint(); },
      at + T.legA + T.legB + T.fuse + T.tokenOut + 60);
  }
  sink.setTethers(tethers);
  sink.setGateFlashes(gateFlashes);
  // No silent truncation: pairs past the readable budget are still counted.
  sink.setQuick({ A: quick.A, B: quick.B, t: s.t });

  // ── Beat 2: exits ─────────────────────────────────────────────────────────
  // The only event with no destination: perpendicular, away from its lane, off
  // the board. Never a shrink-to-nothing, which is reserved for a match.
  for (const e of gone) {
    e.gen++; e.index = -1; e.phase = 'leaving';
    const ln = lane(L, e.platform, e.role);
    e.y = e.role === 'r' ? ln.y - L.d * 2.4 : ln.y + L.d * 2.4;
    e.opacity = 0; e.dur = T.exitDur; e.delay = T.exitDelay; e.z = 3;
    const k = e.key, g = e.gen;
    sink.later(() => {
      const cur = store.get(k);
      if (cur && cur.gen === g) store.delete(k);
      sink.paint();
    }, T.exitDelay + T.exitDur + 40);
  }

  // ── Beat 3: switches ──────────────────────────────────────────────────────
  // A switcher is a ball tossed from one line to the other: it lifts out of its
  // slot, arcs over the board (visibly off the surface — bigger, shadowed, above
  // everything), changes to its new colour at the top of the arc where it has
  // committed, and drops into the back of the far queue. Every switcher makes
  // the journey; nobody is teleported.
  //
  // They go in waves rather than one long single file, so 20+ crossings read as
  // a stream of balls instead of a queue of them — and a wave costs one timer,
  // not one per agent.
  const flowN: Record<string, number> = {};
  const crossers: Array<{ e: Ent; apex: { x: number; y: number }; dest: { x: number; y: number } }> = [];

  for (const key of switched) {
    const e = store.get(key);
    const nowAt = now.get(key);
    if (!e || !nowAt || matched.has(key)) continue;   // a match this tick wins
    const from = lane(L, e.platform, e.role);
    const destLane = lane(L, nowAt.p, nowAt.role);
    const dest = slotPos(nowAt.index, nowAt.p, nowAt.role, L);
    flowN[nowAt.p + nowAt.role] = (flowN[nowAt.p + nowAt.role] ?? 0) + 1;
    e.gen++;
    e.originColor = block(L, e.platform).color;
    e.platform = nowAt.p; e.index = nowAt.index;
    if (T.mode === 'flow') {
      // Too fast for a throw to be seen at all: land it and let the counters talk.
      e.x = dest.x; e.y = dest.y; e.dur = T.fadeIn; e.delay = 0;
      e.phase = 'idle'; e.originColor = null;
      e.opacity = isParked(nowAt.index, L) ? 0 : 1;
      continue;
    }
    crossers.push({
      e,
      // Apex midway between the two lanes, thrown clear of the lane the ball is
      // leaving. The jitter is per-agent, so balls in one wave arc at visibly
      // different heights instead of stacking on a single trajectory.
      apex: { x: 0, y: (from.y + destLane.y) / 2 },
      dest,
    });
  }

  if (crossers.length) {
    // Nearest the gate goes first, so the stream reads the same direction the
    // queue does.
    crossers.sort((a, b) => b.e.x - a.e.x);
    const travel = T.crossLeg * 1.15;
    // The whole stream has to land inside the tick. When there are more
    // switchers than the tick has room to stagger, the waves get *wider* rather
    // than closer together — throwing more balls at once still reads, throwing
    // them 20ms apart does not, and overrunning the tick would leave balls
    // permanently in the air.
    const budget = Math.max(2 * travel, 0.78 * T.S - 2 * travel);
    const maxWaves = Math.max(1, Math.floor(budget / 50) + 1);
    const WAVE = Math.max(4, Math.ceil(crossers.length / maxWaves));
    const waves = Math.ceil(crossers.length / WAVE);
    const waveGap = waves > 1 ? Math.min(0.10 * T.S, budget / (waves - 1)) : 0;

    crossers.forEach((c, i) => {
      const wave = Math.floor(i / WAVE);
      const seat = i % WAVE;
      const at = wave * waveGap;
      // Balls in one wave arc at different heights so they stay tellable apart.
      const arc = L.slot * (0.5 + (seat % 4) * 0.42);
      c.apex.x = Math.max(4, Math.min(c.e.x, c.dest.x) - arc);
      // Leg 1 needs no timer of its own — the wave's offset is a transition
      // delay, so the whole wave is committed in this one render.
      c.e.phase = 'crossing'; c.e.z = 24; c.e.scale = 1.18; c.e.opacity = 1;
      c.e.x = c.apex.x; c.e.y = c.apex.y;
      c.e.dur = travel; c.e.delay = at;
    });

    for (let wave = 0; wave * WAVE < crossers.length; wave++) {
      const members = crossers.slice(wave * WAVE, wave * WAVE + WAVE)
        .map(c => ({ key: c.e.key, gen: c.e.gen, dest: c.dest }));
      const at = wave * waveGap;
      // Leg 2: down out of the arc into the back of the new line, arriving in
      // its new colour — it changed sides in the air.
      sink.later(() => {
        for (const m of members) {
          const e = store.get(m.key);
          if (!e || e.gen !== m.gen) continue;
          e.x = m.dest.x; e.y = m.dest.y; e.scale = 1; e.originColor = null;
          e.dur = travel; e.delay = 0;
        }
        sink.paint();
      }, at + travel);
      sink.later(() => {
        for (const m of members) {
          const e = store.get(m.key);
          if (!e || e.gen !== m.gen) continue;
          e.phase = 'idle'; e.z = 6;
          e.opacity = isParked(e.index, L) ? 0 : 1;
        }
        sink.paint();
      }, at + travel * 2 + 30);
    }
  }
  sink.setFlows(Object.entries(flowN).map(([k, n]) => ({
    platform: k[0] as PlatformId, role: k[1] as Role, n,
  })));

  // ── Beat 4: the line closes up ────────────────────────────────────────────
  // Starts after the front pair has peeled off, so cause precedes effect.
  for (const [key, at] of now) {
    const e = store.get(key);
    if (!e) continue;
    if (e.phase === 'crossing' || e.phase === 'pairing' || e.phase === 'fused') continue;
    const moved = e.index !== at.index || e.platform !== at.p;
    e.platform = at.p; e.index = at.index;
    if (e.phase === 'arriving') continue;
    const pos = slotPos(at.index, at.p, at.role, L);
    if (!moved && e.x === pos.x && e.y === pos.y) { e.opacity = isParked(at.index, L) ? 0 : 1; continue; }
    e.gen++;
    e.x = pos.x; e.y = pos.y; e.phase = 'idle'; e.z = 6;
    e.opacity = isParked(at.index, L) ? 0 : 1;
    e.dur = T.advDur; e.delay = T.advDelay;
  }

  // ── Beat 5: arrivals, and rejections at the door ──────────────────────────
  // A newcomer joins at the far end of the lane and slides inward — the exact
  // opposite direction from an exit, so the two can never be confused.
  const entering: Ent[] = [];
  for (const [key, at] of now) {
    if (store.has(key)) continue;
    const id = Number(key.slice(2));
    const e = newEnt(id, at.role, at.p, at.index, L);
    const ln = lane(L, at.p, at.role);
    if (arrived.has(key) && !isParked(at.index, L) && T.mode !== 'flow') {
      e.x = -L.d - 20; e.y = ln.y; e.opacity = 0; e.phase = 'arriving';
      entering.push(e);
    } else {
      // Self-heal: anything the store missed (or a parked agent sliding into
      // view) simply fades in at its slot rather than popping into existence.
      e.opacity = isParked(at.index, L) ? 0 : 1;
      e.dur = T.fadeIn;
    }
    store.set(key, e);
  }
  if (entering.length) {
    const step = Math.min(T.arriveDur * 0.5, (0.3 * T.S) / entering.length);
    sink.later(() => {
      entering.forEach((e, i) => {
        const cur = store.get(e.key);
        if (!cur || cur.phase !== 'arriving') return;
        const pos = slotPos(cur.index, cur.platform, cur.role, L);
        cur.x = pos.x; cur.y = pos.y; cur.opacity = isParked(cur.index, L) ? 0 : 1;
        cur.dur = T.arriveDur; cur.delay = i * step; cur.phase = 'idle';
      });
      sink.paint();
    }, T.arriveDelay);
  }

  // Rejected at spawn: they show up at the door, never take a slot, and drop
  // away. Location alone separates them from an agent that gets in — and they
  // are hollow and dashed, so they never look like a queue member either.
  const rj: Reject[] = [];
  const rejDur = Math.max(200, 0.32 * T.S);
  let rjN = 0;
  for (const a of [...s.rejectedRiders.map(r => ({ ...r, role: 'r' as Role })),
                   ...s.rejectedDrivers.map(r => ({ ...r, role: 'd' as Role }))]) {
    const ln = lane(L, a.platform, a.role);
    const spread = (rjN++ % 3) * L.slot * 0.5;
    rj.push({
      key: `rj-${a.role}-${a.id}-${s.t}`,
      x: Math.max(2, L.entryX - L.slot * 0.6 - spread), y: ln.y, fall: a.role === 'r' ? -L.d * 2 : L.d * 2,
      role: a.role, color: a.platform === 'A' ? P1_C : P2_C, dur: rejDur,
    });
  }
  sink.setRejects(rj);
  if (rj.length) sink.later(() => sink.setRejects([]), rejDur + 60);

  // ── Search: the ambient event ─────────────────────────────────────────────
  // Roughly half the board searches every tick, so it gets the one gesture that
  // costs nothing to run 40× at once and cannot be mistaken for a movement.
  if (T.flash > 0) {
    const fl: Flash[] = [];
    for (const { p, role } of LANES) {
      const set = role === 'r' ? s.searchedRiders : s.searchedDrivers;
      queueOf(s, p, role).forEach((id, i) => {
        const key = role + '-' + id;
        if (!set.has(id) || switched.has(key) || matched.has(key) || isParked(i, L)) return;
        const ln = lane(L, p, role);
        fl.push({
          key: `fl-${key}-${s.t}`, x: slotX(i, L), y: ln.y, role,
          color: p === 'A' ? P2_C : P1_C,
        });
      });
    }
    sink.setFlashes(fl);
    sink.later(() => { sink.setFlashes([]); }, T.flash + 60);
  } else {
    sink.setFlashes([]);
  }
}

// ── Presentational pieces ────────────────────────────────────────────────────

function AgentDot({ e, L }: { e: Ent; L: Layout }) {
  const b = block(L, e.platform);
  const c = e.originColor ?? b.color;
  const isHead = e.index === 0 && e.phase === 'idle';
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0,
      width: L.d, height: L.d, borderRadius: '50%',
      transform: `translate3d(${e.x}px,${e.y}px,0) scale(${e.scale})`,
      background: e.role === 'r' || e.phase === 'fused' ? c : 'transparent',
      border: e.role === 'd' && e.phase !== 'fused' ? `${L.ring}px solid ${c}` : undefined,
      opacity: e.opacity,
      // The front of the line gets a detached ring in its own platform colour —
      // reinforcing the gate adjacency that already marks it.
      // In the air: a cast shadow, so a crossing ball reads as being off the
      // board rather than sliding along it.
      boxShadow: e.phase === 'crossing'
        ? `0 ${Math.round(L.d * 0.22)}px ${Math.round(L.d * 0.42)}px rgba(15,23,42,0.28)`
        : isHead ? `0 0 0 ${Math.max(2, L.d * 0.09)}px ${BOARD_BG}, 0 0 0 ${Math.max(3, L.d * 0.15)}px ${c}` : undefined,
      transition: `transform ${e.dur}ms ${e.phase === 'pairing' || e.phase === 'crossing' ? EASE_IO : EASE_OUT} ${e.delay}ms,`
        + ` opacity ${Math.max(80, e.dur)}ms linear ${e.delay}ms`,
      zIndex: e.z,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#ffffff', fontSize: L.d * 0.34, fontWeight: 800, letterSpacing: '-0.02em',
      pointerEvents: 'none',
    }}>
      {e.label}
    </div>
  );
}

function BlockFrame({ b, L, snapshot }: { b: Block; L: Layout; snapshot: SimSnapshot }) {
  const p = snapshot.platforms[b.platform];
  const matched = snapshot.matchRecords.reduce((n, m) => n + (m.platform === b.platform ? 1 : 0), 0);
  const name = b.platform === 'A' ? 'Platform 1' : 'Platform 2';
  return (
    <>
      {b.top > 0 && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: b.top - 1, height: 1, background: RULE_C }} />
      )}

      {/* Header: who this block is, and the two prices that drive every choice. */}
      <div style={{
        position: 'absolute', left: 14, top: b.headerY,
        display: 'flex', alignItems: 'baseline', gap: 14,
        fontSize: L.labelSize, color: MUTED, fontWeight: 600, whiteSpace: 'nowrap',
      }}>
        <span style={{ fontSize: L.labelSize * 1.35, fontWeight: 800, color: b.color, letterSpacing: '-0.02em' }}>{name}</span>
        <span>price <b style={{ color: '#334155' }}>${p.price.toFixed(2)}</b></span>
        <span>wage <b style={{ color: '#334155' }}>${p.wage.toFixed(2)}</b></span>
        <span>matched <b style={{ color: b.color }}>{matched}</b></span>
      </div>

      {/* Lane labels and rails. The rail is the line; the dots sit on it. */}
      {(['r', 'd'] as Role[]).map(role => {
        const ln = role === 'r' ? b.rider : b.driver;
        return (
          <div key={role}>
            <div style={{
              position: 'absolute', left: 10, top: ln.cy - L.labelSize * 0.7,
              fontSize: L.labelSize * 0.86, fontWeight: 700, color: MUTED, letterSpacing: '0.06em',
            }}>
              {role === 'r' ? 'RIDERS' : 'DRIVERS'}
            </div>
            <div style={{
              position: 'absolute', left: L.entryX, top: ln.cy - 1,
              width: L.gateX - L.entryX, height: 2, background: RULE_C, borderRadius: 2,
            }} />
          </div>
        );
      })}

      {/* The gate: empty except during a match, which is what makes two marks
          inside it read as a couple. */}
      <div style={{
        position: 'absolute', left: L.gateX, top: b.rider.y - L.d * 0.5,
        width: L.gateW,
        height: (b.driver.y + L.d + L.d * 0.5) - (b.rider.y - L.d * 0.5),
        border: `1px dashed ${RULE_C}`, borderRadius: L.d * 0.6,
        background: 'linear-gradient(180deg, rgba(148,163,184,0.05), rgba(148,163,184,0.12), rgba(148,163,184,0.05))',
      }} />
      <div style={{
        position: 'absolute', left: L.gateX, top: b.mergeY - L.labelSize * 0.6,
        width: L.gateW, textAlign: 'center',
        fontSize: L.labelSize * 0.72, fontWeight: 800, color: '#b8c0cc',
        letterSpacing: '0.10em', textTransform: 'uppercase', pointerEvents: 'none',
      }}>
        match
      </div>
    </>
  );
}

function FlowChip({ fl, L }: { fl: Flow; L: Layout }) {
  const b = block(L, fl.platform);
  const ln = lane(L, fl.platform, fl.role);
  const toTop = fl.platform === 'B';
  return (
    <div style={{
      position: 'absolute', left: Math.max(4, L.entryX - L.slot * 0.2),
      top: ln.cy - L.d * 1.35,
      fontSize: L.labelSize * 0.82, fontWeight: 700, color: b.color, opacity: 0.9, whiteSpace: 'nowrap',
      pointerEvents: 'none', zIndex: 7,
    }}>
      {toTop ? '↓' : '↑'}{fl.n} joined
    </div>
  );
}

function OverflowChip({ lanekey, n, L }: { lanekey: string; n: number; L: Layout }) {
  const p = lanekey[0] as PlatformId;
  const role = lanekey[1] as Role;
  const ln = lane(L, p, role);
  const b = block(L, p);
  return (
    <div style={{
      position: 'absolute', left: L.entryX - L.slot * 0.2, top: ln.cy - L.labelSize * 0.75,
      fontSize: L.labelSize, fontWeight: 800, color: b.color, opacity: 0.7, whiteSpace: 'nowrap',
      pointerEvents: 'none',
    }}>
      +{n}
    </div>
  );
}
