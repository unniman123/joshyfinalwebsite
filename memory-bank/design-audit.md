### Homepage Design Audit & Redesign Plan

Objective
- Produce an evidence-based audit of the current homepage (coloring, patterns, button design, component styling) and present a prioritized, implementable redesign plan that maps to the codebase (`src/index.css`, `tailwind.config.ts`, `src/components/*`).

Evidence summary (what I inspected)
- Visual screenshots you provided (event grid with deep teal background; plan-your-trip section; hero carousel + search card).
- Code: `src/index.css` (design tokens, utilities), `tailwind.config.ts` (theme mapping), `src/components/HeroBanner.tsx` (carousel, overlay, search button), `src/components/Header.tsx` (top bar, nav styles).

Key findings (evidence-based)
- Centralized tokens exist: `:root` in `src/index.css` exposes many HSL tokens (`--golden`, `--accent`, `--warm-red`, `--background`, `--foreground`, etc.). This is a strong foundation for consistency.
- Visual mismatch: screenshots show strong teal/green full-bleed areas and a bright orange circular CTA; the token names (`--golden`, `--accent`) appear golden/yellow in CSS but the screenshots use teal/orange as visible CTAs — evidence of token drift or inconsistent token usage across components.
- Image readability: hero uses a single overlay `bg-black/30` (see `HeroBanner.tsx`). For some photos and smaller metadata text, this is insufficient for reliable AA contrast.
- Button inconsistency: multiple CTA shapes and sizes (circular orange CTA, pill search button, icon circles on slides) with inconsistent usage of token variables (`--accent`, `--golden`, etc.). Search button uses `bg-[var(--accent)]` in code but visual CTAs are orange — mapping mismatch.
- Good utilities: available utilities for motion and hover (`.btn-subtle-anim`, `.card-hover-lift`, extend-left/right) can be leveraged to create consistent interactions.

Design patterns & components observed
- Hero: large photographic carousel with semi-transparent dark overlay, centered search card using `bg-white/95`, rounded search input and CTA button.
- Event cards: full-bleed images, small white text and badges, metadata inline above headline; rely on image contrast and small drop-shadows.
- Section backgrounds: large colored panels (teal) using full-bleed and extended background utilities to create visual segmentation.
- Buttons: implemented via `Button` component (shadcn-like) but variant usage is inconsistent; `Button` receives `className` overrides (e.g., `bg-[var(--accent)]`).

Problems & accessibility risks (concrete)
- Contrast risk: image copy and small metadata over photos may fall below WCAG 2.1 AA thresholds. Single overlay `bg-black/30` is not deterministic.
- Token confusion: multiple overlapping tokens can cause accidental color drift. Designers/developers may use `--accent`, `--golden`, `--primary` interchangeably.
- CTA discoverability: inconsistent shapes/weights reduce scannability and trust for CTAs.
- Touch target & focus: some icon-only controls appear small and focus styles are subtle; mobile hit-area minimum (44x44) may be violated.

Recommendations (prioritized)
- 1 — Canonicalize tokens (high impact, low effort)
  - Select a canonical mapping and document it in `src/index.css` and `memory-bank/consolidated_learnings.md`:
    - `--color-primary` (brand action color) — map to the orange CTA from screenshots.
    - `--color-accent` (supporting decorative accents) — map to golden/yellow.
    - `--color-cta-alt` (teal/green used for event sections) — map to the teal used in event header background.
    - Keep `--golden` for decorative accents only.
  - Add explicit button tokens: `--button-primary-bg`, `--button-primary-foreground`, `--button-secondary-bg`, etc.

- 2 — Create a button system and implement variants (primary, secondary, ghost, icon)
  - Update `components/ui/button.tsx` to include `size` `'icon'` and explicit variants as recommended by shadcn docs. Add CSS token bindings for background/foreground.
  - Enforce min-height / hit area: `h-10` or `min-h:44px` for tappable buttons.

- 3 — Standardize image overlay scrim
  - Add `--image-scrim` token to `:root` in `src/index.css` (linear-gradient with alpha stops) and apply to hero and card images; implement as an overlay pseudo-element or layered `background-image` for predictable text contrast.

- 4 — Map CTAs across site and update components
  - Replace ad-hoc `bg-[var(--accent)]` and `bg-red-800` with `bg-[color:var(--button-primary-bg)]` (or Tailwind mapping) to ensure consistent CTA color across the site.

- 5 — Accessibility & QA pass
  - Run automated checks (axe, Lighthouse). Fix failing contrast issues and ensure focus states are visible.
  - Add keyboard navigation and ARIA labels for non-text controls (carousel arrows have aria but indicators and some CTAs need labels).

Practical code-level tasks (short actionable steps)
- Add tokens to `src/index.css` :
  - `--image-scrim`, `--button-primary-bg`, `--button-primary-foreground`, `--button-focus-ring`.
- Update `tailwind.config.ts` mapping to include these tokens as colors (so classes like `bg-button-primary` or `text-button-primary-foreground` work).
- Update `components/ui/button.tsx` to define `primary`, `secondary`, `ghost`, `icon` variants and include `size: { icon: 'h-10 w-10' }`.
- Update `src/components/HeroBanner.tsx`:
  - Replace `bg-black/30` with the new scrim overlay (e.g., `bg-[linear-gradient(...)]` or overlay div using `var(--image-scrim)`).
  - Make search CTA use `bg-[color:var(--button-primary-bg)]`.
- Update card components (e.g., `TourCard`, `DestinationCard`) to include a `.card-image::after` overlay using `--image-scrim`, and ensure headline uses a text color token like `--card-foreground`.

Testing checklist (QA)
- Color contrast: all headlines >= 4.5:1 when over images (or use larger text thresholds where applicable).
- Button hit area: all buttons at least 44x44 CSS pixels on mobile.
- Keyboard: all interactive elements reachable and visible focus state present.
- Screen reader: important CTAs have descriptive aria-labels.
- Visual regression: run before/after snapshots for hero and event sections.

Implementation timeline (suggested minimal milestones)
- Day 0–1: Add new tokens (`--image-scrim`, button tokens) and Tailwind mapping.
- Day 1–2: Implement button variants in `components/ui/button.tsx` and update HeroBanner to use tokens and scrim.
- Day 2–3: Update card components to use overlay; run accessibility tests and fix issues.
- Day 3–4: Sweep for token drift across components and update occurrences; run visual regression.

Deliverables I will produce if you want me to continue
- Pull-request-ready edits for the token additions in `src/index.css` and `tailwind.config.ts`.
- Updated `components/ui/button.tsx` with variants and sizes (including `icon`).
- Component edits for `HeroBanner.tsx` (scrim + tokenized CTA) and one representative `TourCard` component as pattern.
- Automated test suggestions (axe config, simple Cypress/E2E test spec for hero and CTA keyboard flows).

If you want me to start implementing, I will:
- Create PR edits for tokens + tailwind mapping, then update `components/ui/button.tsx`, then update `HeroBanner.tsx` and card component in that order.

---

