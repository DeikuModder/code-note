import { useState } from "react";
import type { Notes } from "@/src/types";
import CodeSnippets from "./CodeSnippets";
import addOrPush from "@/utils/addOrPush";
import { useUpdateNotes } from "@/hooks/notes";
import WarningToast from "./Toasts/WarningToast";
import SuccessToast from "./Toasts/SuccessToast";
import ErrorToast from "./Toasts/ErrorToast";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoteCodeSnippets = ({ note }: { note: Notes }) => {
  const [code, setCode] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const { mutate, isSuccess, isError } = useUpdateNotes();

  if (warningMessage !== "") {
    setTimeout(() => {
      setWarningMessage("");
    }, 2000);
  }

  const handleAdd = () => {
    const result = addOrPush(note.codeSnippets, code);

    "message" in result
      ? setWarningMessage(result.message)
      : mutate(
          { note: { codeSnippets: result }, note_id: note.id! },
          {
            onSettled: () => {
              setCode("");
            },
          }
        );
  };

  return (
    <div className="w-full p-8 border border-neutral-700 rounded-xl flex flex-col gap-4">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-1"
      ></textarea>
      <button
        onClick={handleAdd}
        className="bg-neutral-900 rounded-xl p-2 text-slate-200 text-lg font-bold transition-all hover:scale-105"
      >
        <FontAwesomeIcon icon={faPlusCircle} /> Add code snippet
      </button>
      {note.codeSnippets && note.codeSnippets.length > 0 ? (
        <CodeSnippets code={note.codeSnippets[note.codeSnippets.length - 1]} />
      ) : (
        <p>No code snippets yet</p>
      )}
      {warningMessage && <WarningToast content={warningMessage} />}
      {isSuccess && <SuccessToast content="Successfully added snippet" />}
      {isError && <ErrorToast content="Couldn't add snippet" />}
    </div>
  );
};

export default NoteCodeSnippets;
