import { useEffect, useState } from "react";
import { ItineraryDay } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface AdminControllableItineraryProps {
  itineraryDays: ItineraryDay[];
  tourTitle: string;
  className?: string;
}

const AdminControllableItinerary = ({ itineraryDays, tourTitle, className = "" }: AdminControllableItineraryProps) => {
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // Filter only active days and sort by order
  const activeDays = itineraryDays
    .filter(day => day.isActive)
    .sort((a, b) => a.order - b.order);

  // Smooth scroll to enquiry section
  const scrollToEnquiry = () => {
    const enquirySection = document.getElementById('enquiry-section');
    if (enquirySection) {
      enquirySection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Show/hide floating button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show button after scrolling 300px
      if (scrollPosition > 300) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!activeDays.length) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">Itinerary coming soon...</p>
      </div>
    );
  }

  return (
    <>
      <div className={`space-y-0 ${className}`}>
        {/* Section heading in Red Box */}
        <div className="flex items-center justify-center md:justify-start mb-4 md:mb-6">
          <div className="mb-0">
            <h2
              className="text-lg md:text-xl font-bold leading-none text-foreground"
              style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em', textTransform: 'uppercase' }}
            >
              Itinerary
            </h2>
          </div>
        </div>

        {/* Single content box with paragraphed content */}
      <div className="bg-white rounded-lg shadow-warm border border-border pt-6 pb-6 px-4 md:pt-10 md:pb-10 md:px-12 lg:px-16">
        <div className="max-w-none">
          {activeDays.map((day, index) => (
            <div key={day.id} className={`${index > 0 ? 'mt-3 md:mt-4' : ''}`}>
              <h3 className="text-base md:text-lg font-semibold text-foreground !m-0 !p-0 leading-tight mb-2">
                Day {day.dayNumber}: {day.title}
              </h3>
              {day.description && (
                <div 
                  className="text-muted-foreground text-sm md:text-base text-justify !m-0 !p-0 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: day.description }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Floating ENQUIRE Button - appears on scroll */}
      <div 
        className={`fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 z-40 transition-all duration-500 ${
          showFloatingButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
        }`}
      >
        <Button 
          onClick={scrollToEnquiry}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgb(234,179,8,0.4)]"
        >
          <span>ENQUIRE</span>
        </Button>
      </div>
    </>
  );
};

export default AdminControllableItinerary;