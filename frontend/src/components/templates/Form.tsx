import React from "react";
import { Box, Container } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export const FormLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box as="main" minH="100vh">
      <Container maxW="440px">
        <Box p="4rem 0 4.5rem">{children}</Box>
      </Container>
    </Box>
  );
};
