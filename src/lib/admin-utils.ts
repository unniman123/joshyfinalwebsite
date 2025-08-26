// Admin panel utility functions for tour management
import { Tour, TourImage, ItineraryDay, TourSection, ItineraryActivity } from './api';

// Image management utilities
export const getImagesBySection = (tour: Tour, section: 'banner' | 'overview' | 'itinerary' | 'gallery'): TourImage[] => {
  return tour.images
    .filter(img => img.section === section && img.isActive)
    .sort((a, b) => a.order - b.order);
};

export const getOverviewImages = (tour: Tour): string[] => {
  const overviewImages = getImagesBySection(tour, 'overview');
  if (overviewImages.length > 0) {
    return overviewImages.map(img => img.url);
  }

  // Fallback to legacy images array (first 3 images)
  if (tour.images && Array.isArray(tour.images) && typeof tour.images[0] === 'string') {
    return (tour.images as unknown as string[]).slice(0, 3);
  }

  // Final fallback to tour card image
  return [tour.image];
};

export const getItineraryImages = (tour: Tour): string[] => {
  const itineraryImages = getImagesBySection(tour, 'itinerary');
  if (itineraryImages.length > 0) {
    return itineraryImages.map(img => img.url);
  }

  // Fallback to legacy images array (skip first 3 used in overview)
  if (tour.images && Array.isArray(tour.images) && typeof tour.images[0] === 'string') {
    const legacyImages = tour.images as unknown as string[];
    return legacyImages.length > 3 ? legacyImages.slice(3) : legacyImages.slice(1);
  }

  return [];
};

// Content management utilities
export const getSectionByType = (tour: Tour, type: TourSection['type']): TourSection | null => {
  return tour.sections?.find(section => section.type === type && section.isVisible) || null;
};

export const getOverviewContent = (tour: Tour): string => {
  const overviewSection = getSectionByType(tour, 'overview');
  if (overviewSection?.content) {
    return overviewSection.content;
  }

  // Fallback to legacy detailedContent
  if (tour.detailedContent?.trim()) {
    return tour.detailedContent.trim();
  }

  return "Tour overview coming soon...";
};

// Itinerary management utilities
export const getStructuredItinerary = (tour: Tour): ItineraryDay[] => {
  if (tour.itineraryDays && tour.itineraryDays.length > 0) {
    return tour.itineraryDays
      .filter(day => day.isActive)
      .sort((a, b) => a.order - b.order);
  }

  // Fallback to parsing legacy itinerary string
  return parseLegacyItinerary(tour.itinerary || "");
};

export const parseLegacyItinerary = (itineraryText: string): ItineraryDay[] => {
  const lines = itineraryText.split('\n').filter(line => line.trim());
  const days: ItineraryDay[] = [];

  lines.forEach((line, index) => {
    const dayMatch = line.match(/Day (\d+):?\s*(.+)/i);
    if (dayMatch) {
      const dayNumber = parseInt(dayMatch[1]);
      const content = dayMatch[2];

      // Split activities by common separators
      const activities = content.split(/[,;-]/).map(activity => activity.trim()).filter(Boolean);

      days.push({
        id: `legacy-day-${dayNumber}`,
        dayNumber,
        title: activities[0] || `Day ${dayNumber}`,
        activities: activities.slice(1).map((activity, actIndex) => ({
          id: `legacy-activity-${dayNumber}-${actIndex}`,
          title: activity,
          activityType: detectActivityType(activity),
          isIncluded: true,
          order: actIndex
        })),
        highlights: generatePlaceholderHighlights(dayNumber),
        meals: generatePlaceholderMeals(dayNumber),
        accommodation: generatePlaceholderAccommodation(dayNumber),
        duration: "Full Day",
        location: generatePlaceholderLocation(dayNumber),
        difficulty: generatePlaceholderDifficulty(dayNumber),
        images: [],
        isActive: true,
        order: index
      });
    }
  });

  return days;
};

// Activity type detection for admin categorization
export const detectActivityType = (activity: string): ItineraryActivity['activityType'] => {
  const activityLower = activity.toLowerCase();

  if (activityLower.includes('arrival') || activityLower.includes('arrive')) return 'arrival';
  if (activityLower.includes('departure') || activityLower.includes('depart')) return 'departure';
  if (activityLower.includes('temple') || activityLower.includes('church') || activityLower.includes('mosque')) return 'temple';
  if (activityLower.includes('cruise') || activityLower.includes('boat') || activityLower.includes('ship')) return 'cruise';
  if (activityLower.includes('nature') || activityLower.includes('forest') || activityLower.includes('wildlife')) return 'nature';
  if (activityLower.includes('city') || activityLower.includes('tour') || activityLower.includes('visit')) return 'city';
  if (activityLower.includes('sightseeing') || activityLower.includes('photo')) return 'sightseeing';
  if (activityLower.includes('cultural') || activityLower.includes('dance') || activityLower.includes('music')) return 'cultural';
  if (activityLower.includes('adventure') || activityLower.includes('trek') || activityLower.includes('rafting')) return 'adventure';

  return 'default';
};

// Placeholder data generators for admin preview
export const generatePlaceholderHighlights = (dayNumber: number): string[] => {
  const highlights = [
    ["Welcome Reception", "City Orientation", "Cultural Introduction"],
    ["Scenic Cruise", "Local Interactions", "Traditional Experiences"],
    ["Wildlife Spotting", "Nature Photography", "Peaceful Moments"],
    ["Cultural Learning", "Hands-on Activities", "Local Traditions"],
    ["Adventure Activities", "Scenic Views", "Memorable Experiences"],
    ["Final Memories", "Group Bonding", "Departure Preparations"]
  ];
  return highlights[dayNumber - 1] || ["Unique Experience", "Cultural Immersion", "Beautiful Scenery"];
};

export const generatePlaceholderMeals = (dayNumber: number): string[] => {
  const meals = [
    ["Welcome Drink", "Traditional Dinner"],
    ["Fresh Breakfast", "Seafood Lunch", "Romantic Dinner"],
    ["Early Bird Breakfast", "Organic Lunch"],
    ["Homestyle Breakfast", "Cooking Class Meal"],
    ["Adventure Breakfast", "Picnic Lunch", "Campfire Dinner"],
    ["Farewell Breakfast"]
  ];
  return meals[dayNumber - 1] || ["Breakfast", "Lunch", "Dinner"];
};

export const generatePlaceholderAccommodation = (dayNumber: number): string => {
  const accommodations = [
    "Heritage Hotel in Fort Kochi",
    "Traditional Houseboat",
    "Lakeside Resort",
    "Heritage Homestay",
    "Eco-Lodge in Hills",
    "Day Use Hotel Room"
  ];
  return accommodations[dayNumber - 1] || "Comfortable Accommodation";
};

export const generatePlaceholderLocation = (dayNumber: number): string => {
  const locations = [
    "Kochi, Kerala",
    "Alleppey Backwaters",
    "Kumarakom, Kerala",
    "Kumbakonam Village",
    "Thekkady, Kerala",
    "Kochi Airport"
  ];
  return locations[dayNumber - 1] || "Kerala, India";
};

export const generatePlaceholderDifficulty = (dayNumber: number): 'Easy' | 'Moderate' | 'Challenging' => {
  const difficulties: ('Easy' | 'Moderate' | 'Challenging')[] = [
    "Easy", "Easy", "Moderate", "Easy", "Challenging", "Easy"
  ];
  return difficulties[dayNumber - 1] || "Easy";
};

// Admin validation utilities
export const validateTourData = (tour: Partial<Tour>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!tour.title?.trim()) errors.push("Tour title is required");
  if (!tour.description?.trim()) errors.push("Tour description is required");
  if (!tour.category?.trim()) errors.push("Tour category is required");
  if (!tour.duration || tour.duration < 1) errors.push("Tour duration must be at least 1 day");
  if (!tour.slug?.trim()) errors.push("Tour slug is required");

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Tour Detail Page Specific Admin Utilities

// Section management helpers
export const createDefaultOverviewSection = (tour: Tour): TourSection => {
  return {
    id: `overview-${Date.now()}`,
    type: 'overview',
    title: tour.title,
    content: tour.detailedContent || tour.description,
    isVisible: true,
    order: 0,
    settings: {}
  };
};

export const createDefaultItinerarySection = (): TourSection => {
  return {
    id: `itinerary-${Date.now()}`,
    type: 'itinerary',
    title: 'Detailed Itinerary',
    content: '',
    isVisible: true,
    order: 1,
    settings: {}
  };
};

// Itinerary management helpers
export const createItineraryDayFromText = (dayNumber: number, text: string): ItineraryDay => {
  return {
    id: `day-${dayNumber}-${Date.now()}`,
    dayNumber,
    title: `Day ${dayNumber}`,
    description: text.trim(),
    activities: [],
    highlights: [],
    meals: [],
    images: [],
    isActive: true,
    order: dayNumber - 1
  };
};

export const simplifyItineraryDay = (day: ItineraryDay): ItineraryDay => {
  // Simplified version with only title and description for the new layout
  return {
    ...day,
    activities: [],
    highlights: [],
    meals: [],
    accommodation: undefined,
    duration: undefined,
    location: undefined,
    difficulty: undefined,
    images: []
  };
};

// Image management helpers
export const organizeImagesBySection = (images: TourImage[]) => {
  return {
    banner: images.filter(img => img.section === 'banner' && img.isActive).sort((a, b) => a.order - b.order),
    overview: images.filter(img => img.section === 'overview' && img.isActive).sort((a, b) => a.order - b.order),
    itinerary: images.filter(img => img.section === 'itinerary' && img.isActive).sort((a, b) => a.order - b.order),
    gallery: images.filter(img => img.section === 'gallery' && img.isActive).sort((a, b) => a.order - b.order)
  };
};

// Layout management helpers for the new 30-70 split
export const getOptimalImageLayout = (images: TourImage[], maxImages: number = 3): TourImage[] => {
  // For the new layout, we want to show rectangular images optimally
  return images.slice(0, maxImages);
};

export const generatePlaceholderImages = (section: string, count: number = 3): TourImage[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `placeholder-${section}-${index + 1}`,
    url: `https://via.placeholder.com/400x200/e5e7eb/6b7280?text=Image+${index + 1}`,
    alt: `Placeholder ${section} image ${index + 1}`,
    caption: `Placeholder for ${section} section`,
    order: index,
    section: section as 'banner' | 'overview' | 'itinerary' | 'gallery',
    isActive: true
  }));
};

// Tour detail page content transformation
export const transformTourForDetailPage = (tour: Tour): Tour => {
  // Ensure tour has the required structure for the new detail page layout
  const transformedTour = { ...tour };

  // Ensure sections exist
  if (!transformedTour.sections || transformedTour.sections.length === 0) {
    transformedTour.sections = [
      createDefaultOverviewSection(tour),
      createDefaultItinerarySection()
    ];
  }

  // Simplify itinerary days for the new layout
  if (transformedTour.itineraryDays) {
    transformedTour.itineraryDays = transformedTour.itineraryDays.map(simplifyItineraryDay);
  }

  // Ensure images are organized by section
  if (!transformedTour.images || transformedTour.images.length === 0) {
    transformedTour.images = [
      ...generatePlaceholderImages('overview', 3),
      ...generatePlaceholderImages('itinerary', 3)
    ];
  }

  return transformedTour;
};

// Admin panel helper for bulk operations
export const bulkUpdateItineraryDays = (days: ItineraryDay[], updates: Partial<ItineraryDay>): ItineraryDay[] => {
  return days.map(day => ({ ...day, ...updates }));
};

export const reorderSectionsByDragDrop = (sections: TourSection[], dragIndex: number, dropIndex: number): TourSection[] => {
  const reorderedSections = [...sections];
  const draggedSection = reorderedSections[dragIndex];
  
  reorderedSections.splice(dragIndex, 1);
  reorderedSections.splice(dropIndex, 0, draggedSection);
  
  return reorderedSections.map((section, index) => ({
    ...section,
    order: index
  }));
};

// Content validation for admin panel
export const validateTourSection = (section: TourSection): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!section.title?.trim()) errors.push('Section title is required');
  if (section.type === 'overview' && !section.content?.trim()) {
    errors.push('Overview section must have content');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateItineraryDay = (day: ItineraryDay): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!day.title?.trim()) errors.push('Day title is required');
  if (day.dayNumber < 1) errors.push('Day number must be at least 1');
  if (!day.description?.trim()) errors.push('Day description is required for the simplified layout');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// SEO and meta helpers for admin panel
export const generateTourSEOData = (tour: Tour) => {
  return {
    title: tour.seoTitle || `${tour.title} | Tour Agency`,
    description: tour.seoDescription || tour.description,
    keywords: tour.seoKeywords || [tour.category, 'tour', 'travel', 'india'],
    canonicalUrl: `/tours/${tour.slug}`,
    ogImage: tour.images?.find(img => img.section === 'banner')?.url || tour.image
  };
};

// Export helpers for admin backup/restore
export const exportTourForBackup = (tour: Tour) => {
  return {
    ...tour,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
};

export const importTourFromBackup = (backupData: any): Tour => {
  // Basic validation and cleanup for imported tour data
  const { exportedAt, version, ...tourData } = backupData;
  
  return {
    ...tourData,
    importedAt: new Date().toISOString(),
    id: `imported-${Date.now()}`,
    slug: `${tourData.slug}-imported`,
    isPublished: false // Always import as draft
  };
};

// SEO utilities for admin panel
export const generateSEOData = (tour: Tour) => {
  return {
    title: tour.seoTitle || `${tour.title} | Tour Agency`,
    description: tour.seoDescription || tour.description,
    keywords: tour.seoKeywords || [tour.category, 'tour', 'travel', 'vacation'],
    canonical: `/tours/${tour.slug}`,
    openGraph: {
      title: tour.seoTitle || tour.title,
      description: tour.seoDescription || tour.description,
      image: tour.image,
      type: 'website'
    }
  };
};

// Admin panel data transformation utilities
export const transformTourForAdmin = (tour: Tour) => {
  return {
    ...tour,
    overviewImages: getOverviewImages(tour),
    itineraryImages: getItineraryImages(tour),
    structuredItinerary: getStructuredItinerary(tour),
    overviewContent: getOverviewContent(tour),
    seoData: generateSEOData(tour)
  };
};

export const transformAdminDataForTour = (adminData: any): Partial<Tour> => {
  // Transform admin panel data back to tour format
  return {
    ...adminData,
    updatedAt: new Date().toISOString()
  };
};