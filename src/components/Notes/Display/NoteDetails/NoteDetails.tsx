import { Suspense, lazy, useState } from "react";
import type { Notes } from "@/src/types";
import NoteCodeSnippets from "../NoteCodeSnippets";
import NoteDocums from "../NoteDocums";
import NoteVideos from "../NoteVideos";
import PriorityColor from "../../PriorityColor";
const ListView = lazy(() => import("../ListView"));
import { useFormatedDate } from "@/hooks/date";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingToast from "../Toasts/LoadingToast";
import AISuggestions from "../AIModal/AISuggestions";
import "./styles.css";

interface Props {
  onClose: () => void;
  note: Notes;
}

const NoteDetails: React.FC<Props> = ({ onClose, note }) => {
  const [openList, setOpenList] = useState(false);

  const formatedDate = note.deadline && useFormatedDate(note.deadline);

  return (
    <div className="w-full h-[100vh] bg-[#00000070] absolute top-0 left-0 flex flex-col items-center justify-center">
      <div className="modalContainer w-[90%] h-[80%] bg-slate-200 rounded-lg overflow-auto max-w-[500px] md:fixed md:top-0 md:right-0 md:h-screen md:rounded-none">
        <div className="w-full flex flex-row justify-end">
          <button
            onClick={onClose}
            className="text-2xl font-bold leading-none text-gray-700 hover:text-black focus:outline-none"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="w-full p-2 flex flex-col gap-4 items-center justify-center">
          <h3 className="text-start text-5xl font-bold w-[90%]">
            {note.title}
          </h3>

          <AISuggestions
            taskTitle={note.title}
            prompt={`I have the following task: ${note.title}, tell me what would be the best way to approach this task, but please summarize it in less than 150 words total`}
            message="Ask AI the best way to approach this task:"
          />

          <div className="w-full grid grid-cols-2 grid-rows-2 gap-10 items-center justify-center p-8 text-lg font-medium tracking-wide text-gray-900">
            <div className="flex gap-4 ">
              Priority: <PriorityColor priority={note.priority} />
            </div>
            <div>Deadline: {formatedDate ?? "No deadline"}</div>
            <div>Status: {note.status}</div>
          </div>

          <div className="w-full p-8 text-lg font-medium tracking-wide text-gray-900">
            Description:
            <p>{note.description ? note.description : "No description"}</p>
          </div>

          <NoteDocums note={note} />
          <NoteVideos note={note} />
          <NoteCodeSnippets note={note} />
          <button
            onClick={() => setOpenList(true)}
            className="bg-neutral-900 rounded-xl p-2 text-slate-200 text-xl font-bold transition-all hover:scale-105"
          >
            View all...
          </button>
          {openList && (
            <Suspense fallback={<LoadingToast content="Loading elements..." />}>
              <ListView onClose={() => setOpenList(false)} note={note} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
