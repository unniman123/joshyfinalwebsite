import { useEffect, useState } from "react";
import { getContactInfo } from "@/lib/api/contact";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
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
      <Header />

      {/* Simplified Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Two-Column Layout Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Contact Actions */}
            <div className="space-y-6">
              <ContactInfo info={contactInfo} />
            </div>

            {/* Right Column: Contact Form */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Plan My Trip
                </h2>
                <p className="text-lg text-muted-foreground">
                   Need a custom itinerary? We'd love to hear from you.
                </p>
              </div>
              <ContactForm />
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