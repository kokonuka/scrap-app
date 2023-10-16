import { Box } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

type Props = {
  handler: () => Promise<void>;
  isDisabled: boolean;
};

export const DownButton: React.FC<Props> = ({ handler, isDisabled }) => {
  return (
    <Box
      as="button"
      onClick={handler}
      disabled={isDisabled}
      p="2"
      borderRadius="50%"
      color={!isDisabled ? "gray.700" : "gray.300"}
      cursor={!isDisabled ? "pointer" : "auto"}
      _hover={{
        background: !isDisabled ? "gray.100" : "transparent",
      }}
    >
      <FaChevronDown />
    </Box>
  );
};
