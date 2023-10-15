import React from "react";
import { Box } from "@chakra-ui/react";
import { ScrapRow } from "../molecules/ScrapRow";
import useGetScraps from "@/hooks/useGetScraps";

export const ScrapRows: React.FC = () => {
  const { scraps, setScraps } = useGetScraps();

  return (
    <Box border="1px" borderRadius="md" borderColor="#e4edf4" bg="white">
      {scraps
        ? scraps.map((scrap) => (
            <ScrapRow scrap={scrap} setScraps={setScraps} key={scrap.id} />
          ))
        : null}
    </Box>
  );
};