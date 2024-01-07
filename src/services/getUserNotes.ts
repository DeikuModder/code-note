const getUserNotes = async () => {
  try {
    const response = await fetch("/api/notes/getByUserID");

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

export default getUserNotes;
