import "@aws-amplify/ui-react/styles.css";
import { useEffect, useRef } from "react";
import { Auth } from "aws-amplify";
import { ToastId, useToast } from "@chakra-ui/react";
import createToastOption from "@/lib/createToastOption";

function LogoutPage() {
  const toast = useToast();
  const toastId = "logout";
  const toastIdRef = useRef<ToastId>();

  const toastOption = createToastOption(
    toastId,
    "ログアウトしました。",
    "success"
  );

  useEffect(() => {
    Auth.signOut();
    addToast();
  }, []);

  const addToast = () => {
    if (toast.isActive(toastId)) return;
    toastIdRef.current = toast(toastOption);
  };

  return <></>;
}

export default LogoutPage;
