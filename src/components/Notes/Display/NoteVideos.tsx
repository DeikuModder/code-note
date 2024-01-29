import { useState } from "react";
import type { Notes } from "@/src/types";
import { useUpdateNotes } from "@/hooks/notes";
import Videos from "./Videos";
import addOrPush from "@/utils/addOrPush";
import iFrameParser from "@/utils/iFrameParser";
import WarningToast from "./Toasts/WarningToast";
import SuccessToast from "./Toasts/SuccessToast";
import ErrorToast from "./Toasts/ErrorToast";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoteVideos = ({ note }: { note: Notes }) => {
  const [embedLinks, setEmbedLinks] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const { mutate, isSuccess, isError } = useUpdateNotes();

  if (warningMessage !== "") {
    setTimeout(() => {
      setWarningMessage("");
    }, 2000);
  }

  const handleAdd = () => {
    try {
      const [iFrameSrc, iFrameTitle] = iFrameParser(embedLinks);

      const result = addOrPush(note.videos_info, {
        srcLink: iFrameSrc || "",
        title: iFrameTitle || "",
      });

      "message" in result
        ? setWarningMessage(result.message)
        : mutate(
            {
              note: {
                videos_info: result,
              },
              note_id: note.id!,
            },
            {
              onSettled: () => {
                setEmbedLinks("");
              },
            }
          );
    } catch (error) {
      setWarningMessage("Enter a valid embedd code");
    }
  };

  return (
    <div className="w-full p-8 border border-neutral-700 rounded-xl flex flex-col gap-4">
      <textarea
        value={embedLinks}
        onChange={(e) => setEmbedLinks(e.target.value)}
        className="w-full p-1"
        placeholder="Paste the insertion code of the videos in here..."
      ></textarea>
      <button
        onClick={handleAdd}
        className="bg-neutral-900 rounded-xl p-2 text-slate-200 text-lg font-bold transition-all hover:scale-105"
      >
        <FontAwesomeIcon icon={faPlusCircle} /> Add videos
      </button>
      {note.videos_info && note.videos_info.length > 0 ? (
        <>
          <Videos videoInfo={note.videos_info[note.videos_info.length - 1]} />
        </>
      ) : (
        <p>No videos yet</p>
      )}
      {warningMessage && <WarningToast content={warningMessage} />}
      {isSuccess && <SuccessToast content="Succesfully added video" />}
      {isError && <ErrorToast content="Couldn't add video" />}
    </div>
  );
};

export default NoteVideos;
