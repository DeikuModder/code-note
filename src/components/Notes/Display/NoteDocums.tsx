import { useState } from "react";
import type { Notes } from "@/src/types";
import { useUpdateNotes } from "@/hooks/notes";
import addOrPush from "@/utils/addOrPush";
import DocumLinks from "./DocumLinks";
import SuccessToast from "./Toasts/SuccessToast";
import ErrorToast from "./Toasts/ErrorToast";
import WarningToast from "./Toasts/WarningToast";

const NoteDocums = ({ note }: { note: Notes }) => {
  const [links, setLinks] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const { mutate, isSuccess, isError } = useUpdateNotes();

  if (warningMessage !== "") {
    setTimeout(() => {
      setWarningMessage("");
    }, 2000);
  }

  const handleAdd = () => {
    const result = addOrPush(note.documLinks, links);

    "message" in result
      ? setWarningMessage(result.message)
      : mutate(
          { note: { documLinks: result }, note_id: note.id! },
          {
            onSettled: () => {
              setLinks("");
            },
          }
        );
  };

  return (
    <div className="w-full p-8">
      <textarea
        value={links}
        onChange={(e) => setLinks(e.target.value)}
        className="w-full"
      ></textarea>
      {warningMessage && <WarningToast content={warningMessage} />}
      <button onClick={handleAdd}>Add</button>
      {note.documLinks && note.documLinks.length > 0 ? (
        <DocumLinks link={note.documLinks[note.documLinks.length - 1]} />
      ) : (
        <p>No documentation links yet</p>
      )}
      {isSuccess && <SuccessToast content="Documentation added" />}
      {isError && <ErrorToast content="Couldn't add documentation link" />}
    </div>
  );
};

export default NoteDocums;
