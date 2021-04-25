import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { UpdootSection } from "../components/UpdootSection";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "./../generated/graphql";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!data && !fetching) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout variant="regular">
      <Flex justifyContent="space-between" mb="5" align="center">
        <NextLink href="/create-post">
          <Button>create post</Button>
        </NextLink>
      </Flex>

      {fetching && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={4}>
          {data!.posts.posts.map((post) => (
            <Flex shadow="sm" borderWidth="1px" p={5} key={post.id}>
              <UpdootSection post={post} />
              <Flex width="100%" justifyContent="space-between">
                <Box>
                  <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                    <Link>
                      <Heading fontSize="xl">{post.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>{post.textSnippet}</Text>
                </Box>
                <Text color="gray">{post.creator.username}</Text>
              </Flex>
            </Flex>
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
