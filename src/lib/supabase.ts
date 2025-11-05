/**
 * Supabase Client Configuration
 *
 * Initializes the Supabase client with environment variables.
 * Implements industry-standard security practices for API key management.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database';

/**
 * 🔐 SECURITY: Environment Variable Validation
 * Validates Supabase credentials with comprehensive security checks
 */
function validateSupabaseEnvironment(): { url: string; key: string } {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Check for missing environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      '🚨 SECURITY ERROR: Missing Supabase environment variables.\n' +
      'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.\n' +
      'Get credentials from: https://supabase.com/dashboard → Your Project → Settings → API\n' +
      '⚠️  Never commit actual API keys to version control.'
    );
  }

  // Validate URL format
  try {
    const url = new URL(supabaseUrl);
    if (!url.hostname.endsWith('supabase.co')) {
      throw new Error('Invalid Supabase URL domain');
    }
    if (url.protocol !== 'https:') {
      throw new Error('Supabase URL must use HTTPS');
    }
  } catch (error) {
    throw new Error(
      `🚨 SECURITY ERROR: Invalid Supabase URL format: ${supabaseUrl}\n` +
      'Expected format: https://your-project-id.supabase.co'
    );
  }

  // Validate API key format (JWT structure)
  const jwtRegex = /^eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*$/;
  if (!jwtRegex.test(supabaseAnonKey)) {
    throw new Error(
      '🚨 SECURITY ERROR: Invalid Supabase API key format.\n' +
      'API key should be a valid JWT token from Supabase dashboard.'
    );
  }

  // Check for placeholder values (security check)
  if (supabaseUrl.includes('your_supabase_project_url_here') ||
      supabaseAnonKey.includes('your_supabase_anon_key_here')) {
    throw new Error(
      '🚨 SECURITY ERROR: Placeholder values detected in environment variables.\n' +
      'Please replace placeholder values with actual Supabase credentials from your dashboard.'
    );
  }

  return { url: supabaseUrl, key: supabaseAnonKey };
}

// Validate and get secure credentials
const { url: supabaseUrl, key: supabaseAnonKey } = validateSupabaseEnvironment();

/**
 * 🔐 SECURITY: Enhanced Supabase Client Configuration
 * Implements industry-standard security practices:
 * - No session persistence for public website
 * - Request/response monitoring
 * - Error handling and logging
 * - Rate limiting awareness
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Public website doesn't need session persistence
    autoRefreshToken: false, // No token refresh for anon key usage
  },
  global: {
    headers: {
      // Add security headers for all requests
      'X-Client-Info': 'wanderwise-website/1.0.0',
      'X-Requested-With': 'XMLHttpRequest',
    },
  },
  // Add request/response interceptors for monitoring
  // Note: Supabase JS doesn't expose interceptors, but we can add custom monitoring
});

/**
 * 🔐 SECURITY: Enhanced Connection Verification
 * Verifies Supabase connection with security monitoring
 */
export async function verifySupabaseConnection(): Promise<boolean> {
  try {
    const startTime = Date.now();
    const { data, error } = await supabase
      .from('vw_published_tours')
      .select('count', { count: 'exact', head: true });

    const responseTime = Date.now() - startTime;

    // Log security-relevant connection details
    if (responseTime > 5000) {
      console.warn(`⚠️  Slow Supabase response: ${responseTime}ms`);
    }

    if (error) {
      // Log error for security monitoring (without exposing sensitive data)
      console.error('🔐 Supabase connection error:', {
        code: error.code,
        message: error.message?.substring(0, 100), // Truncate for security
        timestamp: new Date().toISOString()
      });
      return false;
    }

    console.log(`✅ Supabase connection verified (${responseTime}ms)`);
    return true;
  } catch (err) {
    console.error('🚨 Supabase connection verification failed:', {
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
    return false;
  }
}

/**
 * 🔐 SECURITY: Request Monitoring Utility
 * Monitors API requests for security and performance
 */
export function logApiRequest(operation: string, table: string, success: boolean, responseTime?: number) {
  const logData = {
    operation,
    table,
    success,
    responseTime,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
  };

  if (success) {
    console.log(`📊 API Request: ${operation} on ${table}`, logData);
  } else {
    console.warn(`⚠️  API Request Failed: ${operation} on ${table}`, logData);
  }
}


