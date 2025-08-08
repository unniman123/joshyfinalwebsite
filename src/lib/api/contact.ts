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
    address: "123 Travel Street, Tourism District, New Delhi, India 110001",
    phone: "+91 11 2345 6789",
    email: "info@indiantours.com",
    whatsapp: "+91 98765 43210",
    locations: [
      { lat: 28.6139, lng: 77.2090 }, // New Delhi
    ],
    socialLinks: [
      { name: "Facebook", url: "https://facebook.com/indiantours" },
      { name: "Instagram", url: "https://instagram.com/indiantours" },
      { name: "Twitter", url: "https://twitter.com/indiantours" },
      { name: "Youtube", url: "https://youtube.com/indiantours" },
    ]
  };
}

// TODO: Wire form submit to submitContactInquiry(data) API
export async function submitContactInquiry(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // TODO: Implement actual API call to submit contact inquiry
  console.log("Contact inquiry submitted:", data);
}