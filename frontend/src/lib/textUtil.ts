export const extractHostname = (url: string) => {
  const parser = document.createElement("a");
  parser.href = url;
  return parser.hostname;
};

export const truncateString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
};
