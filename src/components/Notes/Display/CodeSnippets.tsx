import CopyToClipboard from "../CopyToClipboard";

const CodeSnippets = ({ code }: { code: string }) => {
  return (
    <div className="bg-cyan-950 text-gray-200 w-full h-52 p-4 overflow-auto font-mono">
      <div className="w-full flex justify-end">
        <CopyToClipboard content={code} />
      </div>
      <code>
        <pre className="w-full">{code}</pre>
      </code>
    </div>
  );
};

export default CodeSnippets;
