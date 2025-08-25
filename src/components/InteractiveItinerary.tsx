import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  PlaneTakeoff,
  Camera,
  Building,
  TreePine,
  Ship,
  MapPin,
  Clock
} from "lucide-react";

interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  activityType: string;
}

interface InteractiveItineraryProps {
  itinerary: string;
  tourTitle: string;
}

const InteractiveItinerary = ({ itinerary, tourTitle }: InteractiveItineraryProps) => {
  // Simplified parsing logic
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
          activityType: detectActivityType(content),
        });
      }
    });

    return days;
  };



  // Detect activity type for icon selection
  const detectActivityType = (activity: string): string => {
    const activityLower = activity.toLowerCase();

    if (activityLower.includes('arrival') || activityLower.includes('arrive')) return 'arrival';
    if (activityLower.includes('departure') || activityLower.includes('depart')) return 'departure';
    if (activityLower.includes('temple') || activityLower.includes('church') || activityLower.includes('mosque')) return 'temple';
    if (activityLower.includes('cruise') || activityLower.includes('boat') || activityLower.includes('ship')) return 'cruise';
    if (activityLower.includes('nature') || activityLower.includes('forest') || activityLower.includes('wildlife')) return 'nature';
    if (activityLower.includes('city') || activityLower.includes('tour') || activityLower.includes('visit')) return 'city';
    if (activityLower.includes('sightseeing') || activityLower.includes('photo')) return 'sightseeing';

    return 'default';
  };

  // Get travel-themed icon for activity type
  const getActivityIcon = (activityType: string) => {
    const iconMap = {
      'arrival': Plane,
      'departure': PlaneTakeoff,
      'sightseeing': Camera,
      'temple': Building,
      'nature': TreePine,
      'cruise': Ship,
      'city': MapPin,
      'default': Clock
    };

    return iconMap[activityType] || iconMap.default;
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

      {/* Simple day cards without dropdown */}
      <div className="space-y-4">
        {days.map((day) => {
          const IconComponent = getActivityIcon(day.activityType);

          return (
            <Card
              key={day.dayNumber}
              className="group hover:shadow-golden transition-all duration-300 border-border hover:border-golden/50 bg-white"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  {/* Day badge with golden gradient */}
                  <Badge
                    variant="default"
                    className="bg-gradient-to-r from-golden to-golden-dark text-white shadow-golden/30 px-4 py-2 text-sm font-bold min-w-fit rounded-full"
                  >
                    Day {day.dayNumber}
                  </Badge>

                  {/* Activity icon */}
                  <div className="p-3 rounded-full bg-gradient-to-br from-golden/10 to-golden/5 text-golden group-hover:bg-gradient-to-br group-hover:from-golden/20 group-hover:to-golden/10 transition-all duration-300 shadow-warm">
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Simple description without complex formatting */}
                <p className="text-muted-foreground leading-relaxed text-base">
                  {day.description}
                </p>

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

export default InteractiveItinerary;