import axios from "axios";

export const getScrap = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/scraps/${id}`);
    return response.data;
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
    throw error;
  }
};
