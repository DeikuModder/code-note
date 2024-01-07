import Note from "./Note";
import { useNotes } from "../hooks/notes";

const DisplayNotes = () => {
  const { isLoading, isError, data: notes = [] } = useNotes();

  if (isError) {
    return <p>An error happened</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (notes?.length <= 0) {
    return <p>No notes created yet</p>;
  }

  return (
    <ul className="w-[90%] border border-neutral-700 rounded-lg p-4 flex flex-col gap-4">
      {notes.map((note, index) => {
        return <Note note={note} key={index} />;
      })}
    </ul>
  );
};

export default DisplayNotes;
