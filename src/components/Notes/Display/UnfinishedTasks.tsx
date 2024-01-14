import type { Notes } from "@/src/types";
import Note from "./Note";

const UnfinishedTasks = ({ undoneNotes }: { undoneNotes: Notes[] }) => {
  if (undoneNotes.length <= 0) {
    return (
      <div className="w-[90%] border border-neutral-700 rounded-lg p-4 flex flex-col gap-4">
        No tasks yet!
      </div>
    );
  }

  return (
    <ul className="w-[90%] border border-neutral-700 rounded-lg p-4 flex flex-col gap-4">
      {undoneNotes.map((note, index) => {
        return <Note note={note} key={index} />;
      })}
    </ul>
  );
};

export default UnfinishedTasks;
