Headline KPI block — the workhorse metric for dashboards, board decks, and one-pagers.

```jsx
<StatCard label="Net Revenue" value="$4.82M" delta={12.4} caption="vs. prior quarter" />
<StatCard label="Burn Rate" value="$310K" delta={-8.2} deltaProps={{ invert: true }} caption="mo. over mo." />
<StatCard label="Runway" value="19 mo" tone="forest" accent />
```

Pass a pre-formatted `value` string. `delta` adds a DeltaIndicator (forward `deltaProps={{ invert: true }}` for cost-type metrics). `tone="forest"` for a dark feature stat; `accent` adds a brass top rule.
