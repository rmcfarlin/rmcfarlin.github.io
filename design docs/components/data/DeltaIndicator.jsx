import React from 'react';

/**
 * DeltaIndicator — a signed change value with directional arrow and
 * semantic color. The atomic unit of financial reporting.
 */
export function DeltaIndicator({
  value,                 // number, e.g. 12.4  or -3.1
  format = 'percent',    // 'percent' | 'currency' | 'plain'
  currency = '$',
  decimals = 1,
  invert = false,        // when true, a decrease is "good" (e.g. costs)
  showArrow = true,
  size = 'md',           // 'sm' | 'md' | 'lg'
  neutralThreshold = 0,
  style,
  ...rest
}) {
  const n = Number(value) || 0;
  const isUp = n > neutralThreshold;
  const isDown = n < -neutralThreshold;
  const good = invert ? isDown : isUp;
  const bad = invert ? isUp : isDown;
  const color = good ? 'var(--positive)' : bad ? 'var(--negative)' : 'var(--ink-tertiary)';
  const arrow = isUp ? '▲' : isDown ? '▼' : '–';

  const abs = Math.abs(n).toFixed(decimals);
  const label =
    format === 'currency' ? `${currency}${abs}` :
    format === 'percent'  ? `${abs}%` : abs;
  const sign = isUp ? '+' : isDown ? '−' : '';
  const fontSize = { sm: 12.5, md: 14, lg: 17 }[size] || 14;

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums lining-nums',
        fontWeight: 'var(--w-medium)', fontSize, color, ...style,
      }}
      {...rest}
    >
      {showArrow && <span style={{ fontSize: fontSize * 0.66, lineHeight: 1 }}>{arrow}</span>}
      <span>{sign}{label}</span>
    </span>
  );
}
