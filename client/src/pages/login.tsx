import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "./../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

type Values = {
  usernameOrEmail: string;
  password: string;
};

const Login: React.FC<{}> = () => {
  const router = useRouter();

  const [, login] = useLoginMutation();

  const handleSubmit = async (
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ) => {
    const response = await login(values);
    const errors = response.data?.login.errors;
    if (errors) {
      setErrors(toErrorMap(errors));
    } else if (response.data?.login.user) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="Username or email"
              label="Username or email"
            />
            <Box mt={5}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex mb={5} mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto" color="gray">
                  forgot password?
                </Link>
              </NextLink>
            </Flex>
            <Flex>
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

export default withUrqlClient(createUrqlClient)(Login);
