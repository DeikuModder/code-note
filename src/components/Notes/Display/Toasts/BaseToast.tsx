import { useEffect, useState } from "react";
import "./styles/toast.css";

interface Props {
  content: JSX.Element | string;
  icon?: JSX.Element;
  iconColor?: string;
  textBorderColor?: string;
}

const BaseToast: React.FC<Props> = ({
  content = null,
  icon = null,
  iconColor = "bg-neutral-300",
  textBorderColor = "border-neutral-400",
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {visible && (
        <div
          className={`${
            visible ? "visible" : "hidden"
          } toast bg-white w-80 h-32 rounded-2xl shadow-xl shadow-neutral-700 fixed bottom-10 p-2 right-8 flex gap-2 transition-transform z-50`}
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
          </div>
        </div>
      )}
    </>
  );
};

export default BaseToast;
