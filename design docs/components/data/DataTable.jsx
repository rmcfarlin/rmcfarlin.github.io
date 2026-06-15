import React from 'react';

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
export function DataTable({
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
  const cellCls = (c) => `${(c.numeric || c.align === 'right') ? 'rm-td--num' : ''}${c.strong ? ' rm-td--strong' : ''}`.trim();
  const headCls = (c) => (c.numeric || c.align === 'right') ? 'rm-th--num' : '';

  const table = (
    <table className={cls} style={style} {...rest}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} className={headCls(c)} style={c.width ? { width: c.width } : undefined}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.id != null ? row.id : i}>
            {columns.map((c) => (
              <td key={c.key} className={cellCls(c)}>
                {c.render ? c.render(row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {totals && (
        <tfoot>
          <tr>
            {columns.map((c, idx) => {
              const isNum = c.numeric || c.align === 'right';
              const content = idx === 0 && totals[c.key] == null ? totalsLabel : totals[c.key];
              return <td key={c.key} className={isNum ? 'rm-td--num' : ''}>{content}</td>;
            })}
          </tr>
        </tfoot>
      )}
    </table>
  );

  return wrap ? <div className="rm-table__wrap">{table}</div> : table;
}
