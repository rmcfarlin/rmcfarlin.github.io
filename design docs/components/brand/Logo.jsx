import React from 'react';

/**
 * Logo — Robert McFarlin brand lockup.
 * Pairs the geometric emblem with the wordmark set in the brand sans.
 * Pass markSrc pointing at assets/mark.svg (or mark-light.svg on dark).
 */
export function Logo({
  variant = 'full',          // 'full' | 'wordmark' | 'mark'
  tone = 'dark',             // 'dark' (on light bg) | 'light' (on dark bg)
  markSrc = 'assets/mark.svg',
  size = 'md',               // 'sm' | 'md' | 'lg'
  showEyebrow = true,
  style,
  ...rest
}) {
  const dims = { sm: 28, md: 38, lg: 52 }[size] || 38;
  const nameSize = { sm: 16, md: 20, lg: 28 }[size] || 20;
  const ink = tone === 'light' ? 'var(--text-on-forest, #F4F1EA)' : 'var(--ink, #1C1B17)';
  const muted = tone === 'light' ? 'rgba(244,241,234,0.62)' : 'var(--ink-tertiary, #6E6B5F)';

  const Mark = (
    <img
      src={markSrc}
      alt="Robert McFarlin"
      width={dims}
      height={dims}
      style={{ display: 'block', flex: '0 0 auto' }}
    />
  );

  const Word = (
    <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: 4 }}>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--w-bold, 700)',
        fontSize: nameSize,
        letterSpacing: '-0.02em',
        color: ink,
        whiteSpace: 'nowrap',
      }}>
        Robert McFarlin
      </span>
      {showEyebrow && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: Math.max(9, Math.round(nameSize * 0.46)),
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: muted,
        }}>
          Fractional&nbsp;CFO
        </span>
      )}
    </span>
  );

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: size === 'sm' ? 10 : 14, ...style }}
      {...rest}
    >
      {variant !== 'wordmark' && Mark}
      {variant !== 'mark' && Word}
    </span>
  );
}
