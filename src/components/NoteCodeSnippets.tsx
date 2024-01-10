import { useState } from "react";
import type { Notes } from "../types";
import CodeSnippets from "./CodeSnippets";
import addOrPush from "../utils/addOrPush";
import { useUpdateNotes } from "../hooks/notes";

const NoteCodeSnippets = ({ note }: { note: Notes }) => {
  const [code, setCode] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const { mutate } = useUpdateNotes();

  const handleAdd = () => {
    const result = addOrPush(note.codeSnippets, code);

    "message" in result
      ? setWarningMessage(result.message)
      : mutate(
          { note: { codeSnippets: result }, note_id: note.id! },
          {
            onSuccess: () => {
              alert("Note updated succesfully");
            },
            onError: () => {
              alert("Couldn't update note");
            },
            onSettled: () => {
              setCode("");
            },
          }
        );
  };

  return (
    <div className="w-full p-8">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full"
      ></textarea>
      <button onClick={handleAdd}>Add</button>
      {note.codeSnippets && note.codeSnippets.length > 0 ? (
        <CodeSnippets code={note.codeSnippets[note.codeSnippets.length - 1]} />
      ) : (
        <p>No code snippets yet</p>
      )}
      {warningMessage && <p>{warningMessage}</p>}
    </div>
  );
};

export default NoteCodeSnippets;
