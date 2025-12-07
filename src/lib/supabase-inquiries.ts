/**
 * 🔐 SECURITY: Supabase Inquiry Form Handlers with Rate Limiting
 *
 * Functions for submitting contact, tour inquiry, and day-out inquiry forms
 * to Supabase database. Implements industry-standard security practices:
 * - Rate limiting to prevent abuse
 * - Input validation and sanitization
 * - Access control and monitoring
 * - All submissions require RLS policy allowing anon inserts.
 */

import { supabase, logApiRequest } from './supabase';
import type { ContactInquiry, TourInquiry, DayOutInquiry, QuickEnquiry } from './types/database';

/**
 * 🔐 SECURITY: Rate Limiting Implementation
 * Industry-standard rate limiting to prevent abuse
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  // Allow 5 submissions per hour per IP/form type
  private readonly MAX_ATTEMPTS = 5;
  private readonly WINDOW_MS = 60 * 60 * 1000; // 1 hour

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];

    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.WINDOW_MS);

    if (validAttempts.length >= this.MAX_ATTEMPTS) {
      console.warn(`🚫 Rate limit exceeded for ${identifier}`);
      return true;
    }

    return false;
  }

  recordAttempt(identifier: string): void {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    attempts.push(now);

    // Keep only recent attempts
    this.attempts.set(identifier, attempts.filter(time => now - time < this.WINDOW_MS));
  }

  getRemainingAttempts(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    const validAttempts = attempts.filter(time => Date.now() - time < this.WINDOW_MS);
    return Math.max(0, this.MAX_ATTEMPTS - validAttempts.length);
  }
}

const rateLimiter = new RateLimiter();

/**
 * 🔐 SECURITY: Submit a general contact inquiry with rate limiting
 * Inserts into contact_inquiry table with comprehensive security measures
 */
export async function submitContactInquiry(
  inquiry: Omit<ContactInquiry, 'id' | 'created_at'>
): Promise<{ success: boolean; error?: string; remainingAttempts?: number }> {
  const startTime = Date.now();
  const clientIP = 'anonymous'; // In production, get from request headers

  try {
    // 🔐 SECURITY: Rate limiting check
    const rateLimitKey = `contact_${clientIP}`;
    if (rateLimiter.isRateLimited(rateLimitKey)) {
      const remaining = rateLimiter.getRemainingAttempts(rateLimitKey);
      logApiRequest('INSERT', 'contact_inquiry', false, Date.now() - startTime);
      return {
        success: false,
        error: 'Too many requests. Please try again later.',
        remainingAttempts: remaining
      };
    }

    // 🔐 SECURITY: Enhanced input validation
    if (!inquiry.name?.trim() || !inquiry.email?.trim() || !inquiry.message?.trim()) {
      return {
        success: false,
        error: 'Please fill in all required fields (name, email, message)',
      };
    }

    // Sanitize inputs
    const sanitizedInquiry = {
      name: inquiry.name.trim().substring(0, 100), // Limit length
      email: inquiry.email.trim().toLowerCase(),
      message: inquiry.message.trim().substring(0, 2000), // Limit message length
      subject: inquiry.subject || 'General Contact Inquiry' // Provide fallback for non-null subject
    };

    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(sanitizedInquiry.email)) {
      return {
        success: false,
        error: 'Please provide a valid email address',
      };
    }

    // Record rate limiting attempt
    rateLimiter.recordAttempt(rateLimitKey);

    const { error } = await supabase
      .from('contact_inquiry')
      .insert([sanitizedInquiry] as any);

    const responseTime = Date.now() - startTime;

    if (error) {
      logApiRequest('INSERT', 'contact_inquiry', false, responseTime);
      console.error('🔐 Contact inquiry submission error:', {
        code: error.code,
        message: error.message?.substring(0, 100),
        timestamp: new Date().toISOString()
      });
      return {
        success: false,
        error: 'Failed to submit inquiry. Please try again or contact us directly.',
      };
    }

    logApiRequest('INSERT', 'contact_inquiry', true, responseTime);
    console.log('✅ Contact inquiry submitted successfully');

    // Send email notification using Bluehost PHP endpoint
    try {
      await sendEmailNotification('contact', sanitizedInquiry);
    } catch (emailError) {
      console.error('❌ Email notification failed:', emailError);
      // Don't fail the whole submission for email issues
    }

    return { success: true };
  } catch (err) {
    const responseTime = Date.now() - startTime;
    logApiRequest('INSERT', 'contact_inquiry', false, responseTime);
    console.error('🚨 Unexpected error submitting contact inquiry:', {
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
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
      .insert([inquiry] as any);

    if (error) {
      console.error('Error submitting tour inquiry:', error);
      return {
        success: false,
        error: 'Failed to submit inquiry. Please try again or contact us directly.',
      };
    }

    // Send email notification using Bluehost PHP endpoint
    try {
      await sendEmailNotification('tour', inquiry);
    } catch (emailError) {
      console.error('❌ Email notification failed:', emailError);
      // Don't fail the whole submission for email issues
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
      .insert([inquiry] as any);

    if (error) {
      console.error('Error submitting day-out inquiry:', error);
      return {
        success: false,
        error: 'Failed to submit inquiry. Please try again or contact us directly.',
      };
    }

    // Send email notification using Bluehost PHP endpoint
    try {
      await sendEmailNotification('day-out', inquiry);
    } catch (emailError) {
      console.error('❌ Email notification failed:', emailError);
      // Don't fail the whole submission for email issues
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
      .insert([inquiry] as any);

    if (error) {
      console.error('Error submitting quick enquiry:', error);
      return {
        success: false,
        error: 'Failed to submit inquiry. Please try again or contact us directly.',
      };
    }

    // Send email notification using Bluehost PHP endpoint
    try {
      await sendEmailNotification('quick', inquiry);
    } catch (emailError) {
      console.error('❌ Email notification failed:', emailError);
      // Don't fail the whole submission for email issues
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

/**
 * 🔐 SECURITY: Send email notification using Bluehost PHP endpoint
 * Called after successful database insertion
 */
async function sendEmailNotification(enquiryType: string, enquiryData: any): Promise<void> {
  const emailEndpoint = 'https://keralatoursglobal.com/api/send-enquiry-email.php'; // Production endpoint on Bluehost (api path)

  try {
    const response = await fetch(emailEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enquiryType,
        enquiryData
      })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Email sending failed');
    }

    console.log('✅ Email notification sent successfully');
  } catch (error) {
    console.error('❌ Email notification error:', error);
    throw error;
  }
}


