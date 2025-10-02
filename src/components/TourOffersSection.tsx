import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TourEnquiryForm from "@/components/TourInquiryForm";
import keralaTourCard from "@/assets/kerala-tour-card.jpg";
import heroRajasthanPalace from "@/assets/hero-rajasthan-palace.jpg";
import heroAyurvedaSpa from "@/assets/hero-ayurveda-spa.jpg";
import goldenTriangleTourCard from "@/assets/tour-golden-triangle.jpg";

// Enhanced tour card interface with descriptions
interface TourOffer {
  id: number;
  title: string;
  image: string;
  slug: string;
  description: string; // 2-line description for card display
}

// Admin configuration interfaces
interface TourFormConfig {
  title: string;
  fields: {
    showMessage: boolean;
    showDate: boolean;
    showDestination: boolean;
    messagePlaceholder: string;
  };
}

interface TourOffersSectionProps {
  sectionTitle?: string;
  showEnquiryForm?: boolean;
  formConfig?: TourFormConfig;
}

const TourOffersSection = ({
  sectionTitle = "Our Top Selling Packages",
  showEnquiryForm = true,
  formConfig = {
    title: "Quick Enquiry",
    fields: {
      showMessage: true,
      showDate: false,
      showDestination: false,
      messagePlaceholder: "Write us in short of your requirements to customise a package"
    }
  }
}: TourOffersSectionProps = {}) => {
  const tourOffers: TourOffer[] = [
    {
      id: 1,
      title: "Kerala Backwaters",
      image: keralaTourCard,
      slug: "kerala-backwaters-explorer",
      description: "Experience the serene beauty of Kerala's famous backwaters with traditional houseboat stays"
    },
    {
      id: 2,
      title: "Rajasthan Royal",
      image: heroRajasthanPalace,
      slug: "royal-rajasthan-heritage",
      description: "Journey through magnificent palaces, historic forts, and vibrant markets in the land of maharajas"
    },
    {
      id: 3,
      title: "Ayurveda Wellness",
      image: heroAyurvedaSpa,
      slug: "ayurveda-wellness-retreat",
      description: "Rejuvenate your body and mind with authentic Ayurvedic treatments in peaceful Kerala settings"
    },
    {
      id: 4,
      title: "Golden Triangle",
      image: goldenTriangleTourCard,
      slug: "golden-triangle-classic",
      description: "Discover India's most iconic destinations: Delhi, Agra, and Jaipur in this comprehensive tour"
    },
    {
      id: 5,
      title: "Kerala Heritage",
      image: keralaTourCard,
      slug: "kerala-heritage-explorer",
      description: "Explore Kerala's rich cultural heritage, ancient temples, and traditional art forms"
    },
    {
      id: 6,
      title: "Goa Beach Paradise",
      image: heroAyurvedaSpa,
      slug: "goa-beach-paradise",
      description: "Relax on pristine beaches, enjoy water sports, and experience Goa's vibrant nightlife"
    }
  ];

  // Carousel state management
  const [currentIndex, setCurrentIndex] = useState(0);
  // Autoplay state: pause when user hovers or focuses the carousel
  const [isPaused, setIsPaused] = useState(false);
  const AUTOPLAY_INTERVAL_MS = 4000;
  const toursPerPage = 4;
  const totalPages = Math.ceil(tourOffers.length / toursPerPage);



  // Carousel navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Autoplay effect: advance slide every AUTOPLAY_INTERVAL_MS when not paused
  useEffect(() => {
    if (isPaused || totalPages <= 1) return;
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [isPaused, totalPages]);

  // Get current tours to display
  const getCurrentTours = () => {
    const startIndex = currentIndex * toursPerPage;
    return tourOffers.slice(startIndex, startIndex + toursPerPage);
  };



  return (
    <section className="relative">
      {/* Full-bleed background with blue panel */}
      <div className="relative extend-left overflow-hidden">
        <div className="relative container mx-auto px-4 py-6 lg:py-8 max-w-7xl min-h-[220px]">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-start relative">
            {/* Left side - Blue panel with tours (70% width) */}
            <div className="flex-1 lg:w-[70%] relative">
              {/* Blue background panel - only covers the tours area */}
              <div
                className="absolute left-0 top-0 bottom-0 -ml-[50vw] w-[calc(100%+50vw)] z-0"
                style={{
                  background: 'var(--offers-bg)',
                  borderTopRightRadius: '1rem',
                  borderBottomRightRadius: '1rem'
                }}
              />
              {/* Scrim overlay */}
              <div 
                className="absolute left-0 top-0 bottom-0 -ml-[50vw] w-[calc(100%+50vw)] z-0" 
                style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.06), rgba(0,0,0,0.01))' }} 
              />

              {/* Section Header */}
              <div className="relative z-10 text-left mb-10 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">{sectionTitle}</h2>
              </div>

              {/* Tour Carousel */}
              <div className="relative z-10">
                <div className="relative overflow-hidden">
                  {/* Sliding carousel wrapper */}
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                  >
                    {Array.from({ length: totalPages }).map((_, pageIndex) => (
                      <div
                        key={pageIndex}
                        className="min-w-full flex-shrink-0"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pl-2 pr-4">
                          {tourOffers
                            .slice(pageIndex * toursPerPage, (pageIndex + 1) * toursPerPage)
                            .map((tour) => (
                              <Link
                                key={tour.id}
                                to={`/tours/${tour.slug}`}
                                className="group flex flex-col items-center transition-transform duration-300 hover:scale-[1.05] focus:scale-[1.05]"
                                aria-label={`View details for ${tour.title} tour`}
                              >
                                {/* Oval tour card */}
                                <div className="relative w-32 h-40 sm:w-36 sm:h-44 lg:w-40 lg:h-52 overflow-hidden rounded-full border-4 border-white/40 shadow-card transition-all duration-300 mb-3">
                                  <img 
                                    src={tour.image} 
                                    alt={tour.title} 
                                    className="w-full h-full object-cover" 
                                    loading="lazy" 
                                    decoding="async" 
                                  />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-300" />
                                </div>

                                {/* Only title - description removed */}
                                <div className="text-center">
                                  <h3 className="text-sm sm:text-base font-semibold text-white leading-tight">
                                    {tour.title}
                                  </h3>
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Enquiry form (30% width, outside blue panel) */}
            {showEnquiryForm && (
              <div className="lg:w-[30%] mt-6 lg:mt-0">
                <div className="w-full">
                  {/* Form with green theme */}
                  <div className="bg-green-900 lg:bg-green-600/10 text-white lg:text-green-900 rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-sm lg:shadow-2xl">
                    <TourEnquiryForm
                      title={formConfig.title}
                      formType="tour"
                      showMessage={formConfig.fields.showMessage}
                      showDate={formConfig.fields.showDate}
                      showDestination={formConfig.fields.showDestination}
                      messagePlaceholder={formConfig.fields.messagePlaceholder}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourOffersSection;
