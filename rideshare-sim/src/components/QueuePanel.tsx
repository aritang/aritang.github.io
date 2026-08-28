import { useMemo } from 'react';
import type { SimSnapshot } from '../engine/types';

interface Props {
  snapshot: SimSnapshot;
}

// P1 = white (legible on the dark bg), P2 = pink. Neutral labels: the model
// is about market structure, not any particular company.
const P1_COLOR = '#f1f5f9';
const P2_COLOR = '#ec4899';

const MAX_CIRCLES = 72;

interface AgentCircleProps {
  id: number;
  color: string;
  isDriver: boolean;
  switched: boolean;
  arrived: boolean;
}

function AgentCircle({ color, isDriver, switched, arrived }: AgentCircleProps) {
  const animation = switched
    ? 'agentSwitch 0.6s ease-out forwards'
    : arrived
    ? 'agentArrive 0.3s ease-out forwards'
    : undefined;

  return (
    <div
      style={{
        width: 13,
        height: 13,
        borderRadius: '50%',
        background: isDriver ? 'transparent' : color,
        border: isDriver ? `2px solid ${color}` : undefined,
        opacity: isDriver ? 0.8 : 1,
        flexShrink: 0,
        animation,
      }}
    />
  );
}

interface QueueBoxProps {
  title: string;
  priceLabel: string;
  count: number;
  ids: number[];
  color: string;
  isDriver: boolean;
  switchedIds: Set<number>;
  arrivedIds: Set<number>;
  surgeActive: boolean;
}

function QueueBox({ title, priceLabel, count, ids, color, isDriver, switchedIds, arrivedIds, surgeActive }: QueueBoxProps) {
  const displayed = ids.slice(0, MAX_CIRCLES);
  const overflow = Math.max(0, count - MAX_CIRCLES);

  return (
    <div style={{
      background: '#0d1424',
      border: `1px solid ${color}28`,
      borderRadius: 10,
      padding: '14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      minHeight: 200,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color, fontWeight: 700, fontSize: 12, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            {title}
          </div>
          <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{priceLabel}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div style={{
            background: color + '18',
            color,
            border: `1px solid ${color}40`,
            borderRadius: 16,
            padding: '2px 10px',
            fontSize: 14,
            fontWeight: 700,
          }}>
            {count}
          </div>
          {surgeActive && (
            <div style={{
              background: '#f9731620',
              color: '#f97316',
              border: '1px solid #f9731640',
              borderRadius: 16,
              padding: '1px 7px',
              fontSize: 10,
              fontWeight: 600,
            }}>
              SURGE
            </div>
          )}
        </div>
      </div>

      {/* Circles */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
        alignContent: 'flex-start',
        flex: 1,
        minHeight: 110,
      }}>
        {displayed.map(id => (
          <AgentCircle
            key={id}
            id={id}
            color={color}
            isDriver={isDriver}
            switched={switchedIds.has(id)}
            arrived={arrivedIds.has(id)}
          />
        ))}
        {overflow > 0 && (
          <div style={{ color: '#475569', fontSize: 10, alignSelf: 'center', fontStyle: 'italic' }}>
            +{overflow}
          </div>
        )}
        {count === 0 && (
          <div style={{ color: '#1e293b', fontSize: 11, fontStyle: 'italic', marginTop: 6 }}>
            empty
          </div>
        )}
      </div>
    </div>
  );
}

function StatRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0', borderBottom: '1px solid #0f1929' }}>
      <span style={{ color: '#475569', fontSize: 11 }}>{label}</span>
      <span style={{ color: color ?? '#cbd5e1', fontSize: 12, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

export function QueueViz({ snapshot }: Props) {
  const { platforms, matchRecords, riders, drivers, z,
          switchedRiders, switchedDrivers, arrivedRiders, arrivedDrivers } = snapshot;

  const stats = useMemo(() => {
    const mA = matchRecords.filter(m => m.platform === 'A');
    const mB = matchRecords.filter(m => m.platform === 'B');
    const revA = mA.reduce((a, m) => a + m.platformRevenue, 0);
    const revB = mB.reduce((a, m) => a + m.platformRevenue, 0);
    const switchesR = riders.reduce((a, r) => a + r.switchCount, 0);
    const switchesD = drivers.reduce((a, d) => a + d.switchCount, 0);
    const exitedR = riders.filter(r => r.state === 'EXITED').length;
    const exitedD = drivers.filter(d => d.state === 'EXITED').length;
    return { matchesA: mA.length, matchesB: mB.length, revA, revB, switchesR, switchesD, exitedR, exitedD };
  }, [matchRecords, riders, drivers]);

  const surgeActive = z > 0;
  const surgeColor = z < 0.5 ? '#f59e0b' : z < 0.9 ? '#f97316' : '#ef4444';

  const activeR = riders.filter(r => r.state === 'QUEUED_A' || r.state === 'QUEUED_B').length;
  const activeD = drivers.filter(d => d.state === 'QUEUED_A' || d.state === 'QUEUED_B').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Surge banner */}
      {surgeActive && (
        <div style={{
          background: surgeColor + '15',
          border: `1px solid ${surgeColor}50`,
          borderRadius: 8,
          padding: '7px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ color: surgeColor, fontWeight: 700, fontSize: 11, letterSpacing: '0.08em' }}>
            ⚡ REGIONAL SURGE
          </span>
          <span style={{ color: surgeColor, fontWeight: 600, fontSize: 12 }}>z = {z.toFixed(2)}</span>
        </div>
      )}

      {/* Platform labels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ textAlign: 'center', color: P1_COLOR, fontWeight: 800, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.9 }}>
          ■ PLATFORM 1
        </div>
        <div style={{ textAlign: 'center', color: P2_COLOR, fontWeight: 800, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.9 }}>
          ■ PLATFORM 2
        </div>
      </div>

      {/* 2×2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <QueueBox
          title="Riders"
          priceLabel={`Price $${platforms.A.price.toFixed(2)}`}
          count={platforms.A.riderQueue.length}
          ids={platforms.A.riderQueue}
          color={P1_COLOR}
          isDriver={false}
          switchedIds={switchedRiders}
          arrivedIds={arrivedRiders}
          surgeActive={surgeActive}
        />
        <QueueBox
          title="Riders"
          priceLabel={`Price $${platforms.B.price.toFixed(2)}`}
          count={platforms.B.riderQueue.length}
          ids={platforms.B.riderQueue}
          color={P2_COLOR}
          isDriver={false}
          switchedIds={switchedRiders}
          arrivedIds={arrivedRiders}
          surgeActive={surgeActive}
        />
        <QueueBox
          title="Drivers"
          priceLabel={`Wage $${platforms.A.wage.toFixed(2)}`}
          count={platforms.A.driverQueue.length}
          ids={platforms.A.driverQueue}
          color={P1_COLOR}
          isDriver={true}
          switchedIds={switchedDrivers}
          arrivedIds={arrivedDrivers}
          surgeActive={surgeActive}
        />
        <QueueBox
          title="Drivers"
          priceLabel={`Wage $${platforms.B.wage.toFixed(2)}`}
          count={platforms.B.driverQueue.length}
          ids={platforms.B.driverQueue}
          color={P2_COLOR}
          isDriver={true}
          switchedIds={switchedDrivers}
          arrivedIds={arrivedDrivers}
          surgeActive={surgeActive}
        />
      </div>

      {/* Live stats grid */}
      <div style={{
        background: '#0a0f1e',
        borderRadius: 10,
        padding: '12px 14px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0 20px',
      }}>
        <div>
          <div style={{ color: P1_COLOR, fontSize: 10, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>
            Platform 1
          </div>
          <StatRow label="Matches" value={stats.matchesA.toString()} color={P1_COLOR} />
          <StatRow label="Revenue" value={`$${stats.revA.toFixed(0)}`} color={P1_COLOR} />
          <StatRow label="Price" value={`$${platforms.A.price.toFixed(2)}`} />
          <StatRow label="Wage" value={`$${platforms.A.wage.toFixed(2)}`} />
        </div>
        <div>
          <div style={{ color: P2_COLOR, fontSize: 10, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85 }}>
            Platform 2
          </div>
          <StatRow label="Matches" value={stats.matchesB.toString()} color={P2_COLOR} />
          <StatRow label="Revenue" value={`$${stats.revB.toFixed(0)}`} color={P2_COLOR} />
          <StatRow label="Price" value={`$${platforms.B.price.toFixed(2)}`} />
          <StatRow label="Wage" value={`$${platforms.B.wage.toFixed(2)}`} />
        </div>
        <div style={{ gridColumn: '1 / -1', marginTop: 8 }}>
          <StatRow label="Active riders" value={activeR.toString()} />
          <StatRow label="Active drivers" value={activeD.toString()} />
          <StatRow label="Rider switches" value={stats.switchesR.toString()} />
          <StatRow label="Driver switches" value={stats.switchesD.toString()} />
          <StatRow label="Rider exits" value={stats.exitedR.toString()} />
          <StatRow label="Driver exits" value={stats.exitedD.toString()} />
        </div>
      </div>
    </div>
  );
}
