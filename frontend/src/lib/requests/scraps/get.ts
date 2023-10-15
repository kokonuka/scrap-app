import axios from "axios";

export const getScrap = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
    throw error;
  }
};
