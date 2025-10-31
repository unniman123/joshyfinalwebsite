/**
 * Supabase Inquiry Form Handlers
 * 
 * Functions for submitting contact, tour inquiry, and day-out inquiry forms
 * to Supabase database. All submissions require RLS policy allowing anon inserts.
 */

import { supabase } from './supabase';
import type { ContactInquiry, TourInquiry, DayOutInquiry, QuickEnquiry } from './types/database';

/**
 * Submit a general contact inquiry
 * Inserts into contact_inquiry table
 */
export async function submitContactInquiry(
  inquiry: Omit<ContactInquiry, 'id' | 'created_at'>
): Promise<{ success: boolean; error?: string }> {
  try {
    // Client-side validation
    if (!inquiry.name || !inquiry.email || !inquiry.message) {
      return {
        success: false,
        error: 'Please fill in all required fields (name, email, message)',
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
      return {
        success: false,
        error: 'Please provide a valid email address',
      };
    }

    const { error } = await supabase
      .from('contact_inquiry')
      .insert([inquiry]);

    if (error) {
      console.error('Error submitting contact inquiry:', error);
      return {
        success: false,
        error: 'Failed to submit inquiry. Please try again or contact us directly.',
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error submitting contact inquiry:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}

/**
 * Submit a tour-specific inquiry
 * Inserts into inquiries table
 */
export async function submitTourInquiry(
  inquiry: Omit<TourInquiry, 'id' | 'created_at'>
): Promise<{ success: boolean; error?: string }> {
  try {
    // Client-side validation
    if (!inquiry.name || !inquiry.email) {
      return {
        success: false,
        error: 'Please fill in all required fields (name, email)',
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
      return {
        success: false,
        error: 'Please provide a valid email address',
      };
    }

    if (inquiry.number_of_people) {
      const numPeople = parseInt(inquiry.number_of_people, 10);
      if (isNaN(numPeople) || numPeople < 1 || numPeople > 100) {
        return {
          success: false,
          error: 'Number of people must be between 1 and 100',
        };
      }
    }

    if (inquiry.number_of_rooms && (inquiry.number_of_rooms < 1 || inquiry.number_of_rooms > 50)) {
      return {
        success: false,
        error: 'Number of rooms must be between 1 and 50',
      };
    }

    const { error } = await supabase
      .from('inquiries')
      .insert([inquiry]);

    if (error) {
      console.error('Error submitting tour inquiry:', error);
      return {
        success: false,
        error: 'Failed to submit inquiry. Please try again or contact us directly.',
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error submitting tour inquiry:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}

/**
 * Submit a day-out package inquiry
 * Inserts into day_out_inquiry table
 */
export async function submitDayOutInquiry(
  inquiry: Omit<DayOutInquiry, 'id' | 'status' | 'submitted_at'>
): Promise<{ success: boolean; error?: string }> {
  try {
    // Client-side validation
    if (!inquiry.package_id || !inquiry.name || !inquiry.mobile_no) {
      return {
        success: false,
        error: 'Please fill in all required fields (name, mobile number)',
      };
    }

    if (!inquiry.preferred_date) {
      return {
        success: false,
        error: 'Please select a preferred date',
      };
    }

    if (inquiry.number_of_people < 1 || inquiry.number_of_people > 100) {
      return {
        success: false,
        error: 'Number of people must be between 1 and 100',
      };
    }

    const { error } = await supabase
      .from('day_out_inquiry')
      .insert([inquiry]);

    if (error) {
      console.error('Error submitting day-out inquiry:', error);
      return {
        success: false,
        error: 'Failed to submit inquiry. Please try again or contact us directly.',
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error submitting day-out inquiry:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}

/**
 * Submit a quick enquiry
 * Inserts into quick_enquiries table
 */
export async function submitQuickEnquiry(
  inquiry: Omit<QuickEnquiry, 'id' | 'status' | 'submitted_at'>
): Promise<{ success: boolean; error?: string }> {
  try {
    // Client-side validation
    if (!inquiry.name || !inquiry.mobile_no) {
      return {
        success: false,
        error: 'Please fill in all required fields (name, mobile number)',
      };
    }

    const { error } = await supabase
      .from('quick_enquiries')
      .insert([inquiry]);

    if (error) {
      console.error('Error submitting quick enquiry:', error);
      return {
        success: false,
        error: 'Failed to submit inquiry. Please try again or contact us directly.',
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error submitting quick enquiry:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}


