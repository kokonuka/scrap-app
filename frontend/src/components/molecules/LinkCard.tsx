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
        const startTime = performance.now();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/ogp?url=${url}`
        );
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(`実行時間: ${executionTime} ミリ秒 url: ${url}`);
        const data = response.data;
        setData(data);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };
    fetchData();
  }, [url]);

  return (
    <>
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
          <Box as="span" flex="1" p="0.8em 1.2em">
            <Box
              as="span"
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
              as="span"
              mt="0.5em"
              fontSize="0.8em"
              color="#77838c"
              lineHeight="1.5"
              alignItems="center"
              overflow={{ base: "hidden", md: "" }}
              display={{ base: "-webkit-box", md: "" }}
              sx={{
                ["WebkitBoxOrient" as any]: "vertical",
                ["WebkitLineClamp" as any]: { base: 1, md: 1 },
              }}
            >
              <Box as="span">{data.description}</Box>
            </Box>
            <Box
              as="span"
              mt="0.5em"
              fontSize="0.8em"
              color="rgba(0,0,0,0.82)"
              lineHeight="1.5"
            >
              {extractHostname(data.url)}
            </Box>
          </Box>
          <Box as="span" position="relative" w="120px" h="120px">
            <NextImage
              src={data.image}
              alt="article"
              fill
              style={{
                objectFit: "cover",
                margin: "0",
              }}
            />
          </Box>
        </Link>
      ) : (
        <Box
          as="span"
          mt="1"
          height="118px"
          border="1px solid rgba(92,147,187,.2)"
          borderRadius="md"
          display="flex"
          overflow="hidden"
        >
          <Box as="span" flex="1" p="0.8em 1.2em">
            <Skeleton as="span" display="block" w="100%" h="40%" />
            <Skeleton as="span" display="block" mt="3" w="100%" h="15%" />
          </Box>
          <Skeleton
            as="span"
            display="block"
            w="118px"
            h="118px"
            borderRadius="none"
          />
        </Box>
      )}
    </>
  );
};
