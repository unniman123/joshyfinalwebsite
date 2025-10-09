import { useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WhatsAppFloat = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "918593834054"; // WhatsApp number: +91 8593834054
    const message = "Need to plan my trip";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Enhanced WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>

          {/* Main WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 active:scale-95 animate-bounce"
            style={{
              animationDuration: '2s',
              animationIterationCount: 'infinite'
            }}
            aria-label="Contact KeralaToursGlobal on WhatsApp - Click to start chat"
          >
            <WhatsAppIcon className="h-8 w-8 text-white" />

            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              1
            </div>
          </button>

          {/* Tooltip on Hover */}
          <div className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-2'
            }`}>
            <span className="font-medium">Need to plan my trip</span>
            <div className="absolute top-1/2 -translate-y-1/2 left-full border-4 border-transparent border-l-gray-900"></div>
          </div>

          {/* Floating Message Bubble */}
          <div className={`absolute bottom-full mb-4 right-0 bg-white rounded-2xl shadow-xl p-4 max-w-xs transition-all duration-500 ${isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
            }`}>
            <div className="flex items-start gap-3">
              <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                <WhatsAppIcon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium mb-1">KeralaToursGlobal</p>
                <p className="text-xs text-gray-600">Need to plan my trip</p>
                <p className="text-xs text-gray-400 mt-1">Typically replies instantly</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppFloat;