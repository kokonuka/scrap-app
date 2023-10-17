import { useState, useEffect } from "react";
import axios from "axios";
import { Scrap } from "@/components/molecules/ScrapRow";
import { ScrapThreadItem } from "@/components/molecules/ScrapThreadItem";

const useGetScrap = (id: string | string[] | undefined) => {
  const [scrap, setScrap] = useState<Scrap | null>(null);
  const [scrapThreadItems, setScrapThreadItems] = useState<ScrapThreadItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps/${id}`)
        .then((response) => {
          setScrap(response.data);
          setScrapThreadItems(response.data.items);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("データの取得に失敗しました:", error);
        });
    }
  }, [id]);

  return { scrap, setScrap, scrapThreadItems, setScrapThreadItems, isLoading };
};

export default useGetScrap;
