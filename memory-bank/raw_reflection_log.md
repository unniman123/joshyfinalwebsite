---
Date: 2025-09-21
TaskRef: "Tour detail: preserve multi-line itinerary and wire admin images"

Learnings:
- The UI collapsed multi-line itinerary text because legacy parsing and default paragraph rendering collapsed newlines; adding `whitespace-pre-line` and improving legacy parser preserves text.
- `InteractiveItinerary` should prefer admin `itineraryDays` structured data when available; this avoids fragile legacy parsing.
- Admin-managed `itineraryDays[].images` are the canonical source for day-specific images; `getItineraryImages` should prefer these.

Difficulties:
- Initial parser treated each non-empty line as a separate Day, losing multi-line day descriptions. Fixed by appending subsequent lines to the current day's description.
- Admin view was not showing day images in the side gallery; I initially placed images inline in the admin itinerary which you asked to revert. Fixed by moving image display back to gallery and ensuring admin gallery uses `itineraryDays[].images`.

Successes:
- End-to-end: structured `itineraryDays` now store multi-line descriptions and images; frontend renders them with preserved formatting.
- `ItinerarySection` now passes `structuredItinerary` to `InteractiveItinerary` and `dayImages` to `ItineraryImageGallery`.

Improvements_Identified_For_Consolidation:
- Document admin-side contract: `itineraryDays[].description` (string, allow multi-line), `itineraryDays[].images` (string[]), `itineraryDays[].isActive` (bool), `itineraryDays[].order` (number). Store this in `memory-bank/consolidated_learnings.md` later.

---

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

---
Date: 2025-09-28
TaskRef: "Adjust TourOffersSection: larger oval cards, more visible enquiry form, center desktop overlay"

Learnings:
- The `TourOffersSection` renders oval tour cards using fixed width/height classes; increasing these and the border makes cards more prominent across breakpoints.
- The quick enquiry form (`TourInquiryForm`) uses translucent dark backgrounds; to increase contrast on top of the section background, a semi-opaque light backdrop with `backdrop-blur` and border improves legibility while preserving visual depth.
- Centering the desktop overlay vertically is best done by setting `top: 50%` and `transform: translateY(-50%)` on the absolutely-positioned container.

Difficulties:
- Ensuring the overlay remained responsive without overlapping critical content required aligning the `right` offset (`14rem`) which matches the original design intent for spacing. Need to validate across wide and narrow desktop widths.

Successes:
- Increased oval card sizes and border thickness; hover scrim adjusted for stronger hover shading.
- Desktop enquiry overlay now uses `top: 50%` + `translateY(-50%)` and a clearer backdrop (`bg-white/6` with `backdrop-blur-sm`, `border`, `shadow-2xl`) to make the form stand out.

Improvements_Identified_For_Consolidation:
- Add a CSS token for overlay right offset (e.g., `--offers-overlay-right`) to centralize spacing and make future adjustments easier.
---
Date: 2025-09-28TUTC
TaskRef: "Investigate joined borders on oval tour cards in TourOffersSection"

Learnings:
- The oval tour cards are rendered as `rounded-full` image containers with a relatively large border (`border-4`) and a semi-transparent border color `border-white/40` (see code reference). The grid uses `gap-3` (small gap) which, combined with the thick border, can make borders visually touch. ```startLine:endLine:src/components/TourOffersSection.tsx
176:180:src/components/TourOffersSection.tsx
                        <div className="relative w-32 h-40 sm:w-36 sm:h-44 lg:w-44 lg:h-56 overflow-hidden rounded-full border-4 border-white/40 shadow-card transition-all duration-300 mb-3">
                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-300" />
                      </div>
```

- The container grid is defined with `gap-3` (narrow spacing). Evidence: ```startLine:endLine:src/components/TourOffersSection.tsx
168:172:src/components/TourOffersSection.tsx
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 transition-all duration-300">
                  {getCurrentTours().map((tour) => (
```

- Theme spacing and shadows are defined in `src/index.css`. The card shadow token is `--shadow-card` which the `shadow-card` utility applies; shadow helps separation but may be subtle against the `--offers-bg` panel (see token):
```startLine:endLine:src/index.css
52:56:src/index.css
    --offers-bg: hsl(195 70% 32%);
    --offers-bg-foreground: 0 0% 100%;
...
86:89:src/index.css
    --shadow-card: 0 4px 12px hsl(var(--warm-gray) / 0.15);
```

Difficulties (what makes the seam look joined):
- Thick semi-transparent borders (4px) reduce the visible gap between circles; where gaps are small the borders can visually contact.
- The `gap-3` grid spacing is smaller than the twice-the-border-thickness visual margin needed to clearly separate circles at this size.
- On hover the `scale(1.05)` increases size, which can lead to temporary touching when multiple items are near each other.
- The background behind cards (`--offers-bg`) is a solid color; semi-transparent borders blend into that backdrop and adjacent borders can visually connect.

Hypotheses (ranked):
1. Visual joining caused by insufficient grid gap relative to border width + border transparency (most likely). Evidence: `border-4` + `gap-3` (see references above).
2. Hover scale increases transient overlap when items are adjacent; using group hover scale on grid items exacerbates perceived joining.
3. The border color being semi-transparent (`white/40`) over a darker `--offers-bg` produces a blending seam that looks like borders are continuous.

Recommended fixes (evidence-backed, ordered):
- Quick, low-risk: Increase grid gap to give more separation. Change `gap-3` → `gap-6` (or add `p-1` inside each item) in `TourOffersSection.tsx`. This keeps `border-4` but increases visible gap. Example patch (proposed):
```jsx
// change
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ...">
// to
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ...">
```
- Medium: Reduce border thickness to `border-2` and/or make border fully opaque or slightly darker (`border-white/70`) to avoid blending. This reduces the visual footprint of the stroke.
- Visual separation: add a subtle ring or background between items, e.g., `ring-1 ring-black/10` or increase `shadow-card` intensity (e.g., `shadow-2xl`) to create perceptual depth separation.
- Guard hover overlap: reduce hover scale from `scale-[1.05]` to `scale-105` with a smaller max or use `transform-gpu` and increase gap so scaled items don't touch.

Tests to run after changes:
- Verify at narrow and wide breakpoints (sm, md, lg, xl) and on the active carousel state.
- Check hover state for each card to ensure no touching occurs when scaling.
- Validate contrast of borders (opaque vs semi-transparent) over `--offers-bg` to ensure readability.

Next steps I can take (if you want me to implement):
1. Apply gap increase to `gap-6` and run lints + visual check.
2. Alternatively apply `border-2` + `gap-4` for a balanced look.
3. Add a subtle `ring-1` and increase `shadow-card` on the card to visually separate them.

---
Date: 2025-09-28T23:42:00Z
TaskRef: "Investigate dark appearance inside Quick Enquiry form (TourInquiryForm)"

Objective:
- Determine why the enquiry form appeared darker than intended and document a clear, evidence-backed root cause and remediation steps.

Learnings & Evidence:
- The desktop overlay wrapping the enquiry form provides a semi-opaque light backdrop. Evidence (overlay wrapper in `TourOffersSection.tsx`):
```224:231:src/components/TourOffersSection.tsx
            <div
              className="hidden lg:block absolute z-50"
              style={{
                top: '42%',
                right: '14rem',
                transform: 'translateY(-50%)',
                maxWidth: '28rem'
              }}
            >
```
and its inner panel has a translucent white backdrop token:
```232:242:src/components/TourOffersSection.tsx
              <div className="w-full lg:max-w-xs">
                <div className="px-2">
                  {/* Stronger visual separation: semi-opaque backdrop, larger shadow, and border */}
                  <div className="bg-white/6 backdrop-blur-sm border border-white/10 text-white rounded-xl p-4 shadow-2xl">
```

- The enquiry form component itself previously applied an additional dark gradient background and a stronger box-shadow inside the CardContent which stacked visually with the overlay's backdrop, producing a noticeably darker panel. Current form CardContent (after my edits) shows `background: 'transparent'` but earlier it was a dark gradient. Evidence - current form file (`TourInquiryForm.tsx`):
```73:75:src/components/TourInquiryForm.tsx
  // Add a subtle defined border so the enquiry form reads as a distinct panel
  <Card className="border border-white/12 shadow-none w-full bg-transparent">
  {/* Make inner background transparent to avoid doubling-up dark scrims - parent overlay already provides a subtle backdrop */}
  <CardContent className="px-2 py-2" style={{ background: 'transparent', backdropFilter: 'blur(4px)', boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }}>
```

Root Cause (evidence-based):
- Layering of translucent backgrounds: the desktop overlay (`bg-white/6`) combined with the CardContent dark gradient (originally `linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.18))`) resulted in additive perceived darkness. Two semi-opaque layers — one light (white/6) and one dark gradient — mix and create a muddier, darker visual than intended.
- Strong box-shadow and high blur amount on the inner CardContent increased perceived depth and darkness (boxShadow `'0 8px 24px rgba(0,0,0,0.25)'` was previously present).
- Input and textarea backgrounds use `bg-white/8` which on top of a dark gradient can appear near-black; that makes inner fields read darker.

Actions taken:
- Removed the dark inner gradient and set the `CardContent` background to `transparent` and softened the inner shadow (`0 6px 18px rgba(0,0,0,0.12)`) so the parent overlay controls the overall tonal balance. This reduces double-scrim effect.
- Added a subtle defined border to the `Card` (`border-white/12`) so the form reads as a distinct panel without relying on heavy inner shadow.

Recommended follow-ups (if further tweaks needed):
1. Adjust parent overlay opacity (`bg-white/6`) to `bg-white/8` or `bg-white/10` if the form should appear lighter, or lower to `bg-white/4` if more transparency is desired.
2. Increase input surface opacity from `bg-white/8` to `bg-white/12` or `bg-white/20` for clearer input fields.
3. Introduce a dedicated CSS token `--overlay-strength` used by both overlay and inner content for consistent adjustments.

Verification steps:
- Visual check across breakpoints (lg and xl) to ensure the form no longer appears over-dark.
- Contrast testing on inputs and labels to ensure readability.

---
