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
            {/* Title in airplane banner design */}
            <div className="flex items-center justify-center md:justify-start">
              <div className="relative inline-flex items-center">
                <style>{`
                  @keyframes float {
                    0%, 100% {
                      transform: translateY(0px);
                    }
                    50% {
                      transform: translateY(-10px);
                    }
                  }
                  
                  @keyframes propellerSpin {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }
                  
                  .airplane-banner-container {
                    animation: float 4s ease-in-out infinite;
                  }
                  
                  .airplane-banner {
                    position: relative;
                    background: linear-gradient(135deg, #FF6B4A 0%, #FF8C6B 100%);
                    border-radius: 40px;
                    padding: 2rem 3rem 5rem 3rem;
                    box-shadow: 0 10px 30px rgba(255, 107, 74, 0.3);
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-width: 300px;
                    border: 4px solid rgba(0, 0, 0, 0.1);
                  }
                  
                  .title-text {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    color: #1A1A1A;
                    margin-bottom: 1rem;
                  }
                  
                  /* Front-facing airplane at bottom */
                  .airplane-front {
                    position: absolute;
                    bottom: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 180px;
                    height: 80px;
                    z-index: 3;
                  }
                  
                  /* Airplane body (fuselage) - front view */
                  .plane-fuselage {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 60px;
                    background: linear-gradient(180deg, #2C2C2C 0%, #1A1A1A 100%);
                    border-radius: 20px 20px 8px 8px;
                  }
                  
                  /* Cockpit window */
                  .plane-cockpit {
                    position: absolute;
                    top: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: rgba(135, 206, 235, 0.7);
                    border-radius: 50%;
                    border: 2px solid #1A1A1A;
                  }
                  
                  /* Wings - horizontal */
                  .plane-wings {
                    position: absolute;
                    bottom: 25px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 180px;
                    height: 12px;
                    background: linear-gradient(90deg, transparent 0%, #1A1A1A 20%, #1A1A1A 80%, transparent 100%);
                    border-radius: 6px;
                  }
                  
                  .plane-wings::before,
                  .plane-wings::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    width: 70px;
                    height: 10px;
                    background: #2C2C2C;
                    border-radius: 5px;
                  }
                  
                  .plane-wings::before {
                    left: 10px;
                    transform: translateY(-50%) rotate(-5deg);
                  }
                  
                  .plane-wings::after {
                    right: 10px;
                    transform: translateY(-50%) rotate(5deg);
                  }
                  
                  /* Tail fin */
                  .plane-tail {
                    position: absolute;
                    bottom: 45px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 25px;
                    background: linear-gradient(180deg, #2C2C2C 0%, #1A1A1A 100%);
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                  }
                  
                  /* Propeller */
                  .plane-propeller {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 12px;
                    height: 12px;
                    z-index: 5;
                  }
                  
                  .plane-propeller::before,
                  .plane-propeller::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 3px;
                    height: 30px;
                    background: rgba(100, 100, 100, 0.6);
                    transform: translate(-50%, -50%);
                    animation: propellerSpin 0.5s linear infinite;
                  }
                  
                  .plane-propeller::after {
                    transform: translate(-50%, -50%) rotate(90deg);
                    animation: propellerSpin 0.5s linear infinite;
                  }
                  
                  /* Propeller center hub */
                  .propeller-hub {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 8px;
                    height: 8px;
                    background: #4A4A4A;
                    border-radius: 50%;
                    z-index: 6;
                  }
                  
                  /* Engine details */
                  .plane-engines {
                    position: absolute;
                    bottom: 25px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 180px;
                    height: 15px;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 15px;
                  }
                  
                  .engine {
                    width: 18px;
                    height: 15px;
                    background: #2C2C2C;
                    border-radius: 3px;
                  }
                  
                  @media (max-width: 768px) {
                    .airplane-banner {
                      padding: 1.5rem 2rem 4rem 2rem;
                      min-width: 250px;
                    }
                    
                    .airplane-front {
                      width: 140px;
                      bottom: -25px;
                    }
                    
                    .plane-wings {
                      width: 140px;
                    }
                    
                    .plane-fuselage {
                      width: 35px;
                      height: 50px;
                    }
                  }
                `}</style>
                
                <div className="airplane-banner-container">
                  <div className="airplane-banner">
                    {/* Tour Title */}
                    <h1 className="title-text text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-0 leading-tight">
                      {tour.title}
                    </h1>
                    
                    {/* Front-facing airplane at bottom */}
                    <div className="airplane-front">
                      <div className="plane-wings"></div>
                      <div className="plane-engines">
                        <div className="engine"></div>
                        <div className="engine"></div>
                      </div>
                      <div className="plane-fuselage">
                        <div className="plane-cockpit"></div>
                      </div>
                      <div className="plane-tail"></div>
                      <div className="plane-propeller">
                        <div className="propeller-hub"></div>
                      </div>
                    </div>
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
            {/* Title in airplane banner design */}
            <div className="flex items-center justify-center">
              <div className="relative inline-flex items-center">
                <style>{`
                  @keyframes float {
                    0%, 100% {
                      transform: translateY(0px);
                    }
                    50% {
                      transform: translateY(-10px);
                    }
                  }
                  
                  @keyframes propellerSpin {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }
                  
                  .airplane-banner-container {
                    animation: float 4s ease-in-out infinite;
                  }
                  
                  .airplane-banner {
                    position: relative;
                    background: linear-gradient(135deg, #FF6B4A 0%, #FF8C6B 100%);
                    border-radius: 40px;
                    padding: 2rem 3rem 5rem 3rem;
                    box-shadow: 0 10px 30px rgba(255, 107, 74, 0.3);
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-width: 300px;
                    border: 4px solid rgba(0, 0, 0, 0.1);
                  }
                  
                  .title-text {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    color: #1A1A1A;
                    margin-bottom: 1rem;
                  }
                  
                  /* Front-facing airplane at bottom */
                  .airplane-front {
                    position: absolute;
                    bottom: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 180px;
                    height: 80px;
                    z-index: 3;
                  }
                  
                  /* Airplane body (fuselage) - front view */
                  .plane-fuselage {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 60px;
                    background: linear-gradient(180deg, #2C2C2C 0%, #1A1A1A 100%);
                    border-radius: 20px 20px 8px 8px;
                  }
                  
                  /* Cockpit window */
                  .plane-cockpit {
                    position: absolute;
                    top: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: rgba(135, 206, 235, 0.7);
                    border-radius: 50%;
                    border: 2px solid #1A1A1A;
                  }
                  
                  /* Wings - horizontal */
                  .plane-wings {
                    position: absolute;
                    bottom: 25px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 180px;
                    height: 12px;
                    background: linear-gradient(90deg, transparent 0%, #1A1A1A 20%, #1A1A1A 80%, transparent 100%);
                    border-radius: 6px;
                  }
                  
                  .plane-wings::before,
                  .plane-wings::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    width: 70px;
                    height: 10px;
                    background: #2C2C2C;
                    border-radius: 5px;
                  }
                  
                  .plane-wings::before {
                    left: 10px;
                    transform: translateY(-50%) rotate(-5deg);
                  }
                  
                  .plane-wings::after {
                    right: 10px;
                    transform: translateY(-50%) rotate(5deg);
                  }
                  
                  /* Tail fin */
                  .plane-tail {
                    position: absolute;
                    bottom: 45px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 25px;
                    background: linear-gradient(180deg, #2C2C2C 0%, #1A1A1A 100%);
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                  }
                  
                  /* Propeller */
                  .plane-propeller {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 12px;
                    height: 12px;
                    z-index: 5;
                  }
                  
                  .plane-propeller::before,
                  .plane-propeller::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 3px;
                    height: 30px;
                    background: rgba(100, 100, 100, 0.6);
                    transform: translate(-50%, -50%);
                    animation: propellerSpin 0.5s linear infinite;
                  }
                  
                  .plane-propeller::after {
                    transform: translate(-50%, -50%) rotate(90deg);
                    animation: propellerSpin 0.5s linear infinite;
                  }
                  
                  /* Propeller center hub */
                  .propeller-hub {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 8px;
                    height: 8px;
                    background: #4A4A4A;
                    border-radius: 50%;
                    z-index: 6;
                  }
                  
                  /* Engine details */
                  .plane-engines {
                    position: absolute;
                    bottom: 25px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 180px;
                    height: 15px;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 15px;
                  }
                  
                  .engine {
                    width: 18px;
                    height: 15px;
                    background: #2C2C2C;
                    border-radius: 3px;
                  }
                  
                  @media (max-width: 768px) {
                    .airplane-banner {
                      padding: 1.5rem 2rem 4rem 2rem;
                      min-width: 250px;
                    }
                    
                    .airplane-front {
                      width: 140px;
                      bottom: -25px;
                    }
                    
                    .plane-wings {
                      width: 140px;
                    }
                    
                    .plane-fuselage {
                      width: 35px;
                      height: 50px;
                    }
                  }
                `}</style>
                
                <div className="airplane-banner-container">
                  <div className="airplane-banner">
                    {/* Tour Title */}
                    <h1 className="title-text text-2xl md:text-3xl lg:text-4xl font-bold mb-0 leading-tight">
                      {tour.title}
                    </h1>
                    
                    {/* Front-facing airplane at bottom */}
                    <div className="airplane-front">
                      <div className="plane-wings"></div>
                      <div className="plane-engines">
                        <div className="engine"></div>
                        <div className="engine"></div>
                      </div>
                      <div className="plane-fuselage">
                        <div className="plane-cockpit"></div>
                      </div>
                      <div className="plane-tail"></div>
                      <div className="plane-propeller">
                        <div className="propeller-hub"></div>
                      </div>
                    </div>
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