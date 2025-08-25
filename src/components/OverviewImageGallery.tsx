import { useState } from "react";
import { Expand } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

interface OverviewImageGalleryProps {
  images: string[];
  tourTitle: string;
  onImageClick?: (index: number) => void;
}

const OverviewImageGallery = ({ images, tourTitle, onImageClick }: OverviewImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Get first 2-3 images for overview gallery
  const galleryImages = images.slice(0, 3);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    onImageClick?.(index);
  };

  // Fallback if no images
  if (!galleryImages.length) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  // Single image layout
  if (galleryImages.length === 1) {
    return (
      <div className="w-full">
        <div className="relative overflow-hidden rounded-lg shadow-card group cursor-pointer border-2 border-transparent hover:border-golden/50 transition-all duration-300">
          <img
            src={galleryImages[0]}
            alt={`${tourTitle} overview`}
            className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onClick={() => handleImageClick(0)}
          />

          {/* Golden overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-golden/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Expand icon */}
          <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Expand className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }

  // Multiple images layout with main image and thumbnails
  return (
    <div className="w-full space-y-4">
      {/* Main featured image */}
      <div className="relative overflow-hidden rounded-lg shadow-card group cursor-pointer border-2 border-transparent hover:border-golden/50 transition-all duration-300 hover:shadow-golden">
        <img
          src={galleryImages[selectedImageIndex]}
          alt={`${tourTitle} overview ${selectedImageIndex + 1}`}
          className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onClick={() => handleImageClick(selectedImageIndex)}
        />

        {/* Golden gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-golden/10 to-warm-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Expand icon */}
        <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Expand className="h-4 w-4" />
        </div>
      </div>

      {/* Enhanced thumbnail previews with golden theming */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 justify-center">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 group ${index === selectedImageIndex
                ? "ring-2 ring-golden shadow-golden/40 scale-105"
                : "hover:ring-2 hover:ring-golden/50 hover:shadow-warm hover:scale-105"
                }`}
            >
              <img
                src={image}
                alt={`${tourTitle} thumbnail ${index + 1}`}
                className={`w-16 h-16 md:w-20 md:h-20 object-cover transition-all duration-300 ${index === selectedImageIndex
                  ? "opacity-100"
                  : "opacity-75 group-hover:opacity-100"
                  }`}
                loading="lazy"
              />

              {/* Golden gradient overlay for active thumbnail */}
              {index === selectedImageIndex && (
                <div className="absolute inset-0 bg-gradient-to-br from-golden/20 to-transparent rounded-lg" />
              )}

              {/* Hover overlay for inactive thumbnails */}
              {index !== selectedImageIndex && (
                <div className="absolute inset-0 bg-gradient-to-br from-golden/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Enhanced image counter with golden accent */}
      {galleryImages.length > 1 && (
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            <span className="text-golden font-medium">{selectedImageIndex + 1}</span> of {galleryImages.length}
          </span>
        </div>
      )}

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

export default OverviewImageGallery;