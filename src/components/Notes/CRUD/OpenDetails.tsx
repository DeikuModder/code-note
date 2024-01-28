import type { Notes } from "@/src/types";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, lazy, useState } from "react";
import LoadingToast from "../Display/Toasts/LoadingToast";
const NoteDetails = lazy(() => import("../Display/NoteDetails"));

const OpenDetails = ({ note }: { note: Notes }) => {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <button onClick={() => setOpenDetails(true)}>
        <FontAwesomeIcon icon={faEye} />
      </button>
      {openDetails && (
        <Suspense fallback={<LoadingToast content="Opening details..." />}>
          <NoteDetails onClose={() => setOpenDetails(false)} note={note} />
        </Suspense>
      )}
    </>
  );
};

export default OpenDetails;
