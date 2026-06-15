import React from 'react';

let _inpStyled = false;
function injectInputStyles() {
  if (_inpStyled || typeof document === 'undefined') return;
  _inpStyled = true;
  const css = `
  .rm-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-sans);}
  .rm-field__label{font-size:13px;font-weight:var(--w-semibold);color:var(--ink-secondary);}
  .rm-field__hint{font-size:12px;color:var(--ink-tertiary);}
  .rm-field__err{font-size:12px;color:var(--negative);font-weight:var(--w-medium);}
  .rm-input{font-family:var(--font-sans);font-size:15px;color:var(--ink);
    background:var(--surface);border:var(--border-hairline) solid var(--line-strong);
    border-radius:var(--radius-md);padding:10px 12px;width:100%;
    transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard);}
  .rm-input::placeholder{color:var(--ink-faint);}
  .rm-input:hover{border-color:var(--sage);}
  .rm-input:focus{outline:none;border-color:var(--moss);box-shadow:var(--shadow-focus);}
  .rm-input:disabled{background:var(--paper-sunken);color:var(--ink-faint);cursor:not-allowed;}
  .rm-input--num{font-variant-numeric:tabular-nums lining-nums;text-align:right;}
  .rm-input[aria-invalid="true"]{border-color:var(--negative);}
  .rm-input[aria-invalid="true"]:focus{box-shadow:0 0 0 3px rgba(178,58,51,0.22);}
  .rm-input__wrap{position:relative;display:flex;align-items:center;}
  .rm-input__affix{position:absolute;color:var(--ink-tertiary);font-size:14px;font-family:var(--font-mono);pointer-events:none;}
  .rm-input__affix--left{left:12px;}
  .rm-input__affix--right{right:12px;}
  `;
  const el = document.createElement('style');
  el.id = 'rm-input-styles';
  el.textContent = css;
  document.head.appendChild(el);
}

/**
 * Input — text / number field, optionally wrapped with a Field label.
 */
export function Input({
  label,
  hint,
  error,
  prefix,            // e.g. "$"
  suffix,            // e.g. "%"
  numeric = false,
  id,
  className = '',
  style,
  ...rest
}) {
  injectInputStyles();
  const inputId = id || (label ? 'rm-' + String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);
  const padStyle = {};
  if (prefix) padStyle.paddingLeft = 26;
  if (suffix) padStyle.paddingRight = 28;
  const input = (
    <span className="rm-input__wrap">
      {prefix && <span className="rm-input__affix rm-input__affix--left">{prefix}</span>}
      <input
        id={inputId}
        className={`rm-input${numeric ? ' rm-input--num' : ''}${className ? ' ' + className : ''}`}
        aria-invalid={error ? 'true' : undefined}
        style={{ ...padStyle, ...style }}
        {...rest}
      />
      {suffix && <span className="rm-input__affix rm-input__affix--right">{suffix}</span>}
    </span>
  );
  if (!label && !hint && !error) return input;
  return (
    <span className="rm-field">
      {label && <label className="rm-field__label" htmlFor={inputId}>{label}</label>}
      {input}
      {error ? <span className="rm-field__err">{error}</span> : hint && <span className="rm-field__hint">{hint}</span>}
    </span>
  );
}
