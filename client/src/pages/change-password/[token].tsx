import React from "react";
import { NextPage } from "next";
import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";

interface Values {
  newPassword: string;
}

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const handleSubmit = (values: Values) => {
    console.log(values, token);
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

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
