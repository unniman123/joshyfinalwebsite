// Contact API types and functions
// Now wired to Supabase for form submissions

import { submitContactInquiry as submitToSupabase } from '../supabase-inquiries';

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  locations: { lat: number; lng: number }[];
  socialLinks: { name: string; url: string }[];
}

/**
 * Fetch contact information
 * TODO: Move to Supabase site_content table when admin controls this
 */
export async function getContactInfo(): Promise<ContactInfo> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    address: "Kovalam Beach, Thiruvananthapuram, Kerala, India",
    phone: "+91-95395-07516,+91-471-2488880",
    email: "KeralaToursGlobal@gmail.com, flabour@gmail.com",
    whatsapp: "+91-95395-07516",
    locations: [
      { lat: 8.4004, lng: 76.9784 }, // Kovalam Beach, Thiruvananthapuram
    ],
    socialLinks: [
      { name: "Facebook", url: "https://facebook.com/keralatoursglobal" },
      { name: "Instagram", url: "https://instagram.com/keralatoursglobal" },
      { name: "Twitter", url: "https://twitter.com/keralatoursglobal" },
      { name: "Youtube", url: "https://youtube.com/keralatoursglobal" },
    ]
  };
}

/**
 * Submit a contact enquiry
 * Now wired to Supabase contact_inquiry table
 */
export async function submitContactEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<void> {
  const inquiry = {
    name: data.name,
    email: data.email,
    subject: data.subject || null,
    message: data.message,
  };

  const result = await submitToSupabase(inquiry);

  if (!result.success) {
    throw new Error(result.error || 'Failed to submit contact enquiry');
  }
}
