const Videos = ({ videoUrl }: { videoUrl: string }) => {
  const videoId = new URL(videoUrl).searchParams.get("v");

  return (
    <iframe
      width="100%"
      height="200"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default Videos;
