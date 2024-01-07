import type { DefaultNote } from "../types";

const postNote = async (note: DefaultNote) => {
  try {
    const response = await fetch("/api/notes/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    const data = await response.json();

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

export default postNote;
