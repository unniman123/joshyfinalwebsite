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
        <section className="pt-4 sm:pt-6 md:pt-12 lg:pt-16 pb-2 sm:pb-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4">
          <div className="container mx-auto max-w-7xl px-2 sm:px-3 md:px-4">
            {/* Title in styled box with red section and white square */}
            <div className="flex items-center justify-center md:justify-start">
              <div className="relative inline-flex items-center w-full max-w-[95%] sm:max-w-none sm:w-auto">
                <style>{`
                  /* Compact title box like provided design */
                  .title-box {
                    position: relative;
                    background: #FFFFFF;
                    border-radius: 8px;
                    height: 60px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    display: inline-flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    min-width: 280px;
                    overflow: hidden;
                    width: 100%;
                  }

                  .title-red-section {
                    background: #C41E3A;
                    width: 60px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                  }

                  .title-white-section {
                    flex: 1 1 auto;
                    padding: 0 16px;
                    display: flex;
                    align-items: center;
                    height: 100%;
                  }

                  .title-text {
                    position: relative;
                    z-index: 2;
                    text-align: left;
                    color: #1A1A1A;
                    margin: 0;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1;
                    font-size: 24px;
                    font-weight: 600;
                  }

                  @media (max-width: 640px) {
                    .title-box {
                      min-width: 240px;
                      height: 48px;
                    }
                    .title-red-section {
                      width: 48px;
                    }
                    .title-white-section {
                      padding: 0 12px;
                    }
                    .title-text {
                      font-size: 18px;
                    }
                  }
                `}</style>
                
                <div className="title-box">
                  {/* Red Section (15%) */}
                  <div className="title-red-section"></div>
                  
                  {/* White Section with Title (85%) */}
                  <div className="title-white-section">
                    <h1 className="title-text" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}>
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
              <section className="pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4 md:pb-6 px-2 sm:px-3 md:px-4">
                <div className="container mx-auto max-w-7xl px-2 sm:px-3 md:px-4">
                  <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                    <div
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed text-justify"
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
              <section className="pt-3 sm:pt-4 md:pt-6 lg:pt-8 pb-3 sm:pb-4 md:pb-6 lg:pb-8 bg-muted/30">
                <div className="container mx-auto max-w-7xl px-2 sm:px-3 md:px-4">
                  {/* 30-70 Grid Layout - Images with Itinerary */}
                  <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 sm:gap-4 md:gap-6 lg:gap-10">
                    
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
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                            {itinerarySection.title}
                          </h2>
                          <div
                            className="text-sm sm:text-base text-muted-foreground leading-relaxed text-justify"
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
            {/* Title in styled box with red section and white square */}
            <div className="flex items-center justify-center">
              <div className="relative inline-flex items-center">
                <style>{`
                  /* Compact title box like provided design */
                  .title-box {
                    position: relative;
                    background: #FFFFFF;
                    border-radius: 8px;
                    height: 60px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    display: inline-flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    min-width: 280px;
                    overflow: hidden;
                  }

                  .title-red-section {
                    background: #C41E3A;
                    width: 60px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                  }

                  .title-white-section {
                    flex: 1 1 auto;
                    padding: 0 16px;
                    display: flex;
                    align-items: center;
                    height: 100%;
                  }

                  .title-text {
                    position: relative;
                    z-index: 2;
                    text-align: left;
                    color: #1A1A1A;
                    margin: 0;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1;
                    font-size: 24px;
                    font-weight: 600;
                  }

                  @media (max-width: 768px) {
                    .title-box {
                      min-width: 240px;
                      height: 48px;
                    }
                    .title-red-section {
                      width: 48px;
                    }
                    .title-white-section {
                      padding: 0 12px;
                    }
                    .title-text {
                      font-size: 18px;
                    }
                  }
                `}</style>
                
                <div className="title-box">
                  {/* Red Section (15%) */}
                  <div className="title-red-section"></div>
                  
                  {/* White Section with Title (85%) */}
                  <div className="title-white-section">
                    <h1 className="title-text">
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