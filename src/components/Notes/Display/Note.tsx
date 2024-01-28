import type React from "react";
import type { Notes } from "@/src/types";
import PriorityColor from "../PriorityColor";
import DoneCheckbox from "../CRUD/DoneCheckbox";
import DeleteNote from "../CRUD/DeleteNote";
import OpenDetails from "../CRUD/OpenDetails";
import {
  useCheckIsToday,
  useDeadlinePassed,
  useFormatedDate,
} from "@/hooks/date";
import { useUpdateNotes } from "@/hooks/notes";
import { useEffect, useState } from "react";

interface Props {
  note: Notes;
}

const Note: React.FC<Props> = ({ note }) => {
  const formatedDate = note.deadline && useFormatedDate(note.deadline);
  const { mutate } = useUpdateNotes();

  useEffect(() => {
    if (formatedDate) {
      if (useDeadlinePassed(formatedDate)) {
        mutate({
          note: { status: "failed" },
          note_id: note.id!,
        });
      }
    }
  }, []);

  return (
    <>
      <li
        className={`w-full border border-neutral-700 rounded-lg p-4 ${
          note.status === "done"
            ? "bg-[#01eb4f77]"
            : note.status === "failed"
            ? "bg-red-500"
            : null
        }`}
      >
        <div className="w-full flex text-start">
          <div className="w-[50%]">
            <p>{note.title}</p>
          </div>
          <div className="w-[50%] flex justify-end gap-2 text-xl">
            {note.status !== "failed" ? <DoneCheckbox note={note} /> : null}
            <DeleteNote note={note} />
            <OpenDetails note={note} />
          </div>
        </div>

        <div className="w-full text-end flex justify-end">
          <div className="w-[50%]">
            <PriorityColor priority={note.priority} />
          </div>
          <div className="w-[50%]">
            <p>{formatedDate ?? null}</p>
          </div>
        </div>
      </li>
    </>
  );
};

export default Note;
