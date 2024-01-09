import type React from "react";
import type { Notes } from "../types";
import PriorityColor from "./PriorityColor";
import { Suspense, lazy, useState } from "react";
const NoteDetails = lazy(() => import("./NoteDetails"));

interface Props {
  note: Notes;
}

const Note: React.FC<Props> = ({ note }) => {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenDetails(true)}
        className="w-full border border-neutral-700 rounded-lg p-4 flex"
      >
        <div className="w-[50%] text-start">
          <p>{note.title}</p>
          <PriorityColor priority={note.priority} />
        </div>

        <div className="w-[50%] text-end flex justify-end">
          <p>{note.deadline ?? null}</p>
        </div>
      </button>
      {openDetails && (
        <Suspense>
          <NoteDetails onClose={() => setOpenDetails(false)} note={note} />
        </Suspense>
      )}
    </>
  );
};

export default Note;
