import BaseToast from "./BaseToast";
import "./styles/loader.css";

const Loader = () => {
  return <div className="spinner"></div>;
};

const LoadingToast = ({
  content,
  icon = <Loader />,
}: {
  content: JSX.Element | string;
  icon?: JSX.Element;
}) => {
  return (
    <BaseToast
      content={content}
      iconColor="bg-purple-600"
      icon={icon}
      textBorderColor="border-purple-500"
    />
  );
};

export default LoadingToast;
