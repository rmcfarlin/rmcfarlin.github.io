import React from 'react';

/**
 * Tag — quiet metadata chip (categories, sectors, filters).
 * Lower-emphasis than Badge; sentence case, not uppercase.
 */
export function Tag({
  removable = false,
  onRemove,
  active = false,
  iconLeft = null,
  children,
  style,
  ...rest
}) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 'var(--w-medium)',
        color: active ? 'var(--text-on-forest)' : 'var(--ink-secondary)',
        background: active ? 'var(--forest)' : 'var(--surface)',
        border: `var(--border-hairline) solid ${active ? 'var(--forest)' : 'var(--line-strong)'}`,
        padding: '4px 10px', borderRadius: 'var(--radius-sm)', lineHeight: 1.4,
        whiteSpace: 'nowrap', ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 14, height: 14, marginRight: -2, padding: 0,
            border: 'none', background: 'transparent', cursor: 'pointer',
            color: 'inherit', opacity: 0.6, fontSize: 13, lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
