import { useEffect, useState } from "react";
import { ItineraryDay } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface AdminControllableItineraryProps {
  itineraryDays: ItineraryDay[];
  tourTitle: string;
  className?: string;
}

const AdminControllableItinerary = ({ itineraryDays, tourTitle, className = "" }: AdminControllableItineraryProps) => {
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
        {/* Section heading */}
        <div className="flex items-center mb-2">
          <h2 className="text-lg font-semibold text-foreground">
            Itinerary
          </h2>
        </div>

        {/* Single content box with paragraphed content */}
      <div className="bg-white rounded-lg shadow-warm border border-border p-2">
        <div className="max-w-none">
          {activeDays.map((day, index) => (
            <div key={day.id} className={`${index > 0 ? 'mt-2' : ''}`}>
              <h3 className="text-lg font-semibold text-foreground !m-0 !p-0 leading-tight">
                Day {day.dayNumber}: {day.title}
              </h3>
              {day.description && (
                <div className="text-muted-foreground text-base text-justify !m-0 !p-0 leading-relaxed space-y-1">
                  {day.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="!m-0 !p-0">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Floating Enquire Button - appears on scroll */}
      <div 
        className={`fixed bottom-24 left-6 z-40 transition-all duration-500 ${
          showFloatingButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="relative group">
          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 bg-brand-green rounded-full animate-ping opacity-20"></div>

          {/* Main Enquire Button */}
          <button
            onClick={scrollToEnquiry}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative bg-brand-green hover:bg-brand-green-dark text-black p-4 rounded-full shadow-2xl hover:shadow-brand-green/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
            aria-label="Scroll to enquiry form"
          >
            <MessageSquare className="h-7 w-7" />
            
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse font-semibold">
              !
            </div>
          </button>

          {/* Tooltip on Hover */}
          <div 
            className={`absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
              isHovered ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'
            }`}
          >
            <span className="font-medium">Send Enquiry</span>
            <div className="absolute top-1/2 -translate-y-1/2 right-full border-4 border-transparent border-r-gray-900"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminControllableItinerary;