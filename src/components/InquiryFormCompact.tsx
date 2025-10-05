import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EnquiryFormCompact = () => {
  // Enquiry form state
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
    console.log("Form submitted:", formData);
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

  return (
    <Card className="shadow-warm w-full max-w-sm">
      <CardHeader className="pb-2 px-3 pt-3">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-1">
          <User className="h-3 w-3 text-brand-green" />
          Quick Enquiry
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <form onSubmit={handleFormSubmit} className="space-y-1.5">
          {/* Name Field */}
          <div className="space-y-0.5">
            <Label htmlFor="Enquiry-name" className="text-[10px] font-medium text-muted-foreground">
              Name *
            </Label>
            <Input
              id="Enquiry-name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="h-6 text-[10px] px-2"
              required
            />
          </div>

          {/* Mobile No Field */}
          <div className="space-y-0.5">
            <Label htmlFor="Enquiry-mobile" className="text-[10px] font-medium text-muted-foreground">
              Mobile *
            </Label>
            <Input
              id="Enquiry-mobile"
              type="tel"
              placeholder="Enter your Whatsap number"
              value={formData.mobileNo}
              onChange={(e) => handleInputChange("mobileNo", e.target.value)}
              className="h-6 text-[10px] px-2"
              required
            />
          </div>

          {/* Date Field */}
          <div className="space-y-0.5">
            <Label htmlFor="Enquiry-date" className="text-[10px] font-medium text-muted-foreground">
              Travel Date *
            </Label>
            <Input
              id="Enquiry-date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="h-6 text-[10px] px-2"
              required
            />
          </div>

          {/* Destination Field */}
          <div className="space-y-0.5">
            <Label htmlFor="Enquiry-destination" className="text-[10px] font-medium text-muted-foreground">
              Destination *
            </Label>
            <Input
              id="Enquiry-destination"
              type="text"
              placeholder="Kerala, Rajasthan..."
              value={formData.destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              className="h-6 text-[10px] px-2"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <Button
              type="submit"
              className="w-full bg-[var(--brand-green)] text-white hover:shadow-brand transition-all duration-300 h-6 text-[10px]"
            >
              Send Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnquiryFormCompact;