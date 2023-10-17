import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { deleteScrapThreadItem } from "@/lib/requests/scrapThreadItems/delete";
import { getScrapThreadItems } from "@/lib/requests/scrapThreadItems/get";
import { formatDate } from "@/lib/dataUtil";
import { moveDownScrapThreadItem } from "@/lib/requests/scrapThreadItems/down";
import { moveUpScrapThreadItem } from "@/lib/requests/scrapThreadItems/up";
import { UpdateScrapThreadItemForm } from "../organisms/forms/UpdateScrapThreadItem";
import { Scrap } from "./ScrapRow";
import { createLinkCardFromURL } from "@/lib/createLinkCardFromURL";
import { convertTextToLink } from "@/lib/convertTextToLink";
import { UpButton } from "../atoms/UpButton";
import { DownButton } from "../atoms/DownButton";

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
  const [content, setContent] = useState<(string | React.JSX.Element)[]>([
    scrapThreadItem.content,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const tmpContent = await convertTextToLink(scrapThreadItem.content);
      setContent(tmpContent);
    };
    fetchData();
  }, [scrapThreadItem]);

  useEffect(() => {
    const fetchData = async () => {
      const tmpContent = await createLinkCardFromURL(scrapThreadItem.content);
      setContent(tmpContent);
    };
    fetchData();
  }, [scrapThreadItem]);

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
    <Box as="article" p="1rem 1.3rem" bg="white" display="flex">
      <Box flex="1">
        <Box display="flex" gap="3">
          <Box flex="1" fontSize="12px" color="#8f9faa">
            {formatDate(scrapThreadItem.updatedAt)}
          </Box>
          <Box display="flex" gap="5">
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
          <Box display="flex">
            {scrapThreadItem.order !== 1 ? (
              <UpButton handler={handleUp} isDisabled={false} />
            ) : (
              <UpButton handler={handleUp} isDisabled={true} />
            )}
            {scrapThreadItem.order !== scrapThreadItems.length ? (
              <DownButton handler={handleDown} isDisabled={false} />
            ) : (
              <DownButton handler={handleDown} isDisabled={true} />
            )}
          </Box>
        </Box>
        <Box mt="0.8rem">
          {!isEdit ? (
            <Box display="flex">
                {content}
              <Box flex="1" whiteSpace="pre-line" lineHeight="1.7">
              </Box>
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
      </Box>
    </Box>
  );
};
