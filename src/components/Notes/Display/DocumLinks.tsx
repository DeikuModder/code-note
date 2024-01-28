import type { documentationLinks } from "@/src/types";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DocumLinks = ({ documElement }: { documElement: documentationLinks }) => {
  return (
    <div className="bg-neutral-800 text-slate-200 w-full h-52 p-4 text-lg overflow-hidden">
      <h5 className="bg-red-600 rounded-xl text-xl font-bold text-neutral-800 p-1">
        <FontAwesomeIcon icon={faBook} /> {documElement.title}
      </h5>
      <a href={documElement.url} target="_blank" className="w-full break-words">
        {documElement.url}
      </a>
    </div>
  );
};

export default DocumLinks;
