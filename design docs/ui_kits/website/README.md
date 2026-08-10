# Advisory Website — UI kit

A single-page marketing site for **Robert McFarlin, Fractional CFO**. It is the flagship surface for the brand: it has to read as senior, discreet, and evidence-led within the first screen.

## Screens / sections
- `SiteHeader.jsx` — sticky translucent nav with the brand `Logo` and a primary CTA.
- `Hero.jsx` — headline + sub, dual CTAs, a credibility fact strip, and a stack of `StatCard`s as proof.
- `Services.jsx` — 2×2 service grid (icon tiles), sector `Tag`s, and the shared `SectionHead`.
- `Sections.jsx` — `Approach` (three numbered phases), `Results` (forest feature panel with a `BarChart`), and `Contact` (form built from `Input` + `Button`).
- `index.html` — composes everything, adds the dark `SiteFooter`, and initializes Lucide icons.

## How it's built
- Composes design-system primitives from `window.McFarlinCFODesignSystem_e3e0bb` (Button, Card, Input, Badge, Tag, Logo, StatCard, BarChart) — it does **not** re-implement them.
- Icons: [Lucide](https://lucide.dev) via CDN, 1.75px stroke. `lucide.createIcons()` runs after mount.
- Loads `../../styles.css` and `../../_ds_bundle.js` (the compiled bundle, generated automatically).

## Notes
This is a recreation/specimen, not production code — the contact form is non-functional and figures are illustrative.
