import { useState, type FormEventHandler } from "react";
import { useMutateNotes } from "@/hooks/notes";
import ErrorToast from "../Display/Toasts/ErrorToast";
import SuccessToast from "../Display/Toasts/SuccessToast";
import LoadingToast from "../Display/Toasts/LoadingToast";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, isError, isPending } = useMutateNotes();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate(
      {
        title: title,
        priority: priority,
        deadline: deadline,
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
      <div className="w-[60%] h-[80%] bg-slate-200 rounded-lg overflow-auto">
        <div className="w-full flex flex-row justify-end">
          <button
            onClick={onClose}
            className="text-xl font-bold leading-none text-gray-700 hover:text-black focus:outline-none"
          >
            X
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
                rows={3}
                cols={40}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-1"
                placeholder="Description... (optional)"
                id="description"
              />
            </label>

            <button type="submit" id="submit-note">
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

const CreateNote = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal ? (
        <Modal onClose={() => setOpenModal(false)} />
      ) : (
        <button onClick={() => setOpenModal(true)}>Add note</button>
      )}
    </>
  );
};

export default CreateNote;
