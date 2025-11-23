# Supabase Website Integration Setup

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# 🔐 SECURITY: Get these values from Supabase Dashboard
# Project Settings → API → Project URL and anon public key
# NEVER commit actual values to version control
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 🔐 Security Best Practices

**Environment Variable Security:**
- **Never commit secrets to version control** - `.env.local` is in `.gitignore`
- **Use different keys for dev/staging/production environments**
- **Rotate API keys every 90 days** or immediately if compromised
- **Restrict API key permissions** to minimum required access
- **Monitor API key usage** for suspicious activity

**Production Deployment:**
- Set environment variables in your deployment platform (Netlify, Vercel, etc.)
- Use environment-specific keys (not development keys)
- Enable key rotation and emergency disable procedures

**Getting Your Keys:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to Settings → API
4. Copy the Project URL and anon/public key

## Deployment Environment Variables

For production/staging deploys, set these environment variables in your deployment platform (Vercel, Netlify, etc.):

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous (public) API key

## Database Schema

The website expects the following database structure (already set up in Supabase project `JPSHYADMINPANEL`):

### Core Tables

#### `public.tours`
Main tour data table managed via admin panel.

#### `public.categories`
Tour categories (Kerala Travels, Discover India, Ayurveda, etc.).

#### `public.tour_images`
Images linked to tours with sections (overview, itinerary, gallery, banner).

#### `public.tour_sections`
JSONB content sections (overview, itinerary, inclusions, etc.).

### Inquiry Tables

#### `public.inquiries`
Tour-specific inquiry form submissions.

#### `public.contact_inquiry`
General contact form submissions.

#### `public.day_out_inquiry`
Day-out package inquiry submissions.

### Database Views

#### `vw_published_tours`
Aggregated view returning only published tours with:
- Basic tour info (title, slug, price, duration, etc.)
- Category metadata
- Aggregated images array
- Featured flags

**Columns**: `id`, `title`, `slug`, `short_description`, `featured_image_url`, `price`, `duration_days`, `display_order`, `is_featured`, `is_day_out_package`, `rating`, `review_count`, `location`, `category_id`, `category_name`, `category_slug`, `images` (JSONB array)

#### `vw_tour_by_slug`
Detailed view for single tour page with:
- All fields from `vw_published_tours`
- `sections` (JSONB array of tour_sections)
- `overview_content` (pre-computed HTML from overview section)
- `itinerary` (pre-computed JSONB from itinerary section)

**Usage**: Query by slug to get full tour detail data.

## Row Level Security (RLS)

### Required RLS Policies

The following RLS policies must be enabled for anonymous (public) website access:

1. **`vw_published_tours` - SELECT policy**
   - Allow public (anon) role to SELECT from view
   - Ensures only published tours are visible

2. **`vw_tour_by_slug` - SELECT policy**
   - Allow public (anon) role to SELECT from view
   - Filters by slug for detail pages

3. **`inquiries` - INSERT policy**
   - Allow public (anon) role to INSERT
   - Website visitors can submit tour inquiries

4. **`contact_inquiry` - INSERT policy**
   - Allow public (anon) role to INSERT
   - Website visitors can submit contact forms

5. **`day_out_inquiry` - INSERT policy**
   - Allow public (anon) role to INSERT
   - Website visitors can submit day-out inquiries

### RLS Verification

Run the following SQL in Supabase SQL editor to verify RLS policies:

```sql
-- Check policies on views
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('vw_published_tours', 'vw_tour_by_slug', 'inquiries', 'contact_inquiry', 'day_out_inquiry');
```

If policies are missing, create them via the Supabase dashboard or SQL editor.

## Testing the Integration

### 1. Verify Connection

After setting environment variables, start the dev server:

```bash
npm run dev
```

Check browser console for any Supabase connection errors.

### 2. Test Data Fetching

1. Visit the homepage - tours should load from Supabase
2. Visit `/tours` - listing should show published tours
3. Click on a tour - detail page should load tour data
4. Check browser DevTools Network tab for Supabase API calls

### 3. Test Inquiry Forms

1. Fill out a contact form and submit
2. Fill out a tour inquiry form and submit
3. Check Supabase dashboard → Table Editor → `inquiries` / `contact_inquiry` to verify data was inserted

### 4. Fallback Behavior

If Supabase is not configured (missing env vars), the site falls back to mock data for development. Check console for fallback messages.

## Troubleshooting

### No tours showing on the website

**Cause**: No published tours in the database.

**Solution**: Use the admin panel to create and publish at least one tour. Ensure:
- `is_published` = `true`
- Tour has images
- Tour has sections (overview, itinerary)

### "Failed to submit inquiry" errors

**Cause**: Missing RLS policies on inquiry tables.

**Solution**: Add INSERT policies for anon role on `inquiries`, `contact_inquiry`, and `day_out_inquiry` tables via Supabase dashboard.

### Images not loading

**Cause**: Image URLs may be incorrect or inaccessible.

**Solution**: 
- Ensure images are uploaded to Supabase Storage or publicly accessible CDN
- Check `tour_images.image_url` values in database
- Verify storage bucket policies allow public read access

### CORS errors

**Cause**: Supabase project may have restricted origins.

**Solution**: In Supabase dashboard → Project Settings → API, add your deployment domain to allowed origins.

## Development vs. Production

### Development (localhost)
- Uses `.env.local` for environment variables
- Falls back to mock data if Supabase not configured
- Hot reload enabled

### Production
- Set environment variables in deployment platform
- No mock data fallback (Supabase required)
- Optimized builds with `npm run build`

## Next Steps

See `ADMIN_PANEL_TASKS.md` for tasks required on the admin panel side to complete the integration.


