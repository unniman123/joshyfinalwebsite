import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Hotel, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitContactEnquiry } from "@/lib/api/contact";
import { trackFormSubmission } from "@/lib/analytics";
const ContactFormSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nationality: "",
    contactWhatsapp: "",
    destinationInterested: "",
    tourDays: "",
    travelDate: "",
    hotelCategory: "",
    roomsCount: "",
    specialComments: ""
  });
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Wire form submit to submitContactEnquiry(data) API
      await submitContactEnquiry({
        name: formData.name,
        email: formData.contactWhatsapp, // Using WhatsApp as contact method
        message: `Contact WhatsApp: ${formData.contactWhatsapp}\nNationality: ${formData.nationality}\nDestination: ${formData.destinationInterested}\nTour Days: ${formData.tourDays}\nTravel Date: ${formData.travelDate}\nRooms: ${formData.roomsCount}\nHotel Category: ${formData.hotelCategory}\nSpecial Comments: ${formData.specialComments}`
      });

      // Track form submission in Google Analytics
      trackFormSubmission('Homepage Quote Request Form', formData.destinationInterested);

      // Show success toast with accessibility
      toast({
        title: "Quote Request Submitted Successfully!",
        description: "Thank you for your Enquiry. We'll send you a free quote within 24 hours.",
        variant: "default"
      });

      // Clear form fields on success
      setFormData({
        name: "",
        nationality: "",
        contactWhatsapp: "",
        destinationInterested: "",
        tourDays: "",
        travelDate: "",
        hotelCategory: "",
        roomsCount: "",
        specialComments: ""
      });

      // TODO: On API integration, add email notifications to admin
      // TODO: Optionally redirect to /thank-you page

    } catch (error) {
      // Show error toast with accessibility
      toast({
        title: "Submission Failed",
        description: "Failed to submit quote request. Please try again or contact us directly.",
        variant: "destructive"
      });
      console.error("Contact form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-brand-green/30 bg-muted/50">
          <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2 text-brand-green" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}>Plan Your Perfect Trip</CardTitle>
              <p className="text-muted-foreground">Let us create a customized itinerary just for you</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange("nationality", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact">Contact No (WhatsApp) *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contact"
                      className="pl-10"
                      value={formData.contactWhatsapp}
                      onChange={(e) => handleInputChange("contactWhatsapp", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="destination">Destination Interested</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="destination"
                      className="pl-10"
                      value={formData.destinationInterested}
                      onChange={(e) => handleInputChange("destinationInterested", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="days">Tour Days</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="days"
                        className="pl-10"
                        type="number"
                        value={formData.tourDays}
                        onChange={(e) => handleInputChange("tourDays", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="travel-date">Travel Date</Label>
                    <Input
                      id="travel-date"
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => handleInputChange("travelDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rooms">Rooms</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="rooms"
                        className="pl-10"
                        type="number"
                        value={formData.roomsCount}
                        onChange={(e) => handleInputChange("roomsCount", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="hotel">Hotel Category</Label>
                  <Select onValueChange={(value) => handleInputChange("hotelCategory", value)}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Hotel className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select hotel category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget (3 Star)</SelectItem>
                      <SelectItem value="standard">Standard (4 Star)</SelectItem>
                      <SelectItem value="luxury">Luxury (5 Star)</SelectItem>
                      <SelectItem value="premium">Premium (5+ Star)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="comments">Special Comments</Label>
                  <Textarea
                    id="comments"
                    value={formData.specialComments}
                    onChange={(e) => handleInputChange("specialComments", e.target.value)}
                    placeholder="Any special requirements or comments..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant="cta"
                  size="lg"
                  disabled={isSubmitting}
                  aria-describedby="form-status"
                >
                  {isSubmitting ? "Sending..." : "Send Request"}
                </Button>

                {/* Screen reader status region for accessibility */}
                <div
                  id="form-status"
                  className="sr-only"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {isSubmitting && "Quote request form is being submitted, please wait."}
                </div>

                {/* TODO: Wire to real API endpoint when Supabase is integrated */}
                {/* TODO: Add email notifications to admin on quote request */}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default ContactFormSection;