import { Avatar, AvatarProps, forwardRef } from "@chakra-ui/react";

export const AvatarButton = forwardRef<AvatarProps, "span">((props, ref) => {
  return (
    <Avatar
      ref={ref}
      size="sm"
      cursor="pointer"
      transition="0.3s"
      _hover={{ filter: "brightness( 0.9 )" }}
      {...props}
    />
  );
});
