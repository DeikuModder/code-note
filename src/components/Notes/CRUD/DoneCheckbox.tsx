import { useUpdateNotes } from "@/hooks/notes";
import type { Notes } from "@/src/types";

const DoneCheckbox = ({ note }: { note: Notes }) => {
  const { mutate } = useUpdateNotes();

  const handleCheck = () => {
    mutate(
      { note: { isDone: !note.isDone }, note_id: note.id! },
      {
        onError: () => {
          alert("Failed to update the note");
        },
      }
    );
  };

  return (
    <label>
      <input
        type="checkbox"
        name="noteStatus"
        defaultChecked={note.isDone}
        onClick={handleCheck}
      />
    </label>
  );
};

export default DoneCheckbox;
