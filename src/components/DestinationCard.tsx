import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DestinationSummary } from "@/lib/api";
import { truncateContent, needsReadMore } from "@/lib/utils";

interface DestinationCardProps {
  destination: DestinationSummary;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { truncated, isTruncated } = truncateContent(destination.shortDescription, 50);
  const showReadMore = needsReadMore(destination.shortDescription, 50);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="border-2 border-golden/30 hover:border-golden/50 hover:shadow-lg hover:shadow-golden/20 transition-all duration-300 h-full">
      {/* Image Section - 40-45% of vertical space for enhanced visual appeal */}
      <div className="relative overflow-hidden rounded-t-lg h-40">
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

      {/* Content Section - 55-60% of space dedicated to written content */}
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-xl font-bold text-foreground leading-tight mb-3">
          {destination.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 px-6 pb-6">
        {/* Main Description - Primary content focus */}
        <CardDescription className="text-base leading-relaxed text-justify mb-4">
          {isExpanded ? destination.shortDescription : truncated}
        </CardDescription>
        
        {/* Read More/Less Button */}
        {showReadMore && (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="text-golden hover:text-golden-dark hover:bg-golden/10 transition-colors duration-200 gap-2 text-sm font-medium"
            >
              {isExpanded ? (
                <>
                  Read Less
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Read More
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DestinationCard;