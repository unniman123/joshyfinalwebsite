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
      images: [heroKeralBackwaters, galleryKerala1, galleryKerala2],
      slug: "kerala-backwaters-explorer",
      itinerary: "Day 1: Arrival in Alleppey, houseboat check-in\nDay 2: Backwater cruise and village visits\nDay 3: Kumarakom bird sanctuary\nDay 4: Traditional fishing and cooking class\nDay 5: Departure",
      inclusions: ["Houseboat accommodation", "All meals", "Local guide", "Transportation"],
      exclusions: ["Airfare", "Personal expenses", "Tips"],
      mapLocation: { lat: 9.9312, lng: 76.2673 }
    },
    "royal-rajasthan-heritage": {
      id: "2",
      title: "Royal Rajasthan Heritage",
      description: "Journey through magnificent palaces, historic forts, and vibrant markets in the land of maharajas.",
      detailedContent: "Step into the royal world of Rajasthan with this comprehensive 7-day heritage tour. Explore majestic palaces, imposing forts, and experience the rich culture and traditions of the land of kings.",
      category: "Heritage Tours",
      duration: 7,
      price: "₹65,000",
      image: rajasthanTourCard,
      images: [heroRajasthanPalace, galleryRajasthan1],
      slug: "royal-rajasthan-heritage",
      itinerary: "Day 1: Arrival in Jaipur\nDay 2: City Palace and Amber Fort\nDay 3: Travel to Udaipur\nDay 4: Lake Palace and City tour\nDay 5: Jodhpur - Mehrangarh Fort\nDay 6: Jaisalmer - Golden city\nDay 7: Departure",
      inclusions: ["Heritage hotel stays", "All meals", "Local guide", "Transportation", "Entry fees"],
      exclusions: ["Airfare", "Personal expenses", "Tips", "Camera fees"],
      mapLocation: { lat: 26.9124, lng: 75.7873 }
    },
    "ayurveda-wellness-retreat": {
      id: "3",
      title: "Ayurveda Wellness Retreat",
      description: "Rejuvenate your body and mind with authentic Ayurvedic treatments in peaceful Kerala settings.",
      detailedContent: "Discover the ancient healing science of Ayurveda in this transformative 10-day wellness retreat. Experience personalized treatments, yoga sessions, and meditation in serene natural surroundings.",
      category: "Ayurveda",
      duration: 10,
      price: "₹85,000",
      image: ayurvedaTourCard,
      images: [heroAyurvedaSpa, galleryAyurveda1],
      slug: "ayurveda-wellness-retreat",
      itinerary: "Day 1-2: Consultation and treatment planning\nDay 3-7: Daily Ayurvedic treatments and yoga\nDay 8-9: Meditation and lifestyle guidance\nDay 10: Departure with wellness plan",
      inclusions: ["Ayurvedic resort stay", "All treatments", "Yoga sessions", "Organic meals", "Consultation"],
      exclusions: ["Airfare", "Personal expenses", "Additional treatments"],
      mapLocation: { lat: 10.8505, lng: 76.2711 }
    },
    "golden-triangle-classic": {
      id: "4",
      title: "Golden Triangle Classic",
      description: "Discover India's most iconic destinations: Delhi, Agra, and Jaipur in this comprehensive tour.",
      detailedContent: "Experience India's most famous tourist circuit covering Delhi, Agra, and Jaipur. Visit the Taj Mahal, explore Mughal architecture, and discover the pink city of Jaipur in this classic 6-day journey.",
      category: "Discover India",
      duration: 6,
      price: "₹55,000",
      image: goldenTriangleTourCard,
      images: [goldenTriangleTourCard, galleryGoldenTriangle1, galleryGoldenTriangle2],
      slug: "golden-triangle-classic",
      itinerary: "Day 1: Delhi arrival and city tour\nDay 2: Delhi to Agra, Taj Mahal visit\nDay 3: Agra Fort and travel to Jaipur\nDay 4: Jaipur city tour - City Palace, Hawa Mahal\nDay 5: Amber Fort and local markets\nDay 6: Return to Delhi, departure",
      inclusions: ["Hotel accommodation", "All meals", "Local guide", "Transportation", "Entry fees"],
      exclusions: ["Airfare", "Personal expenses", "Tips"],
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