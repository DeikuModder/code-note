import { useState } from "react";
import { useDeleteNotes } from "../hooks/notes";
import type { Notes } from "../types";
import NoteCodeSnippets from "./NoteCodeSnippets";
import NoteDocums from "./NoteDocums";
import NoteVideos from "./NoteVideos";
import PriorityColor from "./PriorityColor";

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
      <div className="w-[70%] h-[25%] bg-slate-200 rounded-lg text-center flex flex-col justify-between">
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

const NoteDetails: React.FC<Props> = ({ onClose, note }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="w-full h-[100vh] bg-[#00000070] absolute top-0 left-0 flex flex-col items-center justify-center">
      <div className="w-[90%] h-[80%] bg-slate-200 rounded-lg overflow-auto">
        <div className="w-full flex flex-row justify-end">
          <button
            onClick={onClose}
            className="text-xl font-bold leading-none text-gray-700 hover:text-black focus:outline-none"
          >
            X
          </button>
        </div>

        <div className="w-full grid grid-cols-2 gap-10 items-center justify-center p-8">
          <h3 className="text-lg font-medium tracking-wide text-gray-900">
            {note.title}
          </h3>
          <div className="flex gap-4 text-lg font-medium tracking-wide text-gray-900">
            Priority: <PriorityColor priority={note.priority} />
          </div>
        </div>

        <p className="p-8 text-lg font-medium tracking-wide text-gray-900">
          Deadline: {note.deadline ? note.deadline : "No deadline"}
        </p>

        <div className="w-full p-8 text-lg font-medium tracking-wide text-gray-900">
          Description:
          <p>{note.description}</p>
        </div>

        <NoteDocums note={note} />
        <NoteVideos note={note} />
        <NoteCodeSnippets note={note} />

        <button onClick={() => setOpenDeleteModal(true)}>Delete</button>
      </div>
      {openDeleteModal && (
        <DeleteModal onClose={() => setOpenDeleteModal(false)} note={note} />
      )}
    </div>
  );
};

export default NoteDetails;
