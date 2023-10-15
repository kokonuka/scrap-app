import { useState, useEffect } from "react";
import axios from "axios";
import { Scrap } from "@/components/molecules/ScrapRow";
import { ScrapThreadItem } from "@/components/molecules/ScrapThreadItem";

const useGetScrap = (id: string | string[] | undefined) => {
  const [scrap, setScrap] = useState<Scrap | null>(null);
  const [scrapThreadItems, setScrapThreadItems] = useState<ScrapThreadItem[]>(
    []
  );

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps/${id}`)
        .then((response) => {
          setScrap(response.data);
          setScrapThreadItems(response.data.items);
        })
        .catch((error) => {
          console.error("データの取得に失敗しました:", error);
        });
    }
  }, [id]);

  return { scrap, setScrap, scrapThreadItems, setScrapThreadItems };
};

export default useGetScrap;
