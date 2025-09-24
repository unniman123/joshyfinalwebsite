import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tour } from "@/lib/api";
import TourImageGallery from "@/components/TourImageGallery";
import { Clock, MapPin, IndianRupee } from "lucide-react";
interface TourDetailHeaderProps {
  tour: Tour;
}
const TourDetailHeader = ({
  tour
}: TourDetailHeaderProps) => {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Large image */}
          <div className="lg:col-span-7">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={(tour.images && tour.images[0] && tour.images[0].url) || '/placeholder-1200x600.png'} alt={tour.title} className="w-full h-80 object-cover lg:h-96" />
            </div>
          </div>

          {/* Right: Title and meta */}
          <div className="lg:col-span-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{tour.title}</h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6">{tour.description}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="text-muted-foreground" />
                <span className="text-sm text-foreground">{tour.duration ? `${tour.duration} days` : 'Duration TBA'}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-muted-foreground" />
                <span className="text-sm text-foreground">{tour.category || 'Various destinations'}</span>
              </div>

              <div className="flex items-center gap-3">
                <IndianRupee className="text-muted-foreground" />
                <span className="text-sm text-foreground">{tour.price || 'Price on request'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TourDetailHeader;