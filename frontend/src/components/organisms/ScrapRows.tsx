import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { ScrapRow } from "../molecules/ScrapRow";
import useGetScraps from "@/hooks/useGetScraps";

export const ScrapRows: React.FC = () => {
  const { scraps, setScraps, isLoading } = useGetScraps();

  return (
    <>
      {!isLoading ? (
        <>
          {scraps.length > 0 && (
            <Box
              border="1px"
              borderRadius="md"
              borderColor="#e4edf4"
              bg="white"
            >
              {scraps.map((scrap) => (
                <ScrapRow
                  setScraps={setScraps}
                  scrapId={scrap.id}
                  key={scrap.id}
                />
              ))}
            </Box>
          )}
        </>
      ) : (
        <Box display="flex" justifyContent="center">
          <Spinner />
        </Box>
      )}
    </>
  );
};
