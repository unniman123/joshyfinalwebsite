import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import ayurvedaTreatments from "@/assets/Ayurveda treatments KeralaToursGlobal.jpg";
import ktgAmmachi from "@/assets/KTG Ammachi.jpg";
import rameswaramTemple from "@/assets/Rameswaramtemple KeralaToursGlobal.png";
import stiltFishing from "@/assets/Stilt Fishing in Sri Lanka.jpg";

// Admin-controllable props interface
interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  searchButtonClassName?: string;
  className?: string;
}

const HeroBanner = ({
  title = "",
  subtitle = "Explore the best travel experiences across India and beyond",
  searchPlaceholder = "Search destinations, tours, or activities...",
  searchButtonClassName = "px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors",
  className = ""
}: HeroBannerProps = {}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tours?search=${encodeURIComponent(searchQuery.trim())}`);
    }
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

      {/* Search Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Content Overlay - Search Bar and Button */}
      <div className={`relative z-20 h-full flex flex-col justify-center items-center px-4 pt-8 ${className}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
            {subtitle}
          </p>
        </div>

        {/* Search Bar - Simplified Design */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base border-0 rounded-lg bg-transparent focus:ring-2 focus:ring-brand-green/50 focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] rounded-lg transition-colors btn-subtle-anim"
              >
                Search
              </Button>
            </div>
          </div>
        </form>

        {/* Plan My Trip Button */}
        <div className="mt-8">
          <Button
            variant="default"
            size="lg"
            className="text-lg px-8 py-3 bg-red-800 hover:bg-red-900 text-white transition-bounce btn-subtle-anim animate-fade-in-up"
            style={{ animationDelay: '0.22s' }}
            asChild
          >
            <Link to="/contact">
              Plan My Trip
            </Link>
          </Button>
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
