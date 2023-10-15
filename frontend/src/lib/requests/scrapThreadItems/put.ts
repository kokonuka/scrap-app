import { formInputs } from "@/components/molecules/ScrapThreadItem";
import axios from "axios";

export const putScrapThreadItem = async (
  scrapId: string,
  scrapThreadItemId: string,
  data: formInputs
) => {
  const postData = {
    content: data.comment,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps/${scrapId}/items/${scrapThreadItemId}`,
      postData,
      { headers }
    );
    console.log("POST成功");
  } catch (error) {
    console.error("POSTエラー", error);
    throw error;
  }
};
