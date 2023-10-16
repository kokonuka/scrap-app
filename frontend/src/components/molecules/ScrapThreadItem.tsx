import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { Box, Button, Link } from "@chakra-ui/react";
import { deleteScrapThreadItem } from "@/lib/requests/scrapThreadItems/delete";
import { getScrapThreadItems } from "@/lib/requests/scrapThreadItems/get";
import { UpdateScrapThreadItemForm } from "../organisms/forms/UpdateScrapThreadItem";
import { formatDate } from "@/lib/dataUtil";
import { BiPencil } from "react-icons/bi";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { Scrap } from "./ScrapRow";
import { moveUpScrapThreadItem } from "@/lib/requests/scrapThreadItems/up";
import { moveDownScrapThreadItem } from "@/lib/requests/scrapThreadItems/down";
import styles from "@/styles/Home.module.css";
import axios from "axios";

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
  const [content, setContent] = useState<(string | React.JSX.Element)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setContent(await addLinksToText(scrapThreadItem.content));
      // データをセットするなどの処理
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

  const extractHostname = (url: string) => {
    var hostname;

    // ホスト名を抽出するために、URLオブジェクトを使用します
    var parser = document.createElement("a");
    parser.href = url;

    // ホスト名を取得します
    hostname = parser.hostname;

    return hostname;
  };

  const truncateString = (str: string, maxLength: number) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + "...";
    }
  };

  const addLinksToText = async (text: string) => {
    // 文字内なら色をつけるだけ
    const regex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(regex);

    let newParts: (string | React.JSX.Element)[] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (!regex.test(part)) {
        newParts[i] = part;
        continue;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/ogp?url=${part}`
        );
        const data = response.data;

        newParts[i] = (
          <Box key={i}>
            {/* <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue" }}
              className={styles.linkStyle}
            >
              {data.url}
            </a> */}
            <Link
              as={NextLink}
              href={data.url}
              target="_blank"
              height="118px"
              display="flex"
              alignItems="center"
              border="1px solid rgba(92,147,187,.2)"
              borderRadius="md"
              overflow="hidden"
              _hover={{
                background: "rgba(239,246,251,0.7)",
              }}
            >
              <Box flex="1" p="0.8em 1.2em">
                <Box
                  fontSize="1em"
                  color="rgba(0,0,0,0.82)"
                  fontWeight="bold"
                  lineHeight="1.5"
                >
                  {data.title}
                </Box>
                <Box
                  mt="0.5em"
                  fontSize="0.8em"
                  color="#77838c"
                  lineHeight="1.5"
                  display="flex"
                  alignItems="center"
                >
                  <Box as="span">{truncateString(data.description, 54)}</Box>
                </Box>
                <Box
                  mt="0.5em"
                  fontSize="0.8em"
                  color="rgba(0,0,0,0.82)"
                  lineHeight="1.5"
                >
                  {extractHostname(data.url)}
                </Box>
              </Box>
              <Box position="relative" w="120px" h="120px">
                <NextImage
                  src={data.image}
                  alt="article"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Link>
          </Box>
        );
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
        throw error;
      }
    }

    return newParts;
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
      <Box mt="0.8rem">
        {!isEdit ? (
          <Box display="flex">
            <Box flex="1" whiteSpace="pre-line" lineHeight="1.7">
              {content.length > 0 ? content : scrapThreadItem.content}
              {/* {scrapThreadItem.content} */}
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
  );
};
