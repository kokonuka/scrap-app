import axios from "axios";

export const deleteScrap = async (id: string) => {
  try {
    await axios.delete(`http://localhost:3001/scraps/${id}`);
    console.log("DELETE成功");
  } catch (error) {
    console.error("DELETEエラー", error);
    throw error;
  }
};
