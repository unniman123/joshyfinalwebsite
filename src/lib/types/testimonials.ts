// Testimonials types and interfaces
// Customer testimonial data structure for Kerala Tours Global

export interface Testimonial {
  id: number;
  customerName: string;
  rating: number; // 1-5 stars
  reviewText: string;
  reviewDate: string; // ISO date string or formatted date
  avatar?: string; // Optional customer photo URL
  location?: string; // Optional customer location
  source?: 'google' | 'facebook' | 'tripadvisor' | 'website'; // Review source platform
  verified?: boolean; // Whether the review is verified
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}



// Sample testimonials data based on real customer reviews
export const testimonials: Testimonial[] = [
  {
    id: 1,
    customerName: "Jacky Donovan",
    rating: 5,
    reviewText: "I had an excellent 5-day/4-nt tour with this company with Aziz as my driver. I'd contacted several tourist agencies but chose this one because they sent all the information concisely for a number of options I could choose from. They were professional, knowledgeable, and made our Kerala experience unforgettable.",
    reviewDate: "2023-12-15",
    location: "Local Guide",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  },
  {
    id: 2,
    customerName: "Sarah Mitchell",
    rating: 5,
    reviewText: "Absolutely amazing experience! The backwater cruise was breathtaking and the Ayurveda treatments were so relaxing. The team was incredibly professional and accommodating to all our needs. Kerala is truly God's own country!",
    reviewDate: "2024-01-20",
    location: "United Kingdom",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  },
  {
    id: 3,
    customerName: "Raj Patel",
    rating: 4,
    reviewText: "Great service and beautiful locations. The Golden Triangle tour exceeded our expectations. Our guide was knowledgeable about the history and culture. Highly recommend for anyone wanting to explore India's heritage!",
    reviewDate: "2024-02-10",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  },
  {
    id: 4,
    customerName: "Emily Johnson",
    rating: 5,
    reviewText: "The Ayurveda wellness retreat was exactly what I needed. The treatments were authentic, the food was delicious, and the peaceful environment helped me completely relax. Thank you for such a wonderful experience!",
    reviewDate: "2024-01-05",
    location: "Australia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  },
  {
    id: 5,
    customerName: "Michael Chen",
    rating: 5,
    reviewText: "Fantastic organization and attention to detail. The Rajasthan heritage tour was spectacular - from the palaces to the local markets, everything was perfectly planned. The team went above and beyond to make our trip memorable.",
    reviewDate: "2023-11-28",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  },
  {
    id: 6,
    customerName: "Priya Sharma",
    rating: 4,
    reviewText: "Wonderful experience exploring Kerala's backwaters and hill stations. The houseboat stay was unique and the local cuisine was delicious. Great value for money and excellent customer service throughout the journey.",
    reviewDate: "2024-02-25",
    location: "Delhi, India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  }
];