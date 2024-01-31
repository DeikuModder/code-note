import { useNotes } from "@/hooks/notes";
import { useState } from "react";
import ListNotes from "./ListNotes";
import LoadingLists from "./LoadingList/LoadingLists";

const DisplayNotes = () => {
  const [actualList, setActualList] = useState("undone");
  const { isLoading, isError, data: notes = [] } = useNotes();
  const undoneTasks = notes.filter((note) => note.status === "pending");
  const doneTasks = notes.filter((note) => note.status === "done");
  const failedTasks = notes.filter((note) => note.status === "failed");

  if (isError) {
    return (
      <div className="w-[90%] border border-neutral-700 rounded-lg p-4 flex flex-col gap-4 min-h-80 max-w-[500px]">
        <p className="text-2xl w-full text-center">An error happened</p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingLists />;
  }

  if (notes?.length <= 0) {
    return (
      <div className="w-[90%] border border-neutral-700 rounded-lg p-4 flex flex-col gap-4 min-h-80 max-w-[500px]">
        <p className="text-2xl w-full text-center">No notes created yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-[90%] max-w-[500px]">
          <button
            className={`w-[33%] ${
              actualList === "undone"
                ? "border-b-4 border-orange-600"
                : "hover:border-b-4 hover:border-orange-200"
            }`}
            onClick={() => setActualList("undone")}
          >
            Undone ({undoneTasks.length})
          </button>
          <button
            className={`w-[33%] ${
              actualList === "done"
                ? "border-b-4 border-green-600"
                : "hover:border-b-4 hover:border-green-200"
            }`}
            onClick={() => setActualList("done")}
          >
            Done ({doneTasks.length})
          </button>
          <button
            className={`w-[33%] ${
              actualList === "failed"
                ? "border-b-4 border-red-700"
                : "hover:border-b-4 hover:border-red-200"
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
