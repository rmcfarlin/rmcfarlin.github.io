Robert McFarlin brand lockup — use anywhere the brand identity appears (site header, deck title, report masthead, email signature).

```jsx
<Logo markSrc="assets/mark.svg" size="md" />
<Logo variant="mark" markSrc="assets/mark.svg" />
<Logo tone="light" markSrc="assets/mark-light.svg" />   /* on forest background */
```

Variants: `full` (mark + wordmark), `wordmark` (text only), `mark` (emblem only). Use `tone="light"` + `mark-light.svg` on dark/forest surfaces. `showEyebrow={false}` for compact placements.
