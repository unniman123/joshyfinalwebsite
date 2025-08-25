import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tour } from "@/lib/api";
import { getImagesBySection } from "@/lib/admin-utils";

// Import the same banner images from HeroBanner as fallback
import ayurvedaTreatments from "@/assets/Ayurveda treatments KeralaToursGlobal.jpg";
import ktgAmmachi from "@/assets/KTG Ammachi.jpg";
import rameswaramTemple from "@/assets/Rameswaramtemple KeralaToursGlobal.png";
import stiltFishing from "@/assets/Stilt Fishing in Sri Lanka.jpg";

interface TourDetailBannerProps {
  tour: Tour;
}

const TourDetailBanner = ({ tour }: TourDetailBannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get banner images from admin panel or use fallback images
  const getBannerImages = () => {
    const adminBannerImages = getImagesBySection(tour, 'banner');

    if (adminBannerImages.length > 0) {
      return adminBannerImages.map(img => ({
        src: img.url,
        alt: img.alt || tour.title,
        caption: img.caption
      }));
    }

    // Fallback to default banner images for consistency
    return [
      {
        src: ayurvedaTreatments,
        alt: "Ayurveda Treatments Kerala",
      },
      {
        src: ktgAmmachi,
        alt: "Kerala Traditional Culture",
      },
      {
        src: rameswaramTemple,
        alt: "Rameswaram Temple",
      },
      {
        src: stiltFishing,
        alt: "Stilt Fishing in Sri Lanka",
      }
    ];
  };

  const bannerImages = getBannerImages();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [bannerImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Images - Same as HeroBanner */}
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Tour-specific overlay content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {tour.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4 max-w-3xl leading-relaxed">
              {tour.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Same as HeroBanner */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-smooth backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-smooth backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators - Same as HeroBanner */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TourDetailBanner;