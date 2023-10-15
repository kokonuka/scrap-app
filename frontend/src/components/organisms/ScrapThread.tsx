import { Box } from "@chakra-ui/react";
import { ScrapThreadItem } from "../molecules/ScrapThreadItem";
import { Scrap } from "../molecules/ScrapRow";
import { Dispatch, SetStateAction } from "react";

type Props = {
  scrap: Scrap | null;
  setScrap: Dispatch<SetStateAction<Scrap | null>>;
  scrapId: string | string[] | undefined;
  scrapThreadItems: ScrapThreadItem[];
  setScrapThreadItems: React.Dispatch<React.SetStateAction<ScrapThreadItem[]>>;
};

export const ScrapThread: React.FC<Props> = ({
  scrap,
  setScrap,
  scrapId,
  scrapThreadItems,
  setScrapThreadItems,
}) => {
  return (
    <Box mt="1.5rem" display="flex" flexDirection="column" gap="5">
      {scrapThreadItems
        ? scrapThreadItems.map((scrapThreadItem) => (
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
        : null}
    </Box>
  );
};
