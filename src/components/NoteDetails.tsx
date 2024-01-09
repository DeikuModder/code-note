import { useDeleteNotes } from "../hooks/notes";
import type { Notes } from "../types";
import NoteDocums from "./NoteDocums";
import NoteVideos from "./NoteVideos";
import PriorityColor from "./PriorityColor";

interface Props {
  onClose: () => void;
  note: Notes;
}

const NoteDetails: React.FC<Props> = ({ onClose, note }) => {
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
          Deadline: {note.deadline ?? "No deadline"}
        </p>

        <div className="w-full p-8 text-lg font-medium tracking-wide text-gray-900">
          Description:
          <p>{note.description}</p>
        </div>

        <NoteDocums note={note} />
        <NoteVideos note={note} />

        <button onClick={() => handleDelete(note.id!)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteDetails;
