import { Box } from "@chakra-ui/react";
import { ScrapThreadItem } from "../molecules/ScrapThreadItem";

type Props = {
  scrapId: string | string[] | undefined;
  scrapThreadItems: ScrapThreadItem[];
  setScrapThreadItems: React.Dispatch<React.SetStateAction<ScrapThreadItem[]>>;
};

export const ScrapThread: React.FC<Props> = ({
  scrapThreadItems,
  setScrapThreadItems,
  scrapId,
}) => {
  return (
    <Box mt="1.5rem" display="flex" flexDirection="column" gap="5">
      {scrapThreadItems
        ? scrapThreadItems.map((scrapThreadItem) => (
            <ScrapThreadItem
              scrapId={scrapId}
              scrapThreadItem={scrapThreadItem}
              setScrapThreadItems={setScrapThreadItems}
              key={scrapThreadItem.id}
            />
          ))
        : null}
    </Box>
  );
};
