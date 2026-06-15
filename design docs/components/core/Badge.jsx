import React from 'react';

/**
 * Badge — small status pill. Semantic tones map to financial states.
 */
export function Badge({
  tone = 'neutral',   // 'neutral'|'positive'|'negative'|'caution'|'info'|'forest'|'brass'
  variant = 'soft',   // 'soft' | 'solid' | 'outline'
  dot = false,
  children,
  style,
  ...rest
}) {
  const tones = {
    neutral:  { c: 'var(--ink-secondary)', wash: 'var(--paper-sunken)', solid: 'var(--ink-secondary)', line: 'var(--line-strong)' },
    positive: { c: 'var(--positive)', wash: 'var(--positive-wash)', solid: 'var(--positive)', line: 'var(--positive)' },
    negative: { c: 'var(--negative)', wash: 'var(--negative-wash)', solid: 'var(--negative)', line: 'var(--negative)' },
    caution:  { c: 'var(--caution)', wash: 'var(--caution-wash)', solid: 'var(--caution)', line: 'var(--caution)' },
    info:     { c: 'var(--info)', wash: 'var(--info-wash)', solid: 'var(--info)', line: 'var(--info)' },
    forest:   { c: 'var(--forest)', wash: 'var(--forest-wash)', solid: 'var(--forest)', line: 'var(--forest)' },
    brass:    { c: 'var(--brass-strong)', wash: 'var(--brass-wash)', solid: 'var(--brass)', line: 'var(--brass)' },
  };
  const t = tones[tone] || tones.neutral;
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 'var(--w-medium)',
    letterSpacing: '0.04em', textTransform: 'uppercase',
    padding: '3px 9px', borderRadius: 'var(--radius-pill)', lineHeight: 1.4,
    whiteSpace: 'nowrap',
  };
  const skin =
    variant === 'solid'   ? { background: t.solid, color: '#fff', border: '1px solid transparent' } :
    variant === 'outline' ? { background: 'transparent', color: t.c, border: `1px solid ${t.line}` } :
                            { background: t.wash, color: t.c, border: '1px solid transparent' };
  return (
    <span style={{ ...base, ...skin, ...style }} {...rest}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: variant === 'solid' ? '#fff' : t.solid, flex: '0 0 auto' }} />}
      {children}
    </span>
  );
}
