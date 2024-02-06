import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";
import NoteClass from "@/lib/NoteClass";
import type { BasicNote, Notes } from "@/src/types";
import Note from "@/schemas/Note";
import { connectDB } from "@/utils/connectDB";

export const POST: APIRoute = async ({ request }) => {
  try {
    connectDB();

    const noteData = (await request.json()) as BasicNote;

    if (!noteData.title || !noteData.priority || !noteData.userID) {
      return new Response("Missing title or priority", { status: 400 });
    }

    const note = new NoteClass(
      noteData.title,
      noteData.priority,
      noteData.userID,
      noteData.description,
      noteData.deadline
    );

    const newNote = new Note(note);

    const result = await newNote.save();

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
};
