import { Box, Heading } from "@chakra-ui/layout";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import withApollo from "../../utils/withApollo";
import Head from "next/head";

const Post: React.FC = ({}) => {
  const { data, error, loading } = useGetPostFromUrl();
  if (loading) {
    return <Layout>loading...</Layout>;
  }

  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Post: {data.post.title} - uReddit</title>
      </Head>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={3}>{data.post.text}</Box>
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
