import { useState, useEffect } from "react";
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

  // Mobile title wrapping logic - detect long titles for mobile
  const [isTitleLong, setIsTitleLong] = useState(false);

  useEffect(() => {
    // Check if title is long enough to need wrapping on mobile
    // Threshold: titles longer than 25 characters on mobile screens
    const TITLE_LENGTH_THRESHOLD = 25;
    setIsTitleLong(tour.title.length > TITLE_LENGTH_THRESHOLD);
  }, [tour.title]);

  if (hasStructuredData || hasStructuredItinerary || hasStructuredImages) {
    // Render admin-controlled sections (overview no longer requires images)
    const visibleSections = tour.sections
      ?.filter(section => section.isVisible)
      ?.sort((a, b) => a.order - b.order) || [];

    return (
      <div className="w-full">
        {/* Tour Title Section - Center Aligned */}
        <section className="pt-8 sm:pt-6 md:pt-12 lg:pt-16 pb-2 sm:pb-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4">
          <div className="container mx-auto max-w-7xl px-2 sm:px-3 md:px-4">
            {/* Title in styled box with red section and white square */}
            {/* Mobile: left-aligned. Desktop (md+): left-aligned (restore original desktop layout). */}
            <div className="flex items-center justify-start md:justify-start">
              <div className="relative inline-flex items-center sm:w-auto">
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
                    background: #287788;
                    width: 60px;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                  }

                  .title-white-section {
                    flex: 1 1 auto;
                    padding: 0 16px;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    margin-left: 60px;
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
                    font-size: 26px;
                    font-weight: 600;
                  }

                  /* Mobile title wrapping for long titles */
                  @media (max-width: 640px) {
                    .title-box-long {
                      height: auto !important;
                      min-height: 48px !important;
                      padding: 8px 0 !important;
                    }

                    .title-red-section-long {
                      height: auto !important;
                      min-height: 48px !important;
                    }

                    /* Ensure the left color block stretches to match multiline title height */
                    .title-box-long {
                      align-items: stretch !important;
                    }

                    .title-red-section-long {
                      align-self: stretch !important;
                      padding-top: 0 !important;
                      display: flex !important;
                      align-items: center !important;
                      justify-content: center !important;
                    }

                    .title-white-section-long {
                      height: auto !important;
                      min-height: 40px !important;
                      display: flex !important;
                      align-items: flex-start !important;
                      padding-top: 4px !important;
                    }

                    .title-text-long {
                      white-space: normal !important;
                      overflow: visible !important;
                      text-overflow: clip !important;
                      line-height: 1.2 !important;
                      font-size: 18px !important;
                      word-wrap: break-word;
                      hyphens: auto;
                      margin: 0 !important;
                      padding: 0 !important;
                    }
                  }

                  @media (max-width: 640px) {
                    .title-box {
                      min-width: 200px;
                      width: 95vw;
                      max-width: 300px;
                      height: 48px;
                    }
                    .title-red-section {
                      width: 48px;
                      left: 0;
                    }
                    .title-white-section {
                      padding: 0 12px;
                      margin-left: 48px;
                    }
                    .title-text {
                      font-size: 20px;
                    }
                    
                    /* When title wraps, make the red section stretch to the full height */
                    .title-box-long {
                      align-items: stretch !important;
                    }
                    .title-red-section-long {
                      align-self: stretch !important;
                      padding-top: 0 !important;
                      display: flex !important;
                      align-items: center !important;
                      justify-content: center !important;
                    }
                  }
                `}</style>
                
                <div className={`title-box ${isTitleLong ? 'title-box-long' : ''}`}>
                  {/* Red Section (15%) */}
                  <div className={`title-red-section ${isTitleLong ? 'title-red-section-long' : ''}`}></div>

                  {/* White Section with Title (85%) */}
                  <div className={`title-white-section ${isTitleLong ? 'title-white-section-long' : ''}`}>
                    <h1 className={`title-text ${isTitleLong ? 'title-text-long' : ''}`} style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}>
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
                  <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-strong:text-inherit [&_b]:text-inherit">
                    <div
                      className="text-muted-foreground text-sm md:text-base text-justify leading-relaxed"
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

                    {/* Images column - stacks above on mobile, left side on desktop */}
                    <div className="order-1 lg:order-1 lg:col-span-3">
                      {hasStructuredImages && (
                        <AdminControllableImageGallery
                          images={tour.images}
                          section="itinerary"
                          tourTitle={tour.title}
                        />
                      )}
                    </div>

                    {/* Itinerary column - stacks below on mobile, right side on desktop */}
                    <div className="order-2 lg:order-2 lg:col-span-7">
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
                            className="text-sm sm:text-base text-muted-foreground leading-relaxed text-justify [&_b]:text-inherit [&_strong]:text-inherit break-words overflow-wrap-anywhere hyphens-auto"
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
            {/* Mobile: left-aligned. Desktop (md+): left-aligned (restore original desktop layout). */}
            <div className="flex items-center justify-start md:justify-start">
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
                    background: #287788;
                    width: 60px;
                    min-height: 60px;
                    height: 100%;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    flex-shrink: 0;
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                    padding-top: 8px;
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
                    font-size: 26px;
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
                      margin-left: 48px;
                    }
                    .title-text {
                      font-size: 20px;
                    }

                    /* Mobile title wrapping for long titles - fallback section */
                    .title-box-long {
                      height: auto !important;
                      min-height: 48px !important;
                      padding: 8px 0 !important;
                    }

                    .title-red-section-long {
                      height: auto !important;
                      min-height: 48px !important;
                    }

                    /* Ensure left color block stretches when title becomes multiline */
                    .title-box-long {
                      align-items: stretch !important;
                    }
                    .title-red-section-long {
                      align-self: stretch !important;
                      padding-top: 0 !important;
                      display: flex !important;
                      align-items: center !important;
                      justify-content: center !important;
                    }

                    .title-white-section-long {
                      height: auto !important;
                      min-height: 40px !important;
                      display: flex !important;
                      align-items: flex-start !important;
                      padding-top: 4px !important;
                    }

                    .title-text-long {
                      white-space: normal !important;
                      overflow: visible !important;
                      text-overflow: clip !important;
                      line-height: 1.2 !important;
                      font-size: 18px !important;
                      word-wrap: break-word;
                      hyphens: auto;
                      margin: 0 !important;
                      padding: 0 !important;
                    }
                  }
                `}</style>
                
                <div className={`title-box ${isTitleLong ? 'title-box-long' : ''}`}>
                  {/* Red Section (15%) */}
                  <div className={`title-red-section ${isTitleLong ? 'title-red-section-long' : ''}`}></div>

                  {/* White Section with Title (85%) */}
                  <div className={`title-white-section ${isTitleLong ? 'title-white-section-long' : ''}`}>
                    <h1 className={`title-text ${isTitleLong ? 'title-text-long' : ''}`}>
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