import { useState } from "react";
import type { Notes } from "@/src/types";
import { useUpdateNotes } from "@/hooks/notes";
import addOrPush from "@/utils/addOrPush";
import DocumLinks from "./DocumLinks";

const NoteDocums = ({ note }: { note: Notes }) => {
  const [links, setLinks] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const { mutate } = useUpdateNotes();

  const handleAdd = () => {
    const result = addOrPush(note.documLinks, links);

    "message" in result
      ? setWarningMessage(result.message)
      : mutate(
          { note: { documLinks: result }, note_id: note.id! },
          {
            onSuccess: () => {
              alert("Note updated succesfully");
            },
            onError: () => {
              alert("Couldn't update note");
            },
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
      {warningMessage && <p>{warningMessage}</p>}
      <button onClick={handleAdd}>Add</button>
      {note.documLinks && note.documLinks.length > 0 ? (
        <DocumLinks link={note.documLinks[note.documLinks.length - 1]} />
      ) : (
        <p>No documentation links yet</p>
      )}
    </div>
  );
};

export default NoteDocums;
