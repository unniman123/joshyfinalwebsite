import {
  MapPin,
  Plane,
  Camera,
  Mountain,
  Ship,
  Building,
  TreePine,
  Clock
} from "lucide-react";

interface ItineraryTimelineProps {
  totalDays: number;
  activeDay?: number;
  className?: string;
}

const ItineraryTimeline = ({ totalDays, activeDay, className = "" }: ItineraryTimelineProps) => {
  // Get milestone icon based on day number and position
  const getMilestoneIcon = (dayNumber: number) => {
    if (dayNumber === 1) return Plane; // Arrival
    if (dayNumber === totalDays) return Plane; // Departure

    // Vary icons for middle days
    const middleIcons = [Camera, Mountain, Ship, Building, TreePine, MapPin];
    const iconIndex = (dayNumber - 2) % middleIcons.length;
    return middleIcons[iconIndex];
  };

  // Generate timeline points
  const timelinePoints = Array.from({ length: totalDays }, (_, index) => {
    const dayNumber = index + 1;
    const IconComponent = getMilestoneIcon(dayNumber);
    const isActive = activeDay === dayNumber;
    const isFirst = dayNumber === 1;
    const isLast = dayNumber === totalDays;

    return {
      dayNumber,
      IconComponent,
      isActive,
      isFirst,
      isLast
    };
  });

  return (
    <div className={`relative ${className}`}>
      {/* Journey path line */}
      <div className="absolute left-8 top-12 bottom-12 w-0.5">
        <div className="h-full bg-gradient-to-b from-golden via-golden/70 to-golden rounded-full opacity-60"
          style={{
            background: `linear-gradient(to bottom, 
                 hsl(var(--golden)) 0%, 
                 hsl(var(--golden)) 50%, 
                 hsl(var(--golden)) 100%)`
          }}
        />

        {/* Dotted overlay for elegant effect */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-golden to-golden-dark opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 8px,
              hsl(var(--golden)) 8px,
              hsl(var(--golden)) 12px
            )`
          }}
        />
      </div>

      {/* Timeline milestones */}
      <div className="space-y-8">
        {timelinePoints.map((point, index) => (
          <div key={point.dayNumber} className="relative flex items-center">
            {/* Milestone marker */}
            <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full transition-all duration-500 ${point.isActive
                ? 'bg-gradient-to-br from-golden to-golden-dark shadow-golden scale-110'
                : 'bg-gradient-to-br from-golden/80 to-golden-dark/80 shadow-warm hover:shadow-golden hover:scale-105'
              }`}>
              {/* Golden glow effect */}
              <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${point.isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                }`}
                style={{
                  boxShadow: '0 0 20px hsl(var(--golden) / 0.6), 0 0 40px hsl(var(--golden) / 0.3)'
                }}
              />

              {/* Icon */}
              <point.IconComponent className="h-7 w-7 text-white relative z-10" />

              {/* Inner golden ring */}
              <div className="absolute inset-1 rounded-full border-2 border-golden-light/30" />
            </div>

            {/* Day label with sophisticated styling */}
            <div className="ml-6 flex-1">
              <div className={`inline-flex items-center px-4 py-2 rounded-full transition-all duration-300 ${point.isActive
                  ? 'bg-gradient-to-r from-golden/20 to-golden-light/30 border border-golden/40'
                  : 'bg-muted/50 hover:bg-golden/10 border border-transparent hover:border-golden/30'
                }`}>
                <span className={`text-sm font-semibold transition-colors duration-300 ${point.isActive ? 'text-golden-dark' : 'text-muted-foreground hover:text-golden'
                  }`}>
                  Day {point.dayNumber}
                </span>

                {/* Special labels for first and last days */}
                {point.isFirst && (
                  <span className="ml-2 text-xs text-golden/80 font-medium">Journey Begins</span>
                )}
                {point.isLast && (
                  <span className="ml-2 text-xs text-golden/80 font-medium">Journey Ends</span>
                )}
              </div>
            </div>

            {/* Connecting line to next milestone (except for last) */}
            {!point.isLast && (
              <div className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-golden/60 to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Journey completion indicator */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-golden/10 to-golden-light/20 border border-golden/30">
          <div className="w-2 h-2 rounded-full bg-golden animate-pulse" />
          <span className="text-sm font-medium text-golden-dark">
            {totalDays}-Day Journey Experience
          </span>
          <div className="w-2 h-2 rounded-full bg-golden animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ItineraryTimeline;