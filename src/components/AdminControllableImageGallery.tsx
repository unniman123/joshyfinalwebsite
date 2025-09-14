import { useState } from "react";
import { TourImage } from "@/lib/api";
import { Expand } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

interface AdminControllableImageGalleryProps {
  images: TourImage[];
  section: 'overview' | 'itinerary' | 'gallery';
  tourTitle: string;
  className?: string;
}

const AdminControllableImageGallery = ({
  images,
  section,
  tourTitle,
  className = ""
}: AdminControllableImageGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter images by section and active status, then sort by order
  const sectionImages = images
    .filter(img => img.section === section && img.isActive)
    .sort((a, b) => a.order - b.order);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!sectionImages.length) {
    return (
      <div className={`w-full h-64 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg flex items-center justify-center border-2 border-dashed border-brand-green/20 ${className}`}>
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  // Different layouts based on section and image count
  const renderImageLayout = () => {
    if (section === 'overview') {
      // Overview section - optimized for smaller 10-15% space
      if (sectionImages.length === 1) {
        return (
          <div className="relative overflow-hidden rounded-lg shadow-warm group cursor-pointer border-2 border-transparent hover:border-brand-green/50 transition-all duration-300 hover:shadow-brand">
            <img
              src={sectionImages[0].url}
              alt={sectionImages[0].alt}
              className="w-full h-32 md:h-40 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onClick={() => handleImageClick(0)}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-warm-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Expand className="h-3 w-3" />
            </div>
            {sectionImages[0].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-xs">{sectionImages[0].caption}</p>
              </div>
            )}
          </div>
        );
      }

      // Multiple images - simplified for small space (no thumbnails)
      return (
        <div className="space-y-2">
          <div className="relative overflow-hidden rounded-lg shadow-warm group cursor-pointer border-2 border-transparent hover:border-brand-green/50 transition-all duration-300 hover:shadow-brand">
            <img
              src={sectionImages[0].url}
              alt={sectionImages[0].alt}
              className="w-full h-32 md:h-40 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onClick={() => handleImageClick(0)}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-warm-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Expand className="h-3 w-3" />
            </div>
            {sectionImages[0].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-xs">{sectionImages[0].caption}</p>
              </div>
            )}
          </div>

          {/* Compact image count indicator for multiple images */}
          {sectionImages.length > 1 && (
            <div className="text-center">
              <span className="text-xs text-muted-foreground">
                <span className="text-brand-green font-medium">1</span> of {sectionImages.length}
              </span>
            </div>
          )}
        </div>
      );
    }

    if (section === 'itinerary') {
      // Itinerary section - vertical stack (no captions)
      return (
        <div className="space-y-4">
          {sectionImages.map((image, index) => (
            <div key={image.id} className="relative overflow-hidden rounded-lg shadow-warm group cursor-pointer border-2 border-transparent hover:border-brand-green/50 transition-all duration-300 hover:shadow-brand">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-40 md:h-48 lg:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onClick={() => handleImageClick(index)}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-warm-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Expand className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Gallery section - grid layout
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sectionImages.map((image, index) => (
          <div key={image.id} className="relative overflow-hidden rounded-lg shadow-warm group cursor-pointer border-2 border-transparent hover:border-brand-green/50 transition-all duration-300 hover:shadow-brand">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-32 md:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onClick={() => handleImageClick(index)}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-warm-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Expand className="h-3 w-3" />
            </div>
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-xs">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={className}>
      {renderImageLayout()}

      {/* Image Lightbox */}
      <ImageLightbox
        images={sectionImages.map(img => img.url)}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
        tourTitle={tourTitle}
      />
    </div>
  );
};

export default AdminControllableImageGallery;