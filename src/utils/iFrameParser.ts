function iFrameParser(stringToParse: string) {
  const parser = new DOMParser();

  const iframe = parser.parseFromString(stringToParse, "text/html");

  const iFrameSrc = iframe.body
    .getElementsByTagName("iframe")[0]
    .getAttribute("src");

  const iFrameTitle = iframe.body
    .getElementsByTagName("iframe")[0]
    .getAttribute("title");

  return [iFrameSrc, iFrameTitle];
}

export default iFrameParser;
