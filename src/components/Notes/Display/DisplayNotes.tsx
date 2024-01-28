import { useNotes } from "@/hooks/notes";
import { useState } from "react";
import ListNotes from "./ListNotes";
import WarningToast from "./Toasts/WarningToast";
import LoadingToast from "./Toasts/LoadingToast";

const DisplayNotes = () => {
  const [actualList, setActualList] = useState("undone");
  const { isLoading, isError, data: notes = [] } = useNotes();
  const undoneTasks = notes.filter((note) => note.status === "pending");
  const doneTasks = notes.filter((note) => note.status === "done");
  const failedTasks = notes.filter((note) => note.status === "failed");

  if (isError) {
    return <p>An error happened</p>;
  }

  if (isLoading) {
    return <LoadingToast content="Loading notes..." />;
  }

  if (notes?.length <= 0) {
    return <p>No notes created yet</p>;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-[90%] max-w-[500px]">
          <button
            className={`w-[33%] ${
              actualList === "undone" ? "border-b-4 border-orange-600" : null
            }`}
            onClick={() => setActualList("undone")}
          >
            Undone ({undoneTasks.length})
          </button>
          <button
            className={`w-[33%] ${
              actualList === "done" ? "border-b-4 border-green-600" : null
            }`}
            onClick={() => setActualList("done")}
          >
            Done ({doneTasks.length})
          </button>
          <button
            className={`w-[33%] ${
              actualList === "failed" ? "border-b-4 border-red-700" : null
            }`}
            onClick={() => setActualList("failed")}
          >
            Failed ({failedTasks.length})
          </button>
        </div>
        {actualList === "done" ? (
          <ListNotes
            notes={doneTasks}
            fallbackMessage="No finished tasks yet"
          />
        ) : actualList === "failed" ? (
          <ListNotes
            notes={failedTasks}
            fallbackMessage="No failed tasks yet"
          />
        ) : (
          <ListNotes
            notes={undoneTasks}
            fallbackMessage="No tasks created yet"
          />
        )}
      </div>
    </>
  );
};

export default DisplayNotes;
