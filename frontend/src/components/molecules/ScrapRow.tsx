import NextLink from "next/link";
import { Box, Link, Skeleton } from "@chakra-ui/react";
import { formatDate } from "@/lib/dataUtil";
import { ScrapThreadItem } from "./ScrapThreadItem";
import { deleteScrap } from "@/lib/requests/deleteScrap";
import { getScraps } from "@/lib/requests/getScraps";
import { FaRegComment, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  setScraps: React.Dispatch<React.SetStateAction<Scrap[]>>;
  scrapId: string;
};

export type Scrap = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  scrap: string;
  items: ScrapThreadItem[];
  isOpen: boolean;
};

export const ScrapRow: React.FC<Props> = ({ setScraps, scrapId }) => {
  const [scrap, setScrap] = useState<Scrap | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scraps/${scrapId}`)
      .then((response) => {
        setScrap(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("データの取得に失敗しました:", error);
      });
  }, [scrapId]);

  const handleDelete = async () => {
    try {
      await deleteScrap(scrapId);
      const newScraps = await getScraps();
      setScraps(newScraps);
    } catch (error) {
      console.error("削除およびデータ取得に失敗しました:", error);
    }
  };

  return (
    <>
      <Box p="1rem .9rem .9rem" _notFirst={{ borderTop: "1px solid #e4edf4" }}>
        {scrap ? (
          <>
            <Box display="flex">
              <Box flex="1">
                <Link
                  as={NextLink}
                  href={`/scraps/${scrap.id}`}
                  color="#000000d1"
                  fontSize="1.1rem"
                  fontWeight="bold"
                  display="block"
                  _hover={{
                    opacity: "0.7",
                  }}
                >
                  {scrap.title}
                </Link>
              </Box>
              <Box ml="15px">
                <Box
                  as="button"
                  onClick={handleDelete}
                  color="gray.700"
                  _hover={{
                    opacity: "0.7",
                  }}
                >
                  <FaTrash />
                </Box>
              </Box>
            </Box>
            <Box mt="0.5em" display="flex" alignItems="center" gap="0.7rem">
              <Box>
                {scrap.isOpen ? (
                  <Box
                    bg="green.500"
                    borderRadius="3xl"
                    color="white"
                    fontWeight="bold"
                    px="3"
                    py="1"
                    fontSize="xs"
                  >
                    Open
                  </Box>
                ) : (
                  <Box
                    bg="purple.600"
                    borderRadius="3xl"
                    color="white"
                    fontWeight="bold"
                    px="3"
                    py="1"
                    fontSize="xs"
                  >
                    Closed
                  </Box>
                )}
              </Box>
              <Box color="#65717b" fontSize="0.78rem" lineHeight="1.6">
                {formatDate(scrap.updatedAt)}
              </Box>
              <Box
                color="#65717b"
                fontSize="0.78rem"
                lineHeight="1.6"
                display="flex"
                alignItems="center"
                gap="1"
              >
                <FaRegComment />
                {scrap.items.length}
              </Box>
            </Box>
          </>
        ) : (
          <Skeleton h="50px" fadeDuration={5} />
        )}
      </Box>
    </>
  );
};
