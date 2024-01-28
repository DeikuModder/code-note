import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.SUPABASE_URL as string;
const anonKey = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient(uri, anonKey, {
  auth: {
    flowType: "pkce",
  },
});
