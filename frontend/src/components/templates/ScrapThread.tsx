import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { Header } from "../organisms/layout/Header";

type Props = {
  children: React.ReactNode;
};

export const ScrapThreadLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box as="main" minH="100vh" style={{ backgroundColor: "#f1f5f9" }}>
      <Header />
      <Container maxW="4xl" p={{ base: "0", md: "4" }}>
        <Box p="1.8rem 0 6rem">{children}</Box>
      </Container>
    </Box>
  );
};
