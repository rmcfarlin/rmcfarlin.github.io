# Robert McFarlin — Design System

A brand and design system for **Robert McFarlin** — a sitting CFO and finance-and-data practitioner who writes for finance and operations leaders at mid-market manufacturers. Every artifact this system produces has one job: **demonstrate deep financial command and earn trust at first glance.** The visual system below (forest/brass, Hanken Grotesk + IBM Plex Mono) stands; the audience and voice are practitioner, not sales. Positioning source of truth: the LinkedIn project's `reference/positioning-and-brand-voice.md`.

> This is a from-scratch brand. There was no attached codebase, Figma file, or prior brand guide — the identity below was created for this engagement. See **Caveats** for substitutions to confirm.

---

## 1 · Brand context

- **Who:** Robert McFarlin, a sitting CFO who builds his own analytics. Audience = finance and operations leaders (CFO, controller, VP Ops, owner-operator) at sub-$500M manufacturers.
- **Promise:** practitioner lessons on what finance-and-data actually looks like inside a mid-market plant, and why most attempts fail. Not a sales pitch.
- **Primary deliverables:** LinkedIn banners and social graphics, reporting dashboards, board/deck specimens, and one-pagers. Some templates here carry advisory sample copy ("Book a consultation," founders/boards); treat that as illustrative, not Robert's current public posture.
- **Positioning words (visual tone):** *premium, discreet, senior, evidence-led.* Warm and approachable. **Not** cold-corporate navy.

---

## 2 · Content fundamentals (voice & copy)

**Vibe:** the calm, precise senior advisor in the room. Says the number, then the implication, then stops. Trust is earned by what is *left out*.

- **Person & address:** First person singular for Robert's own voice ("I help founders…", "I reply to every inquiry personally"). Use **"you / your"** for the reader. Use **"we"** only inside board/deck context where Robert is part of the leadership team.
- **Tone:** declarative and unhurried. Short sentences. No hype, no exclamation marks, no growth-hacking verbs ("crush", "supercharge", "unlock 10×"). Prefer "extend runway", "expand margin", "close faster".
- **Casing:** Sentence case for headlines and buttons ("Book a consultation", not "Book A Consultation"). Eyebrows and data labels are **UPPERCASE mono, letter-spaced**.
- **Numbers are the rhetoric.** Lead with a figure and its comparison ("+11 pts gross margin, first year"; "Close cycle 5 days, from 9"). Always pair a number with its period or baseline.
- **Hedging & integrity:** label estimates ("illustrative", "unaudited", "representative engagement"). Never overclaim. Discretion is a feature.
- **Emoji:** none. Ever. Not on brand.
- **Examples**
  - Headline: *"Disciplined growth, with runway to spare."*
  - Sub: *"A read on revenue, margin, and cash — and the three decisions in front of us this quarter."*
  - CTA: *"Book a consultation"* · *"Request an engagement"* · *"View engagement model"*
  - Microcopy: *"I reply to every inquiry personally within two business days."*

---

## 3 · Visual foundations

**Overall:** warm, quiet, and confident. Generous whitespace, hairline borders, a single deep brand color, and numbers set in mono so columns align. The opposite of a busy fintech dashboard.

- **Color** — warm advisory palette (see `tokens/colors.css`):
  - **Forest green `#1A3A2E`** is the single brand primary (buttons, headers, feature panels, primary chart series). `forest-strong` for hover/press, `moss #2F5D50` for links and secondary green.
  - **Warm neutrals**, not grey: paper `#FBFAF7`, sunken `#F4F2EC`, ink `#1C1B17` (warm near-black). Borders are warm taupe (`#E5E1D8` / `#D4CFC2`).
  - **Brass `#B0843A`** is the accent — used *sparingly* (a single CTA, a top accent rule, the current bar in a chart, a deck recommendation highlight). Never as a flood.
  - **Semantic** colors are warm-toned: positive `#2F6E4E`, negative `#B23A33` (brick, not neon red), caution `#C08A2E`, info `#3E6E73`. Each has a soft wash for backgrounds/badges.
  - **Data-viz** series are earthy: forest → moss → brass → teal → sage → clay. No blue-purple gradients.
- **Typography** (`tokens/typography.css`): all sans-serif. **Hanken Grotesk** for everything (display via 700 + tight tracking, body via 400/regular). **IBM Plex Mono** for eyebrows, data labels, and figures. Financial numbers always use **tabular lining figures** so they align in columns. Type scale runs 64 → 13px; min on-screen body is 16px.
- **Spacing & layout** (`tokens/spacing.css`): 4px base grid. Content max-width 1200px; reading measure ~760px. Sections breathe (96–128px vertical rhythm on the website).
- **Backgrounds:** flat warm color only — `paper` for most surfaces, `surface-muted`/`sunken` to separate sections, `forest` for one feature panel per view. **No photographic hero, no gradient mesh, no texture.** Imagery, when added, should be warm and restrained (see Caveats — none shipped yet).
- **Corner radii** (`tokens/elevation.css`): restrained — 8px (`md`) is the default control radius, 12px (`lg`) for cards, pill only for badges/meters. Premium = squarer.
- **Borders:** 1px hairline in warm taupe is the primary separator. The system leans on **borders over heavy shadows.**
- **Shadows:** soft and warm-tinted (rgba of the ink), never grey or harsh. `xs`/`sm` on cards; `md`/`lg` reserved for overlays and feature panels.
- **Cards:** white surface + 1px `--line` border + `--shadow-sm`, 12px radius. A `forest` tone variant inverts to dark with light text for emphasis.
- **Animation:** subtle and functional. 120–320ms, ease-out. Bars grow in, meters fill, buttons shift background on hover and nudge 0.5px on press. **No bounce, no parallax, no looping decoration.**
- **Hover / press:** buttons darken (forest → forest-strong); secondary buttons warm their fill and border; ghost buttons get a forest wash. Inputs show a moss border + soft focus ring (`--shadow-focus`). Table rows wash forest on hover.
- **Transparency / blur:** used once — the sticky site header is translucent paper with a backdrop blur. Otherwise surfaces are opaque.
- **Focus:** visible 3px mossy focus ring on all interactive elements (`--shadow-focus`).

---

## 4 · Iconography

- **System:** [Lucide](https://lucide.dev) — thin, consistent **1.75px stroke** line icons. Their restraint and even weight match the premium, quiet tone; the rounded line terminals keep it warm rather than clinical.
- **Delivery:** loaded from CDN (`unpkg.com/lucide`) in the UI kits and rendered via `<i data-lucide="…"></i>` + `lucide.createIcons({ attrs: { 'stroke-width': 1.75 } })`. No icon font or sprite is bundled.
- **Common glyphs:** `trending-up`, `line-chart`, `wallet`, `gauge`, `receipt`, `scale`, `file-text`, `layout-dashboard`, `arrow-right`, `handshake`.
- **Brand mark:** `assets/mark.svg` (forest) and `assets/mark-light.svg` (cream, for dark surfaces) — a hairline square enclosing an ascending line with a brass terminal dot (precision + growth). It is **not** a Lucide icon; it's the identity.
- **Directional data marks:** `▲` / `▼` (used inside `DeltaIndicator`) — the only Unicode glyphs used as iconography.
- **Emoji:** never used.
- **Rule:** do not hand-draw new SVG icons or use emoji as icons. Use Lucide; if a needed glyph is missing, pick the closest Lucide name and note it.

---

## 5 · Index / manifest

**Root**
- `styles.css` — the single entry stylesheet (import list only). Consumers link this.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter for use in Claude Code.

**Tokens** (`tokens/`, all `@import`ed by `styles.css`)
- `colors.css` · `typography.css` · `spacing.css` · `elevation.css`
- `fonts/fonts.css` — webfont loading (Google Fonts CDN — see Caveats).

**Assets** (`assets/`)
- `mark.svg`, `mark-light.svg` — brand emblem (dark / light).

**Components** (`window.McFarlinCFODesignSystem_e3e0bb`)
- `components/brand/` — **Logo**
- `components/core/` — **Button, Card, Input, Badge, Tag**
- `components/data/` — **StatCard, DeltaIndicator, DataTable, BarChart, ProgressMeter**

**UI kits** (`ui_kits/`)
- `website/` — advisory landing page (hero, services, approach, results, contact).
- `dashboard/` — CFO financial reporting dashboard (KPIs, trend, budget meters, P&L).

**Slides** (`slides/`)
- Board-deck specimens: `01-title`, `02-metrics`, `03-pnl`, `04-closing`.

**Foundation cards** (`guidelines/`) — color, type, spacing/elevation, and brand-voice specimens shown in the Design System tab.

---

## 6 · Caveats / to confirm

- **Fonts are loaded via Google Fonts CDN**, not self-hosted binaries (the build environment can't fetch font files). Hanken Grotesk + IBM Plex Mono were chosen as premium, neutral sans matches for the brief. If you have licensed brand fonts, send them and I'll self-host with proper `@font-face`.
- **No real photography or logo files** were provided. The emblem is an original geometric mark; please confirm or share an existing logo. No portrait/headshot or client logos are included.
- **All figures are illustrative** (Acme Robotics is a stand-in company). Swap in real engagement data before any client-facing use.
- **Icons are Lucide via CDN** — a substitution chosen for fit, not an existing brand set.
