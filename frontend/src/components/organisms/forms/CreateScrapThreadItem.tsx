import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import markdownToHtml from "zenn-markdown-html";
import { ScrapThreadItem } from "@/components/molecules/ScrapThreadItem";
import { postScrapThreadItem } from "@/lib/requests/scrapThreadItems/post";
import { getScrapThreadItems } from "@/lib/requests/scrapThreadItems/get";
import { Scrap } from "@/components/molecules/ScrapRow";
import { LinkCard } from "@/components/molecules/LinkCard";

export type formInputs = {
  comment: string;
};

type Props = {
  setScrap: Dispatch<SetStateAction<Scrap | null>>;
  setScrapThreadItems: React.Dispatch<React.SetStateAction<ScrapThreadItem[]>>;
};

export const CreateScrapThreadItemForm: React.FC<Props> = ({
  setScrap,
  setScrapThreadItems,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formInputs>();

  const replace = (node: any) => {
    if (node.name === "a") {
      return node.attribs.style ? <></> : <LinkCard url={node.attribs.href} />;
    }
  };

  const [parsedHtml, setParsedHtml] = useState<
    string | JSX.Element | JSX.Element[]
  >("");

  const handleTextAreaChange = (e: any) => {
    const commentValue = e.target.value;
    const tmp = parse(markdownToHtml(commentValue), { replace });
    setParsedHtml(tmp);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await postScrapThreadItem(id as string, data);
      const newScrapThreadItems = await getScrapThreadItems(id as string);
      setScrap((prevScrap) => {
        if (!prevScrap) return prevScrap;
        return {
          ...prevScrap,
          items: newScrapThreadItems,
        };
      });
      setScrapThreadItems(newScrapThreadItems);
      reset();
    } catch (error) {
      console.error("編集およびデータ取得に失敗しました:", error);
    }
  });

  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      bg="white"
      p="0.8rem 1.1rem 1rem"
      borderRadius="md"
    >
      <FormControl isInvalid={Boolean(errors.comment)}>
        <Textarea
          placeholder="スラクップにコメントを追加"
          rows={10}
          {...register("comment", {
            required: "必須項目です",
            minLength: { value: 1, message: "1文字以上入力してください" },
          })}
          onChange={handleTextAreaChange}
          borderTop="none"
          borderRight="none"
          borderLeft="none"
          borderRadius="none"
          _focusVisible={{ boxShadow: "none" }}
        />
        <FormErrorMessage>
          {errors.comment && errors.comment.message}
        </FormErrorMessage>
      </FormControl>
      <Box borderBottom="1px" pb="5" borderColor="gray.100">
        <Box mt="5" fontWeight="bold" fontSize="xs">
          Markdown Preview
        </Box>
        <Box
          className="znc"
          mt="5"
          fontSize={{ base: "14px", md: "16px" }}
          lineHeight="1.7"
        >
          {parsedHtml}
        </Box>
      </Box>
      <Box pt="15px" display="flex" justifyContent="flex-end">
        <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
          投稿する
        </Button>
      </Box>
    </Box>
  );
};
