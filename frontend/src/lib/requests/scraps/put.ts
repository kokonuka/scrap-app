import axios from "axios";
import { formInputs } from "@/components/organisms/forms/UpdateScrap";

export const putScrap = async (id: string, data: formInputs) => {
  const postData = {
    title: data.title,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps/${id}`,
      postData,
      {
        headers,
      }
    );
    console.log("PUT成功");
  } catch (error) {
    console.error("PUTエラー", error);
    throw error;
  }
};
