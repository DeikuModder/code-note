import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseToast from "./BaseToast";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const TipToast = ({ content }: { content: JSX.Element | string }) => {
  return (
    <BaseToast
      content={content}
      iconColor="bg-yellow-600"
      icon={
        <FontAwesomeIcon
          icon={faLightbulb}
          className="text-yellow-700 bg-yellow-300 rounded-full p-2 aspect-square"
        />
      }
      textBorderColor="border-yellow-500"
    />
  );
};

export default TipToast;
