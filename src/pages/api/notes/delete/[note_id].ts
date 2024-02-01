import Note from "@/schemas/Note";
import { connectDB } from "@/utils/connectDB";
import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ params }) => {
  try {
    connectDB();

    const { note_id } = params;

    if (!note_id) {
      return new Response(JSON.stringify({ error: "Couldn't get note's id" }), {
        status: 404,
      });
    }

    const deletedNote = await Note.findByIdAndDelete(note_id);

    if (deletedNote) {
      return new Response(
        JSON.stringify({ message: "Succesfully deleted", id: note_id }),
        {
          status: 200,
        }
      );
    }

    return new Response(JSON.stringify({ error: "Document doesn't exist" }), {
      status: 404,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error happened" }), {
      status: 500,
    });
  }
};
