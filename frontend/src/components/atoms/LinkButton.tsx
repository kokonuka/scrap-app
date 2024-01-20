import { Button } from "@chakra-ui/react";
import React from "react";

type Props = {
  text: string;
  href: string;
};

export const LinkButton: React.FC<Props> = ({ text, href }) => {
  return (
    <Button
      as="a"
      href={href}
      w="100%"
      h="auto"
      py="2"
      bg="transparent"
      fontSize="sm"
      color="blackAlpha.700"
      fontWeight="normal"
      border="1px"
      borderColor="gray.300"
      borderRadius="3xl"
    >
      {text}
    </Button>
  );
};
