import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { AvatarButton } from "../../atoms/AvatarButton";
import { AvatarProfile } from "../../molecules/AvatarProfile";
import { LinkButton } from "../../atoms/LinkButton";

const AuthHeader = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user.signInUserSession.idToken.payload);
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <>
      {user ? (
        <Menu>
          {/* forwardRefでないといけない */}
          <MenuButton as={AvatarButton} src={user.picture} name={user.name} />
          <MenuList>
            <MenuItem as="a" href="#">
              <AvatarProfile user={user} />
            </MenuItem>
            <Box py="3" px="3" display="flex" justifyContent="center">
              <LinkButton text="プロフィールを編集" href="#" />
            </Box>
            <MenuDivider />
            <MenuItem as="a" href="#" fontSize="sm">
              設定
            </MenuItem>
            <MenuItem as="a" href="/auth/logout" fontSize="sm">
              ログアウト
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button as="a" href="/auth/login" colorScheme="blue" size="sm">
          ログイン
        </Button>
      )}
    </>
  );
};

export default AuthHeader;
