import { useDeleteNotes } from "@/hooks/notes";
import type { Notes } from "@/src/types";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SuccessToast from "../Display/Toasts/SuccessToast";
import ErrorToast from "../Display/Toasts/ErrorToast";
import LoadingToast from "../Display/Toasts/LoadingToast";
import AskToast from "../Display/Toasts/AskToast";

interface Props {
  note: Notes;
}

const DeleteNote: React.FC<Props> = ({ note }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutate, isPending, isSuccess, isError } = useDeleteNotes();

  const handleDelete = (id: string) => {
    mutate(
      { id },
      {
        onError: (err) => {
          console.log(err);
        },
        onSettled: () => {
          setOpenDeleteModal(false);
        },
      }
    );
  };

  return (
    <>
      <button onClick={() => setOpenDeleteModal(true)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {openDeleteModal && (
        <AskToast
          content="Are you sure you want to delete this note?"
          fn={() => {
            handleDelete(note.id!);
          }}
        />
      )}
      {isPending && <LoadingToast content="Deleting note..." />}
      {isError && <ErrorToast content="Couldn't delete note" />}
      {isSuccess && <SuccessToast content="Note deleted succesfully" />}
    </>
  );
};

export default DeleteNote;
