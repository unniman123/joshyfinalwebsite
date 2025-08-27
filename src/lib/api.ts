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
    showEnquiryForm: boolean;
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

// Simplified Destination interface for Top Destinations page (non-redirecting cards)
export interface DestinationSummary {
  id: string;
  title: string;
  shortDescription: string;
  state: string;
  region: string;
  image: string;
  isActive?: boolean;
  order?: number;
  famousFor?: string[];
  bestTimeToVisit?: string;
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
        showEnquiryForm: true,
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
        { id: "1", url: heroRajasthanPalace, alt: "Rajasthan Palace Heritage", caption: "Magnificent palace architecture", order: 1, section: "overview", isActive: true },
        { id: "2", url: galleryRajasthan1, alt: "Royal Rajasthan Fort", caption: "Historic fort complex", order: 2, section: "overview", isActive: true },
        { id: "3", url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop", alt: "Jaipur City Palace", caption: "Pink city palace complex", order: 3, section: "overview", isActive: true },
        { id: "4", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop", alt: "Rajasthan Architecture", caption: "Traditional Rajasthani architecture", order: 1, section: "itinerary", isActive: true },
        { id: "5", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop", alt: "Desert Landscape", caption: "Thar desert experience", order: 2, section: "itinerary", isActive: true },
        { id: "6", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", alt: "Royal Markets", caption: "Traditional bazaars and markets", order: 3, section: "itinerary", isActive: true },
        { id: "7", url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop", alt: "Cultural Performance", caption: "Folk dance and music", order: 4, section: "itinerary", isActive: true },
        { id: "8", url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop&auto=format&q=80", alt: "Amber Fort", caption: "Famous Amber Fort complex", order: 1, section: "gallery", isActive: true },
        { id: "9", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&auto=format&q=80", alt: "Heritage Hotel", caption: "Luxury heritage accommodation", order: 2, section: "gallery", isActive: true }
      ],
      slug: "royal-rajasthan-heritage",
      itinerary: "Day 1: Arrival and Palace Introduction\nDay 2: Fort Exploration and Heritage Walk\nDay 3: Cultural Immersion and Local Markets\nDay 4: Desert Experience and Traditional Arts\nDay 5: Final Sightseeing and Departure",
      inclusions: ["Heritage hotel stays", "All meals", "Local guide", "Transportation", "Entry fees"],
      exclusions: ["Airfare", "Personal expenses", "Tips", "Camera fees"],
      mapLocation: { lat: 26.9124, lng: 75.7873 },
      sections: [
        {
          id: "overview-2",
          type: "overview",
          title: "Royal Rajasthan Heritage",
          content: "Step into the royal world of Rajasthan with this comprehensive 7-day heritage tour. Explore majestic palaces, imposing forts, and experience the rich culture and traditions of the land of kings. From the pink city of Jaipur to the blue city of Jodhpur, witness the architectural marvels that tell stories of valor, romance, and royal grandeur. Experience luxury heritage hotels, traditional Rajasthani cuisine, and vibrant local markets filled with handicrafts, textiles, and precious gems.",
          isVisible: true,
          order: 1
        },
        {
          id: "itinerary-2",
          type: "itinerary",
          title: "Detailed Itinerary",
          content: "",
          isVisible: true,
          order: 2
        }
      ],
      itineraryDays: [
        {
          id: "day-1-raj",
          dayNumber: 1,
          title: "Arrival in Jaipur & Palace Introduction",
          description: "Begin your royal Rajasthan journey with a warm welcome in the pink city of Jaipur.",
          activities: [
            { id: "act-raj-1", title: "Airport pickup and transfer to heritage hotel", description: "Comfortable transfer in luxury vehicle", duration: "1 hour", activityType: "arrival", isIncluded: true, order: 1 },
            { id: "act-raj-2", title: "Welcome drink and royal orientation session", description: "Traditional Rajasthani welcome with refreshments", duration: "30 mins", activityType: "cultural", isIncluded: true, order: 2 },
            { id: "act-raj-3", title: "Evening visit to City Palace complex", description: "Explore the magnificent royal palace", duration: "2 hours", activityType: "sightseeing", isIncluded: true, order: 3 },
            { id: "act-raj-4", title: "Traditional Rajasthani dinner with folk performance", description: "Authentic cuisine with cultural entertainment", duration: "2 hours", activityType: "cultural", isIncluded: true, order: 4 }
          ],
          highlights: ["City Palace", "Heritage Hotel", "Folk Performance"],
          meals: ["Dinner"],
          accommodation: "Heritage Palace Hotel in Jaipur",
          duration: "Full Day",
          location: "Jaipur",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop"],
          isActive: true,
          order: 1
        },
        {
          id: "day-2-raj",
          dayNumber: 2,
          title: "Fort Exploration & Heritage Walk",
          description: "Discover the magnificent Amber Fort and explore Jaipur's historic quarters.",
          activities: [
            { id: "act-raj-5", title: "Morning visit to Amber Fort with elephant ride", description: "Royal fort experience with traditional elephant ascent", duration: "3 hours", activityType: "sightseeing", isIncluded: true, order: 1 },
            { id: "act-raj-6", title: "Guided heritage walk through old Jaipur", description: "Explore traditional bazaars and architecture", duration: "2 hours", activityType: "sightseeing", isIncluded: true, order: 2 },
            { id: "act-raj-7", title: "Visit Hawa Mahal and Jantar Mantar", description: "Iconic palace of winds and astronomical observatory", duration: "2 hours", activityType: "sightseeing", isIncluded: true, order: 3 },
            { id: "act-raj-8", title: "Shopping for handicrafts and textiles", description: "Browse local markets for authentic Rajasthani crafts", duration: "1 hour", activityType: "cultural", isIncluded: true, order: 4 }
          ],
          highlights: ["Amber Fort", "Elephant Ride", "Hawa Mahal", "Local Markets"],
          meals: ["Breakfast", "Lunch", "Dinner"],
          accommodation: "Heritage Palace Hotel in Jaipur",
          duration: "Full Day",
          location: "Jaipur",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop"],
          isActive: true,
          order: 2
        }
      ],
      isPublished: true,
      seoTitle: "Royal Rajasthan Heritage Tour - 7 Days Palace & Fort Experience",
      seoDescription: "Explore Rajasthan's royal heritage with palace stays, fort visits, and cultural experiences in Jaipur and beyond on this 7-day heritage tour.",
      seoKeywords: ["Rajasthan heritage", "palace tour", "Jaipur", "Amber Fort"],
      adminSettings: {
        allowPublicBooking: true,
        showPricing: true,
        showEnquiryForm: true,
        enableReviews: true,
        featuredTour: true
      }
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
        { id: "1", url: heroAyurvedaSpa, alt: "Ayurveda Spa Treatment", caption: "Traditional Ayurvedic spa", order: 1, section: "overview", isActive: true },
        { id: "2", url: galleryAyurveda1, alt: "Wellness Center", caption: "Peaceful wellness retreat", order: 2, section: "overview", isActive: true },
        { id: "3", url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop", alt: "Yoga Session", caption: "Morning yoga practice", order: 3, section: "overview", isActive: true },
        { id: "4", url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop", alt: "Meditation Garden", caption: "Serene meditation space", order: 1, section: "itinerary", isActive: true },
        { id: "5", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", alt: "Herbal Treatment", caption: "Natural herbal therapies", order: 2, section: "itinerary", isActive: true },
        { id: "6", url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop", alt: "Organic Cuisine", caption: "Healthy vegetarian meals", order: 3, section: "itinerary", isActive: true },
        { id: "7", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop", alt: "Nature Therapy", caption: "Healing in nature", order: 4, section: "itinerary", isActive: true },
        { id: "8", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop", alt: "Panchakarma Treatment", caption: "Traditional detox therapy", order: 5, section: "itinerary", isActive: true },
        { id: "9", url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format&q=80", alt: "Wellness Consultation", caption: "Personalized health consultation", order: 1, section: "gallery", isActive: true },
        { id: "10", url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&auto=format&q=80", alt: "Spa Facilities", caption: "Modern spa amenities", order: 2, section: "gallery", isActive: true }
      ],
      slug: "ayurveda-wellness-retreat",
      itinerary: "Day 1: Arrival and Wellness Consultation\nDay 2: Traditional Treatments and Yoga\nDay 3: Meditation and Therapeutic Sessions\nDay 4: Holistic Healing and Nature Activities\nDay 5: Final Treatments and Departure",
      inclusions: ["Ayurvedic resort stay", "All treatments", "Yoga sessions", "Organic meals", "Consultation"],
      exclusions: ["Airfare", "Personal expenses", "Additional treatments"],
      mapLocation: { lat: 10.8505, lng: 76.2711 },
      sections: [
        {
          id: "overview-3",
          type: "overview",
          title: "Ayurveda Wellness Retreat",
          content: "Discover the ancient healing science of Ayurveda in this transformative 10-day wellness retreat. Experience personalized treatments, yoga sessions, and meditation in serene natural surroundings. Our expert Ayurvedic doctors will create a customized treatment plan based on your individual constitution and health needs. Enjoy organic vegetarian meals, daily yoga and meditation sessions, and traditional therapies like Panchakarma, Abhyanga, and Shirodhara in a peaceful resort setting surrounded by lush tropical gardens.",
          isVisible: true,
          order: 1
        },
        {
          id: "itinerary-3",
          type: "itinerary",
          title: "Detailed Itinerary",
          content: "",
          isVisible: true,
          order: 2
        }
      ],
      itineraryDays: [
        {
          id: "day-1-ayu",
          dayNumber: 1,
          title: "Arrival & Wellness Consultation",
          description: "Begin your wellness journey with arrival and comprehensive health consultation.",
          activities: [
            { id: "act-ayu-1", title: "Airport pickup and transfer to wellness resort", description: "Comfortable transfer to peaceful resort setting", duration: "1 hour", activityType: "arrival", isIncluded: true, order: 1 },
            { id: "act-ayu-2", title: "Welcome drink and resort orientation", description: "Traditional herbal welcome drink and facility tour", duration: "30 mins", activityType: "cultural", isIncluded: true, order: 2 },
            { id: "act-ayu-3", title: "Consultation with Ayurvedic doctor", description: "Comprehensive health assessment and treatment planning", duration: "1 hour", activityType: "cultural", isIncluded: true, order: 3 },
            { id: "act-ayu-4", title: "Gentle yoga session and meditation", description: "Introduction to yoga and mindfulness practices", duration: "1 hour", activityType: "cultural", isIncluded: true, order: 4 }
          ],
          highlights: ["Health Consultation", "Yoga Introduction", "Peaceful Setting"],
          meals: ["Dinner"],
          accommodation: "Ayurvedic Wellness Resort",
          duration: "Full Day",
          location: "Kerala Wellness Center",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop"],
          isActive: true,
          order: 1
        },
        {
          id: "day-2-ayu",
          dayNumber: 2,
          title: "Traditional Treatments & Yoga",
          description: "Experience authentic Ayurvedic treatments and guided yoga practices.",
          activities: [
            { id: "act-ayu-5", title: "Morning Abhyanga (oil massage) treatment", description: "Traditional full-body oil massage therapy", duration: "1.5 hours", activityType: "cultural", isIncluded: true, order: 1 },
            { id: "act-ayu-6", title: "Hatha yoga session with certified instructor", description: "Guided yoga practice for mind-body wellness", duration: "1 hour", activityType: "cultural", isIncluded: true, order: 2 },
            { id: "act-ayu-7", title: "Herbal steam bath and relaxation", description: "Therapeutic steam treatment with medicinal herbs", duration: "45 mins", activityType: "cultural", isIncluded: true, order: 3 },
            { id: "act-ayu-8", title: "Evening meditation and pranayama", description: "Breathing exercises and mindfulness meditation", duration: "45 mins", activityType: "cultural", isIncluded: true, order: 4 }
          ],
          highlights: ["Abhyanga Massage", "Hatha Yoga", "Herbal Steam Bath", "Meditation"],
          meals: ["Breakfast", "Lunch", "Dinner"],
          accommodation: "Ayurvedic Wellness Resort",
          duration: "Full Day",
          location: "Kerala Wellness Center",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"],
          isActive: true,
          order: 2
        }
      ],
      isPublished: true,
      seoTitle: "Ayurveda Wellness Retreat - 5 Days Authentic Healing Experience",
      seoDescription: "Rejuvenate your body and mind with authentic Ayurvedic treatments, yoga, and meditation in peaceful Kerala wellness resort.",
      seoKeywords: ["Ayurveda retreat", "wellness tour", "Kerala spa", "yoga meditation"],
      adminSettings: {
        allowPublicBooking: true,
        showPricing: true,
        showEnquiryForm: true,
        enableReviews: true,
        featuredTour: true
      }
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
        { id: "1", url: goldenTriangleTourCard, alt: "Golden Triangle Classic", caption: "Classic India tour circuit", order: 1, section: "overview", isActive: true },
        { id: "2", url: galleryGoldenTriangle1, alt: "Taj Mahal Agra", caption: "Iconic Taj Mahal monument", order: 2, section: "overview", isActive: true },
        { id: "3", url: galleryGoldenTriangle2, alt: "Delhi Red Fort", caption: "Historic Red Fort complex", order: 3, section: "overview", isActive: true },
        { id: "4", url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop", alt: "India Gate Delhi", caption: "Famous India Gate landmark", order: 1, section: "itinerary", isActive: true },
        { id: "5", url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop", alt: "Jaipur Architecture", caption: "Pink city architecture", order: 2, section: "itinerary", isActive: true },
        { id: "6", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop", alt: "Palace Complex", caption: "Royal palace interiors", order: 3, section: "itinerary", isActive: true },
        { id: "7", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", alt: "Local Markets", caption: "Traditional bazaars and shopping", order: 4, section: "itinerary", isActive: true },
        { id: "8", url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop", alt: "Cultural Heritage", caption: "Rich cultural experiences", order: 1, section: "gallery", isActive: true }
      ],
      slug: "golden-triangle-classic",
      itinerary: "Day 1: Delhi arrival, Old Delhi tour including Red Fort and Jama Masjid\nDay 2: New Delhi sightseeing, travel to Agra in evening\nDay 3: Sunrise at Taj Mahal, Agra Fort, travel to Jaipur\nDay 4: Jaipur city tour - City Palace, Hawa Mahal, Jantar Mantar\nDay 5: Amber Fort with elephant ride, local markets and handicraft shopping\nDay 6: Morning at leisure, return to Delhi, departure",
      inclusions: ["Hotel accommodation", "All meals", "Local guide", "Transportation", "Entry fees"],
      exclusions: ["Airfare", "Personal expenses", "Tips"],
      mapLocation: { lat: 28.6139, lng: 77.2090 },
      sections: [
        {
          id: "overview-4",
          type: "overview",
          title: "Golden Triangle Classic",
          content: "Experience India's most famous tourist circuit covering Delhi, Agra, and Jaipur. Visit the Taj Mahal, explore Mughal architecture, and discover the pink city of Jaipur in this classic 6-day journey. This tour combines the best of India's historical heritage, from the bustling streets of Old Delhi to the romantic marble monument of the Taj Mahal, and the royal palaces of Jaipur. Each city offers unique experiences, from street food tours in Delhi to sunrise at the Taj Mahal and elephant rides at Amber Fort.",
          isVisible: true,
          order: 1
        },
        {
          id: "itinerary-4",
          type: "itinerary",
          title: "Detailed Itinerary",
          content: "",
          isVisible: true,
          order: 2
        }
      ],
      itineraryDays: [
        {
          id: "day-1-gt",
          dayNumber: 1,
          title: "Arrival in Delhi & Old Delhi Tour",
          description: "Begin your Golden Triangle journey with arrival in India's capital and exploration of historic Old Delhi.",
          activities: [
            { id: "act-gt-1", title: "Airport pickup and transfer to hotel", description: "Comfortable transfer from Delhi airport to centrally located hotel", duration: "1 hour", activityType: "arrival", isIncluded: true, order: 1 },
            { id: "act-gt-2", title: "Welcome drink and orientation session", description: "Traditional welcome and briefing about the tour ahead", duration: "30 mins", activityType: "cultural", isIncluded: true, order: 2 },
            { id: "act-gt-3", title: "Old Delhi exploration - Red Fort and Jama Masjid", description: "Discover Mughal heritage at these iconic monuments", duration: "3 hours", activityType: "sightseeing", isIncluded: true, order: 3 },
            { id: "act-gt-4", title: "Rickshaw ride through Chandni Chowk market", description: "Experience bustling local markets and street food", duration: "1 hour", activityType: "cultural", isIncluded: true, order: 4 }
          ],
          highlights: ["Red Fort", "Jama Masjid", "Chandni Chowk", "Delhi Street Food"],
          meals: ["Dinner"],
          accommodation: "Deluxe Hotel in Delhi",
          duration: "Full Day",
          location: "Delhi",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop"],
          isActive: true,
          order: 1
        },
        {
          id: "day-2-gt",
          dayNumber: 2,
          title: "New Delhi Sightseeing & Travel to Agra",
          description: "Explore modern Delhi's landmarks before traveling to the city of the Taj Mahal.",
          activities: [
            { id: "act-gt-5", title: "India Gate and Rajpath drive", description: "See India's war memorial and ceremonial boulevard", duration: "1 hour", activityType: "sightseeing", isIncluded: true, order: 1 },
            { id: "act-gt-6", title: "Humayun's Tomb visit", description: "Explore this UNESCO World Heritage Mughal garden tomb", duration: "1.5 hours", activityType: "sightseeing", isIncluded: true, order: 2 },
            { id: "act-gt-7", title: "Qutub Minar complex tour", description: "Visit the tallest brick minaret in the world", duration: "1 hour", activityType: "sightseeing", isIncluded: true, order: 3 },
            { id: "act-gt-8", title: "Drive to Agra via Yamuna Expressway", description: "Comfortable 3-4 hour drive to Agra", duration: "4 hours", activityType: "arrival", isIncluded: true, order: 4 }
          ],
          highlights: ["India Gate", "Humayun's Tomb", "Qutub Minar", "Agra Arrival"],
          meals: ["Breakfast", "Lunch", "Dinner"],
          accommodation: "Heritage Hotel in Agra",
          duration: "Full Day",
          location: "Delhi to Agra",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop"],
          isActive: true,
          order: 2
        },
        {
          id: "day-3-gt",
          dayNumber: 3,
          title: "Taj Mahal Sunrise & Travel to Jaipur",
          description: "Witness the magical sunrise at the Taj Mahal and explore Agra Fort before heading to the Pink City.",
          activities: [
            { id: "act-gt-9", title: "Early morning Taj Mahal sunrise visit", description: "Experience the Taj Mahal's changing colors at dawn", duration: "2 hours", activityType: "sightseeing", isIncluded: true, order: 1 },
            { id: "act-gt-10", title: "Agra Fort exploration", description: "Discover the red sandstone fortress of the Mughals", duration: "2 hours", activityType: "sightseeing", isIncluded: true, order: 2 },
            { id: "act-gt-11", title: "Local marble inlay workshop visit", description: "See traditional craftsmen creating Taj Mahal-style art", duration: "1 hour", activityType: "cultural", isIncluded: true, order: 3 },
            { id: "act-gt-12", title: "Drive to Jaipur with stop at Fatehpur Sikri", description: "Visit the abandoned Mughal city en route to Jaipur", duration: "5 hours", activityType: "sightseeing", isIncluded: true, order: 4 }
          ],
          highlights: ["Taj Mahal Sunrise", "Agra Fort", "Fatehpur Sikri", "Jaipur Arrival"],
          meals: ["Breakfast", "Lunch", "Dinner"],
          accommodation: "Palace Hotel in Jaipur",
          duration: "Full Day",
          location: "Agra to Jaipur",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop"],
          isActive: true,
          order: 3
        }
      ],
      isPublished: true,
      seoTitle: "Golden Triangle Classic Tour - 6 Days Delhi Agra Jaipur Experience",
      seoDescription: "Discover India's iconic Golden Triangle circuit covering Delhi, Agra, and Jaipur with Taj Mahal, Red Fort, and Pink City on this classic 6-day tour.",
      seoKeywords: ["Golden Triangle", "Delhi Agra Jaipur", "Taj Mahal", "India classic tour"],
      adminSettings: {
        allowPublicBooking: true,
        showPricing: true,
        showEnquiryForm: true,
        enableReviews: true,
        featuredTour: true
      }
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
        { id: "1", url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop", alt: "Ultimate India Experience", caption: "Comprehensive India journey", order: 1, section: "overview", isActive: true },
        { id: "2", url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop", alt: "Taj Mahal Sunrise", caption: "Iconic Taj Mahal at dawn", order: 2, section: "overview", isActive: true },
        { id: "3", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop", alt: "Rajasthan Heritage", caption: "Royal Rajasthan palaces", order: 3, section: "overview", isActive: true },
        { id: "4", url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop", alt: "Kerala Backwaters", caption: "Serene Kerala waterways", order: 1, section: "itinerary", isActive: true },
        { id: "5", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop", alt: "Delhi Exploration", caption: "Historic Delhi monuments", order: 2, section: "itinerary", isActive: true },
        { id: "6", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop", alt: "Jaipur City Palace", caption: "Pink city royal heritage", order: 3, section: "itinerary", isActive: true },
        { id: "7", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", alt: "Udaipur Lakes", caption: "City of lakes romance", order: 4, section: "itinerary", isActive: true },
        { id: "8", url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop", alt: "Varanasi Ghats", caption: "Spiritual Ganges experience", order: 5, section: "itinerary", isActive: true },
        { id: "9", url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop", alt: "Cultural Performances", caption: "Traditional arts and music", order: 6, section: "itinerary", isActive: true },
        { id: "10", url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop", alt: "Luxury Accommodations", caption: "Premium heritage hotels", order: 7, section: "itinerary", isActive: true },
        { id: "11", url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=600&fit=crop", alt: "Local Cuisine", caption: "Authentic regional flavors", order: 8, section: "itinerary", isActive: true },
        { id: "12", url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop", alt: "Adventure Activities", caption: "Diverse adventure experiences", order: 9, section: "itinerary", isActive: true },
        { id: "13", url: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&h=600&fit=crop", alt: "Temple Architecture", caption: "Sacred temple complexes", order: 1, section: "gallery", isActive: true },
        { id: "14", url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop", alt: "Wildlife Safari", caption: "National park wildlife", order: 2, section: "gallery", isActive: true },
        { id: "15", url: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=800&h=600&fit=crop", alt: "Mountain Landscapes", caption: "Himalayan scenic beauty", order: 3, section: "gallery", isActive: true }
      ],
      slug: "ultimate-india-experience",
      itinerary: "Day 1: Arrival in Delhi, welcome dinner and cultural orientation\nDay 2: Old and New Delhi exploration, Red Fort and India Gate\nDay 3: Travel to Agra, sunset at Taj Mahal\nDay 4: Sunrise at Taj Mahal, Agra Fort, travel to Jaipur\nDay 5: Jaipur city tour - City Palace, Hawa Mahal, Amber Fort\nDay 6: Jaipur to Udaipur, evening boat ride on Lake Pichola\nDay 7: Udaipur city tour, City Palace and Jagdish Temple\nDay 8: Flight to Cochin, Kerala backwaters introduction\nDay 9: Alleppey houseboat experience and village visits\nDay 10: Kumarakom bird sanctuary and spice plantation\nDay 11: Flight to Varanasi, evening Ganga Aarti ceremony\nDay 12: Morning boat ride on Ganges, departure",
      inclusions: ["Luxury hotel accommodation", "All meals", "Private guide", "Transportation", "Domestic flights", "Entry fees", "Cultural performances"],
      exclusions: ["International airfare", "Personal expenses", "Tips", "Travel insurance"],
      mapLocation: { lat: 28.6139, lng: 77.2090 },
      sections: [
        {
          id: "overview-5",
          type: "overview",
          title: "Ultimate India Experience",
          content: "Embark on the ultimate Indian adventure that takes you through the most iconic destinations, hidden gems, and cultural experiences that India has to offer. This carefully curated 12-day journey combines the classic Golden Triangle with the serene backwaters of Kerala, the royal heritage of Rajasthan, and the spiritual essence of Varanasi. Experience luxury accommodations, authentic local cuisine, traditional performances, and immersive cultural interactions that will create memories to last a lifetime.",
          isVisible: true,
          order: 1
        },
        {
          id: "itinerary-5",
          type: "itinerary",
          title: "Detailed Itinerary",
          content: "",
          isVisible: true,
          order: 2
        }
      ],
      itineraryDays: [
        {
          id: "day-1-ui",
          dayNumber: 1,
          title: "Arrival in Delhi & Cultural Orientation",
          description: "Begin your ultimate India experience with arrival in the vibrant capital city and cultural introduction.",
          activities: [
            { id: "act-ui-1", title: "Airport pickup and transfer to luxury hotel", description: "VIP transfer from Delhi airport to premium heritage hotel", duration: "1 hour", activityType: "arrival", isIncluded: true, order: 1 },
            { id: "act-ui-2", title: "Welcome drink and detailed tour briefing", description: "Traditional welcome with comprehensive tour orientation", duration: "45 mins", activityType: "cultural", isIncluded: true, order: 2 },
            { id: "act-ui-3", title: "Cultural orientation session with local expert", description: "Introduction to Indian culture, traditions, and customs", duration: "1 hour", activityType: "cultural", isIncluded: true, order: 3 },
            { id: "act-ui-4", title: "Welcome dinner with traditional Indian cuisine", description: "Multi-course dinner featuring regional specialties", duration: "2 hours", activityType: "cultural", isIncluded: true, order: 4 }
          ],
          highlights: ["Luxury Welcome", "Cultural Orientation", "Traditional Cuisine", "Expert Guide Introduction"],
          meals: ["Dinner"],
          accommodation: "Luxury Heritage Hotel in Delhi",
          duration: "Full Day",
          location: "Delhi",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop"],
          isActive: true,
          order: 1
        },
        {
          id: "day-2-ui",
          dayNumber: 2,
          title: "Delhi Exploration - Old & New",
          description: "Comprehensive exploration of India's capital showcasing both ancient and modern heritage.",
          activities: [
            { id: "act-ui-5", title: "Red Fort and Mughal heritage exploration", description: "Explore the magnificent Red Fort and learn about Mughal history", duration: "2 hours", activityType: "sightseeing", isIncluded: true, order: 1 },
            { id: "act-ui-6", title: "Rickshaw ride through bustling Chandni Chowk", description: "Navigate the historic market on traditional rickshaw", duration: "1 hour", activityType: "cultural", isIncluded: true, order: 2 },
            { id: "act-ui-7", title: "India Gate and Lutyens' Delhi tour", description: "Discover the planned city with colonial architecture", duration: "1.5 hours", activityType: "sightseeing", isIncluded: true, order: 3 },
            { id: "act-ui-8", title: "Humayun's Tomb and garden walk", description: "Visit the UNESCO World Heritage Mughal garden tomb", duration: "1.5 hours", activityType: "sightseeing", isIncluded: true, order: 4 }
          ],
          highlights: ["Red Fort", "Chandni Chowk", "India Gate", "Humayun's Tomb"],
          meals: ["Breakfast", "Lunch", "Dinner"],
          accommodation: "Luxury Heritage Hotel in Delhi",
          duration: "Full Day",
          location: "Delhi",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop"],
          isActive: true,
          order: 2
        },
        {
          id: "day-3-ui",
          dayNumber: 3,
          title: "Delhi to Agra & Taj Mahal Sunset",
          description: "Travel to Agra and witness the iconic Taj Mahal during the magical golden hour.",
          activities: [
            { id: "act-ui-9", title: "Comfortable drive to Agra via Yamuna Expressway", description: "Scenic 3-4 hour journey with refreshment stops", duration: "4 hours", activityType: "arrival", isIncluded: true, order: 1 },
            { id: "act-ui-10", title: "Check-in to heritage hotel and lunch", description: "Relax and enjoy lunch at luxury Agra accommodation", duration: "2 hours", activityType: "arrival", isIncluded: true, order: 2 },
            { id: "act-ui-11", title: "Sunset visit to the magnificent Taj Mahal", description: "Experience the world's most beautiful monument at sunset", duration: "2.5 hours", activityType: "sightseeing", isIncluded: true, order: 3 },
            { id: "act-ui-12", title: "Evening at leisure with optional local markets", description: "Free time to explore local bazaars and handicrafts", duration: "2 hours", activityType: "cultural", isIncluded: false, order: 4 }
          ],
          highlights: ["Taj Mahal Sunset", "Heritage Hotel", "Local Markets", "Scenic Drive"],
          meals: ["Breakfast", "Lunch", "Dinner"],
          accommodation: "Luxury Heritage Hotel in Agra",
          duration: "Full Day",
          location: "Delhi to Agra",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop"],
          isActive: true,
          order: 3
        }
      ],
      isPublished: true,
      seoTitle: "Ultimate India Experience - 12 Days Comprehensive India Tour",
      seoDescription: "Experience the best of India on this comprehensive 12-day journey covering Delhi, Agra, Jaipur, Udaipur, Kerala, and Varanasi with luxury accommodations.",
      seoKeywords: ["Ultimate India tour", "comprehensive India experience", "luxury India travel", "Golden Triangle Kerala"],
      adminSettings: {
        allowPublicBooking: true,
        showPricing: true,
        showEnquiryForm: true,
        enableReviews: true,
        featuredTour: true
      }
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
      images: [
        { id: "1", url: heroRajasthanPalace, alt: "Rajasthan Palace Heritage", caption: "Magnificent palace architecture", order: 1, section: "overview", isActive: true },
        { id: "2", url: galleryRajasthan1, alt: "Royal Rajasthan Fort", caption: "Historic fort complex", order: 2, section: "overview", isActive: true }
      ],
      slug: "royal-rajasthan-heritage",
      itinerary: "Day 1: Arrival in Jaipur\nDay 2: City Palace and Amber Fort\nDay 3: Travel to Udaipur",
      inclusions: ["Heritage hotel stays", "All meals", "Local guide"],
      exclusions: ["Airfare", "Personal expenses", "Tips"],
      mapLocation: { lat: 26.9124, lng: 75.7873 },
      sections: [
        {
          id: "overview-rel-1",
          type: "overview",
          title: "Royal Rajasthan Heritage",
          content: "Step into the royal world of Rajasthan with this comprehensive 7-day heritage tour.",
          isVisible: true,
          order: 1
        }
      ],
      itineraryDays: [
        {
          id: "day-rel-1",
          dayNumber: 1,
          title: "Arrival in Jaipur",
          description: "Begin your royal journey in the Pink City.",
          activities: [
            { id: "act-rel-1", title: "Airport pickup and hotel transfer", description: "Comfortable transfer to heritage hotel", duration: "1 hour", activityType: "arrival", isIncluded: true, order: 1 }
          ],
          highlights: ["Heritage Hotel", "City Introduction"],
          meals: ["Dinner"],
          accommodation: "Heritage Hotel in Jaipur",
          duration: "Full Day",
          location: "Jaipur",
          difficulty: "Easy",
          images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop"],
          isActive: true,
          order: 1
        }
      ],
      isPublished: true,
      seoTitle: "Royal Rajasthan Heritage Tour - 7 Days Palace Experience",
      seoDescription: "Explore Rajasthan's royal heritage with palace stays and fort visits on this 7-day heritage tour.",
      seoKeywords: ["Rajasthan heritage", "palace tour", "Jaipur"],
      adminSettings: {
        allowPublicBooking: true,
        showPricing: true,
        showEnquiryForm: true,
        enableReviews: true,
        featuredTour: false
      }
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

// Destination API functions for Top Destinations of India page

/**
 * Fetch all destinations from the database
 * TODO: Fetch all destinations from Supabase and pass to components
 */
export async function getAllDestinations(): Promise<DestinationSummary[]> {
  // Placeholder implementation - replace with actual Supabase query
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

  // This will be populated with actual destination data in the next task
  const mockDestinations: DestinationSummary[] = [
    {
      id: "1",
      title: "Taj Mahal, Agra",
      shortDescription: "The epitome of love and one of the Seven Wonders of the World, this ivory-white marble mausoleum stands as a UNESCO World Heritage Site and the most iconic symbol of India. Built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, the Taj Mahal represents the pinnacle of Mughal architecture, combining Persian, Islamic, and Indian architectural styles. The monument took over 20 years to complete, involving thousands of artisans and craftsmen from across the empire. The main tomb is flanked by a red sandstone mosque and a guest house, set within beautiful Charbagh gardens that represent the Islamic concept of paradise. The intricate marble inlay work, known as pietra dura, features precious and semi-precious stones forming elaborate floral patterns. The central dome, rising to 35 meters, is surrounded by four smaller domes and four minarets that lean slightly outward to prevent them from falling onto the main structure in case of an earthquake. The interior houses the cenotaphs of Shah Jahan and Mumtaz Mahal, though their actual graves lie in a crypt below. The play of light on the white marble creates different moods throughout the day, appearing pinkish at dawn, milky white in the evening, and golden under the moonlight.",
      state: "Uttar Pradesh",
      region: "North India",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
      famousFor: ["Architecture", "Love Story", "UNESCO Heritage"],
      bestTimeToVisit: "October to March",
      isActive: true,
      order: 1
    },
    {
      id: "2",
      title: "Red Fort, Delhi",
      shortDescription: "A historic fortified palace that served as the main residence of the Mughal emperors for over 200 years.",
      state: "Delhi",
      region: "North India",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop",
      famousFor: ["Mughal Architecture", "Independence Day", "History"],
      bestTimeToVisit: "October to March",
      isActive: true,
      order: 2
    },
    {
      id: "3",
      title: "Jaipur - The Pink City",
      shortDescription: "The capital of Rajasthan, known for its stunning pink architecture, magnificent palaces, and vibrant culture.",
      state: "Rajasthan",
      region: "North India",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
      famousFor: ["Pink Architecture", "Palaces", "Rajasthani Culture"],
      bestTimeToVisit: "October to March",
      isActive: true,
      order: 3
    },
    {
      id: "4",
      title: "Kerala Backwaters",
      shortDescription: "A network of tranquil waterways, lagoons, and lakes perfect for houseboat cruises and experiencing authentic local life in God's Own Country. The Kerala Backwaters represent one of the most unique ecosystems in India, comprising over 900 kilometers of interconnected canals, rivers, lakes, and inlets along the coast of Kerala. This intricate network of waterways has been the lifeline of the region for centuries, supporting traditional industries like fishing, agriculture, and transportation. The famous houseboats, known locally as 'kettuvallams', were originally used to transport rice and spices but have been beautifully converted into floating accommodations offering modern amenities while retaining their traditional charm. These houseboats provide an unparalleled opportunity to witness the unhurried pace of village life, where families still depend on fishing, farming, and coir-making for their livelihood. The journey through these waterways offers glimpses of paddy fields, coconut groves, spice plantations, and traditional villages where life continues much as it has for generations. Visitors can observe local fishermen using Chinese fishing nets, witness the ancient art of boat-making, and enjoy fresh seafood prepared with traditional Kerala spices. The backwaters are also home to diverse flora and fauna, including numerous species of birds, making it a paradise for nature lovers and bird watchers.",
      state: "Kerala",
      region: "South India",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      famousFor: ["Houseboat Cruises", "Village Life", "Natural Beauty"],
      bestTimeToVisit: "September to March",
      isActive: true,
      order: 4
    },
    {
      id: "5",
      title: "Goa Beaches",
      shortDescription: "India's beach paradise with golden sandy shores, vibrant nightlife, and Portuguese colonial heritage.",
      state: "Goa",
      region: "West India",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop",
      famousFor: ["Beaches", "Nightlife", "Portuguese Heritage"],
      bestTimeToVisit: "November to February",
      isActive: true,
      order: 5
    },
    {
      id: "6",
      title: "Ladakh",
      shortDescription: "The land of high passes offering breathtaking landscapes, ancient monasteries, and adventure activities.",
      state: "Ladakh",
      region: "North India",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      famousFor: ["High Altitude", "Monasteries", "Adventure Sports"],
      bestTimeToVisit: "May to September",
      isActive: true,
      order: 6
    },
    {
      id: "7",
      title: "Varanasi",
      shortDescription: "One of the world's oldest cities, considered the spiritual capital of India with ancient ghats along the Ganges.",
      state: "Uttar Pradesh",
      region: "North India",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      famousFor: ["Spiritual Heritage", "Ganges River", "Ancient Temples"],
      bestTimeToVisit: "October to March",
      isActive: true,
      order: 7
    },
    {
      id: "8",
      title: "Rishikesh",
      shortDescription: "The yoga capital of the world, nestled in the Himalayas along the banks of the holy Ganges River.",
      state: "Uttarakhand",
      region: "North India",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      famousFor: ["Yoga", "Spirituality", "River Rafting"],
      bestTimeToVisit: "February to June, September to November",
      isActive: true,
      order: 8
    },
    {
      id: "9",
      title: "Udaipur",
      shortDescription: "The City of Lakes, known for its romantic palaces, beautiful lakes, and royal heritage.",
      state: "Rajasthan",
      region: "North India",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      famousFor: ["Lakes", "Palaces", "Romantic Setting"],
      bestTimeToVisit: "September to March",
      isActive: true,
      order: 9
    },
    {
      id: "10",
      title: "Hampi",
      shortDescription: "A UNESCO World Heritage Site with magnificent ruins of the Vijayanagara Empire set in a surreal landscape.",
      state: "Karnataka",
      region: "South India",
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop",
      famousFor: ["Ancient Ruins", "UNESCO Heritage", "Boulder Landscape"],
      bestTimeToVisit: "October to February",
      isActive: true,
      order: 10
    },
    {
      id: "11",
      title: "Mysore Palace",
      shortDescription: "A magnificent royal palace known for its Indo-Saracenic architecture and grandeur, especially during Dussehra.",
      state: "Karnataka",
      region: "South India",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
      famousFor: ["Royal Architecture", "Dussehra Festival", "Museum"],
      bestTimeToVisit: "October to February",
      isActive: true,
      order: 11
    },
    {
      id: "12",
      title: "Golden Temple, Amritsar",
      shortDescription: "The holiest shrine of Sikhism, known for its golden dome and the langar (community kitchen) serving thousands daily.",
      state: "Punjab",
      region: "North India",
      image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&h=300&fit=crop",
      famousFor: ["Sikh Heritage", "Golden Architecture", "Community Service"],
      bestTimeToVisit: "November to March",
      isActive: true,
      order: 12
    },
    {
      id: "13",
      title: "Darjeeling",
      shortDescription: "The Queen of Hills, famous for its tea gardens, toy train, and stunning views of the Himalayas.",
      state: "West Bengal",
      region: "East India",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&h=300&fit=crop",
      famousFor: ["Tea Gardens", "Toy Train", "Himalayan Views"],
      bestTimeToVisit: "April to June, September to November",
      isActive: true,
      order: 13
    },
    {
      id: "14",
      title: "Ajanta and Ellora Caves",
      shortDescription: "Ancient rock-cut caves featuring Buddhist, Hindu, and Jain monuments with exquisite sculptures and paintings.",
      state: "Maharashtra",
      region: "West India",
      image: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=400&h=300&fit=crop",
      famousFor: ["Rock-cut Architecture", "Ancient Art", "Religious Heritage"],
      bestTimeToVisit: "November to March",
      isActive: true,
      order: 14
    },
    {
      id: "15",
      title: "Shimla",
      shortDescription: "The former summer capital of British India, known for its colonial architecture and scenic mountain views.",
      state: "Himachal Pradesh",
      region: "North India",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
      famousFor: ["Colonial Architecture", "Hill Station", "Toy Train"],
      bestTimeToVisit: "March to June, September to November",
      isActive: true,
      order: 15
    }];

  // TODO: Apply filters when connected to Supabase
  return mockDestinations;
}



