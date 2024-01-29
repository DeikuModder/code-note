import { useState } from "react";
import type { Notes, documentationLinks } from "@/src/types";
import { useUpdateNotes } from "@/hooks/notes";
import addOrPush from "@/utils/addOrPush";
import DocumLinks from "./DocumLinks";
import SuccessToast from "./Toasts/SuccessToast";
import ErrorToast from "./Toasts/ErrorToast";
import WarningToast from "./Toasts/WarningToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const NoteDocums = ({ note }: { note: Notes }) => {
  const [links, setLinks] = useState("");
  const [title, setTitle] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const { mutate, isSuccess, isError } = useUpdateNotes();

  if (warningMessage !== "") {
    setTimeout(() => {
      setWarningMessage("");
    }, 2000);
  }

  const handleAdd = () => {
    try {
      const newUrl: URL = new URL(links);

      if (newUrl.href) {
        const newDocum: documentationLinks = {
          title: title,
          url: links,
        };

        const result = addOrPush(note.documLinks, newDocum);

        "message" in result
          ? setWarningMessage(result.message)
          : mutate({ note: { documLinks: result }, note_id: note.id! });
      }
    } catch (error) {
      setWarningMessage("Please enter a valid url");
    }

    setLinks("");
    setTitle("");
  };

  return (
    <div className="w-full p-8 border border-neutral-700 rounded-xl flex flex-col gap-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-1"
        placeholder="Title..."
      />
      <textarea
        value={links}
        onChange={(e) => setLinks(e.target.value)}
        className="w-full p-1"
        placeholder="Paste the url here..."
      ></textarea>

      {warningMessage && <WarningToast content={warningMessage} />}

      <button
        onClick={handleAdd}
        className="bg-neutral-900 rounded-xl p-2 text-slate-200 text-lg font-bold transition-all hover:scale-105"
      >
        <FontAwesomeIcon icon={faPlusCircle} /> Add documentation links
      </button>

      {note.documLinks && note.documLinks.length > 0 ? (
        <DocumLinks
          documElement={note.documLinks[note.documLinks.length - 1]}
        />
      ) : (
        <p>No documentation links yet</p>
      )}
      {isSuccess && <SuccessToast content="Documentation added" />}
      {isError && <ErrorToast content="Couldn't add documentation link" />}
    </div>
  );
};

export default NoteDocums;
