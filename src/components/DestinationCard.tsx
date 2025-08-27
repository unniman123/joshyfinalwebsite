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
      <div className="relative overflow-hidden rounded-t-lg h-32">
        <img 
          src={destination.image} 
          alt={destination.title}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
        {/* State Badge */}
        <div className="absolute top-2 right-2">
          <div className="bg-black/70 text-white text-sm px-3 py-1 rounded">
            {destination.state}
          </div>
        </div>
      </div>

      {/* Content Section - 90% of space dedicated to written content */}
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-xl font-bold text-foreground leading-tight mb-3">
          {destination.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-base text-muted-foreground mb-3">
          <MapPin className="h-5 w-5 flex-shrink-0" />
          <span>{destination.region}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-6 pb-6 space-y-5">
        {/* Main Description - Maximum space for 300+ words */}
        <CardDescription className="text-base leading-relaxed text-justify">
          {destination.shortDescription}
        </CardDescription>

        {/* Famous For Tags - Enhanced display */}
        {destination.famousFor && destination.famousFor.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {destination.famousFor.slice(0, 4).map((item, index) => (
              <span 
                key={index}
                className="text-sm px-3 py-1.5 bg-golden/10 text-golden border border-golden/30 rounded-md"
              >
                {item}
              </span>
            ))}
            {destination.famousFor.length > 4 && (
              <span className="text-sm px-3 py-1.5 bg-muted text-muted-foreground rounded-md">
                +{destination.famousFor.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Best Time to Visit - Enhanced info */}
        {destination.bestTimeToVisit && (
          <div className="text-sm text-muted-foreground pt-3 border-t border-muted/20">
            <strong>Best time to visit:</strong> {destination.bestTimeToVisit}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DestinationCard;