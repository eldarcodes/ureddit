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

  const [vote] = useVoteMutation();

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
          if (post.voteStatus === 1) {
            return;
          }
          setLoading("updoot-loading");
          await vote({ variables: { postId: post.id, value: 1 } });
          setLoading("not-loading");
        }}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        aria-label="updoot post"
        isLoading={loading === "updoot-loading"}
        icon={<ChevronUpIcon cursor="pointer" />}
      />
      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoading("downdoot-loading");
          await vote({ variables: { postId: post.id, value: -1 } });
          setLoading("not-loading");
        }}
        aria-label="downdoot post"
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loading === "downdoot-loading"}
        icon={<ChevronDownIcon cursor="pointer" />}
      />
    </Flex>
  );
};
