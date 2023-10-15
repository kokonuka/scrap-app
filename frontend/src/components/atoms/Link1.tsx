import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

type Props = {
  url: string;
  text: string;
};

export const Link1: React.FC<Props> = ({ url, text }) => {
  return (
    <Link
      as={NextLink}
      href={url}
      p="0.5em 1em"
      color="#000000d1"
      fontSize="0.9rem"
      lineHeight="1.4"
      bg="#fff"
      border="1px"
      borderColor="#e4edf4"
      borderRadius="0.6em"
      boxShadow="0 2px 4px -2px #21253840"
      _hover={{
        background: "#f5fbff",
      }}
    >
      {text}
    </Link>
  );
};
