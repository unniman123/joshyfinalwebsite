import { Tour } from "@/lib/api";
import OverviewSection from "@/components/OverviewSection";
import ItinerarySection from "@/components/ItinerarySection";
import AdminControllableSection from "@/components/AdminControllableSection";
import AdminControllableItinerary from "@/components/AdminControllableItinerary";
import AdminControllableImageGallery from "@/components/AdminControllableImageGallery";

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
        <section className="py-2 md:py-3 lg:py-4 px-4">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center">
              {tour.title}
            </h1>
          </div>
        </section>

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
            return (
              <section key={section.id} className="py-12 md:py-16 lg:py-20 bg-muted/30">
                <div className="container mx-auto max-w-7xl px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
                    {/* Left side - Images (30%) */}
                    <div className="order-2 lg:order-1 lg:col-span-3">
                      {hasStructuredImages && (
                        <AdminControllableImageGallery
                          images={tour.images}
                          section="itinerary"
                          tourTitle={tour.title}
                        />
                      )}
                    </div>

                    {/* Right side - Itinerary (70%) */}
                    <div className="order-1 lg:order-2 lg:col-span-7">
                      {hasStructuredItinerary ? (
                        <AdminControllableItinerary
                          itineraryDays={tour.itineraryDays}
                          tourTitle={tour.title}
                        />
                      ) : (
                        <div className="space-y-6">
                          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            {section.title}
                          </h2>
                          <div
                            className="text-muted-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: section.content || '' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
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