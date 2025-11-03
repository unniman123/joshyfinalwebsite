import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TourEnquiryForm from "@/components/TourInquiryForm";
import { getAllTours } from "@/lib/api";
import keralaTourCard from "@/assets/kerala-tour-card.jpg";
import heroRajasthanPalace from "@/assets/hero-rajasthan-palace.jpg";
import heroAyurvedaSpa from "@/assets/hero-ayurveda-spa.jpg";
import goldenTriangleTourCard from "@/assets/tour-golden-triangle.jpg";
import heroKeralaBackwaters from "@/assets/hero-kerala-backwaters.jpg";

// Enhanced tour card interface with descriptions
interface TourOffer {
  id: string;
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
  const [tourOffers, setTourOffers] = useState<TourOffer[]>([]);
  const [loading, setLoading] = useState(true);

  // Infinite loop carousel state with smooth CSS animation
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch tours from database on component mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const toursData = await getAllTours();

        // Transform database tours to TourOffer format
        const transformedTours: TourOffer[] = toursData.slice(0, 6).map((tour: any) => ({
          id: tour.id,
          title: tour.title,
          image: tour.image || keralaTourCard, // fallback to default image
          slug: tour.slug,
          description: tour.description || tour.short_description || `${tour.title} - Discover amazing experiences`
        }));

        setTourOffers(transformedTours);
      } catch (error) {
        console.error("Error fetching tours for TourOffersSection:", error);
        // Fallback to empty array on error
        setTourOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Duplicate tours multiple times for seamless infinite loop
  const duplicatedTours = [...tourOffers, ...tourOffers, ...tourOffers];

  // Manual navigation handlers
  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = 160; // w-40 (160px) at lg breakpoint
      const gap = 32; // gap-8 (32px)
      const scrollAmount = cardWidth + gap;
      
      // Pause auto-scroll and manually scroll
      setIsPaused(true);
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      
      // Resume auto-scroll after 5 seconds of inactivity
      setTimeout(() => setIsPaused(false), 5000);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = 160; // w-40 (160px) at lg breakpoint
      const gap = 32; // gap-8 (32px)
      const scrollAmount = cardWidth + gap;
      
      // Pause auto-scroll and manually scroll
      setIsPaused(true);
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Resume auto-scroll after 5 seconds of inactivity
      setTimeout(() => setIsPaused(false), 5000);
    }
  };



  return (
    <section
      className="relative"
      style={{
        // Subtle peach background with decorative image and soft top blend to hero
        background: `linear-gradient(to top, rgba(251,242,237,0) 0%, rgba(251,242,237,0.95) 40%), linear-gradient(180deg, #fbf2ed 0%, #fbf2ed 100%), url(${heroKeralaBackwaters})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right top',
        backgroundSize: '45% auto',
        // Pull section up to overlap hero slightly for a graceful infusion
        marginTop: '-48px',
        paddingTop: '56px'
      }}
    >
      {/* Main container with proper layout */}
      <div className="relative container mx-auto py-6 lg:py-8 max-w-7xl min-h-[220px]">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start relative">
            {/* Left side - Tours section (70% width) */}
            <div className="flex-1 lg:w-[70%] relative">
              {/* Section Header - positioned with proper spacing from top */}
              <div className="relative z-10 text-left mb-10 mt-4">
                <div className="inline-block px-4 py-2 rounded-md shadow-md" style={{ backgroundColor: '#2C5282', color: '#FFFFFF' }}>
                  <h2 className="text-xl md:text-2xl font-bold mb-0">{sectionTitle}</h2>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="text-gray-600">Loading tours...</div>
                </div>
              )}

              {/* Tour Carousel - Infinite Loop without background card */}
              {!loading && tourOffers.length > 0 && (
                <div className="relative">
                {/* Left Navigation Button */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label="Previous tours"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-800" />
                </button>

                {/* Right Navigation Button */}
                <button
                  onClick={scrollRight}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label="Next tours"
                >
                  <ChevronRight className="h-5 w-5 text-gray-800" />
                </button>

                <div className="relative overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide" ref={carouselRef} style={{ scrollBehavior: 'smooth', paddingLeft: 'min(6vw, 48px)', paddingRight: 'min(6vw, 48px)' }}>
                  {/* Continuous sliding carousel wrapper with smooth CSS animation */}
                  <div
                    className={`flex gap-6 md:gap-8 animate-scroll-left ${isPaused ? 'paused' : ''}`}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    style={{ transform: 'translateX(0px)' }}
                  >
                    {duplicatedTours.map((tour, index) => (
                      <Link
                        key={`${tour.id}-${index}`}
                        to={`/tours/${tour.slug}`}
                        className="group flex flex-col items-center flex-shrink-0 transition-transform duration-300 hover:scale-[1.05] focus:scale-[1.05]"
                        aria-label={`View details for ${tour.title} tour`}
                      >
                        {/* Oval tour card */}
                        <div className="relative w-32 h-40 sm:w-36 sm:h-44 lg:w-40 lg:h-52 overflow-hidden rounded-full border shadow-card transition-all duration-300 mb-3" style={{ borderColor: 'rgba(0, 0, 0, 0.2)' }}>
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
                        <div className="text-center max-w-[160px]">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-tight">
                            {tour.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Soft edge fades to avoid abrupt clipping of oval cards */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 lg:w-20" style={{ background: 'linear-gradient(90deg, #fbf2ed 0%, rgba(251,242,237,0) 100%)', zIndex: 15 }} />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 lg:w-20" style={{ background: 'linear-gradient(-90deg, #fbf2ed 0%, rgba(251,242,237,0) 100%)', zIndex: 15 }} />

                  {/* Scroll indicator - shows continuous animation */}
                  <div className="flex justify-center mt-6">
                    <div className="text-gray-700 text-xs">
                      Hover to pause
                    </div>
                  </div>
                </div>
              )}

              {/* No tours message */}
              {!loading && tourOffers.length === 0 && (
                <div className="flex justify-center items-center py-12">
                  <div className="text-gray-600">No tours available at the moment.</div>
                </div>
              )}
            </div>

            {/* Right side - Enquiry form (30% width, outside Blue Greeny panel) */}
            {showEnquiryForm && (
              <div className="lg:w-[30%] mt-6 lg:mt-0 lg:mr-6">
                <div className="w-full">
                  {/* Form with light theme - consistent across all devices */}
                  <div className="bg-green-600/10 text-green-900 rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-sm lg:shadow-2xl">
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
    </section>
  );
};

export default TourOffersSection;
