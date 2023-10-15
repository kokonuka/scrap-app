import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { deleteScrapThreadItem } from "@/lib/requests/scrapThreadItems/delete";
import { getScrapThreadItems } from "@/lib/requests/scrapThreadItems/get";
import { UpdateScrapThreadItemForm } from "../organisms/forms/UpdateScrapThreadItem";
import { formatDate } from "@/lib/dataUtil";

export type formInputs = {
  comment: string;
};

type Props = {
  scrapId: string | string[] | undefined;
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
  scrapThreadItem,
  setScrapThreadItems,
  scrapId,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = async () => {
    try {
      await deleteScrapThreadItem(scrapId as string, scrapThreadItem.id);
      const newScrapThreadItems = await getScrapThreadItems(scrapId as string);
      setScrapThreadItems(newScrapThreadItems);
    } catch (error) {
      console.error("削除およびデータ取得に失敗しました:", error);
    }
  };

  return (
    <Box as="article" p="1rem 1.3rem" bg="white">
      <Box display="flex">
        <Box flex="1" fontSize="12px" color="#8f9faa">
          {formatDate(scrapThreadItem.updatedAt)}
        </Box>
        <Box display="flex" gap="3">
          <Button onClick={handleEdit}>編集</Button>
          <Button onClick={handleDelete}>削除</Button>
        </Box>
      </Box>
      {!isEdit ? (
        <Box mt="0.8rem" lineHeight="1.7" whiteSpace="pre-line">
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
  );
};
