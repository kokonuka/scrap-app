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
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
          p="0.5em 1em"
          color="#000000d1"
          fontSize="0.8rem"
          lineHeight="1.4"
          bg="#fff"
          border="1px"
          borderColor="#e4edf4"
          borderRadius="0.6em"
          boxShadow="0 2px 4px -2px #21253840"
          _hover={{
            background: "#f5fbff",
          }}
        >
          保存
        </Button>
        <Box
          as="button"
          onClick={handleCancel}
          type="submit"
          bg="transparent"
          color="#65717b"
          fontSize="0.8rem"
          fontWeight="normal"
          whiteSpace="nowrap"
        >
          キャンセル
        </Box>
      </Box>
    </Box>
  );
};
