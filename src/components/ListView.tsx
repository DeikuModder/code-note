import type { Notes } from "../types";
import CodeSnippets from "./CodeSnippets";
import DocumLinks from "./DocumLinks";
import Videos from "./Videos";

interface Props {
  onClose: () => void;
  note: Notes;
}

const ListView: React.FC<Props> = ({ onClose, note }) => {
  return (
    <div className="w-full h-[100vh] bg-slate-200 absolute top-0 left-0 flex flex-col">
      <div className="w-full flex flex-row justify-end">
        <button onClick={onClose}>X</button>
      </div>
      <ul>
        {note.documLinks && note.documLinks.length > 0 ? (
          note.documLinks.map((documLink, index) => {
            return <DocumLinks link={documLink} key={`docum-${index}`} />;
          })
        ) : (
          <p>No documents links yet</p>
        )}
      </ul>
      <ul>
        {note.videos_info && note.videos_info.length > 0 ? (
          note.videos_info.map((video, index) => {
            return <Videos videoInfo={video} key={`video-${index}`} />;
          })
        ) : (
          <p>No videos yet</p>
        )}
      </ul>
      <ul>
        {note.codeSnippets && note.codeSnippets.length > 0 ? (
          note.codeSnippets.map((codeSnippet, index) => {
            return <CodeSnippets code={codeSnippet} key={`code-${index}`} />;
          })
        ) : (
          <p>No videos yet</p>
        )}
      </ul>
    </div>
  );
};

export default ListView;
