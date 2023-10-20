import { Box } from "@chakra-ui/react";
import { Head } from "@/components/Head";
import { FormLayout } from "@/components/templates/Form";
import { CreateScrapForm } from "@/components/organisms/forms/CreateScrap";
import { BsFillInboxFill } from "react-icons/bs";

export default function NewScrapPage() {
  return (
    <>
      <Head />
      <FormLayout>
        <Box
          as="h1"
          color="#000000d1"
          fontSize="2.4rem"
          fontWeight="bold"
          lineHeight="1.5"
          textAlign="center"
        >
          New scrap
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color="#8f9faa"
        >
          <Box mt="4" fontWeight="bold">
            スクラップを作成しましょう
          </Box>
          <Box mt="4" fontSize="5xl">
            <BsFillInboxFill />
          </Box>
        </Box>
        <Box mt="5">
          <CreateScrapForm />
        </Box>
      </FormLayout>
    </>
  );
}
