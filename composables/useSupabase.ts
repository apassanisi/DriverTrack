import { createClient } from '@supabase/supabase-js';
import { useRuntimeConfig } from '#app';

let supabase;

export const useSupabase = () => {
  if (!supabase) {
    const config = useRuntimeConfig();
    const supabaseUrl = config.public.supabaseUrl;
    const supabaseKey = config.public.supabaseKey;
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
};
