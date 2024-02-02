import { createClient } from "@supabase/supabase-js";

const uri = import.meta.env.SUPABASE_URL;
const anonKey = import.meta.env.SUPABASE_ANON_KEY;

export const supabase = createClient(uri, anonKey, {
  auth: {
    flowType: "pkce",
  },
});
