import type { embeddedVideoProperties } from "@/src/types";

const Videos = ({ videoInfo }: { videoInfo: embeddedVideoProperties }) => {
  return (
    <iframe
      width="100%"
      height="200"
      src={videoInfo.srcLink}
      title={videoInfo.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};

export default Videos;
