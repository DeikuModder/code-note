const deleteNote = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`/api/notes/delete/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      return JSON.stringify({
        error: response.statusText,
        status: response.status,
      });
    }

    return data;
  } catch (error) {}
};

export default deleteNote;
