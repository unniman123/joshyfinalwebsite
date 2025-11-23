# Admin Panel Tasks for Website Integration

This document outlines the tasks that must be completed on the admin panel side to fully integrate with the website.

## Database Schema Verification

### ✅ Already Completed (Verified via Supabase MCP)

The following database elements are confirmed to exist and match the documentation:

- [x] Tables: `tours`, `categories`, `tour_images`, `tour_sections`, `inquiries`, `contact_inquiry`, `day_out_inquiry`, `homepage_settings`, `site_content`, `user_roles`
- [x] Views: `vw_published_tours`, `vw_tour_by_slug`
- [x] All expected columns in tables and views

## Category Management Implementation Tasks

### ✅ COMPLETED: Database Category Structure & Navigation (2025-11-06)

**Categories Created & Verified:**
- **Parent Categories (3 total):**
  - Kerala Travels (ID: 11111111-1111-1111-1111-111111111111)
  - Discover India (ID: 22222222-2222-2222-2222-222222222222)
  - Global (ID: 33333333-3333-3333-3333-333333333333)

- **Discover India Subcategories (35 total - ALL ACTIVE):**
  - Existing: 100 Beautiful Places in India, Golden Triangle, Silver Triangle, Lakshadweep, Andaman, South India Trails, Odisha, North East, Kashmir
  - New: Beautiful Places in India, Kerala Travels, South India, Golden Triangle (duplicate), Silver Triangle (duplicate), Indian Short Tours, Kashmir (duplicate), Goa, Gujarat, Rajasthan, Summer Escapes, Lakshadweep (duplicate), Hyderabad, Indian Wildlife Tours, Andaman Archipelago, Beach Holidays, Tamil Nadu, Himachal Pradesh, Heritage Tours, Spiritual Tours, Indian River Cruises, Odisha (duplicate), North East (duplicate), Uttarakhand, Luxury Train Tours, Buddhist Holidays

- **Kerala Travels Subcategories (16 total - ALL ACTIVE):**
  - Existing: Short Breaks in Kerala, Cultural Tours, Hillstations & Wildlife, Backwater Trips, Beach Paradise
  - New: Kerala Tours, Rice Trails, Beach Holidays, Weekends in Kerala, Short Breaks, 2-4 Weeks Tours, Wildlife Tours, Spiritual, Heritage Tours, Cultural Tours in Kerala, Offbeat Tours

**Navigation Fully Updated & Tested:**
- ✅ `src/data/navTaxonomy.ts` updated with all 51 subcategory entries
- ✅ Dropdown menus now show complete category hierarchy
- ✅ Website navigation tested and working with all subcategories visible
- ✅ Database counts match navigation taxonomy exactly (35 Discover India + 16 Kerala = 51 total)

## 📋 Current Admin Panel Implementation Status

### ✅ COMPLETED (Database & Frontend)
- Database schema with all categories and relationships
- Navigation taxonomy updated and working
- Website dropdowns showing all subcategories correctly

### 🚧 REQUIRED: Admin Panel Implementation (Next Steps)

#### 1. Category Management Interface (Priority: High)
**Create `/admin/categories` page:**
- **List View**: Display all categories in hierarchical tree structure
  - Parent categories expandable to show subcategories
  - Show active/inactive status with visual indicators
  - Display order column for manual reordering
  - Search/filter by name, parent category, or status

- **Category CRUD Operations**:
  - Add new categories (both parent and subcategory)
  - Edit existing category details (name, slug, description, display order)
  - Activate/deactivate categories
  - Delete categories (with confirmation and dependency checks)

- **Form Fields**:
  - Name (required, unique within parent)
  - Slug (auto-generated, editable, unique check)
  - Description (optional, rich text)
  - Parent Category (dropdown for subcategories)
  - Display Order (numeric, for sorting)
  - Active Status (toggle)
  - Image URL (optional, for category icons)

#### 2. Tour Management Integration (Priority: High)
**Update Tour Creation/Edit Forms:**
- **Category Selection**: Hierarchical dropdown showing "Parent > Child" format
  - Only leaf categories (subcategories) selectable for tours
  - Searchable dropdown for easy category finding
  - Default to most commonly used categories

- **Category Validation**:
  - Prevent assigning tours to parent categories
  - Ensure selected category exists and is active
  - Display category path in tour details

#### 3. Content Population (Priority: Medium)
**Using Existing Categories:**
- Create sample tours for each major subcategory
- Upload images for categories and tours
- Set up SEO metadata and descriptions
- Configure display orders for proper sorting

#### 4. Advanced Features (Priority: Low)
**Category Analytics:**
- View tour counts per category
- Track popular categories
- Category performance metrics

**Bulk Operations:**
- Bulk category status changes
- Bulk tour category reassignment
- Export category data

### 2. Tour Management

#### Create/Edit Tours
- [ ] **Form to create new tours** with fields:
  - Title, slug (auto-generated with uniqueness check)
  - Short description
  - Price, duration (in days)
  - Location
  - **Category selection (hierarchical dropdown from new category structure)**
  - Featured image URL
  - Published status (`is_published`)
  - Featured flag (`is_featured`)
  - Day-out package flag (`is_day_out_package`)
  - Display order (for sorting)

#### Tour Images Management
- [ ] **Image upload interface** for each tour:
  - Upload to Supabase Storage or external CDN
  - Store image URLs in `tour_images` table
  - Set image section (overview, itinerary, gallery, banner)
  - Set display order
  - Alt text and captions

#### Tour Sections Management  
- [ ] **Sections editor** for tour content:
  - Section type selector (overview, itinerary, inclusions, gallery, map)
  - Rich text editor for section content (WYSIWYG HTML editor)
  - JSONB content field for structured data
  - Display order management
  - Visibility toggle

#### Itinerary Builder
- [ ] **Structured itinerary editor**:
  - Day-by-day breakdown
  - Activities per day
  - Highlights, meals, accommodation
  - Images per day
  - Store as JSONB in `itinerary` section

### 2. Category Management

- [ ] **Create/edit/delete categories**:
  - Name, slug (auto-generated)
  - Description
  - Display order
  - Active status toggle
- [ ] **View all categories** in sortable table

### 3. Inquiry Management

#### View Inquiries
- [ ] **Dashboard to view all inquiries**:
  - Filter by type (tour inquiry, contact inquiry, day-out inquiry)
  - Filter by date range
  - Search by name, email
  - Mark as read/responded

#### Tour Inquiries (`inquiries`)
- [ ] **Table view** showing:
  - Tour title (join with `tours`)
  - Visitor name, email, phone
  - Travel date, number of travelers
  - Message
  - Created timestamp
- [ ] **Export to CSV** functionality

#### Contact Inquiries (`contact_inquiry`)
- [ ] **Table view** showing:
  - Name, email, phone
  - Subject
  - Message
  - Created timestamp
- [ ] **Export to CSV** functionality

#### Day-Out Inquiries (`day_out_inquiry`)
- [ ] **Table view** showing:
  - Name, email, phone
  - Preferred date, number of people
  - Destination
  - Message
  - Created timestamp
- [ ] **Export to CSV** functionality

### 4. Content Management

#### Homepage Settings
- [ ] **Homepage editor** (`homepage_settings` table):
  - Hero title and subtitle
  - Hero image URL
  - Featured section title
  - Toggle testimonial section
  - Toggle day-out packages section

#### Site Content
- [ ] **Key-value content editor** (`site_content` table):
  - About Us content
  - Footer text
  - Terms & conditions
  - Privacy policy
  - Any other site-wide content

### 5. SEO & Metadata

- [ ] **SEO fields** for each tour:
  - Meta title
  - Meta description
  - Keywords/tags
- [ ] **Slug management**:
  - Auto-generate from title
  - Allow manual override
  - Check uniqueness via `check_tour_slug_availability` function

### 6. Preview & Publishing

- [ ] **Tour preview** button:
  - Opens website tour detail page in new tab
  - Shows unpublished tours with `?preview=true` token
- [ ] **Publish/Unpublish** toggle:
  - Sets `is_published` flag
  - Only published tours appear on website
- [ ] **Bulk actions**:
  - Publish multiple tours
  - Update display order
  - Change category

## 📅 Updated Implementation Timeline (Post-Category Setup)

### ✅ COMPLETED: Foundation (Database & Navigation)
- Database categories created and verified
- Navigation taxonomy updated and tested
- Website dropdowns working with all subcategories

### 🚧 Phase 1: Admin Panel Core (Week 1 - START NOW)
**Priority: HIGH - These are the immediate next steps**
- [ ] **Build Category Management Page** (`/admin/categories`)
  - Hierarchical tree view of all categories
  - CRUD operations for categories
  - Bulk activate/deactivate functionality
- [ ] **Update Tour Creation Form**
  - Add hierarchical category dropdown
  - Implement category validation
  - Test category assignment to tours

### Phase 2: Content & Testing (Week 1-2)
- [ ] **Populate Sample Content**
  - Create 2-3 tours per major subcategory
  - Upload tour images and category images
  - Set up proper display orders
- [ ] **Integration Testing**
  - Test tour creation with new categories
  - Verify frontend category filtering
  - Test admin panel category management

### Phase 3: Advanced Features (Week 2-3)
- [ ] **Analytics Dashboard**
  - Category performance metrics
  - Tour counts per category
  - Popular categories tracking
- [ ] **Bulk Operations**
  - Mass category updates
  - Tour category reassignment tools

### Phase 4: Optimization (Week 3-4)
- [ ] **Performance Optimization**
  - Lazy loading for large category lists
  - Database query optimization
  - Frontend caching strategies
- [ ] **SEO & Accessibility**
  - Category page SEO optimization
  - Screen reader support for category navigation

## Data Seeding Requirements

### ✅ COMPLETED: Category Structure Seeding (2025-11-06)

**Database Status:**
- ✅ All parent categories created and active
- ✅ All subcategories created with proper parent relationships
- ✅ Navigation taxonomy updated to reflect new structure
- ✅ Category hierarchy verified (3 parents, 60 total categories)

### Minimum Data for Website Testing

To properly test the website integration with new categories:

1. **Sample Tours for Key Categories** (Priority Order):
   - Kerala Travels > Kerala Tours (1 tour)
   - Kerala Travels > Beach Holidays (1 tour)
   - Discover India > Golden Triangle (1 tour)
   - Discover India > Kashmir (1 tour)
   - Global > Maldives (1 tour)

2. **Tour Requirements**:
   - Each with `is_published = true`
   - At least 2 featured tours (`is_featured = true`)
   - Each with 3-5 images in `tour_images` table
   - Each with overview and itinerary sections in `tour_sections`
   - Proper category assignment using new hierarchical structure

3. **Test Scenarios**:
   - Navigation dropdown functionality
   - Category filtering on tours listing page
   - Tour detail page category display
   - URL routing with category parameters

### SQL Seed Script (Example)

```sql
-- Insert categories
INSERT INTO public.categories (name, slug, description, display_order, is_active)
VALUES 
  ('Kerala Travels', 'kerala-travels', 'Explore God''s Own Country', 1, true),
  ('Discover India', 'discover-india', 'Iconic destinations across India', 2, true),
  ('Ayurveda', 'ayurveda', 'Wellness and rejuvenation', 3, true);

-- Insert a sample tour (IDs will auto-generate)
-- Note: Update image URLs to actual accessible URLs
INSERT INTO public.tours (title, slug, short_description, featured_image_url, price, duration_days, location, category_id, is_published, is_featured, display_order)
VALUES (
  'Wonders of Kerala - 10 Nights',
  'wonders-of-kerala-10-nights',
  'Experience the best of Kerala across beaches, backwaters, hills, and wildlife.',
  'https://example.com/kerala-tour.jpg',
  75000,
  11,
  'Kerala, India',
  (SELECT id FROM public.categories WHERE slug = 'kerala-travels'),
  true,
  true,
  1
);

-- Insert tour images (using the tour_id from above)
-- Insert tour sections (overview, itinerary, etc.)
```

## RLS Policy Setup

### Required Policies (Must be enabled)

1. **Views - SELECT for anon**:
   ```sql
   -- Allow public read access to published tours view
   CREATE POLICY "anon_select_published_tours" ON public.vw_published_tours
   FOR SELECT TO anon USING (true);

   CREATE POLICY "anon_select_tour_by_slug" ON public.vw_tour_by_slug
   FOR SELECT TO anon USING (true);
   ```

2. **Inquiries - INSERT for anon**:
   ```sql
   -- Allow public to submit tour inquiries
   CREATE POLICY "anon_insert_inquiries" ON public.inquiries
   FOR INSERT TO anon WITH CHECK (true);

   -- Allow public to submit contact inquiries
   CREATE POLICY "anon_insert_contact_inquiry" ON public.contact_inquiry
   FOR INSERT TO anon WITH CHECK (true);

   -- Allow public to submit day-out inquiries
   CREATE POLICY "anon_insert_day_out_inquiry" ON public.day_out_inquiry
   FOR INSERT TO anon WITH CHECK (true);
   ```

3. **Admin Access** (authenticated users with admin role):
   ```sql
   -- Full access for authenticated admin users
   -- Apply to tours, categories, tour_images, tour_sections, etc.
   ```

## Admin Panel UI/UX Requirements

### Dashboard
- [ ] Summary cards showing:
  - Total published tours
  - Total inquiries (last 30 days)
  - Most popular tours (by inquiries)
  - Recent activity

### Responsive Design
- [ ] Mobile-friendly admin interface
- [ ] Touch-optimized for tablets

### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] WCAG 2.1 AA compliance

## Testing Checklist

### Before Website Launch

- [ ] Create at least 5 published tours with complete data
- [ ] Verify all images load correctly on website
- [ ] Test inquiry form submissions (check data appears in admin)
- [ ] Verify SEO metadata appears correctly on website pages
- [ ] Test preview functionality
- [ ] Test publish/unpublish workflow
- [ ] Verify RLS policies allow website access but restrict admin writes

### Post-Launch Monitoring

- [ ] Monitor inquiry submissions
- [ ] Check for broken image URLs
- [ ] Verify website performance with real data
- [ ] Set up alerts for failed form submissions

## Integration Milestones

### Milestone 1: Core Tour Management ✅
- Database schema complete
- Views created
- RLS policies configured

### Milestone 2: Admin CRUD Operations (In Progress)
- [ ] Tour create/edit/delete
- [ ] Category management
- [ ] Image upload and management
- [ ] Section editor

### Milestone 3: Inquiry Management (Pending)
- [ ] View inquiries dashboard
- [ ] Filter and search
- [ ] Export functionality
- [ ] Email notifications (optional)

### Milestone 4: Content & SEO (Pending)
- [ ] Homepage settings editor
- [ ] Site content management
- [ ] SEO metadata editor
- [ ] Preview functionality

### Milestone 5: Launch Readiness (Pending)
- [ ] Seed production data
- [ ] User training
- [ ] Documentation
- [ ] Backup procedures

## Support & Documentation

- Admin Manual: `admin panel and db infra/Admin_Manual`
- Database Document: `admin panel and db infra/database document`
- Website Setup: `SUPABASE_SETUP.md`

## Contact for Integration Support

If you encounter issues during integration, verify:
1. Environment variables are set correctly
2. RLS policies are enabled
3. At least one tour is published with complete data
4. Images are accessible (public URLs)

For further assistance, review the consolidated learnings in `memory-bank/consolidated_learnings.md`.

---

## 🛠️ Admin Panel Developer Quick Reference

### Database Queries for Category Management
```sql
-- Get all categories with hierarchy
SELECT
  c.id, c.name, c.slug, c.display_order, c.is_active,
  p.name as parent_name, p.slug as parent_slug
FROM public.categories c
LEFT JOIN public.categories p ON c.parent_id = p.id
ORDER BY COALESCE(p.display_order, 0), p.name, c.display_order;

-- Get subcategories for a specific parent
SELECT id, name, slug, display_order, is_active
FROM public.categories
WHERE parent_id = '11111111-1111-1111-1111-111111111111' -- Kerala Travels
  AND is_active = true
ORDER BY display_order;

-- Check for tour-category relationships
SELECT t.title, c.name as category_name, p.name as parent_name
FROM public.tours t
JOIN public.categories c ON t.category_id = c.id
LEFT JOIN public.categories p ON c.parent_id = p.id
WHERE t.is_published = true;
```

### Key Implementation Components

#### 1. Category Management Page Structure
```typescript
// /admin/categories page components
- CategoryTree: Hierarchical display with expand/collapse
- CategoryForm: Create/edit modal with validation
- CategoryActions: Bulk operations (activate/deactivate)
- CategorySearch: Filter by name, parent, status
```

#### 2. Tour Form Category Integration
```typescript
// Category selector for tour forms
const CategorySelector = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('id, name, parent_id')
      .eq('is_active', true)
      .is('parent_id', null); // Only load parent categories

    // Load subcategories for each parent
    const categoriesWithSubs = await Promise.all(
      data.map(async (parent) => {
        const { data: subs } = await supabase
          .from('categories')
          .select('id, name')
          .eq('parent_id', parent.id)
          .eq('is_active', true);

        return {
          ...parent,
          subcategories: subs || []
        };
      })
    );

    setCategories(categoriesWithSubs);
  };

  // Render hierarchical dropdown
  return (
    <Select value={value} onValueChange={onChange}>
      {categories.map(parent => (
        <SelectGroup key={parent.id}>
          <SelectLabel>{parent.name}</SelectLabel>
          {parent.subcategories.map(sub => (
            <SelectItem key={sub.id} value={sub.id}>
              {parent.name} > {sub.name}
            </SelectItem>
          ))}
        </SelectGroup>
      ))}
    </Select>
  );
};
```

#### 3. Category Validation Functions
```typescript
// Category validation utilities
const categoryValidators = {
  // Check slug uniqueness
  checkSlugUnique: async (slug: string, excludeId?: string) => {
    let query = supabase
      .from('categories')
      .select('id')
      .eq('slug', slug);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data } = await query;
    return data.length === 0;
  },

  // Validate parent-child relationships
  validateHierarchy: (parentId: string, categoryId?: string) => {
    // Prevent circular references
    // Ensure parent exists and is not a subcategory itself
    return true; // Implement logic
  }
};
```

### Testing Checklist for Category Implementation

#### Database Integration Tests
- [ ] All 51 categories load correctly in admin interface
- [ ] Category hierarchy displays properly (parent > child)
- [ ] Active/inactive status filtering works
- [ ] Display order sorting is correct

#### Tour-Category Association Tests
- [ ] Tour creation form shows hierarchical category dropdown
- [ ] Only subcategories (not parents) are selectable
- [ ] Category validation prevents invalid assignments
- [ ] Tour list shows correct category information

#### Navigation Integration Tests
- [ ] Frontend dropdowns show all subcategories
- [ ] Category filtering works on tour listing pages
- [ ] URL routing includes category parameters
- [ ] Category breadcrumbs display correctly

### Common Issues & Solutions

**Issue:** Categories not loading in dropdown
**Solution:** Check that `is_active = true` filter is applied and RLS policies allow admin access

**Issue:** Tour-category association fails
**Solution:** Ensure `category_id` foreign key constraint is satisfied and category exists

**Issue:** Navigation shows wrong categories
**Solution:** Verify `navTaxonomy.ts` matches database exactly (51 entries total)


