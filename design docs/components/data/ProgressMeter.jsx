import React from 'react';

/**
 * ProgressMeter — horizontal meter for budget vs. actual, goal
 * attainment, allocation. Shows a label row, the track, and an
 * optional value/target caption. Color reflects status.
 */
export function ProgressMeter({
  value = 0,             // current amount
  target = 100,          // 100% reference
  label,
  tone = 'forest',       // 'forest' | 'positive' | 'caution' | 'negative' | 'brass'
  valueText,             // override right-side text, else "{pct}%"
  showTrackLabel = true,
  height = 8,
  overAt = 1.0,          // ratio at which to warn (e.g. budget overrun)
  style,
  ...rest
}) {
  const ratio = target > 0 ? value / target : 0;
  const pct = Math.max(0, Math.min(1, ratio)) * 100;
  const over = ratio > overAt;
  const toneColors = {
    forest: 'var(--forest)', positive: 'var(--positive)',
    caution: 'var(--caution)', negative: 'var(--negative)', brass: 'var(--brass)',
  };
  const fill = over ? 'var(--negative)' : (toneColors[tone] || toneColors.forest);
  const rightText = valueText != null ? valueText : `${Math.round(ratio * 100)}%`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', ...style }} {...rest}>
      {(label || showTrackLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          {label && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 'var(--w-medium)', color: 'var(--ink-secondary)' }}>{label}</span>}
          {showTrackLabel && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 'var(--w-medium)', color: over ? 'var(--negative)' : 'var(--ink-tertiary)', fontVariantNumeric: 'tabular-nums lining-nums' }}>
              {rightText}
            </span>
          )}
        </div>
      )}
      <div style={{ position: 'relative', width: '100%', height, background: 'var(--sage-light)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: fill, borderRadius: 'var(--radius-pill)', transition: 'width var(--dur-slow) var(--ease-out)' }} />
      </div>
    </div>
  );
}
