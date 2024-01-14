import type { Notes } from "@/src/types";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, lazy, useState } from "react";
const NoteDetails = lazy(() => import("../Display/NoteDetails"));

const OpenDetails = ({ note }: { note: Notes }) => {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <button onClick={() => setOpenDetails(true)}>
        <FontAwesomeIcon icon={faPen} />
      </button>
      {openDetails && (
        <Suspense>
          <NoteDetails onClose={() => setOpenDetails(false)} note={note} />
        </Suspense>
      )}
    </>
  );
};

export default OpenDetails;
