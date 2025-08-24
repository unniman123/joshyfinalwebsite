import { Tour } from "@/lib/api";
import InteractiveItinerary from "@/components/InteractiveItinerary";
import VerticalImageGallery from "@/components/VerticalImageGallery";

interface ItinerarySectionProps {
  tour: Tour;
}

const ItinerarySection = ({ tour }: ItinerarySectionProps) => {
  // Enhanced logic for itinerary images with validation
  const getItineraryImages = () => {
    if (!tour.images || tour.images.length <= 1) {
      // If no images or only one image, return empty array (VerticalImageGallery handles this)
      return [];
    }
    // Return all images except the first one (which is used in overview)
    return tour.images.slice(1);
  };

  const itineraryImages = getItineraryImages();

  // Enhanced content validation for itinerary
  const getItineraryContent = () => {
    if (tour.itinerary?.trim()) {
      return tour.itinerary.trim();
    }
    return "Detailed itinerary coming soon...";
  };

  const itineraryContent = getItineraryContent();

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 50-50 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left side - Vertical Image Gallery (50%) */}
          <div className="order-2 lg:order-1">
            <VerticalImageGallery
              images={itineraryImages}
              altPrefix={`${tour.title} itinerary`}
            />
          </div>

          {/* Right side - Interactive Itinerary Content (50%) */}
          <div className="order-1 lg:order-2">
            <InteractiveItinerary
              itinerary={itineraryContent}
              tourTitle={tour.title}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;