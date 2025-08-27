import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import DestinationsGrid from "@/components/DestinationsGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllDestinations, DestinationSummary } from "@/lib/api";

const TopDestinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState<DestinationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("");

  // Set search query and state from URL parameters
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const stateParam = searchParams.get('state');

    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
    if (stateParam) {
      setSelectedState(stateParam);
    }
  }, [searchParams]);

  // Fetch all destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const destinationsData = await getAllDestinations();
        setDestinations(destinationsData);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        // TODO: Add proper error handling with toast notifications
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Filter destinations based on search query and selected state
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState = !selectedState ||
      destination.state.toLowerCase().includes(selectedState.toLowerCase());

    return matchesSearch && matchesState;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (searchQuery.trim()) {
      newParams.set('search', searchQuery.trim());
    }
    if (selectedState) {
      newParams.set('state', selectedState);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-center">
              100 Top Destinations of India
            </h1>
            <div className="w-24 h-1 bg-gradient-golden mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {selectedState ?
                `Discover the most incredible destinations in ${selectedState} - from historic monuments to natural wonders, explore the diversity and beauty of India.` :
                searchQuery ?
                  `Showing destinations matching "${searchQuery}"` :
                  'Discover the most incredible destinations across India - from snow-capped mountains to pristine beaches, from ancient temples to bustling cities. Explore the diversity and beauty of our incredible nation.'
              }
            </p>
          </div>
        </div>
      </section>

      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <form onSubmit={handleSearch}>
              <div className="relative flex items-center">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                <Input
                  type="text"
                  placeholder="Search destinations by name, state, or region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-32 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  type="submit"
                  variant="cta"
                  className="absolute right-2 h-12 px-6"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="space-y-8">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-muted-foreground text-lg">
                  {loading ? (
                    "Loading destinations..."
                  ) : (
                    `${filteredDestinations.length} destination${filteredDestinations.length !== 1 ? 's' : ''} found`
                  )}
                </p>
              </div>
            </div>

            {/* Destinations Grid */}
            <DestinationsGrid destinations={filteredDestinations} loading={loading} />

            {/* Load More Button */}
            {!loading && filteredDestinations.length > 0 && (
              <div className="text-center pt-12">
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Load More Destinations
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TopDestinations;