const Videos = ({ src, title }: { src: string; title: string }) => {
  return (
    <iframe
      width="100%"
      height="200"
      src={src}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};

export default Videos;
