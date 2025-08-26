import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
}

interface InteractiveItineraryProps {
  itinerary: string;
  tourTitle: string;
}

const InteractiveItinerary = ({ itinerary, tourTitle }: InteractiveItineraryProps) => {
  // Simplified parsing logic - admin controlled content
  const parseItinerary = (itineraryText: string): ItineraryDay[] => {
    const lines = itineraryText.split('\n').filter(line => line.trim());
    const days: ItineraryDay[] = [];

    lines.forEach(line => {
      const dayMatch = line.match(/Day (\d+):?\s*(.+)/i);
      if (dayMatch) {
        const dayNumber = parseInt(dayMatch[1]);
        const content = dayMatch[2];

        days.push({
          dayNumber,
          title: `Day ${dayNumber}`,
          description: content,
        });
      }
    });

    return days;
  };

  const days = parseItinerary(itinerary);

  if (!days.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Detailed itinerary coming soon...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Detailed Itinerary
      </h2>

      {/* Simplified day cards - title and description only */}
      <div className="space-y-4">
        {days.map((day) => (
          <Card
            key={day.dayNumber}
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
                <p className="text-muted-foreground leading-relaxed text-base">
                  {day.description}
                </p>
              </div>

              {/* Subtle bottom accent */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-golden/30 to-transparent rounded-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InteractiveItinerary;