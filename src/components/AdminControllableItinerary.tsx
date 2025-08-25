import { ItineraryDay } from "@/lib/api";
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
  Clock,
  Users,
  Utensils,
  Bed,
  Star
} from "lucide-react";

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
      'cultural': Users,
      'adventure': Star,
      'default': Clock
    };

    return iconMap[activityType as keyof typeof iconMap] || iconMap.default;
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Challenging': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
          const IconComponent = getActivityIcon(day.activities[0]?.activityType || 'default');

          return (
            <Card
              key={day.id}
              className="group hover:shadow-golden transition-all duration-300 border-border hover:border-golden/50 bg-white"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4 flex-wrap">
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

                  {/* Day title */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-golden-dark transition-colors duration-300 leading-tight flex-1">
                    {day.title}
                  </h3>

                  {/* Duration badge */}
                  {day.duration && (
                    <Badge variant="outline" className="text-xs">
                      {day.duration}
                    </Badge>
                  )}

                  {/* Difficulty badge */}
                  {day.difficulty && (
                    <Badge className={`text-xs ${getDifficultyColor(day.difficulty)}`}>
                      {day.difficulty}
                    </Badge>
                  )}
                </div>

                {/* Location */}
                {day.location && (
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-golden" />
                    <span className="text-sm text-muted-foreground">{day.location}</span>
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                {/* Description */}
                {day.description && (
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {day.description}
                  </p>
                )}

                {/* Activities */}
                {day.activities.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4 text-golden" />
                      Activities
                    </h4>
                    <ul className="space-y-2">
                      {day.activities
                        .sort((a, b) => a.order - b.order)
                        .map((activity) => (
                          <li key={activity.id} className="flex items-start gap-3 group/item">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-golden to-golden-dark mt-2 flex-shrink-0 group-hover/item:shadow-golden/30 transition-shadow duration-300" />
                            <div className="flex-1">
                              <span className="text-muted-foreground leading-relaxed text-sm group-hover/item:text-foreground transition-colors duration-300">
                                {activity.title}
                              </span>
                              {activity.description && (
                                <p className="text-xs text-muted-foreground/80 mt-1">
                                  {activity.description}
                                </p>
                              )}
                              {activity.duration && (
                                <span className="text-xs text-golden font-medium">
                                  ({activity.duration})
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Highlights */}
                {day.highlights.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Star className="h-4 w-4 text-golden" />
                      Highlights
                    </h4>
                    <ul className="space-y-1">
                      {day.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="h-3 w-3 text-golden mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Meals */}
                {day.meals.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-golden" />
                      Meals
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {day.meals.map((meal, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {meal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accommodation */}
                {day.accommodation && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Bed className="h-4 w-4 text-golden" />
                      Accommodation
                    </h4>
                    <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                  </div>
                )}

                {/* Day Images */}
                {day.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                    {day.images.slice(0, 3).map((image, index) => (
                      <div key={index} className="relative overflow-hidden rounded-md shadow-sm group/img cursor-pointer">
                        <img
                          src={image}
                          alt={`${day.title} ${index + 1}`}
                          className="w-full h-20 object-cover transition-transform duration-300 group-hover/img:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-golden/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                      </div>
                    ))}
                    {day.images.length > 3 && (
                      <div className="flex items-center justify-center bg-muted/50 rounded-md h-20">
                        <span className="text-xs text-muted-foreground">+{day.images.length - 3} more</span>
                      </div>
                    )}
                  </div>
                )}

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