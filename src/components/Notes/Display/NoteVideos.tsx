import { useState } from "react";
import type { Notes } from "@/src/types";
import { useUpdateNotes } from "@/hooks/notes";
import Videos from "./Videos";
import addOrPush from "@/utils/addOrPush";
import iFrameParser from "@/utils/iFrameParser";
import WarningToast from "./Toasts/WarningToast";
import SuccessToast from "./Toasts/SuccessToast";
import ErrorToast from "./Toasts/ErrorToast";

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
  };

  return (
    <div className="w-full p-8">
      <textarea
        value={embedLinks}
        onChange={(e) => setEmbedLinks(e.target.value)}
        className="w-full"
      ></textarea>
      <button onClick={handleAdd}>Add</button>
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
