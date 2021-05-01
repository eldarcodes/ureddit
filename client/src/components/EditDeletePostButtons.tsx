import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface IEditDeletePostButtons {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<IEditDeletePostButtons> = ({
  id,
  creatorId,
}) => {
  const [deletePost] = useDeletePostMutation();
  const { data: meData } = useMeQuery();
  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Flex align="center">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          aria-label="edit post"
          icon={<EditIcon />}
          mr={2}
        />
      </NextLink>

      <IconButton
        colorScheme="red"
        aria-label="delete post"
        icon={<DeleteIcon />}
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: "Post:" + id });
            },
          });
        }}
      />
    </Flex>
  );
};
