---
name: mcfarlin-design
description: Use this skill whenever Robert needs something designed. Generates well-branded interfaces and assets for Robert McFarlin (a sitting CFO and finance-and-data practitioner; primary audience is finance and operations leaders at mid-market manufacturers), either for production or throwaway prototypes/mocks/etc. Triggers on any request to design or create a visual or branded asset: banners, LinkedIn or social graphics, logos, slides and decks, mockups, prototypes, profile or cover images, thumbnails, or production UI. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Brand:** Robert McFarlin, a sitting CFO and finance-and-data practitioner. Audience: finance and operations leaders at mid-market manufacturers. Premium, discreet, senior, evidence-led. Warm, not cold-corporate. (Positioning source of truth: the LinkedIn project's `reference/positioning-and-brand-voice.md` — practitioner, not a sales pitch.)
- **Entry stylesheet:** `styles.css` (links the four token files + fonts). Always link this first.
- **Color:** forest green `#1A3A2E` (single primary), warm neutrals (paper `#FBFAF7`, ink `#1C1B17`), brass `#B0843A` accent (sparing). Semantic warm-toned. Earthy data-viz series. No blue-purple gradients.
- **Type:** Hanken Grotesk (all text) + IBM Plex Mono (eyebrows, labels, figures). Tabular lining figures for all financial numbers. Min on-screen body 16px.
- **Shape:** hairline warm borders over heavy shadows; restrained radii (8px controls, 12px cards); soft warm-tinted shadows.
- **Icons:** Lucide, 1.75px stroke (CDN). Emblem at `assets/mark.svg` / `mark-light.svg`. No emoji.
- **Voice:** sentence case, declarative, number-led, no hype, no dashes as punctuation. First person for Robert, "you" for the reader.

## Components (`window.McFarlinCFODesignSystem_e3e0bb`)
Button · Card · Input · Badge · Tag · Logo · StatCard · DeltaIndicator · DataTable · BarChart · ProgressMeter.
Compose these — don't re-implement them. Each has a `.prompt.md` with usage. See `ui_kits/` for full-screen examples and `slides/` for board-deck patterns.

## Using this in production

The `_ds_bundle.js` runtime only exists inside the design tool. In a real codebase, treat this skill as the **source of truth** and port it in — the tokens and component source are written to be lifted directly.

### 1 · Tokens (start here — works in any stack)
`styles.css` is plain CSS custom properties with no build step. Drop the four token files in and link `styles.css`, or paste `:root { … }` into your global stylesheet. Everything downstream references these vars, so this alone gets you 80% on-brand.

- **Plain CSS / CSS Modules:** link `styles.css`; use `var(--forest)`, `var(--space-6)`, `var(--radius-lg)`, etc.
- **Tailwind:** map the tokens in `tailwind.config.js` so utilities stay on-brand:
  ```js
  // tailwind.config.js
  theme: {
    extend: {
      colors: { forest: '#1A3A2E', moss: '#2F5D50', brass: '#B0843A',
                paper: '#FBFAF7', ink: '#1C1B17', positive: '#2F6E4E', negative: '#B23A33' },
      fontFamily: { sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
                    mono: ['"IBM Plex Mono"', 'monospace'] },
      borderRadius: { md: '8px', lg: '12px', xl: '16px' },
      boxShadow: { sm: '0 1px 2px rgba(28,27,23,.06)', md: '0 2px 8px rgba(28,27,23,.07)' },
    }
  }
  ```
  Prefer referencing `var(--token)` in the config (single source of truth) over hardcoding hex twice. Always enable tabular figures on financial numbers: `font-variant-numeric: tabular-nums lining-nums` (Tailwind: `tabular-nums`).

### 2 · Components
The files in `components/**` are dependency-free React (import React only; styling via the CSS vars above). To use them in production:
- **React / Next.js:** copy the `.jsx` into your repo (rename to `.tsx` and keep the sibling `.d.ts` for types). They have no external deps beyond React. Ensure `styles.css` (or the token vars) is loaded globally. Components that inject a `<style>` tag (Button, Input, DataTable) are SSR-safe — the inject guards on `typeof document`.
- **Other frameworks (Vue/Svelte/server templates):** don't port the JSX — re-implement from the `.prompt.md` + `.d.ts` contract, copying the exact class/var usage. The components are thin, so this is fast.

### 3 · Fonts
Dev/prototype: keep the Google Fonts `@import` in `fonts/fonts.css`. Production: self-host **Hanken Grotesk** + **IBM Plex Mono** (both OFL) as `.woff2`, replace the `@import` with local `@font-face` rules, and `preload` the primary weights. Ask the user for licensed brand fonts before shipping if they have them.

### 4 · Icons & assets
Icons are [Lucide](https://lucide.dev) — in production install `lucide-react` (`npm i lucide-react`) and use `import { TrendingUp } from 'lucide-react'` at 1.75 stroke, rather than the CDN `<i data-lucide>` shim used in the prototypes. Copy `assets/mark.svg` / `mark-light.svg` into your public assets; pass the path to `<Logo markSrc=… />`.

### Rule of thumb
Tokens are portable and authoritative — always wire those in first. Components are a reference implementation: copy them verbatim in React, or rebuild from their contracts elsewhere. Never hardcode a hex, size, or radius that already exists as a token.
