import axios from "axios";

export const deleteScrapThreadItem = async (
  scrapId: string,
  scrapThreadItemId: string
) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps/${scrapId}/items/${scrapThreadItemId}`
    );
    console.log("DELETE成功");
  } catch (error) {
    console.error("DELETEエラー", error);
    throw error;
  }
};
