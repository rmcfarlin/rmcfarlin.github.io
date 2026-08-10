/* global React */
// Dashboard — main content: KPI row, revenue + meters, P&L table.
const C = window.McFarlinCFODesignSystem_e3e0bb;

function DashContent({ period }) {
  const data = DATA[period] || DATA['Q3 2025'];
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <C.StatCard label="Net Revenue" value={data.rev} delta={data.revD} caption={'vs. ' + data.prev} accent />
        <C.StatCard label="Gross Margin" value={data.gm} delta={data.gmD} caption={'vs. ' + data.prev} />
        <C.StatCard label="Monthly Burn" value={data.burn} delta={data.burnD} deltaProps={{ invert: true }} caption="mo/mo" />
        <C.StatCard label="Runway" value={data.runway} tone="forest" />
      </div>

      {/* Revenue + meters */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        <C.Card pad="lg" elevation="sm">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 17, color: 'var(--ink)', margin: 0 }}>Net revenue trend</h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-tertiary)' }}>last 6 quarters · $M</span>
          </div>
          <C.BarChart height={170} showValues highlightLast format={(v) => '$' + v + 'M'} data={data.trend} />
        </C.Card>
        <C.Card pad="lg" elevation="sm">
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 17, color: 'var(--ink)', margin: '0 0 20px' }}>Budget vs. actual</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <C.ProgressMeter label="Operating budget" value={68} target={100} valueText="68% used" />
            <C.ProgressMeter label="Sales & marketing" value={112} target={100} valueText="112% · overrun" />
            <C.ProgressMeter label="R&D" value={74} target={100} tone="forest" valueText="74% used" />
            <C.ProgressMeter label="ARR goal" value={data.arr} target={data.arrT} tone="positive" valueText={data.arrPct} />
          </div>
        </C.Card>
      </div>

      {/* P&L table */}
      <C.Card pad="none" elevation="sm" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid var(--line)' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 17, color: 'var(--ink)', margin: 0 }}>Condensed P&amp;L</h2>
          <C.Badge tone="info" variant="soft">Unaudited</C.Badge>
        </div>
        <C.DataTable
          wrap={false}
          columns={[
            { key: 'item', header: 'Line item', strong: true, width: '34%' },
            { key: 'prev', header: data.prev, numeric: true },
            { key: 'cur', header: period, numeric: true },
            { key: 'pct', header: '% rev', align: 'right' },
            { key: 'd', header: 'Change', align: 'right', render: (r) => <C.DeltaIndicator value={r.d} invert={r.invert} /> },
          ]}
          rows={data.pnl}
          totals={data.pnlTotal}
          totalsLabel="Net income"
        />
      </C.Card>
    </div>
  );
}

const DATA = {
  'Q3 2025': {
    prev: 'Q2', rev: '$4.82M', revD: 23.6, gm: '57.4%', gmD: 3.1, burn: '$310K', burnD: -8.2, runway: '19 mo',
    arr: 4.2, arrT: 5, arrPct: '84%',
    trend: [ { label: 'Q2 24', value: 2.9 }, { label: 'Q3 24', value: 3.1 }, { label: 'Q4 24', value: 3.4 }, { label: 'Q1 25', value: 3.9 }, { label: 'Q2 25', value: 3.9 }, { label: 'Q3 25', value: 4.82 } ],
    pnl: [
      { item: 'Revenue', prev: '$3.90M', cur: '$4.82M', pct: '100%', d: 23.6 },
      { item: 'Cost of revenue', prev: '$1.66M', cur: '$2.05M', pct: '42.6%', d: 23.5, invert: true },
      { item: 'Gross profit', prev: '$2.24M', cur: '$2.77M', pct: '57.4%', d: 23.7 },
      { item: 'Sales & marketing', prev: '$0.94M', cur: '$1.12M', pct: '23.2%', d: 19.1, invert: true },
      { item: 'Research & dev.', prev: '$0.71M', cur: '$0.78M', pct: '16.2%', d: 9.9, invert: true },
      { item: 'General & admin.', prev: '$0.42M', cur: '$0.45M', pct: '9.3%', d: 7.1, invert: true },
    ],
    pnlTotal: { prev: '$0.17M', cur: '$0.42M', pct: '8.7%' },
  },
};
window.DashContent = DashContent;
