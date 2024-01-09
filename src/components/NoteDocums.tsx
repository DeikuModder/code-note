import { useState } from "react";
import type { Notes } from "../types";
import { useUpdateNotes } from "../hooks/notes";

const NoteDocums = ({ note }: { note: Notes }) => {
  const [links, setLinks] = useState("");
  const [warningMessage, setWariningMessage] = useState("");
  const { mutate } = useUpdateNotes();
  let linksResult: string[] = [];

  const handleAdd = () => {
    if (note.documLinks && note.documLinks.length > 0) {
      linksResult = [...note.documLinks];

      if (linksResult.includes(links)) {
        return setWariningMessage("This link already exists in the list.");
      }

      linksResult.push(links);
    } else {
      linksResult = [links];
    }

    mutate(
      { note: { documLinks: linksResult }, note_id: note.id! },
      {
        onSuccess: () => {
          setLinks("");
          alert("Note updated succesfully");
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
    </div>
  );
};

export default NoteDocums;
