import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ToursGrid from "@/components/ToursGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { getAllTours, TourSummary, unifiedSearch } from "@/lib/api";

const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState<TourSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [destinationResultsCount, setDestinationResultsCount] = useState<number>(0);

  // Set search query and category from URL parameters
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    const hasDestinationsParam = searchParams.get('hasDestinations');
    
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
      
      // If search has destinations flag, check for destination results
      if (hasDestinationsParam === 'true') {
        unifiedSearch(decodeURIComponent(searchParam)).then(results => {
          setDestinationResultsCount(results.destinations.length);
        });
      }
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    const subParam = searchParams.get('subcategory');
    if (subParam) setSelectedSubcategory(subParam);
  }, [searchParams]);

  // TODO: Fetch all tours from Supabase and pass to components
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const toursData = await getAllTours();
        setTours(toursData);
      } catch (error) {
        console.error("Error fetching tours:", error);
        // TODO: Add proper error handling with toast notifications
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Filter tours based on search query and selected category
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ((tour.category || '') + ' ' + (tour.categories || []).join(' ')).toLowerCase().includes(searchQuery.toLowerCase());

    // Skip Ayurveda category if it's selected
    if (selectedCategory === 'ayurveda') {
      return false;
    }

    // Category matching (robust): check categories array, legacy category field, and partial matches
    const catKey = selectedCategory ? selectedCategory.replace('-', ' ').toLowerCase() : '';
    const matchesCategory = !selectedCategory || (
      (tour.categories || []).some(c => c.toLowerCase().includes(catKey)) ||
      (tour.category || '').toLowerCase().includes(catKey)
    );

    // Subcategory matching (if present): prefer tour.subcategories exact slug match, fallback to title/desc/slug
    let matchesSubcategory = true;
    if (selectedSubcategory) {
      const subKey = selectedSubcategory.toLowerCase();
      matchesSubcategory = !!(
        (tour.subcategories || []).some(s => s.toLowerCase() === subKey) ||
        (tour.slug && tour.slug.toLowerCase().includes(subKey)) ||
        (tour.title && tour.title.toLowerCase().includes(subKey)) ||
        (tour.description && tour.description.toLowerCase().includes(subKey))
      );
    }

    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (searchQuery.trim()) {
      newParams.set('search', searchQuery.trim());
    }
    if (selectedCategory) {
      newParams.set('category', selectedCategory);
    }
    setSearchParams(newParams);
  };

  // Determine page title based on current view
  const getPageTitle = () => {
    if (selectedCategory) {
      // Normalize special category display names
      if (selectedCategory === 'discover-india') return 'Discover India Tours - Kerala Tours Global';
      if (selectedCategory === 'kerala') return 'Kerala Travels - Kerala Tours Global';
      if (selectedCategory === 'global') return 'Global Holidays - Kerala Tours Global';

      return `${selectedCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Tours - Kerala Tours Global`;
    }
    if (searchQuery) {
      return `Search Results for "${searchQuery}" - Kerala Tours Global`;
    }
    return 'Explore Our Tours - Kerala Tours Global';
  };

  // Determine page description based on current view
  const getPageDescription = () => {
    if (selectedCategory) {
      if (selectedCategory === 'discover-india') return 'Discover incredible journeys across India. From serene backwaters to majestic palaces, find your perfect adventure.';
      if (selectedCategory === 'kerala') return 'Explore Kerala Travels experiences including backwaters, hill stations, and cultural tours.';
      if (selectedCategory === 'global') return 'Explore our Global Holidays and international tour packages curated for every traveler.';

      return `Explore amazing ${selectedCategory.replace('-', ' ')} experiences and create unforgettable memories.`;
    }
    if (searchQuery) {
      return `Showing tour results for "${searchQuery}". Discover the best travel experiences across India and beyond.`;
    }
    return 'Discover incredible journeys across India and beyond. From serene backwaters to majestic palaces, find your perfect adventure.';
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <link rel="icon" type="image/png" href="/logo-header.png" />
      </Helmet>
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {selectedCategory ?
                selectedCategory === 'discover-india' ?
                  'Discover India' :
                selectedCategory === 'kerala' ?
                  'Kerala Travels' :
                selectedCategory === 'global' ?
                  'Global Holidays' :
                  `${selectedCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Tours` :
                searchQuery ?
                'Search Results' :
                'Explore Our Tours'
              }
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {selectedCategory ?
                selectedCategory === 'discover-india' ?
                  '' :
                  `Discover amazing ${selectedCategory.replace('-', ' ')} experiences and create unforgettable memories.` :
                searchQuery ?
                `Showing results for "${searchQuery}"` :
                'Discover incredible journeys across India and beyond. From serene backwaters to majestic palaces, find your perfect adventure.'
              }
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch}>
              <div className="relative flex items-center">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                <Input
                  type="text"
                  placeholder="Search tours by destination, activity, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-32 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  type="submit"
                  className="absolute right-2 h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Alert for destination results */}
          {destinationResultsCount > 0 && searchQuery && (
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900 font-medium mb-1">
                    Also found {destinationResultsCount} destination{destinationResultsCount !== 1 ? 's' : ''} in "100 Beautiful places in India"
                  </p>
                  <Link
                    to={`/top-destinations?search=${encodeURIComponent(searchQuery)}`}
                    className="text-sm text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    View destination results →
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
                    "Loading tours..."
                  ) : (
                    `${filteredTours.length} tour${filteredTours.length !== 1 ? 's' : ''} found`
                  )}
                </p>
              </div>
            </div>

            {/* Tours Grid */}
            <ToursGrid tours={filteredTours} loading={loading} />

            {/* Load More Button */}
            {!loading && filteredTours.length > 0 && (
              <div className="text-center pt-12">
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Load More Tours
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

export default Tours;