import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { ScrapThreadItem } from "@/components/molecules/ScrapThreadItem";
import { postScrapThreadItem } from "@/lib/requests/scrapThreadItems/post";
import { getScrapThreadItems } from "@/lib/requests/scrapThreadItems/get";

export type formInputs = {
  comment: string;
};

type Props = {
  setScrapThreadItems: React.Dispatch<React.SetStateAction<ScrapThreadItem[]>>;
};

export const CreateScrapThreadItemForm: React.FC<Props> = ({
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await postScrapThreadItem(id as string, data);
      const newScrapThreadItems = await getScrapThreadItems(id as string);
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
          {...register("comment", {
            required: "必須項目です",
            minLength: { value: 1, message: "1文字以上入力してください" },
          })}
        />
        <FormErrorMessage>
          {errors.comment && errors.comment.message}
        </FormErrorMessage>
      </FormControl>
      <Box pt="15px" display="flex" justifyContent="flex-end">
        <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
          投稿する
        </Button>
      </Box>
    </Box>
  );
};
