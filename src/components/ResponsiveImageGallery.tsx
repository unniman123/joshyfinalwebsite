interface ResponsiveImageGalleryProps {
  images: string[];
  className?: string;
}

const ResponsiveImageGallery = ({ images, className = "" }: ResponsiveImageGalleryProps) => {
  // Validate and filter images
  const validImages = (() => {
    if (!images || !Array.isArray(images)) {
      return [];
    }
    return images.filter(img => img && typeof img === 'string' && img.trim());
  })();

  if (!validImages.length) {
    return (
      <div className={`bg-muted/30 rounded-lg p-8 flex items-center justify-center ${className}`}>
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  // Handle different image counts with mobile-first responsive layouts
  const getGridClasses = () => {
    if (validImages.length === 1) {
      return "grid grid-cols-1 gap-3 sm:gap-4";
    } else if (validImages.length === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4";
    } else {
      return "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4";
    }
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {validImages.map((image, index) => (
        <div key={index} className="relative overflow-hidden rounded-lg shadow-card">
          <img
            src={image}
            alt={`Itinerary image ${index + 1}`}
            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ResponsiveImageGallery;