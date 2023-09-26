import React, { useEffect } from "react";

import { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Image,
  Text,
  IconButton,
  Spacer,
  Spinner,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import {
  getTokenCookie,
  getUserFromToken,
} from "../Authentication/Authentication";
import makeRequest from "../axiosHandle/SendRequest";
import { Divider, message } from "antd";
import { FaThumbsUp } from "react-icons/fa";
import CommentForm from "../components/Comment/comment";
import CommentsList from "../components/Comment/commentList";

const HomePage = () => {
  const token = getTokenCookie();
  if (token) {
    var user = getUserFromToken(token);
  }

  const [text, setText] = useState("");
  const [postImage, setImageSrc] = useState("");
  const [loading, setIsloading] = useState(false);
  const [postData, setPostData] = useState([]);
  const [dataLoad, setDataLoad] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoad, setlikeLoad] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (upload) => {
      setImageSrc(upload.target.result);
    };

    reader.readAsDataURL(file);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const getPost = async () => {
    setDataLoad(true);
    await makeRequest("/post/posts", "GET", null, null)
      .then((data) => {
        if (data.success) {
          setDataLoad(false);
          setPostData(data.posts);
          return;
        } else {
          setDataLoad(false);
          message.error(data.message);
          return;
        }
      })
      .catch((error) => {
        setDataLoad(false);
        message.error(error.message);
        return;
      });
  };

  const handlePost = async () => {
    const userId = user.userId;
    const formData = {
      text,
      postImage,
    };
    if (!text) {
      message.error("Please Post something..");
      return;
    }
    setIsloading(true);
    await makeRequest(`/post/create-post/${userId}`, "POST", token, formData)
      .then((data) => {
        if (data.success) {
          setIsloading(false);
          setText("");
          getPost();
          message.success(data.message);
          return;
        }
        setIsloading(false);
        message.error(data.message);
        return;
      })
      .catch((error) => {
        setIsloading(false);
        message.error(error.message);
        return;
      });
  };
  useEffect(() => {
    getPost();
  }, []);

  const handleComment = async (formData) => {
    setCommentLoading(true);
    await makeRequest(
      `/comment/create-comment/${user.userId}`,
      "POST",
      token,
      formData
    )
      .then((data) => {
        if (data.success) {
          setCommentLoading(false);
          message.success(data.message);
          getPost();
          return;
        }
        setCommentLoading(false);
        message.error(data.message);
        return;
      })
      .catch((error) => {
        setCommentLoading(false);
        message.error(error.message);
        return;
      });
  };

  const handleLike = async (postId) => {
    setlikeLoad(true);
    await makeRequest(
      `/like/like-toggle/${user?.userId}?id=${postId}&type=post`,
      "GET",
      token,
      null
    )
      .then((data) => {
        if (data.success) {
          setlikeLoad(false);
          message.success("Post Liked !");
          getPost();
          return;
        }
        setlikeLoad(false);
        message.error(data.message);
        getPost();
        return;
      })
      .catch((error) => {
        setlikeLoad(false);
        message.error(error.message);
        return;
      });
  };

  const handleCommentLike = async (commentId) => {
    await makeRequest(
      `/like/like-toggle/${user?.userId}?id=${commentId}&type=comment`,
      "GET",
      token,
      null
    )
      .then((data) => {
        if (data.success) {
          message.success("Comment Liked !");
          getPost();
          return;
        }
        message.error("Comment disliked !");
        getPost();
        return;
      })
      .catch((error) => {
        message.error(error.message);
        return;
      });
  };
  return (
    <Box minH={"70vh"} mt={10}>
      {user ? (
        <Flex justifyContent="center">
          <Box p={4} mt={10} width={["100%", "80%", "60%"]} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Make a Post
            </Text>
            <FormControl mb={4}>
              <FormLabel>Text</FormLabel>
              <Textarea
                value={text}
                style={{ resize: "none" }}
                required
                placeholder="What's on your mind..."
                onChange={handleTextChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
            </FormControl>
            {postImage && (
              <Flex justify="center" mb={4}>
                <Image
                  src={postImage}
                  alt="Post"
                  maxH={200}
                  objectFit="contain"
                />
              </Flex>
            )}
            <Flex justify="flex-end">
              <Button
                colorScheme="blue"
                leftIcon={<AddIcon />}
                w="100%"
                onClick={handlePost}
                disabled={!text && !postImage}
                isLoading={loading}
              >
                Post
              </Button>
            </Flex>
          </Box>
        </Flex>
      ) : (
        <Flex justifyContent={"center"} mt={20} p={5}>
          <Text> Login to post anything</Text>
        </Flex>
      )}
      <Box p={4}>
        {dataLoad ? (
          <Flex justifyContent={"center"}>
            {" "}
            <Spinner />
          </Flex>
        ) : (
          postData.map((item, index) => (
            <Flex
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              flexDirection="column"
              boxShadow="md"
              _hover={{ shadow: "lg" }}
              transition="all 0.2s"
              mb={4}
            >
              <Flex alignItems="center" mb={2}>
                <Image
                  src={item.User?.profileImage}
                  alt="Post Image"
                  boxSize="50px"
                  objectFit="fill"
                  borderRadius="full"
                  border={"black 1px solid"}
                  mr={2}
                />
                <Spacer />
                <Text fontWeight="bold">{item.User?.name}</Text>
              </Flex>
              {item.text && (
                <Text p={5} mb={4}>
                  {item.text}
                </Text>
              )}
              {item.postImage && (
                <Image
                  src={item.postImage}
                  alt="Post Image"
                  maxH="200px"
                  objectFit="fill"
                  borderRadius="md"
                  border={"1px solid gray"}
                  mb={4}
                  p={2}
                />
              )}
              <Divider />
              <Flex alignItems="center" key={item._id}>
                {user && (
                  <IconButton
                    icon={<FaThumbsUp />}
                    key={item._id}
                    onClick={() => handleLike(item._id)}
                    colorScheme="blue"
                    aria-label="Like Post"
                    fontSize="lg"
                    isLoading={likeLoad}
                  />
                )}
                <Spacer />
                <Text fontSize="sm" color="gray.800">
                  {item.Likes?.length}
                </Text>
              </Flex>
              <Divider />
              <Box p={5}>
                <Text fontSize="sm" color="gray.500">
                  <span style={{ marginRight: "5px" }}>
                    {item.Comments.length}
                  </span>
                  {item.Comments.length === 1 ? "Comment" : "Comments"}
                </Text>
              </Box>
              {user && (
                <>
                  <Flex justifyContent={"center"}>
                    <CommentForm
                      key={item._id}
                      postId={item._id}
                      loading={commentLoading}
                      onSubmit={(comment, postId) =>
                        handleComment(comment, postId)
                      }
                    />
                  </Flex>
                </>
              )}
              <Flex>
                <CommentsList
                  comments={item.Comments}
                  onLike={handleCommentLike}
                />
              </Flex>
            </Flex>
          ))
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
