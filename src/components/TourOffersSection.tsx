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
      {/* Full-bleed background image extended to edges */}
      <div className="relative extend-left overflow-hidden">
        {/* Left colored panel that stops before the enquiry form (rounded right edge) */}
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: 'calc(100% - 18rem)',
            background: 'var(--offers-bg)',
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem'
          }}
        />
        {/* optional scrim for subtle depth over the colored panel */}
        <div className="absolute left-0 top-0 h-full" style={{ width: 'calc(100% - 18rem)', background: 'linear-gradient(0deg, rgba(0,0,0,0.06), rgba(0,0,0,0.01))' }} />

        <div className="relative container mx-auto px-4 py-6 lg:py-8 max-w-6xl min-h-[220px]">
          {/* Section Header overlay - shifted left on large screens */}
          <div className="text-left mb-10 text-white lg:-translate-x-[10vw] transform">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{sectionTitle}</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:items-start relative">
            {/* Left Column - Tour Packages Carousel (takes left area, transparent cards) */}
            <div className="flex-1 lg:w-[65%] p-3 lg:pr-6">
                <div className="relative px-6" style={{ transform: 'translateX(-10vw)' }}>
                {/* Autoplay slideshow: prev/next buttons removed. Pause on hover implemented on parent wrapper. */}

                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 transition-all duration-300"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                >
                  {getCurrentTours().map((tour) => (
                    <Link
                      key={tour.id}
                      to={`/tours/${tour.slug}`}
                      className="group flex flex-col items-center transition-transform duration-300 hover:scale-[1.05] focus:scale-[1.05]"
                      aria-label={`View details for ${tour.title} tour`}
                    >
                        {/* Increased oval card height and stronger border for prominence */}
                        <div className="relative w-32 h-40 sm:w-36 sm:h-44 lg:w-44 lg:h-56 overflow-hidden rounded-full border-4 border-white/40 shadow-card transition-all duration-300 mb-3">
                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-300" />
                      </div>

                    <div className="text-center">
                      <h3 className="text-sm sm:text-sm font-semibold text-white leading-tight">{tour.title}</h3>
                      <p className="text-xs text-white/80 mt-1 line-clamp-2 max-w-[140px]">{tour.description}</p>
                    </div>
                    </Link>
                  ))}
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - mobile stacked form (desktop overlay will be absolute below) */}
            {showEnquiryForm && (
              <div className="lg:w-[30%] mt-6 lg:mt-0 lg:relative">
                <div className="lg:hidden w-full">
                  <div className="bg-slate-900 text-white rounded-lg p-3">
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

          {/* Desktop-overlayed enquiry form aligned with carousel center */}
          {showEnquiryForm && (
            <div
              className="hidden lg:block absolute z-50"
              style={{
                top: '42%',
                right: '14rem',
                transform: 'translateY(-50%)',
                maxWidth: '28rem'
              }}
            >
              <div className="-left-12 -mt-6">
                <svg width="80" height="160" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M0 0 C30 20, 60 40, 80 80 C60 120, 30 140, 0 160 L0 0 Z" fill="rgba(255,255,255,0.06)" />
                </svg>
              </div>
              <div className="w-full lg:max-w-xs">
                <div className="px-2">
                  {/* Stronger visual separation: semi-opaque backdrop, larger shadow, and border */}
                  {/* remove outer border to avoid double-border with inner Card */}
                  <div className="bg-white/6 backdrop-blur-sm text-white rounded-xl p-4 shadow-2xl">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourOffersSection;
