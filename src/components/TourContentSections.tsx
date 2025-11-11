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
            {/* Title in styled box with red section and white square */}
            <div className="flex items-center justify-center md:justify-start">
              <div className="relative inline-flex items-center">
                <style>{`
                  .title-box {
                    position: relative;
                    background: #FFFFFF;
                    border-radius: 8px;
                    padding: 0;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    display: inline-flex;
                    flex-direction: row;
                    align-items: stretch;
                    justify-content: flex-start;
                    min-width: 300px;
                    overflow: hidden;
                  }
                  
                  .title-red-section {
                    background: #C41E3A;
                    width: 15%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem 0.5rem;
                    flex-shrink: 0;
                  }
                  
                  .title-white-section {
                    width: 85%;
                    padding: 1rem 1.5rem;
                    display: flex;
                    align-items: center;
                  }
                  
                  .title-text {
                    position: relative;
                    z-index: 2;
                    text-align: left;
                    color: #1A1A1A;
                    margin: 0;
                    width: 100%;
                  }
                  
                  @media (max-width: 768px) {
                    .title-box {
                      min-width: 280px;
                    }
                    
                    .title-red-section {
                      padding: 0.75rem 0.5rem;
                    }
                    
                    .title-white-section {
                      padding: 0.75rem 1rem;
                    }
                  }
                `}</style>
                
                <div className="title-box">
                  {/* Red Section (15%) */}
                  <div className="title-red-section"></div>
                  
                  {/* White Section with Title (85%) */}
                  <div className="title-white-section">
                    <h1 className="title-text text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
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
            {/* Title in styled box with red section and white square */}
            <div className="flex items-center justify-center">
              <div className="relative inline-flex items-center">
                <style>{`
                  .title-box {
                    position: relative;
                    background: #FFFFFF;
                    border-radius: 8px;
                    padding: 0;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    display: inline-flex;
                    flex-direction: row;
                    align-items: stretch;
                    justify-content: flex-start;
                    min-width: 300px;
                    overflow: hidden;
                  }
                  
                  .title-red-section {
                    background: #C41E3A;
                    width: 15%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem 0.5rem;
                    flex-shrink: 0;
                  }
                  
                  .title-white-section {
                    width: 85%;
                    padding: 1rem 1.5rem;
                    display: flex;
                    align-items: center;
                  }
                  
                  .title-text {
                    position: relative;
                    z-index: 2;
                    text-align: left;
                    color: #1A1A1A;
                    margin: 0;
                    width: 100%;
                  }
                  
                  @media (max-width: 768px) {
                    .title-box {
                      min-width: 280px;
                    }
                    
                    .title-red-section {
                      padding: 0.75rem 0.5rem;
                    }
                    
                    .title-white-section {
                      padding: 0.75rem 1rem;
                    }
                  }
                `}</style>
                
                <div className="title-box">
                  {/* Red Section (15%) */}
                  <div className="title-red-section"></div>
                  
                  {/* White Section with Title (85%) */}
                  <div className="title-white-section">
                    <h1 className="title-text text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
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