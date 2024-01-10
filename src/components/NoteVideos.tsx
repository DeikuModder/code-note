import { useState } from "react";
import type { Notes } from "../types";
import { useUpdateNotes } from "../hooks/notes";
import Videos from "./Videos";
import addOrPush from "../utils/addOrPush";
import iFrameParser from "../utils/iFrameParser";
import ListView from "./ListView";

const NoteVideos = ({ note }: { note: Notes }) => {
  const [embedLinks, setEmbedLinks] = useState("");
  const [openList, setOpenList] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const { mutate } = useUpdateNotes();

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
            onSuccess: () => {
              alert("Note updated succesfully");
            },
            onError: () => {
              alert("Couldn't update note");
            },
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
          <button onClick={() => setOpenList(true)}>View all</button>
          {openList && (
            <ListView onClose={() => setOpenList(false)} note={note} />
          )}
        </>
      ) : (
        <p>No videos yet</p>
      )}
      {warningMessage && <p>{warningMessage}</p>}
    </div>
  );
};

export default NoteVideos;
