import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Scrap } from "../molecules/ScrapRow";
import { formatDate } from "@/lib/dataUtil";
import { UpdateScrapForm } from "./forms/UpdateScrap";

type Props = {
  scrap: Scrap | null;
  setScrap: React.Dispatch<React.SetStateAction<Scrap | null>>;
};

export const ScrapHeader: React.FC<Props> = ({ scrap, setScrap }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Box>
      <Box fontSize="13px" color="#65717b" lineHeight="1.4" display="flex">
        <Box>{scrap && formatDate(scrap.updatedAt)}</Box>
        <Box ml="0.7rem">{scrap && scrap.items.length}</Box>
      </Box>
      {/* フォームに変換 */}
      {!isEdit ? (
        <Box
          as="h1"
          mt="1rem"
          color="#000000d1"
          fontSize="1.7rem"
          fontWeight="bold"
          lineHeight="1.5"
        >
          {scrap && scrap.title}
          <button onClick={handleEdit}>ボタン</button>
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
