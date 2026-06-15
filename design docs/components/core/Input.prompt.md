Text and number field. Renders a full field group when given `label`/`hint`/`error`, or a bare input otherwise.

```jsx
<Input label="Work email" type="email" placeholder="you@company.com" />
<Input label="Annual revenue" prefix="$" numeric placeholder="0" />
<Input label="Target margin" suffix="%" numeric />
<Input label="Company" error="This field is required" />
```

Use `numeric` for money/amounts (right-aligned tabular figures). `prefix`/`suffix` add currency or unit affixes. `error` switches the field to the invalid state.
