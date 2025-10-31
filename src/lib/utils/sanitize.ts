/**
 * HTML Sanitization Utility
 * 
 * Safely sanitizes admin-provided HTML content before rendering.
 * Prevents XSS attacks while allowing safe HTML formatting.
 */

import DOMPurify from 'dompurify';

/**
 * Configuration for DOMPurify
 * Allows safe HTML tags commonly used in tour content
 */
const SANITIZE_CONFIG: DOMPurify.Config = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'a', 'img', 'div', 'span', 'blockquote',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  ALLOWED_ATTR: [
    'href', 'target', 'rel', 'src', 'alt', 'title', 'class', 'id',
    'width', 'height', 'style', // Limited style support
  ],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_TRUSTED_TYPE: false,
};

/**
 * Sanitizes HTML content from admin/database
 * 
 * @param dirty - Raw HTML string from database
 * @returns Sanitized HTML safe for rendering
 * 
 * @example
 * ```tsx
 * const cleanHTML = sanitizeHTML(tour.overview_content);
 * <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
 * ```
 */
export function sanitizeHTML(dirty: string | null | undefined): string {
  if (!dirty) return '';
  
  try {
    return DOMPurify.sanitize(dirty, SANITIZE_CONFIG);
  } catch (error) {
    console.error('HTML sanitization failed:', error);
    return ''; // Return empty string on sanitization failure for safety
  }
}

/**
 * Sanitizes HTML and extracts plain text
 * Useful for meta descriptions, previews, etc.
 * 
 * @param html - HTML string
 * @returns Plain text content
 */
export function htmlToPlainText(html: string | null | undefined): string {
  if (!html) return '';
  
  const sanitized = sanitizeHTML(html);
  const div = document.createElement('div');
  div.innerHTML = sanitized;
  return div.textContent || div.innerText || '';
}

/**
 * Validates and sanitizes image URLs
 * Ensures URLs are from allowed domains (Supabase storage, etc.)
 * 
 * @param url - Image URL to validate
 * @returns Sanitized URL or null if invalid
 */
export function sanitizeImageURL(url: string | null | undefined): string | null {
  if (!url) {
    console.log('🚫 sanitizeImageURL: No URL provided');
    return null;
  }
  
  try {
    const parsed = new URL(url);
    
    // Allow Supabase storage, and common image CDNs
    const allowedHosts = [
      'supabase.co',
      'amazonaws.com', // S3
      'cloudinary.com',
      'imgur.com',
    ];
    
    const isAllowed = allowedHosts.some(host => parsed.hostname.includes(host));
    
    console.log('🔍 sanitizeImageURL:', {
      url,
      hostname: parsed.hostname,
      protocol: parsed.protocol,
      isAllowed,
      allowedHosts
    });
    
    if (isAllowed && (parsed.protocol === 'https:' || parsed.protocol === 'http:')) {
      console.log('✅ Image URL validated:', url);
      return url;
    }
    
    console.warn('❌ Invalid or disallowed image URL:', url);
    return null;
  } catch (error) {
    console.error('❌ Image URL validation failed:', error, 'URL:', url);
    return null;
  }
}


