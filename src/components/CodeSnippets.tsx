const CodeSnippets = ({ code }: { code: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="bg-cyan-950 text-gray-200 w-full h-52 p-4 overflow-auto">
      <button onClick={copyToClipboard}>Copy</button>
      <code>
        <pre>{code}</pre>
      </code>
    </div>
  );
};

export default CodeSnippets;
