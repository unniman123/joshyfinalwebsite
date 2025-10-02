import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitTourEnquiry } from "@/lib/api/tours";
interface EnquiryFormProps {
  tourId: string;
}
const EnquiryForm = ({
  tourId
}: EnquiryFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nationality: "",
    contactNumber: "",
    dateOfTravel: "",
    hotelCategory: "",
    numberOfRooms: "",
    numberOfPeople: "",
    numberOfKids: "",
    message: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Submit all fields via submitTourEnquiry(tourId, data) API
      await submitTourEnquiry(tourId, {
        name: formData.name,
        email: formData.email,
        nationality: formData.nationality,
        contactNumber: formData.contactNumber,
        numberOfDays: "", // Not directly collected in this form
        dateOfTravel: formData.dateOfTravel,
        hotelCategory: formData.hotelCategory,
        numberOfRooms: formData.numberOfRooms,
        specialComments: "", // Removed field, sending empty string for API compatibility
        message: `${formData.message} | People: ${formData.numberOfPeople}, Kids: ${formData.numberOfKids || 'None'}`
      });

      // Show success toast with accessibility
      toast({
        title: "Quick Enquiry Submitted Successfully!",
        description: "Thank you for your interest in this tour. We'll respond within 24 hours.",
        variant: "default"
      });

      // Clear form fields on success
      setFormData({
        name: "",
        email: "",
        nationality: "",
        contactNumber: "",
        dateOfTravel: "",
        hotelCategory: "",
        numberOfRooms: "",
        numberOfPeople: "",
        numberOfKids: "",
        message: ""
      });

      // TODO: On API integration, add email notifications to admin
      // TODO: Optionally redirect to /thank-you page

    } catch (error) {
      // Show error toast with accessibility
      toast({
        title: "Submission Failed",
        description: "Failed to submit Quick Enquiry. Please try again or contact us directly.",
        variant: "destructive"
      });
      console.error("Quick Enquiry submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <div className="max-w-2xl mx-auto">
    <div className="bg-slate-100/60 text-foreground rounded-lg p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name " required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality *</Label>
          <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Enter your nationality" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactNumber">Contact No (WhatsApp) *</Label>
          <Input id="contactNumber" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} placeholder="Enter your WhatsApp number" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numberOfPeople">Number of adults (12 years and above) *</Label>
          <Input id="numberOfPeople" name="numberOfPeople" type="number" min="1" value={formData.numberOfPeople} onChange={handleChange} placeholder="e.g., 4" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfKids">number of kids & their age (If any)</Label>
          <Input id="numberOfKids" name="numberOfKids" type="number" min="0" value={formData.numberOfKids} onChange={handleChange} placeholder="e.g., 2 kids (5 years, 8 years)" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfTravel">Date of Travel *</Label>
          <Input id="dateOfTravel" name="dateOfTravel" type="date" value={formData.dateOfTravel} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfRooms">Number of Rooms *</Label>
          <Input id="numberOfRooms" name="numberOfRooms" type="number" min="1" value={formData.numberOfRooms} onChange={handleChange} placeholder="e.g., 2" required />
        </div>
      </div>



      <div className="space-y-2">
        <Label htmlFor="hotelCategory">Hotel Category *</Label>
        <Select value={formData.hotelCategory} onValueChange={value => handleSelectChange("hotelCategory", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select hotel category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3-star">3* Category</SelectItem>
            <SelectItem value="4-star">4* Category</SelectItem>
            <SelectItem value="5-star">5* Category</SelectItem>
          </SelectContent>
        </Select>
      </div>



      <div className="space-y-2">
        <Label htmlFor="message">Special Comments</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your travel plans, preferences, or any questions you have about this tour..." rows={5} />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full !bg-brand-green hover:!bg-brand-green-dark !text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300"
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
        {isSubmitting && "Quick Enquiry form is being submitted, please wait."}
      </div>

      {/* TODO: Add form validation for all new fields */}
      {/* TODO: Wire to real API endpoint when Supabase is integrated */}
      {/* TODO: Map new form fields to Supabase columns on integration */}
      {/* TODO: Add email notifications to admin on Quick Enquiry submission */}
      </form>
    </div>
  </div>;
};
export default EnquiryForm;
