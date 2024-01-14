import { useDeleteNotes } from "@/hooks/notes";
import type { Notes } from "@/src/types";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Props {
  onClose: () => void;
  note: Notes;
}

const DeleteModal: React.FC<Props> = ({ onClose, note }) => {
  const { mutate } = useDeleteNotes();

  const handleDelete = (id: string) => {
    mutate(
      { id },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {
          alert("Failed to delete the note");
        },
      }
    );
  };

  return (
    <div className="w-full h-[100vh] bg-[#00000070] absolute top-0 left-0 flex flex-col items-center justify-center">
      <div className="w-[70%] bg-slate-200 rounded-lg text-center flex flex-col justify-between">
        <div className=" p-6">
          <p>Are you sure you want to delete this note?</p>
          <p>(this action is irreversible)</p>
        </div>

        <div className="w-full flex flex-row justify-end items-end">
          <button
            onClick={() => handleDelete(note.id!)}
            className="w-[50%] text-xl font-bold leading-none bg-red-700 p-2 rounded-es-lg text-gray-100 hover:text-white focus:outline-none"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="w-[50%] text-xl font-bold leading-none p-2 text-gray-700 hover:text-black focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteNote: React.FC<Pick<Props, "note">> = ({ note }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <button onClick={() => setOpenDeleteModal(true)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {openDeleteModal && (
        <DeleteModal onClose={() => setOpenDeleteModal(false)} note={note} />
      )}
    </>
  );
};

export default DeleteNote;
