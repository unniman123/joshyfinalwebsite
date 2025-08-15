import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WhatsAppFloat = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds of page load
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "919000000000"; // Replace with actual WhatsApp number
    const message = "Hi! I'm interested in your tour packages. Could you please provide more information?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };



  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 animate-scale-up">
        <div className="relative">
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-card p-3 min-w-[200px] animate-fade-in">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Need help planning your trip?</p>
                  <p className="text-xs text-muted-foreground mt-1">Chat with us on WhatsApp!</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => setShowTooltip(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute bottom-0 right-6 translate-y-full">
                <div className="w-3 h-3 bg-white transform rotate-45 border-r border-b border-border"></div>
              </div>
            </div>
          )}

          {/* WhatsApp Button */}
          <Button
            onClick={handleWhatsAppClick}
            className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-smooth animate-pulse"
            size="icon"
          >
            <WhatsAppIcon className="h-7 w-7 text-white" />
          </Button>

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping"></div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppFloat;