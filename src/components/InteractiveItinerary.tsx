import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
}

interface InteractiveItineraryProps {
  itinerary?: string;
  itineraryDays?: Array<Partial<ItineraryDay>>;
  tourTitle: string;
}

const InteractiveItinerary = ({ itinerary, itineraryDays, tourTitle }: InteractiveItineraryProps) => {
  const [showFloatingButton, setShowFloatingButton] = useState(false);

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
  // Simplified parsing logic - admin controlled content
  const parseItinerary = (itineraryText: string): ItineraryDay[] => {
    // If structured itineraryDays provided, prefer them (more reliable)
    if (itineraryDays && itineraryDays.length) {
      return itineraryDays
        .map(d => ({
          dayNumber: d.dayNumber || 0,
          title: d.title || `Day ${d.dayNumber || 0}`,
          description: (d.description || '').toString().trim()
        }))
        .filter(d => d.dayNumber > 0);
    }

    // Support multi-line day descriptions in legacy `itinerary` string: a line starting with "Day N:" begins a new day;
    // subsequent non-header lines are appended to the previous day's description.
    const rawLines = (itineraryText || '').split('\n');
    const days: ItineraryDay[] = [];
    let currentDay: ItineraryDay | null = null;

    rawLines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const dayMatch = trimmed.match(/Day (\d+):?\s*(.*)/i);
      if (dayMatch) {
        const dayNumber = parseInt(dayMatch[1]);
        const content = dayMatch[2] || '';
        currentDay = {
          dayNumber,
          title: `Day ${dayNumber}`,
          description: content.trim(),
        };
        days.push(currentDay);
      } else if (currentDay) {
        // Append this line to the current day's description, preserving paragraph breaks
        currentDay.description = `${currentDay.description}\n${trimmed}`.trim();
      }
    });

    return days;
  };

  const days = parseItinerary(itinerary);

  if (!days.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Itinerary coming soon...</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-0">
        {/* Section heading */}
        <div className="flex items-center mb-2">
          <h2 className="text-lg font-semibold text-foreground">
            Itinerary
          </h2>
        </div>

        {/* Single content box with paragraphed content */}
      <div className="bg-white rounded-lg shadow-warm border border-border p-2">
        <div className="max-w-none">
          {days.map((day, index) => (
            <div key={day.dayNumber} className={`${index > 0 ? 'mt-2' : ''}`}>
              <h3 className="text-lg font-semibold text-foreground !m-0 !p-0 leading-tight">
                Day {day.dayNumber}: {day.title}
              </h3>
              <div className="text-muted-foreground text-base text-justify !m-0 !p-0 leading-relaxed space-y-1">
                {day.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="!m-0 !p-0">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Floating Enquire Button - appears on scroll */}
      <div 
        className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ${
          showFloatingButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <Button 
          onClick={scrollToEnquiry}
          className="bg-brand-green hover:bg-brand-green-dark text-black font-semibold px-6 py-3 rounded-lg shadow-2xl hover:shadow-brand-green/50 transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95"
        >
          <MessageSquare className="h-5 w-5" />
          <span>Enquire</span>
        </Button>
      </div>
    </>
  );
};

export default InteractiveItinerary;