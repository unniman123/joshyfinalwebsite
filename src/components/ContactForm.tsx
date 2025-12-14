import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitTourEnquiry } from "@/lib/api/tours";
import { submitContactEnquiry } from "@/lib/api/contact";
import { trackFormSubmission } from "@/lib/analytics";
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
      // Detect contact page usage (tourId is null/undefined) vs tour page usage
      const isContactPage = !tourId;

      if (isContactPage) {
        // Submit to contact_inquiry table for contact page
        const contactMessage = [
          `Destinations: ${formData.destinationsInterested}`,
          `Nationality: ${formData.nationality}`,
          `Adults: ${formData.numberOfPersons}`,
          `Kids: ${formData.numberOfKidsAndAge}`,
          `Rooms: ${formData.numberOfRooms}`,
          `Duration: ${formData.numberOfDaysTourNeeded} days`,
          `Travel Date: ${formData.dateOfTravel}`,
          `Hotel Category: ${formData.hotelCategory}`,
          formData.specialComments ? `Special Comments: ${formData.specialComments}` : '',
        ].filter(Boolean).join('\n');

        await submitContactEnquiry({
          name: formData.name,
          email: formData.email,
          subject: `Contact Inquiry - ${formData.destinationsInterested || 'General'}`,
          message: contactMessage
        });
      } else {
        // Submit to inquiries table for tour page
        await submitTourEnquiry(tourId, {
          name: formData.name,
          email: formData.email,
          nationality: formData.nationality,
          contactNumber: formData.contactNumber,
          numberOfDays: formData.numberOfDaysTourNeeded,
          dateOfTravel: formData.dateOfTravel,
          hotelCategory: formData.hotelCategory,
          numberOfRooms: formData.numberOfRooms,
          numberOfPersons: formData.numberOfPersons,
          numberOfKids: formData.numberOfKidsAndAge,
          specialComments: formData.specialComments,
          message: `Destinations: ${formData.destinationsInterested}`
        });
      }

      // Track form submission in Google Analytics
      trackFormSubmission(
        isContactPage ? 'Contact Form' : 'Tour Inquiry Form',
        isContactPage ? formData.destinationsInterested : undefined
      );

      // Show success toast
      toast({
        title: "Enquiry Submitted Successfully !",
        description: "Thanks for your interest. We will respond at the earliest",
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
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="name" className="text-sm sm:text-base">Name *</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="h-10 sm:h-11 text-sm sm:text-base" required />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="email" className="text-sm sm:text-base">Email Address *</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="h-10 sm:h-11 text-sm sm:text-base" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="nationality" className="text-sm sm:text-base">Nationality *</Label>
          <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Enter your nationality" className="h-10 sm:h-11 text-sm sm:text-base" required />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="contactNumber" className="text-sm sm:text-base">Contact No (WhatsApp) *</Label>
          <Input id="contactNumber" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} placeholder="WhatsApp number" className="h-10 sm:h-11 text-sm sm:text-base" required />
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="destinationsInterested" className="text-sm sm:text-base">Destinations Interested *</Label>
        <Input id="destinationsInterested" name="destinationsInterested" value={formData.destinationsInterested} onChange={handleChange} placeholder="e.g., Kerala, Rajasthan" className="h-10 sm:h-11 text-sm sm:text-base" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="numberOfPersons" className="text-sm sm:text-base">No of adults *</Label>
          <Input id="numberOfPersons" name="numberOfPersons" type="number" min="1" value={formData.numberOfPersons} onChange={handleChange} placeholder="e.g., 2" className="h-10 sm:h-11 text-sm sm:text-base" required />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="numberOfKidsAndAge" className="text-sm sm:text-base">No of kids & age (If any)</Label>
          <Input id="numberOfKidsAndAge" name="numberOfKidsAndAge" value={formData.numberOfKidsAndAge} onChange={handleChange} placeholder="e.g., 2 kids (5, 8 yrs)" className="h-10 sm:h-11 text-sm sm:text-base" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="numberOfRooms" className="text-sm sm:text-base">No of Rooms *</Label>
          <Input id="numberOfRooms" name="numberOfRooms" type="number" min="1" value={formData.numberOfRooms} onChange={handleChange} placeholder="e.g., 2" className="h-10 sm:h-11 text-sm sm:text-base" required />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="numberOfDaysTourNeeded" className="text-sm sm:text-base">No of Days Tour *</Label>
          <Input id="numberOfDaysTourNeeded" name="numberOfDaysTourNeeded" type="number" min="1" value={formData.numberOfDaysTourNeeded} onChange={handleChange} placeholder="e.g., 7" className="h-10 sm:h-11 text-sm sm:text-base" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="dateOfTravel" className="text-sm sm:text-base">Date of Travel *</Label>
          <Input id="dateOfTravel" name="dateOfTravel" type="date" value={formData.dateOfTravel} onChange={handleChange} className="h-10 sm:h-11 text-sm sm:text-base" required />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="hotelCategory" className="text-sm sm:text-base">Hotel Category *</Label>
          <Select value={formData.hotelCategory} onValueChange={value => handleSelectChange("hotelCategory", value)}>
            <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
              <SelectValue placeholder="Select hotel category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3-star">3* Category</SelectItem>
              <SelectItem value="4-star">4* Category</SelectItem>
              <SelectItem value="5-star">5* Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="specialComments" className="text-sm sm:text-base">Special Comments</Label>
        <Textarea id="specialComments" name="specialComments" value={formData.specialComments} onChange={handleChange} placeholder="Any other requirements" rows={4} className="text-sm sm:text-base" />
      </div>

      <Button
        type="submit"
        variant="cta"
        size="lg"
        className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold"
        style={{ background: '#008000', color: '#FFFFFF' }}
        disabled={isSubmitting}
        aria-describedby="form-status"
        onMouseEnter={(e) => (e.currentTarget.style.background = '#006400')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#008000')}
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
        {isSubmitting && "Form is being submitted, please wait."}
      </div>

      {/* TODO: Add form validation for all fields */}
      {/* TODO: Wire to real API endpoint when Supabase is integrated */}
      {/* TODO: Add email notifications to admin on form submission */}
    </form>
  </div>;
};

export default ContactForm;
