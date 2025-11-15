import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ToursGrid from "@/components/ToursGrid";
import { getToursByCategoryAndSubcategory, getAllTours, TourSummary } from "@/lib/api";
import { useLocation } from 'react-router-dom';

interface CategoryPageData {
  id: string;
  name: string;
  slug: string;
  description: string;
  customPageTitle?: string;
  customPageDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  hasCustomPage: boolean;
}

const DynamicCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [tours, setTours] = useState<TourSummary[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Mock category data - replace with actual API call
  const mockCategories: CategoryPageData[] = [
    {
      id: "1",
      name: "Kerala Travels",
      slug: "kerala-tours",
      description: "Explore the serene backwaters and lush landscapes of God's Own Country",
      customPageTitle: "Kerala Travels - Experience God's Own Country",
      customPageDescription: "Discover the enchanting beauty of Kerala through our specially curated tour packages. Experience pristine backwaters, aromatic spice gardens, and rich cultural heritage.",
      seoTitle: "Best Kerala Travels & Packages | Wanderwise",
      seoDescription: "Explore Kerala with our curated tour packages featuring backwaters, hill stations, and cultural experiences. Book your Kerala adventure today!",
      isActive: true,
      hasCustomPage: true
    },
    {
      id: "2",
      name: "Rajasthan Heritage",
      slug: "rajasthan-heritage",
      description: "Journey through royal palaces and magnificent forts",
      customPageTitle: "Rajasthan Heritage Tours - Royal Indian Experience",
      customPageDescription: "Step into the royal world of Rajasthan with our heritage tours. Explore magnificent palaces, imposing forts, and vibrant markets in the land of maharajas.",
      seoTitle: "Rajasthan Heritage Tours | Royal Palace Tours India",
      seoDescription: "Experience royal Rajasthan with our heritage tours covering Jaipur, Udaipur, and Jodhpur. Discover palaces, forts, and rich cultural traditions.",
      isActive: true,
      hasCustomPage: true
    },
    {
      id: "3",
      name: "Golden Triangle",
      slug: "golden-triangle",
      description: "Classic India circuit covering Delhi, Agra, and Jaipur",
      isActive: true,
      hasCustomPage: false
    },
    {
      id: "4",
      name: "Ayurveda Wellness",
      slug: "ayurveda-wellness",
      description: "Rejuvenating wellness retreats with authentic Ayurvedic treatments",
      customPageTitle: "Ayurveda Wellness Retreats - Heal & Rejuvenate",
      customPageDescription: "Discover authentic Ayurvedic healing and rejuvenation with our wellness retreats. Experience traditional treatments in serene natural settings.",
      seoTitle: "Ayurveda Wellness Retreats | Authentic Kerala Spa Tours",
      seoDescription: "Rejuvenate with authentic Ayurvedic treatments and wellness retreats in Kerala. Experience traditional healing in peaceful resort settings.",
      isActive: true,
      hasCustomPage: true
    }
  ];

  const location = useLocation();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);

        // Find category by slug
        const categoryInfo = mockCategories.find(cat => cat.slug === category);

        if (!categoryInfo || !categoryInfo.isActive) {
          setNotFound(true);
          return;
        }

        // If category doesn't have custom page, redirect to general tours page
        if (!categoryInfo.hasCustomPage) {
          setNotFound(true);
          return;
        }

        setCategoryData(categoryInfo);

        // Read optional subcategory from query param
        const params = new URLSearchParams(location.search);
        const subcategory = params.get('subcategory') || undefined;

        // Fetch tours for this category and optional subcategory
        const categoryTours = await getToursByCategoryAndSubcategory(categoryInfo.name.toLowerCase(), subcategory);

        setTours(categoryTours);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryData();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (notFound || !categoryData) {
    return <Navigate to="/tours" replace />;
  }

  const pageTitle = categoryData.customPageTitle || 'KeralaToursGlobal - Kerala Travels | Discover India | Panchakarma Treatment Holidays | Global Holidays';
  const pageDescription = categoryData.customPageDescription || categoryData.description;
  const seoTitle = categoryData.seoTitle || pageTitle;
  const seoDescription = categoryData.seoDescription || pageDescription;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`/category/${category}`} />
      </Helmet>

      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}>
              {pageTitle}
            </h1>
            <div className="w-24 h-1 bg-gradient-golden mx-auto mb-6"></div>
            {pageDescription && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {pageDescription}
              </p>
            )}
          </div>

          {/* Category Stats */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-muted-foreground text-lg">
                  {tours.length} tour{tours.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
          </div>

          {/* Tours Grid */}
          <ToursGrid tours={tours} />

          {/* Empty State */}
          {tours.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">No tours available</h3>
              <p className="text-muted-foreground mb-6">
                We're currently updating our {categoryData.name.toLowerCase()} packages.
                Please check back soon or explore our other tour categories.
              </p>
              <div className="flex justify-center">
                <a
                  href="/tours"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Explore All Tours
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default DynamicCategoryPage;