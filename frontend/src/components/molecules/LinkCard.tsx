import { useEffect, useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import axios from "axios";
import { Box, Link, Skeleton } from "@chakra-ui/react";
import { extractHostname } from "@/lib/textUtil";

type Props = {
  url: string;
};

type MetaData = {
  url: string;
  title: string;
  description: string;
  image: string;
};

export const LinkCard: React.FC<Props> = ({ url }) => {
  const [data, setData] = useState<MetaData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/ogp?url=${url}`
        );
        const data = response.data;
        setData(data);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
        throw error;
      }
    };
    fetchData();
  }, [url]);

  return (
    <>
      <a href={url} target="_blank">
        {url}
      </a>
      {data ? (
        <Link
          as={NextLink}
          href={data.url}
          target="_blank"
          mt="1"
          height="118px"
          display="flex"
          alignItems="center"
          border="1px solid rgba(92,147,187,.2)"
          borderRadius="md"
          overflow="hidden"
          _hover={{
            background: "rgba(239,246,251,0.7)",
            textDecoration: "none !important",
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
      ) : (
        <Box
          p="5"
          mt="1"
          height="118px"
          border="1px solid rgba(92,147,187,.2)"
          borderRadius="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Skeleton w="100%" h="100%" />
        </Box>
      )}
    </>
  );
};
