import { ItineraryDay } from "@/lib/api";

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

  if (!activeDays.length) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">Itinerary coming soon...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Section heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Itinerary
      </h2>

      {/* Single content box with paragraphed content */}
      <div className="bg-white rounded-lg shadow-warm border border-border p-8">
        <div className="prose prose-lg max-w-none">
          {activeDays.map((day, index) => (
            <div key={day.id} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Day {day.dayNumber}: {day.title}
              </h3>
              {day.description && (
                <p className="text-muted-foreground leading-relaxed text-base mb-4 whitespace-pre-line">
                  {day.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminControllableItinerary;