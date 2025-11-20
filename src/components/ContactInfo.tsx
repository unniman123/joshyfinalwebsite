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
    <div className="space-y-4 sm:space-y-6" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* Contact Actions arranged vertically */}
      <div className="space-y-3 sm:space-y-4">
        {/* Office Button */}
        <div className="group p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-border hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 min-h-[80px]">
          <div className="flex items-center space-x-3 sm:space-x-3 md:space-x-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-12 md:h-12 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors flex-shrink-0">
              <MapPin className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-medium mb-1">Office</h3>
              <p className="text-muted-foreground text-sm sm:text-sm md:text-sm leading-relaxed">
                {info.address || "123 Travel Street, Tourism District, India"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact us Button */}
        <a
          href={`tel:${info.phone}`}
          className="group block p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-border hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer min-h-[80px]"
        >
          <div className="flex items-center space-x-3 sm:space-x-3 md:space-x-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-12 md:h-12 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors flex-shrink-0">
              <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-medium mb-1">Call Us</h3>
              <p className="text-muted-foreground text-sm sm:text-sm md:text-sm group-hover:text-gray-700 transition-colors leading-relaxed">
                {info.phone || "+91-95395-07516, +91-471-2488880"}
              </p>
            </div>
          </div>
        </a>

        {/* Email us Button */}
        <a
          href={`mailto:${info.email}`}
          className="group block p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-border hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer min-h-[80px]"
        >
          <div className="flex items-center space-x-3 sm:space-x-3 md:space-x-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-12 md:h-12 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors flex-shrink-0">
              <Mail className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-medium mb-1">Email us</h3>
              <p className="text-muted-foreground text-sm sm:text-sm md:text-sm group-hover:text-gray-700 transition-colors leading-relaxed break-words">
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
            className="group block p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-border transition-all duration-300 cursor-pointer min-h-[80px]"
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
            <div className="flex items-center space-x-3 sm:space-x-3 md:space-x-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors flex-shrink-0" style={{ backgroundColor: 'hsl(145 60% 90%)', color: 'hsl(145 70% 40%)' }}>
                <WhatsAppIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-medium mb-1">Whatsapp</h3>
                <p className="text-muted-foreground text-sm sm:text-sm md:text-sm transition-colors group-hover:opacity-80 leading-relaxed">
                  {info.whatsapp || "Enter your whatsapp number"}
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