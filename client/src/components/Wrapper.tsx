import { Box } from "@chakra-ui/layout";
import React from "react";

export type WrapperVariant = "small" | "regular";
interface WrapperProps {
  variant?: WrapperVariant;
  mt?: number;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  mt = 8,
}) => {
  return (
    <Box
      maxW={variant === "regular" ? "600px" : "400px"}
      width="100%"
      mt={mt}
      mx="auto"
    >
      {children}
    </Box>
  );
};
