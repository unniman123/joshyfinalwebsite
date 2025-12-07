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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
// heroKeralaBackwaters removed per design change

// Enhanced tour card interface with descriptions
interface TourOffer {
  id: string;
  title: string;
  image: string;
  slug: string;
  description: string; // 2-line description for card display
  isDayOutPackage?: boolean;
  isFeatured?: boolean;
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
    title: "QUICK ENQUIRY",
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

  // Infinite loop carousel state with custom auto-scroll
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch tours from database on component mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const toursData = await getAllTours();

        // Transform database tours to TourOffer format
        // Do NOT impose a fixed limit here — show all eligible tours.
        const transformedTours: TourOffer[] = toursData.map((tour: any) => ({
          id: tour.id,
          title: tour.title,
          image: tour.image || keralaTourCard, // fallback to default image
          slug: tour.slug,
          description: tour.description || tour.short_description || `${tour.title} - Discover amazing experiences`,
          // expose day-out flag from backend transform if present (supabase-api.ts will add this)
          isDayOutPackage: (tour as any).is_day_out_package ?? (tour as any).isDayOutPackage ?? false,
          // expose featured flag from backend transform if present (supabase-api.ts will add this)
          isFeatured: (tour as any).is_featured ?? (tour as any).isFeatured ?? false
        }));

        // Filter for featured tours and exclude day-out packages from the featured carousel (business rule).
        const featuredTours = transformedTours.filter(t => t.isFeatured && !t.isDayOutPackage);

        // Deduplicate by id to guard against accidental duplicates from the API
        const uniqueById = Array.from(new Map(featuredTours.map(t => [t.id, t])).values());

        setTourOffers(uniqueById);
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

  // Custom auto-scroll implementation to replace CSS animation
  useEffect(() => {
    if (!api) return;

    const startAutoScroll = () => {
      // Clear any existing interval first
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }

      autoScrollIntervalRef.current = setInterval(() => {
        // Only scroll if not paused
        if (!isPaused && api) {
          console.log('Auto-scrolling to next slide');
          api.scrollNext();
        } else {
          console.log('Auto-scroll paused or api not available', { isPaused, hasApi: !!api });
        }
      }, 2000); // Increased speed to 2 seconds (original CSS animation was 20 seconds)
    };

    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };
  }, [api]); // Only depend on api, not isPaused

  // Handle pause/resume by clearing and restarting interval
  useEffect(() => {
    console.log('Pause state changed:', { isPaused, hasApi: !!api });

    if (!api) return;

    // Clear existing interval
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
      console.log('Cleared existing auto-scroll interval');
    }

    // Restart interval if not paused
    if (!isPaused) {
      autoScrollIntervalRef.current = setInterval(() => {
        if (api) {
          console.log('Auto-scrolling to next slide (pause/resume handler)');
          api.scrollNext();
        }
      }, 2000); // Increased speed to 2 seconds
      console.log('Started new auto-scroll interval');
    }
  }, [isPaused, api]);
  // No need for Embla API auto-scroll when using CSS animation
  // The isPaused state controls the animation via the 'paused' class
  return (
    <section className="relative">
      {/* Main container with proper layout */}
      <div className="relative container mx-auto py-4 sm:py-6 lg:py-8 px-2 sm:px-4 max-w-7xl min-h-[220px]">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:items-start relative">
            {/* Left side - Tours section (70% width) */}
            <div className="flex-1 lg:w-[70%] relative">
              {/* Section Header - Plain title matching banner style */}
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-foreground text-center mb-6 md:mb-8"
                style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em', lineHeight: '1.2' }}
              >
                {sectionTitle}
              </h2>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="text-gray-600">Loading tours...</div>
                </div>
              )}

              {/* Tour Carousel - Infinite Loop without background card */}
              {!loading && tourOffers.length > 0 && (
                <div className="relative">
              <Carousel
                setApi={setApi}
                opts={{ align: "start", loop: true, containScroll: "trimSnaps" }}
                className="relative"
                onMouseEnter={() => {
                  console.log('Mouse entered - pausing auto-scroll');
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  console.log('Mouse left - resuming auto-scroll');
                  setIsPaused(false);
                }}
                onFocus={() => {
                  console.log('Focused - pausing auto-scroll');
                  setIsPaused(true);
                }}
                onBlur={() => {
                  console.log('Blurred - resuming auto-scroll');
                  setIsPaused(false);
                }}
              >
                <CarouselContent className="overflow-x-visible">
                  {/* Render tours 3 times for seamless infinite scroll (animation translates by -33.333%) */}
                  {tourOffers.map((tour, index) => (
                    <CarouselItem
                      key={`${tour.id}-${index}`}
                      className="flex-shrink-0 flex-grow-0 basis-auto pl-2 sm:pl-3 md:pl-4"
                    >
                      <Link
                        to={`/tours/${tour.slug}`}
                        className="group flex flex-col items-center transition-transform duration-300 hover:scale-[1.05] focus:scale-[1.05]"
                        aria-label={`View details for ${tour.title} tour`}
                      >
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
                        <div className="text-center max-w-[140px] sm:max-w-[160px] px-1">
                          <h3
                            className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 leading-tight line-clamp-2"
                            style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em', lineHeight: '1.2' }}
                          >
                            {tour.title}
                          </h3>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation buttons - restored for user control */}
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border shadow-md h-10 w-10" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border shadow-md h-10 w-10" />
              </Carousel>

                {/* Soft edge fades to avoid abrupt clipping of oval cards */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 lg:w-20" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)', zIndex: 15 }} />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 lg:w-20" style={{ background: 'linear-gradient(-90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)', zIndex: 15 }} />

                  {/* Scroll indicator removed per admin instruction */}
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
              <div className="lg:w-[30%] mt-6 sm:mt-8 lg:mt-0">
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
