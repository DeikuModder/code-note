import type { APIRoute } from "astro";
import { supabase } from "../../../../lib/supabase";

export const prerender = false;

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const note = await request.json();
    const { note_id } = params;

    if (!note || Object.keys(note).length <= 0) {
      return new Response(JSON.stringify({ error: "Invalid object" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("Notes")
      .update(note)
      .eq("id", note_id)
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error happened" }), {
      status: 500,
    });
  }
};
