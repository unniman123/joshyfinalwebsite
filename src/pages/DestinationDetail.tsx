import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getDestinationBySlug, Destination } from "@/lib/api";

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      if (!slug) {
        setError("Destination not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const destinationData = await getDestinationBySlug(slug);
        if (destinationData) {
          setDestination(destinationData);
        } else {
          setError("Destination not found");
        }
      } catch (err) {
        console.error("Error fetching destination:", err);
        setError("Failed to load destination details");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading destination details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Destination Not Found</h2>
            <p className="text-muted-foreground">The destination you're looking for doesn't exist or has been removed.</p>
            <Link to="/top-destinations">
              <Button className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Top Destinations
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={destination.image}
            alt={destination.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {destination.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{destination.state}, {destination.region}</span>
              </div>
              {destination.bestTimeToVisit && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Best time: {destination.bestTimeToVisit}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/top-destinations">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Top Destinations
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Section */}
              <Card className="border-2 border-golden/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">About {destination.title}</CardTitle>
                  <div className="w-24 h-1 bg-gradient-golden mx-auto"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {destination.shortDescription}
                  </p>
                  <p className="leading-relaxed">
                    {destination.detailDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Famous For Section */}
              {destination.famousFor && destination.famousFor.length > 0 && (
                <Card className="border-2 border-golden/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-center">Famous For</CardTitle>
                    <div className="w-16 h-1 bg-gradient-golden mx-auto"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {destination.famousFor.map((item, index) => (
                        <Badge 
                          key={index}
                          className="bg-golden/10 text-golden border-golden/50 px-3 py-1"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <Card className="border-2 border-golden/30">
                <CardHeader>
                  <CardTitle className="text-xl text-center">Quick Facts</CardTitle>
                  <div className="w-16 h-1 bg-gradient-golden mx-auto"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">State</h4>
                    <p className="text-muted-foreground">{destination.state}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Region</h4>
                    <p className="text-muted-foreground">{destination.region}</p>
                  </div>
                  {destination.bestTimeToVisit && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Best Time to Visit</h4>
                      <p className="text-muted-foreground">{destination.bestTimeToVisit}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="border-2 border-golden/30 bg-gradient-to-b from-golden/5 to-background">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-3">Plan Your Visit</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ready to explore {destination.title}? Contact us to plan your perfect trip.
                  </p>
                  <Link to="/contact">
                    <Button className="w-full">
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default DestinationDetail;