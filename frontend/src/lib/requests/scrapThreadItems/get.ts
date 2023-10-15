import axios from "axios";

export const getScrapThreadItems = async (scrapId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/scraps/${scrapId}/items`
    );
    return response.data;
  } catch (error) {
    console.error("GETエラー", error);
    throw error;
  }
};
