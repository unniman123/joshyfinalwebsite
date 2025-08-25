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