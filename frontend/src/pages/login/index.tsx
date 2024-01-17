import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { ToastId, UseToastOptions, useToast } from "@chakra-ui/react";

function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const toastId = "login";
  const toastIdRef = useRef<ToastId>();

  const toastOption: UseToastOptions = {
    id: toastId,
    title: "ログインに成功しました。",
    status: "success",
    duration: 9000,
    isClosable: true,
    position: "bottom",
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  const addToast = () => {
    if (!toast.isActive(toastId)) {
      toastIdRef.current = toast(toastOption);
    }
  };

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      addToast();
      router.push("/");
    } catch (error) {}
  };

  return (
    <>{/* <Authenticator signUpAttributes={["email"]}></Authenticator> */}</>
  );
}

// export default LoginPage;
export default withAuthenticator(LoginPage, {
  signUpAttributes: ["email"],
});
