import { useState, type FormEventHandler } from "react";
import { useMutateNotes } from "@/hooks/notes";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const note = {
    title,
    priority,
    description,
    deadline,
  };

  const { mutate } = useMutateNotes();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    mutate(note, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <div
      id="createNoteModal"
      className="w-full h-[100vh] bg-[#00000070] absolute top-0 left-0 flex flex-col items-center justify-center"
    >
      <div className="w-[80%] h-[60%] bg-slate-200 rounded-lg overflow-auto">
        <div className="w-full flex flex-row justify-end">
          <button onClick={onClose}>X</button>
        </div>
        <div className="w-full flex flex-col justify-center items-center p-8">
          <form
            className="flex flex-col justify-center items-center gap-4"
            name="create a note"
            onSubmit={handleSubmit}
            method="post"
          >
            <label>
              <input
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-1"
                name="title"
                required
              />
            </label>

            <label>
              <select
                id="priority"
                defaultValue={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="p-1"
                name="priority"
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
                name="deadline"
                className="p-1"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
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
                name="description"
              />
            </label>
            <br />
            <button id="createNoteBtn">Create Note</button>
            <p
              className={`${
                !errorMessage ? "hidden" : ""
              } mt-4 bg-red-700 rounded-lg py-2 px-4 text-center text-white max-w-full`}
              id="createNoteError"
            >
              {errorMessage}
            </p>
          </form>
        </div>
      </div>
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
