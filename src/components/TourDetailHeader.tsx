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
  return <div className="relative">
      {/* TODO: Replace hero image stub with TourImageGallery slideshow */}
      <TourImageGallery images={tour.images} />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
      {/* Overlay content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
              <p className="text-lg text-white/90 mb-4 max-w-2xl">{tour.description}</p>
              
              
            </div>
            
            <div className="lg:text-right">
              <Button variant="hero" size="lg" className="w-full lg:w-auto" asChild>
                
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default TourDetailHeader;