import React from 'react';

interface Props {
  t: number;
  tMax: number;
  playing: boolean;
  done: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (v: number) => void;
}

const BTN_BASE: React.CSSProperties = {
  padding: '8px 18px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 13,
  transition: 'all 0.15s',
};

export function Controls({ t, tMax, playing, done, speed, onPlay, onPause, onStep, onReset, onSpeedChange }: Props) {
  const progress = Math.min(100, (t / tMax) * 100);

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: '14px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ color: '#9ca3af', fontSize: 12, width: 32, textAlign: 'right' }}>t={t}</div>
        <div style={{ flex: 1, background: '#e5e7eb', borderRadius: 4, height: 6, overflow: 'hidden' }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: done ? '#10b981' : 'linear-gradient(90deg, #111827, #ec4899)',
            borderRadius: 4,
            transition: 'width 0.2s ease',
          }} />
        </div>
        <div style={{ color: '#9ca3af', fontSize: 12, width: 38 }}>/{tMax}</div>
      </div>

      {/* Buttons + speed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {!playing ? (
          <button
            style={{ ...BTN_BASE, background: done ? '#f1f5f9' : '#3b82f6', color: done ? '#9ca3af' : '#fff' }}
            onClick={onPlay}
            disabled={done}
          >
            ▶ Play
          </button>
        ) : (
          <button
            style={{ ...BTN_BASE, background: '#f1f5f9', color: '#6b7280' }}
            onClick={onPause}
          >
            ⏸ Pause
          </button>
        )}

        <button
          style={{ ...BTN_BASE, background: '#f1f5f9', color: done ? '#d1d5db' : '#6b7280' }}
          onClick={onStep}
          disabled={done || playing}
        >
          ⏭ Step
        </button>

        <button
          style={{ ...BTN_BASE, background: '#f1f5f9', color: '#6b7280' }}
          onClick={onReset}
        >
          ↺ Reset
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#9ca3af', fontSize: 12 }}>Speed</span>
          <select
            value={speed}
            onChange={e => onSpeedChange(Number(e.target.value))}
            style={{
              background: '#f1f5f9',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              padding: '4px 8px',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            <option value={4000}>0.1×</option>
            <option value={2000}>0.25×</option>
            <option value={1200}>0.5×</option>
            <option value={600}>1×</option>
            <option value={300}>2×</option>
            <option value={100}>5×</option>
            <option value={1}>Max</option>
          </select>
        </div>

        {done && (
          <div style={{
            background: '#10b98120',
            color: '#10b981',
            border: '1px solid #10b98155',
            borderRadius: 20,
            padding: '3px 12px',
            fontSize: 12,
            fontWeight: 600,
          }}>
            ✓ Complete
          </div>
        )}
      </div>
    </div>
  );
}
