import axios from "axios";

export const getScraps = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/scraps`);
    return response.data;
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
    throw error;
  }
};
