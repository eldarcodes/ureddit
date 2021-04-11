import { UsernamePasswordInput } from "./UsernamePasswordInput";

export const validateRegister = ({
  username,
  email,
  password,
}: UsernamePasswordInput) => {
  if (username.length <= 3) {
    return [
      {
        field: "username",
        message: "username length must be greater than 3",
      },
    ];
  }

  if (username.includes("@")) {
    return [
      {
        field: "username",
        message: "username cannot include '@'",
      },
    ];
  }

  if (!email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (password.length <= 4) {
    return [
      {
        field: "password",
        message: "password length must be greater than 4",
      },
    ];
  }
  return null;
};
