// Comprehensive test for the image fix
// Tests both scenarios: featured image only, and featured + gallery images
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
const envPath = path.join(__dirname, '../.env.local');
let supabaseUrl, supabaseKey;

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');

  for (const line of envLines) {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=').trim();

    if (key === 'VITE_SUPABASE_URL') {
      supabaseUrl = value;
    } else if (key === 'VITE_SUPABASE_ANON_KEY') {
      supabaseKey = value;
    }
  }
} catch (error) {
  console.error('❌ Could not read .env.local file:', error.message);
  process.exit(1);
}

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Simulate the sanitizeImageURL function
function sanitizeImageURL(url) {
  if (!url || typeof url !== 'string') return '/placeholder.svg';
  try {
    new URL(url);
    return url;
  } catch {
    return '/placeholder.svg';
  }
}

async function testComprehensiveImageFix() {
  try {
    console.log('🧪 Testing comprehensive image fix...\n');

    // Test 1: Tour with only featured image (no gallery images)
    console.log('📋 Test 1: Tour with only featured image');
    const tour1 = await supabase
      .from('vw_tour_by_slug')
      .select('*')
      .eq('slug', 'testing-after-error-check')
      .single();

    if (tour1.data) {
      const images1 = simulateImageTransformation(tour1.data);
      console.log('✅ Result:', {
        featured_image_exists: !!tour1.data.featured_image_url,
        gallery_images_count: tour1.data.images?.length || 0,
        final_images_count: images1.length,
        overview_images: images1.filter(img => img.section === 'overview').length,
        itinerary_images: images1.filter(img => img.section === 'itinerary').length
      });
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 2: Find a tour with both featured image and gallery images
    console.log('📋 Test 2: Finding tour with both featured and gallery images');

    // Get all tours from the view (vw_published_tours only shows published tours)
    const { data: allTours, error: allToursError } = await supabase
      .from('vw_published_tours')
      .select('slug, title, featured_image_url, images');

    if (allToursError) {
      console.error('❌ Error fetching tours:', allToursError);
      return;
    }

    const toursWithBoth = allTours.filter(tour =>
      tour.featured_image_url && tour.images && tour.images.length > 0
    );

    if (toursWithBoth.length === 0) {
      console.log('❌ No tours found with both featured image and gallery images');
      console.log('Available tours:');
      allTours.forEach(tour => {
        console.log(`  - ${tour.title}: featured=${!!tour.featured_image_url}, gallery=${tour.images?.length || 0}`);
      });
      return;
    }

    // Test the first tour with both types of images
    const testTour = toursWithBoth[0];
    console.log(`✅ Testing tour: "${testTour.title}" (slug: ${testTour.slug})`);

    const { data: fullTour, error: fullTourError } = await supabase
      .from('vw_tour_by_slug')
      .select('*')
      .eq('slug', testTour.slug)
      .single();

    if (fullTourError || !fullTour) {
      console.error('❌ Error fetching full tour data:', fullTourError);
      return;
    }

    const images2 = simulateImageTransformation(fullTour);
    console.log('✅ Result:', {
      featured_image_exists: !!fullTour.featured_image_url,
      gallery_images_count: fullTour.images?.length || 0,
      final_images_count: images2.length,
      overview_images: images2.filter(img => img.section === 'overview').length,
      itinerary_images: images2.filter(img => img.section === 'itinerary').length,
      gallery_images: images2.filter(img => img.section === 'gallery').length
    });

    console.log('\n📸 Image breakdown:');
    images2.forEach((img, idx) => {
      console.log(`  ${idx + 1}. [${img.section}] ${img.id}: ${img.url.substring(0, 50)}...`);
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Simulate the current image transformation logic
function simulateImageTransformation(data) {
  // Transform gallery images from tour_images table
  let images = (data.images || []).map((img, idx) => ({
    id: `img-${idx}`,
    url: sanitizeImageURL(img.url) || '/placeholder.svg',
    alt: img.alt || data.title,
    caption: img.caption,
    order: img.order,
    section: img.section || 'overview',
    isActive: img.isActive !== false,
  }));

  // Always include the featured image as an overview image if it exists
  if (data.featured_image_url) {
    const featuredImage = {
      id: 'featured-image',
      url: sanitizeImageURL(data.featured_image_url) || '/placeholder.svg',
      alt: data.title,
      caption: null,
      order: 0,
      section: 'overview',
      isActive: true,
    };

    // If no gallery images exist, replace the array with just the featured image
    if (images.length === 0) {
      images = [featuredImage];
    } else {
      // If gallery images exist, prepend the featured image to the array
      images = [featuredImage, ...images];
    }
  }

  return images;
}

testComprehensiveImageFix();
