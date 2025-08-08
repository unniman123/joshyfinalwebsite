import { useEffect, useState } from "react";
import { getContactInfo } from "@/lib/api/contact";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import GoogleMap from "@/components/GoogleMap";
import SocialLinks from "@/components/SocialLinks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

  // TODO: Replace with actual loading state
  if (!contactInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us to plan your perfect Indian adventure
          </p>
        </div>

        <ContactInfo info={contactInfo} />
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Send us a Message</h2>
          <ContactForm />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Find Us</h2>
          <GoogleMap locations={contactInfo.locations} />
        </div>

        <SocialLinks links={contactInfo.socialLinks} />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;