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
  order?: number;
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

  // Enhanced structured data for admin control
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

  // Admin control flags
  adminSettings?: {
    allowPublicBooking: boolean;
    showPricing: boolean;
    showInquiryForm: boolean;
    enableReviews: boolean;
    featuredTour: boolean;
    customCss?: string;
    customJs?: string;
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
      duration: 5,
      price: "₹65,000",
      image: rajasthanTourCard,
      slug: "royal-rajasthan-heritage"
    },
    {
      id: "3",
      title: "Ayurveda Wellness Retreat",
      description: "Rejuvenate your body and mind with authentic Ayurvedic treatments in peaceful Kerala settings.",
      category: "Ayurveda",
      duration: 5,
      price: "₹85,000",
      image: ayurvedaTourCard,
      slug: "ayurveda-wellness-retreat"
    },
    {
      id: "4",
      title: "Golden Triangle Classic",
      description: "Discover India's most iconic destinations: Delhi, Agra, and Jaipur in this comprehensive tour.",
      category: "Discover India",
      duration: 5,
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
      detailedContent: "Immerse yourself in the tranquil beauty of Kerala's backwaters on this unforgettable 5-day journey. Cruise through palm-fringed canals on traditional houseboats, witness local life along the waterways, and enjoy authentic Kerala cuisine prepared fresh on board.",
      category: "Kerala Tours",
      duration: 5,
      price: "₹45,000",
      image: keralaTourCard,
      images: [
        { id: "1", url: heroKeralBackwaters, alt: "Kerala Backwaters Sunset", caption: "Serene backwaters at sunset", order: 1, section: "overview", isActive: true },
        { id: "2", url: galleryKerala1, alt: "Traditional Houseboat", caption: "Traditional Kerala houseboat", order: 2, section: "overview", isActive: true },
        { id: "3", url: galleryKerala2, alt: "Village Life", caption: "Local village experience", order: 3, section: "overview", isActive: true },
        { id: "4", url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop", alt: "Backwater Cruise", caption: "Peaceful backwater cruise", order: 1, section: "itinerary", isActive: true },
        { id: "5", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop", alt: "Bird Sanctuary", caption: "Kumarakom bird sanctuary", order: 2, section: "itinerary", isActive: true },
        { id: "6", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop", alt: "Cultural Performance", caption: "Traditional Kathakali dance", order: 3, section: "itinerary", isActive: true },
        { id: "7", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop&auto=format&q=80", alt: "Spice Gardens", caption: "Local spice plantation", order: 4, section: "itinerary", isActive: true },
        { id: "8", url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80", alt: "Cooking Class", caption: "Traditional cooking experience", order: 5, section: "itinerary", isActive: true }
      ],
      slug: "kerala-backwaters-explorer",
      itinerary: "Day 1: Arrival and Welcome\nDay 2: Backwater Cruise Experience\nDay 3: Nature and Wildlife Exploration\nDay 4: Cultural Activities and Local Cuisine\nDay 5: Adventure and Departure",
      inclusions: ["Houseboat accommodation", "All meals", "Local guide", "Transportation"],
      exclusions: ["Airfare", "Personal expenses", "Tips"],
      mapLocation: { lat: 9.9312, lng: 76.2673 },
      sections: [
        {
          id: "overview-1",
          type: "overview",
          title: "Kerala Backwaters Explorer",
          content: "Immerse yourself in the tranquil beauty of Kerala's backwaters on this unforgettable 5-day journey. Cruise through palm-fringed canals on traditional houseboats, witness local life along the waterways, and enjoy authentic Kerala cuisine prepared fresh on board. This comprehensive tour takes you through the most scenic waterways of Alleppey and Kumarakom, offering glimpses of traditional village life, exotic bird watching opportunities, and authentic culinary experiences that showcase the rich flavors of Kerala cuisine.",
          isVisible: true,
          order: 1
        },
        {
          id: "itinerary-1",
          type: "itinerary",
          title: "Detailed Itinerary",
          content: "",
          isVisible: true,
          order: 2
        }
      ],
      itineraryDays: [
        {
          id: "day-1",
          dayNumber: 1,
          title: "Arrival in Kochi & Backwater Introduction",
          description: "Begin your Kerala adventure with a warm welcome in the historic port city of Kochi.",
          activities: [
            { id: "act-1", title: "Airport pickup and transfer to heritage hotel", description: "Comfortable transfer in AC vehicle", duration: "1 hour", activityType: "arrival", isIncluded: true, order: 1 },
            { id: "act-2", title: "Welcome drink and orientation session", description: "Traditional welcome with fresh coconut water", duration: "30 mins", activityType: "cultural", isIncluded: true, order: 2 },
            { id: "act-3", title: "Evening stroll through Fort Kochi historic district", description: "Explore colonial architecture and Chinese fishing nets", duration: "2 hours", activityType: "sightseeing", isIncluded: true, order: 3 },
            { id: "act-4", title: "Traditional Kathakali dance performance with dinner", description: "Authentic Kerala cultural performance", duration: "2 hours", activityType: "cultural", isIncluded: true, order: 4 }
          ],
          highlights: ["Historic Fort Kochi", "Chinese fishing nets", "Kathakali performance"],
          meals: ["Dinner"],
          accommodation: "Heritage Hotel in Fort Kochi",
          duration: "Full Day",
          location: "Kochi",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"],
          isActive: true,
          order: 1
        },
        {
          id: "day-2",
          dayNumber: 2,
          title: "Houseboat Cruise & Village Experience",
          description: "Experience the magic of Kerala's backwaters aboard a traditional houseboat.",
          activities: [
            { id: "act-5", title: "Check-in to traditional Kerala houseboat", description: "Board your floating home for the next 24 hours", duration: "30 mins", activityType: "cruise", isIncluded: true, order: 1 },
            { id: "act-6", title: "Cruise through palm-fringed canals and waterways", description: "Peaceful journey through scenic backwaters", duration: "4 hours", activityType: "cruise", isIncluded: true, order: 2 },
            { id: "act-7", title: "Visit local village and interact with fishermen families", description: "Authentic cultural exchange experience", duration: "2 hours", activityType: "cultural", isIncluded: true, order: 3 },
            { id: "act-8", title: "Sunset viewing from houseboat deck", description: "Magical sunset over the backwaters", duration: "1 hour", activityType: "sightseeing", isIncluded: true, order: 4 }
          ],
          highlights: ["Traditional houseboat stay", "Village interaction", "Backwater sunset"],
          meals: ["Breakfast", "Lunch", "Dinner"],
          accommodation: "Traditional Houseboat",
          duration: "Full Day",
          location: "Alleppey Backwaters",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop"],
          isActive: true,
          order: 2
        }
      ],
      isPublished: true,
      seoTitle: "Kerala Backwaters Tour - 5 Days Houseboat Experience",
      seoDescription: "Experience Kerala's serene backwaters with traditional houseboat stays, village visits, and authentic cuisine on this 5-day tour.",
      seoKeywords: ["Kerala backwaters", "houseboat tour", "Alleppey", "Kumarakom"],
      adminSettings: {
        allowPublicBooking: true,
        showPricing: true,
        showInquiryForm: true,
        enableReviews: true,
        featuredTour: true
      }
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
      itinerary: "Day 1: Arrival and Palace Introduction\nDay 2: Fort Exploration and Heritage Walk\nDay 3: Cultural Immersion and Local Markets\nDay 4: Desert Experience and Traditional Arts\nDay 5: Final Sightseeing and Departure",
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
      duration: 5,
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
      itinerary: "Day 1: Arrival and Wellness Consultation\nDay 2: Traditional Treatments and Yoga\nDay 3: Meditation and Therapeutic Sessions\nDay 4: Holistic Healing and Nature Activities\nDay 5: Final Treatments and Departure",
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
      duration: 5,
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