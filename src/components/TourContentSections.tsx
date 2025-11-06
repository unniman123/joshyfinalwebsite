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
        <section className="pt-6 md:pt-12 lg:pt-16 pb-2 md:py-3 lg:py-4 px-2 md:px-4">
          <div className="container mx-auto max-w-7xl px-2 md:px-4">
            {/* Title in wood signboard design */}
            <div className="flex items-center justify-center md:justify-start">
              <div className="relative inline-flex items-center">
                <div className="hanging-board inline-flex items-start justify-center" aria-hidden="false">
                  <span className="rope rope-left" aria-hidden="true" />
                  <span className="rope rope-left-dup" aria-hidden="true" />
                  <span className="rope rope-right-dup" aria-hidden="true" />
                  <span className="rope rope-right" aria-hidden="true" />

                  <div className="board title-pill inline-flex items-center px-6 py-3 rounded-full shadow-md text-white">
                    <span className="title-pill-accent" aria-hidden="true" />
                    <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-0 leading-tight ml-3">
                      {tour.title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section - Directly below title */}
        {(() => {
          const overviewSection = visibleSections.find(s => s.type === 'overview');
          
          if (overviewSection) {
            return (
              <section className="pt-4 md:pt-6 pb-4 md:pb-6 px-2 md:px-4">
                <div className="container mx-auto max-w-7xl px-2 md:px-4">
                  <div className="prose prose-base md:prose-lg max-w-none">
                    <div
                      className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed text-justify"
                      dangerouslySetInnerHTML={{ __html: overviewSection.content || '' }}
                    />
                  </div>
                </div>
              </section>
            );
          }
          
          return null;
        })()}

        {/* Itinerary Section with Image Gallery */}
        {(() => {
          const itinerarySection = visibleSections.find(s => s.type === 'itinerary');

          if (itinerarySection) {
            return (
              <section className="pt-4 md:pt-6 lg:pt-8 pb-4 md:pb-6 lg:pb-8 bg-muted/30">
                <div className="container mx-auto max-w-7xl px-2 md:px-4">
                  {/* 30-70 Grid Layout - Images with Itinerary */}
                  <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 md:gap-6 lg:gap-10">
                    
                    {/* Left side - Image Gallery (30%) */}
                    <div className="order-2 lg:order-1 lg:col-span-3">
                      {hasStructuredImages && (
                        <AdminControllableImageGallery
                          images={tour.images}
                          section="itinerary"
                          tourTitle={tour.title}
                        />
                      )}
                    </div>

                    {/* Right side - Itinerary Content (70%) */}
                    <div className="order-1 lg:order-2 lg:col-span-7">
                      {hasStructuredItinerary ? (
                        <AdminControllableItinerary
                          itineraryDays={tour.itineraryDays}
                          tourTitle={tour.title}
                        />
                      ) : (
                        <>
                          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                            {itinerarySection.title}
                          </h2>
                          <div
                            className="text-muted-foreground leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{ __html: itinerarySection.content || '' }}
                          />
                        </>
                      )}
                    </div>
                    
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })()}

        {/* Other admin-controlled sections */}
        {visibleSections
          .filter(s => s.type !== 'overview' && s.type !== 'itinerary')
          .map((section) => (
            <AdminControllableSection
              key={section.id}
              section={section}
            />
          ))
        }
      </div>
    );
  }

  // Fallback to legacy components for backward compatibility
  return (
    <div className="w-full">
        {/* Tour Title Section - Center Aligned */}
        <section className="py-8 md:py-12 lg:py-16 px-4">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-center">
              <div className="relative inline-flex items-center">
                <div className="hanging-board inline-flex items-start justify-center" aria-hidden="false">
                  <span className="rope rope-left" aria-hidden="true" />
                  <span className="rope rope-left-dup" aria-hidden="true" />
                  <span className="rope rope-right-dup" aria-hidden="true" />
                  <span className="rope rope-right" aria-hidden="true" />

                  <div className="board title-pill inline-flex items-center px-8 py-4 rounded-full shadow-md text-white">
                    <span className="title-pill-accent" aria-hidden="true" />
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-0 leading-tight ml-4">
                      {tour.title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
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