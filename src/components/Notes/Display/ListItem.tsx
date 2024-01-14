import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  handleDelete: () => void;
  children: JSX.Element;
}

const ListItem: React.FC<Props> = ({ handleDelete, children }) => {
  return (
    <div>
      <button
        onClick={handleDelete}
        className="w-full bg-blue-900 rounded-t-lg p-2 text-gray-200 text-end"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {children}
    </div>
  );
};

export default ListItem;
