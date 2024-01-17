import React, { useState, useEffect, useRef } from "react";
import { Auth } from "aws-amplify";
import { Button, ToastId, UseToastOptions, useToast } from "@chakra-ui/react";

const AuthButton = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const toast = useToast();
  const toastId = "logout";
  const toastIdRef = useRef<ToastId>();

  const toastOption: UseToastOptions = {
    id: toastId,
    title: "ログアウトしました。",
    status: "success",
    duration: 9000,
    isClosable: true,
    position: "bottom",
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsSignedIn(true);
    } catch (error) {
      setIsSignedIn(false);
    }
  };

  const addToast = () => {
    if (!toast.isActive(toastId)) {
      toastIdRef.current = toast(toastOption);
    }
  };

  const signOut = () => {
    Auth.signOut();
    setIsSignedIn(false);
    addToast();
  };

  return (
    <div>
      {isSignedIn ? (
        <Button colorScheme="blue" size="sm" onClick={signOut}>
          ログアウト
        </Button>
      ) : (
        <Button
          as="a"
          href="/login"
          colorScheme="blue"
          size="sm"
          onClick={signOut}
        >
          ログイン
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
