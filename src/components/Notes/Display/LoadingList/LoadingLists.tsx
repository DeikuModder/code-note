import "./styles.css";

const LoadingLists = () => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="skeleton w-[90%] max-w-[500px] border-[2px] border-neutral-400"></div>
      <div className="skeleton w-[90%] border-[4px] border-neutral-400 rounded-lg p-4 flex flex-col gap-4 min-h-80 max-w-[500px] items-center justify-center">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoadingLists;
