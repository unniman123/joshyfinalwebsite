import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, User, Calendar, Phone, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import keralaTourCard from "@/assets/kerala-tour-card.jpg";
import heroRajasthanPalace from "@/assets/hero-rajasthan-palace.jpg";
import heroAyurvedaSpa from "@/assets/hero-ayurveda-spa.jpg";
import goldenTriangleTourCard from "@/assets/tour-golden-triangle.jpg";

// Enhanced tour card interface with descriptions
interface TourOffer {
  id: number;
  title: string;
  image: string;
  slug: string;
  description: string; // 2-line description for card display
}

const TourOffersSection = () => {
  const tourOffers: TourOffer[] = [
    {
      id: 1,
      title: "Kerala Backwaters",
      image: keralaTourCard,
      slug: "kerala-backwaters-explorer",
      description: "Experience the serene beauty of Kerala's famous backwaters with traditional houseboat stays"
    },
    {
      id: 2,
      title: "Rajasthan Royal",
      image: heroRajasthanPalace,
      slug: "royal-rajasthan-heritage",
      description: "Journey through magnificent palaces, historic forts, and vibrant markets in the land of maharajas"
    },
    {
      id: 3,
      title: "Ayurveda Wellness",
      image: heroAyurvedaSpa,
      slug: "ayurveda-wellness-retreat",
      description: "Rejuvenate your body and mind with authentic Ayurvedic treatments in peaceful Kerala settings"
    },
    {
      id: 4,
      title: "Golden Triangle",
      image: goldenTriangleTourCard,
      slug: "golden-triangle-classic",
      description: "Discover India's most iconic destinations: Delhi, Agra, and Jaipur in this comprehensive tour"
    },
    {
      id: 5,
      title: "Kerala Heritage",
      image: keralaTourCard,
      slug: "kerala-heritage-explorer",
      description: "Explore Kerala's rich cultural heritage, ancient temples, and traditional art forms"
    },
    {
      id: 6,
      title: "Goa Beach Paradise",
      image: heroAyurvedaSpa,
      slug: "goa-beach-paradise",
      description: "Relax on pristine beaches, enjoy water sports, and experience Goa's vibrant nightlife"
    }
  ];

  // Carousel state management
  const [currentIndex, setCurrentIndex] = useState(0);
  const toursPerPage = 3;
  const totalPages = Math.ceil(tourOffers.length / toursPerPage);

  // Inquiry form state
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    date: "",
    destination: "",
    specialComments: ""
  });

  // Carousel navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get current tours to display
  const getCurrentTours = () => {
    const startIndex = currentIndex * toursPerPage;
    return tourOffers.slice(startIndex, startIndex + toursPerPage);
  };

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      mobileNo: "",
      date: "",
      destination: "",
      specialComments: ""
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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Top Selling Packages
          </h2>
          <div className="w-24 h-1 bg-gradient-golden mx-auto mb-6"></div>
        </div>

        {/* Two-Column Layout: 75% Carousel + 25% Inquiry Form */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
          {/* Left Column - Tour Carousel (75% on desktop) */}
          <div className="flex-1 lg:w-[75%]">
            <div className="relative px-12">
              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-golden/20 hover:bg-golden hover:text-white shadow-lg"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                aria-label="Previous tours"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-golden/20 hover:bg-golden hover:text-white shadow-lg"
                onClick={goToNext}
                disabled={currentIndex === totalPages - 1}
                aria-label="Next tours"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Tour Cards Carousel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300">
                {getCurrentTours().map((tour) => (
                  <Link
                    key={tour.id}
                    to={`/tours/${tour.slug}`}
                    className="group bg-card border border-border rounded-lg shadow-card hover:shadow-warm focus:shadow-warm focus:ring-2 focus:ring-golden focus:ring-offset-2 transition-[box-shadow,transform] duration-300 overflow-hidden hover:scale-[1.02] focus:scale-[1.02]"
                    aria-label={`View details for ${tour.title} tour`}
                  >
                    {/* Image Area */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white text-sm font-semibold text-center px-2">
                          {tour.title}
                        </h3>
                      </div>
                    </div>

                    {/* Information Area */}
                    <div className="p-3 sm:p-4 space-y-2">
                      {/* Tour Title */}
                      <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight">
                        {tour.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {tour.description}
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

          {/* Right Column - Inquiry Form (25% on desktop) */}
          <div className="lg:w-[25%] mt-8 lg:mt-0">
            {/* Form card with height matching tour cards */}
            <Card className="shadow-warm h-full flex flex-col form-card-height">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-golden" />
                  Quick Inquiry
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col px-4">
                <form onSubmit={handleFormSubmit} className="space-y-2.5 flex-1">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                      Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground" />
                      <Input
                        id="name"
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
                    <Label htmlFor="mobile" className="text-xs font-medium text-muted-foreground">
                      Mobile No (WhatsApp) *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground" />
                      <Input
                        id="mobile"
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
                    <Label htmlFor="date" className="text-xs font-medium text-muted-foreground">
                      Travel Date *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground" />
                      <Input
                        id="date"
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
                    <Label htmlFor="destination" className="text-xs font-medium text-muted-foreground">
                      Destination *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground" />
                      <Input
                        id="destination"
                        type="text"
                        placeholder="Kerala, Rajasthan..."
                        value={formData.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                        className="pl-7 h-7 text-xs"
                        required
                      />
                    </div>
                  </div>

                  {/* Special Comments Field */}
                  <div className="space-y-1">
                    <Label htmlFor="comments" className="text-xs font-medium text-muted-foreground">
                      Special Comments
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground" />
                      <Input
                        id="comments"
                        type="text"
                        placeholder="Special requirements..."
                        value={formData.specialComments}
                        onChange={(e) => handleInputChange("specialComments", e.target.value)}
                        className="pl-7 h-7 text-xs"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-golden hover:shadow-golden transition-all duration-300 h-8 text-xs"
                    >
                      Submit
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

export default TourOffersSection;
