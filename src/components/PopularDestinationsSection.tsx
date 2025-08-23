import DestinationCard from "@/components/DestinationCard";
import { Destination } from "@/lib/types/destinations";
import { cn } from "@/lib/utils";

// Import existing assets that best represent the destinations
import keralaTourCard from "@/assets/kerala-tour-card.jpg";
import heroKeralBackwaters from "@/assets/hero-kerala-backwaters.jpg";
import galleryKerala1 from "@/assets/gallery-kerala-1.jpg";
import galleryKerala2 from "@/assets/gallery-kerala-2.jpg";

interface PopularDestinationsSectionProps {
  className?: string;
}

const PopularDestinationsSection = ({ className }: PopularDestinationsSectionProps) => {
  // Static destination data based on the image provided
  const destinations: Destination[] = [
    {
      id: 1,
      name: "Thattekad Bird Sanctuary",
      image: galleryKerala1, // Using available Kerala asset
      slug: "thattekad-bird-sanctuary",
      description: "A paradise for bird watchers with diverse avian species"
    },
    {
      id: 2,
      name: "Bekal Fort",
      image: keralaTourCard, // Using available Kerala asset
      slug: "bekal-fort",
      description: "Historic coastal fort with stunning Arabian Sea views"
    },
    {
      id: 3,
      name: "Periyar Tiger Reserve",
      image: galleryKerala2, // Using available Kerala asset
      slug: "periyar-tiger-reserve",
      description: "Wildlife sanctuary famous for tigers and elephant herds"
    },
    {
      id: 4,
      name: "Kumarakom",
      image: heroKeralBackwaters, // Using backwaters image for Kumarakom
      slug: "kumarakom",
      description: "Serene backwater destination with luxury houseboats"
    }
  ];

  return (
    <section
      className={cn("py-12 bg-background", className)}
      aria-labelledby="popular-destinations-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            id="popular-destinations-heading"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Popular Destinations
          </h2>
          <div className="w-24 h-1 bg-gradient-golden mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most sought-after destinations in Kerala and South India, each offering unique experiences and unforgettable memories.
          </p>
        </div>

        {/* Destinations Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          role="grid"
          aria-label="Popular destinations in Kerala and South India"
        >
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsSection;