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
- 
## Supabase Wiring — Key Mappings & Rollout Pattern

- **Views to Frontend Models:**
  - `vw_published_tours` → listing needs: `id`, `title`, `slug`, `short_description`, `featured_image_url`, `price`, `duration_days`, `display_order`, `is_featured`, `is_day_out_package`, `rating`, `review_count`, `location`, `category_name`, `category_slug`, `images` (JSON array with `image_url`, `alt_text`, `caption`, `display_order`, `section`).
  - `vw_tour_by_slug` → detail needs: above plus `sections` (JSONB array mirroring `tour_sections`), `overview_content` (pre-selected HTML), `itinerary` (JSON), `gallery` images.
  - Inquiry tables (`public.inquiries`, `public.day_out_inquiry`, `public.contact_inquiry`) expect anon inserts with required fields noted in docs; frontend must map form inputs directly to columns and capture optional metadata (e.g., `tour_id`).

- **Rollout Sequence (reuse for similar projects):**
  1. Configure env (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`); verify via new `supabaseClient` helper.
  2. Replace mock fetchers with Supabase queries (listing, detail, category filters) ensuring data transformations align with existing component props; seed and publish at least one tour via admin before smoke tests to validate wiring.
  3. Integrate HTML sanitization (e.g., DOMPurify) before injecting `overview_content`.
  4. Update inquiry forms to call `supabase.from(...).insert(...)` with client-side validation and error handling aligned to RLS allowances.
  5. Execute staging verification: content fetch, detail view, inquiry submission, RLS denial on restricted tables; record SQL outputs for evidence.
  6. Promote to production after smoke tests; document edits in `Admin_Manual` / `database document`.

