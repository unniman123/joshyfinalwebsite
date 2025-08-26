import { ItineraryDay } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        <p className="text-muted-foreground">Detailed itinerary coming soon...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Section heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Detailed Itinerary
      </h2>

      {/* Admin-controlled day cards */}
      <div className="space-y-4">
        {activeDays.map((day) => {
          return (
            <Card
              key={day.id}
              className="group hover:shadow-golden transition-all duration-300 border-border hover:border-golden/50 bg-white"
            >
              <CardContent className="p-6">
                <div className="space-y-3">
                  {/* Day badge with title */}
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="default"
                      className="bg-gradient-to-r from-golden to-golden-dark text-white shadow-golden/30 px-4 py-2 text-sm font-bold min-w-fit rounded-full"
                    >
                      Day {day.dayNumber}
                    </Badge>
                    <h3 className="text-lg font-semibold text-foreground">
                      {day.title}
                    </h3>
                  </div>

                  {/* Simple description only */}
                  {day.description && (
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {day.description}
                    </p>
                  )}
                </div>

                {/* Subtle bottom accent */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-golden/30 to-transparent rounded-full mt-4" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminControllableItinerary;