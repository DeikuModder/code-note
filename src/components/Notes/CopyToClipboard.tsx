import {
  faClipboard,
  faClipboardCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Copied = () => {
  return (
    <p
      style={{
        backgroundColor: "#60a0caa2",
        padding: 6,
        borderRadius: 16,
        fontWeight: "bold",
      }}
    >
      <FontAwesomeIcon icon={faClipboardCheck} /> Copied to clipboard!
    </p>
  );
};

const NotCopied = () => {
  return (
    <p
      style={{
        backgroundColor: "#60a0caa2",
        padding: 4,
        borderRadius: 16,
        fontWeight: "bold",
      }}
    >
      <FontAwesomeIcon icon={faXmark} style={{ color: "#db3131" }} /> Couldn't
      copy to clipboard
    </p>
  );
};

interface Props {
  content: string;
  icon?: JSX.Element | string;
  successMessage?: JSX.Element | string;
  errorMessage?: JSX.Element | string;
}

const CopyToClipboard: React.FC<Props> = ({
  content,
  icon = (
    <FontAwesomeIcon
      icon={faClipboard}
      style={{
        backgroundColor: "#60a0caa2",
        padding: 8,
        borderRadius: "100%",
        aspectRatio: "1/1",
        fontWeight: "bold",
      }}
    />
  ),
  successMessage = <Copied />,
  errorMessage = <NotCopied />,
}) => {
  const [copyIcon, setCopyIcon] = useState(icon);

  useEffect(() => {
    if (copyIcon !== icon) {
      setTimeout(() => setCopyIcon(icon), 3000);
    }
  }, [copyIcon]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyIcon(successMessage);
    } catch (error) {
      setCopyIcon(errorMessage);
    }
  };

  return (
    <abbr title="Copy">
      <button onClick={copyToClipboard}>{copyIcon}</button>
    </abbr>
  );
};

export default CopyToClipboard;
