import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

interface ContactInfoProps {
  info: {
    address: string;
    phone: string;
    email: string;
    whatsapp?: string;
    locations: { lat: number; lng: number }[];
    socialLinks: { name: string; url: string }[];
  };
}

const ContactInfo = ({ info }: ContactInfoProps) => {
  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'facebook':
        return <Facebook className="w-6 h-6" />;
      case 'instagram':
        return <Instagram className="w-6 h-6" />;
      case 'twitter':
        return <Twitter className="w-6 h-6" />;
      case 'youtube':
        return <Youtube className="w-6 h-6" />;
      default:
        return <div className="w-6 h-6 bg-muted rounded" />;
    }
  };

  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Get in Touch
      </h2>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        Ready to start your journey? Contact us through any of these channels and we'll help you plan the perfect trip.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Address */}
        <div className="group text-center space-y-4 p-6 rounded-xl hover:bg-muted/50 transition-colors">
          <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center mx-auto transition-colors">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Visit Us</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {info.address || "123 Travel Street, Tourism District, India"}
            </p>
          </div>
        </div>

        {/* Phone */}
        <a
          href={`tel:${info.phone}`}
          className="group text-center space-y-4 p-6 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center mx-auto transition-colors">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Call Us</h3>
            <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
              {info.phone || "+91 12345 67890"}
            </p>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${info.email}`}
          className="group text-center space-y-4 p-6 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center mx-auto transition-colors">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Email Us</h3>
            <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
              {info.email || "info@tourcompany.com"}
            </p>
          </div>
        </a>

        {/* WhatsApp */}
        {info.whatsapp && (
          <a
            href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-center space-y-4 p-6 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-green-500/10 group-hover:bg-green-500/20 rounded-full flex items-center justify-center mx-auto transition-colors">
              <WhatsAppIcon className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">WhatsApp</h3>
              <p className="text-muted-foreground text-sm group-hover:text-green-600 transition-colors">
                {info.whatsapp || "+91 98765 43210"}
              </p>
            </div>
          </a>
        )}
      </div>


    </div>
  );
};

export default ContactInfo;