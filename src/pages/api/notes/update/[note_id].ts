import type { APIRoute } from "astro";
import type { Notes } from "@/src/types";
import Note from "@/schemas/Note";

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const note = (await request.json()) as Partial<Notes>;
    const { note_id } = params;

    if (!note || Object.keys(note).length <= 0) {
      return new Response(JSON.stringify({ error: "Invalid object" }), {
        status: 400,
      });
    }

    const updateNote = await Note.findByIdAndUpdate(note_id, note, {
      new: true,
      runValidators: true,
    });

    if (updateNote) {
      return new Response(JSON.stringify(updateNote), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Couldn't update note" }), {
      status: 400,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error happened" }), {
      status: 500,
    });
  }
};
