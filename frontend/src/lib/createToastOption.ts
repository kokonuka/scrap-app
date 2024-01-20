import { AlertStatus, UseToastOptions } from "@chakra-ui/react";

const createToastOption = (
  toastId: string,
  title: string,
  status: AlertStatus
) =>
  ({
    id: toastId,
    title,
    status,
    duration: 9000,
    isClosable: true,
    position: "bottom",
  } as UseToastOptions);

export default createToastOption;
