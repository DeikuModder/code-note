import type { Notes } from "@/src/types";
import Note from "./Note";

const ListNotes = ({
  notes,
  fallbackMessage,
}: {
  notes: Notes[];
  fallbackMessage: string;
}) => {
  return (
    <ul className="w-[90%] border border-neutral-700 rounded-lg p-4 flex flex-col gap-4 min-h-80 max-w-[500px] max-h-[450px] overflow-auto">
      {notes.length <= 0 ? (
        <p className="text-2xl w-full text-center">{fallbackMessage}</p>
      ) : (
        notes.map((note, index) => {
          return <Note note={note} key={index} />;
        })
      )}
    </ul>
  );
};

export default ListNotes;
