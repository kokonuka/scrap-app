import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { postScrap } from "@/lib/requests/postScrap";

export type formInputs = {
  title: string;
};

export const CreateScrapForm: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await postScrap(data);
      // Todo: スクラップ一覧を取得して最新のスクラップのスレッドに移動
      router.push("/");
    } catch (error) {
      console.error("スクラップの作成に失敗しました:", error);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <FormControl isInvalid={Boolean(errors.title)}>
        <Textarea
          placeholder="タイトル"
          {...register("title", {
            required: "必須項目です",
            minLength: { value: 1, message: "1文字以上入力してください" },
          })}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>
      <Box mt="10" textAlign="center">
        <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
          スクラップを作成
        </Button>
      </Box>
    </form>
  );
};
