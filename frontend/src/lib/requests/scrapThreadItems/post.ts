import axios from "axios";
import { formInputs } from "@/components/organisms/forms/CreateScrapThreadItem";

export const postScrapThreadItem = async (id: string, data: formInputs) => {
  const postData = {
    content: data.comment,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps/${id}/items`,
      postData,
      {
        headers,
      }
    );
    console.log("POST成功");
  } catch (error) {
    console.error("POSTエラー", error);
    throw error;
  }
};
