import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users } from "lucide-react";
import keralaTourCard from "@/assets/kerala-tour-card.jpg";
const KeralaToursSection = () => {
  const keralaTours = [{
    id: 1,
    title: "Backwater Bliss",
    description: "3 Days of houseboat cruising through Alleppey's pristine backwaters",
    image: keralaTourCard,
    duration: "3 Days",
    groupSize: "2-8 People"
  }, {
    id: 2,
    title: "Hill Station Escape",
    description: "Explore Munnar's tea gardens and misty mountains",
    image: keralaTourCard,
    duration: "4 Days",
    groupSize: "2-12 People"
  }, {
    id: 3,
    title: "Spice Route Journey",
    description: "Discover Thekkady's wildlife and spice plantations",
    image: keralaTourCard,
    duration: "5 Days",
    groupSize: "2-10 People"
  }, {
    id: 4,
    title: "Beach Paradise",
    description: "Relax on Kovalam's golden beaches and coastal charm",
    image: keralaTourCard,
    duration: "3 Days",
    groupSize: "2-6 People"
  }, {
    id: 5,
    title: "Cultural Heritage",
    description: "Experience Kochi's historic sites and traditional arts",
    image: keralaTourCard,
    duration: "2 Days",
    groupSize: "2-15 People"
  }, {
    id: 6,
    title: "Complete Kerala",
    description: "Comprehensive tour covering all major Kerala destinations",
    image: keralaTourCard,
    duration: "12 Days",
    groupSize: "2-8 People"
  }];
  return <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kerala Tours
          </h2>
          <div className="w-24 h-1 bg-gradient-golden mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the enchanting beauty of Kerala through our specially curated tour packages. Each tour is designed to give you an authentic experience of God's Own Country.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {keralaTours.map((tour, index) => <Card key={tour.id} className="group overflow-hidden hover:shadow-card transition-smooth cursor-pointer animate-fade-in" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              {/* Tour Image */}
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden h-48">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Tour Name and Duration Overlay */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{tour.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span>{tour.duration}</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Button */}
                  <div className="absolute inset-0 bg-golden/80 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <Button variant="outline-white" size="sm">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Tour Content */}
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {tour.description}
                </p>
                
                <div className="flex items-center justify-between">
                  
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* View All Tours Button */}
        <div className="text-center mt-12">
          <Button variant="cta" size="lg" className="px-8">
            View All Kerala Tours
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>;
};
export default KeralaToursSection;