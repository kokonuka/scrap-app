import axios from "axios";

export const deleteScrapThreadItem = async (
  scrapId: string,
  scrapThreadItemId: string
) => {
  try {
    await axios.delete(
      `http://localhost:3001/scraps/${scrapId}/items/${scrapThreadItemId}`
    );
    console.log("DELETE成功");
  } catch (error) {
    console.error("DELETEエラー", error);
    throw error;
  }
};
