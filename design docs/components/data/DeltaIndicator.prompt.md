Signed change value with arrow + semantic color. Up green, down red.

```jsx
<DeltaIndicator value={12.4} />                    {/* +12.4% green */}
<DeltaIndicator value={-3.1} />                    {/* −3.1% red */}
<DeltaIndicator value={-2.0} invert />             {/* costs down = green */}
<DeltaIndicator value={48000} format="currency" />
```

Set `invert` for metrics where down is good (costs, churn, DSO). `format`: `percent | currency | plain`. Renders in tabular mono so columns align.
