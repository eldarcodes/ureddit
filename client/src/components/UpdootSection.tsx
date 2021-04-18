import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loading, setLoading] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");

  const [, vote] = useVoteMutation();

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexWrap="nowrap"
      width="70px"
    >
      <IconButton
        onClick={async () => {
          setLoading("updoot-loading");
          await vote({ postId: post.id, value: 1 });
          setLoading("not-loading");
        }}
        aria-label="updoot post"
        isLoading={loading === "updoot-loading"}
        icon={<ChevronUpIcon cursor="pointer" />}
      />
      {post.points}
      <IconButton
        onClick={async () => {
          setLoading("downdoot-loading");
          await vote({ postId: post.id, value: -1 });
          setLoading("not-loading");
        }}
        aria-label="downdoot post"
        isLoading={loading === "downdoot-loading"}
        icon={<ChevronDownIcon cursor="pointer" />}
      />
    </Flex>
  );
};
