import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseToast from "./BaseToast";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ErrorToast = ({ content }: { content: JSX.Element | string }) => {
  return (
    <BaseToast
      content={content}
      icon={
        <FontAwesomeIcon
          icon={faXmark}
          className="text-red-700 bg-red-300 rounded-full aspect-square p-2"
        />
      }
      iconColor="bg-red-700"
      textBorderColor="border-red-500"
    />
  );
};

export default ErrorToast;
