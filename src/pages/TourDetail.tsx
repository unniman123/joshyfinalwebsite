import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTourBySlug, Tour } from "@/lib/api";
import TourContentSections from "@/components/TourContentSections";
import EnquiryForm from "@/components/InquiryForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Helmet } from "react-helmet-async";

const TourDetail = () => {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourData = async () => {
      if (slug) {
        const tourData = await getTourBySlug(slug);
        setTour(tourData);
      }
      setLoading(false);
    };
    fetchTourData();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>;
  }

  if (!tour) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Tour Not Found</h1>
        <p className="text-muted-foreground mt-2">The requested tour could not be found.</p>
      </div>
    </div>;
  }

  return <div className="min-h-screen bg-background">
    <Helmet>
      <title>{tour.title} | Kerala Tours Global</title>
      <meta name="description" content={tour.description} />
      <link rel="icon" type="image/png" href="/logo-header.png" />
    </Helmet>

    <Header />
    <main>
      <TourContentSections tour={tour} />

      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-4 underline">Enquire</h2>

          </div>
          <EnquiryForm tourId={tour.id} />
        </div>
      </section>
    </main>
    <Footer />
    <WhatsAppFloat />
  </div>;
};

export default TourDetail;