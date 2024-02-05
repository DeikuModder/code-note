import type { Generation } from "@/src/types";
import {
  faMagicWandSparkles,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "../CopyToClipboard";

interface AIModalProps {
  onClose: () => void;
  taskTitle: string;
  prompt: string;
}

const AIModal: React.FC<AIModalProps> = ({ onClose, taskTitle, prompt }) => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    let controller: null | AbortController = new AbortController();

    const getSuggestion = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/notes/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application-json" },
          body: JSON.stringify({
            prompt: prompt,
          }),
          signal: controller?.signal,
        });

        const data = (await response.json()) as string;

        setSuggestion(data);

        controller = null;
      } catch (error) {
        setSuggestion(
          "Internet connection may be too slow, or an error happened :("
        );
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getSuggestion();

    return () => controller?.abort();
  }, []);

  return (
    <div className="absolute top-0 right-0 m-2 p-4 text-slate-200 bg-stone-800 w-[350px] max-w-[400px] max-h-[500px] flex flex-col items-center rounded-lg overflow-auto">
      <div className="w-full flex flex-row justify-end">
        <button
          onClick={onClose}
          className="text-2xl font-bold leading-none text-gray-400 hover:text-black focus:outline-none"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="w-full flex gap-2">
        <h2 className="font-bold bg-neutral-950 rounded-lg mb-2">
          `"{taskTitle}"
        </h2>
        {suggestion && <CopyToClipboard content={suggestion} />}
      </div>
      {suggestion && (
        <>
          <p className="text-start">{suggestion}</p>
          <br />
          <br />
          <p className=" italic">Powered by Coherse AI</p>
        </>
      )}
      {loading && (
        <>
          <div className="spinner w-full" /> Generating...
        </>
      )}
    </div>
  );
};

interface Props {
  taskTitle: string;
  prompt: string;
  message?: string;
}

const AISuggestions: React.FC<Props> = ({ taskTitle, prompt, message }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal ? (
        <AIModal
          onClose={() => setOpenModal(false)}
          taskTitle={taskTitle}
          prompt={prompt}
        />
      ) : (
        <div className="flex p-6 md:gap-4">
          <p className="text-lg">{message}</p>
          <button onClick={() => setOpenModal(true)}>
            <FontAwesomeIcon icon={faMagicWandSparkles} />
          </button>
        </div>
      )}
    </>
  );
};

export default AISuggestions;
