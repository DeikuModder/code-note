import { useUpdateNotes } from "@/hooks/notes";
import type { Notes, Status } from "@/src/types";
import LoadingToast from "../Display/Toasts/LoadingToast";
import SuccessToast from "../Display/Toasts/SuccessToast";
import ErrorToast from "../Display/Toasts/ErrorToast";

const DoneCheckbox = ({ note }: { note: Notes }) => {
  const { mutate, isPending, isSuccess, isError } = useUpdateNotes();

  const handleCheck = () => {
    let newStatus: Status = note.status === "pending" ? "done" : "pending";

    mutate({
      note: { status: newStatus },
      note_id: note.id!,
    });
  };

  return (
    <>
      <label>
        <input
          type="checkbox"
          name="noteStatus"
          defaultChecked={note.status === "done" ? true : false}
          onClick={handleCheck}
          className="cursor-pointer accent-green-600 scale-125"
        />
      </label>
      {isPending && <LoadingToast content="Updating note..." />}
      {isSuccess && (
        <SuccessToast
          content={`Note sucessfully ${
            note.status === "done" ? "checked" : "unchecked"
          }`}
        />
      )}
      {isError && <ErrorToast content="Couldn't update note" />}
    </>
  );
};

export default DoneCheckbox;
