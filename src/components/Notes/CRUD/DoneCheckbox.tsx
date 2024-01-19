import { useUpdateNotes } from "@/hooks/notes";
import type { Notes } from "@/src/types";
import LoadingToast from "../Display/Toasts/LoadingToast";
import SuccessToast from "../Display/Toasts/SuccessToast";

const DoneCheckbox = ({ note }: { note: Notes }) => {
  const { mutate, isPending, isSuccess } = useUpdateNotes();

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
    <>
      {isPending ? (
        <LoadingToast content="Updating note..." />
      ) : (
        <label>
          <input
            type="checkbox"
            name="noteStatus"
            defaultChecked={note.isDone}
            onClick={handleCheck}
          />
        </label>
      )}
      {isSuccess && (
        <SuccessToast
          content={`Note sucessfully ${note.isDone ? "unchecked" : "checked"}`}
        />
      )}
    </>
  );
};

export default DoneCheckbox;
