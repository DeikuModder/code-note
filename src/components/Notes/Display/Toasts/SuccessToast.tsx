import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseToast from "./BaseToast";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SuccessToast = ({ content }: { content: JSX.Element | string }) => {
  return (
    <BaseToast
      content={content}
      iconColor="bg-green-600"
      icon={
        <FontAwesomeIcon
          icon={faCheck}
          className="text-green-700 bg-green-300 rounded-full p-2 aspect-square"
        />
      }
      textBorderColor="border-green-500"
    />
  );
};

export default SuccessToast;
