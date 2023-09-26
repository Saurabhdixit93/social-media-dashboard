import React from "react";
import {
  Flex,
  Text,
  IconButton,
  Tooltip,
  Box,
  VStack,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { FaThumbsUp } from "react-icons/fa";
import {
  getTokenCookie,
  getUserFromToken,
} from "../../Authentication/Authentication";

function CommentsList({ comments, onLike }) {
  const token = getTokenCookie();
  if (token) {
    var user = getUserFromToken(token);
  }

  const handleLike = (commentId) => {
    onLike(commentId);
    return;
  };
  return (
    <VStack alignItems="stretch" w="100%">
      {comments.map((comment) => (
        <Flex
          key={comment._id}
          alignItems="center"
          border="1px solid #E2E8F0"
          borderRadius="md"
          p={2}
          my={2}
          w="100%"
        >
          <Box w="100%">
            <Box alignItems="center" justifyContent="space-between">
              <Box flex="1" p={5}>
                <Flex justifyContent={"space-between"}>
                  <Image
                    src={comment?.User?.profileImage}
                    boxSize="50px"
                    objectFit="fill"
                    borderRadius="full"
                    border={"black 1px solid"}
                    mr={2}
                  />
                  <Text fontWeight="bold" fontSize="sm" p={5} mb={1}>
                    {comment?.User?.name}
                  </Text>
                </Flex>
                <Text fontSize={["xs", "sm", "md"]}>{comment.text}</Text>
              </Box>
              <Flex
                alignItems="center"
                justifyContent={"space-between"}
                key={comment._id}
              >
                {user && (
                  <Tooltip label="Like" hasArrow key={comment._id}>
                    <IconButton
                      icon={<FaThumbsUp />}
                      colorScheme="blue"
                      aria-label="Like"
                      fontSize="sm"
                      key={comment._id}
                      onClick={() => handleLike(comment._id)}
                      mr={2}
                    />
                  </Tooltip>
                )}
                <Spacer />
                <Text fontSize="sm" color="gray.800">
                  {comment.Likes?.length}
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      ))}
    </VStack>
  );
}

export default CommentsList;
