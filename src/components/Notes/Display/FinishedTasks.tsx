import type { Notes } from "@/src/types";
import Note from "./Note";

const FinishedTasks = ({ doneNotes }: { doneNotes: Notes[] }) => {
  if (doneNotes.length <= 0) {
    return (
      <div className="w-[90%] border border-neutral-700 rounded-lg p-4 flex flex-col gap-4">
        No finished tasks yet!
      </div>
    );
  }

  return (
    <ul className="w-[90%] border border-neutral-700 rounded-lg p-4 flex flex-col gap-4">
      {doneNotes.map((note, index) => {
        return <Note note={note} key={index} />;
      })}
    </ul>
  );
};

export default FinishedTasks;
