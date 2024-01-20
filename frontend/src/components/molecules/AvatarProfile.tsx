import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

type Props = {
  user: any;
};

export const AvatarProfile: React.FC<Props> = ({ user }) => {
  return (
    <Box display="flex" gap="3">
      <Avatar src={user.picture} name={user.name} size="lg" />
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Text fontWeight="medium">{user.name}</Text>
        <Text mt="1" color="gray.600" fontSize="xs">
          {user.name}
        </Text>
      </Box>
    </Box>
  );
};
