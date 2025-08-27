import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ToursGrid from "@/components/ToursGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllTours, TourSummary } from "@/lib/api";

const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState<TourSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Set search query and category from URL parameters
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
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
      tour.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Skip Ayurveda category if it's selected
    if (selectedCategory === 'ayurveda') {
      return false;
    }

    const matchesCategory = !selectedCategory ||
      tour.category.toLowerCase().includes(selectedCategory.replace('-', ' ').toLowerCase());

    return matchesSearch && matchesCategory;
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {selectedCategory ?
                selectedCategory === 'discover-india' ?
                  'Discover India' :
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
          <div className="max-w-2xl mx-auto mb-16">
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
