import React from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import TourOffersSection from "@/components/TourOffersSection";
import AboutUsSection from "@/components/AboutUsSection";
import DayOutPackagesSection from "@/components/DayOutPackagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import HomepageAdminProvider, { 
  AdminControllableSection,
  useHomepageAdmin,
  applyAdminConfig 
} from "@/components/AdminHomepageProvider";
import { getCurrentHomepageConfig } from "@/lib/admin-utils";

// Enhanced HeroBanner that responds to admin configuration
const AdminAwareHeroBanner: React.FC = () => {
  const { config } = useHomepageAdmin();
  
  // Apply admin configuration to component
  const adminProps = applyAdminConfig.heroBanner(config.heroBanner);
  
  return (
    <AdminControllableSection
      sectionKey="heroBanner"
      title="Hero Banner"
    >
      <HeroBanner 
        // Pass admin-controlled props that reflect the homepage changes
        title={adminProps.title}
        subtitle={adminProps.subtitle}
        searchPlaceholder={adminProps.searchPlaceholder}
        // Apply search button color changes (bg-blue-600 hover:bg-blue-700)
        searchButtonClassName={adminProps.searchButtonClassName}
        // Apply positioning changes (pt-8)
        className={adminProps.overlayClassName}
      />
    </AdminControllableSection>
  );
};

// Enhanced TourOffersSection with admin controls
const AdminAwareTourOffersSection: React.FC = () => {
  const { config } = useHomepageAdmin();
  
  const adminProps = applyAdminConfig.tourOffers(config.tourOffers);
  
  return (
    <AdminControllableSection
      sectionKey="tourOffers"
      title="Tour Offers"
    >
      <TourOffersSection 
        // Pass admin-controlled props that reflect the form changes
        sectionTitle={adminProps.sectionTitle}
        showInquiryForm={adminProps.showInquiryForm}
        // Form config with message field enabled, date/destination disabled
        formConfig={adminProps.formConfig}
      />
    </AdminControllableSection>
  );
};

// Enhanced DayOutPackagesSection with admin controls
const AdminAwareDayOutPackagesSection: React.FC = () => {
  const { config } = useHomepageAdmin();
  
  const adminProps = applyAdminConfig.dayOutPackages(config.dayOutPackages);
  
  return (
    <AdminControllableSection
      sectionKey="dayOutPackages"
      title="Day Out Packages"
    >
      <DayOutPackagesSection 
        // Pass admin-controlled props that reflect the changes
        sectionTitle={adminProps.sectionTitle}
        // Packages with description/explore button disabled
        packages={adminProps.packages}
        // Form config with empty phone placeholder and "Destination" label
        formConfig={adminProps.formConfig}
      />
    </AdminControllableSection>
  );
};

// Admin-integrated homepage demonstrating the infrastructure
const AdminIndex: React.FC = () => {
  // Get current homepage configuration (reflects all the changes made)
  const homepageConfig = getCurrentHomepageConfig();
  
  return (
    <HomepageAdminProvider 
      config={homepageConfig}
      isAdminMode={false} // Set to true for admin panel mode
    >
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Admin-controllable Hero Banner with search button color/positioning changes */}
        <AdminAwareHeroBanner />
        
        {/* Admin-controllable Tour Offers with form field changes (message field enabled) */}
        <AdminAwareTourOffersSection />
        
        {/* AboutUsSection (not admin-controlled in current implementation) */}
        <div id="about">
          <AboutUsSection />
        </div>
        
        {/* Admin-controllable Day Out Packages with button/description removal and form changes */}
        <AdminAwareDayOutPackagesSection />
        
        {/* Customer Testimonials Section (not admin-controlled) */}
        <TestimonialsSection />
        
        <Footer />
        <WhatsAppFloat />
      </div>
    </HomepageAdminProvider>
  );
};

export default AdminIndex;

// Usage example in main App.tsx or admin routes:
/*
// For public site (admin mode off)
<Route path="/admin-demo" element={<AdminIndex />} />

// For admin panel (admin mode on)
<HomepageAdminProvider isAdminMode={true}>
  <AdminIndex />
</HomepageAdminProvider>
*/