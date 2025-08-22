import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WhatsAppFloat = () => {
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
          {/* WhatsApp Button */}
          <Button
            onClick={handleWhatsAppClick}
            className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-smooth animate-pulse"
            size="icon"
            aria-label="Contact us on WhatsApp"
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