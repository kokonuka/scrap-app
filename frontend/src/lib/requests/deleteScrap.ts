import axios from "axios";

export const deleteScrap = async (id: string) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps/${id}`);
    console.log("DELETE成功");
  } catch (error) {
    console.error("DELETEエラー", error);
    throw error;
  }
};
