import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import type {
  Notes,
  documentationLinks,
  embeddedVideoProperties,
} from "@/src/types";
import CodeSnippets from "./CodeSnippets";
import DocumLinks from "./DocumLinks";
import Videos from "./Videos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import deleteOne from "@/utils/deleteOne";
import { useUpdateNotes } from "@/hooks/notes";
import ListItem from "./ListItem";

interface Props {
  onClose: () => void;
  note: Notes;
}

const ListView: React.FC<Props> = ({ onClose, note }) => {
  const { mutate } = useUpdateNotes();

  const handleDelete = (
    array: any[],
    index: number,
    object:
      | { documLinks?: documentationLinks[] }
      | { codeSnippets?: string[] }
      | { videos_info?: embeddedVideoProperties[] }
  ) => {
    const result = deleteOne(array, index);
    let objectNote = {};

    object.hasOwnProperty("documLinks")
      ? (objectNote = { documLinks: result })
      : object.hasOwnProperty("codeSnippets")
      ? (objectNote = { codeSnippets: result })
      : (objectNote = { videos_info: result });

    "error" in result
      ? console.log(result.error)
      : mutate({ note: objectNote, note_id: note._id! });
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 absolute top-0 left-0 flex flex-col gap-9 p-4 overflow-auto max-w-[500px] md:fixed md:top-0 md:left-0">
      <div className="w-full flex flex-row justify-end">
        <button
          onClick={onClose}
          className="text-2xl font-bold leading-none text-gray-700 hover:text-black focus:outline-none"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <h3 className="font-bold text-2xl">Documentation Links 🔗</h3>
      <ul className="grid grid-cols-2 gap-4">
        {note.documLinks && note.documLinks.length > 0 ? (
          note.documLinks.map((documLink, index, array) => {
            return (
              <ListItem
                key={`docum${index}`}
                handleDelete={() =>
                  handleDelete(array, index, { documLinks: [] })
                }
                children={<DocumLinks documElement={documLink} />}
              />
            );
          })
        ) : (
          <p>No documents links yet</p>
        )}
      </ul>

      <h3 className="font-bold text-2xl">Videos ⏯️</h3>
      <ul className="grid grid-cols-2 gap-4">
        {note.videos_info && note.videos_info.length > 0 ? (
          note.videos_info.map((video, index, array) => {
            return (
              <ListItem
                key={`video-${index}`}
                handleDelete={() =>
                  handleDelete(array, index, { videos_info: [] })
                }
                children={<Videos videoInfo={video} />}
              />
            );
          })
        ) : (
          <p>No videos yet</p>
        )}
      </ul>

      <h3 className="font-bold text-2xl">Code Snippets 👩‍💻</h3>
      <ul className="grid grid-cols-2 gap-4">
        {note.codeSnippets && note.codeSnippets.length > 0 ? (
          note.codeSnippets.map((codeSnippet, index, array) => {
            return (
              <ListItem
                key={`code-${index}`}
                handleDelete={() =>
                  handleDelete(array, index, { codeSnippets: [] })
                }
                children={<CodeSnippets code={codeSnippet} />}
              />
            );
          })
        ) : (
          <p>No videos yet</p>
        )}
      </ul>
    </div>
  );
};

export default ListView;
