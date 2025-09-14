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
  sectionTitle = "Day Out Packages",
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

        {/* Two-Column Layout: 70% Packages + 30% Enquiry Form */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
          {/* Left Column - Day Out Packages Carousel (70% on desktop) */}
          <div className="flex-1 lg:w-[70%]">
            <div className="relative">
              {/* Day Out Package Banner Slideshow */}
              <div className="w-full h-64 sm:h-72 lg:h-80 relative overflow-hidden rounded-lg border-2 border-brand-green/30 hover:border-brand-green/50 shadow-card hover:shadow-brand-green/20 transition-all duration-300">
                {(() => {
                  const currentPackage = getCurrentPackage();
                  return (
                    <Link
                      to={`/day-out/${currentPackage.slug}`}
                      className="block w-full h-full group"
                      aria-label={`View details for ${currentPackage.title} day out package`}
                    >
                      {/* Banner Background Image - pale red background limited to the banner area */}
                      <div className="absolute inset-0 bg-dayOutImage flex items-center justify-center p-3">
                        <div className="relative w-full h-full rounded-md overflow-hidden">
                          <img
                            src={currentPackage.image}
                            alt={currentPackage.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Banner Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-center items-start p-6 sm:p-8 lg:p-12 text-white">
                        <div className="max-w-2xl">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 drop-shadow-lg group-hover:text-brand-green-light transition-colors duration-300">
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
                              className="bg-brand-green hover:bg-brand-green-dark text-white font-medium px-6 py-2 rounded-lg"
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

              {/* Banner Slideshow Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {dayOutPackages.map((pkg, index) => (
                  <button
                    key={pkg.id}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex ? 'bg-brand-green scale-110' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
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
            <Card className="border-2 border-brand-green/30 hover:border-brand-green/50 shadow-warm hover:shadow-brand-green/20 transition-all duration-300 w-full max-w-xs">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <User className="h-3 w-3 text-brand-green" />
                  Day Out Enquiry
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3">
                <form onSubmit={handleFormSubmit} className="space-y-1.5">
                  {/* Name Field */}
                  <div className="space-y-0.5">
                    <Label htmlFor="dayOut-name" className="text-[10px] font-medium text-muted-foreground">
                      Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground" />
                      <Input
                        id="dayOut-name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-6 h-6 text-[10px]"
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile No (WhatsApp) Field */}
                  <div className="space-y-0.5">
                    <Label htmlFor="dayOut-mobile" className="text-[10px] font-medium text-muted-foreground">
                      Mobile No (Whatsapp) *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground" />
                      <Input
                        id="dayOut-mobile"
                        type="tel"
                        placeholder={formConfig.phoneFieldPlaceholder || "+91 98765 43210"}
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                        className="pl-6 h-6 text-[10px]"
                        required
                      />
                    </div>
                  </div>

                  {/* Date Field */}
                  <div className="space-y-0.5">
                    <Label htmlFor="dayOut-date" className="text-[10px] font-medium text-muted-foreground">
                      Preferred Date *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground" />
                      <Input
                        id="dayOut-date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="pl-6 h-6 text-[10px]"
                        required
                      />
                    </div>
                  </div>

                  {/* Number of People Field */}
                  <div className="space-y-0.5">
                    <Label htmlFor="dayOut-people" className="text-[10px] font-medium text-muted-foreground">
                      Number of People *
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground" />
                      <Input
                        id="dayOut-people"
                        type="number"
                        min="1"
                        placeholder="e.g., 2"
                        value={formData.numberOfPeople}
                        onChange={(e) => handleInputChange("numberOfPeople", e.target.value)}
                        className="pl-6 h-6 text-[10px]"
                        required
                      />
                    </div>
                  </div>

                  {/* Destination Field */}
                  <div className="space-y-0.5">
                    <Label htmlFor="dayOut-destination" className="text-[10px] font-medium text-muted-foreground">
                      {formConfig.destinationFieldLabel} *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground" />
                      <Input
                        id="dayOut-destination"
                        type="text"
                        placeholder="Backwater, Beach, Hill Station..."
                        value={formData.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                        className="pl-6 h-6 text-[10px]"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-brand hover:shadow-brand transition-all duration-300"
                    >
                      Send Enquiry
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