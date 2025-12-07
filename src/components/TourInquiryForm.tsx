import { useState } from "react";
import { User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitQuickEnquiry } from "@/lib/supabase-inquiries";
import { useToast } from "@/hooks/use-toast";

interface TourEnquiryFormProps {
  title?: string;
  placeholderText?: string;
  formType?: "tour" | "dayOut";
  // Admin configuration props
  showMessage?: boolean;
  showDate?: boolean;
  showDestination?: boolean;
  messagePlaceholder?: string;
  phoneFieldPlaceholder?: string;
}

const TourEnquiryForm = ({
  title = "KeralaTours Travels & Organic Remedies",
  formType = "tour",
  showMessage = true,
  showDate = false,
  showDestination = false,
  messagePlaceholder = "Write us in short of your requirements to customise a package",
  phoneFieldPlaceholder = ""
}: TourEnquiryFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enquiry form state - dynamic based on admin config
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    ...(showMessage && { message: "" }),
    ...(showDate && { date: "" }),
    ...(showDestination && { destination: "" })
  });

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Supabase quick_enquiries table
      await submitQuickEnquiry({
        name: formData.name,
        mobile_no: formData.mobileNo,
        preferred_date: formData.date || null,
        number_of_people: null, // Not collected in this form
        destination: formData.destination || null,
        special_comments: formData.message || null
      });

      // Show success toast
      toast({
        title: "Quick Enquiry Submitted Successfully !",
        description: "Thanks for your interest. We will respond at the earliest",
        variant: "default"
      });

      // Reset form after submission - dynamic fields
      setFormData({
        name: "",
        mobileNo: "",
        ...(showMessage && { message: "" }),
        ...(showDate && { date: "" }),
        ...(showDestination && { destination: "" })
      });

    } catch (error) {
      // Show error toast
      toast({
        title: "Submission Failed",
        description: "Failed to submit quick enquiry. Please try again or contact us directly.",
        variant: "destructive"
      });
      console.error("Quick enquiry submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form input handler
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formIdPrefix = formType === "dayOut" ? "dayOut" : "tour";

  return (
    <div className="relative overflow-hidden">
      {/* Decorative circles - adapted to form dimensions */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600/10 rounded-full -translate-x-12 translate-y-12"></div>

      <Card className="border shadow-none transition-all duration-300 w-full max-w-md mx-auto lg:max-w-xs rounded-xl relative z-10" style={{ borderColor: 'hsl(0 0% 85% / 0.3)', background: 'linear-gradient(180deg, hsl(0 0% 90% / 0.15), hsl(0 0% 85% / 0.08))' }}>
        <CardHeader className="pb-2 sm:pb-1">
          <CardTitle className="text-base sm:text-sm md:text-base font-bold text-black flex items-center gap-1.5 sm:gap-1" style={{ fontFamily: "'Sora', sans-serif" }}>
            <User className="h-4 w-4 sm:h-3 sm:w-3 text-black/60" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 py-3 sm:px-2 sm:py-2" style={{ backdropFilter: 'blur(4px)', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
        <form onSubmit={handleFormSubmit} className="space-y-2 sm:space-y-1.5">
          {/* Name Field */}
          <div className="space-y-0.5">
            <Label htmlFor={`${formIdPrefix}-name`} className="text-sm sm:text-[12px] text-black">
              Name *
            </Label>
            <div className="relative">
              <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-black/60" />
              <Input
                id={`${formIdPrefix}-name`}
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="pl-8 sm:pl-6 h-10 sm:h-8 text-sm sm:text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                required
              />
            </div>
          </div>

          {/* Mobile No (WhatsApp) Field */}
          <div className="space-y-0.5">
            <Label htmlFor={`${formIdPrefix}-mobile`} className="text-sm sm:text-[12px] text-black">
              Mobile No (WhatsApp) *
            </Label>
            <div className="relative">
              <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-black/60" />
              <Input
                id={`${formIdPrefix}-mobile`}
                type="tel"
                placeholder={phoneFieldPlaceholder || "With Country Code"}
                value={formData.mobileNo}
                onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                className="pl-6 h-8 text-sm sm:text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                required
              />
            </div>
          </div>

          {/* Message Field - conditionally rendered */}
          {showMessage && (
            <div className="space-y-0.5">
              <Label htmlFor={`${formIdPrefix}-message`} className="text-sm sm:text-[12px] text-black">
                Message *
              </Label>
              <div className="relative">
                <Textarea
                  id={`${formIdPrefix}-message`}
                  placeholder={messagePlaceholder}
                  value={formData.message || ""}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="min-h-[44px] text-sm resize-none bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                  rows={2}
                  required
                />
              </div>
            </div>
          )}

          {/* Date Field - conditionally rendered */}
          {showDate && (
            <div className="space-y-0.5">
            <Label htmlFor={`${formIdPrefix}-date`} className="text-sm sm:text-[12px] text-black">
                Preferred Date *
              </Label>
              <div className="relative">
                <Input
                  id={`${formIdPrefix}-date`}
                  type="date"
                  value={formData.date || ""}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="h-8 text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                  required
                />
              </div>
            </div>
          )}

          {/* Destination Field - conditionally rendered */}
          {showDestination && (
            <div className="space-y-0.5">
            <Label htmlFor={`${formIdPrefix}-destination`} className="text-sm sm:text-[12px] text-black">
                Destination *
              </Label>
              <div className="relative">
                <Input
                  id={`${formIdPrefix}-destination`}
                  type="text"
                  placeholder="Enter destination"
                  value={formData.destination || ""}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  className="h-8 text-[12px] bg-white/8 text-black placeholder-[color:var(--form-placeholder)]"
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-1">
            <Button
              type="submit"
              className="w-full hover:shadow-brand transition-all duration-300 h-11 sm:h-9 text-sm sm:text-[12px] font-bold"
              style={{ background: '#008000', color: '#FFFFFF' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};

export default TourEnquiryForm;