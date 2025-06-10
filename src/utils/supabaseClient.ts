import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('VITE_SUPABASE_URL is:', import.meta.env.VITE_SUPABASE_URL); // Log the value
  throw new Error('supabaseUrl is required. Make sure VITE_SUPABASE_URL is set in your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
