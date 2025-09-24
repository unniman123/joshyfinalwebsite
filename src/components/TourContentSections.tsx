import { useState } from "react";
import { Tour } from "@/lib/api";
import OverviewSection from "@/components/OverviewSection";
import ItinerarySection from "@/components/ItinerarySection";
import AdminControllableSection from "@/components/AdminControllableSection";
import AdminControllableItinerary from "@/components/AdminControllableItinerary";
import AdminControllableImageGallery from "@/components/AdminControllableImageGallery";
import ItineraryHighlightCarousel from "./ItineraryHighlightCarousel";
import ItineraryHighlightList from "./ItineraryHighlightList";

interface TourContentSectionsProps {
  tour: Tour;
}

const TourContentSections = ({ tour }: TourContentSectionsProps) => {
  // Check if tour has structured admin data
  const hasStructuredData = tour.sections && tour.sections.length > 0;
  const hasStructuredItinerary = tour.itineraryDays && tour.itineraryDays.length > 0;
  const hasStructuredImages = tour.images && tour.images.length > 0;

  if (hasStructuredData || hasStructuredItinerary || hasStructuredImages) {
    // Render admin-controlled sections (overview no longer requires images)
    const visibleSections = tour.sections
      ?.filter(section => section.isVisible)
      ?.sort((a, b) => a.order - b.order) || [];

    return (
      <div className="w-full">
        {/* Tour Title Section - Center Aligned */}
        <section className="pt-12 md:pt-16 lg:pt-20 pb-2 md:py-3 lg:py-4 px-4">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center">
              {tour.title}
            </h1>
          </div>
        </section>

        {/* Optional itinerary highlight list (admin data present) - vertical cards replacing detailed itinerary */}
        {tour.itineraryDays && tour.itineraryDays.length > 0 && (
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Highlights</h2>

              <div className="relative">
                {/* Decorative left-side vertical stripe / artwork */}
                <div className="absolute left-[-40px] top-0 bottom-0 hidden lg:block" aria-hidden="true">
                  <div className="w-32 h-full bg-gradient-to-b from-brand-100 to-brand-200 rounded-r-xl shadow-inner opacity-80" />
                </div>

                <div className="pl-10">
                  {/* Mobile: show carousel, Desktop: show vertical list */}
                  <div className="block lg:hidden">
                    <ItineraryHighlightCarousel days={tour.itineraryDays} images={tour.images} />
                  </div>
                  <div className="hidden lg:block">
                    <ItineraryHighlightList days={tour.itineraryDays} images={tour.images} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Admin-controlled sections */}
        {visibleSections.map((section) => {
          if (section.type === 'overview') {
            return (
              <section key={section.id} className="py-3 md:py-4 lg:py-6">
                <div className="container mx-auto max-w-7xl px-4">
                  {/* Full-width content layout (no images) */}
                  <div className="w-full">
                    <div className="space-y-6">
                      {/* Removed duplicate title - using general tour title above */}
                      <div className="prose prose-lg max-w-none">
                        <div
                          className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: section.content || '' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          if (section.type === 'itinerary') {
            // Replace legacy detailed itinerary with the highlights list — treat highlights as canonical itinerary now.
            return null;
          }

          // Other admin-controlled sections
          return (
            <AdminControllableSection
              key={section.id}
              section={section}
            />
          );
        })}
      </div>
    );
  }

  // Fallback to legacy components for backward compatibility
  return (
    <div className="w-full">
        {/* Tour Title Section - Center Aligned */}
        <section className="py-8 md:py-12 lg:py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center">
              {tour.title}
            </h1>
          </div>
        </section>

      {/* Legacy Overview Section */}
      <OverviewSection tour={tour} />

      {/* Legacy Itinerary Section */}
      <ItinerarySection tour={tour} />
    </div>
  );
};

export default TourContentSections;