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
      <Header />
      <HeroBanner />
      <TourOffersSection />
      {/* AboutUsSection positioned after tour offers */}
      <div id="about">
        <AboutUsSection />
      </div>
      {/* Day Out Packages Section positioned after about us */}
      <DayOutPackagesSection />
      {/* Customer Testimonials Section */}
      <TestimonialsSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
