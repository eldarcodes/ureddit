import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "./../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface RegisterProps {}
type Values = {
  username: string;
  password: string;
};

const Register: React.FC<RegisterProps> = () => {
  const [, register] = useRegisterMutation();

  const handleSubmit = async (
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ) => {
    const response = await register(values);
    const errors = response.data?.register.errors;
    if (errors) {
      setErrors(toErrorMap(errors));
    } else if (response.data?.register.user) {
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
            <Button
              mt={5}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
