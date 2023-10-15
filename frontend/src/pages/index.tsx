import NextLink from "next/link";
import { Box, Link } from "@chakra-ui/react";
import { Head } from "@/components/Head";
import { TopLayout } from "@/components/templates/Top";
import { ScrapRows } from "@/components/organisms/ScrapRows";
import { Link1 } from "@/components/atoms/Link1";

export default function Home() {
  return (
    <>
      <Head />
      <TopLayout>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            as="h1"
            fontSize="2rem"
            fontWeight="bold"
            color="000000d1"
            lineHeight="1.5"
          >
            スクラップ一覧
          </Box>
          <Box>
            <Link1 url="/scraps/new" text="新規作成" />
          </Box>
        </Box>
        <Box mt="6">
          <ScrapRows />
        </Box>
      </TopLayout>
    </>
  );
}
