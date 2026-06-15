Horizontal meter for budget-vs-actual, goal attainment, and allocation.

```jsx
<ProgressMeter label="FY budget used" value={68} target={100} />
<ProgressMeter label="Marketing spend" value={112} target={100} valueText="112% · $560K" />
<ProgressMeter label="ARR goal" value={4.2} target={5} tone="positive" />
```

Automatically turns red when `value/target` exceeds `overAt` (default 1.0) — ideal for flagging overruns. Provide `valueText` to show an absolute amount instead of percent.
