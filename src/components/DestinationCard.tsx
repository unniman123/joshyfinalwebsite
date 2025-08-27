import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { DestinationSummary } from "@/lib/api";

interface DestinationCardProps {
  destination: DestinationSummary;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Card className="border-2 border-golden/30 hover:border-golden/50 hover:shadow-lg hover:shadow-golden/20 transition-all duration-300 h-full">
      {/* Small Image Section - 10% of vertical space for minimal image presence */}
      <div className="relative overflow-hidden rounded-t-lg h-24">
        <img 
          src={destination.image} 
          alt={destination.title}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
        {/* State Badge */}
        <div className="absolute top-1 right-1">
          <div className="bg-black/70 text-white text-xs px-2 py-0.5 rounded">
            {destination.state}
          </div>
        </div>
      </div>

      {/* Content Section - 90% of space dedicated to written content */}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-foreground leading-tight mb-2">
          {destination.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span>{destination.region}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Main Description - Maximum space for 300+ words */}
        <CardDescription className="text-sm leading-relaxed text-justify">
          {destination.shortDescription}
        </CardDescription>

        {/* Famous For Tags - Compact display */}
        {destination.famousFor && destination.famousFor.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {destination.famousFor.slice(0, 3).map((item, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-golden/10 text-golden border border-golden/30 rounded"
              >
                {item}
              </span>
            ))}
            {destination.famousFor.length > 3 && (
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                +{destination.famousFor.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Best Time to Visit - Compact info */}
        {destination.bestTimeToVisit && (
          <div className="text-xs text-muted-foreground pt-2 border-t border-muted/20">
            <strong>Best time to visit:</strong> {destination.bestTimeToVisit}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DestinationCard;