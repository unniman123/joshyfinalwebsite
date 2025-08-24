import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, User, Calendar, Phone, MapPin } from "lucide-react";
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
}

const DayOutPackagesSection = () => {
  const dayOutPackages: DayOutPackage[] = [
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

  // Carousel state management
  const [currentIndex, setCurrentIndex] = useState(0);
  const packagesPerPage = 3;
  const totalPages = Math.ceil(dayOutPackages.length / packagesPerPage);

  // Inquiry form state
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    date: "",
    destination: ""
  });

  // Carousel navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get current packages to display
  const getCurrentPackages = () => {
    const startIndex = currentIndex * packagesPerPage;
    return dayOutPackages.slice(startIndex, startIndex + packagesPerPage);
  };

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Day Out Package inquiry submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      mobileNo: "",
      date: "",
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
            Day Out Packages
          </h2>
          <div className="w-24 h-1 bg-gradient-golden mx-auto mb-6"></div>
        </div>

        {/* Two-Column Layout: 70% Packages + 30% Inquiry Form */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
          {/* Left Column - Day Out Packages Carousel (70% on desktop) */}
          <div className="flex-1 lg:w-[70%]">
            <div className="relative px-12">
              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/3 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-golden/20 hover:bg-golden hover:text-white shadow-lg"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                aria-label="Previous packages"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-golden/20 hover:bg-golden hover:text-white shadow-lg"
                onClick={goToNext}
                disabled={currentIndex === totalPages - 1}
                aria-label="Next packages"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Day Out Package Cards Carousel - Oval Shaped */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
                {getCurrentPackages().map((pkg) => (
                  <Link
                    key={pkg.id}
                    to={`/day-out/${pkg.slug}`}
                    className="group flex flex-col items-center transition-[transform] duration-300 hover:scale-[1.05] focus:scale-[1.05]"
                    aria-label={`View details for ${pkg.title} day out package`}
                  >
                    {/* Oval Image Area */}
                    <div className="relative w-32 h-40 sm:w-36 sm:h-44 lg:w-40 lg:h-48 overflow-hidden rounded-full shadow-card hover:shadow-warm transition-shadow duration-300 mb-3">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                      {/* Package Name Overlay on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white text-sm sm:text-base font-bold text-center px-3 leading-tight drop-shadow-lg">
                          {pkg.title}
                        </h3>
                      </div>
                    </div>

                    {/* Package Name Below Card */}
                    <div className="text-center">
                      <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight group-hover:text-golden transition-colors duration-300">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 max-w-[160px]">
                        {pkg.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-golden' : 'bg-muted-foreground/30'
                      }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Inquiry Form (30% on desktop) */}
          <div className="lg:w-[30%] mt-8 lg:mt-0">
            {/* Form card */}
            <Card className="shadow-warm w-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-golden" />
                  Day Out Inquiry
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <form onSubmit={handleFormSubmit} className="space-y-2.5">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <Label htmlFor="dayOut-name" className="text-xs font-medium text-muted-foreground">
                      Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground" />
                      <Input
                        id="dayOut-name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-7 h-7 text-xs"
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile No (WhatsApp) Field */}
                  <div className="space-y-1">
                    <Label htmlFor="dayOut-mobile" className="text-xs font-medium text-muted-foreground">
                      Mobile No (WhatsApp) *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground" />
                      <Input
                        id="dayOut-mobile"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                        className="pl-7 h-7 text-xs"
                        required
                      />
                    </div>
                  </div>

                  {/* Date Field */}
                  <div className="space-y-1">
                    <Label htmlFor="dayOut-date" className="text-xs font-medium text-muted-foreground">
                      Preferred Date *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground" />
                      <Input
                        id="dayOut-date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="pl-7 h-7 text-xs"
                        required
                      />
                    </div>
                  </div>

                  {/* Destination Field */}
                  <div className="space-y-1">
                    <Label htmlFor="dayOut-destination" className="text-xs font-medium text-muted-foreground">
                      Preferred Package *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground" />
                      <Input
                        id="dayOut-destination"
                        type="text"
                        placeholder="Backwater, Beach, Hill Station..."
                        value={formData.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                        className="pl-7 h-7 text-xs"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-golden hover:shadow-golden transition-all duration-300 h-8 text-xs"
                    >
                      Submit Inquiry
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