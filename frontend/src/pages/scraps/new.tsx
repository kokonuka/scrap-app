import { Box } from "@chakra-ui/react";
import { Head } from "@/components/Head";
import { FormLayout } from "@/components/templates/Form";
import { CreateScrapForm } from "@/components/organisms/forms/CreateScrap";

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
          New scraps
        </Box>
        <Box mt="6">
          <CreateScrapForm />
        </Box>
      </FormLayout>
    </>
  );
}
