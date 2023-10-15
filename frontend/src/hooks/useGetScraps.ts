import { useState, useEffect } from "react";
import axios from "axios";
import { Scrap } from "@/components/molecules/ScrapRow";

const useGetScraps = () => {
  const [scraps, setScraps] = useState<Scrap[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps`)
      .then((response) => {
        setScraps(response.data);
      })
      .catch((error) => {
        console.error("データの取得に失敗しました:", error);
      });
  }, []);

  return { scraps, setScraps };
};

export default useGetScraps;
