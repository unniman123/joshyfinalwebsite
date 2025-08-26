import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitTourEnquiry } from "@/lib/api/tours";
interface ContactFormProps {
  tourId?: string;
}
const ContactForm = ({
  tourId
}: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nationality: "",
    contactNumber: "",
    destinationsInterested: "",
    numberOfPersons: "",
    numberOfKidsAndAge: "",
    numberOfRooms: "",
    numberOfDaysTourNeeded: "",
    dateOfTravel: "",
    hotelCategory: "",
    specialComments: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Wire form submit to submitTourEnquiry(tourId, data) API
      await submitTourEnquiry(tourId || "default", {
        name: formData.name,
        email: formData.email,
        nationality: formData.nationality,
        contactNumber: formData.contactNumber,
        numberOfDays: formData.numberOfDaysTourNeeded,
        dateOfTravel: formData.dateOfTravel,
        hotelCategory: formData.hotelCategory,
        numberOfRooms: formData.numberOfRooms,
        specialComments: formData.specialComments,
        message: `Destinations: ${formData.destinationsInterested}, Persons: ${formData.numberOfPersons}, Kids: ${formData.numberOfKidsAndAge || 'None'}`
      });

      // Show success toast
      toast({
        title: "Enquiry Submitted Successfully!",
        description: "Thank you for your interest. We'll contact you within 24 hours.",
        variant: "default"
      });

      // Clear form fields on success
      setFormData({
        name: "",
        email: "",
        nationality: "",
        contactNumber: "",
        destinationsInterested: "",
        numberOfPersons: "",
        numberOfKidsAndAge: "",
        numberOfRooms: "",
        numberOfDaysTourNeeded: "",
        dateOfTravel: "",
        hotelCategory: "",
        specialComments: ""
      });

      // TODO: On API integration, add email notifications
      // TODO: Optionally redirect to /thank-you page

    } catch (error) {
      // Show error toast
      toast({
        title: "Submission Failed",
        description: "Failed to submit Enquiry. Please try again or contact us directly.",
        variant: "destructive"
      });
      console.error("Form submission error:", error);
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
  return <div className="w-full">
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
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
          <Label htmlFor="contactNumber">Contact Number (Whatsapp) *</Label>
          <Input id="contactNumber" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} placeholder="Enter your WhatsApp number" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="destinationsInterested">Destinations Interested *</Label>
        <Input id="destinationsInterested" name="destinationsInterested" value={formData.destinationsInterested} onChange={handleChange} placeholder="e.g., Kerala, Rajasthan" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numberOfPersons">No of Persons *</Label>
          <Input id="numberOfPersons" name="numberOfPersons" type="number" min="1" value={formData.numberOfPersons} onChange={handleChange} placeholder="e.g., 4" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfKidsAndAge">No of Kids & their age (If any)</Label>
          <Input id="numberOfKidsAndAge" name="numberOfKidsAndAge" value={formData.numberOfKidsAndAge} onChange={handleChange} placeholder="e.g., 2 kids (5 years, 8 years)" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numberOfRooms">No of Rooms *</Label>
          <Input id="numberOfRooms" name="numberOfRooms" type="number" min="1" value={formData.numberOfRooms} onChange={handleChange} placeholder="e.g., 2" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfDaysTourNeeded">No of days tour needed *</Label>
          <Input id="numberOfDaysTourNeeded" name="numberOfDaysTourNeeded" type="number" min="1" value={formData.numberOfDaysTourNeeded} onChange={handleChange} placeholder="e.g., 7" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfTravel">Date of Travel *</Label>
          <Input id="dateOfTravel" name="dateOfTravel" type="date" value={formData.dateOfTravel} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hotelCategory">Hotel Category *</Label>
          <Select value={formData.hotelCategory} onValueChange={value => handleSelectChange("hotelCategory", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select hotel category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3-star">3* category</SelectItem>
              <SelectItem value="4-star">4* category</SelectItem>
              <SelectItem value="5-star">5* category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialComments">Special Comments</Label>
        <Textarea id="specialComments" name="specialComments" value={formData.specialComments} onChange={handleChange} placeholder="Any special requests, dietary requirements, accessibility needs, or other comments..." rows={4} />
      </div>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
        aria-describedby="form-status"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>

      {/* Screen reader status region for accessibility */}
      <div
        id="form-status"
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {isSubmitting && "Form is being submitted, please wait."}
      </div>

      {/* TODO: Add form validation for all fields */}
      {/* TODO: Wire to real API endpoint when Supabase is integrated */}
      {/* TODO: Add email notifications to admin on form submission */}
    </form>
  </div>;
};
export default ContactForm;
