import React, { useState } from "react";
import { Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useForgotPasswordMutation } from "./../generated/graphql";

type Values = {
  email: string;
};

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (values: Values) => {
    await forgotPassword(values);
    setComplete(true);
  };

  return (
    <Wrapper>
      <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists, we send you an email
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              />
              <Button
                mt={5}
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                send message
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
