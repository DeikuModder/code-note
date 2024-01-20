import { useNotes } from "@/hooks/notes";
import UnfinishedTasks from "./UnfinishedTasks";
import { useState } from "react";
import FinishedTasks from "./FinishedTasks";
import CreateNote from "../CRUD/CreateNote";

const DisplayNotes = () => {
  const [actualList, setActualList] = useState("undone");
  const { isLoading, isError, data: notes = [] } = useNotes();
  const undoneTasks = notes.filter((note) => !note.isDone);
  const doneTasks = notes.filter((note) => note.isDone);

  if (isError) {
    return <p>An error happened</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (notes?.length <= 0) {
    return <p>No notes created yet</p>;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-[90%]">
          <button
            className={`w-[50%] ${
              actualList === "undone" ? "border-b-4 border-orange-600" : null
            }`}
            onClick={() => setActualList("undone")}
          >
            Undone ({undoneTasks.length})
          </button>
          <button
            className={`w-[50%] ${
              actualList === "done" ? "border-b-4 border-green-600" : null
            }`}
            onClick={() => setActualList("done")}
          >
            Done ({doneTasks.length})
          </button>
        </div>
        {actualList === "undone" ? (
          <UnfinishedTasks undoneNotes={undoneTasks} />
        ) : (
          <FinishedTasks doneNotes={doneTasks} />
        )}
      </div>
    </>
  );
};

export default DisplayNotes;
