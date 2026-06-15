import React from 'react';

/**
 * BarChart — lightweight CSS column chart for financial trends.
 * No dependencies. Pass data as [{ label, value, tone? }].
 * Bars use the data-viz palette; one series, vertical columns.
 */
export function BarChart({
  data = [],
  height = 180,
  format = (v) => v,     // value formatter for tooltips/labels
  showValues = false,
  color = 'var(--forest)',
  highlightLast = false, // tint the final bar brass (e.g. current period)
  baseline = 0,
  style,
  ...rest
}) {
  const values = data.map((d) => Number(d.value) || 0);
  const max = Math.max(...values, baseline, 1);
  const min = Math.min(...values, baseline, 0);
  const span = max - min || 1;

  return (
    <div
      style={{
        display: 'flex', alignItems: 'flex-end', gap: 'clamp(6px, 2%, 18px)',
        height, width: '100%', ...style,
      }}
      {...rest}
    >
      {data.map((d, i) => {
        const v = Number(d.value) || 0;
        const h = Math.max(2, ((v - min) / span) * 100);
        const isLast = i === data.length - 1;
        const fill = d.tone || (highlightLast && isLast ? 'var(--brass)' : color);
        return (
          <div key={d.label ?? i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 8, minWidth: 0 }}>
            {showValues && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-tertiary)', fontVariantNumeric: 'tabular-nums lining-nums' }}>
                {format(v)}
              </span>
            )}
            <div
              title={`${d.label}: ${format(v)}`}
              style={{
                width: '100%', maxWidth: 48, height: `${h}%`,
                background: fill, borderRadius: 'var(--radius-xs) var(--radius-xs) 0 0',
                transition: 'height var(--dur-slow) var(--ease-out)',
              }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.02em', color: 'var(--ink-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
