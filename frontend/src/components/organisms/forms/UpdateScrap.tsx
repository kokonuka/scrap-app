import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Scrap } from "@/components/molecules/ScrapRow";
import { putScrap } from "@/lib/requests/scraps/put";
import { getScrap } from "@/lib/requests/scraps/get";

export type formInputs = {
  title: string;
};

type Props = {
  scrap: Scrap;
  setScrap: React.Dispatch<React.SetStateAction<Scrap | null>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateScrapForm: React.FC<Props> = ({
  scrap,
  setScrap,
  isEdit,
  setIsEdit,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formInputs>({
    defaultValues: { title: scrap.title },
  });

  const handleCancel = () => {
    setIsEdit(!isEdit);
    reset();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await putScrap(scrap.id, data);
      const newScrap = await getScrap(scrap.id);
      setScrap(newScrap);
      setIsEdit(!isEdit);
    } catch (error) {
      console.error("編集およびデータ取得に失敗しました:", error);
    }
  });

  return (
    <Box as="form" mt="4" onSubmit={onSubmit} display="flex" gap="3">
      <FormControl isInvalid={Boolean(errors.title)}>
        <Input
          bg="white"
          {...register("title", {
            required: "必須項目です",
            minLength: { value: 1, message: "1文字以上入力してください" },
          })}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>
      <Box display="flex" justifyContent="flex-end" gap="3">
        <Button
          onClick={handleCancel}
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
        >
          キャンセル
        </Button>
        <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
          更新する
        </Button>
      </Box>
    </Box>
  );
};
