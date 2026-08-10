# Financial Reporting Dashboard — UI kit

An internal CFO reporting view for a portfolio/operating company. It is the data-dense counterpart to the marketing site and shows the system's financial primitives working together.

## Screens / parts
- `DashShell.jsx` — `DashSidebar` (brand mark + icon nav + user) and `DashTopbar` (page title, "books closed" status, period switcher).
- `DashContent.jsx` — the overview body: a four-up `StatCard` KPI row, a `BarChart` revenue-trend panel, a stack of `ProgressMeter` budget-vs-actual bars, and a condensed P&L built from `DataTable` + `DeltaIndicator`.

## Interactions
- Sidebar nav items and the period switcher (`Q3 2025 / Q2 2025 / FY 2024`) are click-selectable. Only `Q3 2025` carries a full data set in this specimen.

## How it's built
- Pulls every primitive from `window.McFarlinCFODesignSystem_e3e0bb` (StatCard, BarChart, ProgressMeter, DataTable, DeltaIndicator, Card, Badge, Logo).
- Icons: Lucide via CDN, 1.75px stroke.
- Loads `../../styles.css` and `../../_ds_bundle.js`.

## Notes
Figures are illustrative. Cost-type rows use `DeltaIndicator invert` so a rise reads red and a fall reads green.
