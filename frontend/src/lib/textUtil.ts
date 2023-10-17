export const extractHostname = (url: string) => {
  const parser = document.createElement("a");
  parser.href = url;
  return parser.hostname;
};
