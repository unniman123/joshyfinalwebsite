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
      <title>{tour.title} - KeralaToursGlobal - Kerala Travels | Discover India | Panchakarma Treatment Holidays | Global Holidays</title>
      <meta name="description" content={tour.description} />
      <link rel="icon" type="image/png" href="/logo-header.png" />
    </Helmet>

    <Header />
    <main>
      <TourContentSections tour={tour} />

      <section id="enquiry-section" className="pt-2 pb-3 px-2 md:pt-3 md:pb-4 md:px-4 bg-muted/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-3 md:mb-4">
            {/* Title panel styled as a pill to match booking CTA */}
            <div className="flex items-center justify-center">
              <div
                className="inline-block rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center justify-center shadow-warm"
                style={{ background: 'linear-gradient(90deg, #f07f71 0%, #ff6b6b 100%)', color: '#ffffff' }}
              >
                <h2 className="text-sm md:text-base lg:text-lg font-semibold leading-none tracking-wide">
                  Enquire
                </h2>
              </div>
            </div>
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