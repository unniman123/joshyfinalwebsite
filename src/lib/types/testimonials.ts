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
    id: 2,
    customerName: "Shubhankar Baksi",
    rating: 5,
    reviewText: "As I am leaving Kerala as they Say God's Own Country I am carrying with me beautiful memories of this beautiful part of India, its people and nature. This had been a fabulous experience for me and my Family and I have no words to explain my Gratitude for making all the arrangements which was Superb from Day 1 to the end. I am Really Thankful to You. Me Mike our guide and friend during the tour is a Gem of a person, not only a good driver but also a well mannered person and took every care of our family. My Regards to him. Stay well and Safe and Hope to again have a trip with your Company. Thanks Once Again. Baksi and Family.",
    reviewDate: "2024-01-20",
    location: "Kolkata, India",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  },
  {
    id: 3,
    customerName: "Jacqueline Donovan",
    rating: 5,
    reviewText: "I had an excellent 5-day/4-nt tour with this company with Aziz as my driver. I'd contacted several tourist agencies but chose this one because they sent all the information concisely for a number of options I could choose from. They were easy to deal with via WhatsApp too. Aziz was always punctual and professional and drove me everywhere I'd indicated I wanted to go. My Munnar Hotel was terrific with a large room, lovely pool, amazing staff and excellent restaurant which was surprisingly cheap for the quality of the food and service. And my houseboat was a perfect end to the trip. The two crew prepared tasty meals and were friendly and helpful, despite not speaking much English. The boat was comfortable by day and quiet by night. If ever I return to this area, I'd use this tour company and Aziz again.",
    reviewDate: "2024-02-10",
    location: "Spain",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  },
  {
    id: 4,
    customerName: "Diana Hinn",
    rating: 5,
    reviewText: "We had a nice 10 day trip in Kerala and Tamil Nadu. Everything was well organized, starting via Whatsapp. Mr. Flabour was easily reachable and answered in minutes. We were also satisfied with a car and driver Jesal. Also Mr. Flabour helped us to get the train tickets from Kochi to Goa. We recommend to travel with them. 5/5.",
    reviewDate: "2024-01-05",
    location: "Estonia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  },
  {
    id: 5,
    customerName: "Bharati Ramachristna",
    rating: 5,
    reviewText: "Firstly i would liked to thank Mr Flabour of Keralatoursglobal to helped me in every way with his guidance and help before this tour. He have booked the hotels and cab services for our 4 days tour from Chennai to Thirumala on 14.09.2017 till 17.09.2017 as per our requirements. Since this is our first time to Thirumala with family to fullfill our vow, Mr Satiq Basha( driver) have help and guide us a lot till we fly back to Malaysia. He was excellent and knowledgeable person. Thank you Mr Flabour for make our short trip as a memorable one.",
    reviewDate: "2023-11-28",
    location: "Malaysia",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  },
  {
    id: 6,
    customerName: "Nik Auty & David Harmer",
    rating: 5,
    reviewText: "Our Kerala Tour was great, all hotels were better than expected. Driver was friendly & careful. Backwater tour with Bobbys was perfect- great price too- highly recommend.",
    reviewDate: "2024-02-25",
    location: "United Kingdom",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  },
  {
    id: 7,
    customerName: "Maria Carla Tritto",
    rating: 5,
    reviewText: "Hi, I'd contacted Keralatoursglobal for a 3 nights cruise from Kollam to Kumarakom. Once we met in Kovalam I've booked with Keralatoursglobal also a cab from Kovalam to Kanyakumari and from Kanyakumari to Varkala, every thing was perfect. In our trip in the south of Kerala Mr.Flabour Welben arranged for us also hotel in Kanyakumari and Varkala at very good prices. Mr.Flabour Welben was very kind and professional, and he had made our trip comfortable and interesting, dedicating to ourselves a lot of his time.",
    reviewDate: "2024-03-15",
    location: "Italy",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    source: "google",
    verified: true
  }
];