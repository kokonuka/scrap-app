import { Box, Spinner } from "@chakra-ui/react";
import { ScrapThreadItem } from "../molecules/ScrapThreadItem";
import { Scrap } from "../molecules/ScrapRow";
import { Dispatch, SetStateAction } from "react";
import { AiFillEdit } from "react-icons/ai";

type Props = {
  scrap: Scrap | null;
  setScrap: Dispatch<SetStateAction<Scrap | null>>;
  scrapId: string | string[] | undefined;
  scrapThreadItems: ScrapThreadItem[];
  setScrapThreadItems: React.Dispatch<React.SetStateAction<ScrapThreadItem[]>>;
  isLoading: boolean;
};

export const ScrapThread: React.FC<Props> = ({
  scrap,
  setScrap,
  scrapId,
  scrapThreadItems,
  setScrapThreadItems,
  isLoading,
}) => {
  return (
    <Box mt="1.5rem" display="flex" flexDirection="column" gap="5">
      {!isLoading ? (
        <>
          {scrapThreadItems.length > 0 ? (
            scrapThreadItems.map((scrapThreadItem) => (
              <ScrapThreadItem
                scrap={scrap}
                setScrap={setScrap}
                scrapId={scrapId}
                scrapThreadItems={scrapThreadItems}
                scrapThreadItem={scrapThreadItem}
                setScrapThreadItems={setScrapThreadItems}
                key={scrapThreadItem.id}
              />
            ))
          ) : (
            <Box
              p="2rem 0"
              bg="white"
              display="flex"
              flexDirection="column"
              alignItems="center"
              color="#8f9faa"
            >
              <Box fontWeight="bold">最初のコメントを追加しましょう</Box>
              <Box mt="1rem" fontSize="5xl">
                <AiFillEdit />
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Box display="flex" justifyContent="center">
          <Spinner />
        </Box>
      )}
    </Box>
  );
};
