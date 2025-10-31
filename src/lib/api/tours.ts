// Tours API functions
// Now wired to Supabase

import { submitTourInquiry } from '../supabase-inquiries';

/**
 * Submit a tour enquiry form
 * Maps form fields to database schema
 */
export async function submitTourEnquiry(
  tourId: string | null,
  data: {
    name: string;
    email: string;
    nationality?: string;
    contactNumber?: string;
    numberOfDays?: string;
    dateOfTravel?: string;
    hotelCategory?: string;
    numberOfRooms?: string;
    numberOfPersons?: string;
    numberOfKids?: string;
    specialComments?: string;
    message?: string;
  }
): Promise<void> {
  // Map form data to database schema
  const inquiry = {
    tour_id: tourId || null,
    name: data.name,
    email: data.email,
    contact_number: data.contactNumber || null,
    nationality: data.nationality || null,
    date_of_travel: data.dateOfTravel || null,
    number_of_people: data.numberOfPersons || null,
    number_of_kids: data.numberOfKids || null,
    number_of_rooms: data.numberOfRooms ? parseInt(data.numberOfRooms, 10) : null,
    hotel_category: data.hotelCategory || null,
    message: [
      data.message,
      data.nationality ? `Nationality: ${data.nationality}` : '',
      data.numberOfDays ? `Duration: ${data.numberOfDays} days` : '',
      data.numberOfPersons ? `Adults: ${data.numberOfPersons}` : '',
      data.numberOfKids ? `Kids: ${data.numberOfKids}` : '',
      data.numberOfRooms ? `Rooms: ${data.numberOfRooms}` : '',
      data.specialComments ? `Special Comments: ${data.specialComments}` : '',
    ]
      .filter(Boolean)
      .join('\n') || null,
  };

  const result = await submitTourInquiry(inquiry);

  if (!result.success) {
    throw new Error(result.error || 'Failed to submit enquiry');
  }
}
