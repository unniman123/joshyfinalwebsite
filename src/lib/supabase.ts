/**
 * Supabase Client Configuration
 * 
 * Initializes the Supabase client with environment variables.
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to be set.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.'
  );
}

/**
 * Supabase client instance
 * Use this throughout the application for database queries
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Public website doesn't need session persistence
    autoRefreshToken: false,
  },
});

/**
 * Helper to verify Supabase connection
 * Useful for debugging connection issues
 */
export async function verifySupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('vw_published_tours').select('count').limit(1);
    return !error;
  } catch (err) {
    console.error('Supabase connection verification failed:', err);
    return false;
  }
}


