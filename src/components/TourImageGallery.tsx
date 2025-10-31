import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TourImage } from "@/lib/api";

interface TourImageGalleryProps {
  images: TourImage[] | string[];
}

const TourImageGallery = ({ images }: TourImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="h-96 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {images.map((image, index) => {
            // Handle both TourImage objects and string URLs for backward compatibility
            const imageUrl = typeof image === 'string' ? image : image.url;
            const imageAlt = typeof image === 'string' ? `Tour image ${index + 1}` : (image.alt || `Tour image ${index + 1}`);
            const imageCaption = typeof image === 'string' ? undefined : image.caption;
            
            return (
              <CarouselItem key={typeof image === 'string' ? index : image.id} className="h-full">
                <img 
                  src={imageUrl} 
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                />
                {imageCaption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 backdrop-blur-sm">
                    <p className="text-sm md:text-base">{imageCaption}</p>
                  </div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        
        {images.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70" />
          </>
        )}
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default TourImageGallery;