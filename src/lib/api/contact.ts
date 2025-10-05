// Contact API types and functions

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  locations: { lat: number; lng: number }[];
  socialLinks: { name: string; url: string }[];
}

// TODO: Replace with actual API call to fetch contact information
export async function getContactInfo(): Promise<ContactInfo> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // TODO: Fetch contactInfo via getContactInfo() API
  return {
    address: "Kovalam Beach, Thiruvananthapuram, Kerala, India",
    phone: "+91-95395-07516,+91-471-2488880",
    email: "KeralaToursGlobal@gmail.com, flabour@gmail.com",
    whatsapp: "+91-95395-07516",
    locations: [
      { lat: 8.4004, lng: 76.9784 }, // Kovalam Beach, Thiruvananthapuram
    ],
    socialLinks: [
      { name: "Facebook", url: "https://facebook.com/indiantours" },
      { name: "Instagram", url: "https://instagram.com/indiantours" },
      { name: "Twitter", url: "https://twitter.com/indiantours" },
      { name: "Youtube", url: "https://youtube.com/indiantours" },
    ]
  };
}

// TODO: Wire form submit to submitContactEnquiry(data) API
export async function submitContactEnquiry(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // TODO: Implement actual API call to submit contact Enquiry
  console.log("Contact Enquiry submitted:", data);
}