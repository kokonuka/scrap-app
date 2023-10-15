import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { ScrapThreadItem } from "@/components/molecules/ScrapThreadItem";
import { putScrapThreadItem } from "@/lib/requests/scrapThreadItems/put";
import { getScrapThreadItems } from "@/lib/requests/scrapThreadItems/get";

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
  } = useForm<formInputs>({
    defaultValues: { comment: scrapThreadItem.content },
  });

  const handleCancel = () => {
    setIsEdit(!isEdit);
    reset();
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
          {...register("comment", {
            required: "必須項目です",
            minLength: { value: 1, message: "1文字以上入力してください" },
          })}
        />
        <FormErrorMessage>
          {errors.comment && errors.comment.message}
        </FormErrorMessage>
      </FormControl>
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
