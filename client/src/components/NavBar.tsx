import React from "react";
import { Box, Flex, Link } from "@chakra-ui/layout";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex bg="twitter.100" p={4}>
      <Box ml="auto">
        <NextLink href="/login">
          <Link mr="5">login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr="5">register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};
