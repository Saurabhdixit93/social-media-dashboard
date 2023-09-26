import React, { useState } from "react";
import {
  FormControl,
  Input,
  Button,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

function CommentForm({ onSubmit, postId, loading }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = comment;
    const formData = {
      postId,
      text,
    };
    onSubmit(formData);
    setComment("");
  };

  return (
    <Flex alignItems="center">
      <form onSubmit={handleSubmit}>
        <FormControl mt={4}>
          <Input type="hidden" name="postId" value={postId} />
          <InputGroup>
            <Input
              type="text"
              placeholder="Add a comment..."
              required
              flex="1"
              value={comment}
              borderRadius={"20px"}
              onChange={(e) => setComment(e.target.value)}
            />
            <InputRightElement width="fit-content">
              <Button
                isLoading={loading}
                type="submit"
                colorScheme="blue"
                borderRadius={"20px"}
              >
                Comment
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    </Flex>
  );
}

export default CommentForm;
