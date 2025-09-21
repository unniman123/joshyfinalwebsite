## Itinerary & Admin Data Contract

- **Pattern:** Prefer structured `itineraryDays[]` for all itinerary rendering and editing in the admin panel.
- **Fields:**
  - `id`: string
  - `dayNumber`: number (1-based)
  - `title`: string
  - `description`: string (multi-line allowed; frontend renders with `whitespace-pre-line`)
  - `images`: string[] (URLs; first image used as representative day image)
  - `isActive`: boolean
  - `order`: number

- **Rationale:** Structured data avoids fragile text-parsing and allows direct association of images and metadata to each day.

## Frontend Rendering Rules

- `InteractiveItinerary` will prefer `itineraryDays` when present; fallback to legacy `itinerary` parsing only if structured data is absent.
- Multi-line descriptions are preserved by rendering with `whitespace-pre-line` CSS.
- `ItineraryImageGallery` will prefer `itineraryDays[].images[0]` as day images; when missing, falls back to section-level itinerary images.

## Admin UX Requirements (for implementation)

- Add CRUD controls for `itineraryDays` including an image uploader for each day (store URLs in `itineraryDays[].images`).
- Ensure admin saves `description` without trimming or sanitizing line breaks (store raw text); the admin preview should render with `whitespace-pre-line`.

## Migration Notes

- Existing legacy `itinerary` strings should be parsed into `itineraryDays` during import; keep legacy `itinerary` as a fallback source until admin panel is fully populated.

## Homepage Design — Consolidated Learnings

- **Canonical color tokens**: Keep a small set of canonical tokens (primary, secondary, accent, destructive, background, foreground). Use `--golden` for decorative highlights only; pick `--accent` or `--primary` for primary CTAs and align visual language so teal/orange seen in screenshots map to documented tokens.

- **Button system**: Define explicit button types: `primary` (solid, high-contrast, 44px min), `secondary` (outlined or soft), `ghost` (icon-only), `icon` (circular). Each must include hover/active/focus states and token references (e.g., `--button-primary-bg`, `--button-primary-foreground`).

- **Image readability**: Enforce a scrim utility token `--image-scrim` (e.g., linear-gradient(180deg, rgba(0,0,0,.0) 20%, rgba(0,0,0,.55) 100%)) and apply to hero + card images to guarantee AA contrast for title text.

- **Spacing & scale**: Maintain large hero typography with consistent rhythm — headings 48–64px on desktop; body and metadata at clearly legible sizes. Keep card gutters consistent with container padding (use Tailwind container settings).

- **Interaction & motion**: Centralize micro-animations (fade, lift, subtle bounce) with tokens controlling duration/easing to maintain consistent motion language.

- **Accessibility checklist**: Validate all CTA colors for 4.5:1 contrast, ensure 44x44px tappable areas, visible keyboard focus, and ARIA labels on non-text controls (carousel arrows, indicators).

- **Design tokens first**: Any UI change should update tokens first (in `src/index.css`), then components. This ensures consistent, site-wide theming and easier A/B experimentation.

- **Next immediate work**: Standardize `--accent` to match the orange CTA in screenshots, add `--image-scrim`, and create `components/ui/button.tsx` variants if missing.

