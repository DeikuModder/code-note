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
      <li className="w-full border border-neutral-700 rounded-lg p-4 flex">
        <div className="w-[50%]">
          <p>{note.title}</p>
          <PriorityColor priority={note.priority} />
        </div>

        <div className="w-[50%] flex justify-end">
          <p>{note.metadata?.deadline?.toString() ?? null}</p>
        </div>
        <button onClick={() => setOpenDetails(true)}>Expand</button>
      </li>
      {openDetails && (
        <Suspense>
          <NoteDetails onClose={() => setOpenDetails(false)} note={note} />
        </Suspense>
      )}
    </>
  );
};

export default Note;
