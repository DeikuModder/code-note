import { createClient } from "@supabase/supabase-js";

const uri = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(uri, anonKey, {
  auth: {
    flowType: "pkce",
  },
});
