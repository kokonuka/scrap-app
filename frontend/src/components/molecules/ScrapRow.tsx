import NextLink from "next/link";
import { Box, Button, Link } from "@chakra-ui/react";
import { formatDate } from "@/lib/dataUtil";
import { ScrapThreadItem } from "./ScrapThreadItem";
import { deleteScrap } from "@/lib/requests/deleteScrap";
import { getScraps } from "@/lib/requests/getScraps";
import { FaRegComment, FaTrash } from "react-icons/fa";

type Props = {
  scrap: Scrap;
  setScraps: React.Dispatch<React.SetStateAction<Scrap[]>>;
};

export type Scrap = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  scrap: string;
  items: ScrapThreadItem[];
};

export const ScrapRow: React.FC<Props> = ({ scrap, setScraps }) => {
  const handleDelete = async () => {
    try {
      await deleteScrap(scrap.id);
      const newScraps = await getScraps();
      setScraps(newScraps);
    } catch (error) {
      console.error("削除およびデータ取得に失敗しました:", error);
    }
  };

  return (
    <Box p="1rem .9rem .9rem" _notFirst={{ borderTop: "1px solid #e4edf4" }}>
      <Box display="flex">
        <Box flex="1">
          <Link
            as={NextLink}
            href={`http://localhost:3000/scraps/${scrap.id}`}
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
      <Box mt="0.5em" display="flex" gap="0.7rem">
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
    </Box>
  );
};
