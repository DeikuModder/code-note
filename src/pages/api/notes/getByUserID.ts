import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async () => {
  try {
    const userData = await supabase.auth.getUser();

    const { data, error } = await supabase.from("Notes").select("*");

    if (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
};
