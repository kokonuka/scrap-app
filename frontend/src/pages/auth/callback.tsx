import "@aws-amplify/ui-react/styles.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { ToastId, UseToastOptions, useToast } from "@chakra-ui/react";
import createToastOption from "@/lib/createToastOption";

const LoginCallbackPage = () => {
  const router = useRouter();
  const toast = useToast();
  const toastId = "login";
  const toastIdRef = useRef<ToastId>();

  const successToastOption = createToastOption(
    toastId,
    "ログインに成功しました。",
    "success"
  );
  const errorToastOption = createToastOption(
    toastId,
    "ログインに失敗しました。",
    "error"
  );

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      addToast(successToastOption);
      router.push("/");
    } catch (error) {
      console.log(error);
      addToast(errorToastOption);
      router.push("/");
    }
  };

  const addToast = (toastOption: UseToastOptions) => {
    if (toast.isActive(toastId)) return;
    toastIdRef.current = toast(toastOption);
  };

  return <></>;
};

export default LoginCallbackPage;
