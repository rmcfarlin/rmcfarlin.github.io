import React from 'react';

/**
 * Card — surface container with hairline border + soft warm shadow.
 */
export function Card({
  as = 'div',
  pad = 'md',            // 'none' | 'sm' | 'md' | 'lg'
  elevation = 'sm',      // 'flat' | 'xs' | 'sm' | 'md'
  tone = 'surface',      // 'surface' | 'sunken' | 'forest'
  className = '',
  style,
  children,
  ...rest
}) {
  const Tag = as;
  const padMap = { none: 0, sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-8)' };
  const shadowMap = { flat: 'none', xs: 'var(--shadow-xs)', sm: 'var(--shadow-sm)', md: 'var(--shadow-md)' };
  const toneMap = {
    surface: { background: 'var(--surface)', color: 'var(--ink)', border: 'var(--border-hairline) solid var(--line)' },
    sunken:  { background: 'var(--paper-sunken)', color: 'var(--ink)', border: 'var(--border-hairline) solid var(--line)' },
    forest:  { background: 'var(--forest)', color: 'var(--text-on-forest)', border: 'var(--border-hairline) solid var(--forest-strong)' },
  };
  const t = toneMap[tone] || toneMap.surface;
  return (
    <Tag
      className={className}
      style={{
        background: t.background,
        color: t.color,
        border: t.border,
        borderRadius: 'var(--radius-lg)',
        boxShadow: tone === 'forest' ? 'var(--shadow-md)' : shadowMap[elevation],
        padding: padMap[pad],
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
