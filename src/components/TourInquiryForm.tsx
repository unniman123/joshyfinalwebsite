import { useState } from "react";
import { User, Calendar, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TourInquiryFormProps {
  title?: string;
  placeholderText?: string;
  formType?: "tour" | "dayOut";
}

const TourInquiryForm = ({ 
  title = "Tour Inquiry", 
  placeholderText = "Kerala, Rajasthan...",
  formType = "tour" 
}: TourInquiryFormProps) => {
  // Inquiry form state
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    date: "",
    destination: ""
  });

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log(`${formType} inquiry submitted:`, formData);
    // Reset form after submission
    setFormData({
      name: "",
      mobileNo: "",
      date: "",
      destination: ""
    });
  };

  // Form input handler
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const destinationLabel = formType === "dayOut" ? "Preferred Package" : "Destination";
  const formIdPrefix = formType === "dayOut" ? "dayOut" : "tour";

  return (
    <Card className="shadow-warm w-full max-w-xs">
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
              Mobile No (WhatsApp) *
            </Label>
            <div className="relative">
              <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground" />
              <Input
                id={`${formIdPrefix}-mobile`}
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.mobileNo}
                onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                className="pl-6 h-6 text-[10px]"
                required
              />
            </div>
          </div>

          {/* Date Field */}
          <div className="space-y-0.5">
            <Label htmlFor={`${formIdPrefix}-date`} className="text-[10px] font-medium text-muted-foreground">
              Preferred Date *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground" />
              <Input
                id={`${formIdPrefix}-date`}
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="pl-6 h-6 text-[10px]"
                required
              />
            </div>
          </div>

          {/* Destination Field */}
          <div className="space-y-0.5">
            <Label htmlFor={`${formIdPrefix}-destination`} className="text-[10px] font-medium text-muted-foreground">
              {destinationLabel} *
            </Label>
            <div className="relative">
              <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground" />
              <Input
                id={`${formIdPrefix}-destination`}
                type="text"
                placeholder={placeholderText}
                value={formData.destination}
                onChange={(e) => handleInputChange("destination", e.target.value)}
                className="pl-6 h-6 text-[10px]"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <Button
              type="submit"
              className="w-full bg-gradient-golden hover:shadow-golden transition-all duration-300 h-7 text-[10px]"
            >
              Submit Inquiry
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TourInquiryForm;