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
    <section className="py-6 md:py-8 lg:py-10 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 30-70 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">

          {/* Left side - Image Gallery (30%) */}
          <div className="order-2 lg:order-1 lg:col-span-3">
            <ItineraryImageGallery
              images={itineraryImages}
              tourTitle={tour.title}
              itineraryDays={itineraryDays}
              dayImages={structuredItinerary.reduce((acc, day) => {
                if (day.images && day.images.length) acc[day.dayNumber] = day.images[0];
                return acc;
              }, {} as Record<number, string>)}
            />
          </div>

          {/* Right side - Itinerary Content (70%) */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <InteractiveItinerary
              itinerary={itineraryContent}
              itineraryDays={structuredItinerary}
              tourTitle={tour.title}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;