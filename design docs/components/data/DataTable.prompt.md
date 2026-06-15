Financial data table — tabular figures, right-aligned numeric columns, optional totals footer.

```jsx
<DataTable
  columns={[
    { key: 'item', header: 'Line item', strong: true, width: '45%' },
    { key: 'q2', header: 'Q2', numeric: true },
    { key: 'q3', header: 'Q3', numeric: true },
    { key: 'delta', header: 'Δ', align: 'right', render: (r) => <DeltaIndicator value={r.delta} /> },
  ]}
  rows={[
    { item: 'Revenue', q2: '$3.9M', q3: '$4.8M', delta: 23.1 },
    { item: 'COGS', q2: '$1.4M', q3: '$1.6M', delta: 14.3 },
  ]}
  totals={{ item: 'Gross profit', q2: '$2.5M', q3: '$3.2M' }}
  zebra
/>
```

Define columns with `numeric` (right-aligned tabular mono), `strong` (label emphasis), or a custom `render`. `totals` renders a bold footer row.
