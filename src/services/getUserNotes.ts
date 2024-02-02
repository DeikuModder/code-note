const getUserNotes = async (userID: string) => {
  try {
    const response = await fetch(`/api/notes/get/${userID}`);

    const data = await response.json();

    if (!response.ok) {
      return JSON.stringify({
        error: response.statusText,
        status: response.status,
      });
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getUserNotes;
