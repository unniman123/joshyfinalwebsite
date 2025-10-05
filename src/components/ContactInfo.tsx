import { MapPin, Phone, Mail } from "lucide-react";
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
  return (
    <div className="space-y-6">
      {/* Contact Actions arranged vertically */}
      <div className="space-y-4">
        {/* Office Button */}
        <div className="group p-4 md:p-6 rounded-xl border border-border hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base md:text-lg mb-1">Office</h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                {info.address || "123 Travel Street, Tourism District, India"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact us Button */}
        <a
          href={`tel:${info.phone}`}
          className="group block p-4 md:p-6 rounded-xl border border-border hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base md:text-lg mb-1">Contact us</h3>
              <p className="text-muted-foreground text-xs md:text-sm group-hover:text-gray-700 transition-colors">
                {info.phone || "+91-95395-07516, +91-471-2488880"}
              </p>
            </div>
          </div>
        </a>

        {/* Email us Button */}
        <a
          href={`mailto:${info.email}`}
          className="group block p-4 md:p-6 rounded-xl border border-border hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base md:text-lg mb-1">Email us</h3>
              <p className="text-muted-foreground text-xs md:text-sm group-hover:text-gray-700 transition-colors">
                {info.email || "info@tourcompany.com, flabour@gmail.com"}
              </p>
            </div>
          </div>
        </a>

        {/* WhatsApp Button (conditional) */}
        {info.whatsapp && (
          <a
            href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 md:p-6 rounded-xl border border-border transition-all duration-300 cursor-pointer"
            style={{ 
              ['--hover-border' as string]: 'hsl(145 70% 65%)',
              ['--hover-bg' as string]: 'hsl(145 60% 95%)'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'hsl(145 70% 65%)';
              e.currentTarget.style.backgroundColor = 'hsl(145 60% 95%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.backgroundColor = '';
            }}
          >
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'hsl(145 60% 90%)' }}>
                <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6" style={{ color: 'hsl(145 70% 40%)' }} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base md:text-lg mb-1">Whatsapp</h3>
                <p className="text-muted-foreground text-xs md:text-sm transition-colors group-hover:opacity-80">
                  {info.whatsapp || "Enter your whatsaap number"}
                </p>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;