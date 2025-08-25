import { Tour } from "@/lib/api";
import { getItineraryImages, getStructuredItinerary } from "@/lib/admin-utils";
import InteractiveItinerary from "@/components/InteractiveItinerary";
import ItineraryImageGallery from "@/components/ItineraryImageGallery";

interface ItinerarySectionProps {
  tour: Tour;
}

const ItinerarySection = ({ tour }: ItinerarySectionProps) => {
  // Use admin-ready utility functions for dynamic content
  const itineraryImages = getItineraryImages(tour);
  const structuredItinerary = getStructuredItinerary(tour);

  // Calculate itinerary days from structured data or fallback to tour duration
  const itineraryDays = structuredItinerary.length > 0 ? structuredItinerary.length : tour.duration || 6;

  // Legacy itinerary content for backward compatibility
  const itineraryContent = tour.itinerary?.trim() || "Detailed itinerary coming soon...";

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 50-50 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left side - Interactive Image Gallery (50%) */}
          <div className="order-2 lg:order-1">
            <ItineraryImageGallery
              images={itineraryImages}
              tourTitle={tour.title}
              itineraryDays={itineraryDays}
            />
          </div>

          {/* Right side - Interactive Itinerary Content (50%) */}
          <div className="order-1 lg:order-2">
            <InteractiveItinerary
              itinerary={itineraryContent}
              tourTitle={tour.title}
              structuredItinerary={structuredItinerary}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;