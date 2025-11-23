# Quick Start Guide - Website + Supabase Integration

## ⚡ Get Started in 3 Steps

### Step 1: Set Environment Variables

Create `.env.local` in the project root:

```env
# 🔐 SECURITY: Get these values from Supabase Dashboard
# Project Settings → API → Project URL and anon public key
# NEVER commit actual values to version control
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**🔐 SECURITY REQUIREMENTS:**
- Get credentials from: https://supabase.com/dashboard → Your Project → Settings → API
- Never commit `.env.local` to version control (already in `.gitignore`)
- Use different keys for development and production
- Rotate keys regularly (every 90 days)

### Step 2: Install Dependencies & Start Dev Server

```bash
npm install
npm run dev
```

Visit `http://localhost:8080` in your browser.

### Step 3: Seed Database via Admin Panel

**Before the website shows content, you must create tours in the admin panel:**

1. Log in to admin panel
2. Create at least 1 category (e.g., "Kerala Travels")
3. Create at least 1 tour:
   - Set `is_published = true`
   - Add title, description, price, duration
   - Upload at least 1 image
   - Create overview and itinerary sections
   - Save and publish

4. Refresh the website - your tour should now appear!

## 🧪 Testing the Integration

### Test Data Fetching

1. **Homepage**: Should list published tours
2. **Tours Page**: Should show tour cards with images
3. **Tour Detail**: Click a tour, should load full details
4. **Search**: Try searching for tour names

### Test Inquiry Forms

1. **Contact Form**: Fill and submit
2. **Tour Inquiry**: Submit from tour detail page
3. **Check Supabase**: Go to Supabase dashboard → Table Editor → `inquiries` / `contact_inquiry`

## 📚 Documentation

- **Setup Details**: `SUPABASE_SETUP.md`
- **Admin Tasks**: `ADMIN_PANEL_TASKS.md`
- **Integration Summary**: `INTEGRATION_SUMMARY.md`

## 🚨 Troubleshooting

### "No tours found"
- **Cause**: No published tours in database
- **Fix**: Create and publish tours via admin panel

### "Failed to submit inquiry"
- **Cause**: RLS policies not configured
- **Fix**: Check `SUPABASE_SETUP.md` for RLS policy setup

### Images not loading
- **Cause**: Invalid or inaccessible image URLs
- **Fix**: Ensure images are uploaded to public URLs (Supabase Storage or CDN)

## ✅ All Done!

Your website is now connected to Supabase. Add content via the admin panel and it will appear on the website automatically.


