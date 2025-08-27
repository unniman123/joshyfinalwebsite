// Additional destination data and utilities for Top Destinations of India page
// This file contains extended destination data that complies with DestinationSummary interface

import { DestinationSummary } from "@/lib/api";

/**
 * Additional destination data for Top Destinations of India
 * All destinations follow DestinationSummary interface with proper type compliance
 */
export const additionalDestinations: DestinationSummary[] = [
  {
    id: "16",
    title: "Manali",
    shortDescription: "A popular hill station in Himachal Pradesh, known for its scenic beauty, adventure sports, and honeymoon destination appeal.",
    detailDescription: "Manali is a high-altitude Himalayan resort town in India's northern Himachal Pradesh state. It has a reputation as a backpacking center and honeymoon destination. Set on the Beas River, it's a gateway for skiing in the Solang Valley and trekking in Parvati Valley. It's also a jumping-off point for paragliding, rafting and mountaineering in the Pir Panjal mountains.",
    state: "Himachal Pradesh",
    region: "North India",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    slug: "manali",
    famousFor: ["Adventure Sports", "Honeymoon Destination", "Trekking", "Skiing"],
    bestTimeToVisit: "March to June, September to November",
    isActive: true,
    order: 16
  },
  {
    id: "17",
    title: "Dharamshala",
    shortDescription: "Home to the Dalai Lama and Tibetan government-in-exile, known for its spiritual atmosphere and mountain views.",
    detailDescription: "Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillstation is home to the Dalai Lama and the Tibetan government-in-exile. The Tibetan Museum displays artifacts and photographs documenting Tibetan history and the refugee experience.",
    state: "Himachal Pradesh", 
    region: "North India",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    slug: "dharamshala",
    famousFor: ["Dalai Lama", "Tibetan Culture", "Spirituality", "McLeod Ganj"],
    bestTimeToVisit: "March to June, September to November",
    isActive: true,
    order: 17
  },
  {
    id: "18",
    title: "Amritsar",
    shortDescription: "The spiritual center of Sikhism, home to the magnificent Golden Temple and rich Punjabi culture.",
    detailDescription: "Amritsar is a city in the northwestern Indian state of Punjab, 28 kilometers from the border with Pakistan. At the center of its walled old city, the gilded Golden Temple (Harmandir Sahib) is the holiest gurdwara (religious complex) of the Sikh religion. It's at the end of a causeway, surrounded by the sacred Amrit Sarovar tank (lake), where pilgrims bathe.",
    state: "Punjab",
    region: "North India", 
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop",
    slug: "amritsar",
    famousFor: ["Golden Temple", "Sikh Heritage", "Wagah Border", "Punjabi Culture"],
    bestTimeToVisit: "October to March",
    isActive: true,
    order: 18
  },
  {
    id: "19", 
    title: "Mysore",
    shortDescription: "The cultural capital of Karnataka, famous for its royal heritage, magnificent palace, and traditional silk sarees.",
    detailDescription: "Mysore is a city in India's southwestern Karnataka state. It was the capital of the Kingdom of Mysore from 1399 to 1950. In its center is opulent Mysore Palace, seat of the former ruling Wodeyar dynasty. The palace blends Hindu, Islamic, Gothic and Rajput styles. Mysore is also home to the deities Chamundeshwari and Mysore Dasara, a 10-day festival.",
    state: "Karnataka",
    region: "South India",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
    slug: "mysore",
    famousFor: ["Mysore Palace", "Royal Heritage", "Silk Sarees", "Dasara Festival"],
    bestTimeToVisit: "October to March",
    isActive: true,
    order: 19
  },
  {
    id: "20",
    title: "Coorg",
    shortDescription: "Scotland of India, known for its coffee plantations, misty hills, and lush greenery.",
    detailDescription: "Coorg, officially called Kodagu, is a hill station in Karnataka state, south India. It's known for its coffee plantations, forests and waterfalls. The region's highest peak is Tadiandamol, offering panoramic views. Coorg is also famous for its unique culture, with the local Kodava community having distinct traditions and cuisine.",
    state: "Karnataka",
    region: "South India",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    slug: "coorg",
    famousFor: ["Coffee Plantations", "Hill Station", "Waterfalls", "Kodava Culture"],
    bestTimeToVisit: "October to March",
    isActive: true,
    order: 20
  }
];