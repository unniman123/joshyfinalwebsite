import { useState } from "react";
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
      messagePlaceholder: "Describe your preferred destination and dates"
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
  const toursPerPage = 3;
  const totalPages = Math.ceil(tourOffers.length / toursPerPage);



  // Carousel navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get current tours to display
  const getCurrentTours = () => {
    const startIndex = currentIndex * toursPerPage;
    return tourOffers.slice(startIndex, startIndex + toursPerPage);
  };



  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {sectionTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-golden mx-auto mb-6"></div>
        </div>

        {/* Two-Column Layout: 70% Tours + 30% Enquiry Form */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
          {/* Left Column - Tour Packages Carousel (70% on desktop) */}
          <div className="flex-1 lg:w-[70%]">
            <div className="relative px-12">
              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/3 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-golden/20 hover:bg-golden hover:text-white shadow-lg"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                aria-label="Previous tours"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-golden/20 hover:bg-golden hover:text-white shadow-lg"
                onClick={goToNext}
                disabled={currentIndex === totalPages - 1}
                aria-label="Next tours"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Tour Cards Carousel - Oval Shaped Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
                {getCurrentTours().map((tour) => (
                  <Link
                    key={tour.id}
                    to={`/tours/${tour.slug}`}
                    className="group flex flex-col items-center transition-[transform] duration-300 hover:scale-[1.05] focus:scale-[1.05]"
                    aria-label={`View details for ${tour.title} tour`}
                  >
                    {/* Oval Image Area */}
                    <div className="relative w-32 h-40 sm:w-36 sm:h-44 lg:w-40 lg:h-48 overflow-hidden rounded-full border-2 border-golden/30 hover:border-golden/50 shadow-card hover:shadow-warm hover:shadow-golden/20 transition-all duration-300 mb-3">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                      {/* Tour Name Overlay on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white text-sm sm:text-base font-bold text-center px-3 leading-tight drop-shadow-lg">
                          {tour.title}
                        </h3>
                      </div>
                    </div>

                    {/* Tour Name Below Card */}
                    <div className="text-center">
                      <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight group-hover:text-golden transition-colors duration-300">
                        {tour.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 max-w-[160px]">
                        {tour.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-golden' : 'bg-muted-foreground/30'
                      }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Enquiry Form (30% on desktop) */}
          {showEnquiryForm && (
            <div className="lg:w-[30%] mt-8 lg:mt-0">
              <TourEnquiryForm
                title={formConfig.title}
                formType="tour"
                showMessage={formConfig.fields.showMessage}
                showDate={formConfig.fields.showDate}
                showDestination={formConfig.fields.showDestination}
                messagePlaceholder={formConfig.fields.messagePlaceholder}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourOffersSection;
