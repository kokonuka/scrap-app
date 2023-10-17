import { useState, useEffect } from "react";
import axios from "axios";
import { Scrap } from "@/components/molecules/ScrapRow";

const useGetScraps = () => {
  const [scraps, setScraps] = useState<Scrap[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps`)
      .then((response) => {
        setScraps(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("データの取得に失敗しました:", error);
      });
  }, []);

  return { scraps, setScraps, isLoading };
};

export default useGetScraps;
