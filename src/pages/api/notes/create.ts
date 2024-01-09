import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import Note from "../../../lib/NoteClass";
import type { Notes } from "../../../types";

export const POST: APIRoute = async ({ request }) => {
  try {
    const noteData = (await request.json()) as Notes;

    const userData = await supabase.auth.getUser();

    //validations
    if (!noteData.title || !noteData.priority) {
      return new Response("Missing title or priority", { status: 400 });
    }

    if (!userData.data.user) {
      return new Response("No authenitcated user", { status: 400 });
    }

    const note = new Note(
      noteData.title,
      noteData.priority,
      userData.data.user.id,
      noteData.description,
      noteData.deadline
    );

    const { data, error } = await supabase
      .from("Notes")
      .insert([note])
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
};
