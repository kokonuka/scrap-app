import { useState } from "react";
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
import "zenn-content-css";
import { putScrapThreadItem } from "@/lib/requests/scrapThreadItems/put";
import { getScrapThreadItems } from "@/lib/requests/scrapThreadItems/get";
import { ScrapThreadItem } from "@/components/molecules/ScrapThreadItem";
import { LinkCard } from "@/components/molecules/LinkCard";

type formInputs = {
  comment: string;
};

type Props = {
  scrapId: string | string[] | undefined;
  scrapThreadItem: ScrapThreadItem;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setScrapThreadItems: React.Dispatch<React.SetStateAction<ScrapThreadItem[]>>;
};

export const UpdateScrapThreadItemForm: React.FC<Props> = ({
  scrapId,
  scrapThreadItem,
  isEdit,
  setIsEdit,
  setScrapThreadItems,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<formInputs>({
    defaultValues: { comment: scrapThreadItem.content },
  });
  const replace = (node: any) => {
    if (node.name === "a") {
      return node.attribs.style ? <></> : <LinkCard url={node.attribs.href} />;
    }
  };

  const [parsedHtml, setParsedHtml] = useState(
    parse(markdownToHtml(scrapThreadItem.content), { replace })
  );

  const handleCancel = () => {
    setIsEdit(!isEdit);
    reset();
  };

  const handleTextAreaChange = (e: any) => {
    const commentValue = e.target.value;
    const tmp = parse(markdownToHtml(commentValue), { replace });
    setParsedHtml(tmp);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await putScrapThreadItem(scrapId as string, scrapThreadItem.id, data);
      const newScrapThreadItems = await getScrapThreadItems(scrapId as string);
      setScrapThreadItems(newScrapThreadItems);
      setIsEdit(!isEdit);
    } catch (error) {
      console.error("編集およびデータ取得に失敗しました:", error);
    }
  });

  return (
    <Box as="form" mt="4" onSubmit={onSubmit} bg="white">
      <FormControl isInvalid={Boolean(errors.comment)}>
        <Textarea
          placeholder="スラクップにコメントを追加"
          rows={15}
          {...register("comment", {
            required: "必須項目です",
            minLength: { value: 1, message: "1文字以上入力してください" },
          })}
          onChange={handleTextAreaChange}
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
      <Box pt="15px" display="flex" justifyContent="flex-end" gap="3">
        <Box
          as="button"
          onClick={handleCancel}
          type="submit"
          p="0.5em 1em"
          bg="transparent"
          color="#8f9faa"
          fontSize="0.9rem"
          fontWeight="600"
          whiteSpace="nowrap"
        >
          キャンセル
        </Box>
        <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
          更新する
        </Button>
      </Box>
    </Box>
  );
};
