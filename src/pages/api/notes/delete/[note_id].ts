import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const prerender = false;

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { note_id } = params;

    if (!note_id) {
      return new Response(JSON.stringify({ error: "Couldn't get note's id" }), {
        status: 404,
      });
    }

    const { error } = await supabase.from("Notes").delete().eq("id", note_id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Succesfully deleted", id: note_id }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error happened" }), {
      status: 500,
    });
  }
};
