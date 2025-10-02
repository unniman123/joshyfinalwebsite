import { ItineraryDay } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface AdminControllableItineraryProps {
  itineraryDays: ItineraryDay[];
  tourTitle: string;
  className?: string;
}

const AdminControllableItinerary = ({ itineraryDays, tourTitle, className = "" }: AdminControllableItineraryProps) => {
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

  if (!activeDays.length) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">Itinerary coming soon...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Section heading with enquiry button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Itinerary
        </h2>
        <Button 
          onClick={scrollToEnquiry}
          className="bg-brand-green hover:bg-brand-green-dark text-black font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <MessageSquare className="h-5 w-5" />
          <span>Enquire</span>
        </Button>
      </div>

      {/* Single content box with paragraphed content */}
      <div className="bg-white rounded-lg shadow-warm border border-border p-8">
        <div className="prose prose-lg max-w-none">
          {activeDays.map((day, index) => (
            <div key={day.id} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Day {day.dayNumber}: {day.title}
              </h3>
              {day.description && (
                <div className="text-muted-foreground leading-relaxed text-base mb-4 text-justify">
                  {day.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-3 last:mb-0">
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
  );
};

export default AdminControllableItinerary;