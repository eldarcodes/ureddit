import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "./../generated/graphql";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 3,
    },
  });

  if (!data && !fetching) {
    return <div>you got query failer for some reason</div>;
  }

  return (
    <Layout variant="regular">
      <Flex justifyContent="space-between" mb="5" align="center">
        <Heading>uReddit</Heading>
        <NextLink href="/create-post">
          <Button>create post</Button>
        </NextLink>
      </Flex>

      {fetching && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={4}>
          {data!.posts.map((post) => (
            <Box shadow="sm" borderWidth="1px" p={5} key={post.id}>
              <Heading fontSize="xl">{post.title}</Heading>
              <Text>{post.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      <Box textAlign="center">
        <Button my={4}>load more</Button>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
