import { useState, type FormEventHandler } from "react";
import { useMutateNotes } from "@/hooks/notes";
import ErrorToast from "../Display/Toasts/ErrorToast";
import LoadingToast from "../Display/Toasts/LoadingToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  onClose: () => void;
  userID: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, userID }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, isError, isPending } = useMutateNotes();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const dateDeadline = new Date(deadline);

    mutate(
      {
        title: title,
        priority: priority,
        userID: userID,
        deadline: dateDeadline,
        description: description,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="w-full h-[100vh] bg-[#00000070] absolute top-0 left-0 flex flex-col items-center justify-center">
      <div className="w-[80%] h-[60%] bg-slate-200 rounded-lg overflow-auto max-w-[400px]">
        <div className="w-full flex flex-row justify-end">
          <button
            onClick={onClose}
            className="text-2xl font-bold leading-none text-gray-700 hover:text-black focus:outline-none"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="w-full flex flex-col justify-center items-center p-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-4"
            id="create-note-form"
          >
            <label>
              <input
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-1"
                required
                id="title"
              />
            </label>

            <label>
              <select
                id="priority"
                defaultValue={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="p-1"
                required
              >
                <option value="" hidden>
                  Select priority
                </option>
                <option value="Highly Important">Highly Important</option>
                <option value="Important">Important</option>
                <option value="Normal">Normal</option>
                <option value="Not important">Not important</option>
              </select>
            </label>

            <label>
              <input
                type="date"
                className="p-1"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                id="deadline"
              />
            </label>

            <label>
              <textarea
                rows={4}
                cols={30}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-1"
                placeholder="Description... (optional)"
                id="description"
              />
            </label>

            <button
              type="submit"
              id="submit-note"
              className="bg-neutral-900 rounded-xl p-2 text-slate-200 text-xl font-bold transition-all hover:scale-105"
            >
              Create note
            </button>
          </form>
        </div>
      </div>
      {isPending && <LoadingToast content="Creating note..." />}
      {isError && <ErrorToast content="Couldn't create note" />}
    </div>
  );
};

const CreateNote = ({ userID }: { userID: string }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal ? (
        <Modal onClose={() => setOpenModal(false)} userID={userID} />
      ) : (
        <button
          onClick={() => setOpenModal(true)}
          className="bg-neutral-900 rounded-xl p-2 text-slate-200 text-xl font-bold min-w-[129px] min-h-[48px] max-h-[48px] max-w-[129px] transition-all hover:scale-105"
        >
          <FontAwesomeIcon icon={faPlusCircle} /> Add note
        </button>
      )}
    </>
  );
};

export default CreateNote;
