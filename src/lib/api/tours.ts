// Tours API functions

// TODO: Wire to Supabase on integration
export async function submitTourEnquiry(
  tourId: string,
  data: {
    name: string;
    email: string;
    nationality: string;
    contactNumber: string;
    numberOfDays: string;
    dateOfTravel: string;
    hotelCategory: string;
    numberOfRooms: string;
    specialComments: string;
    message: string;
  }
): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // TODO: Map new form fields to Supabase columns on integration
  console.log("Quick Enquiry submitted:", { tourId, ...data });
}