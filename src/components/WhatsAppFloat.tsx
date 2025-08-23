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
      {/* WhatsApp Icon */}
      <div className="fixed bottom-6 right-6 z-50 animate-scale-up">
        <div className="relative">
          {/* WhatsApp Icon - No circular background */}
          <button
            onClick={handleWhatsAppClick}
            className="p-2 hover:scale-110 transition-transform duration-300 cursor-pointer"
            aria-label="Contact us on WhatsApp"
          >
            <WhatsAppIcon className="h-12 w-12 text-green-500 hover:text-green-600 transition-colors duration-300 drop-shadow-lg" />
          </button>
        </div>
      </div>
    </>
  );
};

export default WhatsAppFloat;