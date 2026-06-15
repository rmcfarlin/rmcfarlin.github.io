/* @ds-bundle: {"format":3,"namespace":"McFarlinCFODesignSystem_e3e0bb","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"DeltaIndicator","sourcePath":"components/data/DeltaIndicator.jsx"},{"name":"ProgressMeter","sourcePath":"components/data/ProgressMeter.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"d13c926e9466","components/core/Badge.jsx":"c08f4484ccac","components/core/Button.jsx":"aa2316160a95","components/core/Card.jsx":"5516082f3879","components/core/Input.jsx":"4a7484433688","components/core/Tag.jsx":"f760b7b85fc5","components/data/BarChart.jsx":"934593a58493","components/data/DataTable.jsx":"4a7d50ea8034","components/data/DeltaIndicator.jsx":"960684d59ec7","components/data/ProgressMeter.jsx":"eb85e8a9f57c","components/data/StatCard.jsx":"f41e1dcadacb","ui_kits/dashboard/DashContent.jsx":"9963ec333a32","ui_kits/dashboard/DashShell.jsx":"77665e7092dd","ui_kits/website/Hero.jsx":"b04089ca8266","ui_kits/website/Sections.jsx":"1a61273f139e","ui_kits/website/Services.jsx":"5416f7b3a62f","ui_kits/website/SiteHeader.jsx":"2c6b6dc1d890"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.McFarlinCFODesignSystem_e3e0bb = window.McFarlinCFODesignSystem_e3e0bb || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Logo — Robert McFarlin brand lockup.
 * Pairs the geometric emblem with the wordmark set in the brand sans.
 * Pass markSrc pointing at assets/mark.svg (or mark-light.svg on dark).
 */
function Logo({
  variant = 'full',
  // 'full' | 'wordmark' | 'mark'
  tone = 'dark',
  // 'dark' (on light bg) | 'light' (on dark bg)
  markSrc = 'assets/mark.svg',
  size = 'md',
  // 'sm' | 'md' | 'lg'
  showEyebrow = true,
  style,
  ...rest
}) {
  const dims = {
    sm: 28,
    md: 38,
    lg: 52
  }[size] || 38;
  const nameSize = {
    sm: 16,
    md: 20,
    lg: 28
  }[size] || 20;
  const ink = tone === 'light' ? 'var(--text-on-forest, #F4F1EA)' : 'var(--ink, #1C1B17)';
  const muted = tone === 'light' ? 'rgba(244,241,234,0.62)' : 'var(--ink-tertiary, #6E6B5F)';
  const Mark = /*#__PURE__*/React.createElement("img", {
    src: markSrc,
    alt: "Robert McFarlin",
    width: dims,
    height: dims,
    style: {
      display: 'block',
      flex: '0 0 auto'
    }
  });
  const Word = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1,
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--w-bold, 700)',
      fontSize: nameSize,
      letterSpacing: '-0.02em',
      color: ink,
      whiteSpace: 'nowrap'
    }
  }, "Robert McFarlin"), showEyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: Math.max(9, Math.round(nameSize * 0.46)),
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: muted
    }
  }, "Fractional\xA0CFO"));
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size === 'sm' ? 10 : 14,
      ...style
    }
  }, rest), variant !== 'wordmark' && Mark, variant !== 'mark' && Word);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status pill. Semantic tones map to financial states.
 */
function Badge({
  tone = 'neutral',
  // 'neutral'|'positive'|'negative'|'caution'|'info'|'forest'|'brass'
  variant = 'soft',
  // 'soft' | 'solid' | 'outline'
  dot = false,
  children,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      c: 'var(--ink-secondary)',
      wash: 'var(--paper-sunken)',
      solid: 'var(--ink-secondary)',
      line: 'var(--line-strong)'
    },
    positive: {
      c: 'var(--positive)',
      wash: 'var(--positive-wash)',
      solid: 'var(--positive)',
      line: 'var(--positive)'
    },
    negative: {
      c: 'var(--negative)',
      wash: 'var(--negative-wash)',
      solid: 'var(--negative)',
      line: 'var(--negative)'
    },
    caution: {
      c: 'var(--caution)',
      wash: 'var(--caution-wash)',
      solid: 'var(--caution)',
      line: 'var(--caution)'
    },
    info: {
      c: 'var(--info)',
      wash: 'var(--info-wash)',
      solid: 'var(--info)',
      line: 'var(--info)'
    },
    forest: {
      c: 'var(--forest)',
      wash: 'var(--forest-wash)',
      solid: 'var(--forest)',
      line: 'var(--forest)'
    },
    brass: {
      c: 'var(--brass-strong)',
      wash: 'var(--brass-wash)',
      solid: 'var(--brass)',
      line: 'var(--brass)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: 'var(--font-mono)',
    fontSize: 11.5,
    fontWeight: 'var(--w-medium)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    padding: '3px 9px',
    borderRadius: 'var(--radius-pill)',
    lineHeight: 1.4,
    whiteSpace: 'nowrap'
  };
  const skin = variant === 'solid' ? {
    background: t.solid,
    color: '#fff',
    border: '1px solid transparent'
  } : variant === 'outline' ? {
    background: 'transparent',
    color: t.c,
    border: `1px solid ${t.line}`
  } : {
    background: t.wash,
    color: t.c,
    border: '1px solid transparent'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...skin,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: variant === 'solid' ? '#fff' : t.solid,
      flex: '0 0 auto'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
  variant = 'primary',
  // 'primary' | 'secondary' | 'ghost' | 'brass'
  size = 'md',
  // 'sm' | 'md' | 'lg'
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
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — surface container with hairline border + soft warm shadow.
 */
function Card({
  as = 'div',
  pad = 'md',
  // 'none' | 'sm' | 'md' | 'lg'
  elevation = 'sm',
  // 'flat' | 'xs' | 'sm' | 'md'
  tone = 'surface',
  // 'surface' | 'sunken' | 'forest'
  className = '',
  style,
  children,
  ...rest
}) {
  const Tag = as;
  const padMap = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  };
  const shadowMap = {
    flat: 'none',
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)'
  };
  const toneMap = {
    surface: {
      background: 'var(--surface)',
      color: 'var(--ink)',
      border: 'var(--border-hairline) solid var(--line)'
    },
    sunken: {
      background: 'var(--paper-sunken)',
      color: 'var(--ink)',
      border: 'var(--border-hairline) solid var(--line)'
    },
    forest: {
      background: 'var(--forest)',
      color: 'var(--text-on-forest)',
      border: 'var(--border-hairline) solid var(--forest-strong)'
    }
  };
  const t = toneMap[tone] || toneMap.surface;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: className,
    style: {
      background: t.background,
      color: t.color,
      border: t.border,
      borderRadius: 'var(--radius-lg)',
      boxShadow: tone === 'forest' ? 'var(--shadow-md)' : shadowMap[elevation],
      padding: padMap[pad],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Input({
  label,
  hint,
  error,
  prefix,
  // e.g. "$"
  suffix,
  // e.g. "%"
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
  const input = /*#__PURE__*/React.createElement("span", {
    className: "rm-input__wrap"
  }, prefix && /*#__PURE__*/React.createElement("span", {
    className: "rm-input__affix rm-input__affix--left"
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: `rm-input${numeric ? ' rm-input--num' : ''}${className ? ' ' + className : ''}`,
    "aria-invalid": error ? 'true' : undefined,
    style: {
      ...padStyle,
      ...style
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    className: "rm-input__affix rm-input__affix--right"
  }, suffix));
  if (!label && !hint && !error) return input;
  return /*#__PURE__*/React.createElement("span", {
    className: "rm-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "rm-field__label",
    htmlFor: inputId
  }, label), input, error ? /*#__PURE__*/React.createElement("span", {
    className: "rm-field__err"
  }, error) : hint && /*#__PURE__*/React.createElement("span", {
    className: "rm-field__hint"
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — quiet metadata chip (categories, sectors, filters).
 * Lower-emphasis than Badge; sentence case, not uppercase.
 */
function Tag({
  removable = false,
  onRemove,
  active = false,
  iconLeft = null,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 'var(--w-medium)',
      color: active ? 'var(--text-on-forest)' : 'var(--ink-secondary)',
      background: active ? 'var(--forest)' : 'var(--surface)',
      border: `var(--border-hairline) solid ${active ? 'var(--forest)' : 'var(--line-strong)'}`,
      padding: '4px 10px',
      borderRadius: 'var(--radius-sm)',
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), iconLeft, children, removable && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 14,
      height: 14,
      marginRight: -2,
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'inherit',
      opacity: 0.6,
      fontSize: 13,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/BarChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BarChart — lightweight CSS column chart for financial trends.
 * No dependencies. Pass data as [{ label, value, tone? }].
 * Bars use the data-viz palette; one series, vertical columns.
 */
function BarChart({
  data = [],
  height = 180,
  format = v => v,
  // value formatter for tooltips/labels
  showValues = false,
  color = 'var(--forest)',
  highlightLast = false,
  // tint the final bar brass (e.g. current period)
  baseline = 0,
  style,
  ...rest
}) {
  const values = data.map(d => Number(d.value) || 0);
  const max = Math.max(...values, baseline, 1);
  const min = Math.min(...values, baseline, 0);
  const span = max - min || 1;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 'clamp(6px, 2%, 18px)',
      height,
      width: '100%',
      ...style
    }
  }, rest), data.map((d, i) => {
    const v = Number(d.value) || 0;
    const h = Math.max(2, (v - min) / span * 100);
    const isLast = i === data.length - 1;
    const fill = d.tone || (highlightLast && isLast ? 'var(--brass)' : color);
    return /*#__PURE__*/React.createElement("div", {
      key: d.label ?? i,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end',
        gap: 8,
        minWidth: 0
      }
    }, showValues && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--ink-tertiary)',
        fontVariantNumeric: 'tabular-nums lining-nums'
      }
    }, format(v)), /*#__PURE__*/React.createElement("div", {
      title: `${d.label}: ${format(v)}`,
      style: {
        width: '100%',
        maxWidth: 48,
        height: `${h}%`,
        background: fill,
        borderRadius: 'var(--radius-xs) var(--radius-xs) 0 0',
        transition: 'height var(--dur-slow) var(--ease-out)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.02em',
        color: 'var(--ink-tertiary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%'
      }
    }, d.label));
  }));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _tblStyled = false;
function injectTableStyles() {
  if (_tblStyled || typeof document === 'undefined') return;
  _tblStyled = true;
  const css = `
  .rm-table{width:100%;border-collapse:collapse;font-family:var(--font-sans);font-size:14px;color:var(--ink);}
  .rm-table thead th{font-family:var(--font-mono);font-size:11px;letter-spacing:0.1em;
    text-transform:uppercase;color:var(--ink-tertiary);font-weight:var(--w-medium);
    text-align:left;padding:10px 16px;border-bottom:1.5px solid var(--line-strong);white-space:nowrap;}
  .rm-table tbody td{padding:12px 16px;border-bottom:var(--border-hairline) solid var(--line);
    color:var(--ink-secondary);vertical-align:middle;}
  .rm-table tbody tr:last-child td{border-bottom:none;}
  .rm-table--zebra tbody tr:nth-child(even){background:var(--paper-sunken);}
  .rm-table--hover tbody tr{transition:background var(--dur-fast) var(--ease-standard);}
  .rm-table--hover tbody tr:hover{background:var(--forest-wash);}
  .rm-table .rm-td--num,.rm-table .rm-th--num{text-align:right;font-variant-numeric:tabular-nums lining-nums;
    font-family:var(--font-mono);}
  .rm-table .rm-td--strong{color:var(--ink);font-weight:var(--w-semibold);}
  .rm-table tfoot td{padding:12px 16px;border-top:1.5px solid var(--line-strong);
    font-weight:var(--w-bold);color:var(--ink);font-variant-numeric:tabular-nums lining-nums;}
  .rm-table tfoot td.rm-td--num{font-family:var(--font-mono);text-align:right;}
  .rm-table__wrap{border:var(--border-hairline) solid var(--line);border-radius:var(--radius-lg);
    overflow:hidden;background:var(--surface);box-shadow:var(--shadow-xs);}
  `;
  const el = document.createElement('style');
  el.id = 'rm-table-styles';
  el.textContent = css;
  document.head.appendChild(el);
}

/**
 * DataTable — financial table with tabular figures, right-aligned
 * numeric columns, optional zebra, hover, and a totals footer.
 *
 * columns: [{ key, header, align?: 'left'|'right', numeric?: bool, strong?: bool, render?: (row)=>node, width? }]
 * rows:    [{ ...cellsByKey }]
 * totals:  optional object keyed by column key (rendered in tfoot)
 */
function DataTable({
  columns = [],
  rows = [],
  totals = null,
  totalsLabel = 'Total',
  zebra = false,
  hover = true,
  wrap = true,
  style,
  ...rest
}) {
  injectTableStyles();
  const cls = `rm-table${zebra ? ' rm-table--zebra' : ''}${hover ? ' rm-table--hover' : ''}`;
  const cellCls = c => `${c.numeric || c.align === 'right' ? 'rm-td--num' : ''}${c.strong ? ' rm-td--strong' : ''}`.trim();
  const headCls = c => c.numeric || c.align === 'right' ? 'rm-th--num' : '';
  const table = /*#__PURE__*/React.createElement("table", _extends({
    className: cls,
    style: style
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    className: headCls(c),
    style: c.width ? {
      width: c.width
    } : undefined
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: row.id != null ? row.id : i
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    className: cellCls(c)
  }, c.render ? c.render(row) : row[c.key]))))), totals && /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, idx) => {
    const isNum = c.numeric || c.align === 'right';
    const content = idx === 0 && totals[c.key] == null ? totalsLabel : totals[c.key];
    return /*#__PURE__*/React.createElement("td", {
      key: c.key,
      className: isNum ? 'rm-td--num' : ''
    }, content);
  }))));
  return wrap ? /*#__PURE__*/React.createElement("div", {
    className: "rm-table__wrap"
  }, table) : table;
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/DeltaIndicator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DeltaIndicator — a signed change value with directional arrow and
 * semantic color. The atomic unit of financial reporting.
 */
function DeltaIndicator({
  value,
  // number, e.g. 12.4  or -3.1
  format = 'percent',
  // 'percent' | 'currency' | 'plain'
  currency = '$',
  decimals = 1,
  invert = false,
  // when true, a decrease is "good" (e.g. costs)
  showArrow = true,
  size = 'md',
  // 'sm' | 'md' | 'lg'
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
  const label = format === 'currency' ? `${currency}${abs}` : format === 'percent' ? `${abs}%` : abs;
  const sign = isUp ? '+' : isDown ? '−' : '';
  const fontSize = {
    sm: 12.5,
    md: 14,
    lg: 17
  }[size] || 14;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums lining-nums',
      fontWeight: 'var(--w-medium)',
      fontSize,
      color,
      ...style
    }
  }, rest), showArrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: fontSize * 0.66,
      lineHeight: 1
    }
  }, arrow), /*#__PURE__*/React.createElement("span", null, sign, label));
}
Object.assign(__ds_scope, { DeltaIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DeltaIndicator.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ProgressMeter — horizontal meter for budget vs. actual, goal
 * attainment, allocation. Shows a label row, the track, and an
 * optional value/target caption. Color reflects status.
 */
function ProgressMeter({
  value = 0,
  // current amount
  target = 100,
  // 100% reference
  label,
  tone = 'forest',
  // 'forest' | 'positive' | 'caution' | 'negative' | 'brass'
  valueText,
  // override right-side text, else "{pct}%"
  showTrackLabel = true,
  height = 8,
  overAt = 1.0,
  // ratio at which to warn (e.g. budget overrun)
  style,
  ...rest
}) {
  const ratio = target > 0 ? value / target : 0;
  const pct = Math.max(0, Math.min(1, ratio)) * 100;
  const over = ratio > overAt;
  const toneColors = {
    forest: 'var(--forest)',
    positive: 'var(--positive)',
    caution: 'var(--caution)',
    negative: 'var(--negative)',
    brass: 'var(--brass)'
  };
  const fill = over ? 'var(--negative)' : toneColors[tone] || toneColors.forest;
  const rightText = valueText != null ? valueText : `${Math.round(ratio * 100)}%`;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%',
      ...style
    }
  }, rest), (label || showTrackLabel) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      fontWeight: 'var(--w-medium)',
      color: 'var(--ink-secondary)'
    }
  }, label), showTrackLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      fontWeight: 'var(--w-medium)',
      color: over ? 'var(--negative)' : 'var(--ink-tertiary)',
      fontVariantNumeric: 'tabular-nums lining-nums'
    }
  }, rightText)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height,
      background: 'var(--sage-light)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: `${pct}%`,
      background: fill,
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressMeter.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatCard — headline KPI / metric block. Eyebrow label, large tabular
 * value, optional delta vs comparison period, and an optional caption.
 */
function StatCard({
  label,
  value,
  // string already formatted, e.g. "$4.82M"
  delta,
  // number or null
  deltaProps = {},
  // forwarded to DeltaIndicator (invert, format, etc.)
  caption,
  // e.g. "vs. prior quarter"
  tone = 'surface',
  // 'surface' | 'forest'
  accent = false,
  // brass top accent rule
  align = 'left',
  style,
  ...rest
}) {
  const onForest = tone === 'forest';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      background: onForest ? 'var(--forest)' : 'var(--surface)',
      color: onForest ? 'var(--text-on-forest)' : 'var(--ink)',
      border: `var(--border-hairline) solid ${onForest ? 'var(--forest-strong)' : 'var(--line)'}`,
      borderRadius: 'var(--radius-lg)',
      boxShadow: onForest ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      padding: 'var(--space-6)',
      textAlign: align,
      overflow: 'hidden',
      ...style
    }
  }, rest), accent && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: 'var(--brass)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: onForest ? 'rgba(244,241,234,0.66)' : 'var(--ink-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--w-bold)',
      fontSize: 34,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums lining-nums'
    }
  }, value), (delta != null || caption) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, delta != null && /*#__PURE__*/React.createElement(__ds_scope.DeltaIndicator, _extends({
    value: delta
  }, deltaProps)), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: onForest ? 'rgba(244,241,234,0.6)' : 'var(--ink-tertiary)'
    }
  }, caption)));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/DashContent.jsx
try { (() => {
/* global React */
// Dashboard — main content: KPI row, revenue + meters, P&L table.
const C = window.McFarlinCFODesignSystem_e3e0bb;
function DashContent({
  period
}) {
  const data = DATA[period] || DATA['Q3 2025'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(C.StatCard, {
    label: "Net Revenue",
    value: data.rev,
    delta: data.revD,
    caption: 'vs. ' + data.prev,
    accent: true
  }), /*#__PURE__*/React.createElement(C.StatCard, {
    label: "Gross Margin",
    value: data.gm,
    delta: data.gmD,
    caption: 'vs. ' + data.prev
  }), /*#__PURE__*/React.createElement(C.StatCard, {
    label: "Monthly Burn",
    value: data.burn,
    delta: data.burnD,
    deltaProps: {
      invert: true
    },
    caption: "mo/mo"
  }), /*#__PURE__*/React.createElement(C.StatCard, {
    label: "Runway",
    value: data.runway,
    tone: "forest"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(C.Card, {
    pad: "lg",
    elevation: "sm"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 17,
      color: 'var(--ink)',
      margin: 0
    }
  }, "Net revenue trend"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--ink-tertiary)'
    }
  }, "last 6 quarters \xB7 $M")), /*#__PURE__*/React.createElement(C.BarChart, {
    height: 170,
    showValues: true,
    highlightLast: true,
    format: v => '$' + v + 'M',
    data: data.trend
  })), /*#__PURE__*/React.createElement(C.Card, {
    pad: "lg",
    elevation: "sm"
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 17,
      color: 'var(--ink)',
      margin: '0 0 20px'
    }
  }, "Budget vs. actual"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(C.ProgressMeter, {
    label: "Operating budget",
    value: 68,
    target: 100,
    valueText: "68% used"
  }), /*#__PURE__*/React.createElement(C.ProgressMeter, {
    label: "Sales & marketing",
    value: 112,
    target: 100,
    valueText: "112% \xB7 overrun"
  }), /*#__PURE__*/React.createElement(C.ProgressMeter, {
    label: "R&D",
    value: 74,
    target: 100,
    tone: "forest",
    valueText: "74% used"
  }), /*#__PURE__*/React.createElement(C.ProgressMeter, {
    label: "ARR goal",
    value: data.arr,
    target: data.arrT,
    tone: "positive",
    valueText: data.arrPct
  })))), /*#__PURE__*/React.createElement(C.Card, {
    pad: "none",
    elevation: "sm",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 20px',
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 17,
      color: 'var(--ink)',
      margin: 0
    }
  }, "Condensed P&L"), /*#__PURE__*/React.createElement(C.Badge, {
    tone: "info",
    variant: "soft"
  }, "Unaudited")), /*#__PURE__*/React.createElement(C.DataTable, {
    wrap: false,
    columns: [{
      key: 'item',
      header: 'Line item',
      strong: true,
      width: '34%'
    }, {
      key: 'prev',
      header: data.prev,
      numeric: true
    }, {
      key: 'cur',
      header: period,
      numeric: true
    }, {
      key: 'pct',
      header: '% rev',
      align: 'right'
    }, {
      key: 'd',
      header: 'Change',
      align: 'right',
      render: r => /*#__PURE__*/React.createElement(C.DeltaIndicator, {
        value: r.d,
        invert: r.invert
      })
    }],
    rows: data.pnl,
    totals: data.pnlTotal,
    totalsLabel: "Net income"
  })));
}
const DATA = {
  'Q3 2025': {
    prev: 'Q2',
    rev: '$4.82M',
    revD: 23.6,
    gm: '57.4%',
    gmD: 3.1,
    burn: '$310K',
    burnD: -8.2,
    runway: '19 mo',
    arr: 4.2,
    arrT: 5,
    arrPct: '84%',
    trend: [{
      label: 'Q2 24',
      value: 2.9
    }, {
      label: 'Q3 24',
      value: 3.1
    }, {
      label: 'Q4 24',
      value: 3.4
    }, {
      label: 'Q1 25',
      value: 3.9
    }, {
      label: 'Q2 25',
      value: 3.9
    }, {
      label: 'Q3 25',
      value: 4.82
    }],
    pnl: [{
      item: 'Revenue',
      prev: '$3.90M',
      cur: '$4.82M',
      pct: '100%',
      d: 23.6
    }, {
      item: 'Cost of revenue',
      prev: '$1.66M',
      cur: '$2.05M',
      pct: '42.6%',
      d: 23.5,
      invert: true
    }, {
      item: 'Gross profit',
      prev: '$2.24M',
      cur: '$2.77M',
      pct: '57.4%',
      d: 23.7
    }, {
      item: 'Sales & marketing',
      prev: '$0.94M',
      cur: '$1.12M',
      pct: '23.2%',
      d: 19.1,
      invert: true
    }, {
      item: 'Research & dev.',
      prev: '$0.71M',
      cur: '$0.78M',
      pct: '16.2%',
      d: 9.9,
      invert: true
    }, {
      item: 'General & admin.',
      prev: '$0.42M',
      cur: '$0.45M',
      pct: '9.3%',
      d: 7.1,
      invert: true
    }],
    pnlTotal: {
      prev: '$0.17M',
      cur: '$0.42M',
      pct: '8.7%'
    }
  }
};
window.DashContent = DashContent;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/DashContent.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/DashShell.jsx
try { (() => {
/* global React */
// Dashboard — app shell: sidebar + topbar.
const {
  Logo: DLogo,
  Badge: DBadge
} = window.McFarlinCFODesignSystem_e3e0bb;
const NAV = [{
  icon: 'layout-dashboard',
  label: 'Overview'
}, {
  icon: 'trending-up',
  label: 'Revenue'
}, {
  icon: 'wallet',
  label: 'Cash & runway'
}, {
  icon: 'receipt',
  label: 'P&L'
}, {
  icon: 'scale',
  label: 'Balance sheet'
}, {
  icon: 'file-text',
  label: 'Reports'
}];
function DashSidebar({
  active,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flex: '0 0 auto',
      background: 'var(--surface)',
      borderRight: '1px solid var(--line)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 18px',
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement(DLogo, {
    markSrc: "../../assets/mark.svg",
    size: "sm",
    showEyebrow: false
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1
    }
  }, NAV.map(n => {
    const on = n.label === active;
    return /*#__PURE__*/React.createElement("button", {
      key: n.label,
      onClick: () => onSelect && onSelect(n.label),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '9px 12px',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-sans)',
        fontSize: 14.5,
        fontWeight: on ? 600 : 500,
        color: on ? 'var(--forest)' : 'var(--ink-secondary)',
        background: on ? 'var(--forest-wash)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": n.icon,
      style: {
        opacity: on ? 1 : 0.7
      }
    }), n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderTop: '1px solid var(--line)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--forest)',
      color: 'var(--text-on-forest)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 13
    }
  }, "RM"), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, "Robert McFarlin"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--ink-tertiary)'
    }
  }, "Acme Robotics \xB7 CFO"))));
}
function DashTopbar({
  period,
  onPeriod
}) {
  const periods = ['Q3 2025', 'Q2 2025', 'FY 2024'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
      padding: '20px 32px',
      borderBottom: '1px solid var(--line)',
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '-0.02em',
      color: 'var(--ink)',
      margin: 0
    }
  }, "Financial overview"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      color: 'var(--ink-tertiary)',
      margin: '4px 0 0'
    }
  }, "Acme Robotics, Inc. \xB7 prepared by the office of the CFO")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(DBadge, {
    tone: "positive",
    dot: true
  }, "Books closed"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: 'var(--surface)',
      border: '1px solid var(--line-strong)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, periods.map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => onPeriod && onPeriod(p),
    style: {
      border: 'none',
      cursor: 'pointer',
      padding: '8px 14px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      background: p === period ? 'var(--forest)' : 'transparent',
      color: p === period ? 'var(--text-on-forest)' : 'var(--ink-secondary)'
    }
  }, p)))));
}
window.DashSidebar = DashSidebar;
window.DashTopbar = DashTopbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/DashShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* global React */
// Advisory website — hero + credibility strip.
const {
  Button: HButton,
  Badge: HBadge,
  StatCard: HStat
} = window.McFarlinCFODesignSystem_e3e0bb;
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '88px 32px 64px',
      display: 'grid',
      gridTemplateColumns: '1.15fr 0.85fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--moss)'
    }
  }, "Fractional & Interim CFO"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 56,
      lineHeight: 1.04,
      letterSpacing: '-0.025em',
      color: 'var(--ink)',
      margin: '18px 0 20px',
      textWrap: 'balance'
    }
  }, "Senior financial leadership, exactly when you need it."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--ink-secondary)',
      maxWidth: 520,
      margin: '0 0 32px'
    }
  }, "I help founders and boards see their numbers clearly \u2014 turning cash, margin, and forecasts into decisions you can defend."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(HButton, {
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right"
    })
  }, "Book a consultation"), /*#__PURE__*/React.createElement(HButton, {
    size: "lg",
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "file-text"
    })
  }, "View engagement model")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26,
      marginTop: 40,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Fact, {
    k: "18 yrs",
    v: "Operating finance"
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Fact, {
    k: "$1.2B+",
    v: "Capital raised & managed"
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Fact, {
    k: "40+",
    v: "Engagements led"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(HStat, {
    label: "Avg. runway extended",
    value: "+7.4 mo",
    delta: 18.2,
    caption: "across engagements",
    accent: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(HStat, {
    label: "Close cycle",
    value: "5 days",
    delta: -42,
    deltaProps: {
      invert: true
    },
    caption: "from 9"
  }), /*#__PURE__*/React.createElement(HStat, {
    label: "Gross margin",
    value: "+11 pts",
    delta: 11,
    caption: "first year"
  })))));
}
function Fact({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--ink)',
      fontVariantNumeric: 'tabular-nums'
    },
    dangerouslySetInnerHTML: {
      __html: k
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--ink-tertiary)'
    },
    dangerouslySetInnerHTML: {
      __html: v
    }
  }));
}
function Divider() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      alignSelf: 'stretch',
      background: 'var(--line-strong)'
    }
  });
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
/* global React */
// Advisory website — approach steps + results panel (forest feature) + contact.
const {
  Card: RCard,
  Button: RButton,
  Input: RInput,
  BarChart: RBar,
  Badge: RBadge
} = window.McFarlinCFODesignSystem_e3e0bb;
const STEPS = [{
  n: '01',
  t: '30-day diagnostic',
  d: 'A clear read on cash, margin, and reporting health — with the three things to fix first.'
}, {
  n: '02',
  t: 'Prioritized roadmap',
  d: 'A sequenced plan tied to runway and board milestones, owned with your team.'
}, {
  n: '03',
  t: 'Embedded execution',
  d: 'I operate alongside you — close, forecast, and capital work — then hand off cleanly.'
}];
function Approach() {
  return /*#__PURE__*/React.createElement("section", {
    id: "approach",
    style: {
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '88px 32px'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Approach",
    title: "A measured, three-phase engagement"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20,
      marginTop: 40
    }
  }, STEPS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      paddingTop: 22,
      borderTop: '2px solid var(--forest)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--brass-strong)',
      fontWeight: 600
    }
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 20,
      color: 'var(--ink)',
      margin: '10px 0 8px'
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--ink-secondary)',
      margin: 0
    }
  }, s.d))))));
}
function Results() {
  return /*#__PURE__*/React.createElement("section", {
    id: "results",
    style: {
      background: 'var(--forest)',
      color: 'var(--text-on-forest)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '88px 32px',
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Selected results",
    title: "The numbers that mattered",
    light: true
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 17,
      lineHeight: 1.65,
      color: 'rgba(244,241,234,0.78)',
      maxWidth: 460,
      margin: '20px 0 28px'
    }
  }, "A representative Series-B SaaS engagement: rebuilt the operating model, extended runway, and closed the books in days, not weeks."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(RBadge, {
    tone: "brass",
    variant: "solid"
  }, "Series B"), /*#__PURE__*/React.createElement(RBadge, {
    tone: "forest",
    variant: "outline",
    style: {
      color: 'rgba(244,241,234,0.85)',
      borderColor: 'rgba(244,241,234,0.4)'
    }
  }, "14-month engagement"))), /*#__PURE__*/React.createElement(RCard, {
    tone: "surface",
    pad: "lg",
    elevation: "md",
    style: {
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 16,
      color: 'var(--ink)'
    }
  }, "Net revenue by quarter"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--positive)'
    }
  }, "\u25B2 +69% FY")), /*#__PURE__*/React.createElement(RBar, {
    height: 150,
    showValues: true,
    highlightLast: true,
    format: v => '$' + v + 'M',
    data: [{
      label: 'Q1',
      value: 3.2
    }, {
      label: 'Q2',
      value: 3.9
    }, {
      label: 'Q3',
      value: 4.8
    }, {
      label: 'Q4',
      value: 5.4
    }]
  }))));
}
function Contact() {
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      background: 'var(--paper)',
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: '0 auto',
      padding: '88px 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Get in touch",
    title: "Let's look at your numbers together"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--ink-secondary)',
      margin: '18px auto 32px',
      maxWidth: 520
    }
  }, "Tell me a little about your company and where you'd like a sharper view. I reply to every inquiry personally within two business days."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      textAlign: 'left',
      maxWidth: 560,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(RInput, {
    label: "Name",
    placeholder: "Jane Founder"
  }), /*#__PURE__*/React.createElement(RInput, {
    label: "Work email",
    type: "email",
    placeholder: "jane@company.com"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(RInput, {
    label: "Annual revenue",
    prefix: "$",
    numeric: true,
    placeholder: "0"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(RButton, {
    block: true,
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right"
    })
  }, "Request a consultation")))));
}
window.Approach = Approach;
window.Results = Results;
window.Contact = Contact;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
/* global React */
// Advisory website — services grid + approach steps.
const {
  Card: SCard,
  Tag: STag
} = window.McFarlinCFODesignSystem_e3e0bb;
const SERVICES = [{
  icon: 'wallet',
  title: 'Cash & liquidity',
  body: 'Rolling 13-week cash forecasting, working-capital discipline, and covenant headroom you can see weeks ahead.'
}, {
  icon: 'line-chart',
  title: 'FP&A and forecasting',
  body: 'Driver-based models that tie strategy to the P&L — board-ready scenarios, not spreadsheets nobody trusts.'
}, {
  icon: 'handshake',
  title: 'Fundraising & M&A',
  body: 'Data rooms, models, and diligence support that stand up to the sharpest investor questions.'
}, {
  icon: 'gauge',
  title: 'Reporting & controls',
  body: 'A monthly close and KPI cadence that closes faster, reads cleaner, and earns lender confidence.'
}];
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      background: 'var(--surface-muted)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '88px 32px'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Services",
    title: "Where I create leverage"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 20,
      marginTop: 40
    }
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(SCard, {
    key: s.title,
    pad: "lg",
    elevation: "sm"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 44,
      height: 44,
      flex: '0 0 auto',
      borderRadius: 'var(--radius-md)',
      background: 'var(--forest-wash)',
      color: 'var(--forest)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": s.icon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 19,
      color: 'var(--ink)',
      margin: '2px 0 8px'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--ink-secondary)',
      margin: 0
    }
  }, s.body)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 28,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ink-tertiary)',
      marginRight: 6
    }
  }, "Sectors"), ['SaaS', 'Healthcare', 'Manufacturing', 'Consumer', 'Professional services'].map(t => /*#__PURE__*/React.createElement(STag, {
    key: t
  }, t)))));
}
function SectionHead({
  eyebrow,
  title,
  light
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: light ? 'rgba(244,241,234,0.6)' : 'var(--moss)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 38,
      letterSpacing: '-0.02em',
      color: light ? 'var(--text-on-forest)' : 'var(--ink)',
      margin: '14px 0 0',
      textWrap: 'balance'
    }
  }, title));
}
window.Services = Services;
window.SectionHead = SectionHead;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteHeader.jsx
try { (() => {
/* global React */
// Advisory website — top navigation with brand lockup.
const {
  Logo,
  Button
} = window.McFarlinCFODesignSystem_e3e0bb;
function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const links = ['Services', 'Approach', 'Results', 'About'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(251,250,247,0.82)',
      backdropFilter: 'saturate(140%) blur(10px)',
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    markSrc: "../../assets/mark.svg",
    size: "sm"
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 30
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: '#' + l.toLowerCase(),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14.5,
      fontWeight: 500,
      color: 'var(--ink-secondary)',
      textDecoration: 'none'
    }
  }, l)), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    as: "a",
    href: "#contact",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right"
    })
  }, "Book a call"))));
}
window.SiteHeader = SiteHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteHeader.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.DeltaIndicator = __ds_scope.DeltaIndicator;

__ds_ns.ProgressMeter = __ds_scope.ProgressMeter;

__ds_ns.StatCard = __ds_scope.StatCard;

})();
