import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { Box } from "@chakra-ui/react";

const LoginPage = () => (
  <Box
    minH="100vh"
    bg="blackAlpha.500"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Authenticator
      loginMechanisms={["email"]}
      signUpAttributes={["email"]}
      socialProviders={["google"]}
    ></Authenticator>
  </Box>
);

export default LoginPage;
