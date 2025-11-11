import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { unifiedSearch, getHomepageSettings } from "@/lib/api";
import ayurvedaTreatments from "@/assets/Ayurveda treatments KeralaToursGlobal.jpg";
import ktgAmmachi from "@/assets/KTG Ammachi.jpg";
import rameswaramTemple from "@/assets/Rameswaramtemple KeralaToursGlobal.png";
import stiltFishing from "@/assets/Stilt Fishing in Sri Lanka.jpg";

// Hero banner props (search-related only, content comes from database)
interface HeroBannerProps {
  searchPlaceholder?: string;
  searchButtonClassName?: string;
  className?: string;
}

const HeroBanner = ({
  searchPlaceholder = "Search destinations, tours, or activities...",
  searchButtonClassName = "px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors",
  className = ""
}: HeroBannerProps = {}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [heroData, setHeroData] = useState<{ title: string; subtitle: string; images: Array<{ url: string; order: number }> } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fallback banner images for when database image is not available
  const fallbackImages = [
    {
      src: ayurvedaTreatments,
      alt: "Ayurveda Treatments Kerala"
    },
    {
      src: ktgAmmachi,
      alt: "Kerala Traditional Culture"
    },
    {
      src: rameswaramTemple,
      alt: "Rameswaram Temple"
    },
    {
      src: stiltFishing,
      alt: "Stilt Fishing in Sri Lanka"
    }
  ];

  // Use hero images from database or fallback to rotating images
  const bannerImages = heroData?.images && heroData.images.length > 0
    ? heroData.images
        .sort((a, b) => a.order - b.order) // Sort by order field
        .map(img => ({ src: img.url, alt: "Hero Banner" }))
    : fallbackImages;

  // Fetch hero settings from database
  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        const settings = await getHomepageSettings();
        if (settings) {
          setHeroData(settings);
        }
      } catch (error) {
        console.error('Failed to fetch hero settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSettings();
  }, []);

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    
    if (!query) return;

    // Perform unified search across tours and destinations
    const results = await unifiedSearch(query);

    // Smart routing based on search results
    if (results.totalResults === 0) {
      // No results found - go to tours page with search (will show "no results")
      navigate(`/tours?search=${encodeURIComponent(query)}`);
    } else if (results.hasDestinationsOnly) {
      // Only destinations found - go to top destinations page
      navigate(`/top-destinations?search=${encodeURIComponent(query)}`);
    } else if (results.hasToursOnly) {
      // Only tours found - go to tours page
      navigate(`/tours?search=${encodeURIComponent(query)}`);
    } else if (results.hasBoth) {
      // Both found - prioritize tours page but user can navigate to destinations
      // Tours page will show link to destination results
      navigate(`/tours?search=${encodeURIComponent(query)}&hasDestinations=true`);
    } else {
      // Fallback to tours page
      navigate(`/tours?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative h-[72vh] md:h-[86vh] lg:h-[92vh] overflow-hidden mb-0">
      {/* Background Images with scrim overlay for predictable contrast */}
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
        <div className="absolute inset-0 z-0">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 0 ? 'high' : 'auto'}
              srcSet={`${image.src} 1200w, ${image.src} 800w, ${image.src} 480w`}
            />
            {/* scrim overlay applied as pseudo overlay div to ensure readable text */}
            <div className="absolute inset-0" style={{ background: 'var(--image-scrim)' }} />
          </div>
        </div>
      ))}

      {/* Content Overlay - Full-screen center-aligned hero content */}
      <div className={`relative z-20 h-full flex flex-col justify-center items-center px-6 transform md:translate-y-4 lg:translate-y-6 ${className}`}>
        <div className="text-center w-full mx-auto px-4">
          {/* Main Title - fetched from database */}
          {heroData?.title && (
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in-up"
              style={{ animationDelay: '0.1s', fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}
            >
              {heroData.title}
            </h1>
          )}

          {/* Subtitle - fetched from database */}
          {heroData?.subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {heroData.subtitle}
            </p>
          )}

          {/* Search Bar - responsive stacking */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 md:p-2 shadow-lg">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 h-10 text-base md:text-base border-0 rounded-lg bg-transparent focus:ring-2 focus:ring-brand-green/50 focus:outline-none"
                    style={{ lineHeight: '1' }}
                  />
                </div>
                <Button
                  type="submit"
                  variant="cta"
                  className="bg-[#FF8C00] hover:bg-[#FF7700] text-white px-6 h-10 rounded-lg btn-subtle-anim w-full md:w-auto font-semibold shadow-md"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-6 md:mt-8 flex justify-center w-full mx-auto">
            <Link to="/contact" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md transition text-center font-semibold shadow-md">Plan My Trip</Link>
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
