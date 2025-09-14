import { useState } from "react";
import { User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  title = "Quick Enquiry",
  formType = "tour",
  showMessage = true,
  showDate = false,
  showDestination = false,
  messagePlaceholder = "Write us in short of your requirements to customise a package",
  phoneFieldPlaceholder = ""
}: TourEnquiryFormProps) => {
  // Enquiry form state - dynamic based on admin config
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    ...(showMessage && { message: "" }),
    ...(showDate && { date: "" }),
    ...(showDestination && { destination: "" })
  });

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log(`${formType} Enquiry submitted:`, formData);
    // Reset form after submission - dynamic fields
    setFormData({
      name: "",
      mobileNo: "",
      ...(showMessage && { message: "" }),
      ...(showDate && { date: "" }),
      ...(showDestination && { destination: "" })
    });
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
    <Card className="border-2 border-golden/30 hover:border-golden/50 shadow-warm hover:shadow-golden/20 transition-all duration-300 w-full max-w-xs">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-1">
          <User className="h-3 w-3 text-golden" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        <form onSubmit={handleFormSubmit} className="space-y-1.5">
          {/* Name Field */}
          <div className="space-y-0.5">
            <Label htmlFor={`${formIdPrefix}-name`} className="text-[10px] font-medium text-muted-foreground">
              Name *
            </Label>
            <div className="relative">
              <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground" />
              <Input
                id={`${formIdPrefix}-name`}
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="pl-6 h-6 text-[10px]"
                required
              />
            </div>
          </div>

          {/* Mobile No (WhatsApp) Field */}
          <div className="space-y-0.5">
            <Label htmlFor={`${formIdPrefix}-mobile`} className="text-[10px] font-medium text-muted-foreground">
              Mobile No (Whatsapp) *
            </Label>
            <div className="relative">
              <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground" />
              <Input
                id={`${formIdPrefix}-mobile`}
                type="tel"
                placeholder={phoneFieldPlaceholder || "+91 98765 43210"}
                value={formData.mobileNo}
                onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                className="pl-6 h-6 text-[10px]"
                required
              />
            </div>
          </div>

          {/* Message Field - conditionally rendered */}
          {showMessage && (
            <div className="space-y-0.5">
              <Label htmlFor={`${formIdPrefix}-message`} className="text-[10px] font-medium text-muted-foreground">
                Message *
              </Label>
              <div className="relative">
                <Textarea
                  id={`${formIdPrefix}-message`}
                  placeholder={messagePlaceholder}
                  value={formData.message || ""}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="min-h-[24px] text-[10px] resize-none"
                  rows={2}
                  required
                />
              </div>
            </div>
          )}

          {/* Date Field - conditionally rendered */}
          {showDate && (
            <div className="space-y-0.5">
              <Label htmlFor={`${formIdPrefix}-date`} className="text-[10px] font-medium text-muted-foreground">
                Preferred Date *
              </Label>
              <div className="relative">
                <Input
                  id={`${formIdPrefix}-date`}
                  type="date"
                  value={formData.date || ""}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="h-6 text-[10px]"
                  required
                />
              </div>
            </div>
          )}

          {/* Destination Field - conditionally rendered */}
          {showDestination && (
            <div className="space-y-0.5">
              <Label htmlFor={`${formIdPrefix}-destination`} className="text-[10px] font-medium text-muted-foreground">
                Destination *
              </Label>
              <div className="relative">
                <Input
                  id={`${formIdPrefix}-destination`}
                  type="text"
                  placeholder="Enter destination"
                  value={formData.destination || ""}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  className="h-6 text-[10px]"
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-1">
            <Button
              type="submit"
              className="w-full bg-gradient-golden hover:shadow-golden transition-all duration-300 h-7 text-[10px]"
            >
              Send Enquiry
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TourEnquiryForm;