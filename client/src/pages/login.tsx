import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "./../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";

type Values = {
  username: string;
  password: string;
};

const Login: React.FC<{}> = () => {
  const router = useRouter();

  const [, login] = useLoginMutation();

  const handleSubmit = async (
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ) => {
    const response = await login({ options: values });
    const errors = response.data?.login.errors;
    if (errors) {
      setErrors(toErrorMap(errors));
    } else if (response.data?.login.user) {
      router.push("/");
    }
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
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
                login
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

export default Login;
