import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AskToast from "./Toasts/AskToast";

interface Props {
  handleDelete: () => void;
  children: JSX.Element;
}

const ListItem: React.FC<Props> = ({ handleDelete, children }) => {
  const [deleteToast, setDeleteToast] = useState(false);

  const handleFunction = () => {
    handleDelete();
    setDeleteToast(false);
  };

  return (
    <div className="w-[150px] aspect-video sm:w-[220px]">
      <button
        onClick={() => setDeleteToast(true)}
        className="w-full bg-blue-900 rounded-t-lg p-2 text-gray-200 text-end"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {children}
      {deleteToast && (
        <AskToast
          content="Are you sure you want to delete this element?"
          fn={handleFunction}
          onClose={() => setDeleteToast(false)}
        />
      )}
    </div>
  );
};

export default ListItem;
