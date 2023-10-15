import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { deleteScrapThreadItem } from "@/lib/requests/scrapThreadItems/delete";
import { getScrapThreadItems } from "@/lib/requests/scrapThreadItems/get";
import { UpdateScrapThreadItemForm } from "../organisms/forms/UpdateScrapThreadItem";
import { formatDate } from "@/lib/dataUtil";
import { BiPencil } from "react-icons/bi";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { Scrap } from "./ScrapRow";
import { moveUpScrapThreadItem } from "@/lib/requests/scrapThreadItems/up";
import { moveDownScrapThreadItem } from "@/lib/requests/scrapThreadItems/down";

export type formInputs = {
  comment: string;
};

type Props = {
  scrap: Scrap | null;
  setScrap: Dispatch<SetStateAction<Scrap | null>>;
  scrapId: string | string[] | undefined;
  scrapThreadItems: ScrapThreadItem[];
  scrapThreadItem: ScrapThreadItem;
  setScrapThreadItems: React.Dispatch<React.SetStateAction<ScrapThreadItem[]>>;
};

export type ScrapThreadItem = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  order: number;
};

export const ScrapThreadItem: React.FC<Props> = ({
  scrap,
  setScrap,
  scrapId,
  scrapThreadItems,
  scrapThreadItem,
  setScrapThreadItems,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = async () => {
    try {
      await deleteScrapThreadItem(scrapId as string, scrapThreadItem.id);
      const newScrapThreadItems = await getScrapThreadItems(scrapId as string);
      setScrap((prevScrap) => {
        if (!prevScrap) return prevScrap;
        return {
          ...prevScrap,
          items: newScrapThreadItems,
        };
      });
      setScrapThreadItems(newScrapThreadItems);
    } catch (error) {
      console.error("削除およびデータ取得に失敗しました:", error);
    }
  };

  const handleUp = async () => {
    try {
      await moveUpScrapThreadItem(scrapId as string, scrapThreadItem.id);
      const newScrapThreadItems = await getScrapThreadItems(scrapId as string);
      setScrapThreadItems(newScrapThreadItems);
    } catch (error) {
      console.error("並び替えおよびデータ取得に失敗しました:", error);
    }
  };

  const handleDown = async () => {
    try {
      await moveDownScrapThreadItem(scrapId as string, scrapThreadItem.id);
      const newScrapThreadItems = await getScrapThreadItems(scrapId as string);
      setScrapThreadItems(newScrapThreadItems);
    } catch (error) {
      console.error("並び替えおよびデータ取得に失敗しました:", error);
    }
  };

  return (
    <Box as="article" p="1rem 1.3rem" bg="white">
      <Box display="flex">
        <Box flex="1" fontSize="12px" color="#8f9faa">
          {formatDate(scrapThreadItem.updatedAt)}
        </Box>
        <Box display="flex" gap="3">
          <Box
            as="button"
            onClick={handleEdit}
            color="gray.700"
            fontSize="22px"
            _hover={{
              opacity: "0.7",
            }}
          >
            <BiPencil />
          </Box>
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
      <Box mt="0.8rem" display="flex">
        <Box flex="1">
          {!isEdit ? (
            <Box lineHeight="1.7" whiteSpace="pre-line">
              {scrapThreadItem.content}
            </Box>
          ) : (
            <UpdateScrapThreadItemForm
              scrapId={scrapId}
              scrapThreadItem={scrapThreadItem}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              setScrapThreadItems={setScrapThreadItems}
            />
          )}
        </Box>
        <Box mt="1" display="flex" flexDirection="column">
          {scrapThreadItem.order !== 1 ? (
            <Box
              as="button"
              onClick={handleUp}
              p="2"
              borderRadius="50%"
              color="gray.700"
              _hover={{
                background: "gray.100",
              }}
            >
              <FaChevronUp />
            </Box>
          ) : (
            <Box pt="32px"></Box>
          )}
          {scrapThreadItem.order !== scrapThreadItems.length ? (
            <Box
              as="button"
              onClick={handleDown}
              p="2"
              borderRadius="50%"
              color="gray.700"
              _hover={{
                background: "gray.100",
              }}
            >
              <FaChevronDown />
            </Box>
          ) : (
            <Box pt="32px"></Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
