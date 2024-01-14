import type { Notes } from "@/src/types";

interface Params {
  note: Partial<Notes>;
  note_id: string;
}

const updateNote = async (params: Params) => {
  try {
    const response = await fetch(`/api/notes/update/${params.note_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.note),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return JSON.stringify({
        error: response.statusText,
        status: response.status,
      });
    }

    return data;
  } catch (error) {
    return JSON.stringify({ error: error });
  }
};

export default updateNote;
