import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroKeralBackwaters from "@/assets/hero-kerala-backwaters.jpg";
import heroRajasthanPalace from "@/assets/hero-rajasthan-palace.jpg";
import heroAyurvedaSpa from "@/assets/hero-ayurveda-spa.jpg";
import alleppeyTourism from "@/assets/alleppey-tourism.jpg";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    {
      src: heroKeralBackwaters,
      alt: "Kerala Backwaters",
      title: "Discover Kerala's Pristine Backwaters",
      subtitle: "Experience serenity with traditional houseboats"
    },
    {
      src: heroRajasthanPalace,
      alt: "Rajasthan Palace",
      title: "Explore Magnificent Rajasthan",
      subtitle: "Journey through royal palaces and desert landscapes"
    },
    {
      src: heroAyurvedaSpa,
      alt: "Ayurveda Spa",
      title: "Rejuvenate with Authentic Ayurveda",
      subtitle: "Ancient healing traditions for modern wellness"
    },
    {
      src: alleppeyTourism,
      alt: "Alleppey Tourism",
      title: "Experience Alleppey's Backwater Paradise",
      subtitle: "Discover the Venice of the East with its serene backwaters and houseboats"
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

      {/* Content Overlay - Only Button */}
      <div className="relative z-10 h-full flex items-center justify-end">
        <div className="container mx-auto px-4">
          <div className="flex justify-end pr-8 md:pr-16 lg:pr-20">
            <Button
              variant="default"
              size="lg"
              className="text-lg px-8 py-3 bg-red-800 hover:bg-red-900 text-white transition-bounce"
              asChild
            >
              <Link to="/contact">
                Plan My Trip
              </Link>
            </Button>
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

export default HeroBanner;
