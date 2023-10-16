import { ScrapThreadItemLink } from "@/components/atoms/ScrapThreadItemLink";

export const convertTextToLink = async (text: string) => {
  const regex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(regex);

  let newParts: (string | React.JSX.Element)[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (!regex.test(part)) {
      newParts[i] = part;
      continue;
    }

    newParts[i] = <ScrapThreadItemLink url={part} key={i} />;
  }

  return newParts;
};
