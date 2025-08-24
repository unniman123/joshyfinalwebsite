interface VerticalImageGalleryProps {
  images: string[];
  altPrefix?: string;
  className?: string;
}

const VerticalImageGallery = ({
  images,
  altPrefix = "Gallery image",
  className = ""
}: VerticalImageGalleryProps) => {
  // Handle empty or invalid image arrays
  if (!images || images.length === 0) {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        <div className="w-full h-48 md:h-56 lg:h-64 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={image}
            alt={`${altPrefix} ${index + 1}`}
            className="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default VerticalImageGallery;