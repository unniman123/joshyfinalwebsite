// Admin panel utility functions for tour management
import { Tour, TourImage, ItineraryDay, TourSection, ItineraryActivity } from './api';

// Image management utilities
export const getImagesBySection = (tour: Tour, section: 'banner' | 'overview' | 'itinerary' | 'gallery'): TourImage[] => {
  return tour.images
    .filter(img => img.section === section && img.isActive)
    .sort((a, b) => a.order - b.order);
};

// @deprecated Overview sections no longer use images as of latest update
// This function is maintained for backward compatibility only
export const getOverviewImages = (tour: Tour): string[] => {
  // Return empty array since overview sections no longer display images
  return [];
};

export const getItineraryImages = (tour: Tour): string[] => {
  // Note: Itinerary images no longer display captions in UI (as of latest update)
  // Captions are preserved in data but not shown to users
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
  // Simplified version with only title and description for the single text box layout
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

// Image display configuration for different sections
export const getImageDisplayConfig = (section: 'overview' | 'itinerary' | 'gallery') => {
  return {
    overview: {
      showImages: false, // Completely removed as of latest update
      showCaptions: false
    },
    itinerary: {
      showImages: true,
      showCaptions: false // Removed as of latest update - captions preserved in data but not displayed
    },
    gallery: {
      showImages: true,
      showCaptions: true // Gallery section still shows captions
    }
  }[section];
};

// Layout management helpers for full-width overview and 10-90 itinerary split
export const getOptimalImageLayout = (images: TourImage[], maxImages: number = 3): TourImage[] => {
  // For overview: no images needed (full-width content)
  // For itinerary: show images optimally in 10-15% space
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

  // Ensure images are organized by section (overview no longer needs images)
  if (!transformedTour.images || transformedTour.images.length === 0) {
    transformedTour.images = [
      // Overview sections no longer use images - only itinerary needs them
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
    overviewImages: [], // Overview no longer uses images
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

// Homepage Configuration Utilities
export interface HomepageAdminConfig {
  heroBanner: {
    searchButtonColor: { primary: string; hover: string };
    contentPosition: { paddingTop: string };
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    isVisible: boolean;
  };
  tourOffers: {
    sectionTitle: string;
    showInquiryForm: boolean;
    formTitle: string;
    formFields: {
      showMessage: boolean;
      showDate: boolean;
      showDestination: boolean;
      messagePlaceholder: string;
    };
    isVisible: boolean;
  };
  dayOutPackages: {
    sectionTitle: string;
    packages: Array<{
      id: string;
      title: string;
      image: string;
      showDescription: boolean;
      showExploreButton: boolean;
      isActive: boolean;
    }>;
    formConfig: {
      phoneFieldPlaceholder: string;
      destinationFieldLabel: string;
    };
    isVisible: boolean;
  };
}

// Get current homepage configuration based on implemented changes
export const getCurrentHomepageConfig = (): HomepageAdminConfig => {
  return {
    heroBanner: {
      searchButtonColor: {
        primary: 'bg-blue-600',
        hover: 'hover:bg-blue-700'
      },
      contentPosition: {
        paddingTop: 'pt-8'
      },
      title: 'Discover Amazing Tours',
      subtitle: 'Explore the best travel experiences across India and beyond',
      searchPlaceholder: 'Search destinations, tours, or activities...',
      isVisible: true
    },
    tourOffers: {
      sectionTitle: 'Our Top Selling Packages',
      showInquiryForm: true,
      formTitle: 'quick inquiry',
      formFields: {
        showMessage: true,
        showDate: false,
        showDestination: false,
        messagePlaceholder: 'Describe your preferred destination and dates'
      },
      isVisible: true
    },
    dayOutPackages: {
      sectionTitle: 'Day Out Packages',
      packages: [
        {
          id: 'backwater-cruise',
          title: 'Backwater Day Cruise',
          image: '/assets/kerala-tour-card.jpg',
          showDescription: false,
          showExploreButton: false,
          isActive: true
        },
        {
          id: 'spice-garden',
          title: 'Spice Garden Visit',
          image: '/assets/hero-ayurveda-spa.jpg',
          showDescription: false,
          showExploreButton: false,
          isActive: true
        },
        {
          id: 'beach-experience',
          title: 'Beach Day Experience',
          image: '/assets/hero-rajasthan-palace.jpg',
          showDescription: false,
          showExploreButton: false,
          isActive: true
        },
        {
          id: 'hill-station',
          title: 'Hill Station Escape',
          image: '/assets/tour-golden-triangle.jpg',
          showDescription: false,
          showExploreButton: false,
          isActive: true
        },
        {
          id: 'cultural-village',
          title: 'Cultural Village Tour',
          image: '/assets/kerala-tour-card.jpg',
          showDescription: false,
          showExploreButton: false,
          isActive: true
        }
      ],
      formConfig: {
        phoneFieldPlaceholder: '',
        destinationFieldLabel: 'Destination'
      },
      isVisible: true
    }
  };
};

// Validate homepage configuration
export const validateHomepageConfig = (config: HomepageAdminConfig): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Hero banner validation
  if (!config.heroBanner.title.trim()) {
    errors.push('Hero banner title is required');
  }
  if (!config.heroBanner.searchButtonColor.primary) {
    errors.push('Search button primary color is required');
  }
  if (!config.heroBanner.searchButtonColor.hover) {
    errors.push('Search button hover color is required');
  }

  // Tour offers validation
  if (config.tourOffers.isVisible && !config.tourOffers.sectionTitle.trim()) {
    errors.push('Tour offers section title is required when section is visible');
  }
  if (config.tourOffers.showInquiryForm && !config.tourOffers.formTitle.trim()) {
    errors.push('Tour inquiry form title is required when form is enabled');
  }

  // Day out packages validation
  if (config.dayOutPackages.isVisible) {
    if (!config.dayOutPackages.sectionTitle.trim()) {
      errors.push('Day out packages section title is required when section is visible');
    }
    
    const activePackages = config.dayOutPackages.packages.filter(p => p.isActive);
    if (activePackages.length === 0) {
      errors.push('At least one day out package must be active when section is visible');
    }
    
    const packagesWithoutTitles = activePackages.filter(p => !p.title.trim());
    if (packagesWithoutTitles.length > 0) {
      errors.push('All active day out packages must have titles');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Transform homepage config for component props
export const transformHomepageConfigForComponents = (config: HomepageAdminConfig) => {
  return {
    heroBannerProps: {
      title: config.heroBanner.title,
      subtitle: config.heroBanner.subtitle,
      searchPlaceholder: config.heroBanner.searchPlaceholder,
      searchButtonClassName: `px-6 py-3 ${config.heroBanner.searchButtonColor.primary} ${config.heroBanner.searchButtonColor.hover} text-white font-medium rounded-lg transition-colors`,
      contentClassName: `relative z-20 h-full flex flex-col justify-center items-center px-4 ${config.heroBanner.contentPosition.paddingTop}`,
      isVisible: config.heroBanner.isVisible
    },
    tourOffersProps: {
      sectionTitle: config.tourOffers.sectionTitle,
      formConfig: {
        title: config.tourOffers.formTitle,
        showMessage: config.tourOffers.formFields.showMessage,
        showDate: config.tourOffers.formFields.showDate,
        showDestination: config.tourOffers.formFields.showDestination,
        messagePlaceholder: config.tourOffers.formFields.messagePlaceholder
      },
      showInquiryForm: config.tourOffers.showInquiryForm,
      isVisible: config.tourOffers.isVisible
    },
    dayOutPackagesProps: {
      sectionTitle: config.dayOutPackages.sectionTitle,
      packages: config.dayOutPackages.packages.filter(p => p.isActive),
      formConfig: config.dayOutPackages.formConfig,
      isVisible: config.dayOutPackages.isVisible
    }
  };
};

// Generate CSS classes for dynamic styling
export const generateHomepageCSS = (config: HomepageAdminConfig): string => {
  const cssRules: string[] = [];

  // Hero banner search button styling
  if (config.heroBanner.searchButtonColor.primary !== 'bg-blue-600') {
    cssRules.push(`
      .hero-search-button {
        @apply ${config.heroBanner.searchButtonColor.primary} ${config.heroBanner.searchButtonColor.hover};
      }
    `);
  }

  // Content positioning
  if (config.heroBanner.contentPosition.paddingTop !== 'pt-8') {
    cssRules.push(`
      .hero-content-overlay {
        @apply ${config.heroBanner.contentPosition.paddingTop};
      }
    `);
  }

  return cssRules.join('\n');
};

// Homepage configuration versioning
export const createHomepageConfigVersion = (config: HomepageAdminConfig) => {
  return {
    ...config,
    version: generateConfigVersion(),
    createdAt: new Date().toISOString(),
    changes: detectConfigChanges(config)
  };
};

const generateConfigVersion = (): string => {
  const now = new Date();
  return `v${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}.${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
};

const detectConfigChanges = (config: HomepageAdminConfig): string[] => {
  const defaultConfig = getCurrentHomepageConfig();
  const changes: string[] = [];

  // Detect hero banner changes
  if (config.heroBanner.title !== defaultConfig.heroBanner.title) {
    changes.push('Hero banner title modified');
  }
  if (config.heroBanner.searchButtonColor.primary !== defaultConfig.heroBanner.searchButtonColor.primary) {
    changes.push('Search button color changed');
  }
  if (config.heroBanner.contentPosition.paddingTop !== defaultConfig.heroBanner.contentPosition.paddingTop) {
    changes.push('Hero content positioning adjusted');
  }

  // Detect tour offers changes
  if (config.tourOffers.formFields.showMessage !== defaultConfig.tourOffers.formFields.showMessage) {
    changes.push('Tour inquiry form fields modified');
  }

  // Detect day out packages changes
  if (config.dayOutPackages.formConfig.destinationFieldLabel !== defaultConfig.dayOutPackages.formConfig.destinationFieldLabel) {
    changes.push('Day out packages form labels updated');
  }
  
  const activePackageCount = config.dayOutPackages.packages.filter(p => p.isActive).length;
  const defaultActiveCount = defaultConfig.dayOutPackages.packages.filter(p => p.isActive).length;
  if (activePackageCount !== defaultActiveCount) {
    changes.push('Day out packages configuration changed');
  }

  return changes;
};

// Export configuration for backup
export const exportHomepageConfig = (config: HomepageAdminConfig) => {
  const exportData = {
    ...config,
    exportedAt: new Date().toISOString(),
    version: '1.0',
    metadata: {
      source: 'wanderwise-admin',
      type: 'homepage-configuration',
      implementedChanges: [
        'Hero banner search button color changed to blue',
        'Hero banner content positioned slightly down',
        'Day out packages explore button removed',
        'Day out packages description hidden',
        'Destination field renamed in day out form',
        'Tour inquiry form simplified to message field',
        'Phone placeholders removed from both forms'
      ]
    }
  };

  return new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json'
  });
};

// Import and validate configuration
export const importHomepageConfig = async (file: File): Promise<HomepageAdminConfig> => {
  try {
    const text = await file.text();
    const importedData = JSON.parse(text);

    // Validate structure
    if (!importedData.heroBanner || !importedData.tourOffers || !importedData.dayOutPackages) {
      throw new Error('Invalid homepage configuration file format');
    }

    // Extract configuration
    const config: HomepageAdminConfig = {
      heroBanner: importedData.heroBanner,
      tourOffers: importedData.tourOffers,
      dayOutPackages: importedData.dayOutPackages
    };

    // Validate configuration
    const validation = validateHomepageConfig(config);
    if (!validation.isValid) {
      throw new Error(`Configuration validation failed: ${validation.errors.join(', ')}`);
    }

    return config;
  } catch (error) {
    throw new Error(`Failed to import homepage configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};