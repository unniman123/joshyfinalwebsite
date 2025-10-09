import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Calendar, Phone, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import keralaTourCard from "@/assets/kerala-tour-card.jpg";
import heroRajasthanPalace from "@/assets/hero-rajasthan-palace.jpg";
import heroAyurvedaSpa from "@/assets/hero-ayurveda-spa.jpg";
import goldenTriangleTourCard from "@/assets/tour-golden-triangle.jpg";

// Day out package interface
interface DayOutPackage {
  id: number;
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
  const dayOutPackages: DayOutPackage[] = packages || [
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
  ];

  // Carousel state management for banner slideshow
  const [currentIndex, setCurrentIndex] = useState(0);
  const packagesPerPage = 1; // Show one package at a time in banner format
  const totalPages = dayOutPackages.length; // Each package gets its own slide

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
    return dayOutPackages[currentIndex];
  };

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Day Out Package Enquiry submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      mobileNo: "",
      date: "",
      numberOfPeople: "",
      destination: ""
    });
  };

  // Form input handler
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {sectionTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-brand mx-auto mb-6"></div>
        </div>

        {/* Two-Column Layout: Image extends to left edge + Form on right */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
          {/* Left Column - Kerala Day Out Packages Carousel (full-bleed left) */}
          <div className="flex-1 lg:w-[70%]">
            <div className="relative">
              {/* Slideshow banner - full-bleed to left edge, extends almost to form */}
              <div className="relative w-full" style={{ marginLeft: 'calc(-50vw + 50%)', width: 'calc(100% + 50vw - 50%)' }}>
                <div className="w-full h-64 sm:h-72 lg:h-[420px] relative overflow-hidden shadow-card hover:shadow-brand transition-all duration-300 lg:rounded-tr-2xl lg:rounded-br-2xl">
                {(() => {
                  const currentPackage = getCurrentPackage();
                  return (
                    <Link
                      to={`/day-out/${currentPackage.slug}`}
                      className="block w-full h-full group"
                      aria-label={`View details for ${currentPackage.title} day out package`}
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
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-6 sm:p-8 text-white">
                        <div className="max-w-2xl text-center">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 drop-shadow-lg transition-colors duration-300" style={{ ['--hover-color' as string]: 'hsl(345 50% 85%)' } as React.CSSProperties}>
                            {currentPackage.title}
                          </h3>
                          {/* Show description only if configured to show */}
                          {currentPackage.showDescription && (
                            <p className="text-base sm:text-lg text-white/90 mb-4 drop-shadow-md">
                              {currentPackage.description}
                            </p>
                          )}
                          {/* Show explore button only if configured to show */}
                          {currentPackage.showExploreButton && (
                            <Button
                              variant="default"
                              className="text-white font-medium px-6 py-2 rounded-lg transition-all"
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
                      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {currentIndex + 1} of {totalPages}
                      </div>
                    </Link>
                  );
                })()}
                </div>
              </div>

              {/* Banner Slideshow Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {dayOutPackages.map((pkg, index) => (
                  <button
                    key={pkg.id}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex ? 'bg-gray-400 scale-110' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to ${pkg.title} package`}
                    title={pkg.title}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Enquiry Form (30% on desktop) */}
            <div className="lg:w-[30%] mt-8 lg:mt-0">
            {/* Form card */}
            <Card className="border shadow-none transition-all duration-300 w-full max-w-xs rounded-xl" style={{ borderColor: 'hsl(345 50% 85% / 0.3)', background: 'linear-gradient(180deg, hsl(345 50% 90% / 0.15), hsl(345 50% 90% / 0.08))' }}>
              <CardHeader className="pb-1">
                <CardTitle className="text-sm md:text-base font-bold text-black flex items-center gap-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                  <User className="h-3 w-3 text-black/60" />
                  Day Out Enquiry
                </CardTitle>
              </CardHeader>
              <CardContent className="px-2 py-2" style={{ backdropFilter: 'blur(4px)', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
                <form onSubmit={handleFormSubmit} className="space-y-1.5">
                  {/* Name Field */}
                  <div className="space-y-0.5">
                    <Label htmlFor="dayOut-name" className="text-[10px] font-medium text-black">
                      Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-black/60" />
                      <Input
                        id="dayOut-name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-6 h-8 text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile No (WhatsApp) Field */}
                  <div className="space-y-0.5">
                    <Label htmlFor="dayOut-mobile" className="text-[10px] font-medium text-black">
                      Mobile No (Whatsapp) *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-black/60" />
                      <Input
                        id="dayOut-mobile"
                        type="tel"
                        placeholder={formConfig.phoneFieldPlaceholder || "Enter your whatsapp number"}
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                        className="pl-6 h-8 text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                        required
                      />
                    </div>
                  </div>

                  {/* Date Field */}
                  <div className="space-y-0.5">
                    <Label htmlFor="dayOut-date" className="text-[10px] font-medium text-black">
                      Preferred Date *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-black/60" />
                      <Input
                        id="dayOut-date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="pl-6 h-8 text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                        required
                      />
                    </div>
                  </div>

                  {/* Number of People Field */}
                  <div className="space-y-0.5">
                    <Label htmlFor="dayOut-people" className="text-[10px] font-medium text-black">
                      Number of People *
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-black/60" />
                      <Input
                        id="dayOut-people"
                        type="number"
                        min="1"
                        placeholder="e.g., 2"
                        value={formData.numberOfPeople}
                        onChange={(e) => handleInputChange("numberOfPeople", e.target.value)}
                        className="pl-6 h-8 text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                        required
                      />
                    </div>
                  </div>

                  {/* Destination Field */}
                  <div className="space-y-0.5">
                    <Label htmlFor="dayOut-destination" className="text-[10px] font-medium text-black">
                      {formConfig.destinationFieldLabel} *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-black/60" />
                      <Input
                        id="dayOut-destination"
                        type="text"
                        placeholder="Backwater, Beach, Hill Station..."
                        value={formData.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                        className="pl-6 h-8 text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <Button
                      type="submit"
                      className="w-full hover:shadow-brand transition-all duration-300 h-9 text-[12px] font-bold"
                      style={{ background: 'hsl(var(--success))', color: 'hsl(var(--button-primary-foreground))' }}
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