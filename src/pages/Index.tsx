import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import TourOffersSection from "@/components/TourOffersSection";
import AboutUsSection from "@/components/AboutUsSection";
import DayOutPackagesSection from "@/components/DayOutPackagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>KeralaToursGlobal - Kerala Travels | Discover India | Panchakarma Treatment Holidays | Global Holidays</title>
        <meta name="description" content="Here you can find holiday packages (Itineraries) with beautiful pictures of concerned destinations and the contents mainly promoting Kerala & India Tours." />
        <link rel="icon" type="image/png" href="/logo-header.png" />
      </Helmet>
      <Header />
      <HeroBanner />
      <TourOffersSection />
      {/* AboutUsSection positioned after tour offers */}
      <div id="about">
        <AboutUsSection />
      </div>
      {/* Kerala Day Out Packages Section positioned after about us */}
      <DayOutPackagesSection />
      {/* Customer Testimonials Section */}
      <TestimonialsSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;