import React from 'react';
import { DeltaIndicator } from './DeltaIndicator.jsx';

/**
 * StatCard — headline KPI / metric block. Eyebrow label, large tabular
 * value, optional delta vs comparison period, and an optional caption.
 */
export function StatCard({
  label,
  value,                 // string already formatted, e.g. "$4.82M"
  delta,                 // number or null
  deltaProps = {},       // forwarded to DeltaIndicator (invert, format, etc.)
  caption,               // e.g. "vs. prior quarter"
  tone = 'surface',      // 'surface' | 'forest'
  accent = false,        // brass top accent rule
  align = 'left',
  style,
  ...rest
}) {
  const onForest = tone === 'forest';
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column', gap: 10,
        background: onForest ? 'var(--forest)' : 'var(--surface)',
        color: onForest ? 'var(--text-on-forest)' : 'var(--ink)',
        border: `var(--border-hairline) solid ${onForest ? 'var(--forest-strong)' : 'var(--line)'}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: onForest ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        padding: 'var(--space-6)',
        textAlign: align,
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {accent && (
        <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--brass)' }} />
      )}
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: onForest ? 'rgba(244,241,234,0.66)' : 'var(--ink-tertiary)',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'var(--font-sans)', fontWeight: 'var(--w-bold)',
        fontSize: 34, lineHeight: 1.05, letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums lining-nums',
      }}>
        {value}
      </span>
      {(delta != null || caption) && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {delta != null && <DeltaIndicator value={delta} {...deltaProps} />}
          {caption && (
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 13,
              color: onForest ? 'rgba(244,241,234,0.6)' : 'var(--ink-tertiary)',
            }}>
              {caption}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
