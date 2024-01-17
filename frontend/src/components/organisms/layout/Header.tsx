import React from "react";
import NextLink from "next/link";
import {
  Box,
  Container,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FaBoxes, FaRegQuestionCircle } from "react-icons/fa";
import AuthButton from "@/components/atoms/AuthButton";

type Props = {};

export const Header: React.FC<Props> = () => {
  return (
    <Box
      as="header"
      bg="white"
      borderBottom="1px"
      borderColor="gray.100"
      shadow="sm"
    >
      <Container
        maxW="4xl"
        py="3"
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Link
            as={NextLink}
            href="/"
            color="#000000d1"
            fontSize="1.1rem"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            gap="2"
            _hover={{
              opacity: "0.7",
            }}
          >
            <FaBoxes />
            SCRAPS
          </Link>
        </Box>
        <Box display="flex" alignItems="center" gap="5">
          <Box>
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <Box
                  cursor="pointer"
                  fontSize="24px"
                  color="gray.500"
                  _hover={{
                    opacity: "0.7",
                  }}
                >
                  <FaRegQuestionCircle />
                </Box>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>ようこそ!</PopoverHeader>
                <PopoverBody fontSize="sm">
                  <br />
                  What is SCRAPS?
                  <br />
                  <br />
                  SCRAPS&nbsp;は
                  <Box as="span" borderBottom="1px" fontSize="1.1em">
                    &nbsp;スクラップ記録サービス&nbsp;
                  </Box>
                  です。
                  <br />
                  <br />
                  スレッド形式でメモを時系列に整理していくことができます。
                  スレッドのまとまりが「スクラップ」です。
                  <br />
                  <br />
                  何か新しいことをキャッチアップする際、「
                  <Box as="span" fontWeight="bold">
                    情報量が多くまとまらない
                  </Box>
                  」「
                  <Box as="span" fontWeight="bold">
                    後でまとめようと思っていたけど思い出せない
                  </Box>
                  」なんてことはありませんか？
                  <br />
                  <br />
                  SCRAPS&nbsp;ではリアルタイムで考えていることや参考資料といった事柄を
                  <Box as="span" fontSize="1.1em">
                    &quot;メモ&quot;
                  </Box>
                  していくことでそのような問題を解決できます
                  <br />
                  <br />・
                  <Box as="span" borderBottom="1px">
                    考えや参考資料などをコメントに残して思考を整理する
                  </Box>
                  <br />・
                  <Box as="span" borderBottom="1px">
                    後から見返して思考を蘇らせることで情報探索の手間を省く
                  </Box>
                  <br />
                  <br />
                  <br />
                  まずは
                  <Link
                    as={NextLink}
                    href="/scraps/new"
                    color="blue.500"
                    fontWeight="bold"
                    _hover={{
                      opacity: "0.7",
                    }}
                  >
                    &nbsp;新規作成&nbsp;
                  </Link>
                  から最初のスクラップを作成しましょう!
                  <br />
                  <br />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <AuthButton />
        </Box>
      </Container>
    </Box>
  );
};
