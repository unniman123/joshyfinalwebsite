import { useEffect, useState } from "react";
import { getContactInfo } from "@/lib/api/contact";
import { Helmet } from "react-helmet-async";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    // Scroll to top when component mounts to ensure users start from the title
    window.scrollTo(0, 0);

    // TODO: Fetch contactInfo via getContactInfo()
    const fetchContactInfo = async () => {
      try {
        const info = await getContactInfo();
        setContactInfo(info);
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

  // Loading state with proper skeleton
  if (!contactInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading contact information...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us - KeralaToursGlobal - Kerala Travels | Discover India | Panchakarma Treatment Holidays | Global Holidays</title>
        <meta name="description" content="Get in touch with Kerala Tours Global. Plan your perfect trip to India with our expert travel consultants." />
        <link rel="icon" type="image/png" href="/logo-header.png" />
      </Helmet>
      <Header />

      {/* Simplified Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-6 sm:py-8 md:py-12 lg:py-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl mb-0.5 sm:mb-1 md:mb-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}>
            Contact Us
          </h1>
        </div>
      </section>

      {/* Two-Column Layout Section */}
      <section className="py-0 sm:py-1 md:py-2 lg:py-3">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            {/* Left Column: Contact Actions */}
            <div className="space-y-4 sm:space-y-6">
              <ContactInfo info={contactInfo} />
            </div>

            {/* Right Column: Contact Form */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gray-100 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8">
                <div className="text-center lg:text-left mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}>
                    Plan My Trip
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground">
                     Need a custom itinerary? We'd love to hear from you.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Contact;