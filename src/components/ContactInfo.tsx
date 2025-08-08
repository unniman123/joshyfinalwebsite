import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Address</h3>
          {/* TODO: Replace placeholders with info.address data */}
          <p className="text-muted-foreground text-sm">
            {info.address || "123 Travel Street, Tourism District, India"}
          </p>
        </div>
      </div>

      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Phone className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Phone</h3>
          {/* TODO: Replace placeholders with info.phone data */}
          <p className="text-muted-foreground text-sm">
            {info.phone || "+91 12345 67890"}
          </p>
        </div>
      </div>

      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Email</h3>
          {/* TODO: Replace placeholders with info.email data */}
          <p className="text-muted-foreground text-sm">
            {info.email || "info@tourcompany.com"}
          </p>
        </div>
      </div>

      {info.whatsapp && (
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">WhatsApp</h3>
            {/* TODO: Replace placeholders with info.whatsapp data */}
            <p className="text-muted-foreground text-sm">
              {info.whatsapp || "+91 98765 43210"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;