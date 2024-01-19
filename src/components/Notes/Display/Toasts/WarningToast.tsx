import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseToast from "./BaseToast";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

const WarningToast = ({ content }: { content: JSX.Element | string }) => {
  return (
    <BaseToast
      content={content}
      iconColor="bg-orange-600"
      icon={
        <FontAwesomeIcon
          icon={faWarning}
          className="text-orange-700 bg-orange-300 rounded-full p-2 aspect-square"
        />
      }
      textBorderColor="border-orange-500"
    />
  );
};

export default WarningToast;
