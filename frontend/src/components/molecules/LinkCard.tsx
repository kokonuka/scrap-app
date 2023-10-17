import NextLink from "next/link";
import NextImage from "next/image";
import { Box, Link } from "@chakra-ui/react";
import { extractHostname } from "@/lib/textUtil";

type Props = {
  data: any;
};

export const LinkCard: React.FC<Props> = ({ data }) => {
  return (
    <Link
      as={NextLink}
      href={data.url}
      target="_blank"
      height="118px"
      display="flex"
      alignItems="center"
      border="1px solid rgba(92,147,187,.2)"
      borderRadius="md"
      overflow="hidden"
      _hover={{
        background: "rgba(239,246,251,0.7)",
      }}
    >
      <Box flex="1" p="0.8em 1.2em">
        <Box
          fontSize="1em"
          color="rgba(0,0,0,0.82)"
          fontWeight="bold"
          lineHeight="1.5"
          overflow={{ base: "hidden", md: "" }}
          display={{ base: "-webkit-box", md: "" }}
          sx={{
            ["WebkitBoxOrient" as any]: "vertical",
            ["WebkitLineClamp" as any]: 2,
          }}
        >
          {data.title}
        </Box>
        <Box
          mt="0.5em"
          fontSize="0.8em"
          color="#77838c"
          lineHeight="1.5"
          alignItems="center"
          overflow={{ base: "hidden", md: "" }}
          display={{ base: "-webkit-box", md: "" }}
          sx={{
            ["WebkitBoxOrient" as any]: "vertical",
            ["WebkitLineClamp" as any]: { base: 1, md: 2 },
          }}
        >
          <Box as="span">{data.description}</Box>
        </Box>
        <Box
          mt="0.5em"
          fontSize="0.8em"
          color="rgba(0,0,0,0.82)"
          lineHeight="1.5"
        >
          {extractHostname(data.url)}
        </Box>
      </Box>
      <Box position="relative" w="120px" h="120px">
        <NextImage
          src={data.image}
          alt="article"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
    </Link>
  );
};
