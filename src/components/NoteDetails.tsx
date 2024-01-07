import type { Notes } from "../types";
import PriorityColor from "./PriorityColor";

interface Props {
  onClose: () => void;
  note: Notes;
}

const NoteDetails: React.FC<Props> = ({ onClose, note }) => {
  return (
    <div className="w-full h-[100vh] bg-[#00000070] absolute top-0 left-0 flex flex-col items-center justify-center">
      <div className="w-[80%] h-[60%] bg-slate-200 rounded-lg overflow-auto">
        <div className="w-full flex flex-row justify-end">
          <button
            onClick={onClose}
            className="text-xl font-bold leading-none text-gray-700 hover:text-black focus:outline-none"
          >
            X
          </button>
        </div>

        <div className="w-full grid grid-cols-2 grid-rows-2 gap-16 items-center justify-center p-8">
          <h3 className="text-left text-lg font-medium tracking-wide text-gray-900">
            {note.title}
          </h3>
          <PriorityColor priority={note.priority} />
          <p className="text-left text-lg font-medium tracking-wide text-gray-900">
            {note.metadata?.deadline?.toString() ?? "No deadline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
