import React from 'react';

let _btnStyled = false;
function injectButtonStyles() {
  if (_btnStyled || typeof document === 'undefined') return;
  _btnStyled = true;
  const css = `
  .rm-btn{--_bg:var(--forest);--_fg:var(--text-on-forest);--_bd:transparent;
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
    font-family:var(--font-sans);font-weight:var(--w-semibold);
    border:var(--border-hairline) solid var(--_bd);background:var(--_bg);color:var(--_fg);
    cursor:pointer;white-space:nowrap;text-decoration:none;
    border-radius:var(--radius-md);transition:background var(--dur-fast) var(--ease-standard),
      box-shadow var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-standard),
      border-color var(--dur-fast) var(--ease-standard);}
  .rm-btn:active{transform:translateY(0.5px);}
  .rm-btn:focus-visible{outline:none;box-shadow:var(--shadow-focus);}
  .rm-btn[disabled],.rm-btn[aria-disabled="true"]{opacity:.45;cursor:not-allowed;transform:none;}
  /* sizes */
  .rm-btn--sm{font-size:13px;padding:7px 12px;}
  .rm-btn--md{font-size:15px;padding:10px 18px;}
  .rm-btn--lg{font-size:16px;padding:13px 24px;}
  /* variants */
  .rm-btn--primary{--_bg:var(--forest);--_fg:var(--text-on-forest);}
  .rm-btn--primary:hover{--_bg:var(--forest-strong);}
  .rm-btn--secondary{--_bg:var(--surface);--_fg:var(--ink);--_bd:var(--line-strong);box-shadow:var(--shadow-xs);}
  .rm-btn--secondary:hover{--_bg:var(--surface-muted);--_bd:var(--sage);}
  .rm-btn--ghost{--_bg:transparent;--_fg:var(--moss);--_bd:transparent;}
  .rm-btn--ghost:hover{--_bg:var(--forest-wash);}
  .rm-btn--brass{--_bg:var(--brass);--_fg:#fff;}
  .rm-btn--brass:hover{--_bg:var(--brass-strong);}
  .rm-btn--block{display:flex;width:100%;}
  .rm-btn>svg{width:1.05em;height:1.05em;flex:0 0 auto;}
  `;
  const el = document.createElement('style');
  el.id = 'rm-button-styles';
  el.textContent = css;
  document.head.appendChild(el);
}

/**
 * Button — primary action control.
 */
export function Button({
  variant = 'primary',   // 'primary' | 'secondary' | 'ghost' | 'brass'
  size = 'md',           // 'sm' | 'md' | 'lg'
  block = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  className = '',
  children,
  ...rest
}) {
  injectButtonStyles();
  const Tag = as;
  const cls = `rm-btn rm-btn--${variant} rm-btn--${size}${block ? ' rm-btn--block' : ''}${className ? ' ' + className : ''}`;
  return (
    <Tag className={cls} {...rest}>
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
