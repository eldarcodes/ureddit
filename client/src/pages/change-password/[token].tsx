import React, { useState } from "react";
import { Box, Flex, Button, Link } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "./../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withApollo } from "../../utils/withApollo";
interface Values {
  newPassword: string;
}

const ChangePassword: React.FC = () => {
  const [tokenError, setTokenError] = useState("");

  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();

  const handleSubmit = async (
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ) => {
    const response = await changePassword({
      variables: {
        newPassword: values.newPassword,
        token: typeof router.query.token === "string" ? router.query.token : "",
      },
    });
    const errors = response.data?.changePassword.errors;
    if (errors) {
      const errorMap = toErrorMap(errors);
      if ("token" in errorMap) {
        setTokenError(errorMap.token);
      }
      setErrors(errorMap);
    } else if (response.data?.changePassword.user) {
      router.push("/");
    }
  };

  return (
    <Wrapper>
      <Formik initialValues={{ newPassword: "" }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="New password"
              label="New password"
              type="password"
            />
            {tokenError && (
              <Flex>
                <Box color="red" mr={2}>
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>get a new one</Link>
                </NextLink>
              </Flex>
            )}
            <Flex mt={5}>
              <Button
                mr={3}
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                change password
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(ChangePassword);
