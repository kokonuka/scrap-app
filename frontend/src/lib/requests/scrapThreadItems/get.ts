import axios from "axios";

export const getScrapThreadItems = async (scrapId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps/${scrapId}/items`
    );
    return response.data;
  } catch (error) {
    console.error("GETエラー", error);
    throw error;
  }
};
