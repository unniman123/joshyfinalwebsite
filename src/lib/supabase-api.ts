/**
 * Supabase API Integration
 * 
 * This module provides data-fetching functions that connect to Supabase database.
 * Replaces mock data from api.ts with real database queries.
 * 
 * Database views used:
 * - vw_published_tours: For listing and filtering published tours
 * - vw_tour_by_slug: For tour detail pages
 */

import { supabase } from './supabase';
import type { TourSummary, TourDetail, Category } from './types/database';
import { sanitizeHTML, sanitizeImageURL } from './utils/sanitize';

/**
 * Transform database TourSummary to match frontend expectations
 * Maps database fields to component prop names
 * IMPORTANT: Includes parent category to enable proper filtering
 */
function transformTourSummary(dbTour: any): any {
  // Use first image from images array, or featured_image_url as fallback
  const primaryImage = dbTour.images?.[0]?.image_url || dbTour.featured_image_url || '';
  
  // Build categories array including both direct category and parent category
  const categoriesArray: string[] = [];
  if (dbTour.category_name) {
    categoriesArray.push(dbTour.category_name);
  }
  // Add parent category if it exists and is different from direct category
  if (dbTour.parent_category_name && dbTour.parent_category_name !== dbTour.category_name) {
    categoriesArray.push(dbTour.parent_category_name);
  }
  
  return {
    id: dbTour.id,
    title: dbTour.title,
    description: dbTour.short_description || '',
    category: dbTour.category_name || '',
    categories: categoriesArray,
    subcategories: dbTour.category_slug ? [dbTour.category_slug] : [],
    duration: dbTour.duration_days || 1,
    price: dbTour.price ? `₹${dbTour.price.toLocaleString()}` : 'TBD',
    image: sanitizeImageURL(primaryImage) || '/placeholder.svg',
    slug: dbTour.slug,
    isActive: true,
    rating: dbTour.rating,
    reviewCount: dbTour.review_count,
    location: dbTour.location,
  };
}

/**
 * Fetch all published tours from Supabase
 * Uses vw_published_tours view which filters for published tours only
 */
export async function getAllTours(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('vw_published_tours')
      .select('*')
      .order('is_featured', { ascending: false })  // Featured tours first
      .order('display_order', { ascending: true }); // Then by display order

    if (error) {
      console.error('Error fetching tours:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('No published tours found. Please publish tours from admin panel.');
      return [];
    }

    return data.map(transformTourSummary);
  } catch (err) {
    console.error('Unexpected error fetching tours:', err);
    return [];
  }
}

/**
 * Fetch tours by category name or slug
 */
export async function getToursByCategory(category?: string, limit = 6): Promise<any[]> {
  if (!category) {
    return (await getAllTours()).slice(0, limit);
  }

  try {
    const key = category.toLowerCase().trim();
    
    // Query tours table with JOIN to get category and parent category data
    // This allows finding tours linked to subcategories when searching by parent category
    const { data, error } = await supabase
      .from('tours')
      .select(`
        *,
        categories!inner(
          id,
          name,
          slug,
          parent_id,
          parent:categories!parent_id(
            id,
            name,
            slug
          )
        )
      `)
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching tours by category:', error);
      return [];
    }

    // Filter in application logic to handle parent category matching
    // This is more reliable than nested .or() filters in PostgREST
    const filteredData = (data || []).filter((tour: any) => {
      const cat = tour.categories;
      if (!cat) return false;

      // Check if category name or slug matches
      if (cat.name?.toLowerCase().includes(key) || cat.slug?.toLowerCase().includes(key)) {
        return true;
      }

      // Check if parent category name or slug matches
      if (cat.parent) {
        if (cat.parent.name?.toLowerCase().includes(key) || cat.parent.slug?.toLowerCase().includes(key)) {
          return true;
        }
      }

      return false;
    });

    // Apply limit after filtering
    const limitedData = filteredData.slice(0, limit);

    // Transform the data to match TourSummary format with parent category info
    return limitedData.map((tour: any) => {
      const categoriesArray: string[] = [];
      if (tour.categories?.name) {
        categoriesArray.push(tour.categories.name);
      }
      // Add parent category if exists and different from direct category
      if (tour.categories?.parent?.name && tour.categories.parent.name !== tour.categories.name) {
        categoriesArray.push(tour.categories.parent.name);
      }
      
      return {
        id: tour.id,
        title: tour.title,
        description: tour.short_description || '',
        category: tour.categories?.name || '',
        categories: categoriesArray,
        subcategories: tour.categories?.slug ? [tour.categories.slug] : [],
        duration: tour.duration_days || 1,
        price: tour.price ? `₹${tour.price.toLocaleString()}` : undefined,
        image: sanitizeImageURL(tour.featured_image_url) || '/placeholder.svg',
        slug: tour.slug,
        isActive: tour.is_published,
        order: tour.display_order
      };
    });
  } catch (err) {
    console.error('Unexpected error fetching tours by category:', err);
    return [];
  }
}

/**
 * Fetch tours filtered by category and subcategory
 * For now, subcategory filtering is done on title/description
 * TODO: Add proper subcategory/tags support in database
 */
export async function getToursByCategoryAndSubcategory(
  category?: string,
  subcategory?: string,
  limit = 12
): Promise<any[]> {
  if (!category) {
    return (await getAllTours()).slice(0, limit);
  }

  try {
    const categoryKey = category.toLowerCase().trim();
    
    let query = supabase
      .from('vw_published_tours')
      .select('*')
      .or(`category_name.ilike.%${categoryKey}%,category_slug.ilike.%${categoryKey}%`);

    // If subcategory provided, further filter by title/description/slug
    if (subcategory) {
      const subKey = subcategory.toLowerCase().trim();
      query = query.or(
        `title.ilike.%${subKey}%,short_description.ilike.%${subKey}%,slug.ilike.%${subKey}%`
      );
    }

    const { data, error } = await query
      .order('display_order', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching tours by category and subcategory:', error);
      return [];
    }

    return (data || []).map(transformTourSummary);
  } catch (err) {
    console.error('Unexpected error fetching tours by category and subcategory:', err);
    return [];
  }
}

/**
 * Fetch a single tour by slug for detail page
 * Uses vw_tour_by_slug view which includes sections, overview_content, itinerary
 */
export async function getTourBySlug(slug: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('vw_tour_by_slug')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching tour by slug "${slug}":`, error);
      return null;
    }

    if (!data) {
      console.warn(`Tour with slug "${slug}" not found.`);
      return null;
    }

    // Transform to match existing Tour interface
    // Note: view returns 'url' not 'image_url' in the JSON
    const primaryImage = data.images?.[0]?.url || data.featured_image_url || '';

    // Transform images array to match legacy format
    // Note: view returns img.url (not img.image_url) as per jsonb_build_object in view definition
    let images = (data.images || []).map((img: any, idx: number) => ({
      id: `img-${idx}`,
      url: sanitizeImageURL(img.url) || '/placeholder.svg',
      alt: img.alt || data.title,
      caption: img.caption,
      order: img.order,
      section: img.section || 'overview',
      isActive: img.isActive !== false,
    }));

    // Always include the featured image as an overview image if it exists
    // This ensures backward compatibility and proper image display
    if (data.featured_image_url) {
      const sanitizedFeaturedUrl = sanitizeImageURL(data.featured_image_url) || '/placeholder.svg';
      
      // Check if the featured image URL already exists in the images array
      // This prevents duplication when the admin panel stores the featured image in tour_images table
      const featuredImageExists = images.some(img => img.url === sanitizedFeaturedUrl);
      
      if (!featuredImageExists) {
        const featuredImage = {
          id: 'featured-image',
          url: sanitizedFeaturedUrl,
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
          // This ensures overview images come first
          images = [featuredImage, ...images];
        }
      }
    }

    // Extract sections
    // Note: view returns sec.type (not sec.section_type), sec.order (not sec.display_order), sec.isVisible
    const sections = (data.sections || []).map((sec: any) => ({
      id: sec.id || `section-${sec.order}`,
      type: sec.type as 'overview' | 'itinerary' | 'inclusions' | 'gallery' | 'map',
      title: sec.title,
      content: sec.content?.html || '',
      isVisible: sec.isVisible !== false,
      order: sec.order,
      settings: sec.content,
    }));

    // Parse itinerary if present
    // Database returns data.itinerary as array directly (not data.itinerary.days)
    const rawItinerary = Array.isArray(data.itinerary) ? data.itinerary : [];
    
    // Transform database itinerary format to match ItineraryDay interface
    const itineraryDays = rawItinerary.map((dayData: any, index: number) => ({
      id: `day-${dayData.day || index + 1}`,
      dayNumber: dayData.day || index + 1,
      title: dayData.title || `Day ${dayData.day || index + 1}`,
      description: dayData.description || '',
      isActive: true,
      order: dayData.day || index + 1,
    }));

    // Build overview content from sections or use pre-computed overview_content
    const detailedContent = sanitizeHTML(
      data.overview_content || 
      sections.find((s: any) => s.type === 'overview')?.content ||
      data.short_description
    );

    return {
      id: data.id,
      title: data.title,
      description: data.short_description || '',
      detailedContent,
      category: data.category_name || '',
      categories: data.category_name ? [data.category_name] : [],
      duration: data.duration_days || 1,
      price: data.price ? `₹${data.price.toLocaleString()}` : 'TBD',
      image: sanitizeImageURL(primaryImage) || '/placeholder.svg',
      images,
      slug: data.slug,
      itinerary: '', // Legacy string field, can be deprecated
      inclusions: [], // Extract from sections if needed
      exclusions: [],
      mapLocation: undefined, // Add if database supports
      sections,
      itineraryDays,
      isPublished: true,
      seoTitle: data.title,
      seoDescription: data.short_description,
      seoKeywords: [],
      rating: data.rating,
      reviewCount: data.review_count,
      location: data.location,
      adminSettings: {
        allowPublicBooking: true,
        showPricing: !!data.price,
        showEnquiryForm: true,
        enableReviews: true,
        featuredTour: data.is_featured,
      },
    };
  } catch (err) {
    console.error(`Unexpected error fetching tour by slug "${slug}":`, err);
    return null;
  }
}

/**
 * Fetch related tours based on category
 * Returns tours from the same category, excluding the current tour
 */
export async function getRelatedTours(slug: string, limit = 3): Promise<any[]> {
  try {
    // First get the current tour's category
    const currentTour = await getTourBySlug(slug);
    if (!currentTour) return [];

    const { data, error } = await supabase
      .from('vw_published_tours')
      .select('*')
      .eq('category_slug', currentTour.category?.toLowerCase())
      .neq('slug', slug)
      .order('display_order', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching related tours:', error);
      return [];
    }

    return (data || []).map(transformTourSummary).map(tour => ({
      ...tour,
      // Convert back to full Tour object for related tours component
      detailedContent: tour.description,
      images: [],
      itinerary: '',
      inclusions: [],
      exclusions: [],
      sections: [],
      itineraryDays: [],
      isPublished: true,
    }));
  } catch (err) {
    console.error('Unexpected error fetching related tours:', err);
    return [];
  }
}

/**
 * Fetch available tour categories
 * Queries the categories table for active categories
 */
export async function getTourCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return (data || []).map((cat: any) => cat.name);
  } catch (err) {
    console.error('Unexpected error fetching categories:', err);
    return [];
  }
}

/**
 * Unified search across tours
 * TODO: Expand to search destinations when that table is added
 */
export async function unifiedSearch(query: string): Promise<any> {
  if (!query || query.trim().length === 0) {
    return {
      tours: [],
      destinations: [],
      totalResults: 0,
      hasToursOnly: false,
      hasDestinationsOnly: false,
      hasBoth: false,
    };
  }

  try {
    const searchTerm = query.toLowerCase().trim();

    const { data, error } = await supabase
      .from('vw_published_tours')
      .select('*')
      .or(
        `title.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%,category_name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`
      )
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error searching tours:', error);
      return {
        tours: [],
        destinations: [],
        totalResults: 0,
        hasToursOnly: false,
        hasDestinationsOnly: false,
        hasBoth: false,
      };
    }

    const tours = (data || []).map(transformTourSummary);

    return {
      tours,
      destinations: [], // TODO: Add destination search
      totalResults: tours.length,
      hasToursOnly: tours.length > 0,
      hasDestinationsOnly: false,
      hasBoth: false,
    };
  } catch (err) {
    console.error('Unexpected error during search:', err);
    return {
      tours: [],
      destinations: [],
      totalResults: 0,
      hasToursOnly: false,
      hasDestinationsOnly: false,
      hasBoth: false,
    };
  }
}

/**
 * Fetch day-out packages for homepage
 * Returns tours marked as day-out packages (is_day_out_package = true)
 * These are single-day tours displayed in the Day Out Packages section
 */
export async function getDayOutPackages(limit = 10): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('vw_published_tours')
      .select('*')
      .eq('is_day_out_package', true)
      .order('display_order', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching day-out packages:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('No day-out packages found. Please mark tours as day-out packages in admin panel.');
      return [];
    }

    // Transform to DayOutPackage interface format
    return data.map((pkg: any) => ({
      id: pkg.id,
      title: pkg.title,
      image: sanitizeImageURL(pkg.featured_image_url || pkg.images?.[0]?.image_url) || '/placeholder.svg',
      slug: pkg.slug,
      description: pkg.short_description || '',
      showDescription: false, // Default to false as per admin configuration
      showExploreButton: false, // Default to false as per admin configuration
    }));
  } catch (err) {
    console.error('Unexpected error fetching day-out packages:', err);
    return [];
  }
}

/**
 * Fetch homepage settings including hero banner images and text from site_content table
 * Used for dynamic homepage configuration with multiple hero images
 */
export async function getHomepageSettings(): Promise<{ title: string; subtitle: string; images: Array<{ url: string; order: number }> } | null> {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content_value')
      .eq('element_key', 'homepage_hero_banner')
      .single();

    if (error) {
      console.error('Error fetching homepage settings:', error);
      return null;
    }

    // The data structure matches the expected format from site_content
    return data?.content_value || null;
  } catch (err) {
    console.error('Unexpected error fetching homepage settings:', err);
    return null;
  }
}

// Re-export types for convenience
export type { TourSummary, TourDetail };

