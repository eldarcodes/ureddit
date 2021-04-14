import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "./../generated/graphql";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 33,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
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
          {data!.posts.posts.map((post) => (
            <Box shadow="sm" borderWidth="1px" p={5} key={post.id}>
              <Heading fontSize="xl">{post.title}</Heading>
              <Text>{post.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Box textAlign="center">
          <Button
            isLoading={fetching}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data!.posts.posts[data!.posts.posts.length - 1]
                  .createdAt,
              });
            }}
            my={4}
          >
            load more
          </Button>
        </Box>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
