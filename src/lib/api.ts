// API functions for tour agency website
// TODO: Replace with actual Supabase integration

// Import placeholder images
import keralaTourCard from "@/assets/tour-kerala-backwaters-card.jpg";
import rajasthanTourCard from "@/assets/tour-heritage-palace.jpg";
import ayurvedaTourCard from "@/assets/tour-ayurveda-wellness.jpg";
import goldenTriangleTourCard from "@/assets/tour-golden-triangle.jpg";
import galleryKerala1 from "@/assets/gallery-kerala-1.jpg";
import galleryKerala2 from "@/assets/gallery-kerala-2.jpg";
import galleryRajasthan1 from "@/assets/gallery-rajasthan-1.jpg";
import galleryAyurveda1 from "@/assets/gallery-ayurveda-1.jpg";
import galleryGoldenTriangle1 from "@/assets/gallery-golden-triangle-1.jpg";
import galleryGoldenTriangle2 from "@/assets/gallery-golden-triangle-2.jpg";
import heroKeralBackwaters from "@/assets/hero-kerala-backwaters.jpg";
import heroRajasthanPalace from "@/assets/hero-rajasthan-palace.jpg";
import heroAyurvedaSpa from "@/assets/hero-ayurveda-spa.jpg";

export interface TourSummary {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in days
  price?: string;
  image: string;
  slug: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Enhanced interfaces for admin panel integration
export interface TourImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  order: number;
  section: 'banner' | 'overview' | 'itinerary' | 'gallery';
  isActive: boolean;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  title: string;
  description?: string;
  activities: ItineraryActivity[];
  highlights: string[];
  meals: string[];
  accommodation?: string;
  duration?: string;
  location?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  images: string[];
  isActive: boolean;
  order: number;
}

export interface ItineraryActivity {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  activityType: 'arrival' | 'departure' | 'sightseeing' | 'temple' | 'nature' | 'cruise' | 'city' | 'cultural' | 'adventure' | 'default';
  isIncluded: boolean;
  order: number;
}

export interface TourSection {
  id: string;
  type: 'overview' | 'itinerary' | 'inclusions' | 'gallery' | 'map';
  title: string;
  content?: string;
  isVisible: boolean;
  order: number;
  settings?: Record<string, any>;
}

export interface Tour extends TourSummary {
  // Content sections - fully admin controllable
  sections: TourSection[];

  // Legacy fields for backward compatibility
  detailedContent: string;
  itinerary: string;
  inclusions: string[];
  exclusions: string[];

  // Enhanced structured data
  images: TourImage[];
  itineraryDays: ItineraryDay[];

  // Admin metadata
  isPublished: boolean;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  // Location and mapping
  mapLocation?: {
    lat: number;
    lng: number;
  };

  // Pricing and booking
  pricing?: {
    basePrice: number;
    currency: string;
    discountPrice?: number;
    priceIncludes: string[];
    priceExcludes: string[];
  };

  // Tour settings
  settings?: {
    maxGroupSize?: number;
    minAge?: number;
    physicalRating?: number;
    bestTimeToVisit?: string[];
    languages?: string[];
    cancellationPolicy?: string;
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
      image: keralaTourCard,
      slug: "kerala-backwaters-explorer"
    },
    {
      id: "2",
      title: "Royal Rajasthan Heritage",
      description: "Journey through magnificent palaces, historic forts, and vibrant markets in the land of maharajas.",
      category: "Heritage Tours",
      duration: 7,
      price: "₹65,000",
      image: rajasthanTourCard,
      slug: "royal-rajasthan-heritage"
    },
    {
      id: "3",
      title: "Ayurveda Wellness Retreat",
      description: "Rejuvenate your body and mind with authentic Ayurvedic treatments in peaceful Kerala settings.",
      category: "Ayurveda",
      duration: 10,
      price: "₹85,000",
      image: ayurvedaTourCard,
      slug: "ayurveda-wellness-retreat"
    },
    {
      id: "4",
      title: "Golden Triangle Classic",
      description: "Discover India's most iconic destinations: Delhi, Agra, and Jaipur in this comprehensive tour.",
      category: "Discover India",
      duration: 6,
      price: "₹55,000",
      image: goldenTriangleTourCard,
      slug: "golden-triangle-classic"
    },
    {
      id: "5",
      title: "Ultimate India Experience",
      description: "A comprehensive 12-day journey showcasing the best of India's culture, heritage, and natural beauty.",
      category: "Discover India",
      duration: 12,
      price: "₹125,000",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
      slug: "ultimate-india-experience"
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

  const mockTours: { [key: string]: Tour } = {
    "kerala-backwaters-explorer": {
      id: "1",
      title: "Kerala Backwaters Explorer",
      description: "Experience the serene beauty of Kerala's famous backwaters with traditional houseboat stays and authentic local cuisine.",
      detailedContent: "Immerse yourself in the tranquil beauty of Kerala's backwaters on this unforgettable 5-day journey. Cruise through palm-fringed canals on traditional houseboats, witness local life along the waterways, and enjoy authentic Kerala cuisine prepared fresh on board. This comprehensive tour takes you through the most scenic waterways of Alleppey and Kumarakom, offering glimpses of traditional village life, exotic bird watching opportunities, and authentic culinary experiences that showcase the rich flavors of Kerala cuisine.",
      category: "Kerala Tours",
      duration: 5,
      price: "₹45,000",
      image: keralaTourCard,
      images: [
        heroKeralBackwaters,
        galleryKerala1,
        galleryKerala2,
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80"
      ],
      slug: "kerala-backwaters-explorer",
      itinerary: "Day 1: Arrival in Kochi & Backwater Introduction - Airport pickup and transfer to heritage hotel, Welcome drink and orientation session, Evening stroll through Fort Kochi historic district, Traditional Kathakali dance performance with dinner\nDay 2: Houseboat Cruise & Village Experience - Check-in to traditional Kerala houseboat, Cruise through palm-fringed canals and waterways, Visit local village and interact with fishermen families, Sunset viewing from houseboat deck, Traditional fishing demonstration and fresh seafood dinner\nDay 3: Kumarakom Bird Sanctuary & Nature Walk - Early morning bird watching expedition, Guided nature walk through mangrove sanctuary, Canoe ride through narrow canals and hidden waterways, Visit to local toddy shop and spice gardens, Relaxing Ayurvedic massage session\nDay 4: Cultural Immersion & Cooking Class - Visit to ancient temple and morning prayer ceremony, Traditional cooking class with local family, Explore bustling local markets and spice shops, Handicraft workshop and pottery making experience, Evening cultural program with folk music\nDay 5: Adventure & Photography Expedition - Sunrise photography session over backwaters, Bamboo rafting adventure through scenic routes, Trek through cardamom and pepper plantations, Visit to elephant rehabilitation center, Sunset viewing at scenic hilltop viewpoint with farewell dinner",
      inclusions: ["Houseboat accommodation", "All meals", "Local guide", "Transportation"],
      exclusions: ["Airfare", "Personal expenses", "Tips"],
      mapLocation: { lat: 9.9312, lng: 76.2673 }
    },
    "royal-rajasthan-heritage": {
      id: "2",
      title: "Royal Rajasthan Heritage",
      description: "Journey through magnificent palaces, historic forts, and vibrant markets in the land of maharajas.",
      detailedContent: "Step into the royal world of Rajasthan with this comprehensive 7-day heritage tour. Explore majestic palaces, imposing forts, and experience the rich culture and traditions of the land of kings. From the pink city of Jaipur to the blue city of Jodhpur, witness the architectural marvels that tell stories of valor, romance, and royal grandeur. Experience luxury heritage hotels, traditional Rajasthani cuisine, and vibrant local markets filled with handicrafts, textiles, and precious gems.",
      category: "Heritage Tours",
      duration: 7,
      price: "₹65,000",
      image: rajasthanTourCard,
      images: [
        heroRajasthanPalace,
        galleryRajasthan1,
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&auto=format&q=80"
      ],
      slug: "royal-rajasthan-heritage",
      itinerary: "Day 1: Arrival in Jaipur, check-in at heritage hotel\nDay 2: City Palace, Hawa Mahal, and Amber Fort exploration\nDay 3: Travel to Udaipur, evening boat ride on Lake Pichola\nDay 4: City Palace Udaipur, Jagdish Temple, and local markets\nDay 5: Travel to Jodhpur, Mehrangarh Fort and blue city tour\nDay 6: Travel to Jaisalmer, golden city exploration and camel safari\nDay 7: Morning at Jaisalmer Fort, departure to Jaipur airport",
      inclusions: ["Heritage hotel stays", "All meals", "Local guide", "Transportation", "Entry fees"],
      exclusions: ["Airfare", "Personal expenses", "Tips", "Camera fees"],
      mapLocation: { lat: 26.9124, lng: 75.7873 }
    },
    "ayurveda-wellness-retreat": {
      id: "3",
      title: "Ayurveda Wellness Retreat",
      description: "Rejuvenate your body and mind with authentic Ayurvedic treatments in peaceful Kerala settings.",
      detailedContent: "Discover the ancient healing science of Ayurveda in this transformative 10-day wellness retreat. Experience personalized treatments, yoga sessions, and meditation in serene natural surroundings. Our expert Ayurvedic doctors will create a customized treatment plan based on your individual constitution and health needs. Enjoy organic vegetarian meals, daily yoga and meditation sessions, and traditional therapies like Panchakarma, Abhyanga, and Shirodhara in a peaceful resort setting surrounded by lush tropical gardens.",
      category: "Ayurveda",
      duration: 10,
      price: "₹85,000",
      image: ayurvedaTourCard,
      images: [
        heroAyurvedaSpa,
        galleryAyurveda1,
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&auto=format&q=80"
      ],
      slug: "ayurveda-wellness-retreat",
      itinerary: "Day 1: Arrival and initial consultation with Ayurvedic doctor\nDay 2: Body constitution analysis and personalized treatment plan\nDay 3: Begin Panchakarma treatments and daily yoga sessions\nDay 4: Abhyanga massage therapy and meditation workshops\nDay 5: Shirodhara treatment and herbal steam baths\nDay 6: Traditional Kerala massage and cooking class\nDay 7: Yoga nidra sessions and nature walks\nDay 8: Advanced meditation techniques and lifestyle counseling\nDay 9: Final treatments and wellness plan discussion\nDay 10: Departure with personalized wellness guide",
      inclusions: ["Ayurvedic resort stay", "All treatments", "Yoga sessions", "Organic meals", "Consultation"],
      exclusions: ["Airfare", "Personal expenses", "Additional treatments"],
      mapLocation: { lat: 10.8505, lng: 76.2711 }
    },
    "golden-triangle-classic": {
      id: "4",
      title: "Golden Triangle Classic",
      description: "Discover India's most iconic destinations: Delhi, Agra, and Jaipur in this comprehensive tour.",
      detailedContent: "Experience India's most famous tourist circuit covering Delhi, Agra, and Jaipur. Visit the Taj Mahal, explore Mughal architecture, and discover the pink city of Jaipur in this classic 6-day journey. This tour combines the best of India's historical heritage, from the bustling streets of Old Delhi to the romantic marble monument of the Taj Mahal, and the royal palaces of Jaipur. Each city offers unique experiences, from street food tours in Delhi to sunrise at the Taj Mahal and elephant rides at Amber Fort.",
      category: "Discover India",
      duration: 6,
      price: "₹55,000",
      image: goldenTriangleTourCard,
      images: [
        goldenTriangleTourCard,
        galleryGoldenTriangle1,
        galleryGoldenTriangle2,
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop"
      ],
      slug: "golden-triangle-classic",
      itinerary: "Day 1: Delhi arrival, Old Delhi tour including Red Fort and Jama Masjid\nDay 2: New Delhi sightseeing, travel to Agra in evening\nDay 3: Sunrise at Taj Mahal, Agra Fort, travel to Jaipur\nDay 4: Jaipur city tour - City Palace, Hawa Mahal, Jantar Mantar\nDay 5: Amber Fort with elephant ride, local markets and handicraft shopping\nDay 6: Morning at leisure, return to Delhi, departure",
      inclusions: ["Hotel accommodation", "All meals", "Local guide", "Transportation", "Entry fees"],
      exclusions: ["Airfare", "Personal expenses", "Tips"],
      mapLocation: { lat: 28.6139, lng: 77.2090 }
    },
    "ultimate-india-experience": {
      id: "5",
      title: "Ultimate India Experience",
      description: "A comprehensive 12-day journey showcasing the best of India's culture, heritage, and natural beauty.",
      detailedContent: "Embark on the ultimate Indian adventure that takes you through the most iconic destinations, hidden gems, and cultural experiences that India has to offer. This carefully curated 12-day journey combines the classic Golden Triangle with the serene backwaters of Kerala, the royal heritage of Rajasthan, and the spiritual essence of Varanasi. Experience luxury accommodations, authentic local cuisine, traditional performances, and immersive cultural interactions that will create memories to last a lifetime.",
      category: "Discover India",
      duration: 12,
      price: "₹125,000",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=800&h=600&fit=crop"
      ],
      slug: "ultimate-india-experience",
      itinerary: "Day 1: Arrival in Delhi, welcome dinner and cultural orientation\nDay 2: Old and New Delhi exploration, Red Fort and India Gate\nDay 3: Travel to Agra, sunset at Taj Mahal\nDay 4: Sunrise at Taj Mahal, Agra Fort, travel to Jaipur\nDay 5: Jaipur city tour - City Palace, Hawa Mahal, Amber Fort\nDay 6: Jaipur to Udaipur, evening boat ride on Lake Pichola\nDay 7: Udaipur city tour, City Palace and Jagdish Temple\nDay 8: Flight to Cochin, Kerala backwaters introduction\nDay 9: Alleppey houseboat experience and village visits\nDay 10: Kumarakom bird sanctuary and spice plantation\nDay 11: Flight to Varanasi, evening Ganga Aarti ceremony\nDay 12: Morning boat ride on Ganges, departure",
      inclusions: ["Luxury hotel accommodation", "All meals", "Private guide", "Transportation", "Domestic flights", "Entry fees", "Cultural performances"],
      exclusions: ["International airfare", "Personal expenses", "Tips", "Travel insurance"],
      mapLocation: { lat: 28.6139, lng: 77.2090 }
    }
  };

  return mockTours[slug] || null;
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
      detailedContent: "Step into the royal world of Rajasthan with this comprehensive 7-day heritage tour.",
      category: "Heritage Tours",
      duration: 7,
      price: "₹65,000",
      image: rajasthanTourCard,
      images: [heroRajasthanPalace, galleryRajasthan1],
      slug: "royal-rajasthan-heritage",
      itinerary: "Day 1: Arrival in Jaipur\nDay 2: City Palace and Amber Fort\nDay 3: Travel to Udaipur",
      inclusions: ["Heritage hotel stays", "All meals", "Local guide"],
      exclusions: ["Airfare", "Personal expenses", "Tips"],
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