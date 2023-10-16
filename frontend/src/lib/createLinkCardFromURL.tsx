import axios from "axios";
import { LinkCard } from "@/components/molecules/LinkCard";

export const createLinkCardFromURL = async (text: string) => {
  const regex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(regex);

  let newParts: (string | React.JSX.Element)[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (!regex.test(part)) {
      newParts[i] = part;
      continue;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ogp?url=${part}`
      );
      const data = response.data;

      newParts[i] = <LinkCard data={data} key={i} />;
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
      throw error;
    }
  }

  return newParts;
};
