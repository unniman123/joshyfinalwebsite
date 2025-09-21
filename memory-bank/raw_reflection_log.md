---
Date: 2025-09-16T09:12:00Z
TaskRef: "Homepage design audit — implementation notes"

Implementation Notes (small, actionable edits):
- Add `--image-scrim` token to `:root` in `src/index.css` (HSL with alpha) and `dark` theme variant. Example: `--image-scrim: linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.6) 100%);` Then update image wrappers to include `background-image: var(--image-scrim), url(...)` or an overlay div using `background: var(--image-scrim);`.
- Standardize primary CTA to `--button-primary-bg` and `--button-primary-foreground` tokens. Map the orange circular CTA color from screenshot to `--button-primary-bg` (HSL estimate: 28 100% 47% — adjust to match brand). Update HeroBanner button to use `bg-[var(--button-primary-bg)]`.
- Improve search overlay contrast: change `bg-black/30` to `bg-black/45` or prefer `bg-[rgba(0,0,0,0.45)]` for small text; add `backdrop-blur-sm` as in current design.
- Ensure all interactive icons have `aria-label` and `role=button` where appropriate (carousel arrows already have `aria-label`; ensure slide indicators and circular CTAs do too).

Small CSS snippet suggestion (for developer implementation):
```css
:root {
  --image-scrim: linear-gradient(180deg, rgba(0,0,0,0) 10%, rgba(0,0,0,0.55) 100%);
  --button-primary-bg: 28 100% 47%; /* HSL values stored as separate tokens in project pattern */
  --button-primary-foreground: 210 40% 98%;
}
.card-image::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--image-scrim);
  pointer-events: none;
}
```

Testing Notes:
- After applying scrim, run contrast checks on headline (should be >= 4.5:1) and metadata text (>= 3:1 for larger text). Use Lighthouse or axe-core.
- Check button hit sizes on mobile (should be at least 44x44 CSS pixels). Use devtools-device toolbar for emulation.

---

### Latest Entries

- Date: 2025-09-20
  TaskRef: "Redesign AboutUs section to match supplied marketing panel image"

  Learnings:
  - The site uses Tailwind with CSS variables for theme tokens located in `src/index.css` and mapped in `tailwind.config.ts`.
  - Homepage sections are admin-controllable via `src/components/AdminHomepageProvider.tsx` and `src/lib/admin-utils.ts` with `HomepageAdminConfig` and transform utilities.
  - Existing `AboutUsSection.tsx` used a small image (15%) + large text area; target design requires a 50/50 split with full-bleed image and magenta content panel.
  - Color tokens follow HSL numeric triplet pattern; introduced `--promo-magenta` and Tailwind `promo.magenta` to align with design.
  - Routing uses `react-router-dom` and homepage is `src/pages/Index.tsx`; CTA uses standard link to `/contact`.

  Difficulties:
  - Original `AboutUsSection` used custom tokens like `namaste` and helper classes `extend-right` making direct replacement slightly intrusive; preserved site tokens and added new promo token instead of modifying namaste.
  - Need to ensure accessibility (contrast and focus) when using magenta; added focus ring and semantic region/heading.

  Successes:
  - Implemented 50/50 layout with imported image asset and magenta content panel matching supplied composition.
  - Added new CSS variable `--promo-magenta`, exposed to Tailwind, and consumed in `AboutUsSection` as `bg-promo-magenta`.
  - Added unit test `AboutUsSection.test.tsx` to validate render of key elements.

  Improvements_Identified_For_Consolidation:
  - Consider wiring AboutUs panel to `HomepageAdminConfig` (hero/tourOffers pattern) for runtime editing.
  - Add fine-grain responsive typography and exact corner radius to match source image; currently uses Tailwind radius tokens.
  - Add visual QA across breakpoints and color contrast verification tools.
