import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TourEnquiryForm from "@/components/TourInquiryForm";
import SectionTitle from "@/components/ui/section-title";
import { getAllTours } from "@/lib/api";
import keralaTourCard from "@/assets/kerala-tour-card.jpg";
import heroRajasthanPalace from "@/assets/hero-rajasthan-palace.jpg";
import heroAyurvedaSpa from "@/assets/hero-ayurveda-spa.jpg";
import goldenTriangleTourCard from "@/assets/tour-golden-triangle.jpg";
// heroKeralaBackwaters removed per design change

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
  
  // Touch/Swipe state for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Fetch tours from database on component mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const toursData = await getAllTours();

        // Transform database tours to TourOffer format
        // Show up to 8 tours (prioritizes featured tours due to API ordering)
        const transformedTours: TourOffer[] = toursData.slice(0, 8).map((tour: any) => ({
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

  // Swipe handlers for mobile touch gestures
  const minSwipeDistance = 50; // Minimum distance for a swipe

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scrollRight();
    }
    if (isRightSwipe) {
      scrollLeft();
    }
  };

  // Manual navigation handlers with infinite scroll
  const scrollLeft = () => {
    if (carouselRef.current && tourOffers.length > 0) {
      const cardWidth = 160; // w-40 (160px) at lg breakpoint
      const gap = 32; // gap-8 (32px)
      const scrollAmount = cardWidth + gap;
      const singleSetWidth = tourOffers.length * scrollAmount; // Width of one set of tours

      // Pause auto-scroll
      setIsPaused(true);

      const currentScroll = carouselRef.current.scrollLeft;

      // If we're at the beginning of the first set, jump to the middle set
      if (currentScroll < scrollAmount) {
        // Jump to the equivalent position in the middle set (second copy)
        carouselRef.current.scrollLeft = singleSetWidth + currentScroll;
      }

      // Scroll left by one card
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });

      // Resume auto-scroll after 5 seconds of inactivity
      setTimeout(() => setIsPaused(false), 5000);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current && tourOffers.length > 0) {
      const cardWidth = 160; // w-40 (160px) at lg breakpoint
      const gap = 32; // gap-8 (32px)
      const scrollAmount = cardWidth + gap;
      const singleSetWidth = tourOffers.length * scrollAmount; // Width of one set of tours

      // Pause auto-scroll
      setIsPaused(true);

      const currentScroll = carouselRef.current.scrollLeft;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

      // If we're at the end of the last set, jump to the beginning of the first set
      if (currentScroll + scrollAmount > maxScroll - scrollAmount) {
        // Calculate relative position within the set and jump to first set
        const relativePosition = currentScroll - (singleSetWidth * 2);
        carouselRef.current.scrollLeft = Math.max(0, relativePosition);
      }

      // Scroll right by one card
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      // Resume auto-scroll after 5 seconds of inactivity
      setTimeout(() => setIsPaused(false), 5000);
    }
  };



  return (
    <section className="relative">
      {/* Main container with proper layout */}
      <div className="relative container mx-auto py-4 sm:py-6 lg:py-8 px-2 sm:px-4 max-w-7xl min-h-[220px]">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:items-start relative">
            {/* Left side - Tours section (70% width) */}
            <div className="flex-1 lg:w-[70%] relative">
              {/* Section Header - Modern gradient badge design with custom brand colors */}
              <div style={{ fontFamily: "'Sora', sans-serif" }}>
                <SectionTitle 
                  title={sectionTitle}
                  variant="underline"
                  colorScheme="custom-brand"
                  align="center"
                  size="lg"
                  className="mt-4"
                />
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
                {/* Left Navigation Button - Larger touch targets on mobile */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Previous tours"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
                </button>

                {/* Right Navigation Button - Larger touch targets on mobile */}
                <button
                  onClick={scrollRight}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Next tours"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
                </button>

                <div 
                  className="relative overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide" 
                  ref={carouselRef} 
                  style={{ scrollBehavior: 'smooth', paddingLeft: 'min(4vw, 32px)', paddingRight: 'min(4vw, 32px)' }}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {/* Continuous sliding carousel wrapper with smooth CSS animation */}
                  <div
                    className={`flex gap-4 sm:gap-6 md:gap-8 animate-scroll-left ${isPaused ? 'paused' : ''}`}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    style={{ transform: 'translateX(0px)' }}
                  >
                    {duplicatedTours.filter(tour => tour && tour.slug).map((tour, index) => (
                      <Link
                        key={`${tour.id}-${index}`}
                        to={`/tours/${tour.slug}`}
                        className="group flex flex-col items-center flex-shrink-0 transition-transform duration-300 hover:scale-[1.05] focus:scale-[1.05] min-w-[120px]"
                        aria-label={`View details for ${tour.title} tour`}
                      >
                        {/* Oval tour card - Responsive sizes */}
                        <div className="relative w-28 h-36 xs:w-32 xs:h-40 sm:w-36 sm:h-44 lg:w-40 lg:h-52 overflow-hidden rounded-full border shadow-card transition-all duration-300 mb-2 sm:mb-3" style={{ borderColor: 'rgba(0, 0, 0, 0.2)' }}>
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
                        <div className="text-center max-w-[140px] sm:max-w-[160px] px-1">
                          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 leading-tight line-clamp-2">
                            {tour.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Soft edge fades to avoid abrupt clipping of oval cards */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 lg:w-20" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)', zIndex: 15 }} />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 lg:w-20" style={{ background: 'linear-gradient(-90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)', zIndex: 15 }} />

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
              <div className="lg:w-[30%] mt-4 sm:mt-6 lg:mt-10 lg:mr-6 lg:ml-6">
                <div className="w-full max-w-md mx-auto lg:max-w-none">
                  {/* Form with light theme - consistent across all devices */}
                  <div className="bg-white text-foreground rounded-lg lg:rounded-xl p-4 sm:p-5 lg:p-4 shadow-sm lg:shadow-2xl">
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
