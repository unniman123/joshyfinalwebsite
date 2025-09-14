import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
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
  activities: string[];
  activityType: string;
}

interface ItineraryDayCardProps {
  day: ItineraryDay;
  isExpanded: boolean;
  onToggle: () => void;
  totalDays: number;
}

const ItineraryDayCard = ({ day, isExpanded, onToggle, totalDays }: ItineraryDayCardProps) => {
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

  const IconComponent = getActivityIcon(day.activityType);

  return (
    <Card className="group hover:shadow-brand transition-all duration-300 border-border hover:border-brand-green/50 bg-white">
      <CardHeader
        className="cursor-pointer p-6 hover:bg-brand-green/5 transition-colors duration-300"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4 w-full">
          {/* Circular day badge with golden gradient */}
          <div className="relative">
            <Badge
              variant="default"
              className="bg-gradient-to-br from-brand-green to-brand-green-dark text-white shadow-brand-green/40 px-4 py-2 text-sm font-bold min-w-fit rounded-full border-2 border-brand-green-light"
            >
              Day {day.dayNumber}
            </Badge>
          </div>

          {/* Activity icon with golden accent */}
          <div className="p-3 rounded-full bg-gradient-to-br from-brand-green/10 to-brand-green/5 text-brand-green group-hover:bg-gradient-to-br group-hover:from-brand-green/20 group-hover:to-brand-green/10 transition-all duration-300 shadow-warm">
            <IconComponent className="h-6 w-6" />
          </div>

          {/* Day title with sophisticated typography */}
          <div className="flex-1 text-left">
            <h3 className="text-xl font-bold text-foreground group-hover:text-brand-green-dark transition-colors duration-300 leading-tight">
              {day.title}
            </h3>
          </div>

          {/* Chevron with smooth rotation */}
          <div className="p-2 rounded-full bg-muted/50 group-hover:bg-brand-green/10 transition-all duration-300">
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground group-hover:text-brand-green transition-all duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
            />
          </div>
        </div>
      </CardHeader>

      {/* Expandable content with smooth animations */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <CardContent className="px-6 pb-6 pt-0">
          <div className="space-y-4 pt-2 border-t border-brand-green/20">
            {day.activities.length > 0 ? (
              <ul className="space-y-3">
                {day.activities.map((activity, index) => (
                  <li key={index} className="flex items-start gap-4 group/item">
                    {/* Custom travel-themed bullet point */}
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark mt-2 flex-shrink-0 shadow-sm group-hover/item:shadow-brand-green/30 transition-shadow duration-300" />
                    <span className="text-muted-foreground leading-relaxed text-base group-hover/item:text-foreground transition-colors duration-300">
                      {activity}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground leading-relaxed text-base pl-7">
                {day.title}
              </p>
            )}

            {/* Subtle bottom accent */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-green/30 to-transparent rounded-full mt-4" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ItineraryDayCard;