import { useState } from "react";
import { Box, Skeleton } from "@chakra-ui/react";
import { Scrap } from "../molecules/ScrapRow";
import { formatDate } from "@/lib/dataUtil";
import { UpdateScrapForm } from "./forms/UpdateScrap";
import { FaRegComment } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";

type Props = {
  scrap: Scrap | null;
  setScrap: React.Dispatch<React.SetStateAction<Scrap | null>>;
  isLoading: boolean;
};

export const ScrapHeader: React.FC<Props> = ({
  scrap,
  setScrap,
  isLoading,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Box>
      <Box fontSize="13px" color="#65717b" lineHeight="1.4" display="flex">
        {scrap ? (
          <>
            <Box>{scrap && formatDate(scrap.updatedAt)}</Box>
            <Box ml="0.7rem" display="flex" alignItems="center" gap="1">
              <FaRegComment />
              {scrap && scrap.items.length}
            </Box>
          </>
        ) : (
          <Skeleton w="100px" h="20px" fadeDuration={5} />
        )}
      </Box>
      {!isEdit ? (
        <Box mt="1rem" display="flex" alignItems="center" gap="2">
          {scrap ? (
            <Box
              as="h1"
              color="#000000d1"
              fontSize="1.7rem"
              fontWeight="bold"
              lineHeight="1.5"
            >
              {scrap && scrap.title}
            </Box>
          ) : (
            <Skeleton w="50%" h="20px" fadeDuration={5} />
          )}
          <Box
            as="button"
            onClick={handleEdit}
            color="#8f9faa"
            fontSize="22px"
            _hover={{
              opacity: "0.7",
            }}
          >
            <BiPencil />
          </Box>
        </Box>
      ) : (
        <UpdateScrapForm
          scrap={scrap as Scrap}
          setScrap={setScrap}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
    </Box>
  );
};
