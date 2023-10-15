import React from "react";
import NextLink from "next/link";
import { Box, Container, Link } from "@chakra-ui/react";
import { FaBoxes } from "react-icons/fa";

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
      </Container>
    </Box>
  );
};
