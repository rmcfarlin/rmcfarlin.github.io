Dependency-free CSS column chart for period trends.

```jsx
<BarChart
  data={[
    { label: 'Q1', value: 3.2 },
    { label: 'Q2', value: 3.9 },
    { label: 'Q3', value: 4.8 },
    { label: 'Q4', value: 5.4 },
  ]}
  showValues
  highlightLast
  format={(v) => `$${v}M`}
/>
```

One vertical series. `highlightLast` tints the current period brass; set per-bar `tone` for categorical coloring with viz tokens. Pair with a StatCard for headline + trend.
