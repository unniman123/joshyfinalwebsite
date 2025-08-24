import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Camera,
  MapPin,
  Building,
  TreePine,
  Ship,
  PlaneTakeoff,
  Mountain
} from "lucide-react";

interface ItineraryDay {
  dayNumber: number;
  title: string;
  activities: string[];
  activityType: string;
}

interface InteractiveItineraryProps {
  itinerary: string;
  tourTitle: string;
}

const InteractiveItinerary = ({ itinerary, tourTitle }: InteractiveItineraryProps) => {
  // Activity type detection for icon selection
  const detectActivityType = (content: string): string => {
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('arrival') || lowerContent.includes('check-in')) return 'arrival';
    if (lowerContent.includes('departure') || lowerContent.includes('return')) return 'departure';
    if (lowerContent.includes('temple') || lowerContent.includes('church') || lowerContent.includes('mosque')) return 'temple';
    if (lowerContent.includes('cruise') || lowerContent.includes('boat') || lowerContent.includes('backwater')) return 'cruise';
    if (lowerContent.includes('fort') || lowerContent.includes('palace') || lowerContent.includes('museum')) return 'sightseeing';
    if (lowerContent.includes('nature') || lowerContent.includes('park') || lowerContent.includes('sanctuary')) return 'nature';
    if (lowerContent.includes('mountain') || lowerContent.includes('hill') || lowerContent.includes('trek')) return 'mountain';
    if (lowerContent.includes('city') || lowerContent.includes('tour') || lowerContent.includes('visit')) return 'city';

    return 'default';
  };

  // Travel-themed icon mapping
  const getActivityIcon = (activityType: string) => {
    const iconMap = {
      'arrival': Plane,
      'departure': PlaneTakeoff,
      'sightseeing': Camera,
      'temple': Building,
      'nature': TreePine,
      'cruise': Ship,
      'city': MapPin,
      'mountain': Mountain,
      'default': MapPin
    };
    return iconMap[activityType] || iconMap.default;
  };

  // Itinerary parsing logic with activity type detection
  const parseItinerary = (itinerary: string): ItineraryDay[] => {
    if (!itinerary?.trim()) return [];

    const lines = itinerary.split('\n').filter(line => line.trim());
    const days: ItineraryDay[] = [];

    lines.forEach(line => {
      const dayMatch = line.match(/Day (\d+):?\s*(.+)/i);
      if (dayMatch) {
        const dayNumber = parseInt(dayMatch[1]);
        const content = dayMatch[2];

        // Split activities by common separators
        const activities = content.split(/[,;]/).map(activity => activity.trim()).filter(Boolean);

        days.push({
          dayNumber,
          title: activities[0] || `Day ${dayNumber}`,
          activities: activities.length > 1 ? activities.slice(1) : activities,
          activityType: detectActivityType(activities[0] || content),
        });
      }
    });

    return days;
  };

  const days = parseItinerary(itinerary);

  if (days.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Detailed itinerary coming soon...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Detailed Itinerary
      </h2>

      {/* Interactive accordion for each day */}
      <Accordion type="multiple" className="space-y-4">
        {days.map((day) => {
          const IconComponent = getActivityIcon(day.activityType);

          return (
            <AccordionItem
              key={day.dayNumber}
              value={`day-${day.dayNumber}`}
              className="border border-border/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-card"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                <div className="flex items-center gap-4 w-full">
                  {/* Circular day badge with golden gradient */}
                  <div className="flex-shrink-0">
                    <Badge
                      variant="default"
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-br from-golden to-golden-dark text-white shadow-golden border-2 border-golden-light"
                    >
                      {day.dayNumber}
                    </Badge>
                  </div>

                  {/* Activity icon and title */}
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <IconComponent className="h-5 w-5 text-golden flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-golden transition-colors">
                        Day {day.dayNumber}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {day.title}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6">
                <div className="pt-2 space-y-3">
                  {/* Activity list with travel-themed bullet points */}
                  <div className="space-y-2">
                    {day.activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-golden mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">
                          {activity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default InteractiveItinerary;