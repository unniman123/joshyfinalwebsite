import { useState } from "react";
import { Expand } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

interface ItineraryImageGalleryProps {
  images: string[];
  tourTitle: string;
  itineraryDays?: number;
  className?: string;
  // Optional mapping: one image URL per day index (preferred)
  dayImages?: Record<number, string>;
}

const ItineraryImageGallery = ({ images, tourTitle, itineraryDays = 6, className = "", dayImages = {} }: ItineraryImageGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Intelligent image distribution to match itinerary days
  const getDistributedImages = () => {
    const filteredImages = images.filter(Boolean);

    if (!filteredImages.length) return [];

    // If caller provided explicit dayImages mapping, prefer that (ordered by day index)
    const mappedDayImages: string[] = [];
    for (let i = 0; i < itineraryDays; i++) {
      if (dayImages[i + 1]) mappedDayImages.push(dayImages[i + 1]);
    }
    if (mappedDayImages.length) return mappedDayImages;

    // If we have enough images, try to match itinerary days
    if (filteredImages.length >= itineraryDays) {
      return filteredImages.slice(0, itineraryDays);
    }

    // If we have fewer images than days, return what we have
    return filteredImages;
  };

  const galleryImages = getDistributedImages();

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!galleryImages.length) {
    return (
      <div className={`w-full h-64 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg flex items-center justify-center border-2 border-dashed border-brand-green/20 ${className}`}>
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  // All images - Vertical stack layout with golden theming
  return (
    <div className={`w-full space-y-4 ${className}`}>
      {galleryImages.map((image, index) => (
        <div key={index} className="relative overflow-hidden rounded-lg shadow-warm group cursor-pointer border-2 border-transparent hover:border-brand-green/50 transition-all duration-300 hover:shadow-brand">
          <img
            src={image}
            alt={`${tourTitle} itinerary ${index + 1}`}
            className="w-full h-40 md:h-48 lg:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onClick={() => handleImageClick(index)}
          />

          {/* Golden gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-warm-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Expand icon */}
          <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Expand className="h-4 w-4" />
          </div>
        </div>
      ))}

      {/* Image Lightbox */}
      <ImageLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
        tourTitle={tourTitle}
      />
    </div>
  );
};

export default ItineraryImageGallery;