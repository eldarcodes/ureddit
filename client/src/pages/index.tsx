import { withUrqlClient } from "next-urql";
import React from "react";
import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "./../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>
        {!data ? (
          <div>loading...</div>
        ) : (
          data.posts.map((post) => <div key={post.id}>{post.title}</div>)
        )}
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
