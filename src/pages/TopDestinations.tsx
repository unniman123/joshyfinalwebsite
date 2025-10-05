import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import DestinationsGrid from "@/components/DestinationsGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package } from "lucide-react";
import { getAllDestinations, DestinationSummary, unifiedSearch } from "@/lib/api";

const TopDestinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState<DestinationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [tourResultsCount, setTourResultsCount] = useState<number>(0);

  // Set search query and state from URL parameters
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const stateParam = searchParams.get('state');

    if (searchParam) {
      const decodedSearch = decodeURIComponent(searchParam);
      setSearchQuery(decodedSearch);
      
      // Check if there are also tour results for this search
      unifiedSearch(decodedSearch).then(results => {
        setTourResultsCount(results.tours.length);
      });
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
      <section className="bg-gradient-to-b from-primary/5 to-background py-6 md:py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-center">
              100 Beautiful places in India
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

      <main className="py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
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

          {/* Alert for tour results */}
          {tourResultsCount > 0 && searchQuery && (
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <Package className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-green-900 font-medium mb-1">
                    Also found {tourResultsCount} tour package{tourResultsCount !== 1 ? 's' : ''} matching your search
                  </p>
                  <Link
                    to={`/tours?search=${encodeURIComponent(searchQuery)}`}
                    className="text-sm text-green-600 hover:text-green-800 font-semibold underline"
                  >
                    View tour packages →
                  </Link>
                </div>
              </div>
            </div>
          )}

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