import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "./../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withApollo } from "../utils/withApollo";

interface RegisterProps {}
type Values = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();

  const [register] = useRegisterMutation();

  const handleSubmit = async (
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ) => {
    const response = await register({ variables: { options: values } });
    const errors = response.data?.register.errors;
    if (errors) {
      setErrors(toErrorMap(errors));
    } else if (response.data?.register.user) {
      router.push("/");
    }
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={5}>
              <InputField name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={5}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex mt={5}>
              <Button
                mr={3}
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                register
              </Button>
              <NextLink href="/">
                <Button>back</Button>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Register);
