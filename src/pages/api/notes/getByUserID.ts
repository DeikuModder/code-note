import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";
import type { Notes } from "@/src/types";
import Note from "@/schemas/Note";
import { connectDB } from "@/utils/connectDB";

export const GET: APIRoute = async () => {
  try {
    connectDB();

    const userData = await supabase.auth.getSession();

    const notes: Notes[] | undefined = await Note.find({
      userID: userData.data.session?.user.id,
    });

    return new Response(JSON.stringify(notes), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
};
