import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Calendar, Phone, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDayOutPackages } from "@/lib/supabase-api";
import { submitDayOutInquiry } from "@/lib/supabase-inquiries";
import { useToast } from "@/hooks/use-toast";
import keralaTourCard from "@/assets/kerala-tour-card.jpg";
import heroRajasthanPalace from "@/assets/hero-rajasthan-palace.jpg";
import heroAyurvedaSpa from "@/assets/hero-ayurveda-spa.jpg";
import goldenTriangleTourCard from "@/assets/tour-golden-triangle.jpg";

// Day out package interface
interface DayOutPackage {
  id: string | number;
  title: string;
  image: string;
  slug: string;
  description: string;
  showDescription?: boolean;
  showExploreButton?: boolean;
}

// Admin configuration interfaces
interface PackageFormConfig {
  phoneFieldPlaceholder: string;
  destinationFieldLabel: string;
}

interface DayOutPackagesSectionProps {
  sectionTitle?: string;
  packages?: DayOutPackage[];
  formConfig?: PackageFormConfig;
}

const DayOutPackagesSection = ({
  sectionTitle = "Kerala Day Out Packages",
  packages,
  formConfig = {
    phoneFieldPlaceholder: "",
    destinationFieldLabel: "Destination"
  }
}: DayOutPackagesSectionProps = {}) => {
  const { toast } = useToast();
  // State for Supabase-fetched packages
  const [fetchedPackages, setFetchedPackages] = useState<DayOutPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch day-out packages from Supabase on component mount
  useEffect(() => {
    const loadDayOutPackages = async () => {
      try {
        setIsLoading(true);
        const supabasePackages = await getDayOutPackages();
        
        if (supabasePackages && supabasePackages.length > 0) {
          setFetchedPackages(supabasePackages);
        }
      } catch (error) {
        console.error('Failed to load day-out packages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if no packages provided via props (admin override)
    if (!packages || packages.length === 0) {
      loadDayOutPackages();
    } else {
      setIsLoading(false);
    }
  }, [packages]);

  // Use provided packages (admin), fetched packages (Supabase), or fallback to mock
  const dayOutPackages: DayOutPackage[] = packages || (fetchedPackages.length > 0 ? fetchedPackages : [
    {
      id: 1,
      title: "Backwater Day Cruise",
      image: keralaTourCard,
      slug: "backwater-day-cruise",
      description: "Enjoy a relaxing day cruise through Kerala's pristine backwaters with lunch"
    },
    {
      id: 2,
      title: "Spice Garden Visit",
      image: heroAyurvedaSpa,
      slug: "spice-garden-visit",
      description: "Explore aromatic spice plantations and learn about Kerala's spice heritage"
    },
    {
      id: 3,
      title: "Beach Day Experience",
      image: heroRajasthanPalace,
      slug: "beach-day-experience",
      description: "Spend a perfect day at Kerala's beautiful beaches with water activities"
    },
    {
      id: 4,
      title: "Hill Station Escape",
      image: goldenTriangleTourCard,
      slug: "hill-station-escape",
      description: "Experience the cool climate and tea gardens of Kerala's hill stations"
    },
    {
      id: 5,
      title: "Cultural Village Tour",
      image: keralaTourCard,
      slug: "cultural-village-tour",
      description: "Immerse yourself in authentic Kerala village life and traditions"
    }
  ]);

  // Carousel state management for banner slideshow
  const [currentIndex, setCurrentIndex] = useState(0);
  const packagesPerPage = 1; // Show one package at a time in banner format
  const totalPages = dayOutPackages.length; // Each package gets its own slide

  // Touch/Swipe state for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Automatic slideshow timer - matches HeroBanner pattern
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dayOutPackages.length);
    }, 5000); // 5 second interval

    return () => clearInterval(timer);
  }, [dayOutPackages.length]);

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    date: "",
    numberOfPeople: "",
    destination: ""
  });

  // Get current package to display in banner
  const getCurrentPackage = () => {
    if (!dayOutPackages || dayOutPackages.length === 0) {
      return {
        id: '',
        title: '',
        image: '',
        slug: '',
        description: '',
        showDescription: false,
        showExploreButton: false
      };
    }
    return dayOutPackages[currentIndex];
  };

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get current package for the inquiry
      const currentPackage = getCurrentPackage();

      // Validate required fields
      if (!currentPackage?.id) {
        throw new Error("No package selected");
      }

      if (!formData.numberOfPeople || parseInt(formData.numberOfPeople, 10) < 1) {
        throw new Error("Please enter a valid number of people");
      }

      // Submit to Supabase
      await submitDayOutInquiry({
        package_id: String(currentPackage.id),
        name: formData.name,
        mobile_no: formData.mobileNo,
        preferred_date: formData.date,
        number_of_people: parseInt(formData.numberOfPeople, 10),
        destination: formData.destination || null,
        special_comments: null
      });

      // Show success toast
      toast({
        title: "Day Out Enquiry Submitted Successfully!",
        description: "Thank you for your interest. We'll contact you within 24 hours. Thanks for your interest. We will respond you at the earliest.",
        variant: "default"
      });

      // Reset form after submission
      setFormData({
        name: "",
        mobileNo: "",
        date: "",
        numberOfPeople: "",
        destination: ""
      });

    } catch (error) {
      // Show error toast
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit day out enquiry. Please try again or contact us directly.",
        variant: "destructive"
      });
      console.error("Day out enquiry submission error:", error);
    }
  };

  // Form input handler
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Swipe handlers for mobile touch gestures
  const minSwipeDistance = 50; // Minimum distance for a swipe

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % dayOutPackages.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + dayOutPackages.length) % dayOutPackages.length);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {sectionTitle}
            </h2>
            <div className="w-24 h-1 bg-gradient-brand mx-auto mb-6"></div>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-muted-foreground">Loading day-out packages...</div>
          </div>
        </div>
      </section>
    );
  }

  // Don't render section if no packages available
  if (!dayOutPackages || dayOutPackages.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-background">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            {sectionTitle}
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-brand mx-auto mb-4 sm:mb-6"></div>
        </div>

        {/* Two-Column Layout: Image extends to left edge + Form on right */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:items-start">
          {/* Left Column - Kerala Day Out Packages Carousel (full-bleed left) */}
          <div className="flex-1 lg:w-[70%]">
            <div className="relative">
              {/* Slideshow banner - full-bleed to left edge, extends almost to form */}
              <div className="relative w-full" style={{ marginLeft: 'calc(-50vw + 50%)', width: 'calc(100% + 50vw - 50%)' }}>
                <div 
                  className="w-full h-56 sm:h-64 md:h-72 lg:h-[420px] relative overflow-hidden shadow-card hover:shadow-brand transition-all duration-300 rounded-r-xl sm:rounded-r-2xl lg:rounded-tr-2xl lg:rounded-br-2xl"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                {(() => {
                  const currentPackage = getCurrentPackage();
                  // Don't render if no valid package data
                  if (!currentPackage || !currentPackage.slug) {
                    return (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <div className="text-gray-500">Loading package...</div>
                      </div>
                    );
                  }
                  return (
                    <div
                      className="block w-full h-full group"
                    >
                      {/* Banner Background Image - pale red background limited to the banner area */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full overflow-hidden">
                          <img
                            src={currentPackage.image}
                            alt={currentPackage.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            decoding="async"
                            srcSet={`${currentPackage.image} 1200w, ${currentPackage.image} 800w, ${currentPackage.image} 480w`}
                          />
                          <div className="absolute inset-0" style={{ background: 'var(--image-scrim)' }} />
                        </div>
                      </div>

                      {/* Banner Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 text-white">
                        <div className="max-w-2xl text-center px-2">
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg transition-colors duration-300" style={{ ['--hover-color' as string]: 'hsl(345 50% 85%)' } as React.CSSProperties}>
                            {currentPackage.title}
                          </h3>
                          {/* Show description only if configured to show */}
                          {currentPackage.showDescription && (
                            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-3 sm:mb-4 drop-shadow-md">
                              {currentPackage.description}
                            </p>
                          )}
                          {/* Show explore button only if configured to show */}
                          {currentPackage.showExploreButton && (
                            <Button
                              variant="default"
                              className="text-white font-medium px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all text-sm sm:text-base min-h-[44px]"
                              style={{ backgroundColor: 'hsl(345 65% 45%)' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(345 75% 35%)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'hsl(345 65% 45%)'}
                            >
                              Explore Package
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Package Number Indicator */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/60 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                        {currentIndex + 1} of {totalPages}
                      </div>
                    </div>
                  );
                })()}
                </div>
              </div>

              {/* Banner Slideshow Indicators - Touch-friendly */}
              <div className="flex justify-center mt-4 sm:mt-6 gap-2">
                {dayOutPackages.map((pkg, index) => (
                  <button
                    key={pkg.id}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 min-w-[32px] min-h-[32px] flex items-center justify-center ${index === currentIndex ? 'bg-gray-400 scale-110' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to ${pkg.title} package`}
                    title={pkg.title}
                  >
                    <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${index === currentIndex ? 'bg-gray-400' : 'bg-muted-foreground/30'}`}></span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Enquiry Form (30% on desktop) */}
            <div className="lg:w-[30%] mt-6 sm:mt-8 lg:mt-0">
            {/* Form card */}
            <Card className="border shadow-none transition-all duration-300 w-full max-w-md mx-auto lg:max-w-xs rounded-xl" style={{ borderColor: 'hsl(345 50% 85% / 0.3)', background: 'linear-gradient(180deg, hsl(345 50% 90% / 0.15), hsl(345 50% 90% / 0.08))' }}>
              <CardHeader className="pb-2 sm:pb-1">
                <CardTitle className="text-base sm:text-sm md:text-base font-bold text-black flex items-center gap-1.5 sm:gap-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                  <User className="h-4 w-4 sm:h-3 sm:w-3 text-black/60" />
                  DAY OUT ENQUIRY
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 py-3 sm:px-2 sm:py-2" style={{ backdropFilter: 'blur(4px)', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
                <form onSubmit={handleFormSubmit} className="space-y-2 sm:space-y-1.5">
                  {/* Name Field */}
                  <div className="space-y-1 sm:space-y-0.5">
                    <Label htmlFor="dayOut-name" className="text-sm sm:text-[12px] text-black">
                      Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-2.5 sm:left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-2 sm:w-2 text-black/60" />
                      <Input
                        id="dayOut-name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-8 sm:pl-6 h-10 sm:h-8 text-sm sm:text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile No (WhatsApp) Field */}
                  <div className="space-y-1 sm:space-y-0.5">
                    <Label htmlFor="dayOut-mobile" className="text-sm sm:text-[12px] text-black">
                      Mobile No (WhatsApp) *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 sm:left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-2 sm:w-2 text-black/60" />
                      <Input
                        id="dayOut-mobile"
                        type="tel"
                        placeholder={formConfig.phoneFieldPlaceholder || "WhatsApp number"}
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                        className="pl-8 sm:pl-6 h-10 sm:h-8 text-sm sm:text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                        required
                      />
                    </div>
                  </div>

                  {/* Date Field */}
                  <div className="space-y-1 sm:space-y-0.5">
                    <Label htmlFor="dayOut-date" className="text-sm sm:text-[12px] text-black">
                      Preferred Date *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 sm:left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-2 sm:w-2 text-black/60" />
                      <Input
                        id="dayOut-date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="pl-8 sm:pl-6 h-10 sm:h-8 text-sm sm:text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                        required
                      />
                    </div>
                  </div>

                  {/* Number of People Field */}
                  <div className="space-y-1 sm:space-y-0.5">
                    <Label htmlFor="dayOut-people" className="text-sm sm:text-[12px] text-black">
                      Number of People *
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-2.5 sm:left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-2 sm:w-2 text-black/60" />
                      <Input
                        id="dayOut-people"
                        type="number"
                        min="1"
                        placeholder="e.g., 2"
                        value={formData.numberOfPeople}
                        onChange={(e) => handleInputChange("numberOfPeople", e.target.value)}
                        className="pl-8 sm:pl-6 h-10 sm:h-8 text-sm sm:text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                        required
                      />
                    </div>
                  </div>

                  {/* Destination Field */}
                  <div className="space-y-1 sm:space-y-0.5">
                    <Label htmlFor="dayOut-destination" className="text-sm sm:text-[12px] text-black">
                      {formConfig.destinationFieldLabel} *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 sm:left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-2 sm:w-2 text-black/60" />
                      <Input
                        id="dayOut-destination"
                        type="text"
                        placeholder="Backwater, Beach..."
                        value={formData.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                        className="pl-8 sm:pl-6 h-10 sm:h-8 text-sm sm:text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                        required
                      />
                    </div>
                  </div>


                  {/* Submit Button */}
                  <div className="pt-2 sm:pt-1">
                    <Button
                      type="submit"
                      className="w-full hover:shadow-brand transition-all duration-300 h-11 sm:h-9 text-sm sm:text-[12px] font-bold"
                      style={{ background: '#FF6B4A', color: '#FFFFFF' }}
                    >
                      Send Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DayOutPackagesSection;