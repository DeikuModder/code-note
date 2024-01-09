import { useState } from "react";
import type { Notes } from "../types";
import { useUpdateNotes } from "../hooks/notes";
import Videos from "./Videos";

const NoteVideos = ({ note }: { note: Notes }) => {
  const [embedLinks, setEmbedLinks] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const { mutate } = useUpdateNotes();
  const parser = new DOMParser();
  let embededLinks = [];

  const handleAdd = () => {
    const iframe = parser.parseFromString(embedLinks, "text/html");
    const iframSrc = iframe.body
      .getElementsByTagName("iframe")[0]
      .getAttribute("src");
    const iFrameTitle = iframe.body
      .getElementsByTagName("iframe")[0]
      .getAttribute("title");

    if (note.videos_info && note.videos_info.length > 0) {
      note.videos_info.map((video) => {
        if (video.srcLink === iframSrc || video.title === iFrameTitle) {
          return setWarningMessage("Video already exists on list");
        }
      });

      embededLinks = [...note.videos_info];

      embededLinks.push({ srcLink: iframSrc || "", title: iFrameTitle || "" });
    } else {
      embededLinks = [{ srcLink: iframSrc || "", title: iFrameTitle || "" }];
    }

    mutate(
      {
        note: {
          videos_info: embededLinks,
        },
        note_id: note.id!,
      },
      {
        onSuccess: () => {
          alert("Video added successfully");
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
      {note.videos_info && note.videos_info.length > 1 ? (
        <>
          <Videos
            src={note.videos_info[0].srcLink}
            title={note.videos_info[0].title}
          />
          <Videos
            src={note.videos_info[1].srcLink}
            title={note.videos_info[1].title}
          />
        </>
      ) : null}
      {warningMessage && <p>{warningMessage}</p>}
    </div>
  );
};

export default NoteVideos;
