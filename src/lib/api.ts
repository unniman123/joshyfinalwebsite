// API functions for tour agency website
// TODO: Replace with actual Supabase integration

export interface TourSummary {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in days
  price?: string;
  image: string;
  slug: string;
}

export interface Tour extends TourSummary {
  detailedContent: string;
  images: string[];
  itinerary: string;
  inclusions: string[];
  exclusions: string[];
  mapLocation?: {
    lat: number;
    lng: number;
  };
}

export interface TourFilters {
  destination?: string[];
  category?: string[];
  duration?: string;
  budget?: string;
}

/**
 * Fetch all tours from the database
 * TODO: Fetch all tours from Supabase and pass to components
 */
export async function getAllTours(filters?: TourFilters): Promise<TourSummary[]> {
  // Placeholder implementation - replace with actual Supabase query
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  const mockTours: TourSummary[] = [
    {
      id: "1",
      title: "Kerala Backwaters Explorer",
      description: "Experience the serene beauty of Kerala's famous backwaters with traditional houseboat stays and authentic local cuisine.",
      category: "Kerala Tours",
      duration: 5,
      price: "₹45,000",
      image: "/placeholder.svg",
      slug: "kerala-backwaters-explorer"
    },
    {
      id: "2", 
      title: "Royal Rajasthan Heritage",
      description: "Journey through magnificent palaces, historic forts, and vibrant markets in the land of maharajas.",
      category: "Heritage Tours",
      duration: 7,
      price: "₹65,000",
      image: "/placeholder.svg",
      slug: "royal-rajasthan-heritage"
    },
    {
      id: "3",
      title: "Ayurveda Wellness Retreat",
      description: "Rejuvenate your body and mind with authentic Ayurvedic treatments in peaceful Kerala settings.",
      category: "Ayurveda",
      duration: 10,
      price: "₹85,000", 
      image: "/placeholder.svg",
      slug: "ayurveda-wellness-retreat"
    },
    {
      id: "4",
      title: "Golden Triangle Classic",
      description: "Discover India's most iconic destinations: Delhi, Agra, and Jaipur in this comprehensive tour.",
      category: "Discover India",
      duration: 6,
      price: "₹55,000",
      image: "/placeholder.svg",
      slug: "golden-triangle-classic"
    }
  ];

  // TODO: Apply filters when connected to Supabase
  return mockTours;
}

/**
 * Get tour by slug for detail page
 * TODO: Fetch tour data via getTourBySlug(slug) from Supabase
 */
export async function getTourBySlug(slug: string): Promise<Tour | null> {
  // Placeholder implementation - replace with actual Supabase query
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  const mockTour: Tour = {
    id: "1",
    title: "Kerala Backwaters Explorer",
    description: "Experience the serene beauty of Kerala's famous backwaters with traditional houseboat stays and authentic local cuisine.",
    detailedContent: "TODO: Populate with detailed tour description from Supabase",
    category: "Kerala Tours",
    duration: 5,
    price: "₹45,000",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    slug: "kerala-backwaters-explorer",
    itinerary: "TODO: Populate with detailed itinerary from Supabase",
    inclusions: ["TODO: Populate with inclusions from Supabase"],
    exclusions: ["TODO: Populate with exclusions from Supabase"],
    mapLocation: { lat: 9.9312, lng: 76.2673 }
  };

  return slug === mockTour.slug ? mockTour : null;
}

/**
 * Get related tours for tour detail page
 * TODO: Fetch related tours from Supabase based on category or tags
 */
export async function getRelatedTours(slug: string): Promise<Tour[]> {
  // Placeholder implementation - replace with actual Supabase query
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  
  const mockRelatedTours: Tour[] = [
    {
      id: "2",
      title: "Royal Rajasthan Heritage",
      description: "Journey through magnificent palaces, historic forts, and vibrant markets.",
      detailedContent: "TODO: Populate with detailed tour description from Supabase",
      category: "Heritage Tours",
      duration: 7,
      price: "₹65,000",
      image: "/placeholder.svg",
      images: ["/placeholder.svg", "/placeholder.svg"],
      slug: "royal-rajasthan-heritage",
      itinerary: "TODO: Populate with detailed itinerary from Supabase",
      inclusions: ["TODO: Populate with inclusions from Supabase"],
      exclusions: ["TODO: Populate with exclusions from Supabase"],
      mapLocation: { lat: 26.9124, lng: 75.7873 }
    }
  ];

  return mockRelatedTours;
}

/**
 * Get available tour categories for filtering
 * TODO: Fetch categories from Supabase tours table
 */
export async function getTourCategories(): Promise<string[]> {
  // Placeholder implementation
  return [
    "Kerala Tours",
    "Discover India", 
    "Ayurveda",
    "Heritage Tours",
    "Global Holidays"
  ];
}