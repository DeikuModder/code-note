import { useEffect, useState } from "react";
import "./styles/toast.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

interface Props {
  content: JSX.Element | string;
  fn: () => void;
  onClose: () => void;
  icon?: JSX.Element;
  iconColor?: string;
  textBorderColor?: string;
}

const AskToast: React.FC<Props> = ({
  content = null,
  fn,
  onClose,
  icon = (
    <FontAwesomeIcon
      icon={faQuestion}
      className="bg-indigo-400 rounded-full aspect-square p-2 text-indigo-800 font-bold"
    />
  ),
  iconColor = "bg-indigo-700",
  textBorderColor = "border-indigo-600",
}) => {
  const [visible, setVisible] = useState(true);

  const handleYes = () => {
    fn();
    setVisible(false);
    onClose();
  };

  return (
    <>
      {visible && (
        <div
          className={`bg-white w-80 h-32 rounded-2xl shadow-xl shadow-neutral-700 fixed bottom-10 p-2 right-8 flex gap-2 transition-transform z-50`}
        >
          <div
            className={`${iconColor} w-[20%] rounded-s-2xl flex flex-col items-center justify-center text-2xl`}
          >
            {icon}
          </div>
          <div
            className={`w-[80%] flex flex-col items-center justify-center text-lg border ${textBorderColor} rounded-e-2xl text-center`}
          >
            {content}
            <div className="text-xl font-bold">
              <button
                className="bg-indigo-800 p-1 px-4 rounded-lg text-white"
                onClick={() => handleYes()}
              >
                Yes
              </button>
              <button
                className="p-1 px-4 rounded-lg "
                onClick={() => {
                  setVisible(false);
                  onClose();
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AskToast;
