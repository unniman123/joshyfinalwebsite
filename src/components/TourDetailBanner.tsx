import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tour } from "@/lib/api";
import ayurvedaTreatments from "@/assets/Ayurveda treatments KeralaToursGlobal.jpg";
import ktgAmmachi from "@/assets/KTG Ammachi.jpg";
import rameswaramTemple from "@/assets/Rameswaramtemple KeralaToursGlobal.png";
import stiltFishing from "@/assets/Stilt Fishing in Sri Lanka.jpg";

interface TourDetailBannerProps {
  tour: Tour;
}

const TourDetailBanner = ({ tour }: TourDetailBannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reuse the same banner images from HeroBanner component
  const bannerImages = [
    {
      src: ayurvedaTreatments,
      alt: "Ayurveda Treatments Kerala",
      title: "Authentic Ayurveda Treatments",
      subtitle: "Experience traditional healing therapies in Kerala's serene settings"
    },
    {
      src: ktgAmmachi,
      alt: "Kerala Traditional Culture",
      title: "Discover Kerala's Rich Heritage",
      subtitle: "Immerse yourself in authentic local culture and traditions"
    },
    {
      src: rameswaramTemple,
      alt: "Rameswaram Temple",
      title: "Sacred Temples of South India",
      subtitle: "Explore ancient temples and spiritual destinations"
    },
    {
      src: stiltFishing,
      alt: "Stilt Fishing in Sri Lanka",
      title: "Unique Cultural Experiences",
      subtitle: "Witness traditional fishing methods and coastal life"
    }
  ];

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
      {/* Background Images */}
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
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-white max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {tour.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
              {tour.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
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

      {/* Slide Indicators */}
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