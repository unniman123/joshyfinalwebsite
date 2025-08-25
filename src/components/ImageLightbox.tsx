import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  tourTitle?: string;
}

const ImageLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  tourTitle = "Tour"
}: ImageLightboxProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "z":
        case "Z":
          e.preventDefault();
          setIsZoomed(!isZoomed);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isZoomed, onClose]);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
    setIsZoomed(false);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
    setIsZoomed(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !images.length) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-300 hover:scale-110"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 z-60 px-4 py-2 rounded-full bg-black/50 text-white">
        <span className="text-sm">
          <span className="text-golden font-medium">{currentIndex + 1}</span> of {images.length}
        </span>
      </div>

      {/* Zoom controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-60 flex gap-2">
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-300 hover:scale-110"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-60 p-4 rounded-full bg-black/50 text-white hover:bg-golden/80 transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-60 p-4 rounded-full bg-black/50 text-white hover:bg-golden/80 transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      {/* Main image */}
      <div className="relative max-w-full max-h-full flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`${tourTitle} - Image ${currentIndex + 1}`}
          className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 ${isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            }`}
          onClick={() => setIsZoomed(!isZoomed)}
          loading="lazy"
        />

        {/* Golden glow effect */}
        <div className="absolute inset-0 rounded-lg shadow-golden/20 pointer-events-none" />
      </div>

      {/* Image thumbnails for quick navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-60 flex gap-2 max-w-full overflow-x-auto px-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                onNavigate(index);
                setIsZoomed(false);
              }}
              className={`flex-shrink-0 relative overflow-hidden rounded transition-all duration-300 ${index === currentIndex
                  ? "ring-2 ring-golden shadow-golden/40 scale-110"
                  : "hover:ring-2 hover:ring-golden/50 hover:scale-105 opacity-70 hover:opacity-100"
                }`}
            >
              <img
                src={image}
                alt={`${tourTitle} thumbnail ${index + 1}`}
                className="w-12 h-12 md:w-16 md:h-16 object-cover"
                loading="lazy"
              />

              {/* Golden overlay for active thumbnail */}
              {index === currentIndex && (
                <div className="absolute inset-0 bg-gradient-to-br from-golden/30 to-transparent" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-60 text-white/70 text-sm hidden md:block">
        <div className="space-y-1">
          <div>← → Navigate</div>
          <div>Z Zoom</div>
          <div>ESC Close</div>
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;